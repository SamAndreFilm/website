/*
  detail.js — renders a single project/photo-set detail page from the URL's
  ?slug= parameter against a data collection (FILMS or PHOTO_SETS, from data.js).
*/

function getSlugFromURL() {
  return new URLSearchParams(window.location.search).get("slug");
}

function renderDetailPage({ collection, listPage, childPage, mountId, kicker, adjacentNav = true }) {
  const slug = getSlugFromURL();
  const index = collection.findIndex(item => item.slug === slug);
  const mount = document.getElementById(mountId);

  if (index === -1) {
    mount.innerHTML = `
      <div class="detail-header">
        <p class="role-tag">NOT FOUND</p>
        <h1>This project isn't in the collection yet.</h1>
        <p class="brand-line"><a href="${listPage}" style="color:var(--teal)">&larr; Back</a></p>
      </div>
    `;
    return;
  }

  const item = collection[index];

  document.title = `Samantha André — ${item.title}`;
  const docTitleEl = document.getElementById("doc-title");
  if (docTitleEl) docTitleEl.textContent = document.title;

  const synopsisBlock = item.synopsis
    ? `<p class="synopsis">${item.synopsis}</p>`
    : "";

  const playButton = item.video
    ? `<button class="play-btn" type="button" id="hero-play" aria-label="Play ${item.title}">
         ${PLAY_GLYPH}<span>Play film</span>
       </button>`
    : "";

  mount.innerHTML = `
    <div class="detail-hero${item.video ? " has-video" : ""}" id="detail-hero">
      <img id="hero-img" src="${item.cover}" alt="${item.title} — ${item.brand}. Samantha André, ${item.role}." />
      ${playButton}
    </div>

    <div class="detail-header">
      <p class="role-tag">${kicker} &middot; ${item.role}</p>
      <h1>${item.title}</h1>
      <p class="brand-line">${item.brand}${item.year ? " &middot; " + item.year : ""}</p>
    </div>

    <div class="detail-body">
      ${synopsisBlock}
      <blockquote class="her-note">
        ${item.note}
        <cite>Samantha André &mdash; ${item.role}</cite>
      </blockquote>
    </div>

    ${creditsBlock(item.credits)}
    ${moreVideosBlock(item)}

    <div class="filmstrip-wrap">
      <div class="filmstrip" id="filmstrip"></div>
    </div>

    ${detailNav({ collection, index, listPage, childPage, kicker, adjacentNav })}
  `;

  attachImageFallback(document.getElementById("hero-img"), item.title, item.slug + "-hero");

  const strip = document.getElementById("filmstrip");
  strip.innerHTML = item.gallery.map((src, i) => `
    <div class="strip-frame">
      <img data-idx="${i}" src="${src}" alt="${item.title} — ${item.brand}, still ${i + 1}. Samantha André, ${item.role}." loading="lazy" />
    </div>
  `).join("");

  strip.querySelectorAll("img").forEach(img => {
    attachImageFallback(img, `${item.title} — ${img.dataset.idx}`, item.slug + "-still-" + img.dataset.idx);
  });

  // Clicking a still opens it full-size in a lightbox; arrows / swipe-free
  // prev-next buttons step through the rest of the gallery.
  setupLightbox(strip, item);

  // The hero still doubles as the film's poster: pressing play swaps it for
  // the embedded player, so the film is watched here rather than off-site.
  const playBtn = document.getElementById("hero-play");
  if (playBtn) {
    playBtn.addEventListener("click", () => {
      playVideoIn(document.getElementById("detail-hero"), item.video, item.title);
    });
  }

  document.querySelectorAll(".video-tile").forEach((tile, i) => {
    const play = () => playVideoIn(tile, tile.dataset.video, `${item.title} — video ${i + 2}`);
    tile.addEventListener("click", play);
    tile.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); play(); }
    });
    const poster = tile.querySelector("img");
    if (poster) attachImageFallback(poster, `${item.title} — video ${i + 2}`, item.slug + "-video-" + i);
  });
}

// An outlined triangle with no disc behind it — the old site's play mark.
const PLAY_GLYPH = `<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false"><path d="M14 8 L56 32 L14 56 Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`;

/**
 * Turns a YouTube or Vimeo page URL (the kind you copy from the address bar)
 * into an embeddable player URL. Returns null for anything else so the page
 * can simply not offer a player rather than embed a broken frame.
 */
function embedURLFor(pageURL) {
  let url;
  try { url = new URL(pageURL); } catch (e) { return null; }
  const host = url.hostname.replace(/^www\./, "");

  if (host === "youtube.com" || host === "m.youtube.com" || host === "youtu.be") {
    const id = host === "youtu.be" ? url.pathname.slice(1) : url.searchParams.get("v");
    if (!id) return null;
    const q = new URLSearchParams({ autoplay: "1", rel: "0" });
    const list = url.searchParams.get("list");
    if (list) q.set("list", list);
    const t = url.searchParams.get("t");
    if (t) {
      // "3s", "1m20s" or plain seconds
      const m = /^(?:(\d+)m)?(?:(\d+)s?)?$/.exec(t);
      if (m) q.set("start", String((+m[1] || 0) * 60 + (+m[2] || 0)));
    }
    return `https://www.youtube-nocookie.com/embed/${id}?${q}`;
  }

  if (host === "vimeo.com" || host === "player.vimeo.com") {
    // vimeo.com/123456  or an unlisted link  vimeo.com/123456/abcdef01
    const m = /^\/(?:video\/)?(\d+)(?:\/([0-9a-f]+))?/.exec(url.pathname);
    if (!m) return null;
    const q = new URLSearchParams({ autoplay: "1", dnt: "1" });
    if (m[2]) q.set("h", m[2]);
    return `https://player.vimeo.com/video/${m[1]}?${q}`;
  }

  return null;
}

/**
 * Replaces the poster in `frame` with the player (or falls back to a link).
 *
 * YouTube refuses to play inside a page that was opened straight from disk
 * (a file:// address sends no referrer, and YouTube's player requires one —
 * it shows "Video unavailable"). Vimeo has no such rule. So when the site is
 * being viewed from disk rather than a web server, YouTube links open in a
 * new tab instead of a dead frame. Preview through a local server (see the
 * README) and the film plays on the page as it does once published.
 */
function playVideoIn(frame, pageURL, label) {
  const src = embedURLFor(pageURL);
  const viewedFromDisk = window.location.protocol === "file:";
  if (!src || (viewedFromDisk && /youtube/.test(src))) {
    window.open(pageURL, "_blank", "noopener");
    return;
  }
  frame.classList.add("is-playing");
  frame.innerHTML = `
    <iframe src="${src}" title="${label}" frameborder="0"
      allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
      allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>
  `;
}

/** The old site's credit table: [label, value] pairs, in the order she wrote them. */
function creditsBlock(credits) {
  if (!credits || !credits.length) return "";
  return `
    <section class="credits-wrap">
      <dl class="credits">
        ${credits.map(([label, value]) => `<dt>${label}</dt><dd>${externalLinks(highlightHer(value))}</dd>`).join("")}
      </dl>
    </section>
  `;
}

/** Credit links point off-site: open them in a new tab so her site stays put. */
function externalLinks(html) {
  return html.replace(/<a\s+href=/g, '<a target="_blank" rel="noopener" href=');
}

/** Her own name reads in full white; everyone and everything else is dimmed. */
function highlightHer(value) {
  return value.replace(/Samantha Andr[eé]/g, '<span class="me">Samantha André</span>');
}

/** Additional films on the same page (series episodes, companion pieces). */
function moreVideosBlock(item) {
  if (!item.moreVideos || !item.moreVideos.length) return "";
  return `
    <section class="more-videos">
      <div class="video-grid">
        ${item.moreVideos.map((v, i) => `
          <div class="video-tile" data-video="${v.url}" role="button" tabindex="0" aria-label="Play ${item.title}, video ${i + 2}">
            <img src="${v.poster}" alt="${item.title}, video ${i + 2}. Samantha André, ${item.role}." loading="lazy" />
            <span class="play-btn" aria-hidden="true">${PLAY_GLYPH}</span>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

/**
 * Bottom-of-page navigation. With `adjacentNav` off the page offers only a
 * way back to the list — no stepping sideways from one project to the next.
 */
function detailNav({ collection, index, listPage, childPage, kicker, adjacentNav }) {
  const backLabel = `All ${kicker === "FILM" ? "Films" : "Sets"}`;
  if (!adjacentNav) {
    return `<div class="detail-nav is-back-only"><a href="${listPage}">&larr; ${backLabel}</a></div>`;
  }
  const prev = collection[(index - 1 + collection.length) % collection.length];
  const next = collection[(index + 1) % collection.length];
  return `
    <div class="detail-nav">
      <a href="${childPage}?slug=${prev.slug}">&larr; ${prev.title}</a>
      <a href="${listPage}">${backLabel}</a>
      <a href="${childPage}?slug=${next.slug}">${next.title} &rarr;</a>
    </div>
  `;
}


/* ---------- Lightbox for gallery stills ---------- */

function setupLightbox(strip, item) {
  const frames = Array.from(strip.querySelectorAll(".strip-frame"));
  if (!frames.length) return;

  let box = document.getElementById("lightbox");
  if (!box) {
    box = document.createElement("div");
    box.id = "lightbox";
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Enlarged still");
    box.innerHTML = `
      <button class="lb-close" type="button" aria-label="Close">&times;</button>
      <button class="lb-prev" type="button" aria-label="Previous still">&#8592;</button>
      <figure class="lb-figure">
        <img class="lb-img" alt="" />
        <figcaption class="lb-caption"></figcaption>
      </figure>
      <button class="lb-next" type="button" aria-label="Next still">&#8594;</button>
    `;
    document.body.appendChild(box);
  }

  const img = box.querySelector(".lb-img");
  const cap = box.querySelector(".lb-caption");
  const prevBtn = box.querySelector(".lb-prev");
  const nextBtn = box.querySelector(".lb-next");
  let current = 0;
  let lastFocus = null;

  const show = (i) => {
    current = (i + frames.length) % frames.length;
    const src = frames[current].querySelector("img");
    img.src = src.currentSrc || src.src;
    img.alt = src.alt;
    cap.textContent = item.title;
    prevBtn.hidden = nextBtn.hidden = frames.length < 2;
  };

  const open = (i) => {
    lastFocus = document.activeElement;
    show(i);
    box.classList.add("is-open");
    document.body.classList.add("lb-locked");
    box.querySelector(".lb-close").focus();
  };

  const close = () => {
    box.classList.remove("is-open");
    document.body.classList.remove("lb-locked");
    img.removeAttribute("src");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  };

  frames.forEach((frame, i) => {
    frame.tabIndex = 0;
    frame.setAttribute("role", "button");
    frame.setAttribute("aria-label", `Enlarge still ${i + 1}`);
    frame.addEventListener("click", () => open(i));
    frame.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(i); }
    });
  });

  box.querySelector(".lb-close").onclick = close;
  prevBtn.onclick = () => show(current - 1);
  nextBtn.onclick = () => show(current + 1);
  box.onclick = (e) => { if (e.target === box) close(); };

  document.addEventListener("keydown", (e) => {
    if (!box.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") show(current - 1);
    else if (e.key === "ArrowRight") show(current + 1);
  });
}

/*
  detail.js — renders a single project/photo-set detail page from the URL's
  ?slug= parameter against a data collection (FILMS or PHOTO_SETS, from data.js).
*/

function getSlugFromURL() {
  return new URLSearchParams(window.location.search).get("slug");
}

function renderDetailPage({ collection, listPage, childPage, mountId, kicker }) {
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
  const prev = collection[(index - 1 + collection.length) % collection.length];
  const next = collection[(index + 1) % collection.length];

  document.title = `Samantha André — ${item.title}`;
  const docTitleEl = document.getElementById("doc-title");
  if (docTitleEl) docTitleEl.textContent = document.title;

  const synopsisBlock = item.synopsis
    ? `<p class="synopsis">${item.synopsis}</p>`
    : "";

  mount.innerHTML = `
    <div class="detail-hero">
      <img id="hero-img" src="${item.cover}" alt="" />
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

    <div class="filmstrip-wrap">
      <h2>Stills</h2>
      <div class="filmstrip" id="filmstrip"></div>
    </div>

    <div class="detail-nav">
      <a href="${childPage}?slug=${prev.slug}">&larr; ${prev.title}</a>
      <a href="${listPage}">All ${kicker === "FILM" ? "Films" : "Sets"}</a>
      <a href="${childPage}?slug=${next.slug}">${next.title} &rarr;</a>
    </div>
  `;

  attachImageFallback(document.getElementById("hero-img"), item.title, item.slug + "-hero");

  const strip = document.getElementById("filmstrip");
  strip.innerHTML = item.gallery.map((src, i) => `
    <div class="strip-frame">
      <img data-idx="${i}" src="${src}" alt="Still ${i + 1} from ${item.title}" loading="lazy" />
      <span class="frame-num">${String(i + 1).padStart(2, "0")}</span>
    </div>
  `).join("");

  strip.querySelectorAll("img").forEach(img => {
    attachImageFallback(img, `${item.title} — ${img.dataset.idx}`, item.slug + "-still-" + img.dataset.idx);
  });
}

/*
  main.js — shared behavior for every page.
  DP = Director of Photography (see data.js for the full abbreviation note).
*/

const NAV_LINKS = [
  { href: "films.html", label: "Films" },
  { href: "photography.html", label: "Photography" },
  { href: "about.html", label: "About" },
  { href: "cv.html", label: "CV" }
];

// A small deterministic palette so each placeholder tile gets a distinct,
// intentional pair of tones instead of one flat gray box.
const PLACEHOLDER_PALETTES = [
  ["#233029", "#171b1a"],
  ["#2b2620", "#181512"],
  ["#20262f", "#14171c"],
  ["#2a2320", "#181310"],
  ["#1f2a2b", "#131b1b"]
];

function paletteFor(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return PLACEHOLDER_PALETTES[hash % PLACEHOLDER_PALETTES.length];
}

function currentFile() {
  const path = window.location.pathname.split("/").pop();
  // The site root serves index.html, which only redirects to films.html —
  // treat both as the Films page so the nav highlights correctly.
  if (path === "" || path === "index.html") return "films.html";
  return path;
}

function renderHeader() {
  const mount = document.getElementById("site-header");
  if (!mount) return;
  const here = currentFile();

  const links = NAV_LINKS.map(link => {
    const isCurrent = link.href === here;
    return `<a href="${link.href}"${isCurrent ? ' aria-current="page"' : ""}>${link.label}</a>`;
  }).join("");

  mount.innerHTML = `
    <a class="wordmark" href="films.html">
      <img class="brand-mark" src="assets/img/brand/free-spirit-cinema-logo.png" alt="Free Spirit Cinema" />
      <span class="wordmark-text">
        SAMANTHA ANDRÉ
        <small>Director &middot; DP &middot; Editor</small>
      </span>
    </a>
    <button class="nav-toggle" aria-expanded="false" aria-controls="main-nav">Menu</button>
    <nav class="main-nav" id="main-nav" aria-label="Primary">${links}</nav>
  `;

  const toggle = mount.querySelector(".nav-toggle");
  const nav = mount.querySelector(".main-nav");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  window.addEventListener("scroll", () => {
    mount.classList.toggle("is-scrolled", window.scrollY > 8);
  }, { passive: true });
}

/*
  Footer social links.
  Each entry renders as a brand glyph rather than a text label. The SVG uses
  fill="currentColor" so the icons inherit the link colour and its hover
  transition — no separate image files, and they stay crisp at any size.
*/
const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/samandrefilm/",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/samantha-andre-27b0bb39/",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
  },
  {
    label: "WhatsApp",
    title: "WhatsApp +1 626-658-5753",
    href: "https://wa.me/16266585753",
    path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
  },
  {
    label: "X (formerly Twitter)",
    href: "https://twitter.com/SamAndreFilms",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
  },
  {
    label: "Email",
    title: "sam@samandre.com",
    href: "mailto:sam@samandre.com",
    path: "M4 4h16a2 2 0 0 1 2 2v.24l-9.47 5.92a1 1 0 0 1-1.06 0L2 6.24V6a2 2 0 0 1 2-2Zm18 4.6V18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.6l8.94 5.59a3 3 0 0 0 3.18 0L22 8.6Z"
  }
];

function renderFooter() {
  const mount = document.getElementById("site-footer");
  if (!mount) return;

  const links = SOCIAL_LINKS.map(s => {
    const external = !s.href.startsWith("mailto:");
    const rel = external ? ' target="_blank" rel="noopener"' : "";
    return `
      <a class="social-link" href="${s.href}"${rel}
         aria-label="${s.label}" title="${s.title || s.label}">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path fill="currentColor" d="${s.path}" />
        </svg>
      </a>`;
  }).join("");

  mount.innerHTML = `
    <span class="foot-name">Samantha André &mdash; Director / DP / Editor</span>
    <nav class="foot-links" aria-label="Contact and social">${links}</nav>
  `;
}

/**
 * Swaps a broken/missing <img> for a labeled placeholder panel so the
 * gallery still reads as a designed page before real photos are added.
 * Call this once per <img>, right after creating it.
 */
function attachImageFallback(imgEl, label, seedKey) {
  imgEl.addEventListener("error", () => {
    const wrap = imgEl.closest(".cell-media, .strip-frame, .detail-hero, .about-portrait");
    if (!wrap) return;
    const [a, b] = paletteFor(seedKey || label || "x");
    imgEl.remove();
    const ph = document.createElement("div");
    ph.className = "cell-media is-placeholder";
    ph.style.setProperty("--ph-a", a);
    ph.style.setProperty("--ph-b", b);
    ph.innerHTML = `<span>${label}</span>`;
    wrap.appendChild(ph);
  }, { once: true });
}

/**
 * Renders the 2-column "reel grid" used on both the Films (home) page and
 * the Photography page. `items` must have: slug, title, brand, role, cover.
 * `hrefBuilder(item)` returns the child-page URL for a click.
 */
function renderReelGrid(mountEl, items, hrefBuilder) {
  mountEl.innerHTML = items.map((item, i) => {
    const index = String(i + 1).padStart(2, "0");
    const total = String(items.length).padStart(2, "0");
    return `
      <a class="reel-cell" href="${hrefBuilder(item)}" data-slug="${item.slug}">
        <span class="frame-index">${index} / ${total}</span>
        <div class="cell-media">
          <img src="${item.cover}" alt="${item.title} — ${item.brand}. Samantha André, ${item.role}." loading="lazy" />
        </div>
        <span class="cell-caption">
          <span class="role">${item.role}</span>
          <span class="title">${item.title}</span>
          <span class="brand">${item.brand}</span>
        </span>
      </a>
    `;
  }).join("");

  mountEl.querySelectorAll(".reel-cell").forEach(cell => {
    const img = cell.querySelector("img");
    const slug = cell.getAttribute("data-slug");
    attachImageFallback(img, cell.querySelector(".title").textContent, slug);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
});

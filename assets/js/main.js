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

function renderFooter() {
  const mount = document.getElementById("site-footer");
  if (!mount) return;
  mount.innerHTML = `
    <span class="foot-name">Samantha André &mdash; Director / DP / Editor</span>
    <nav class="foot-links" aria-label="Social">
      <a href="https://www.instagram.com/samandrefilm/" target="_blank" rel="noopener">Instagram</a>
      <a href="https://twitter.com/SamAndreFilms" target="_blank" rel="noopener">Twitter</a>
      <a href="mailto:sam@samandre.com">Email</a>
    </nav>
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

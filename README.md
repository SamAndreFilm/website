# Samantha André — Portfolio Site

A static site (plain HTML/CSS/JS, no build step) for Samantha André,
director / DP / editor. Built to run on GitHub Pages.

Abbreviations used in this project:
- **DP** = Director of Photography (the cinematographer role)
- **CV** = Curriculum Vitae (career resume)

## Pages

| Page | File | Notes |
|---|---|---|
| Films (home) | `films.html` | 2-column grid of 22 films, hover reveals role + title, click opens a film page |
| Site root | `index.html` | Redirects to `films.html` — GitHub Pages serves `index.html` for `/`, so the root URL has to keep working |
| Film detail | `film.html?slug=...` | One template, reads content from `assets/js/data.js`. No prev/next links — the only way out is back to the grid |
| Photography | `photography.html` | Same grid architecture as Films |
| Photo-set detail | `photo-set.html?slug=...` | Same template as film detail, but does still offer prev/next |
| About | `about.html` | Bio + portrait. The portrait is a 16:9 frame with Samantha on its right-hand side, so the tall column anchors its crop at `object-position: 90%` — centring it crops her out |
| CV | `cv.html` | On-page resume (auto-built from film data) + PDF download button |

## Editing content

Everything editorial lives in **`assets/js/data.js`** — two arrays,
`FILMS` and `PHOTO_SETS`. To add a project, copy an existing object in the
array and change the fields. No other file needs to change:

```js
{
  slug: "your-new-film",          // used in the URL: film.html?slug=your-new-film
  title: "Film Title",
  brand: "Studio / Client",
  role: "Director",
  year: "2026",
  synopsis: "One or two factual sentences about the project.",
  note: "Samantha's own first-person paragraph about making it.",
  cover: "assets/img/films/your-new-film/cover.jpg",
  gallery: [
    "assets/img/films/your-new-film/01.jpg",
    "assets/img/films/your-new-film/02.jpg"
  ]
}
```

`PHOTO_SETS` uses the same shape, without `synopsis`/`year`.

### The `note` field

Every project currently has a placeholder string:
`"— Add Samantha's first-person note on this project here. —"`.
This was left as a placeholder on purpose — a director's first-person account
shouldn't be invented on her behalf. Replace it with her real words before
launch.

### Images

All imagery is already in place, sourced from the WordPress export of the
previous samandre.com site. **479 images** across 22 films and 8 photo sets,
plus the About portrait.

Naming convention (chosen for search visibility and for finding a file later):

```
assets/img/films/<film-slug>/samantha-andre-<film-slug>-cover.jpg
assets/img/films/<film-slug>/samantha-andre-<film-slug>-still-01.jpg
assets/img/photography/<set-slug>/samantha-andre-<set-slug>-cover.jpg
assets/img/photography/<set-slug>/samantha-andre-<set-slug>-photo-01.jpg
assets/img/about/samantha-andre-director-dp-portrait.jpg
```

The `-cover` image is the one the grid shows and the one the detail page
uses as its hero; the numbered files are the scrollable gallery, in the same
order the old site used.

`alt` text is generated in `main.js` / `detail.js` from the data, so it stays
correct automatically: *"Newtok — Patagonia Films — Feature Documentary.
Samantha André, Cinematographer / Field Producer."*

Images were resized to a 2000px long edge and re-encoded as progressive JPEG
(quality 82); animated GIFs were reduced to a 720px long edge. That took the
set from 1.24 GB of originals down to **137 MB**, which matters because
GitHub Pages caps a published site at 1 GB. Originals are untouched in
`old_website_content/`.

A cover is used twice — scaled and colour-filtered in the grid, and as the
full-bleed hero on the detail page — so where the old site's featured image
was an animated GIF, the build picks the first still frame in that project's
gallery instead.

If a file is ever missing at a referenced path, the site renders a labeled
placeholder panel rather than a broken-image icon (see `attachImageFallback`
in `main.js`), so the layout never breaks.

### Which images need a better source

`IMAGE-UPGRADES.md` lists every cover and gallery still that is below the
resolution its slot wants, split into the ones that can be fixed from files
already in the project and the ones that need a genuinely new export.

### Where the content came from

`old_website_content/` holds the WordPress export (`.xml`) and the full media
library from the previous site. **It is gitignored on purpose** — it is 1.5 GB
and is a source archive, not part of the published site.

The XML was the source of truth for what actually belongs here. The old
install was a Cinerama theme demo carrying ~84 pages and 66 portfolio items,
most of it stock demo content ("Cafe Bar", "Romance Films", "Thriller
Movies"). The real site was the handful of items the home page explicitly
listed. Concretely:

- The **home page** (`page` id 6200, slug `films`) listed exactly 18
  portfolio items by ID in its `edgtf_portfolio_list` shortcodes. Those 18
  are the backbone of the `FILMS` array, in that order.
- Four more films existed in the export tagged `films` but were not in that
  list — **Mary's Way**, **No Refuge**, **Sikh Lens**, and **Agua Leva, Agua
  Da**. That looked like drift in the old site rather than a decision (Mary's
  Way is the feature her own bio is about, and No Refuge was even tagged
  `home-page`), so they were added. Mary's Way sits directly after *Here:
  Maasai Land*, which its own page calls it a continuation of. To reorder the
  grid, reorder the `FILMS` array — nothing else reads position.
- The **Photos page** (id 5216) pulls the `photos` portfolio category
  ordered by slug. Those 8 are the `PHOTO_SETS` array, in that order.
- Everything unreachable from the home page was left out.
- Per-project images came from the `edgtf-portfolio-image-gallery` postmeta
  (the ordered gallery), with `_thumbnail_id` as the cover.
- Duplicates were removed by MD5; images that legitimately appear in more
  than one project were kept in each.
- Every `synopsis` and `year` is the old site's own text, extracted from the
  page-builder markup rather than rewritten. A few of her originals contain
  typos ("indegenous", "Daugthers", "heatbreaks"); these were left as written
  rather than silently edited.

### CV

`cv.html` builds its "Selected Filmography" list straight from `FILMS`, so it
always matches the Films page. The count in the Films page eyebrow
(`SELECTED WORK · 01–22`) is derived from `FILMS.length` for the same reason. The **Download PDF** button points at
`assets/documents/samantha-andre-cv.pdf` — a placeholder PDF matching the
current on-page content is included; replace that file with her actual CV
PDF (keep the same filename, or update the `href` in `cv.html`).

## Local preview

No build step is required. From this folder, run a static server, e.g.:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

Browsers cache `data.js` and `style.css` aggressively on a plain static
server; hard-reload if an edit does not appear.

## Deploying to GitHub Pages

The target repository is `https://github.com/SamAndreFilm/website.git`.

```bash
git remote add origin https://github.com/SamAndreFilm/website.git
git add -A
git commit -m "Initial site"
git branch -M main
git push -u origin main
```

Then in the GitHub repo: **Settings → Pages → Build and deployment → Source:
Deploy from a branch**, branch `main`, folder `/ (root)`. The site will be
published at `https://samandrefilm.github.io/website/` (or the repo's
configured custom domain).

The `.nojekyll` file at the root tells GitHub Pages to serve files as-is
(important since none of this needs Jekyll processing).

## Design notes

- **Color**: near-black charcoal background (`#0e0e0f`), warm bone-white text
  (`#f2eee4`), a cool teal accent for links/focus, and a brass/timecode
  accent reserved for the numbering system.
- **Type**: Fraunces (serif, titles/name), Archivo (tracked uppercase,
  nav/labels), Work Sans (body copy), IBM Plex Mono (the timecode numbers).
- **Signature element**: the "Reel Log" hover state on each grid tile — a
  hairline frame and a mono timecode counter (e.g. `03 / 22`), treating each
  project like a logged clip in an editor's bin.
- **Header**: the Free Spirit Cinema mark sits to the left of the name
  (`assets/img/brand/free-spirit-cinema-logo.png`, white with transparency,
  taken from the old site's media library).
- **Layout**: the Films and Photography overviews are inset 10% of the page
  width on both sides (5% below 720px). The hero copy uses the same inset so
  its left edge lines up with the grid.
- **About**: the portrait takes 55% of the width (46% below 980px, stacked
  below 780px) with the bio in a narrower column on the right.

All tokens are declared at the top of `assets/css/style.css`.

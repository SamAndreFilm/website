# Samantha André — Portfolio Site

A static site (plain HTML/CSS/JS, no build step) for Samantha André,
director / DP / editor. Built to run on GitHub Pages.

Abbreviations used in this project:
- **DP** = Director of Photography (the cinematographer role)
- **CV** = Curriculum Vitae (career resume)

## Pages

| Page | File | Notes |
|---|---|---|
| Films (home) | `index.html` | 2-column grid, hover reveals role + title, click opens a film page |
| Film detail | `film.html?slug=...` | One template, reads content from `assets/js/data.js` |
| Photography | `photography.html` | Same grid architecture as Films |
| Photo-set detail | `photo-set.html?slug=...` | Same template pattern as film detail |
| About | `about.html` | Bio + portrait |
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

Drop real photos at the paths already referenced in `data.js`
(`assets/img/films/<slug>/...`, `assets/img/photography/<slug>/...`,
`assets/img/about/portrait.jpg`). Until a file exists at that path, the
image automatically falls back to a labeled placeholder panel — the layout
never shows a broken-image icon, so you can wire up content before you have
final photography.

Recommended cover image ratio: 4:3. Gallery/filmstrip stills: any ratio,
they're shown at 3:2.

### CV

`cv.html` builds its "Selected Filmography" list straight from `FILMS`, so it
always matches the Films page. The **Download PDF** button points at
`assets/documents/samantha-andre-cv.pdf` — a placeholder PDF matching the
current on-page content is included; replace that file with her actual CV
PDF (keep the same filename, or update the `href` in `cv.html`).

## Local preview

No build step is required. From this folder, run a static server, e.g.:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

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
  hairline frame and a mono timecode counter (e.g. `03 / 18`), treating each
  project like a logged clip in an editor's bin.

All tokens are declared at the top of `assets/css/style.css`.

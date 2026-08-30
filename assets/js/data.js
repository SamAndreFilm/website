/*
  data.js
  -------
  Abbreviations used throughout this file and the rest of the site:
    DP  = Director of Photography (the cinematographer who shapes the camera/light)
    CV  = Curriculum Vitae (career resume)

  This file is the single content source for the site. To add, remove, or
  edit a project, edit the arrays below — every page (home, film detail,
  photography, photo-set detail) reads from here. No other file needs to
  change for routine content updates.

  IMAGE PATHS: point "cover" and each "gallery" entry at real files you add
  under assets/img/films/<slug>/ or assets/img/photography/<slug>/.
  Until a real file exists at that path, the site automatically renders a
  labeled placeholder panel instead of a broken image (see main.js,
  function attachImageFallback).
*/

const FILMS = [
  {
    slug: "being-emily",
    title: "Being Emily",
    brand: "Twitter Studios x VICE",
    role: "Director",
    year: "",
    synopsis: "A branded documentary produced for Twitter Studios in partnership with VICE.",
    note: "— Add Samantha's first-person note on this project here. —",
    cover: "assets/img/films/being-emily/cover.jpg",
    gallery: [
      "assets/img/films/being-emily/01.jpg",
      "assets/img/films/being-emily/02.jpg",
      "assets/img/films/being-emily/03.jpg"
    ]
  },
  {
    slug: "newtok",
    title: "Newtok",
    brand: "Patagonia Films — Feature Documentary",
    role: "Cinematographer / Field Producer",
    year: "2021",
    synopsis: "A feature documentary following the Yup'ik village of Newtok, Alaska, as residents work to relocate their community in the face of coastal erosion driven by climate change.",
    note: "— Add Samantha's first-person note on this project here. —",
    cover: "assets/img/films/newtok/cover.jpg",
    gallery: [
      "assets/img/films/newtok/01.jpg",
      "assets/img/films/newtok/02.jpg",
      "assets/img/films/newtok/03.jpg",
      "assets/img/films/newtok/04.jpg"
    ]
  },
  {
    slug: "faire-rever",
    title: "Faire Rêver",
    brand: "EF / Wahoo — Branded Documentary",
    role: "Director",
    year: "",
    synopsis: "A branded documentary short produced for EF and Wahoo.",
    note: "— Add Samantha's first-person note on this project here. —",
    cover: "assets/img/films/faire-rever/cover.jpg",
    gallery: [
      "assets/img/films/faire-rever/01.jpg",
      "assets/img/films/faire-rever/02.jpg"
    ]
  },
  {
    slug: "here-maasai-land",
    title: "Here Maasai Land",
    brand: "The Front — Short Documentary",
    role: "Director",
    year: "",
    synopsis: "A short documentary produced with The Front.",
    note: "— Add Samantha's first-person note on this project here. —",
    cover: "assets/img/films/here-maasai-land/cover.jpg",
    gallery: [
      "assets/img/films/here-maasai-land/01.jpg",
      "assets/img/films/here-maasai-land/02.jpg"
    ]
  },
  {
    slug: "my-body-at-its-best",
    title: "My Body at its Best",
    brand: "Canyon — Branded Documentary",
    role: "Director / DP",
    year: "",
    synopsis: "A branded documentary produced for Canyon.",
    note: "— Add Samantha's first-person note on this project here. —",
    cover: "assets/img/films/my-body-at-its-best/cover.jpg",
    gallery: [
      "assets/img/films/my-body-at-its-best/01.jpg",
      "assets/img/films/my-body-at-its-best/02.jpg"
    ]
  },
  {
    slug: "my-family-is-my-tribe",
    title: "My Family is my Tribe",
    brand: "EF / Wahoo — Branded Documentary",
    role: "Director / Editor",
    year: "",
    synopsis: "A branded documentary produced for EF and Wahoo.",
    note: "— Add Samantha's first-person note on this project here. —",
    cover: "assets/img/films/my-family-is-my-tribe/cover.jpg",
    gallery: [
      "assets/img/films/my-family-is-my-tribe/01.jpg",
      "assets/img/films/my-family-is-my-tribe/02.jpg"
    ]
  },
  {
    slug: "daughters-of-emmonak",
    title: "Daughters of Emmonak",
    brand: "Short Documentary",
    role: "Co-Director",
    year: "",
    synopsis: "A short documentary co-directed by Samantha André.",
    note: "— Add Samantha's first-person note on this project here. —",
    cover: "assets/img/films/daughters-of-emmonak/cover.jpg",
    gallery: [
      "assets/img/films/daughters-of-emmonak/01.jpg",
      "assets/img/films/daughters-of-emmonak/02.jpg"
    ]
  },
  {
    slug: "keep-riding",
    title: "Keep Riding",
    brand: "Rapha Films — Branded Documentary",
    role: "Director",
    year: "",
    synopsis: "A branded documentary produced for Rapha Films.",
    note: "— Add Samantha's first-person note on this project here. —",
    cover: "assets/img/films/keep-riding/cover.jpg",
    gallery: [
      "assets/img/films/keep-riding/01.jpg",
      "assets/img/films/keep-riding/02.jpg"
    ]
  },
  {
    slug: "enter-the-slipstream",
    title: "Enter the Slipstream",
    brand: "Peacock — Documentary Feature",
    role: "DP",
    year: "",
    synopsis: "A feature documentary released on Peacock.",
    note: "— Add Samantha's first-person note on this project here. —",
    cover: "assets/img/films/enter-the-slipstream/cover.jpg",
    gallery: [
      "assets/img/films/enter-the-slipstream/01.jpg",
      "assets/img/films/enter-the-slipstream/02.jpg"
    ]
  },
  {
    slug: "dear",
    title: "\u201CDear\u2026\u201D",
    brand: "Apple TV — Documentary Series",
    role: "Associate Producer",
    year: "",
    synopsis: "A documentary series released on Apple TV.",
    note: "— Add Samantha's first-person note on this project here. —",
    cover: "assets/img/films/dear/cover.jpg",
    gallery: [
      "assets/img/films/dear/01.jpg",
      "assets/img/films/dear/02.jpg"
    ]
  },
  {
    slug: "nothing-beyond",
    title: "Nothing Beyond",
    brand: "Kyan — Music Video",
    role: "Director / DP",
    year: "",
    synopsis: "A music video for the artist Kyan.",
    note: "— Add Samantha's first-person note on this project here. —",
    cover: "assets/img/films/nothing-beyond/cover.jpg",
    gallery: [
      "assets/img/films/nothing-beyond/01.jpg",
      "assets/img/films/nothing-beyond/02.jpg"
    ]
  },
  {
    slug: "finding-home",
    title: "Finding Home",
    brand: "Short Documentary",
    role: "Co-Director",
    year: "",
    synopsis: "A short documentary co-directed by Samantha André.",
    note: "— Add Samantha's first-person note on this project here. —",
    cover: "assets/img/films/finding-home/cover.jpg",
    gallery: [
      "assets/img/films/finding-home/01.jpg",
      "assets/img/films/finding-home/02.jpg"
    ]
  },
  {
    slug: "aclu",
    title: "ACLU",
    brand: "Mini Documentaries",
    role: "Editor",
    year: "",
    synopsis: "A series of mini documentaries produced for the ACLU.",
    note: "— Add Samantha's first-person note on this project here. —",
    cover: "assets/img/films/aclu/cover.jpg",
    gallery: [
      "assets/img/films/aclu/01.jpg",
      "assets/img/films/aclu/02.jpg"
    ]
  },
  {
    slug: "hillbilly",
    title: "Hillbilly",
    brand: "Feature Documentary",
    role: "Finishing Editor",
    year: "",
    synopsis: "A feature documentary.",
    note: "— Add Samantha's first-person note on this project here. —",
    cover: "assets/img/films/hillbilly/cover.jpg",
    gallery: [
      "assets/img/films/hillbilly/01.jpg",
      "assets/img/films/hillbilly/02.jpg"
    ]
  },
  {
    slug: "scotty-and-the-secret-history-of-hollywood",
    title: "Scotty and the Secret History of Hollywood",
    brand: "Altimeter Films — Feature Documentary",
    role: "Assistant Editor",
    year: "",
    synopsis: "A feature documentary produced by Altimeter Films.",
    note: "— Add Samantha's first-person note on this project here. —",
    cover: "assets/img/films/scotty-and-the-secret-history-of-hollywood/cover.jpg",
    gallery: [
      "assets/img/films/scotty-and-the-secret-history-of-hollywood/01.jpg",
      "assets/img/films/scotty-and-the-secret-history-of-hollywood/02.jpg"
    ]
  },
  {
    slug: "vice-world-of-sports-rivals",
    title: "Vice World of Sports: Rivals",
    brand: "Documentary Series",
    role: "Assistant Editor",
    year: "",
    synopsis: "A documentary series.",
    note: "— Add Samantha's first-person note on this project here. —",
    cover: "assets/img/films/vice-world-of-sports-rivals/cover.jpg",
    gallery: [
      "assets/img/films/vice-world-of-sports-rivals/01.jpg",
      "assets/img/films/vice-world-of-sports-rivals/02.jpg"
    ]
  },
  {
    slug: "vice-x-live-nation",
    title: "Vice x Live Nation",
    brand: "Documentary Series",
    role: "Trailer Editor",
    year: "",
    synopsis: "A documentary series produced in partnership with Live Nation.",
    note: "— Add Samantha's first-person note on this project here. —",
    cover: "assets/img/films/vice-x-live-nation/cover.jpg",
    gallery: [
      "assets/img/films/vice-x-live-nation/01.jpg",
      "assets/img/films/vice-x-live-nation/02.jpg"
    ]
  },
  {
    slug: "taking-the-reins",
    title: "Taking the Reins",
    brand: "Documentary Feature",
    role: "Co-Producer",
    year: "",
    synopsis: "A feature documentary.",
    note: "— Add Samantha's first-person note on this project here. —",
    cover: "assets/img/films/taking-the-reins/cover.jpg",
    gallery: [
      "assets/img/films/taking-the-reins/01.jpg",
      "assets/img/films/taking-the-reins/02.jpg"
    ]
  }
];

const PHOTO_SETS = [
  {
    slug: "adrienne-artist-portraits",
    title: "Adrienne",
    brand: "Artist Portraits",
    role: "Photographer",
    note: "— Add Samantha's first-person note on this shoot here. —",
    cover: "assets/img/photography/adrienne-artist-portraits/cover.jpg",
    gallery: [
      "assets/img/photography/adrienne-artist-portraits/01.jpg",
      "assets/img/photography/adrienne-artist-portraits/02.jpg",
      "assets/img/photography/adrienne-artist-portraits/03.jpg"
    ]
  },
  {
    slug: "earthling-fashion",
    title: "Earthling",
    brand: "Fashion",
    role: "Photographer",
    note: "— Add Samantha's first-person note on this shoot here. —",
    cover: "assets/img/photography/earthling-fashion/cover.jpg",
    gallery: [
      "assets/img/photography/earthling-fashion/01.jpg",
      "assets/img/photography/earthling-fashion/02.jpg"
    ]
  },
  {
    slug: "levitation-festival",
    title: "Levitation",
    brand: "Festival Photographs",
    role: "Photographer",
    note: "— Add Samantha's first-person note on this shoot here. —",
    cover: "assets/img/photography/levitation-festival/cover.jpg",
    gallery: [
      "assets/img/photography/levitation-festival/01.jpg",
      "assets/img/photography/levitation-festival/02.jpg"
    ]
  },
  {
    slug: "gray-artist-portraits",
    title: "Gray",
    brand: "Artist Portraits",
    role: "Photographer",
    note: "— Add Samantha's first-person note on this shoot here. —",
    cover: "assets/img/photography/gray-artist-portraits/cover.jpg",
    gallery: [
      "assets/img/photography/gray-artist-portraits/01.jpg",
      "assets/img/photography/gray-artist-portraits/02.jpg"
    ]
  },
  {
    slug: "kyan-artist-portraits",
    title: "Kyan",
    brand: "Artist Portraits",
    role: "Photographer",
    note: "— Add Samantha's first-person note on this shoot here. —",
    cover: "assets/img/photography/kyan-artist-portraits/cover.jpg",
    gallery: [
      "assets/img/photography/kyan-artist-portraits/01.jpg",
      "assets/img/photography/kyan-artist-portraits/02.jpg"
    ]
  },
  {
    slug: "rachel-artist-portraits",
    title: "Rachel",
    brand: "Artist Portraits",
    role: "Photographer",
    note: "— Add Samantha's first-person note on this shoot here. —",
    cover: "assets/img/photography/rachel-artist-portraits/cover.jpg",
    gallery: [
      "assets/img/photography/rachel-artist-portraits/01.jpg",
      "assets/img/photography/rachel-artist-portraits/02.jpg"
    ]
  },
  {
    slug: "taylor-andrew-portraits",
    title: "Taylor & Andrew",
    brand: "Artist Portraits",
    role: "Photographer",
    note: "— Add Samantha's first-person note on this shoot here. —",
    cover: "assets/img/photography/taylor-andrew-portraits/cover.jpg",
    gallery: [
      "assets/img/photography/taylor-andrew-portraits/01.jpg",
      "assets/img/photography/taylor-andrew-portraits/02.jpg"
    ]
  },
  {
    slug: "travel-120mm",
    title: "Travel Photographs",
    brand: "120mm",
    role: "Photographer",
    note: "— Add Samantha's first-person note on this shoot here. —",
    cover: "assets/img/photography/travel-120mm/cover.jpg",
    gallery: [
      "assets/img/photography/travel-120mm/01.jpg",
      "assets/img/photography/travel-120mm/02.jpg"
    ]
  }
];

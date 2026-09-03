# NM Bakery — Website

A four-page premium website for **NM Bakery** (*Freshly Baked With Love*), built with plain
HTML, CSS and JavaScript. No build step, no dependencies — open `index.html` and it runs.

---

## Pages

| File | Page | What is on it |
| --- | --- | --- |
| `index.html` | **Home** | Scroll-animated hero, categories, story teaser, signature products, values + stats, order process, custom cakes, reviews |
| `products.html` | **Products** | Full menu with live category filter and search, the original menu card, ordering notes |
| `about.html` | **About Us** | Origin story, timeline, values, ingredients, hygiene, founder note, stats |
| `contact.html` | **Contact Us** | Contact tiles, order form (opens WhatsApp pre-filled), opening hours, channels, FAQ |

---

## File structure

```
cake/
├── index.html               # Home
├── products.html            # Products / full menu
├── about.html               # About us
├── contact.html             # Contact us + order form
├── Menu.jpeg                # Original menu card (source of all prices)
├── README.md
├── .claude/
│   └── launch.json          # Dev-server config (python http.server on :5173)
└── assets/
    ├── css/
    │   ├── base.css         # Design tokens, reset, typography, buttons, utilities
    │   ├── layout.css       # Header, nav, drawer, page banner, marquee, footer
    │   ├── components.css   # Cards, filters, stats, testimonials, forms, accordion
    │   ├── animations.css   # Hero scroll choreography, reveal system, keyframes
    │   └── pages.css        # Page-specific compositions
    ├── js/
    │   ├── data.js          # Business config + the whole menu (edit this first)
    │   ├── visuals.js       # SVG illustrations and icon set
    │   ├── scroll.js        # Scroll engine: progress, hero parallax, reveals, counters
    │   └── app.js           # Rendering, nav, filters, form logic
    └── images/
        └── menu-card.jpeg   # Menu card shown on the Products page
```

Load order matters: `data.js` → `visuals.js` → `scroll.js` → `app.js`.

Asset links carry a `?v=N` version param (e.g. `base.css?v=6`). After editing a CSS or
JS file, bump that number in all four HTML files so browsers fetch the new version
instead of a cached copy.

---

## Colour scheme

The site uses a dark-luxury palette: deep espresso grounds, **metallic** gold, and
deep wine as the accent. Every colour is a token in `assets/css/base.css`.

| Token | Value | Used for |
| --- | --- | --- |
| `--noir` / `--espresso` | `#0F0805` / `#170D07` | Hero, page banners, dark sections, footer |
| `--cocoa` / `--choco` | `#2B1710` / `#45261A` | Headings, dark buttons |
| `--grad-gold` | 5-stop gradient | Gold leaf: buttons, badges, prices, rules |
| `--gold` / `--gold-soft` | `#C9A227` / `#F0DCA0` | Hairlines, icons, highlights |
| `--wine` / `--rose` | `#7A1F35` / `#8E2A44` | Accent glows, "made to order" badges |
| `--cream` / `--cream-2` | `#F8EEDD` / `#EFE0C7` | Light section grounds |
| `--ivory` | `#FEFBF5` | Cards and form surfaces |

Two things make it read as premium rather than flat:

1. **Gold is a gradient, not a flat colour.** `--grad-gold` runs dark → mid → bright
   highlight → mid → dark, which is what makes metal look like metal. Use it as a
   `background` with `background-clip: text` for gold type.
2. **Dark and light sections alternate.** The hero, page banners, the signature
   selection and the values block are dark; the rest are cream. Add `section--dark`
   to any `.section` to move it into the dark chapter.

To shift the whole site to a different scheme, change the tokens in `base.css` —
nothing else hardcodes a colour.

---

## Before going live — edit these

Everything business-specific lives in one place: **`assets/js/data.js`**.

```js
window.NM_CONFIG = {
  phoneDisplay: '+91 98765 43210',   // shown on the page
  phoneRaw:     '919876543210',      // digits only, with country code (WhatsApp + tel:)
  email:        'hello@nmbakery.in',
  addressLine1: 'Home Bakery Studio',
  addressLine2: 'Vellore, Tamil Nadu 632014',
  instagram:    'https://instagram.com/...',
  facebook:     'https://facebook.com/...',
  hours: [ ... ]
};
```

Change those values and **every page updates automatically** — header, footer, contact
tiles, order buttons and the WhatsApp links all read from this object.

> The phone number, email and address currently in the file are **placeholders**.
> Replace them with the real ones before sharing the site.

### Adding or changing a product

Add an object to `window.NM_PRODUCTS` in the same file:

```js
{
  id: 'pista-cake',              // unique, lowercase, hyphenated
  name: 'Pista Cake',
  category: 'cakes',             // cakes | bento | brownies | cookies | teacakes
  price: 550,
  unit: '½ kg',
  desc: 'One line describing the bake.',
  tone: ['#A8C08A', '#6E8A4E'],  // two colours — drives the card artwork
  featured: true,                // shows it on the home page
  badge: 'New'                   // optional ribbon
}
```

The product card, its illustration, the filter counts, the contact-form dropdown and
the WhatsApp order message are all generated from that one entry.

---

## The hero scroll animation

`assets/js/scroll.js` runs a single `requestAnimationFrame`-throttled loop that writes a
`--scroll` custom property (0 → 1) onto the hero as it leaves the viewport. `animations.css`
uses that value to drive, in CSS:

- the hero copy lifting, scaling down and fading out,
- the cake stage moving at a slower rate (parallax),
- the rotating tagline ring turning with scroll,
- the background grid fading away,
- the scroll cue disappearing on first movement.

The same loop also drives the top progress bar, the auto-hiding header, `[data-parallax]`
layers and the process timeline's filling line.

Section content animates in through `[data-reveal]` attributes handled by an
`IntersectionObserver`:

```html
<h2 data-reveal="up" data-delay="120">Heading</h2>
```

Variants: `up`, `down`, `left`, `right`, `scale`, `zoom`, `rise`, `mask`, `blur`, `fade`.
Add `data-stagger` to a container to have its children animate in sequence, and
`data-split` to a heading to reveal it line by line.

Everything is disabled automatically under `prefers-reduced-motion: reduce`.

---

## Running it

Just open `index.html` in a browser — it works from the file system.

To run a local server instead (recommended if you add photos):

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

---

## Adding real photos

The site ships with hand-drawn SVG artwork so it looks finished without photography.
To use real photos on the product cards, drop images into `assets/images/` and swap the
artwork call in `assets/js/app.js` (`productCard`) for an `<img>` tag pointing at
`product.photo`.

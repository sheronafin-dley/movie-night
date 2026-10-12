# Movie Night

A responsive movie discovery website where visitors can browse films,
filter them by genre, view screening details and send a ticket request.

Built for **Dynamic Websites and Applications – Module 1, Assignment 1**
(Vocational Training Development Institute).

## Concept, audience and purpose

- **Concept:** Movie Night, an approved assignment concept. It works like a
  small cinema's programme, with a lineup of films, a showtimes board and a
  ticket request form.
- **Audience:** people planning an evening out who want to see what is
  showing, when, and how much it costs.
- **Purpose:** to help a visitor choose a film and request tickets in a few
  steps.

All screenings, prices and bookings are fictional demonstrations.
No real bookings, payments or emails are made.

## Pages

| Page | File | What it does |
|---|---|---|
| Home | `index.html` | Introduces the site, shows the featured titles in a moving poster reel and lists upcoming showtimes by day. |
| Movies | `movies.html` | Lists every title. Visitors can filter by genre and open a details pop-up for any title. |
| Ticket Requests | `tickets.html` | A booking request form with validation, a live price total and a request summary. |

All three pages share the same navigation bar, footer and visual style.

## Features

- **Poster reel (home page):**
  - JavaScript builds the reel from the `movies` array, so every film appears
    with its title, genre and status.
  - The posters scroll continuously across the screen.
  - The reel pauses while the mouse is over it or it has keyboard focus.
  - A "Pause poster reel" button stops and restarts it.
  - Visitors whose device asks for reduced motion get a still row they can
    scroll themselves.
- **Genre filter:** choosing a genre redraws the movie list and updates the
  "Showing X of Y titles" message.
- **Details Modal:** each "View details" button fills one shared Bootstrap
  Modal with that film's poster, status, genre, description and screening.
- **Ticket request form:**
  - It is submitted through a JavaScript `submit` handler.
  - It checks the name, email, film, screening and number of tickets.
  - Each field with a problem is highlighted, and the cursor moves to the
    first one.
  - A confirmation message and a Toast notification appear when the request
    succeeds.
- **Live total:** the sample price updates as the ticket number changes
  (J$1,500 per ticket, 1 to 6 tickets).
- **Dependent dropdown:** the screening list only becomes active after a film
  with a scheduled screening is chosen. Films marked "Coming soon" cannot be
  selected.
- **Summary toggle (jQuery):** shows or hides the request summary.

## Technologies

- HTML5 (semantic elements: `header`, `nav`, `main`, `section`, `article`,
  `aside`, `figure`, `footer`, `fieldset`, `time`)
- CSS3 (`css/styles.css`)
- Bootstrap 5.3.8 (CSS and JavaScript bundle from the jsDelivr CDN)
- JavaScript (`js/app.js`)
- jQuery 3.7.1 (from code.jquery.com)
- Google Fonts: Big Shoulders Display (headings) and Instrument Sans (body text)

## Bootstrap usage

**Bootstrap JavaScript components**

| Component | Where | How it is used |
|---|---|---|
| Collapse | Navbar on every page | The menu collapses behind a toggle button on small screens. |
| Modal | `movies.html` | One Modal is reused for every film. JavaScript fills it in the `show.bs.modal` event. |
| Toast | `tickets.html` | Created with `new bootstrap.Toast()` and shown when a request succeeds. |

**Other Bootstrap features**

- Responsive navbar (`navbar-expand-md`)
- Containers and grid (`container`, `row`, `col-*`, `row-cols-*`)
- Cards for each film on the Movies page (`card`, `card-img-top`,
  `card-body`, `card-title`, `card-text`)
- Buttons (`btn`, `btn-primary`, `btn-outline-light`, `btn-lg`)
- Form controls and validation styles (`form-control`, `form-select`,
  `form-label`, `form-text`, `is-invalid`, `invalid-feedback`)
- Spacing and responsive utilities (`mb-0`, `mt-4`, `py-4`, `my-2 my-md-0`,
  `gap-md-3`, `gx-lg-5`, `d-none`, `w-100`, `visually-hidden`,
  `visually-hidden-focusable`)

## JavaScript concepts (`js/app.js`)

| Concept | Where it is used |
|---|---|
| Variables | `const` for fixed values and element references; `let visibleCount` changes as the list is drawn. |
| Data types | Strings (titles, genres), numbers (`id`, `ticketPrice`, quantity), booleans (`isComingSoon`, validation results). |
| Array | `movies` holds the whole film collection. |
| Objects | Each film is an object with `id`, `title`, `genre`, `isComingSoon`, `image`, `imageAlt`, `description` and `screening`. |
| Conditions | `getScreeningStatus()` uses `if/else`; the filter, the form validation and the summary toggle all make decisions. |
| Functions | `createReelItem()`, `renderMovies()`, `populateMovieDetails()`, `formatMoney()`, `getValidQuantity()`, `updateScreeningOptions()`, `updateSummary()`, `setFieldState()` and others. |
| Iteration | `for...of` loops build the poster reel, draw the movie list, fill the title dropdown and clear old error states. |
| DOM selection | `document.querySelector()` and `querySelectorAll()`. |
| DOM modification | Changes `textContent`, `innerHTML`, classes (`is-invalid`, `d-none`), attributes (`aria-invalid`, `disabled`, `src`, `alt`) and dropdown options. |
| Events | `change` (genre filter, dropdowns), `input` (ticket quantity), `submit` (form), `show.bs.modal` (Modal), `click` (reel pause button, jQuery toggle). |

## jQuery

On the Ticket Requests page, jQuery is used for the **Hide summary / Show
summary** button:

```js
$("#summaryToggle").on("click", function () { ... });
```

- `$("#summaryToggle")` selects the button, and `.on("click")` listens for
  clicks.
- `.attr()` swaps `aria-expanded` between `true` and `false`, and `.text()`
  changes the button label.
- `$("#summaryDetails").slideToggle()` shows or hides the summary details.
- If the visitor's device asks for reduced motion, the slide happens
  instantly.

## Accessibility and responsive design

- Skip link to the main content, and a logical heading order on each page.
- Every form field has a label. Error messages are linked to their fields with
  `aria-describedby`.
- Every poster has descriptive alt text. The repeated copies that make the reel
  loop are hidden from screen readers.
- The moving reel can be paused, and it stays still for visitors who prefer
  reduced motion.
- Keyboard focus is clearly visible.
- Layouts were tested at mobile (375px), tablet (768px) and desktop (1280px)
  widths.

## Project structure

```
movie-night/
├── index.html
├── movies.html
├── tickets.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── images/
│   ├── judy.avif
│   ├── pulp-fiction.avif
│   ├── spider-man.avif
│   ├── vintage-fire-wrecks-a-forest.avif
│   ├── vintage-montreal-winter-sports.avif
│   └── vintage-washington-dc.avif
└── README.md
```

## How to run

Download or clone the repository, then open `index.html` in a web browser.
An internet connection is needed to load Bootstrap, jQuery and the fonts
from their CDNs.

## Image credits

Photographs and vintage poster scans are from [Unsplash](https://unsplash.com)
and are used under the Unsplash License. Some images show film artwork that
belongs to its studios. It is used here only for a non-commercial student
project.

*Fire Wrecks a Forest*, *Washington D.C.* and *Montreal Winter Sports* are
fictional films created for this project. They are named after the vintage
posters used as their artwork.

## AI assistance

AI tools were used as development aids, as the assignment allows:

- **ChatGPT** helped with planning the website concept and pages.
- **Claude Code** (Anthropic) was used near the end of the project to:
  - redesign the visual style, by rewriting `css/styles.css` and adjusting the
    page layout markup;
  - update the film lineup, text and genres for the new images;
  - build the continuous poster reel on the home page;
  - check the site against the assignment requirements.

The site structure, page content and JavaScript functionality (filter, Modal,
form validation, live total, Toast and jQuery toggle) were built by me in
earlier commits. I reviewed and tested all AI-assisted changes, and I can
explain the code.

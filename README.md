# Talha Islam — CV

A professional web CV built with plain **HTML, CSS and JavaScript** (no frameworks, no build step).
The CV content lives in a JavaScript data object in `script.js` and is rendered in the browser,
so updating the CV means editing one data object.

## Files

- `index.html` — page shell
- `style.css` — styling (screen + print/PDF)
- `script.js` — CV data + renderer
- `avatar/` — pre-rendered poses for the hero "living avatar": a canvas swaps
  between them so the character's gaze follows the visitor's cursor, blinks on
  a timer, and cycles fun expressions (grin / heart-eyes / mock-angry) on click.
  On touch devices the gaze wanders on its own. Pure canvas + timers, no libraries.

## Use

Open `index.html` in any browser, or visit the live GitHub Pages link for this repository.
Use the **Print / Save as PDF** button on the page to export a clean PDF copy.

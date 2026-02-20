# Collins-Alu_Book-Notes-Vault-
Summative assignment


# Book & Notes Vault 

A privacy-first, offline-capable web application designed to help readers track their books, notes, and reading goals. Built entirely with **Vanilla HTML, CSS, and JavaScript**—no frameworks or external libraries.

##  Key Features

This project was built to demonstrate core front-end development skills, specifically focusing on Regex, DOM manipulation, accessibility, and modular architecture.

* **Advanced Regex Validation & Search:**
  * Custom form validation (no default browser tooltips) handling strict patterns for titles, tags, and dates.
  * *Advanced:* Uses Regex back-references `\b(\w+)\s+\1\b` to warn users of accidental duplicate words in book titles.
  * Live search functionality compiles user input into regular expressions on the fly, highlighting matches safely within the DOM.
* **Semantic & Accessible (a11y):**
  * 100% keyboard navigable with visible custom focus states.
  * Utilizes `aria-live` regions to announce dynamic state changes (e.g., reaching a reading goal, deleting a record) to screen readers.
  * Semantic HTML5 landmarks (`<nav>`, `<main>`, `<article>`, `<section>`).
* **Mobile-First Responsive Design:**
  * Custom CSS handles fluid layouts across 3 breakpoints (Mobile, Tablet, Desktop).
  * Includes a complex mobile CSS trick that physically breaks standard `<table>` rows into stacked "cards" on small screens to prevent horizontal scrolling.
  * Full Light/Dark mode theming using CSS variables and DOM data-attributes.
* **State Management & Persistence:**
  * Auto-saves all user data and UI preferences (theme, reading goals) directly to browser `localStorage`.
  * Includes JSON Import and Export functionality with structural validation to prevent corrupt data loading.
* **Modular JavaScript Architecture:**
  * Built using strict ES Modules to separate concerns (State, Storage, UI, Validation, Search, and App logic).

## File Structure

```text
/book-vault
  ├── index.html              # Main semantic HTML skeleton
  ├── README.md               # Project documentation
  ├── styles/
  │   ├── main.css            # Reset, variables, accessibility, dark mode
  │   ├── layout.css          # Structural layout, Flexbox/Grid
  │   └── components.css      # Forms, buttons, mobile-first table cards
  ├── scripts/
  │   ├── app.js              # Main controller & event listeners
  │   ├── state.js            # In-memory data management
  │   ├── storage.js          # LocalStorage & JSON handling
  │   ├── ui.js               # DOM manipulation & rendering
  │   ├── validators.js       # Regex logic for forms
  │   └── search.js           # Regex compilation & filtering logic
  └── assets/                 # (Optional) Icons or placeholder images
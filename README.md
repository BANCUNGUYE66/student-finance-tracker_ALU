# Student Finance Tracker_ALU

A single-page web application to help students track their expenses and income efficiently.

## Chosen Theme / Concept

(Describe your visual theme here. For example: A clean, minimalist design with a focus on data clarity and accessibility. It uses a card-based layout on mobile and a traditional table on desktop for optimal viewing.)

## Feature List

-   [x] Add, Edit, and Delete financial records (CRUD).
-   [x] Persistent storage using `localStorage`.
-   [x] Dashboard with key stats (total spent, top category, etc.).
-   [ ] Live search with regular expression support.
-   [ ] Sort records by date, description, or amount.
-   [ ] Light and Dark theme toggle.
-   [x] Fully responsive design for mobile, tablet, and desktop.
-   [x] Accessible (WCAG AA): Keyboard navigable, semantic HTML, ARIA roles.
-   [ ] Import and Export data as JSON.

## Regex Catalog

Here are the regular expressions used for validation:

1.  **Description**: `/^\S(?:.*\S)?$/`
    -   *Purpose*: Ensures the description is not empty or just whitespace.
    -   *Example Match*: `Coffee`, `My new textbook`
    -   *Example No Match*: `   `, `` (empty string)

2.  **Amount**: `/^(0|[1-9]\d*)(\.\d{1,2})?$/`
    -   *Purpose*: Validates a positive number with up to two decimal places.
    -   *Example Match*: `12`, `55.50`, `0.99`
    -   *Example No Match*: `-10`, `12.345`, `abc`
    
3.  **Duplicate Word**: `/\b(\w+)\s+\1\b/i`
    -   *Purpose*: Catches accidentally repeated words.
    -   *Example Match*: `Bus pass for for the month`
    -   *Example No Match*: `Bus pass for the month`

*(...add the other regex patterns here...)*

## Keyboard Navigation Map

-   **`Tab`**: Move focus between all interactive elements (links, buttons, inputs).
-   **`Shift + Tab`**: Move focus backward.
-   **`Enter`**: Activate a focused button or submit a form.
-   **`Escape`**: Close the Add/Edit modal form.
-   **(Optional) `ArrowUp`/`ArrowDown`**: Navigate records in the table.

## Accessibility Notes

-   **Skip Link**: The first focusable element is a "Skip to main content" link for screen reader users.
-   **Semantic HTML**: Uses `<header>`, `<nav>`, `<main>`, `<section>`, and `<footer>` for clear document structure.
-   **ARIA Live Region**: The dashboard's cap/target status uses `role="status"` and `aria-live="polite"` to announce updates without interrupting the user.
-   **Visible Focus**: All interactive elements have a clear and consistent focus ring.

## How to Run / Test

1.  Clone the repository.
2.  Open the `index.html` file in a modern web browser.
3.  To run tests, open the browser's developer console to check for errors and log messages.
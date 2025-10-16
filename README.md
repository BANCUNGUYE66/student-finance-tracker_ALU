# Student Finance Tracker 📊

A clean, responsive, and fully-featured web application designed to help students track their finances. This single-page application is built with vanilla JavaScript, focusing on a modular codebase, modern design principles, and full accessibility.

[![Live Demo](https://img.shields.io/badge/Live-Demo-6a5acd?style=for-the-badge)](https://bancunguye66.github.io/student-finance-tracker_ALU/)

## 🎥 Demo Video

[**Watch the full video demo on Loom**](https://www.loom.com/share/a7a7c24c63214781987b91069f4ae56d)



## ✅ Features

* **Full CRUD Functionality:** Add, read, update, and delete financial records seamlessly.
* **Persistent Storage:** All data is saved in the browser's `localStorage`, so your records are safe across sessions.
* **Dynamic Dashboard:** Get an at-a-glance overview of your finances with stats for total records, total amount spent, and your top spending category.
* **Responsive Design:** A polished, mobile-first design that provides a card-based view on mobile and a full table view on desktop.
* **Live Search & Sort:** Instantly filter records using text or regular expressions. Sort your data by date, amount, or description in ascending or descending order.
* **Modern Theming:** A beautiful light/dark mode toggle that persists based on user preference.
* **Data Portability:** Easily import and export your financial records as a JSON file for backup or migration.
* **Robust Validation:** The input form uses regular expressions to validate data, ensuring data integrity.

## 🛠️ Tech Stack

* **HTML5:** For semantic structure and accessibility.
* **CSS3:** For modern styling, responsiveness, and theming (CSS Variables).
* **JavaScript (ES6+):** For all application logic, including DOM manipulation, state management, and event handling using ES Modules.

## 🚀 Setup and Installation

To run this project locally:

1.  Clone the repository:
    ```bash
    git clone [https://github.com/BANCUNGUYE66/student-finance-tracker_ALU.git](https://github.com/BANCUNGUYE66/student-finance-tracker_ALU.git)
    ```
2.  Navigate to the project directory:
    ```bash
    cd student-finance-tracker_ALU
    ```
3.  Open the `index.html` file in your favorite web browser.

## Key Features & Implementation

### Responsive Design

The application is built with a mobile-first approach.
* **On screens smaller than 768px**, records are displayed as individual cards for optimal readability and touch interaction.
* **On screens larger than 768px**, the layout switches to a traditional table view to make use of the wider screen space.

### Regex Validation Catalog

The "Add/Edit Record" form uses the following regular expressions for robust input validation:

| Field         | Regex Pattern                  | Purpose                                        |
| :------------ | :----------------------------- | :--------------------------------------------- |
| **Description** | `^\S(?:.*\S)?$`                | Ensures the field is not empty or just whitespace. |
| **Amount** | `^(0|[1-9]\d*)(\.\d{1,2})?$`    | Validates a positive number with up to 2 decimals. |
| **Category** | `^[A-Za-z]+(?:[ -][A-Za-z]+)*$` | Allows letters, spaces, and hyphens for category names. |
| **Duplicate Word**| `\b(\w+)\s+\1\b`                 | An advanced check to catch accidental repeated words. |

### Accessibility ♿

Accessibility was a key focus during development. The application includes:
* **Semantic HTML:** Proper use of `<header>`, `<main>`, `<nav>`, and `<section>` landmarks.
* **Keyboard Navigation:** The entire application is fully navigable using only the keyboard (`Tab`, `Shift+Tab`, `Enter`).
* **Visible Focus States:** All interactive elements have a clear and consistent focus ring.
* **Form Labels:** All form inputs are properly linked to their corresponding labels for screen reader compatibility.
* **Skip Link:** A "Skip to main content" link is the first focusable element for users who want to bypass the navigation.

### Keyboard Navigation Map

* **`Tab`**: Move focus forward to the next interactive element.
* **`Shift + Tab`**: Move focus backward.
* **`Enter`**: Activate a focused button or submit a form.

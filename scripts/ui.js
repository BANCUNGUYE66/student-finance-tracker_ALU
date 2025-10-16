import { appState } from './state.js';

/**
 * Renders the records into the container.
 * Switches between table (desktop) and card (mobile) view.
 * @param {Array<object>} records - The records to display.
 */
export function renderRecords(records) {
    const container = document.getElementById('records-container');
    container.innerHTML = ''; // Clear existing content

    if (records.length === 0) {
        container.innerHTML = '<p>No records found. Add one to get started!</p>';
        return;
    }

    if (window.innerWidth < 768) {
        const cardView = document.createElement('div');
        cardView.className = 'records-cards';
        cardView.innerHTML = `<p>Card view for ${records.length} records will show here.</p>`
        container.appendChild(cardView);
    } else {
        const tableView = document.createElement('table');
        tableView.className = 'records-table';
        tableView.innerHTML = `
            <thead><tr><th>Description</th><th>Amount</th><th>Category</th><th>Date</th></tr></thead>
            <tbody><tr><td>Sample</td><td>$10.00</td><td>Food</td><td>2025-10-16</td></tr></tbody>
        `;
        container.appendChild(tableView);
    }
}

/**
 * Renders the dashboard statistics.
 * @param {object} stats 
 */
export function renderDashboard(stats) {
    const container = document.getElementById('dashboard-stats');
    container.innerHTML = `
        <div class="stat-item">
            <h4>Total Records</h4>
            <p>${stats.totalRecords}</p>
        </div>
        <div class="stat-item">
            <h4>Total Spent</h4>
            <p>${stats.totalAmount}</p>
        </div>
        <div class="stat-item">
            <h4>Top Category</h4>
            <p>${stats.topCategory}</p>
        </div>
    `;
}

/**
 * Toggles the visibility of the Add/Edit form modal.
 * @param {boolean} show - Whether to show or hide the modal.
 * @param {object | null} record - The record data to populate the form with (for editing).
 */

export function populateCategoryDropdown() {
    const categorySelect = document.getElementById('category');
    if (!categorySelect) return;

    categorySelect.innerHTML = '';

    appState.categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

/**
 * Updates the ARIA live region for cap/target status.
 * @param {string} message 
 */
export function updateCapStatus(message) {
    const statusEl = document.getElementById('cap-target-status');
    statusEl.textContent = message;
}
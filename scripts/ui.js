

/**
 * Renders the records into the container.
 * Switches between table (desktop) and card (mobile) view.
 * @param {Array<object>} records - The records to display.
 */
export function renderRecords(records) {
    const container = document.getElementById('records-container');
    container.innerHTML = ''; // Clear existing content

    if (window.innerWidth < 768) {
        const cardView = document.createElement('div');
        cardView.className = 'records-cards';
        container.appendChild(cardView);
    } else {
        const tableView = document.createElement('table');
        tableView.className = 'records-table';
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
 * @param {boolean} show 
 * @param {object | null} record 
 */
export function toggleFormModal(show, record = null) {
    const modal = document.getElementById('form-modal');
    const formTitle = document.getElementById('form-title');
    const form = document.getElementById('record-form');

    if (show) {
        form.reset();
        if (record) {
            formTitle.textContent = 'Edit Record';
        } else {
            formTitle.textContent = 'Add Record';
        }
        modal.hidden = false;
    } else {
        modal.hidden = true;
    }
}

/**
 * Updates the ARIA live region for cap/target status.
 * @param {string} message 
 */
export function updateCapStatus(message) {
    const statusEl = document.getElementById('cap-target-status');
    statusEl.textContent = message;
}
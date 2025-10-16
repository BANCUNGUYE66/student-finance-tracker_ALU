import { appState } from './state.js';

/**
 * @param {Array<object>} records
 */
export function renderRecords(records) {
    const container = document.getElementById('records-container');
    container.innerHTML = '';

    if (records.length === 0) {
        container.innerHTML = '<p class="empty-state">No records found. Try clearing your search or adding a new record!</p>';
        return;
    }

    if (window.innerWidth < 768) {
        renderCardView(records, container);
    } else {
        renderTableView(records, container);
    }
}

function renderTableView(records, container) {
    const table = document.createElement('table');
    table.className = 'records-table';
    table.innerHTML = `
        <thead>
            <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Date</th>
                <th>Actions</th>
            </tr>
        </thead>
    `;
    const tbody = document.createElement('tbody');
    records.forEach(record => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${record.highlightedDescription || record.description}</td>
            <td>$${record.amount.toFixed(2)}</td>
            <td>${record.category}</td>
            <td>${new Date(record.date).toLocaleDateString()}</td>
            <td>
                <button class="edit-btn" data-id="${record.id}" title="Edit">✏️</button>
                <button class="delete-btn" data-id="${record.id}" title="Delete">🗑️</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    container.appendChild(table);
}

function renderCardView(records, container) {
    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'records-cards';
    records.forEach(record => {
        const card = document.createElement('div');
        card.className = 'record-card';
        card.innerHTML = `
            <div class="card-header">
                <strong>${record.highlightedDescription || record.description}</strong>
                <span class="card-amount">$${record.amount.toFixed(2)}</span>
            </div>
            <div class="card-body">
                <span>Category: ${record.category}</span>
                <span>Date: ${new Date(record.date).toLocaleDateString()}</span>
            </div>
            <div class="card-actions">
                <button class="edit-btn" data-id="${record.id}">Edit</button>
                <button class="delete-btn" data-id="${record.id}">Delete</button>
            </div>
        `;
        cardsContainer.appendChild(card);
    });
    container.appendChild(cardsContainer);
}


/**
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
            <p>$${stats.totalAmount.toFixed(2)}</p>
        </div>
        <div class="stat-item">
            <h4>Top Category</h4>
            <p>${stats.topCategory}</p>
        </div>
    `;
}

/**
 * @param {object | null} record
 */
export function showAndPopulateForm(record = null) {
    const form = document.getElementById('record-form');
    const formTitle = form.querySelector('h3');
    
    form.reset(); 
    document.getElementById('record-id').value = ''; 
    if (record) {
        formTitle.textContent = 'Edit Record';
        document.getElementById('record-id').value = record.id;
        document.getElementById('description').value = record.description;
        document.getElementById('amount').value = record.amount;
        document.getElementById('category').value = record.category;
        document.getElementById('date').value = record.date;
    } else {
        formTitle.textContent = 'Add a New Record';
    }
}


export function populateCategoryDropdown() {
    const categorySelect = document.getElementById('category');
    categorySelect.innerHTML = '';
    appState.categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}
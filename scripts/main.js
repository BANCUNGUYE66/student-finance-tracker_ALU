import { initializeState, appState, addRecord } from './state.js';
import { initializeTheme, toggleTheme } from './theme.js';
import { renderDashboard, renderRecords, populateCategoryDropdown } from './ui.js';

/**
 * Switches the visible view (Dashboard, Records, etc.)
 * @param {string} viewId The ID of the section to show.
 */
function switchView(viewId) {
    document.querySelectorAll('.view').forEach(view => view.classList.remove('active-view'));
    document.getElementById(viewId).classList.add('active-view');
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.view === viewId);
    });
}

function init() {
    initializeState();
    initializeTheme();
    populateCategoryDropdown();
    updateFullUI();
    setupEventListeners();
    console.log("Application Initialized. State:", appState);
}

function updateFullUI() {
    const stats = { totalRecords: appState.records.length, totalAmount: 0, topCategory: 'N/A' };
    renderDashboard(stats);
    renderRecords(appState.records);
}

function setupEventListeners() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            switchView(link.dataset.view);
        });
    });

    const themeToggleButton = document.getElementById('theme-toggle');
    themeToggleButton.addEventListener('click', toggleTheme);

    const addRecordButton = document.getElementById('add-record-btn');
    addRecordButton.addEventListener('click', () => switchView('dashboard'));

    const recordForm = document.getElementById('record-form');
    recordForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = {
            description: document.getElementById('description').value.trim(),
            amount: parseFloat(document.getElementById('amount').value),
            category: document.getElementById('category').value,
            date: document.getElementById('date').value,
        };

        const newRecord = {
            id: `rec_${new Date().getTime()}`,
            ...formData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        addRecord(newRecord);
        updateFullUI();
        recordForm.reset();
    });
}

document.addEventListener('DOMContentLoaded', init);
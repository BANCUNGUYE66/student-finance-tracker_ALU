
import { initializeState, appState } from './state.js';
import { initializeTheme, toggleTheme } from './theme.js';
import { renderDashboard, renderRecords, toggleFormModal } from './ui.js';

async function init() {
    await initializeState();
    
    initializeTheme();
    
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
    const themeToggleButton = document.getElementById('theme-toggle');
    themeToggleButton.addEventListener('click', toggleTheme);

    const addRecordButton = document.getElementById('add-record-btn');
    addRecordButton.addEventListener('click', () => toggleFormModal(true));

    const cancelButton = document.getElementById('cancel-btn');
    cancelButton.addEventListener('click', () => toggleFormModal(false));

}

document.addEventListener('DOMContentLoaded', init);
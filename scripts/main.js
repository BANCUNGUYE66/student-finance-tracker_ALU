import { initializeState, appState, addRecord, updateRecord, deleteRecord, saveState } from './state.js';
import { initializeTheme, toggleTheme } from './theme.js';
import { renderDashboard, renderRecords, populateCategoryDropdown, showAndPopulateForm } from './ui.js';
import { searchRecords, sortRecords } from './search.js';

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
    const totalAmount = appState.records.reduce((sum, record) => sum + record.amount, 0);
    const categorySpending = appState.records.reduce((acc, record) => {
        acc[record.category] = (acc[record.category] || 0) + record.amount;
        return acc;
    }, {});
    const topCategory = Object.keys(categorySpending).reduce((a, b) => categorySpending[a] > categorySpending[b] ? a : b, 'None');
    
    const stats = { totalRecords: appState.records.length, totalAmount, topCategory };
    renderDashboard(stats);

    let processedRecords = searchRecords(appState.ui.searchTerm, appState.records);
    processedRecords = sortRecords(processedRecords, appState.ui.sortBy, appState.ui.sortDirection);
    renderRecords(processedRecords);

    document.getElementById('sort-by').value = appState.ui.sortBy;
    document.getElementById('sort-direction').value = appState.ui.sortDirection;
}

function setupEventListeners() {

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => { e.preventDefault(); switchView(link.dataset.view); });
    });

    const themeToggleButton = document.getElementById('theme-toggle');
    if(themeToggleButton) themeToggleButton.addEventListener('click', toggleTheme);

    const recordForm = document.getElementById('record-form');
    recordForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const recordId = document.getElementById('record-id').value;
        const formData = {
            description: document.getElementById('description').value.trim(),
            amount: parseFloat(document.getElementById('amount').value),
            category: document.getElementById('category').value,
            date: document.getElementById('date').value,
        };

        if (recordId) {
            updateRecord({ id: recordId, ...formData });
        } else {
            const newRecord = { id: `rec_${new Date().getTime()}`, ...formData, createdAt: new Date().toISOString() };
            addRecord(newRecord);
        }
        updateFullUI();
        recordForm.reset();
        document.getElementById('record-id').value = '';
        showAndPopulateForm();
    });

    const recordsContainer = document.getElementById('records-container');
    recordsContainer.addEventListener('click', (event) => {
        if (event.target.matches('.edit-btn')) {
            const recordId = event.target.dataset.id;
            const recordToEdit = appState.records.find(r => r.id === recordId);
            if (recordToEdit) {
                showAndPopulateForm(recordToEdit);
                switchView('dashboard');
            }
        }
        if (event.target.matches('.delete-btn')) {
            const recordId = event.target.dataset.id;
            if (confirm('Are you sure you want to delete this record?')) {
                deleteRecord(recordId);
                updateFullUI();
            }
        }
    });

    document.getElementById('search-input').addEventListener('input', (e) => {
        appState.ui.searchTerm = e.target.value;
        updateFullUI();
    });
    document.getElementById('sort-by').addEventListener('change', (e) => {
        appState.ui.sortBy = e.target.value;
        updateFullUI();
    });
    document.getElementById('sort-direction').addEventListener('change', (e) => {
        appState.ui.sortDirection = e.target.value;
        updateFullUI();
    });
    
    document.getElementById('export-json-btn').addEventListener('click', () => {
        const dataStr = JSON.stringify(appState.records, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `finance_records_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
    
    document.getElementById('import-json-input').addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedRecords = JSON.parse(e.target.result);
                if (Array.isArray(importedRecords)) {
                    appState.records = importedRecords;
                    saveState();
                    updateFullUI();
                    alert('Records imported successfully!');
                } else {
                    throw new Error('Invalid JSON format: Not an array.');
                }
            } catch (error) {
                alert(`Failed to import records: ${error.message}`);
            }
        };
        reader.readAsText(file);
        event.target.value = ''; 
    });
}

document.addEventListener('DOMContentLoaded', init);
window.addEventListener('resize', updateFullUI); 
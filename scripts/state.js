import { loadData, saveData } from './storage.js';
import seedData from '../seed.json' with { type: 'json' };

const defaultState = {
    records: [],
    categories: ["Food", "Books", "Transport", "Entertainment", "Fees", "Other"],
    ui: {
        searchTerm: '',
        sortBy: 'date',
        sortDirection: 'desc',
    },
    settings: {
        theme: 'light',
        currency: 'USD',
        cap: 1000,
    }
};

export const appState = {};

export function initializeState() {
    const loadedData = loadData();
    if (loadedData) {
        Object.assign(appState, loadedData);
        if (!appState.ui) {
            appState.ui = defaultState.ui;
        }
    } else {
        Object.assign(appState, defaultState);
        appState.records = seedData;
        saveState();
    }
}

export function saveState() {
    saveData(appState);
}

export function addRecord(record) {
    appState.records.push(record);
    saveState();
}

export function updateRecord(updatedRecord) {
    const index = appState.records.findIndex(record => record.id === updatedRecord.id);
    if (index !== -1) {
        appState.records[index] = {
            ...appState.records[index], 
            ...updatedRecord,
            updatedAt: new Date().toISOString() 
        };
        saveState();
    }
}

export function deleteRecord(recordId) {
    appState.records = appState.records.filter(record => record.id !== recordId);
    saveState();
}
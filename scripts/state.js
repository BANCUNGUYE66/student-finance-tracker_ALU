
import { loadData, saveData } from './storage.js';
import seedData from '../seed.json' with { type: 'json' };

const defaultState = {
    records: [], 
    categories: ["Food", "Books", "Transport", "Entertainment", "Fees", "Other"],
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

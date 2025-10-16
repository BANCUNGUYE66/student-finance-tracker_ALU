
import { loadData, saveData } from './storage.js';


const defaultState = {
    records: [],
    categories: ["Food", "Books", "Transport", "Entertainment", "Fees", "Other"],
    settings: {
        theme: 'light',
        currency: 'USD',
        cap: 1000,
    }
};

export const appState = {
    // This will be populated on initialization
};


export async function initializeState() {
    const loadedData = loadData();
    if (loadedData) {
        Object.assign(appState, loadedData);
    } else {
        // No data in storage, use defaults and load seed data
        Object.assign(appState, defaultState);
        try {
            const response = await fetch('../seed.json');
            appState.records = await response.json();
            saveState(); // Save the initial seed data
        } catch (error) {
            console.error("Failed to load seed data:", error);
        }
    }
}


export function saveState() {
    saveData(appState);
}


export function addRecord(record) {
    appState.records.push(record);
    saveState();
}

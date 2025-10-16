

const STORAGE_KEY = 'financeTrackerData';

/**
 * Loads data from localStorage.
 * @returns {object | null} The parsed data or null if not found.
 */
export function loadData() {
    const dataJSON = localStorage.getItem(STORAGE_KEY);
    return dataJSON ? JSON.parse(dataJSON) : null;
}

/**
 * Saves data to localStorage.
 * @param {object} data The application state to save.
 */
export function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
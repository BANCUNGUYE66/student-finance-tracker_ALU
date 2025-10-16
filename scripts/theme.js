

import { appState, saveState } from "./state.js";

export function applyTheme() {
    document.documentElement.setAttribute('data-theme', appState.settings.theme);
}

export function toggleTheme() {
    appState.settings.theme = appState.settings.theme === 'light' ? 'dark' : 'light';
    applyTheme();
    saveState();
}

export function initializeTheme() {
    if (appState.settings && appState.settings.theme) {
        applyTheme();
    }
}
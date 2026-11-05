const STORAGE_KEY = 'theme';
const root = document.documentElement;

function getSavedTheme() {
    try {
        return localStorage.getItem(STORAGE_KEY);
    } catch {
        return null;
    }
}

function saveTheme(theme) {
    try {
        localStorage.setItem(STORAGE_KEY, theme);
    } catch {}
}

function systemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
}

applyTheme(getSavedTheme() || systemTheme());

document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.theme-toggle');

    toggle.addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        saveTheme(next);
    });
});

const HISTORY_KEY = 'qrify_history_v1';
const THEME_KEY = 'qrify_theme';
const LAST_CONFIG_KEY = 'qrify_last_config';

export function getStoredHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed reading history from localStorage', e);
    return [];
  }
}

export function saveHistoryToStorage(historyItems) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(historyItems));
  } catch (e) {
    console.error('Failed saving history to localStorage', e);
  }
}

export function clearStoredHistory() {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (e) {
    console.error('Failed clearing history', e);
  }
}

export function getStoredTheme() {
  try {
    return localStorage.getItem(THEME_KEY) || 'dark';
  } catch {
    return 'dark';
  }
}

export function setStoredTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    console.error('Failed saving theme', e);
  }
}

export function getStoredConfig() {
  try {
    const raw = localStorage.getItem(LAST_CONFIG_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setStoredConfig(config) {
  try {
    localStorage.setItem(LAST_CONFIG_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Failed saving config', e);
  }
}

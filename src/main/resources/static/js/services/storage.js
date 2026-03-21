/**
 * Storage Service - localStorage management
 * Handles session IDs, preferences, etc
 */

export const storage = {
  // Session management
  getSessionId: () => {
    let sid = localStorage.getItem('shopease_session');
    if (!sid) {
      sid = 'sess_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
      localStorage.setItem('shopease_session', sid);
    }
    return sid;
  },

  clearSession: () => localStorage.removeItem('shopease_session'),

  // Preferences
  getTheme: () => localStorage.getItem('shopease_theme') || 'dark',
  setTheme: (theme) => localStorage.setItem('shopease_theme', theme),

  // Generic get/set
  get: (key) => {
    const item = localStorage.getItem(key);
    try {
      return item ? JSON.parse(item) : null;
    } catch {
      return item;
    }
  },

  set: (key, value) => {
    if (typeof value === 'string') {
      localStorage.setItem(key, value);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  },

  remove: (key) => localStorage.removeItem(key),

  clear: () => localStorage.clear()
};

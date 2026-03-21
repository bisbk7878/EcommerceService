/**
 * Wishlist Service - Manages wishlist in DB via API
 * Stores sessionId-based favorites in backend
 */

import { api } from './api.js';
import { storage } from './storage.js';

const WISHLIST_KEY = 'shopease_wishlist';

export const wishlist = {
  // Get all wishlist items from database
  getAll: async () => {
    const sessionId = storage.getSessionId();
    if (!sessionId) return [];
    const items = await api.wishlist.getAll(sessionId);
    return Array.isArray(items) ? items : [];
  },

  // Add to wishlist via API
  add: async (productId) => {
    const sessionId = storage.getSessionId();
    if (!sessionId) return false;
    try {
      const result = await api.wishlist.add(sessionId, productId);
      if (result.success) {
        // Also store in localStorage for quick client-side checks
        let local = localStorage.getItem(WISHLIST_KEY);
        let w = local ? JSON.parse(local) : [];
        if (!w.includes(productId)) w.push(productId);
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(w));
        return true;
      }
      return false;
    } catch (e) {
      console.error('Add to wishlist error:', e);
      return false;
    }
  },

  // Remove from wishlist via API
  remove: async (productId) => {
    const sessionId = storage.getSessionId();
    if (!sessionId) return true;
    try {
      const result = await api.wishlist.remove(sessionId, productId);
      if (result.success) {
        // Also remove from localStorage
        let local = localStorage.getItem(WISHLIST_KEY);
        let w = local ? JSON.parse(local) : [];
        w = w.filter(id => id !== productId);
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(w));
        return true;
      }
      return false;
    } catch (e) {
      console.error('Remove from wishlist error:', e);
      return false;
    }
  },

  // Toggle wishlist status via API
  toggle: async (productId) => {
    const sessionId = storage.getSessionId();
    if (!sessionId) return false;
    try {
      const result = await api.wishlist.toggle(sessionId, productId);
      if (result.success) {
        // Update localStorage to match
        let local = localStorage.getItem(WISHLIST_KEY);
        let w = local ? JSON.parse(local) : [];
        if (result.isAdded) {
          if (!w.includes(productId)) w.push(productId);
        } else {
          w = w.filter(id => id !== productId);
        }
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(w));
        return result.isAdded;
      }
      return false;
    } catch (e) {
      console.error('Toggle wishlist error:', e);
      return false;
    }
  },

  // Check if in wishlist (uses localStorage for speed, syncs with DB)
  isInWishlist: (productId) => {
    let local = localStorage.getItem(WISHLIST_KEY);
    let w = local ? JSON.parse(local) : [];
    return w.includes(productId);
  },

  // Sync wishlist from DB to localStorage
  syncFromDB: async () => {
    const sessionId = storage.getSessionId();
    if (!sessionId) return;
    try {
      const items = await api.wishlist.getAll(sessionId);
      const productsArray = Array.isArray(items) ? items : [];
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(productsArray));
    } catch (e) {
      console.error('Sync wishlist error:', e);
    }
  },

  // Clear entire wishlist
  clear: async () => {
    const sessionId = storage.getSessionId();
    if (!sessionId) {
      localStorage.removeItem(WISHLIST_KEY);
      return;
    }
    try {
      const result = await api.wishlist.clear(sessionId);
      if (result.success) {
        localStorage.removeItem(WISHLIST_KEY);
      }
    } catch (e) {
      console.error('Clear wishlist error:', e);
    }
  }
};

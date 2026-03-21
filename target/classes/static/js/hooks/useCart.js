/**
 * useCart Hook - Shopping cart management
 */

import React from 'react';
import { api } from '../services/api.js';
import { storage } from '../services/storage.js';

export const useCart = () => {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const sessionId = storage.getSessionId();

  // Load cart on mount
  React.useEffect(() => {
    const loadCart = async () => {
      setLoading(true);
      try {
        console.log('Loading cart for session:', sessionId);
        const cartItems = await api.cart.getItems(sessionId);
        const itemsArray = Array.isArray(cartItems) ? cartItems : (cartItems?.data || []);
        console.log('Cart items loaded:', itemsArray?.length || 0);
        setItems(itemsArray);
      } catch (err) {
        console.error('Error loading cart:', err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, [sessionId]);

  const addToCart = React.useCallback(async (productId, quantity = 1) => {
    setLoading(true);
    try {
      await api.cart.addItem(sessionId, {
        productId,
        quantity,
        lastUpdated: new Date().toISOString()
      });
      const updated = await api.cart.getItems(sessionId);
      setItems(updated);
      return true;
    } catch (err) {
      console.error('Error adding to cart:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  const removeFromCart = React.useCallback(async (productId) => {
    setLoading(true);
    try {
      await api.cart.removeItem(sessionId, productId);
      const updated = await api.cart.getItems(sessionId);
      setItems(updated);
      return true;
    } catch (err) {
      console.error('Error removing from cart:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  const updateQuantity = React.useCallback(async (productId, quantity) => {
    setLoading(true);
    try {
      const updated = items.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      );
      setItems(updated);
      await api.cart.updateItem(sessionId, productId, quantity);
    } catch (err) {
      console.error('Error updating quantity:', err);
      setItems(items); // revert
    } finally {
      setLoading(false);
    }
  }, [items, sessionId]);

  const clearCart = React.useCallback(async () => {
    setLoading(true);
    try {
      await api.cart.clear(sessionId);
      setItems([]);
      return true;
    } catch (err) {
      console.error('Error clearing cart:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  const getTotalItems = React.useMemo(() => {
    return items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  }, [items]);

  const getTotalPrice = React.useMemo(() => {
    return items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  }, [items]);

  return {
    items,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice
  };
};

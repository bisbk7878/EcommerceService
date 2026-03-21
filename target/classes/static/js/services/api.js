/**
 * API Service - Centralized API calls
 * All backend communication happens here
 */

const API_BASE = 'http://localhost:8080/api';

export const api = {
  // PRODUCTS
  products: {
    getAll: () => fetch(`${API_BASE}/products`).then(r => r.json()),
    getById: (id) => fetch(`${API_BASE}/products/${id}`).then(r => r.json()),
    search: (keyword) => fetch(`${API_BASE}/products/search?keyword=${keyword}`).then(r => r.json()),
    getByCategory: (category) => fetch(`${API_BASE}/products/category/${category}`).then(r => r.json()),
    getCategories: () => fetch(`${API_BASE}/products/categories`).then(r => r.json()),
    // Featured and Trending use getAll (no backend endpoints yet)
    getFeatured: () => fetch(`${API_BASE}/products`).then(r => r.json()).then(data => {
      const arr = Array.isArray(data) ? data : (data?.data || []);
      return arr.slice(0, 6);
    }),
    getTrending: () => fetch(`${API_BASE}/products`).then(r => r.json()).then(data => {
      const arr = Array.isArray(data) ? data : (data?.data || []);
      return arr.slice(0, 6);
    }),
  },

  // CART
  cart: {
    getItems: (sessionId) => fetch(`${API_BASE}/cart/${sessionId}`).then(r => r.json()).catch(e => { console.error('Cart fetch failed:', e); return []; }),
    getCart: (sessionId) => fetch(`${API_BASE}/cart/${sessionId}`).then(r => r.json()).catch(e => { console.error('Cart fetch failed:', e); return []; }),
    addItem: (sessionId, data) =>
      fetch(`${API_BASE}/cart/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, ...data })
      }).then(r => r.json()).catch(err => { console.error('Add to cart failed:', err); return { error: err.message }; }),
    updateItem: (sessionId, productId, quantity) =>
      fetch(`${API_BASE}/cart/${sessionId}/item/${productId}?quantity=${quantity}`, {
        method: 'PUT'
      }).then(r => r.json()).catch(err => { console.error('Update item failed:', err); return []; }),
    removeItem: (sessionId, productId) =>
      fetch(`${API_BASE}/cart/${sessionId}/item/${productId}`, {
        method: 'DELETE'
      }).then(r => r.json()).catch(err => { console.error('Remove item failed:', err); return []; }),
    clear: (sessionId) =>
      fetch(`${API_BASE}/cart/${sessionId}`, {
        method: 'DELETE'
      }).then(r => r.json()).catch(err => { console.error('Clear cart failed:', err); return {}; }),
  },

  // ORDERS
  orders: {
    getAll: () => fetch(`${API_BASE}/orders`).then(r => r.json()).catch(e => { console.error('Orders fetch failed:', e); return []; }),
    getById: (id) => fetch(`${API_BASE}/orders/${id}`).then(r => r.json()).catch(e => { console.error('Order fetch failed:', e); return {}; }),
    // Note: Backend stores orders by ID, not sessionId. Use getAll() to get user's orders.
    getBySession: (sessionId) => {
      console.log('Note: getBySession called but backend uses numeric IDs. Returning empty array.');
      return Promise.resolve([]);
    },
    create: (sessionId, data) =>
      fetch(`${API_BASE}/orders/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, ...data })
      }).then(r => r.json()).catch(err => { console.error('Create order failed:', err); return { error: err.message }; }),
    checkout: (sessionId, customerName, customerEmail, phone, shippingAddress, items) =>
      fetch(`${API_BASE}/orders/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          customerName,
          customerEmail,
          phone,
          shippingAddress,
          items
        })
      }).then(r => r.json()).catch(err => { console.error('Checkout failed:', err); return { error: err.message }; }),
  },

  // WISHLIST
  wishlist: {
    getAll: (sessionId) => 
      fetch(`${API_BASE}/wishlist/${sessionId}`).then(r => r.json()).catch(e => { console.error('Wishlist fetch failed:', e); return []; }),
    
    add: (sessionId, productId) => 
      fetch(`${API_BASE}/wishlist/${sessionId}/${productId}`, { method: 'POST' })
        .then(r => r.json()).catch(e => { console.error('Add to wishlist failed:', e); return { error: e.message }; }),
    
    remove: (sessionId, productId) => 
      fetch(`${API_BASE}/wishlist/${sessionId}/${productId}`, { method: 'DELETE' })
        .then(r => r.json()).catch(e => { console.error('Remove from wishlist failed:', e); return { error: e.message }; }),
    
    toggle: (sessionId, productId) => 
      fetch(`${API_BASE}/wishlist/${sessionId}/${productId}`, { method: 'PUT' })
        .then(r => r.json()).catch(e => { console.error('Toggle wishlist failed:', e); return { error: e.message }; }),
    
    clear: (sessionId) => 
      fetch(`${API_BASE}/wishlist/${sessionId}`, { method: 'DELETE' })
        .then(r => r.json()).catch(e => { console.error('Clear wishlist failed:', e); return { error: e.message }; }),
    
    isInWishlist: (sessionId, productId) => 
      fetch(`${API_BASE}/wishlist/${sessionId}/contains/${productId}`).then(r => r.json()).catch(e => { console.error('Check wishlist failed:', e); return { isInWishlist: false }; }),
    
    getCount: (sessionId) => 
      fetch(`${API_BASE}/wishlist/${sessionId}/count`).then(r => r.json()).catch(e => { console.error('Get wishlist count failed:', e); return { count: 0 }; })
  }
};

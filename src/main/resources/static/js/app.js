/**
 * Main App Component - Application orchestrator
 */

import React from 'react';
import { Header } from './components/Header.js';
import { Hero } from './components/Hero.js';
import { ProductGrid } from './components/ProductGrid.js';
import { FeaturedCarousel } from './components/FeaturedCarousel.js';
import { Testimonials } from './components/Testimonials.js';
import { Newsletter } from './components/Newsletter.js';
import { Cart } from './components/Cart.js';
import { Orders } from './components/Orders.js';
import { Footer } from './components/Footer.js';

import { useProducts } from './hooks/useProducts.js';
import { useCart } from './hooks/useCart.js';
import { useToast } from './hooks/useToast.js';

import { api } from './services/api.js';
import { storage } from './services/storage.js';
import { wishlist } from './services/wishlist.js';

export const App = () => {
  const [currentPage, setCurrentPage] = React.useState('home');
  const [searchQuery, setSearchQuery] = React.useState('');
  const { products, featured, trending, categories, loading: productsLoading, search } = useProducts();
  const { items, getTotalItems, addToCart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const { toasts } = useToast();

  const [orders, setOrders] = React.useState([]);
  const [ordersLoading, setOrdersLoading] = React.useState(false);

  // Load orders on mount
  React.useEffect(() => {
    const loadOrders = async () => {
      setOrdersLoading(true);
      try {
        const sessionId = storage.getSessionId();
        console.log('Loading orders for session:', sessionId);
        const orderData = await api.orders.getBySession(sessionId);
        const ordersArray = Array.isArray(orderData) ? orderData : (orderData?.data || []);
        console.log('Orders loaded:', ordersArray?.length || 0);
        setOrders(ordersArray);
      } catch (err) {
        console.error('Error loading orders:', err);
        setOrders([]);
      } finally {
        setOrdersLoading(false);
      }
    };
    loadOrders();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage('products');
  };

  const handleAddToCart = (productId) => {
    addToCart(productId, 1);
  };

  const handleCheckout = async () => {
    if (items.length === 0) {
      alert('Cart is empty!');
      return;
    }

    const sessionId = storage.getSessionId();
    try {
      const order = await api.orders.create(sessionId, {
        items,
        totalAmount: getTotalPrice,
        shippingAddress: 'Default Address'
      });

      // Refresh orders
      const updatedOrders = await api.orders.getBySession(sessionId);
      setOrders(updatedOrders || []);

      // Clear cart
      clearCart();

      setCurrentPage('orders');
      alert('✅ Order placed successfully! Order ID: ' + order.id);
    } catch (err) {
      console.error('Error creating order:', err);
      alert('❌ Error placing order: ' + err.message);
    }
  };

  const handleReorder = async (orderId) => {
    const order = orders.find(o => o.id === orderId);
    if (order && order.items) {
      for (const item of order.items) {
        await addToCart(item.productId, item.quantity);
      }
      setCurrentPage('cart');
    }
  };

  const filteredProducts = searchQuery
    ? search(searchQuery)
    : products;

  return React.createElement(
    'div',
    { style: { background: 'linear-gradient(135deg, #0f1419 0%, #1a2332 50%, #0d1b2a 100%)', color: '#e0c896', minHeight: '100vh' } },

    // Toast Notifications
    React.createElement('div', {
      style: {
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }
    },
      toasts && toasts.map((toast, idx) =>
        React.createElement('div', {
          key: idx,
          style: {
            background: toast.type === 'success' ? '#4caf50' : toast.type === 'error' ? '#f44336' : '#2196f3',
            color: '#fff',
            padding: '15px 20px',
            borderRadius: '4px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            animation: 'slideIn 0.3s ease-in'
          }
        }, toast.message)
      )
    ),

    // Header
    React.createElement(Header, {
      cartTotal: getTotalItems,
      onSearch: handleSearch,
      onNavigate: setCurrentPage
    }),

    // Page Content
    React.createElement('div', {
      style: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px'
      }
    },
      // Home Page
      currentPage === 'home' && React.createElement(React.Fragment, null,
        React.createElement(Hero, { onExplore: () => setCurrentPage('products') }),
        React.createElement(FeaturedCarousel, {
          products: featured,
          loading: productsLoading,
          onAddToCart: handleAddToCart
        }),
        React.createElement(Testimonials),
        React.createElement(Newsletter)
      ),

      // Products Page
      currentPage === 'products' && React.createElement(
        'div',
        null,
        React.createElement('h1', {
          style: { color: '#c9a84c', marginBottom: '30px' }
        }, '🛍️ All Products'),
        React.createElement(ProductGrid, {
          products: filteredProducts,
          loading: productsLoading,
          categories,
          onAddToCart: handleAddToCart
        })
      ),

      // Cart Page
      currentPage === 'cart' && React.createElement(
        'div',
        null,
        React.createElement('h1', {
          style: { color: '#c9a84c', marginBottom: '30px' }
        }, '🛒 Shopping Cart'),
        React.createElement(Cart, {
          items,
          loading: ordersLoading,
          onRemove: removeFromCart,
          onUpdateQuantity: updateQuantity,
          onCheckout: handleCheckout,
          totalPrice: getTotalPrice,
          totalItems: getTotalItems
        })
      ),

      // Orders Page
      currentPage === 'orders' && React.createElement(
        'div',
        null,
        React.createElement('h1', {
          style: { color: '#c9a84c', marginBottom: '30px' }
        }, '📋 My Orders'),
        React.createElement(Orders, {
          orders,
          loading: ordersLoading,
          onReorder: handleReorder
        })
      ),

      // Wishlist Page
      currentPage === 'wishlist' && React.createElement('div', null,
        React.createElement('h1', {
          style: { color: '#c9a84c', marginBottom: '30px' }
        }, '❤️ My Wishlist'),
        (() => {
          const wishlistItems = wishlist.getAll();
          const wishlistProducts = products.filter(p => wishlistItems.includes(p.id));
          return React.createElement(ProductGrid, {
            products: wishlistProducts,
            loading: productsLoading,
            categories,
            onAddToCart: handleAddToCart
          });
        })()
      )
    ),

    // Footer
    React.createElement(Footer, { onNavigate: setCurrentPage }),

    // CSS Animations
    React.createElement('style', null, `
      @keyframes slideIn {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        padding: 0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background: #1a1a1a;
        color: #e0c896;
      }
      ::-webkit-scrollbar {
        width: 10px;
      }
      ::-webkit-scrollbar-track {
        background: #1a1a1a;
      }
      ::-webkit-scrollbar-thumb {
        background: #c9a84c;
        border-radius: 5px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #e0c896;
      }
      :focus-visible {
        outline: 2px solid #c9a84c;
        outline-offset: 2px;
      }
      button:hover {
        opacity: 0.9;
      }
    `)
  );
};

/**
 * Header Component - Navigation, search, cart button
 */

import React from 'react';
import { useToast } from '../hooks/useToast.js';
import { wishlist } from '../services/wishlist.js';

export const Header = ({ cartTotal, onSearch, onNavigate }) => {
  const { addToast } = useToast();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  const [wishlistCount, setWishlistCount] = React.useState(0);

  React.useEffect(() => {
    const updateWishlistCount = () => {
      setWishlistCount(wishlist.getAll().length);
    };
    updateWishlistCount();
    window.addEventListener('wishlistUpdated', updateWishlistCount);
    return () => window.removeEventListener('wishlistUpdated', updateWishlistCount);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch?.(searchQuery);
      setSearchQuery('');
    }
  };

  return React.createElement(
    'header',
    { style: {
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      borderBottom: '2px solid #c9a84c',
      padding: '0 20px',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      minHeight: '70px',
      boxShadow: '0 4px 12px rgba(201, 168, 76, 0.15)'
    }},
    // Brand/Logo
    React.createElement('div', {
      style: {
        fontSize: '1.8em',
        fontWeight: 'bold',
        background: 'linear-gradient(135deg, #c9a84c, #e0c896)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        cursor: 'pointer'
      },
      onClick: () => onNavigate?.('home')
    }, 'ShopEase'),

    // Desktop Navigation
    React.createElement('nav', {
      style: {
        display: window.innerWidth > 768 ? 'flex' : 'none',
        gap: '30px',
        alignItems: 'center'
      }
    },
      React.createElement('a', {
        href: '#',
        onClick: (e) => { e.preventDefault(); onNavigate?.('home'); },
        style: {
          color: '#e0c896',
          textDecoration: 'none',
          fontSize: '0.95em',
          transition: 'color 0.3s',
          cursor: 'pointer'
        }
      }, 'Home'),
      React.createElement('a', {
        href: '#',
        onClick: (e) => { e.preventDefault(); onNavigate?.('products'); },
        style: {
          color: '#e0c896',
          textDecoration: 'none',
          fontSize: '0.95em',
          transition: 'color 0.3s',
          cursor: 'pointer'
        }
      }, 'Products'),
      React.createElement('a', {
        href: '#',
        onClick: (e) => { e.preventDefault(); onNavigate?.('orders'); },
        style: {
          color: '#e0c896',
          textDecoration: 'none',
          fontSize: '0.95em',
          transition: 'color 0.3s',
          cursor: 'pointer'
        }
      }, 'Orders')
    ),

    // Search Bar
    React.createElement('form', {
      onSubmit: handleSearch,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        flex: 1,
        maxWidth: '400px',
        margin: '0 20px'
      }
    },
      React.createElement('input', {
        type: 'text',
        placeholder: 'Search products...',
        value: searchQuery,
        onChange: (e) => setSearchQuery(e.target.value),
        style: {
          background: '#2d2d2d',
          border: '1px solid #c9a84c',
          color: '#e0c896',
          padding: '8px 15px',
          borderRadius: '4px',
          width: '100%',
          fontSize: '0.9em',
          outline: 'none'
        }
      }),
      React.createElement('button', {
        type: 'submit',
        style: {
          background: '#c9a84c',
          border: 'none',
          color: '#1a1a1a',
          padding: '8px 15px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }
      }, '🔍')
    ),

    // Right Icons
    React.createElement('div', {
      style: {
        display: 'flex',
        gap: '20px',
        alignItems: 'center'
      }
    },
      React.createElement('button', {
        onClick: () => onNavigate?.('wishlist'),
        style: {
          background: 'transparent',
          border: 'none',
          color: '#c9a84c',
          fontSize: '1.3em',
          cursor: 'pointer',
          position: 'relative'
        },
        title: 'Wishlist'
      },
        '❤️',
        wishlistCount > 0 && React.createElement('span', {
          style: {
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            background: '#c9a84c',
            color: '#1a1a1a',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75em',
            fontWeight: 'bold'
          }
        }, wishlistCount)
      ),
      React.createElement('button', {
        onClick: () => onNavigate?.('cart'),
        style: {
          background: 'transparent',
          border: 'none',
          color: '#c9a84c',
          fontSize: '1.3em',
          cursor: 'pointer',
          position: 'relative'
        },
        title: 'Shopping Cart'
      },
        '🛒',
        cartTotal > 0 && React.createElement('span', {
          style: {
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            background: '#c9a84c',
            color: '#1a1a1a',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75em',
            fontWeight: 'bold'
          }
        }, cartTotal)
      )
    ),

    // Mobile Menu Button
    React.createElement('button', {
      onClick: () => setShowMobileMenu(!showMobileMenu),
      style: {
        display: window.innerWidth <= 768 ? 'block' : 'none',
        background: 'transparent',
        border: 'none',
        color: '#c9a84c',
        fontSize: '1.5em',
        cursor: 'pointer'
      }
    }, '☰')
  );
};

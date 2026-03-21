/**
 * ProductCard Component - Individual product display
 */

import React from 'react';
import { wishlist } from '../services/wishlist.js';
import { useToast } from '../hooks/useToast.js';

export const ProductCard = ({ product, onAddToCart }) => {
  const { addToast } = useToast();
  const [isInWishlist, setIsInWishlist] = React.useState(false);

  // Sync wishlist on mount and when product changes
  React.useEffect(() => {
    wishlist.syncFromDB().then(() => {
      setIsInWishlist(wishlist.isInWishlist(product.id));
    });
  }, [product.id]);

  const handleWishlistToggle = async () => {
    const newState = await wishlist.toggle(product.id);
    setIsInWishlist(newState);
    addToast(
      newState ? '❤️ Added to wishlist' : '💔 Removed from wishlist',
      'success'
    );
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  const handleAddToCart = () => {
    onAddToCart?.(product.id);
    addToast(`✅ "${product.name}" added to cart`, 'success');
  };

  return React.createElement('div', {
    style: {
      background: 'linear-gradient(135deg, #2d2d2d 0%, #3d3d3d 100%)',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 8px 24px rgba(201, 168, 76, 0.1)',
      transition: 'transform 0.3s, box-shadow 0.3s',
      cursor: 'pointer',
      border: '1px solid #3d3d3d',
      display: 'flex',
      flexDirection: 'column'
    },
    onMouseEnter: (e) => {
      e.currentTarget.style.transform = 'translateY(-8px)';
      e.currentTarget.style.boxShadow = '0 12px 32px rgba(201, 168, 76, 0.2)';
    },
    onMouseLeave: (e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 8px 24px rgba(201, 168, 76, 0.1)';
    }
  },
    // Product Image
    React.createElement('div', {
      style: {
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        height: '250px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }
    },
      React.createElement('img', {
        src: product.imageUrl || product.image || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="250" height="250"%3E%3Crect fill="%232d2d2d" width="250" height="250"/%3E%3Ctext x="50%25" y="50%25" font-size="14" fill="%23c9a84c" text-anchor="middle" dy=".3em"%3EProduct Image%3C/text%3E%3C/svg%3E',
        alt: product.name,
        style: {
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }
      }),
      // Featured Badge
      product.featured && React.createElement('div', {
        style: {
          position: 'absolute',
          top: '10px',
          left: '10px',
          background: '#c9a84c',
          color: '#1a1a1a',
          padding: '5px 12px',
          borderRadius: '20px',
          fontSize: '0.75em',
          fontWeight: 'bold'
        }
      }, '⭐ FEATURED'),
      // Wishlist Button
      React.createElement('button', {
        onClick: handleWishlistToggle,
        style: {
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: isInWishlist ? '#c9a84c' : 'rgba(0,0,0,0.5)',
          border: 'none',
          color: isInWishlist ? '#1a1a1a' : '#c9a84c',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          cursor: 'pointer',
          fontSize: '1.2em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s'
        }
      }, isInWishlist ? '❤️' : '🤍')
    ),

    // Product Details
    React.createElement('div', {
      style: {
        padding: '15px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }
    },
      // Product Name
      React.createElement('h3', {
        style: {
          margin: '0 0 8px 0',
          color: '#c9a84c',
          fontSize: '1.1em',
          fontWeight: 'bold'
        }
      }, product.name),

      // Rating
      React.createElement('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '8px'
        }
      },
        React.createElement('span', {
          style: {
            color: '#ffc107',
            fontSize: '0.95em'
          }
        }, '⭐ ' + (product.rating || 0).toFixed(1)),
        React.createElement('span', {
          style: {
            color: '#999',
            fontSize: '0.85em'
          }
        }, `(${product.reviewCount || 0} reviews)`)
      ),

      // Description
      React.createElement('p', {
        style: {
          color: '#b0b0b0',
          fontSize: '0.9em',
          margin: '0 0 12px 0',
          flex: 1
        }
      }, (product.description || 'Quality product at great price').substring(0, 60) + '...'),

      // Price
      React.createElement('div', {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid #3d3d3d',
          paddingTop: '12px'
        }
      },
        React.createElement('span', {
          style: {
            fontSize: '1.3em',
            fontWeight: 'bold',
            color: '#c9a84c'
          }
        }, '$' + (product.price || 0).toFixed(2)),

        React.createElement('button', {
          onClick: handleAddToCart,
          style: {
            background: 'linear-gradient(135deg, #c9a84c, #e0c896)',
            border: 'none',
            color: '#1a1a1a',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '0.9em',
            transition: 'opacity 0.3s'
          }
        }, '🛒 Add')
      )
    )
  );
};

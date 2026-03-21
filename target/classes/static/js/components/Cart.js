/**
 * Cart Component - Shopping cart display and management
 */

import React from 'react';
import { useToast } from '../hooks/useToast.js';

export const Cart = ({ items, loading, onRemove, onUpdateQuantity, onCheckout, totalPrice, totalItems }) => {
  const { addToast } = useToast();

  const handleRemove = (productId) => {
    onRemove?.(productId);
    addToast('◀️ Item removed from cart', 'info');
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemove(productId);
    } else {
      onUpdateQuantity?.(productId, newQuantity);
    }
  };

  if (loading) {
    return React.createElement('div', {
      style: { textAlign: 'center', padding: '40px', color: '#b0b0b0' }
    }, '⏳ Loading cart...');
  }

  if (items.length === 0) {
    return React.createElement('div', {
      style: {
        background: 'linear-gradient(135deg, #2d2d2d 0%, #3d3d3d 100%)',
        borderRadius: '12px',
        padding: '60px 20px',
        textAlign: 'center',
        border: '1px solid #3d3d3d'
      }
    },
      React.createElement('p', {
        style: { color: '#b0b0b0', fontSize: '1.2em', marginBottom: '20px' }
      }, '🛒 Your cart is empty'),
      React.createElement('p', {
        style: { color: '#999', fontSize: '0.95em' }
      }, 'Add some products to get started!')
    );
  }

  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '20px' } },
    // Cart Items
    React.createElement('div', {
      style: {
        background: 'linear-gradient(135deg, #2d2d2d 0%, #3d3d3d 100%)',
        borderRadius: '12px',
        border: '1px solid #3d3d3d',
        overflow: 'hidden'
      }
    },
      items.map((item, idx) =>
        React.createElement('div', {
          key: item.productId,
          style: {
            display: 'flex',
            gap: '15px',
            padding: '15px',
            borderBottom: idx < items.length - 1 ? '1px solid #3d3d3d' : 'none',
            alignItems: 'center'
          }
        },
          // Product Image Placeholder
          React.createElement('div', {
            style: {
              width: '80px',
              height: '80px',
              background: '#1a1a1a',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666'
            }
          }, '📦'),

          // Product Info
          React.createElement('div', {
            style: { flex: 1 }
          },
            React.createElement('h4', {
              style: { margin: '0 0 5px 0', color: '#c9a84c' }
            }, item.productName || 'Product'),
            React.createElement('p', {
              style: { margin: '0 0 5px 0', color: '#b0b0b0', fontSize: '0.9em' }
            }, 'SKU: ' + (item.productId || 'N/A')),
            React.createElement('p', {
              style: { margin: 0, color: '#c9a84c', fontWeight: 'bold' }
            }, '$' + (item.price || 0).toFixed(2) + ' each')
          ),

          // Quantity Control
          React.createElement('div', {
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              background: '#1a1a1a',
              borderRadius: '4px',
              padding: '5px'
            }
          },
            React.createElement('button', {
              onClick: () => handleQuantityChange(item.productId, item.quantity - 1),
              style: {
                background: 'transparent',
                border: 'none',
                color: '#c9a84c',
                cursor: 'pointer',
                width: '25px',
                height: '25px'
              }
            }, '−'),
            React.createElement('input', {
              type: 'number',
              value: item.quantity || 1,
              onChange: (e) => handleQuantityChange(item.productId, parseInt(e.target.value) || 1),
              style: {
                width: '40px',
                background: 'transparent',
                border: 'none',
                color: '#c9a84c',
                textAlign: 'center',
                fontWeight: 'bold'
              }
            }),
            React.createElement('button', {
              onClick: () => handleQuantityChange(item.productId, item.quantity + 1),
              style: {
                background: 'transparent',
                border: 'none',
                color: '#c9a84c',
                cursor: 'pointer',
                width: '25px',
                height: '25px'
              }
            }, '+')
          ),

          // Item Total
          React.createElement('div', {
            style: {
              textAlign: 'right',
              minWidth: '80px'
            }
          },
            React.createElement('p', {
              style: { margin: '0 0 5px 0', color: '#b0b0b0', fontSize: '0.9em' }
            }, 'Total'),
            React.createElement('p', {
              style: { margin: 0, color: '#c9a84c', fontWeight: 'bold', fontSize: '1.1em' }
            }, '$' + ((item.price || 0) * (item.quantity || 1)).toFixed(2))
          ),

          // Remove Button
          React.createElement('button', {
            onClick: () => handleRemove(item.productId),
            style: {
              background: 'transparent',
              border: '1px solid #c9a84c',
              color: '#c9a84c',
              width: '35px',
              height: '35px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1.1em'
            }
          }, '🗑️')
        )
      )
    ),

    // Cart Summary
    React.createElement('div', {
      style: {
        background: 'linear-gradient(135deg, #2d2d2d 0%, #3d3d3d 100%)',
        borderRadius: '12px',
        border: '1px solid #3d3d3d',
        padding: '20px'
      }
    },
      React.createElement('div', {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '15px',
          paddingBottom: '15px',
          borderBottom: '1px solid #3d3d3d'
        }
      },
        React.createElement('span', { style: { color: '#b0b0b0' } }, 'Subtotal'),
        React.createElement('span', { style: { color: '#c9a84c' } }, '$' + totalPrice.toFixed(2))
      ),
      React.createElement('div', {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '15px'
        }
      },
        React.createElement('span', { style: { color: '#b0b0b0' } }, 'Shipping'),
        React.createElement('span', { style: { color: '#c9a84c' } }, 'Free')
      ),
      React.createElement('div', {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '1.2em',
          fontWeight: 'bold',
          marginBottom: '20px',
          paddingTop: '15px',
          borderTop: '2px solid #c9a84c'
        }
      },
        React.createElement('span', { style: { color: '#b0b0b0' } }, 'Total'),
        React.createElement('span', { style: { color: '#c9a84c' } }, '$' + totalPrice.toFixed(2))
      ),
      React.createElement('button', {
        onClick: onCheckout,
        style: {
          width: '100%',
          background: 'linear-gradient(135deg, #c9a84c, #e0c896)',
          border: 'none',
          color: '#1a1a1a',
          padding: '15px',
          fontSize: '1.1em',
          fontWeight: 'bold',
          borderRadius: '4px',
          cursor: 'pointer',
          transition: 'opacity 0.3s'
        }
      }, '💳 Proceed to Checkout')
    )
  );
};

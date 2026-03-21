/**
 * Orders Component - Order history and details
 */

import React from 'react';
import { useToast } from '../hooks/useToast.js';

export const Orders = ({ orders, loading, onViewDetails, onReorder }) => {
  const { addToast } = useToast();

  const handleReorder = (orderId) => {
    onReorder?.(orderId);
    addToast('🔄 Items added to cart from this order', 'success');
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return '#ffc107';
      case 'processing': return '#2196f3';
      case 'shipped': return '#4caf50';
      case 'delivered': return '#8bc34a';
      case 'cancelled': return '#f44336';
      default: return '#999';
    }
  };

  if (loading) {
    return React.createElement('div', {
      style: { textAlign: 'center', padding: '40px', color: '#b0b0b0' }
    }, '⏳ Loading orders...');
  }

  if (!orders || orders.length === 0) {
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
      }, '📦 No orders yet'),
      React.createElement('p', {
        style: { color: '#999', fontSize: '0.95em' }
      }, 'Start shopping to create your first order!')
    );
  }

  return React.createElement('div', {
    style: { display: 'flex', flexDirection: 'column', gap: '20px' }
  },
    React.createElement('h2', {
      style: { color: '#c9a84c', marginBottom: '20px' }
    }, '📋 Order History'),

    orders.map(order =>
      React.createElement('div', {
        key: order.id,
        style: {
          background: 'linear-gradient(135deg, #2d2d2d 0%, #3d3d3d 100%)',
          borderRadius: '12px',
          border: '1px solid #3d3d3d',
          overflow: 'hidden'
        }
      },
        // Order Header
        React.createElement('div', {
          style: {
            background: '#1a1a1a',
            padding: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #3d3d3d'
          }
        },
          React.createElement('div', null,
            React.createElement('h4', {
              style: { margin: '0 0 5px 0', color: '#c9a84c' }
            }, 'Order #' + (order.id || 'N/A')),
            React.createElement('p', {
              style: { margin: 0, color: '#999', fontSize: '0.85em' }
            }, new Date(order.orderDate || new Date()).toLocaleDateString())
          ),
          React.createElement('span', {
            style: {
              background: getStatusColor(order.status),
              color: order.status?.toLowerCase() === 'pending' ? '#1a1a1a' : '#fff',
              padding: '5px 15px',
              borderRadius: '20px',
              fontSize: '0.85em',
              fontWeight: 'bold'
            }
          }, order.status || 'UNKNOWN')
        ),

        // Order Items
        React.createElement('div', {
          style: { padding: '15px' }
        },
          React.createElement('p', {
            style: { color: '#b0b0b0', margin: '0 0 10px 0', fontSize: '0.9em' }
          }, '📦 Items: ' + ((order.items?.length || 0) + ' item(s)')),

          React.createElement('div', {
            style: {
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }
          },
            order.items && order.items.map((item, idx) =>
              React.createElement('div', {
                key: idx,
                style: {
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '8px 0',
                  borderBottom: idx < order.items.length - 1 ? '1px solid #3d3d3d' : 'none'
                }
              },
                React.createElement('span', {
                  style: { color: '#b0b0b0', fontSize: '0.9em' }
                }, (item.productName || 'Product') + ' × ' + (item.quantity || 1)),
                React.createElement('span', {
                  style: { color: '#c9a84c', fontWeight: 'bold', fontSize: '0.9em' }
                }, '$' + ((item.price || 0) * (item.quantity || 1)).toFixed(2))
              )
            )
          )
        ),

        // Order Summary
        React.createElement('div', {
          style: {
            background: '#1a1a1a',
            padding: '15px',
            borderTop: '1px solid #3d3d3d',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }
        },
          React.createElement('div', null,
            React.createElement('p', {
              style: { margin: '0 0 5px 0', color: '#b0b0b0', fontSize: '0.9em' }
            }, 'Total'),
            React.createElement('p', {
              style: { margin: 0, color: '#c9a84c', fontWeight: 'bold', fontSize: '1.2em' }
            }, '$' + (order.totalAmount || 0).toFixed(2))
          ),

          React.createElement('div', {
            style: { display: 'flex', gap: '10px' }
          },
            React.createElement('button', {
              onClick: () => onViewDetails?.(order.id),
              style: {
                background: 'transparent',
                border: '1px solid #c9a84c',
                color: '#c9a84c',
                padding: '8px 15px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.9em'
              }
            }, '👁️ View'),
            React.createElement('button', {
              onClick: () => handleReorder(order.id),
              style: {
                background: '#c9a84c',
                border: 'none',
                color: '#1a1a1a',
                padding: '8px 15px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.9em',
                fontWeight: 'bold'
              }
            }, '🔄 Reorder')
          )
        )
      )
    )
  );
};

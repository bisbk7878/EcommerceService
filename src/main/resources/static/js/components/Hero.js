/**
 * Hero Component - Landing banner/showcase
 */

import React from 'react';

export const Hero = ({ onExplore, featuredProducts }) => {
  return React.createElement('section', {
    style: {
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
      borderBottom: '3px solid #c9a84c',
      padding: '60px 20px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }
  },
    // Background Gradient Overlay
    React.createElement('div', {
      style: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(201, 168, 76, 0.05) 0%, transparent 70%)',
        pointerEvents: 'none'
      }
    }),

    // Content
    React.createElement('div', {
      style: {
        position: 'relative',
        zIndex: 1,
        maxWidth: '800px',
        margin: '0 auto'
      }
    },
      React.createElement('h1', {
        style: {
          fontSize: '3em',
          fontWeight: 'bold',
          margin: '0 0 20px 0',
          background: 'linear-gradient(135deg, #c9a84c, #e0c896)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }
      }, '✨ Welcome to ShopEase'),

      React.createElement('p', {
        style: {
          fontSize: '1.3em',
          color: '#b0b0b0',
          margin: '0 0 30px 0',
          lineHeight: '1.6'
        }
      }, 'Discover premium products curated just for you. Experience seamless shopping with exclusive deals and fast delivery.'),

      React.createElement('button', {
        onClick: onExplore,
        style: {
          background: 'linear-gradient(135deg, #c9a84c, #e0c896)',
          border: 'none',
          color: '#1a1a1a',
          padding: '15px 40px',
          fontSize: '1.1em',
          fontWeight: 'bold',
          borderRadius: '4px',
          cursor: 'pointer',
          transition: 'transform 0.3s, box-shadow 0.3s'
        },
        onMouseEnter: (e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(201, 168, 76, 0.4)';
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = 'none';
        }
      }, '🛍️ Shop Now'),

      // Stats
      React.createElement('div', {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '30px',
          marginTop: '50px'
        }
      },
        React.createElement('div', {
          style: { padding: '20px' }
        },
          React.createElement('h3', {
            style: { color: '#c9a84c', fontSize: '1.8em', margin: '0 0 5px 0' }
          }, '5K+'),
          React.createElement('p', {
            style: { color: '#b0b0b0', margin: 0, fontSize: '0.9em' }
          }, 'Products')
        ),
        React.createElement('div', {
          style: { padding: '20px' }
        },
          React.createElement('h3', {
            style: { color: '#c9a84c', fontSize: '1.8em', margin: '0 0 5px 0' }
          }, '100K+'),
          React.createElement('p', {
            style: { color: '#b0b0b0', margin: 0, fontSize: '0.9em' }
          }, 'Happy Customers')
        ),
        React.createElement('div', {
          style: { padding: '20px' }
        },
          React.createElement('h3', {
            style: { color: '#c9a84c', fontSize: '1.8em', margin: '0 0 5px 0' }
          }, '24/7'),
          React.createElement('p', {
            style: { color: '#b0b0b0', margin: 0, fontSize: '0.9em' }
          }, 'Support')
        )
      )
    )
  );
};

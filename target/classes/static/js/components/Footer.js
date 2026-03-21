/**
 * Footer Component - Site footer with links and info
 */

import React from 'react';

export const Footer = ({ onNavigate }) => {
  return React.createElement('footer', {
    style: {
      background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)',
      borderTop: '2px solid #c9a84c',
      padding: '40px 20px',
      marginTop: '60px'
    }
  },
    React.createElement('div', {
      style: {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '30px',
        marginBottom: '30px'
      }
    },
      // Company Info
      React.createElement('div', null,
        React.createElement('h4', {
          style: {
            color: '#c9a84c',
            marginBottom: '15px',
            fontSize: '1.1em'
          }
        }, '🏪 About ShopEase'),
        React.createElement('p', {
          style: {
            color: '#999',
            fontSize: '0.9em',
            lineHeight: '1.6'
          }
        }, 'Your trusted online marketplace for premium products. We deliver quality, value, and exceptional service to customers worldwide.')
      ),

      // Quick Links
      React.createElement('div', null,
        React.createElement('h4', {
          style: {
            color: '#c9a84c',
            marginBottom: '15px',
            fontSize: '1.1em'
          }
        }, '🔗 Quick Links'),
        React.createElement('ul', {
          style: {
            listStyle: 'none',
            padding: 0,
            margin: 0
          }
        },
          React.createElement('li', { style: { marginBottom: '8px' } },
            React.createElement('a', {
              href: '#',
              onClick: (e) => { e.preventDefault(); onNavigate?.('home'); },
              style: {
                color: '#b0b0b0',
                textDecoration: 'none',
                fontSize: '0.9em',
                transition: 'color 0.3s'
              }
            }, 'Home')
          ),
          React.createElement('li', { style: { marginBottom: '8px' } },
            React.createElement('a', {
              href: '#',
              onClick: (e) => { e.preventDefault(); onNavigate?.('products'); },
              style: {
                color: '#b0b0b0',
                textDecoration: 'none',
                fontSize: '0.9em',
                transition: 'color 0.3s'
              }
            }, 'Products')
          ),
          React.createElement('li', { style: { marginBottom: '8px' } },
            React.createElement('a', {
              href: '#',
              onClick: (e) => { e.preventDefault(); onNavigate?.('orders'); },
              style: {
                color: '#b0b0b0',
                textDecoration: 'none',
                fontSize: '0.9em',
                transition: 'color 0.3s'
              }
            }, 'Orders')
          ),
          React.createElement('li', { style: { marginBottom: '8px' } },
            React.createElement('a', {
              href: '#',
              style: {
                color: '#b0b0b0',
                textDecoration: 'none',
                fontSize: '0.9em',
                transition: 'color 0.3s'
              }
            }, 'About Us')
          )
        )
      ),

      // Support
      React.createElement('div', null,
        React.createElement('h4', {
          style: {
            color: '#c9a84c',
            marginBottom: '15px',
            fontSize: '1.1em'
          }
        }, '📞 Support'),
        React.createElement('ul', {
          style: {
            listStyle: 'none',
            padding: 0,
            margin: 0
          }
        },
          React.createElement('li', { style: { marginBottom: '8px' } },
            React.createElement('a', {
              href: '#',
              style: {
                color: '#b0b0b0',
                textDecoration: 'none',
                fontSize: '0.9em'
              }
            }, '❓ FAQ')
          ),
          React.createElement('li', { style: { marginBottom: '8px' } },
            React.createElement('a', {
              href: '#',
              style: {
                color: '#b0b0b0',
                textDecoration: 'none',
                fontSize: '0.9em'
              }
            }, '📧 Contact')
          ),
          React.createElement('li', { style: { marginBottom: '8px' } },
            React.createElement('a', {
              href: '#',
              style: {
                color: '#b0b0b0',
                textDecoration: 'none',
                fontSize: '0.9em'
              }
            }, '📋 Privacy Policy')
          ),
          React.createElement('li', { style: { marginBottom: '8px' } },
            React.createElement('a', {
              href: '#',
              style: {
                color: '#b0b0b0',
                textDecoration: 'none',
                fontSize: '0.9em'
              }
            }, '⚖️ Terms')
          )
        )
      ),

      // Newsletter
      React.createElement('div', null,
        React.createElement('h4', {
          style: {
            color: '#c9a84c',
            marginBottom: '15px',
            fontSize: '1.1em'
          }
        }, '📬 Newsletter'),
        React.createElement('p', {
          style: {
            color: '#999',
            fontSize: '0.85em',
            marginBottom: '10px'
          }
        }, 'Subscribe for exclusive deals'),
        React.createElement('form', {
          style: {
            display: 'flex',
            gap: '5px'
          },
          onSubmit: (e) => {
            e.preventDefault();
            e.target.reset();
          }
        },
          React.createElement('input', {
            type: 'email',
            placeholder: 'Your email',
            style: {
              flex: 1,
              background: '#1a1a1a',
              border: '1px solid #3d3d3d',
              color: '#b0b0b0',
              padding: '8px',
              borderRadius: '4px',
              fontSize: '0.85em'
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
              fontWeight: 'bold',
              fontSize: '0.85em'
            }
          }, 'Join')
        )
      )
    ),

    // Bottom Section
    React.createElement('div', {
      style: {
        borderTop: '1px solid #3d3d3d',
        paddingTop: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }
    },
      React.createElement('p', {
        style: {
          color: '#999',
          margin: 0,
          fontSize: '0.85em'
        }
      }, '© 2024 ShopEase. All rights reserved.'),

      React.createElement('div', {
        style: {
          display: 'flex',
          gap: '15px'
        }
      },
        React.createElement('a', {
          href: '#',
          style: { color: '#c9a84c', fontSize: '1.3em', textDecoration: 'none' }
        }, 'f'),
        React.createElement('a', {
          href: '#',
          style: { color: '#c9a84c', fontSize: '1.3em', textDecoration: 'none' }
        }, 'tw'),
        React.createElement('a', {
          href: '#',
          style: { color: '#c9a84c', fontSize: '1.3em', textDecoration: 'none' }
        }, 'in')
      )
    )
  );
};

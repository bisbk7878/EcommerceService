/**
 * FeaturedCarousel Component - Scrollable featured products showcase
 */

import React from 'react';

export const FeaturedCarousel = ({ products, loading, onAddToCart }) => {
  const [scrollPos, setScrollPos] = React.useState(0);
  const carouselRef = React.useRef(null);

  const scroll = (direction) => {
    const container = carouselRef.current;
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (loading) {
    return React.createElement('div', {
      style: { textAlign: 'center', padding: '40px', color: '#b0b0b0' }
    }, '⏳ Loading featured products...');
  }

  const productsArray = Array.isArray(products) ? products : [];
  if (!productsArray || productsArray.length === 0) {
    return null;
  }

  return React.createElement('section', {
    style: {
      margin: '40px 0',
      background: 'linear-gradient(135deg, #2d2d2d 0%, #3d3d3d 100%)',
      borderRadius: '12px',
      padding: '30px',
      border: '1px solid #3d3d3d'
    }
  },
    React.createElement('h2', {
      style: {
        color: '#c9a84c',
        marginTop: 0,
        marginBottom: '25px',
        fontSize: '1.5em'
      }
    }, '⭐ Featured Collections'),

    React.createElement('div', {
      style: {
        position: 'relative'
      }
    },
      // Scroll Buttons
      React.createElement('button', {
        onClick: () => scroll('left'),
        style: {
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(201, 168, 76, 0.8)',
          border: 'none',
          color: '#1a1a1a',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          cursor: 'pointer',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.2em'
        }
      }, '◀'),

      React.createElement('button', {
        onClick: () => scroll('right'),
        style: {
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(201, 168, 76, 0.8)',
          border: 'none',
          color: '#1a1a1a',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          cursor: 'pointer',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.2em'
        }
      }, '▶'),

      // Carousel Container
      React.createElement('div', {
        ref: carouselRef,
        style: {
          display: 'flex',
          gap: '20px',
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          paddingBottom: '10px',
          marginLeft: '50px',
          marginRight: '50px',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch'
        }
      },
        productsArray.map(product =>
          React.createElement('div', {
            key: product.id,
            style: {
              flex: '0 0 calc(33.333% - 14px)',
              minWidth: '250px',
              scrollSnapAlign: 'start'
            }
          },
            React.createElement('div', {
              style: {
                background: '#1a1a1a',
                borderRadius: '12px',
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #3d3d3d',
                transition: 'transform 0.3s'
              },
              onMouseEnter: (e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }
            },
              // Image
              React.createElement('div', {
                style: {
                  background: '#0f0f0f',
                  height: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              },
                React.createElement('img', {
                  src: product.imageUrl || product.image || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="250" height="200"%3E%3Crect fill="%231a1a1a" width="250" height="200"/%3E%3Ctext x="50%25" y="50%25" font-size="12" fill="%23c9a84c" text-anchor="middle" dy=".3em"%3EProduct%3C/text%3E%3C/svg%3E',
                  alt: product.name,
                  style: { width: '100%', height: '100%', objectFit: 'cover' }
                })
              ),
              // Info
              React.createElement('div', {
                style: {
                  padding: '15px',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column'
                }
              },
                React.createElement('h4', {
                  style: {
                    margin: '0 0 5px 0',
                    color: '#c9a84c',
                    fontSize: '0.95em'
                  }
                }, product.name),
                React.createElement('p', {
                  style: {
                    margin: '0 0 10px 0',
                    color: '#999',
                    fontSize: '0.85em',
                    flex: 1
                  }
                }, product.description ? product.description.substring(0, 40) + '...' : 'Premium product'),
                React.createElement('div', {
                  style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }
                },
                  React.createElement('span', {
                    style: {
                      fontSize: '1.1em',
                      fontWeight: 'bold',
                      color: '#c9a84c'
                    }
                  }, '$' + (product.price || 0).toFixed(2)),
                  React.createElement('button', {
                    onClick: () => onAddToCart?.(product.id),
                    style: {
                      background: '#c9a84c',
                      border: 'none',
                      color: '#1a1a1a',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.85em',
                      fontWeight: 'bold'
                    }
                  }, '🛒')
                )
              )
            )
          )
        )
      )
    )
  );
};

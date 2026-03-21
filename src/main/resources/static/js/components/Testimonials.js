/**
 * Testimonials Component - Customer reviews and feedback
 */

import React from 'react';

export const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      author: 'Sarah Chen',
      role: 'Verified Buyer',
      text: 'Amazing quality products! Fast shipping and excellent customer service. Will definitely shop again!',
      rating: 5
    },
    {
      id: 2,
      author: 'Marcus Johnson',
      role: 'Tech Enthusiast',
      text: 'The selection is incredible. Found exactly what I was looking for at a great price.',
      rating: 5
    },
    {
      id: 3,
      author: 'Emma Rodriguez',
      role: 'Fashion Blogger',
      text: 'Love the trendy products and frequent updates. ShopEase is my go-to store now!',
      rating: 5
    },
    {
      id: 4,
      author: 'David Wilson',
      role: 'Verified Buyer',
      text: 'Best online shopping experience I\'ve had. Great deals and reliable delivery!',
      rating: 5
    }
  ];

  return React.createElement('section', {
    style: {
      margin: '60px 0',
      padding: '40px 20px'
    }
  },
    React.createElement('h2', {
      style: {
        textAlign: 'center',
        color: '#c9a84c',
        marginBottom: '40px',
        fontSize: '1.8em'
      }
    }, '⭐ What Our Customers Say'),

    React.createElement('div', {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }
    },
      testimonials.map(testimonial =>
        React.createElement('div', {
          key: testimonial.id,
          style: {
            background: 'linear-gradient(135deg, #2d2d2d 0%, #3d3d3d 100%)',
            borderRadius: '12px',
            padding: '25px',
            border: '1px solid #3d3d3d',
            borderLeft: '4px solid #c9a84c',
            transition: 'transform 0.3s'
          },
          onMouseEnter: (e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
          },
          onMouseLeave: (e) => {
            e.currentTarget.style.transform = 'translateY(0)';
          }
        },
          // Stars
          React.createElement('div', {
            style: {
              marginBottom: '15px',
              color: '#ffc107',
              fontSize: '1.1em'
            }
          },
            '⭐'.repeat(testimonial.rating)
          ),

          // Quote
          React.createElement('p', {
            style: {
              color: '#b0b0b0',
              fontSize: '0.95em',
              lineHeight: '1.6',
              marginBottom: '20px',
              fontStyle: 'italic'
            }
          }, '"' + testimonial.text + '"'),

          // Author Info
          React.createElement('div', {
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              borderTop: '1px solid #3d3d3d',
              paddingTop: '15px'
            }
          },
            React.createElement('div', {
              style: {
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #c9a84c, #e0c896)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1a1a1a',
                fontWeight: 'bold',
                fontSize: '1.1em'
              }
            },
              testimonial.author.charAt(0)
            ),
            React.createElement('div', null,
              React.createElement('p', {
                style: {
                  margin: '0 0 2px 0',
                  color: '#c9a84c',
                  fontWeight: 'bold',
                  fontSize: '0.95em'
                }
              }, testimonial.author),
              React.createElement('p', {
                style: {
                  margin: 0,
                  color: '#999',
                  fontSize: '0.8em'
                }
              }, testimonial.role)
            )
          )
        )
      )
    )
  );
};

/**
 * Newsletter Component - Email newsletter signup
 */

import React from 'react';
import { useToast } from '../hooks/useToast.js';

export const Newsletter = () => {
  const { addToast } = useToast();
  const [email, setEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      addToast('❌ Please enter a valid email', 'error');
      return;
    }
    setSubscribed(true);
    addToast('✅ Successfully subscribed! Check your email.', 'success');
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return React.createElement('section', {
    style: {
      background: 'linear-gradient(135deg, #c9a84c 0%, #e0c896 100%)',
      padding: '60px 20px',
      textAlign: 'center',
      margin: '60px 0',
      borderRadius: '12px',
      color: '#1a1a1a'
    }
  },
    React.createElement('h2', {
      style: {
        fontSize: '2em',
        marginBottom: '10px'
      }
    }, '📬 Stay Updated!'),

    React.createElement('p', {
      style: {
        fontSize: '1.1em',
        marginBottom: '30px',
        opacity: 0.9
      }
    }, 'Get exclusive deals and new product launches delivered to your inbox'),

    React.createElement('form', {
      onSubmit: handleSubscribe,
      style: {
        display: 'flex',
        gap: '10px',
        maxWidth: '500px',
        margin: '0 auto',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }
    },
      React.createElement('input', {
        type: 'email',
        placeholder: 'Enter your email',
        value: email,
        onChange: (e) => setEmail(e.target.value),
        style: {
          flex: 1,
          minWidth: '250px',
          padding: '12px 15px',
          background: 'rgba(255, 255, 255, 0.9)',
          border: 'none',
          borderRadius: '4px',
          fontSize: '1em',
          outline: 'none'
        }
      }),
      React.createElement('button', {
        type: 'submit',
        style: {
          background: '#1a1a1a',
          color: '#c9a84c',
          border: 'none',
          padding: '12px 30px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '1em',
          transition: 'all 0.3s'
        },
        onMouseEnter: (e) => {
          e.currentTarget.style.background = '#0f0f0f';
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.background = '#1a1a1a';
        }
      }, subscribed ? '✅ Subscribed!' : '🔔 Subscribe')
    ),

    React.createElement('p', {
      style: {
        fontSize: '0.85em',
        marginTop: '15px',
        opacity: 0.8
      }
    }, 'No spam, unsubscribe anytime')
  );
};

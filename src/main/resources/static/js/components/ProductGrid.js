/**
 * ProductGrid Component - Product listing with filtering
 */

import React from 'react';
import { ProductCard } from './ProductCard.js';

export const ProductGrid = ({ products, loading, categories, onCategoryChange, onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  const productsArray = Array.isArray(products) ? products : [];
  const categoriesArray = Array.isArray(categories) ? categories : [];
  
  const filteredProducts = selectedCategory === 'all'
    ? productsArray
    : productsArray.filter(p => p.category === selectedCategory);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onCategoryChange?.(category);
  };

  return React.createElement('div', {
    style: {
      margin: '40px 0'
    }
  },
    // Category Filter
    React.createElement('div', {
      style: {
        display: 'flex',
        gap: '10px',
        marginBottom: '30px',
        overflowX: 'auto',
        paddingBottom: '10px'
      }
    },
      React.createElement('button', {
        onClick: () => handleCategoryChange('all'),
        style: {
          padding: '10px 20px',
          border: selectedCategory === 'all' ? '2px solid #c9a84c' : '1px solid #3d3d3d',
          background: selectedCategory === 'all' ? 'rgba(201, 168, 76, 0.1)' : 'transparent',
          color: selectedCategory === 'all' ? '#c9a84c' : '#b0b0b0',
          borderRadius: '20px',
          cursor: 'pointer',
          fontSize: '0.95em',
          fontWeight: 'bold',
          transition: 'all 0.3s',
          whiteSpace: 'nowrap'
        }
      }, 'All Products'),
      categoriesArray && categoriesArray.map(cat =>
        React.createElement('button', {
          key: cat,
          onClick: () => handleCategoryChange(cat),
          style: {
            padding: '10px 20px',
            border: selectedCategory === cat ? '2px solid #c9a84c' : '1px solid #3d3d3d',
            background: selectedCategory === cat ? 'rgba(201, 168, 76, 0.1)' : 'transparent',
            color: selectedCategory === cat ? '#c9a84c' : '#b0b0b0',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '0.95em',
            fontWeight: 'bold',
            transition: 'all 0.3s',
            whiteSpace: 'nowrap'
          }
        }, cat)
      )
    ),

    // Loading State
    loading && React.createElement('div', {
      style: {
        textAlign: 'center',
        padding: '40px',
        color: '#b0b0b0'
      }
    }, '⏳ Loading products...'),

    // Products Grid
    !loading && filteredProducts.length > 0 && React.createElement('div', {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px'
      }
    },
      filteredProducts.map(product =>
        React.createElement(ProductCard, {
          key: product.id,
          product,
          onAddToCart
        })
      )
    ),

    // Empty State
    !loading && filteredProducts.length === 0 && React.createElement('div', {
      style: {
        textAlign: 'center',
        padding: '60px 20px',
        color: '#b0b0b0'
      }
    },
      React.createElement('p', {
        style: { fontSize: '1.1em', marginBottom: '10px' }
      }, '😔 No products found'),
      React.createElement('p', {
        style: { fontSize: '0.9em' }
      }, 'Try a different category or search term')
    )
  );
};

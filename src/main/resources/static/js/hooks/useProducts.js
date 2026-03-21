/**
 * useProducts Hook - Product management
 */

import React from 'react';
import { api } from '../services/api.js';

export const useProducts = () => {
  const [products, setProducts] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [featured, setFeatured] = React.useState([]);
  const [trending, setTrending] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      try {
        console.log('Loading products...');
        const [prods, cats, feat, trend] = await Promise.all([
          api.products.getAll().catch(e => { console.error('getAll failed:', e); return []; }),
          api.products.getCategories().catch(e => { console.error('getCategories failed:', e); return []; }),
          api.products.getFeatured().catch(e => { console.error('getFeatured failed:', e); return []; }),
          api.products.getTrending().catch(e => { console.error('getTrending failed:', e); return []; })
        ]);
        // Ensure all responses are arrays (backend might wrap data in object)
        const productsArray = Array.isArray(prods) ? prods : (prods?.data || []);
        const categoriesArray = Array.isArray(cats) ? cats : (cats?.data || []);
        const featuredArray = Array.isArray(feat) ? feat : (feat?.data || []);
        const trendingArray = Array.isArray(trend) ? trend : (trend?.data || []);
        
        console.log('Products loaded:', { prods: productsArray?.length, cats: categoriesArray?.length, feat: featuredArray?.length, trend: trendingArray?.length });
        setProducts(productsArray);
        setCategories(categoriesArray);
        setFeatured(featuredArray);
        setTrending(trendingArray);
      } catch (err) {
        console.error('Error loading products:', err);
        setProducts([]);
        setCategories([]);
        setFeatured([]);
        setTrending([]);
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, []);

  const search = React.useCallback((keyword) => {
    if (!keyword) return products;
    return products.filter(p =>
      p.name.toLowerCase().includes(keyword.toLowerCase()) ||
      (p.description || '').toLowerCase().includes(keyword.toLowerCase())
    );
  }, [products]);

  const filterByCategory = React.useCallback((category) => {
    if (!category) return products;
    return products.filter(p => p.category === category);
  }, [products]);

  return {
    products,
    categories,
    featured,
    trending,
    loading,
    search,
    filterByCategory
  };
};

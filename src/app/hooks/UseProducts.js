'use client';

import { useEffect, useState } from 'react';

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filters: [{ field: 'name', value: '' }],
        option: { limit: 8, offset: 0 },
      }),
    })
      .then(res => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then(res => setProducts(res))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);
  return { products, loading, error };
}

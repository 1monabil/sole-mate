import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/store/useStore';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      // Transform database products to match Product interface
      const transformedProducts: Product[] = (data || []).map((p) => ({
        id: p.id,
        name: p.name,
        brand: p.brand,
        price: Number(p.price),
        originalPrice: p.original_price ? Number(p.original_price) : undefined,
        image: p.image_url || '/placeholder.svg',
        category: p.category,
        sizes: Array.isArray(p.sizes) ? (p.sizes as number[]) : [],
        colors: Array.isArray(p.colors) ? (p.colors as string[]) : [],
        isNew: p.is_new || false,
        isSale: p.is_sale || false,
        rating: Number(p.rating) || 0,
        reviews: p.reviews_count || 0,
        description: p.description || '',
      }));

      setProducts(transformedProducts);

      // Extract unique categories
      const uniqueCategories = ['All', ...new Set(transformedProducts.map((p) => p.category))];
      setCategories(uniqueCategories);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    categories,
    isLoading,
    error,
    refetch: fetchProducts,
  };
};

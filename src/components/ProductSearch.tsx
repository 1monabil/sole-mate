import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useDebounce } from '@/hooks/useDebounce';

interface SearchProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  image_url: string | null;
  category: string;
}

export const ProductSearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const debouncedQuery = useDebounce(query, 300);

  // Keyboard shortcut to open search
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Search products when query changes
  const searchProducts = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, brand, price, image_url, category')
        .or(`name.ilike.%${searchQuery}%,brand.ilike.%${searchQuery}%,category.ilike.%${searchQuery}%`)
        .limit(8);

      if (error) throw error;
      setResults(data || []);
    } catch (err) {
      console.error('Search error:', err);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    searchProducts(debouncedQuery);
  }, [debouncedQuery, searchProducts]);

  const handleSelect = (productId: string) => {
    setOpen(false);
    setQuery('');
    navigate(`/products/${productId}`);
  };

  const handleViewAll = () => {
    setOpen(false);
    navigate(`/products?search=${encodeURIComponent(query)}`);
    setQuery('');
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-2 hover:text-primary transition-colors"
        aria-label="Search products"
      >
        <Search className="w-5 h-5" />
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search products..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {isLoading && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              Searching...
            </div>
          )}
          
          {!isLoading && query && results.length === 0 && (
            <CommandEmpty>No products found.</CommandEmpty>
          )}

          {!isLoading && results.length > 0 && (
            <CommandGroup heading="Products">
              {results.map((product) => (
                <CommandItem
                  key={product.id}
                  value={product.name}
                  onSelect={() => handleSelect(product.id)}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded bg-muted overflow-hidden flex-shrink-0">
                    <img
                      src={product.image_url || '/placeholder.svg'}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {product.brand} · {product.category}
                    </p>
                  </div>
                  <span className="text-sm font-semibold">
                    ${product.price.toFixed(2)}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {!isLoading && query && results.length > 0 && (
            <div className="p-2 border-t">
              <button
                onClick={handleViewAll}
                className="w-full text-sm text-primary hover:underline py-2"
              >
                View all results for "{query}"
              </button>
            </div>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

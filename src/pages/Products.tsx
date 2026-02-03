import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { PageTransition } from '@/components/PageTransition';
import { SlidersHorizontal, X, Loader2 } from 'lucide-react';

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
];

const Products = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const filterParam = searchParams.get('filter') || '';
  const categoryParam = searchParams.get('category') || '';
  
  const { products, categories, isLoading, error } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [activeFilter, setActiveFilter] = useState<'new' | 'sale' | ''>('');

  // Sync URL params with state
  useEffect(() => {
    if (filterParam === 'new' || filterParam === 'sale') {
      setActiveFilter(filterParam);
      setSelectedCategory('All');
    } else {
      setActiveFilter('');
    }
    
    if (categoryParam) {
      // Capitalize first letter to match category names
      const formattedCategory = categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1).toLowerCase();
      setSelectedCategory(formattedCategory);
      setActiveFilter('');
    } else if (!filterParam) {
      setSelectedCategory('All');
    }
  }, [filterParam, categoryParam]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Filter by active filter (new arrivals or sale)
    if (activeFilter === 'new') {
      result = result.filter((p) => p.isNew);
    } else if (activeFilter === 'sale') {
      result = result.filter((p) => p.isSale);
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Filter by price
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        // newest - keep original order (already sorted by created_at desc)
        break;
    }

    return result;
  }, [products, selectedCategory, sortBy, priceRange, searchQuery, activeFilter]);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-24 pb-16 flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-24 pb-16 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-destructive mb-4">{error}</p>
            <button onClick={() => window.location.reload()} className="btn-primary">
              Try Again
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <PageTransition className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              {activeFilter === 'new' ? 'New Arrivals' : activeFilter === 'sale' ? 'Sale Items' : selectedCategory !== 'All' ? selectedCategory : 'All Products'}
            </h1>
            <p className="text-muted-foreground">
              {filteredProducts.length} products found
            </p>
          </motion.div>

          {/* Active Filter Badge */}
          {(activeFilter || selectedCategory !== 'All') && (
            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm text-muted-foreground">Active filter:</span>
              <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                {activeFilter === 'new' ? 'New Arrivals' : activeFilter === 'sale' ? 'Sale' : selectedCategory}
              </span>
              <button
                onClick={() => {
                  setActiveFilter('');
                  setSelectedCategory('All');
                  window.history.pushState({}, '', '/products');
                }}
                className="p-1 hover:bg-secondary rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-border">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setActiveFilter('');
                    if (category === 'All') {
                      window.history.pushState({}, '', '/products');
                    } else {
                      window.history.pushState({}, '', `/products?category=${category.toLowerCase()}`);
                    }
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category && !activeFilter
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg bg-secondary border-none text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-sm font-medium hover:bg-secondary/80 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 p-6 bg-card rounded-2xl border border-border"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-1 hover:bg-secondary rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-primary"
                />
              </div>
            </motion.div>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setPriceRange([0, 500]);
                }}
                className="mt-4 btn-secondary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;

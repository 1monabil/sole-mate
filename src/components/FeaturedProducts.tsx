import { motion } from 'framer-motion';
import { ProductCard } from './ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';

export const FeaturedProducts = () => {
  const { products, isLoading } = useProducts();
  const featuredProducts = products.slice(0, 4);

  if (isLoading) {
    return (
      <section className="py-24 bg-background">
        <div className="container flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (featuredProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12"
        >
          <div>
            <p className="text-primary font-semibold tracking-wider uppercase mb-2">
              Featured
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Trending Now
            </h2>
          </div>
          <Link
            to="/products"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            View All Products
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

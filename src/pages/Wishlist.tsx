import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useStore } from '@/store/useStore';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  const handleAddToCart = (productId: string) => {
    const item = wishlist.find((w) => w.product.id === productId);
    if (item && item.product.sizes.length > 0) {
      addToCart(item.product, item.product.sizes[0], 1);
      toast.success(`${item.product.name} added to cart!`);
    }
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-24 pb-16 min-h-[70vh] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Heart className="w-20 h-20 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Your Wishlist is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Start adding items you love to your wishlist.
            </p>
            <Link to="/products" className="btn-primary inline-flex items-center gap-2">
              Explore Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black tracking-tight mb-8"
          >
            My Wishlist
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((item, index) => (
              <motion.div
                key={item.product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl overflow-hidden border border-border"
              >
                {/* Image */}
                <Link
                  to={`/product/${item.product.id}`}
                  className="block aspect-square overflow-hidden"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover image-reveal"
                  />
                </Link>

                {/* Info */}
                <div className="p-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    {item.product.brand}
                  </p>
                  <Link
                    to={`/product/${item.product.id}`}
                    className="font-semibold hover:text-primary transition-colors"
                  >
                    {item.product.name}
                  </Link>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-bold">${item.product.price}</span>
                    {item.product.originalPrice && (
                      <span className="text-muted-foreground line-through text-sm">
                        ${item.product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleAddToCart(item.product.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => {
                        removeFromWishlist(item.product.id);
                        toast.success('Removed from wishlist');
                      }}
                      className="p-2 rounded-lg bg-secondary hover:bg-destructive hover:text-destructive-foreground transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;

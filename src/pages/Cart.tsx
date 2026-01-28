import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useStore } from '@/store/useStore';
import { useDiscount } from '@/hooks/useDiscount';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, X, Loader2, Tag } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity, getCartTotal, clearCart } = useStore();
  const { isValidating, error, appliedDiscount, validateDiscount, clearDiscount } = useDiscount();
  const [discountCode, setDiscountCode] = useState('');
  
  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 10;
  const discountAmount = appliedDiscount?.calculatedDiscount ?? 0;
  const finalTotal = subtotal + shipping - discountAmount;

  const handleApplyDiscount = async () => {
    await validateDiscount(discountCode, subtotal);
  };

  const handleRemoveDiscount = () => {
    clearDiscount();
    setDiscountCode('');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-24 pb-16 min-h-[70vh] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <ShoppingBag className="w-20 h-20 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link to="/products" className="btn-primary inline-flex items-center gap-2">
              Start Shopping
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
            Shopping Cart
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item, index) => (
                <motion.div
                  key={`${item.product.id}-${item.size}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-6 p-6 bg-card rounded-2xl border border-border"
                >
                  {/* Image */}
                  <Link
                    to={`/product/${item.product.id}`}
                    className="w-32 h-32 rounded-xl overflow-hidden bg-secondary flex-shrink-0"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between">
                      <div>
                        <Link
                          to={`/product/${item.product.id}`}
                          className="font-semibold text-lg hover:text-primary transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-muted-foreground text-sm">
                          Size: {item.size}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.size)}
                        className="p-2 hover:text-destructive transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between">
                      {/* Quantity */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateCartQuantity(
                              item.product.id,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          className="qty-btn w-8 h-8"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4 mx-auto" />
                        </button>
                        <span className="font-semibold w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateCartQuantity(
                              item.product.id,
                              item.size,
                              item.quantity + 1
                            )
                          }
                          className="qty-btn w-8 h-8"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4 mx-auto" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-bold text-lg">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}

              <button
                onClick={clearCart}
                className="text-muted-foreground hover:text-destructive transition-colors text-sm"
              >
                Clear Cart
              </button>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card rounded-2xl border border-border p-8 h-fit sticky top-28"
            >
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 pb-6 border-b border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {appliedDiscount && (
                  <div className="flex justify-between text-green-600">
                    <span className="flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Discount ({appliedDiscount.code})
                    </span>
                    <span className="font-medium">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between py-6 border-b border-border">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-lg">${finalTotal.toFixed(2)}</span>
              </div>

              {/* Discount Code */}
              <div className="py-6 border-b border-border">
                {appliedDiscount ? (
                  <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <div className="flex items-center gap-2 text-green-600">
                      <Tag className="w-4 h-4" />
                      <span className="font-medium">{appliedDiscount.code}</span>
                      <span className="text-sm">
                        ({appliedDiscount.discountType === 'percentage' 
                          ? `${appliedDiscount.discountValue}% off` 
                          : `$${appliedDiscount.discountValue} off`})
                      </span>
                    </div>
                    <button 
                      onClick={handleRemoveDiscount}
                      className="p-1 hover:text-destructive transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Discount code"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleApplyDiscount()}
                        className="flex-1 px-4 py-3 rounded-lg bg-secondary border-none text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <button 
                        onClick={handleApplyDiscount}
                        disabled={isValidating}
                        className="px-4 py-3 rounded-lg bg-secondary font-medium text-sm hover:bg-secondary/80 transition-colors disabled:opacity-50 flex items-center gap-2"
                      >
                        {isValidating && <Loader2 className="w-4 h-4 animate-spin" />}
                        Apply
                      </button>
                    </div>
                    {error && (
                      <p className="text-destructive text-sm">{error}</p>
                    )}
                  </div>
                )}
              </div>

              <Link to="/checkout" className="btn-primary w-full text-center block mt-6">
                Proceed to Checkout
              </Link>

              <p className="text-center text-muted-foreground text-sm mt-4">
                Free shipping on orders over $100
              </p>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;

import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useStore } from '@/store/useStore';
import { useAuth } from '@/hooks/useAuth';
import { useDiscount } from '@/hooks/useDiscount';
import { useCheckout, ShippingAddress } from '@/hooks/useCheckout';
import { ArrowLeft, Loader2, Tag, X, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const shippingSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number required').max(20),
  address: z.string().min(5, 'Address is required').max(200),
  city: z.string().min(2, 'City is required').max(100),
  state: z.string().min(2, 'State is required').max(100),
  zipCode: z.string().min(3, 'ZIP code is required').max(20),
  country: z.string().min(2, 'Country is required').max(100),
});

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { cart, getCartTotal } = useStore();
  const { user, isLoading: authLoading } = useAuth();
  const { isValidating, error: discountError, appliedDiscount, validateDiscount, clearDiscount } = useDiscount();
  const { isProcessing, error: checkoutError, createOrder } = useCheckout();

  const [discountCode, setDiscountCode] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 10;
  const discountAmount = appliedDiscount?.calculatedDiscount ?? 0;
  const total = subtotal + shipping - discountAmount;

  useEffect(() => {
    if (!authLoading && !user) {
      toast({
        title: 'Login Required',
        description: 'Please log in to complete your purchase.',
        variant: 'destructive',
      });
      navigate('/auth?redirect=/checkout');
    }
  }, [user, authLoading, navigate, toast]);

  useEffect(() => {
    if (cart.length === 0 && !authLoading) {
      navigate('/cart');
    }
  }, [cart, authLoading, navigate]);

  const handleInputChange = (field: keyof ShippingAddress, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleApplyDiscount = async () => {
    await validateDiscount(discountCode, subtotal);
  };

  const handleRemoveDiscount = () => {
    setDiscountCode('');
    clearDiscount();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const result = shippingSchema.safeParse(formData);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
      });
      setFormErrors(errors);
      return;
    }

    const orderResult = await createOrder(
      formData,
      appliedDiscount?.code ?? null,
      discountAmount,
      shipping
    );

    if (orderResult) {
      navigate(`/order-confirmation/${orderResult.orderId}`);
    }
  };

  if (authLoading || cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container max-w-6xl">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black tracking-tight mb-8"
          >
            Checkout
          </motion.h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Shipping Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-2 space-y-8"
              >
                <div className="bg-card rounded-2xl border border-border p-8">
                  <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={formErrors.firstName ? 'border-destructive' : ''}
                      />
                      {formErrors.firstName && (
                        <p className="text-sm text-destructive">{formErrors.firstName}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={formErrors.lastName ? 'border-destructive' : ''}
                      />
                      {formErrors.lastName && (
                        <p className="text-sm text-destructive">{formErrors.lastName}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={formErrors.email ? 'border-destructive' : ''}
                      />
                      {formErrors.email && (
                        <p className="text-sm text-destructive">{formErrors.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={formErrors.phone ? 'border-destructive' : ''}
                      />
                      {formErrors.phone && (
                        <p className="text-sm text-destructive">{formErrors.phone}</p>
                      )}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className={formErrors.address ? 'border-destructive' : ''}
                      />
                      {formErrors.address && (
                        <p className="text-sm text-destructive">{formErrors.address}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className={formErrors.city ? 'border-destructive' : ''}
                      />
                      {formErrors.city && (
                        <p className="text-sm text-destructive">{formErrors.city}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State / Province</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className={formErrors.state ? 'border-destructive' : ''}
                      />
                      {formErrors.state && (
                        <p className="text-sm text-destructive">{formErrors.state}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP / Postal Code</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        className={formErrors.zipCode ? 'border-destructive' : ''}
                      />
                      {formErrors.zipCode && (
                        <p className="text-sm text-destructive">{formErrors.zipCode}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={formData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        className={formErrors.country ? 'border-destructive' : ''}
                      />
                      {formErrors.country && (
                        <p className="text-sm text-destructive">{formErrors.country}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Order Items Preview */}
                <div className="bg-card rounded-2xl border border-border p-8">
                  <h2 className="text-xl font-bold mb-6">Order Items ({cart.length})</h2>
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={`${item.product.id}-${item.size}`}
                        className="flex items-center gap-4"
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{item.product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Size: {item.size} • Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-2xl border border-border p-8 h-fit sticky top-28"
              >
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                {/* Discount Code */}
                <div className="pb-6 border-b border-border">
                  {appliedDiscount ? (
                    <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">{appliedDiscount.code}</span>
                        <span className="text-sm text-muted-foreground">
                          (-${appliedDiscount.calculatedDiscount.toFixed(2)})
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveDiscount}
                        className="p-1 hover:text-destructive transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            placeholder="Discount code"
                            value={discountCode}
                            onChange={(e) => setDiscountCode(e.target.value)}
                            className="pl-9"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={handleApplyDiscount}
                          disabled={isValidating}
                        >
                          {isValidating ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            'Apply'
                          )}
                        </Button>
                      </div>
                      {discountError && (
                        <p className="text-sm text-destructive">{discountError}</p>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-4 py-6 border-b border-border">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-primary">
                      <span>Discount</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between py-6 border-b border-border">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-lg">${total.toFixed(2)}</span>
                </div>

                {checkoutError && (
                  <p className="text-sm text-destructive mt-4">{checkoutError}</p>
                )}

                <Button
                  type="submit"
                  className="w-full mt-6"
                  size="lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    `Place Order • $${total.toFixed(2)}`
                  )}
                </Button>

                <p className="text-center text-muted-foreground text-sm mt-4">
                  Free shipping on orders over $100
                </p>
              </motion.div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle2, Package, ArrowRight, Loader2, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OrderItem {
  id: string;
  product_name: string;
  product_image: string | null;
  quantity: number;
  size: string | null;
  price_at_purchase: number;
}

interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface Order {
  id: string;
  status: string;
  subtotal: number;
  total_amount: number;
  discount_amount: number | null;
  discount_code: string | null;
  shipping_address: ShippingAddress | null;
  created_at: string;
  order_items: OrderItem[];
}

const OrderConfirmation = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setError('Order not found');
        setIsLoading(false);
        return;
      }

      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select(`
          id,
          status,
          subtotal,
          total_amount,
          discount_amount,
          discount_code,
          shipping_address,
          created_at,
          order_items (
            id,
            product_name,
            product_image,
            quantity,
            size,
            price_at_purchase
          )
        `)
        .eq('id', orderId)
        .maybeSingle();

      if (orderError) {
        console.error('Error fetching order:', orderError);
        setError('Failed to load order details');
        setIsLoading(false);
        return;
      }

      if (!orderData) {
        setError('Order not found');
        setIsLoading(false);
        return;
      }

      setOrder({
        ...orderData,
        shipping_address: orderData.shipping_address as unknown as ShippingAddress | null,
      });
      setIsLoading(false);
    };

    fetchOrder();
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-24 pb-16 min-h-[70vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Order Not Found</h1>
            <p className="text-muted-foreground mb-8">{error || 'Unable to load order details.'}</p>
            <Link to="/products" className="btn-primary inline-flex items-center gap-2">
              Continue Shopping
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const orderNumber = order.id.substring(0, 8).toUpperCase();
  const shipping = order.total_amount - order.subtotal + (order.discount_amount ?? 0);
  const shippingDisplay = shipping <= 0 ? 0 : shipping;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container max-w-4xl">
          {/* Success Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              Order Confirmed!
            </h1>
            <p className="text-xl text-muted-foreground">
              Thank you for your purchase. Your order has been received.
            </p>
          </motion.div>

          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-2xl border border-border p-8 mb-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border mb-6">
              <div>
                <p className="text-sm text-muted-foreground">Order Number</p>
                <p className="text-2xl font-bold">#{orderNumber}</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <Package className="w-4 h-4 text-primary" />
                <span className="font-medium capitalize">{order.status}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Shipping Address */}
              {order.shipping_address && (
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium mb-1">Shipping Address</p>
                    <p className="text-muted-foreground text-sm">
                      {order.shipping_address.firstName} {order.shipping_address.lastName}
                      <br />
                      {order.shipping_address.address}
                      <br />
                      {order.shipping_address.city}, {order.shipping_address.state}{' '}
                      {order.shipping_address.zipCode}
                      <br />
                      {order.shipping_address.country}
                    </p>
                  </div>
                </div>
              )}

              {/* Order Date */}
              <div className="flex gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium mb-1">Order Date</p>
                  <p className="text-muted-foreground text-sm">
                    {new Date(order.created_at).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <h3 className="font-bold mb-4">Items Ordered</h3>
            <div className="space-y-4 pb-6 border-b border-border">
              {order.order_items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                    {item.product_image ? (
                      <img
                        src={item.product_image}
                        alt={item.product_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-6 h-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{item.product_name}</p>
                    <p className="text-sm text-muted-foreground">
                      Size: {item.size || 'N/A'} • Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">
                    ${(item.price_at_purchase * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="pt-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              {order.discount_amount && order.discount_amount > 0 && (
                <div className="flex justify-between text-sm text-primary">
                  <span>
                    Discount
                    {order.discount_code && (
                      <span className="text-muted-foreground ml-1">({order.discount_code})</span>
                    )}
                  </span>
                  <span>-${order.discount_amount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shippingDisplay === 0 ? 'Free' : `$${shippingDisplay.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-3 border-t border-border">
                <span>Total</span>
                <span>${order.total_amount.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg">
              <Link to="/products">
                Continue Shopping
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link to="/">Back to Home</Link>
            </Button>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;

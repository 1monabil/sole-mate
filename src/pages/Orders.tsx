import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Eye, ChevronRight, Loader2, ShoppingBag } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PageTransition } from '@/components/PageTransition';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

interface OrderItem {
  id: string;
  product_name: string;
  product_image: string | null;
  quantity: number;
  size: string | null;
  price_at_purchase: number;
}

interface Order {
  id: string;
  status: string;
  total_amount: number;
  subtotal: number;
  discount_amount: number | null;
  discount_code: string | null;
  created_at: string;
  order_items: OrderItem[];
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  processing: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  shipped: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  delivered: 'bg-green-500/20 text-green-400 border-green-500/30',
  cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const OrderSkeleton = () => (
  <Card>
    <CardHeader className="pb-4">
      <div className="flex justify-between">
        <div className="space-y-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-6 w-20" />
      </div>
    </CardHeader>
    <Separator />
    <CardContent className="pt-4 space-y-3">
      {[1, 2].map((i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="w-16 h-16 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-28" />
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
);

const Orders = () => {
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    if (!user) return;
    setIsLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select(`
        id, status, total_amount, subtotal, discount_amount, discount_code, created_at,
        order_items (id, product_name, product_image, quantity, size, price_at_purchase)
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error) setOrders(data || []);
    setIsLoading(false);
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <PageTransition className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tighter">Order History</h1>
              <p className="text-muted-foreground mt-1">
                {!isLoading && `${orders.length} order${orders.length !== 1 ? 's' : ''}`}
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/products">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Shop
              </Link>
            </Button>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <OrderSkeleton key={i} />
              ))}
            </div>
          ) : orders.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Package className="w-16 h-16 text-muted-foreground mb-4" />
                <p className="text-xl font-semibold mb-2">No orders yet</p>
                <p className="text-muted-foreground mb-6 text-center">
                  Your order history will appear here once you make a purchase.
                </p>
                <Button asChild>
                  <Link to="/products">Browse Products</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <CardTitle className="text-base font-medium">
                              Order #{order.id.slice(0, 8).toUpperCase()}
                            </CardTitle>
                            <Badge
                              variant="outline"
                              className={statusColors[order.status] || statusColors.pending}
                            >
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </Badge>
                          </div>
                          <CardDescription>Placed on {formatDate(order.created_at)}</CardDescription>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">${order.total_amount.toFixed(2)}</p>
                          {order.discount_code && order.discount_amount && order.discount_amount > 0 && (
                            <p className="text-sm text-green-400">
                              Saved ${order.discount_amount.toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <Separator />
                    <CardContent className="pt-4">
                      <div className="space-y-3">
                        {order.order_items.slice(0, 3).map((item) => (
                          <div key={item.id} className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-lg bg-secondary overflow-hidden flex-shrink-0">
                              {item.product_image ? (
                                <img
                                  src={item.product_image}
                                  alt={item.product_name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                  <Package className="w-6 h-6" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{item.product_name}</p>
                              <p className="text-sm text-muted-foreground">
                                {item.size && `Size ${item.size} · `}
                                Qty {item.quantity} · ${item.price_at_purchase.toFixed(2)} each
                              </p>
                            </div>
                          </div>
                        ))}
                        {order.order_items.length > 3 && (
                          <p className="text-sm text-muted-foreground">
                            +{order.order_items.length - 3} more item
                            {order.order_items.length - 3 !== 1 ? 's' : ''}
                          </p>
                        )}
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button variant="ghost" size="sm" asChild>
                          <Link
                            to={`/order-confirmation/${order.id}`}
                            className="flex items-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            View Details
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default Orders;

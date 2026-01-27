import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Package, Settings, ChevronRight, Eye, Loader2 } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
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

interface OrderItem {
  id: string;
  product_name: string;
  product_image: string | null;
  quantity: number;
  size: string | null;
  price_at_purchase: number;
}

const profileSchema = z.object({
  full_name: z.string().trim().max(100, 'Name must be less than 100 characters').optional(),
  phone: z.string().trim().max(20, 'Phone must be less than 20 characters').optional(),
  address: z.string().trim().max(500, 'Address must be less than 500 characters').optional(),
});

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  processing: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  shipped: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  delivered: 'bg-green-500/20 text-green-400 border-green-500/30',
  cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const Profile = () => {
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  
  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    address: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchOrders();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    setIsLoadingProfile(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, email, phone, address')
      .eq('id', user.id)
      .maybeSingle();

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load profile',
      });
    } else if (data) {
      setProfile(data);
      setFormData({
        full_name: data.full_name || '',
        phone: data.phone || '',
        address: data.address || '',
      });
    }
    setIsLoadingProfile(false);
  };

  const fetchOrders = async () => {
    if (!user) return;
    
    setIsLoadingOrders(true);
    const { data, error } = await supabase
      .from('orders')
      .select(`
        id,
        status,
        total_amount,
        subtotal,
        discount_amount,
        discount_code,
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
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load orders',
      });
    } else {
      setOrders(data || []);
    }
    setIsLoadingOrders(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    // Validate form data
    const result = profileSchema.safeParse(formData);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
      });
      setFormErrors(errors);
      return;
    }

    setIsSaving(true);
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: formData.full_name || null,
        phone: formData.phone || null,
        address: formData.address || null,
      })
      .eq('id', user.id);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update profile',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
      fetchProfile();
    }
    setIsSaving(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">My Account</h1>
                <p className="text-muted-foreground">{user?.email}</p>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="orders" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 max-w-md">
                <TabsTrigger value="orders" className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Orders
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Settings
                </TabsTrigger>
              </TabsList>

              {/* Orders Tab */}
              <TabsContent value="orders" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Order History</h2>
                  <p className="text-sm text-muted-foreground">
                    {orders.length} order{orders.length !== 1 ? 's' : ''}
                  </p>
                </div>

                {isLoadingOrders ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : orders.length === 0 ? (
                  <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Package className="w-12 h-12 text-muted-foreground mb-4" />
                      <p className="text-lg font-medium mb-2">No orders yet</p>
                      <p className="text-muted-foreground mb-4">
                        Start shopping to see your orders here
                      </p>
                      <Button asChild>
                        <Link to="/products">Browse Products</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Card key={order.id} className="overflow-hidden">
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
                              <CardDescription>
                                Placed on {formatDate(order.created_at)}
                              </CardDescription>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold">
                                ${order.total_amount.toFixed(2)}
                              </p>
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
                                +{order.order_items.length - 3} more item{order.order_items.length - 3 !== 1 ? 's' : ''}
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
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your account details and shipping information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {isLoadingProfile ? (
                      <div className="flex justify-center py-8">
                        <Loader2 className="w-6 h-6 animate-spin text-primary" />
                      </div>
                    ) : (
                      <>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              value={user?.email || ''}
                              disabled
                              className="bg-muted"
                            />
                            <p className="text-xs text-muted-foreground">
                              Email cannot be changed
                            </p>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="full_name">Full Name</Label>
                            <Input
                              id="full_name"
                              name="full_name"
                              value={formData.full_name}
                              onChange={handleInputChange}
                              placeholder="Enter your full name"
                            />
                            {formErrors.full_name && (
                              <p className="text-sm text-destructive">{formErrors.full_name}</p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Enter your phone number"
                          />
                          {formErrors.phone && (
                            <p className="text-sm text-destructive">{formErrors.phone}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="address">Default Shipping Address</Label>
                          <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Enter your default shipping address"
                          />
                          {formErrors.address && (
                            <p className="text-sm text-destructive">{formErrors.address}</p>
                          )}
                        </div>

                        <div className="flex justify-end">
                          <Button 
                            onClick={handleSaveProfile} 
                            disabled={isSaving}
                            className="min-w-[120px]"
                          >
                            {isSaving ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Saving...
                              </>
                            ) : (
                              'Save Changes'
                            )}
                          </Button>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;

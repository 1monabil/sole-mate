import { StaticPageLayout } from '@/components/StaticPageLayout';
import { Truck, Clock, Globe, Package } from 'lucide-react';

const shippingOptions = [
  {
    icon: Truck,
    title: 'Standard Shipping',
    time: '5-7 Business Days',
    price: 'Free on orders over $100',
    description: 'Our most popular option. Reliable delivery at no extra cost for qualifying orders.',
  },
  {
    icon: Clock,
    title: 'Express Shipping',
    time: '2-3 Business Days',
    price: '$14.99',
    description: 'Need it fast? Get your order delivered quickly with our express option.',
  },
  {
    icon: Globe,
    title: 'International Shipping',
    time: '7-14 Business Days',
    price: 'Calculated at checkout',
    description: 'We ship to over 50 countries. Duties and taxes may apply.',
  },
];

const Shipping = () => {
  return (
    <StaticPageLayout title="Shipping Information">
      <div className="max-w-4xl">
        <p className="text-muted-foreground text-lg mb-12">
          We're committed to getting your order to you as quickly and safely as possible. 
          Here's everything you need to know about our shipping options.
        </p>

        {/* Shipping Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {shippingOptions.map((option) => (
            <div key={option.title} className="bg-card rounded-2xl p-6 border border-border">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <option.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{option.title}</h3>
              <p className="text-primary font-semibold mb-1">{option.time}</p>
              <p className="text-muted-foreground text-sm mb-3">{option.price}</p>
              <p className="text-muted-foreground text-sm">{option.description}</p>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Order Processing</h2>
            <p className="text-muted-foreground">
              Orders are processed within 1-2 business days. You'll receive an email confirmation 
              once your order is placed, and another when it ships with tracking information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Tracking Your Order</h2>
            <p className="text-muted-foreground">
              Once your order ships, you'll receive a tracking number via email. You can also 
              view your order status and tracking information in your account dashboard.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Delivery Issues</h2>
            <p className="text-muted-foreground">
              If you experience any issues with your delivery, please contact our support team 
              within 48 hours of the expected delivery date. We're here to help resolve any problems.
            </p>
          </section>

          <section className="bg-card rounded-2xl p-6 border border-border">
            <div className="flex items-start gap-4">
              <Package className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">Free Shipping</h3>
                <p className="text-muted-foreground">
                  Enjoy free standard shipping on all orders over $100 within the continental United States. 
                  No promo code needed – the discount is applied automatically at checkout.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </StaticPageLayout>
  );
};

export default Shipping;

import { StaticPageLayout } from '@/components/StaticPageLayout';
import { Target, Heart, Zap, Users } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Quality First',
    description: 'Every shoe we make is crafted with premium materials and attention to detail.',
  },
  {
    icon: Heart,
    title: 'Customer Love',
    description: 'We put our customers at the heart of everything we do.',
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'Constantly pushing boundaries in comfort, style, and sustainability.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Building a global community of sneaker enthusiasts and athletes.',
  },
];

const About = () => {
  return (
    <StaticPageLayout title="About STRIDE">
      <div className="max-w-4xl">
        {/* Hero Section */}
        <div className="mb-16">
          <p className="text-xl text-muted-foreground mb-8">
            Born from a passion for performance and style, STRIDE is more than just a footwear brand. 
            We're a movement dedicated to helping people move better, feel better, and look better – 
            one step at a time.
          </p>
          <div className="aspect-video bg-secondary rounded-2xl overflow-hidden">
            <img 
              src="/placeholder.svg" 
              alt="STRIDE team" 
              className="w-full h-full object-cover opacity-50"
            />
          </div>
        </div>

        {/* Story */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Founded in 2020, STRIDE started with a simple question: why should you have to choose 
              between style and comfort? Our founders, former athletes and designers, set out to 
              create footwear that delivers on both fronts without compromise.
            </p>
            <p>
              What began as a small operation in a Brooklyn warehouse has grown into a global brand 
              serving customers in over 50 countries. But no matter how big we grow, our mission 
              remains the same: to create the perfect shoe for every stride.
            </p>
            <p>
              Today, STRIDE is known for innovative designs, premium materials, and a commitment to 
              sustainability. We're proud to be a certified B Corporation and a member of 1% for the 
              Planet, donating a portion of our revenue to environmental causes.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Our Values</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value) => (
              <div key={value.title} className="bg-card rounded-2xl p-6 border border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="bg-card rounded-2xl p-8 border border-border">
          <h2 className="text-2xl font-bold mb-8 text-center">STRIDE by the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-4xl font-black text-primary">2M+</p>
              <p className="text-muted-foreground">Happy Customers</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-black text-primary">50+</p>
              <p className="text-muted-foreground">Countries</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-black text-primary">100+</p>
              <p className="text-muted-foreground">Shoe Styles</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-black text-primary">4.8</p>
              <p className="text-muted-foreground">Average Rating</p>
            </div>
          </div>
        </section>
      </div>
    </StaticPageLayout>
  );
};

export default About;

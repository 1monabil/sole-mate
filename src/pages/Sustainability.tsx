import { StaticPageLayout } from '@/components/StaticPageLayout';
import { Leaf, Recycle, Droplets, Wind, Target, CheckCircle } from 'lucide-react';

const initiatives = [
  {
    icon: Recycle,
    title: 'Recycled Materials',
    description: 'Over 60% of our products use recycled materials, including ocean plastics and post-consumer waste.',
  },
  {
    icon: Droplets,
    title: 'Water Conservation',
    description: 'Our dyeing process uses 50% less water than traditional methods.',
  },
  {
    icon: Wind,
    title: 'Carbon Neutral',
    description: 'We offset 100% of our carbon emissions through verified environmental projects.',
  },
  {
    icon: Leaf,
    title: 'Sustainable Packaging',
    description: 'All packaging is made from recycled materials and is fully recyclable.',
  },
];

const goals = [
  { year: '2025', goal: '75% recycled materials across all products', achieved: true },
  { year: '2026', goal: 'Zero waste in manufacturing facilities', achieved: false },
  { year: '2027', goal: '100% renewable energy in operations', achieved: false },
  { year: '2030', goal: 'Fully circular product lifecycle', achieved: false },
];

const Sustainability = () => {
  return (
    <StaticPageLayout title="Sustainability">
      <div className="max-w-4xl">
        {/* Intro */}
        <p className="text-xl text-muted-foreground mb-12">
          At STRIDE, sustainability isn't just a buzzword – it's at the core of everything we do. 
          We're committed to reducing our environmental impact while creating the best footwear on the planet.
        </p>

        {/* Our Commitment */}
        <section className="bg-gradient-to-br from-green-500/10 to-primary/10 rounded-2xl p-8 border border-green-500/20 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Leaf className="w-8 h-8 text-green-500" />
            <h2 className="text-2xl font-bold">Our Commitment</h2>
          </div>
          <p className="text-muted-foreground text-lg">
            We believe that the best shoes shouldn't cost the earth. That's why we're working 
            toward a future where every STRIDE product is made with 100% sustainable materials 
            and practices. By 2030, we aim to be a fully circular company.
          </p>
        </section>

        {/* Initiatives */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Our Initiatives</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {initiatives.map((initiative) => (
              <div key={initiative.title} className="bg-card rounded-2xl p-6 border border-border">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                  <initiative.icon className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">{initiative.title}</h3>
                <p className="text-muted-foreground">{initiative.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Goals Timeline */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Sustainability Roadmap</h2>
          <div className="space-y-4">
            {goals.map((item) => (
              <div 
                key={item.year} 
                className={`flex items-center gap-4 p-4 rounded-xl border ${
                  item.achieved 
                    ? 'bg-green-500/10 border-green-500/30' 
                    : 'bg-card border-border'
                }`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center font-black text-lg ${
                  item.achieved 
                    ? 'bg-green-500 text-white' 
                    : 'bg-secondary text-foreground'
                }`}>
                  {item.year}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{item.goal}</p>
                </div>
                {item.achieved && (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Impact Stats */}
        <section className="bg-card rounded-2xl p-8 border border-border mb-12">
          <div className="flex items-center gap-3 mb-8">
            <Target className="w-8 h-8 text-primary" />
            <h2 className="text-2xl font-bold">Our Impact in 2025</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-4xl font-black text-green-500">1.2M</p>
              <p className="text-muted-foreground text-sm">Plastic Bottles Recycled</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-black text-green-500">50%</p>
              <p className="text-muted-foreground text-sm">Less Water Used</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-black text-green-500">100%</p>
              <p className="text-muted-foreground text-sm">Carbon Offset</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-black text-green-500">0</p>
              <p className="text-muted-foreground text-sm">Products in Landfills</p>
            </div>
          </div>
        </section>

        {/* Take Back Program */}
        <section className="bg-primary/10 rounded-2xl p-8 border border-primary/20">
          <h3 className="text-2xl font-bold mb-4">STRIDE Take-Back Program</h3>
          <p className="text-muted-foreground mb-6">
            Don't throw away your old STRIDEs! Send them back to us and we'll recycle them 
            into new products. Plus, you'll receive a 20% discount on your next purchase.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="/contact" className="btn-primary inline-block">
              Learn More
            </a>
          </div>
        </section>
      </div>
    </StaticPageLayout>
  );
};

export default Sustainability;

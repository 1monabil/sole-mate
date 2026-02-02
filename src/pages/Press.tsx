import { StaticPageLayout } from '@/components/StaticPageLayout';
import { Button } from '@/components/ui/button';
import { Download, Mail, ExternalLink } from 'lucide-react';

const pressReleases = [
  {
    date: 'January 15, 2026',
    title: 'STRIDE Launches Revolutionary Eco-Runner Collection',
    excerpt: 'New line features shoes made from 100% recycled ocean plastics.',
  },
  {
    date: 'December 1, 2025',
    title: 'STRIDE Expands to 10 New International Markets',
    excerpt: 'Global expansion brings premium footwear to customers in Asia and Europe.',
  },
  {
    date: 'October 20, 2025',
    title: 'STRIDE Partners with Olympic Athletes for 2026 Games',
    excerpt: 'Exclusive partnership to provide performance footwear for Team USA.',
  },
  {
    date: 'September 5, 2025',
    title: 'STRIDE Achieves B Corp Certification',
    excerpt: 'Commitment to sustainability recognized with prestigious certification.',
  },
];

const mediaFeatures = [
  { name: 'Forbes', quote: '"The sneaker brand redefining sustainable fashion."' },
  { name: 'Vogue', quote: '"Where performance meets runway-ready style."' },
  { name: 'Runner\'s World', quote: '"The most comfortable running shoes we\'ve ever tested."' },
  { name: 'Fast Company', quote: '"One of the most innovative companies of 2025."' },
];

const Press = () => {
  return (
    <StaticPageLayout title="Press & Media">
      <div className="max-w-4xl">
        <p className="text-xl text-muted-foreground mb-12">
          Stay up to date with the latest STRIDE news, announcements, and media coverage.
        </p>

        {/* Media Contact */}
        <section className="bg-card rounded-2xl p-8 border border-border mb-12">
          <h2 className="text-2xl font-bold mb-4">Media Contact</h2>
          <p className="text-muted-foreground mb-6">
            For press inquiries, interview requests, or media assets, please contact our 
            communications team.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button>
              <Mail className="w-4 h-4 mr-2" />
              press@stride.com
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download Press Kit
            </Button>
          </div>
        </section>

        {/* Featured In */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured In</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {mediaFeatures.map((feature) => (
              <div key={feature.name} className="bg-card rounded-xl p-6 border border-border">
                <p className="text-xl font-bold text-primary mb-2">{feature.name}</p>
                <p className="text-muted-foreground italic">{feature.quote}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Press Releases */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Press Releases</h2>
          <div className="space-y-4">
            {pressReleases.map((release) => (
              <div 
                key={release.title} 
                className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors cursor-pointer group"
              >
                <p className="text-sm text-muted-foreground mb-2">{release.date}</p>
                <h3 className="text-lg font-bold group-hover:text-primary transition-colors flex items-center gap-2">
                  {release.title}
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-muted-foreground mt-2">{release.excerpt}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Brand Assets */}
        <section className="mt-12 bg-secondary rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Brand Assets</h2>
          <p className="text-muted-foreground mb-6">
            Download official STRIDE logos, product images, and brand guidelines for use in 
            press and media coverage.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Logo Pack
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Product Images
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Brand Guidelines
            </Button>
          </div>
        </section>
      </div>
    </StaticPageLayout>
  );
};

export default Press;

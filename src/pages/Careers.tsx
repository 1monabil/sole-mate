import { StaticPageLayout } from '@/components/StaticPageLayout';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase, Clock, ArrowRight } from 'lucide-react';

const openPositions = [
  {
    title: 'Senior Product Designer',
    department: 'Design',
    location: 'New York, NY',
    type: 'Full-time',
  },
  {
    title: 'Full Stack Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
  },
  {
    title: 'Marketing Manager',
    department: 'Marketing',
    location: 'Los Angeles, CA',
    type: 'Full-time',
  },
  {
    title: 'Supply Chain Analyst',
    department: 'Operations',
    location: 'New York, NY',
    type: 'Full-time',
  },
  {
    title: 'Customer Success Specialist',
    department: 'Support',
    location: 'Remote',
    type: 'Full-time',
  },
  {
    title: 'Social Media Coordinator',
    department: 'Marketing',
    location: 'Remote',
    type: 'Part-time',
  },
];

const benefits = [
  'Competitive salary & equity',
  'Health, dental, and vision insurance',
  'Unlimited PTO',
  'Remote-first culture',
  'Home office stipend',
  'Professional development budget',
  'Free STRIDE products',
  'Annual team retreats',
];

const Careers = () => {
  return (
    <StaticPageLayout title="Careers at STRIDE">
      <div className="max-w-4xl">
        {/* Intro */}
        <p className="text-xl text-muted-foreground mb-12">
          Join our team of passionate individuals who are redefining what footwear can be. 
          We're always looking for talented people to help us build the future of STRIDE.
        </p>

        {/* Why Join */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Why Join STRIDE?</h2>
          <p className="text-muted-foreground mb-8">
            At STRIDE, we believe that great products come from great teams. We foster a culture 
            of creativity, collaboration, and continuous learning. When you join us, you're not 
            just getting a job – you're joining a family of sneaker enthusiasts committed to 
            making a difference.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {benefits.map((benefit) => (
              <div key={benefit} className="bg-card rounded-xl p-4 border border-border text-center">
                <p className="text-sm font-medium">{benefit}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Open Positions */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Open Positions</h2>
          <div className="space-y-4">
            {openPositions.map((position) => (
              <div 
                key={position.title} 
                className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-colors cursor-pointer group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {position.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {position.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {position.type}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Apply <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Don't See a Fit */}
        <section className="mt-16 bg-primary/10 rounded-2xl p-8 border border-primary/20 text-center">
          <h3 className="text-2xl font-bold mb-4">Don't see a perfect fit?</h3>
          <p className="text-muted-foreground mb-6">
            We're always looking for talented individuals. Send us your resume and 
            we'll keep you in mind for future opportunities.
          </p>
          <Button>Send Your Resume</Button>
        </section>
      </div>
    </StaticPageLayout>
  );
};

export default Careers;

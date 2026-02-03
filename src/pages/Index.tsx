import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { Categories } from '@/components/Categories';
import { Features } from '@/components/Features';
import { Newsletter } from '@/components/Newsletter';
import { Footer } from '@/components/Footer';
import { PageTransition } from '@/components/PageTransition';

const Index = () => {
  return (
    <PageTransition className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <FeaturedProducts />
        <Categories />
        <Newsletter />
      </main>
      <Footer />
    </PageTransition>
  );
};

export default Index;

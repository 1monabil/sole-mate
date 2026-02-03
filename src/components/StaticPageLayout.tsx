import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PageTransition } from '@/components/PageTransition';

interface StaticPageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export const StaticPageLayout = ({ title, children }: StaticPageLayoutProps) => {
  return (
    <PageTransition className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-8">{title}</h1>
          {children}
        </div>
      </main>
      <Footer />
    </PageTransition>
  );
};

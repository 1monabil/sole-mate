import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import heroImage from '@/assets/hero-sneaker.jpg';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Premium sneakers"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 pt-24">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-primary font-semibold tracking-wider uppercase mb-4"
          >
            New Collection 2025
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="hero-text text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6"
          >
            Step Into
            <br />
            <span className="text-gradient-accent">Excellence</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-lg mb-8"
          >
            Premium footwear engineered for those who demand more. 
            Experience unmatched comfort, style, and performance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/products" className="btn-primary inline-flex items-center gap-2">
              Shop Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/products?filter=new" className="btn-secondary inline-flex items-center gap-2">
              View New Arrivals
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-12 mt-16"
          >
            <div>
              <p className="text-4xl font-bold text-gradient-accent">50K+</p>
              <p className="text-muted-foreground text-sm mt-1">Happy Customers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-gradient-accent">4.9</p>
              <p className="text-muted-foreground text-sm mt-1">Average Rating</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-gradient-accent">200+</p>
              <p className="text-muted-foreground text-sm mt-1">Styles Available</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-2 bg-primary rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

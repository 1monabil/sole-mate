import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const categories = [
  {
    name: 'Running',
    description: 'Built for speed and endurance',
    path: '/products?category=running',
    gradient: 'from-orange-600/20 to-red-600/20',
  },
  {
    name: 'Lifestyle',
    description: 'Style meets everyday comfort',
    path: '/products?category=lifestyle',
    gradient: 'from-blue-600/20 to-purple-600/20',
  },
  {
    name: 'Basketball',
    description: 'Dominate the court',
    path: '/products?category=basketball',
    gradient: 'from-red-600/20 to-pink-600/20',
  },
  {
    name: 'Trail',
    description: 'Conquer any terrain',
    path: '/products?category=trail',
    gradient: 'from-green-600/20 to-teal-600/20',
  },
];

export const Categories = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-primary font-semibold tracking-wider uppercase mb-2">
            Categories
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            Shop by Style
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={category.path}
                className={`block p-8 rounded-2xl bg-gradient-to-br ${category.gradient} border border-border hover:border-primary/50 transition-all duration-300 group`}
              >
                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-muted-foreground">{category.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

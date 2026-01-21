import shoe1 from '@/assets/products/shoe-1.jpg';
import shoe2 from '@/assets/products/shoe-2.jpg';
import shoe3 from '@/assets/products/shoe-3.jpg';
import shoe4 from '@/assets/products/shoe-4.jpg';
import shoe5 from '@/assets/products/shoe-5.jpg';
import shoe6 from '@/assets/products/shoe-6.jpg';
import { Product } from '@/store/useStore';

export const products: Product[] = [
  {
    id: '1',
    name: 'Shadow Runner Pro',
    brand: 'STRIDE',
    price: 189,
    image: shoe1,
    category: 'Running',
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ['Black', 'Gray'],
    isNew: true,
    rating: 4.8,
    reviews: 124,
    description: 'Experience unmatched comfort with our flagship running shoe. Featuring advanced cushioning technology and a breathable mesh upper for those long-distance runs.',
  },
  {
    id: '2',
    name: 'Classic White Elite',
    brand: 'STRIDE',
    price: 159,
    originalPrice: 199,
    image: shoe2,
    category: 'Lifestyle',
    sizes: [6, 7, 8, 9, 10, 11],
    colors: ['White'],
    isSale: true,
    rating: 4.9,
    reviews: 256,
    description: 'Timeless elegance meets modern comfort. The Classic White Elite is perfect for any occasion, from casual outings to dressed-up events.',
  },
  {
    id: '3',
    name: 'Court Dominator X',
    brand: 'STRIDE',
    price: 219,
    image: shoe3,
    category: 'Basketball',
    sizes: [8, 9, 10, 11, 12, 13],
    colors: ['Red', 'Black'],
    isNew: true,
    rating: 4.7,
    reviews: 89,
    description: 'Dominate the court with superior ankle support and explosive cushioning. Designed for athletes who demand the best performance.',
  },
  {
    id: '4',
    name: 'Heritage Retro',
    brand: 'STRIDE',
    price: 139,
    image: shoe4,
    category: 'Lifestyle',
    sizes: [7, 8, 9, 10, 11],
    colors: ['Beige', 'Brown'],
    rating: 4.6,
    reviews: 178,
    description: 'Vintage vibes with modern construction. The Heritage Retro brings classic style back with all-day comfort you can rely on.',
  },
  {
    id: '5',
    name: 'Trail Blazer GTX',
    brand: 'STRIDE',
    price: 249,
    image: shoe5,
    category: 'Trail',
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ['Neon Green', 'Black'],
    isNew: true,
    rating: 4.9,
    reviews: 67,
    description: 'Conquer any terrain with waterproof protection and aggressive grip. Built for the toughest trails and most demanding adventures.',
  },
  {
    id: '6',
    name: 'Velvet Touch Premium',
    brand: 'STRIDE',
    price: 179,
    originalPrice: 229,
    image: shoe6,
    category: 'Lifestyle',
    sizes: [6, 7, 8, 9, 10, 11],
    colors: ['Navy'],
    isSale: true,
    rating: 4.8,
    reviews: 145,
    description: 'Luxurious suede meets street-ready style. The Velvet Touch Premium offers sophisticated design with uncompromising comfort.',
  },
];

export const categories = ['All', 'Running', 'Lifestyle', 'Basketball', 'Trail'];
export const brands = ['STRIDE', 'Nike', 'Adidas', 'Puma'];
export const sizes = [6, 7, 8, 9, 10, 11, 12, 13];

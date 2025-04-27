export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'coffee' | 'tea' | 'snacks' | 'beverages';
  subcategory: string;
  origin?: string;
  roast?: 'light' | 'medium' | 'dark';
  flavor?: string[];
  caffeine?: 'low' | 'medium' | 'high';
  acidity?: 'low' | 'medium' | 'high';
  body?: 'light' | 'medium' | 'full';
  waitTime: number; // in minutes
  code: string;
}

export const products: Product[] = [
  // Coffee Products
  {
    id: 1,
    name: 'Espresso',
    description: 'Pure code in a cup. Like a well-optimized algorithm, it delivers maximum impact in minimal time.',
    price: 100,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'coffee',
    subcategory: 'classic',
    origin: 'Italy',
    roast: 'dark',
    flavor: ['bold', 'intense', 'caramel'],
    caffeine: 'high',
    acidity: 'medium',
    body: 'full',
    waitTime: 3,
    code: 'console.log("Hello, World!")'
  },
  // ... (previous coffee products)

  // Tea Products
  {
    id: 13,
    name: 'Masala Chai',
    description: 'Spiced Indian tea with a perfect blend of spices.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'tea',
    subcategory: 'spiced',
    flavor: ['spicy', 'sweet', 'aromatic'],
    caffeine: 'medium',
    waitTime: 5,
    code: 'const chai = new Tea({ spices: ["cardamom", "ginger", "cinnamon"] })'
  },
  {
    id: 14,
    name: 'Earl Grey',
    description: 'Classic black tea with bergamot oil.',
    price: 110,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'tea',
    subcategory: 'black',
    flavor: ['citrus', 'floral', 'smooth'],
    caffeine: 'medium',
    waitTime: 4,
    code: 'class EarlGrey extends Tea { constructor() { super({ flavor: "bergamot" }) } }'
  },
  {
    id: 15,
    name: 'Green Tea',
    description: 'Fresh and healthy Japanese green tea.',
    price: 100,
    image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'tea',
    subcategory: 'green',
    flavor: ['fresh', 'grassy', 'sweet'],
    caffeine: 'low',
    waitTime: 4,
    code: 'const greenTea = new Tea({ type: "green", origin: "Japan" })'
  },

  // Snacks
  {
    id: 16,
    name: 'Mandazi',
    description: 'Traditional Kenyan sweet bread.',
    price: 50,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'snacks',
    subcategory: 'pastries',
    waitTime: 2,
    code: 'const mandazi = new Snack({ type: "pastry", origin: "Kenya" })'
  },
  {
    id: 17,
    name: 'Toast',
    description: 'Crispy buttered toast with your choice of spread.',
    price: 80,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'snacks',
    subcategory: 'toast',
    waitTime: 3,
    code: 'class Toast extends Snack { constructor() { super({ type: "toast" }) } }'
  },
  {
    id: 18,
    name: 'Biscuits',
    description: 'Assorted cookies and biscuits.',
    price: 60,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'snacks',
    subcategory: 'cookies',
    waitTime: 1,
    code: 'const biscuits = new Snack({ type: "cookies", quantity: 6 })'
  },

  // Beverages
  {
    id: 19,
    name: 'Coca-Cola',
    description: 'Classic carbonated soft drink.',
    price: 70,
    image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'beverages',
    subcategory: 'soda',
    waitTime: 1,
    code: 'const cola = new Beverage({ type: "soda", brand: "Coca-Cola" })'
  },
  {
    id: 20,
    name: 'Fresh Juice',
    description: 'Seasonal fresh fruit juice.',
    price: 150,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'beverages',
    subcategory: 'juice',
    waitTime: 5,
    code: 'class FreshJuice extends Beverage { constructor() { super({ type: "juice", fresh: true }) } }'
  },
  {
    id: 21,
    name: 'Mineral Water',
    description: 'Pure mineral water.',
    price: 40,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'beverages',
    subcategory: 'water',
    waitTime: 1,
    code: 'const water = new Beverage({ type: "water", mineral: true })'
  }
]; 
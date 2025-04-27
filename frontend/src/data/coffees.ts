export interface Coffee {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'classic' | 'kenyan' | 'specialty' | 'international';
  code: string;
  origin: string;
  roast: 'light' | 'medium' | 'dark';
  flavor: string[];
  caffeine: 'low' | 'medium' | 'high';
  acidity: 'low' | 'medium' | 'high';
  body: 'light' | 'medium' | 'full';
}

export const coffees: Coffee[] = [
  {
    id: 1,
    name: 'Espresso',
    description: 'Pure code in a cup. Like a well-optimized algorithm, it delivers maximum impact in minimal time.',
    price: 100,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'classic',
    code: 'console.log("Hello, World!")',
    origin: 'Italy',
    roast: 'dark',
    flavor: ['bold', 'intense', 'caramel'],
    caffeine: 'high',
    acidity: 'medium',
    body: 'full'
  },
  {
    id: 2,
    name: 'Cappuccino',
    description: 'The perfect balance of coffee, milk, and foam. Like a well-structured React component.',
    price: 150,
    image: 'https://images.unsplash.com/photo-1534687941688-651ccf1e2bfd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'classic',
    code: 'const Cappuccino = () => { return <Coffee /> }',
    origin: 'Italy',
    roast: 'medium',
    flavor: ['creamy', 'sweet', 'balanced'],
    caffeine: 'medium',
    acidity: 'low',
    body: 'medium'
  },
  {
    id: 3,
    name: 'Latte',
    description: 'Smooth and creamy, like a well-tested API endpoint.',
    price: 200,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'classic',
    code: 'async function serveLatte() { return await coffee.pour() }',
    origin: 'Italy',
    roast: 'medium',
    flavor: ['smooth', 'creamy', 'mild'],
    caffeine: 'medium',
    acidity: 'low',
    body: 'light'
  },
  {
    id: 4,
    name: 'Macchiato',
    description: 'A shot of espresso marked with a touch of milk. Like a well-placed comment in your code.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'classic',
    code: '// A touch of milk',
    origin: 'Italy',
    roast: 'dark',
    flavor: ['bold', 'sweet', 'creamy'],
    caffeine: 'high',
    acidity: 'medium',
    body: 'medium'
  },
  {
    id: 5,
    name: 'Mocha',
    description: 'Coffee meets chocolate. Like TypeScript meets JavaScript.',
    price: 180,
    image: 'https://images.unsplash.com/photo-1578374175658-18e9c0c82fb2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'classic',
    code: 'type Mocha = Coffee & Chocolate',
    origin: 'Italy',
    roast: 'medium',
    flavor: ['chocolate', 'sweet', 'rich'],
    caffeine: 'medium',
    acidity: 'low',
    body: 'medium'
  },
  {
    id: 6,
    name: 'Nyeri Kahawa',
    description: 'From the slopes of Mount Kenya. Like a well-optimized database query.',
    price: 250,
    image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'kenyan',
    code: 'SELECT * FROM coffee WHERE region = "Nyeri"',
    origin: 'Nyeri, Kenya',
    roast: 'medium',
    flavor: ['fruity', 'winey', 'bright'],
    caffeine: 'high',
    acidity: 'high',
    body: 'medium'
  },
  {
    id: 7,
    name: 'Kiambu Coffee',
    description: 'Rich and full-bodied. Like a well-structured backend architecture.',
    price: 220,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'kenyan',
    code: 'class KiambuCoffee extends Coffee { constructor() { super() } }',
    origin: 'Kiambu, Kenya',
    roast: 'medium-dark',
    flavor: ['nutty', 'chocolate', 'balanced'],
    caffeine: 'high',
    acidity: 'medium',
    body: 'full'
  },
  {
    id: 8,
    name: 'Meru Coffee',
    description: 'Bright and citrusy. Like a well-debugged application.',
    price: 230,
    image: 'https://images.unsplash.com/photo-1497930621406-5a1abaeb6faa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'kenyan',
    code: 'try { brewCoffee() } catch (error) { console.error(error) }',
    origin: 'Meru, Kenya',
    roast: 'light',
    flavor: ['citrus', 'floral', 'bright'],
    caffeine: 'high',
    acidity: 'high',
    body: 'light'
  },
  {
    id: 9,
    name: 'Kisii Coffee',
    description: 'Smooth and balanced. Like a well-tested CI/CD pipeline.',
    price: 240,
    image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'kenyan',
    code: 'git commit -m "Brew perfect coffee"',
    origin: 'Kisii, Kenya',
    roast: 'medium',
    flavor: ['sweet', 'balanced', 'clean'],
    caffeine: 'high',
    acidity: 'medium',
    body: 'medium'
  },
  {
    id: 10,
    name: 'Ethiopian Yirgacheffe',
    description: 'Floral and citrusy. Like a well-designed frontend architecture.',
    price: 260,
    image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'international',
    code: 'const Yirgacheffe = new Coffee({ origin: "Ethiopia" })',
    origin: 'Yirgacheffe, Ethiopia',
    roast: 'light',
    flavor: ['floral', 'citrus', 'tea-like'],
    caffeine: 'high',
    acidity: 'high',
    body: 'light'
  },
  {
    id: 11,
    name: 'Colombian Supremo',
    description: 'Rich and nutty. Like a well-optimized database.',
    price: 280,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'international',
    code: 'class ColombianCoffee extends Coffee { constructor() { super() } }',
    origin: 'Colombia',
    roast: 'medium',
    flavor: ['nutty', 'caramel', 'balanced'],
    caffeine: 'high',
    acidity: 'medium',
    body: 'medium'
  },
  {
    id: 12,
    name: 'Jamaican Blue Mountain',
    description: 'Smooth and mild. Like a well-tested API.',
    price: 350,
    image: 'https://images.unsplash.com/photo-1497930621406-5a1abaeb6faa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'international',
    code: 'async function brewBlueMountain() { return await coffee.pour() }',
    origin: 'Jamaica',
    roast: 'medium',
    flavor: ['smooth', 'mild', 'sweet'],
    caffeine: 'medium',
    acidity: 'low',
    body: 'medium'
  }
];

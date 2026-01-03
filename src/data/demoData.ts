import { Pet, Category, Order, User } from '@/types';

// Demo categories
export const demoCategories: Category[] = [
  {
    id: '1',
    name: 'Dogs',
    icon: '🐕',
    description: 'Loyal companions and best friends',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400'
  },
  {
    id: '2',
    name: 'Cats',
    icon: '🐱',
    description: 'Independent and adorable felines',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400'
  },
  {
    id: '3',
    name: 'Birds',
    icon: '🦜',
    description: 'Colorful and melodious companions',
    image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400'
  },
  {
    id: '4',
    name: 'Fish',
    icon: '🐠',
    description: 'Beautiful aquatic pets',
    image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=400'
  },
  {
    id: '5',
    name: 'Rabbits',
    icon: '🐰',
    description: 'Fluffy and gentle friends',
    image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400'
  },
  {
    id: '6',
    name: 'Hamsters',
    icon: '🐹',
    description: 'Tiny and active companions',
    image: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400'
  }
];

// Demo pets
export const demoPets: Pet[] = [
  {
    id: '1',
    name: 'Max',
    category: 'Dogs',
    breed: 'German Shepherd',
    price: 850,
    description: 'Intelligent and loyal German Shepherd puppy, great with families.',
    image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400',
    stock: 3,
    status: 'available',
    createdAt: new Date()
  },
  {
    id: '2',
    name: 'Bella',
    category: 'Dogs',
    breed: 'Golden Retriever',
    price: 750,
    description: 'Friendly and devoted Golden Retriever, perfect family companion.',
    image: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400',
    stock: 2,
    status: 'available',
    createdAt: new Date()
  },
  {
    id: '3',
    name: 'Luna',
    category: 'Cats',
    breed: 'Persian',
    price: 500,
    description: 'Elegant Persian cat with beautiful long fur.',
    image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400',
    stock: 4,
    status: 'available',
    createdAt: new Date()
  },
  {
    id: '4',
    name: 'Oliver',
    category: 'Cats',
    breed: 'British Shorthair',
    price: 450,
    description: 'Calm and affectionate British Shorthair.',
    image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400',
    stock: 0,
    status: 'out_of_stock',
    createdAt: new Date()
  },
  {
    id: '5',
    name: 'Rio',
    category: 'Birds',
    breed: 'Blue Macaw',
    price: 1200,
    description: 'Stunning Blue Macaw, very intelligent and talkative.',
    image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400',
    stock: 1,
    status: 'available',
    createdAt: new Date()
  },
  {
    id: '6',
    name: 'Tweety',
    category: 'Birds',
    breed: 'Canary',
    price: 80,
    description: 'Beautiful singing Canary with golden feathers.',
    image: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400',
    stock: 8,
    status: 'available',
    createdAt: new Date()
  },
  {
    id: '7',
    name: 'Nemo',
    category: 'Fish',
    breed: 'Clownfish',
    price: 35,
    description: 'Vibrant orange Clownfish, easy to care for.',
    image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400',
    stock: 15,
    status: 'available',
    createdAt: new Date()
  },
  {
    id: '8',
    name: 'Fluffy',
    category: 'Rabbits',
    breed: 'Holland Lop',
    price: 120,
    description: 'Adorable Holland Lop rabbit with floppy ears.',
    image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400',
    stock: 5,
    status: 'available',
    createdAt: new Date()
  }
];

// Demo users (for local storage simulation)
export const demoUsers: User[] = [
  {
    id: 'admin-1',
    email: '71762333054@cit.edu.in',
    name: 'Admin',
    isAdmin: true
  }
];

// Demo orders
export const demoOrders: Order[] = [];

// Storage keys
export const STORAGE_KEYS = {
  USER: 'petshop_user',
  USERS: 'petshop_users',
  PETS: 'petshop_pets',
  CATEGORIES: 'petshop_categories',
  CART: 'petshop_cart',
  ORDERS: 'petshop_orders'
};

// Initialize demo data in localStorage
export const initializeDemoData = () => {
  if (!localStorage.getItem(STORAGE_KEYS.PETS)) {
    localStorage.setItem(STORAGE_KEYS.PETS, JSON.stringify(demoPets));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(demoCategories));
  }
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(demoUsers));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(demoOrders));
  }
};

import { MenuItem, Review } from './types';

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  // Specialty Coffee
  {
    id: 'c1',
    name: 'The Daily Grind Signature Latte',
    description: 'Our house espresso with velvety steamed milk, infused with local organic honey and a light dusting of cinnamon.',
    price: 8.50,
    category: 'coffee',
    tags: ['Best Seller', 'Sweet', 'Warm'],
  },
  {
    id: 'c2',
    name: 'Mayan Mocha',
    description: 'Double shot of Belizean espresso, organic dark cocoa, steamed milk, and a delicate pinch of cinnamon and wild cayenne.',
    price: 9.00,
    category: 'coffee',
    tags: ['Spiced', 'Indulgent'],
  },
  {
    id: 'c3',
    name: 'Belizean Macchiato',
    description: 'Rich espresso poured gently over milk with a decadent house-made caramel drizzle.',
    price: 7.75,
    category: 'coffee',
    tags: ['Caramel'],
  },
  {
    id: 'c4',
    name: 'Flat White',
    description: 'Expertly extracted double ristretto with a smooth layer of microfoam milk.',
    price: 7.00,
    category: 'coffee',
    tags: ['Classic', 'Strong'],
  },

  // Iced & Cold Brews
  {
    id: 'i1',
    name: 'Cayo Cold Brew',
    description: '18-hour slow-steeped organic coffee beans, served over ice for a smooth, naturally sweet flavor.',
    price: 8.00,
    category: 'iced',
    tags: ['Refreshing', 'High Caffeine'],
  },
  {
    id: 'i2',
    name: 'Belizean Coconut Frappe',
    description: 'Blended espresso with creamy local coconut milk, ice, and raw cane sugar, topped with whipped cream.',
    price: 9.50,
    category: 'iced',
    tags: ['Blended', 'Tropical'],
  },
  {
    id: 'i3',
    name: 'Iced Matcha Green Tea Latte',
    description: 'Ceremonial grade matcha whisked with cold milk of your choice and served over ice.',
    price: 8.75,
    category: 'iced',
    tags: ['Antioxidant', 'Calming'],
  },

  // All-Day Breakfast
  {
    id: 'b1',
    name: 'Authentic Belizean Fry Jacks',
    description: 'Puffy, golden-brown fried dough (fry jacks) served hot with refried black beans, scrambled eggs, and Dutch cheese.',
    price: 12.00,
    category: 'breakfast',
    tags: ['Local Favorite', 'Hearty'],
  },
  {
    id: 'b2',
    name: 'Belgian Waffle Feast',
    description: 'Crisp, golden Belgian waffle topped with fresh tropical bananas, local berries, maple syrup, and a dollop of whipped butter.',
    price: 13.50,
    category: 'breakfast',
    tags: ['Sweet', 'Warm'],
  },
  {
    id: 'b3',
    name: 'Traditional Johnny Cakes',
    description: 'Two split baking-powder biscuits filled with savory ham, melted local cheese, and scrambled farm-fresh eggs.',
    price: 11.00,
    category: 'breakfast',
    tags: ['Classic', 'Filling'],
  },
  {
    id: 'b4',
    name: 'Santa Elena Morning Wrap',
    description: 'Warm flour tortilla stuffed with refried black beans, scrambled eggs, sliced avocado, cheese, and mild local salsa.',
    price: 12.50,
    category: 'breakfast',
    tags: ['Healthy', 'Spicy Option'],
  },

  // Fresh Pastries
  {
    id: 'p1',
    name: 'Homemade Cinnamon Roll',
    description: 'Soft, buttery dough rolled with rich brown sugar and cinnamon, glazed with vanilla cream cheese frosting.',
    price: 6.50,
    category: 'pastry',
    tags: ['Baked Daily', 'Decadent'],
  },
  {
    id: 'p2',
    name: 'Banana Nut Muffin',
    description: 'Moist muffin loaded with ripe Belizean bananas and roasted walnuts, baked fresh every morning.',
    price: 5.50,
    category: 'pastry',
    tags: ['Nutty', 'Soft'],
  },
  {
    id: 'p3',
    name: 'Buttery Almond Croissant',
    description: 'Flaky, multi-layered French croissant filled with sweet almond frangipane paste and topped with toasted almond slices.',
    price: 7.00,
    category: 'pastry',
    tags: ['Crispy'],
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Sarah Jenkins',
    rating: 5,
    comment: 'The absolute best coffee in Santa Elena! The Mayan Mocha is a spiritual experience—just the right hint of chili. We came here every single morning during our trip to Cayo. Also, the Fry Jacks are to die for!',
    date: 'July 2, 2026',
    location: 'Denver, CO (Traveler)',
  },
  {
    id: 'r2',
    author: 'Carlos Mai',
    rating: 5,
    comment: 'My favorite spot to work and have breakfast. Excellent high-speed internet, incredibly friendly staff, and the atmosphere is so calm. The Daily Grind Signature Latte has become my daily ritual.',
    date: 'June 28, 2026',
    location: 'San Ignacio, Cayo (Local)',
  },
  {
    id: 'r3',
    author: 'Emma & Lars',
    rating: 4,
    comment: 'Cozy vibes, beautiful plants, and great tunes. They have actual oat milk which is a huge plus! We loved sitting on the porch watching the town go by. Waffles were delicious and super fresh.',
    date: 'June 15, 2026',
    location: 'Copenhagen, Denmark (Nomads)',
  }
];

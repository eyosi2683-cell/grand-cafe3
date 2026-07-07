export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'coffee' | 'iced' | 'breakfast' | 'pastry' | 'local';
  tags?: string[];
  image?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number; // 1 to 5 coffee cups
  comment: string;
  date: string;
  location?: string;
}

export interface CustomDrink {
  size: 'small' | 'medium' | 'large';
  milk: 'none' | 'whole' | 'soy' | 'almond' | 'oat';
  espressoShots: number;
  flavor: 'none' | 'vanilla' | 'caramel' | 'hazelnut' | 'pumpkin';
  temperature: 'hot' | 'iced';
  sweetness: 'none' | 'half' | 'regular' | 'extra';
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  customization?: string;
}

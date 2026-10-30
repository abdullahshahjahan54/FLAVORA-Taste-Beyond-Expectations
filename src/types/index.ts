export type FoodCategory =
  | 'Pizza'
  | 'Gourmet Burgers'
  | 'Sandwiches'
  | 'Pasta'
  | 'BBQ & Grills'
  | 'Fried Chicken'
  | 'Fast Food'
  | 'Desserts'
  | 'Fresh Drinks';

export interface MenuItem {
  id: string;
  name: string;
  category: FoodCategory;
  description: string;
  price: number;
  image: string;
  isChefSpecial?: boolean;
  isPopular?: boolean;
  isSpicy?: boolean;
  isVegetarian?: boolean;
  preparationTime?: string;
  calories?: number;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  notes?: string;
}

export interface SpecialOffer {
  id: string;
  title: string;
  subtitle: string;
  discountTag: string;
  price: number;
  originalPrice: number;
  description: string;
  includedItems: string[];
  image: string;
  badge: string;
  isActive: boolean;
}

export type OrderStatus = 'Pending' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export interface CustomerOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  paymentMethod: 'cod' | 'card' | 'online';
  orderNotes?: string;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  favoriteDish: string;
  verifiedDiner: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Dishes' | 'Ambience' | 'Kitchen';
  image: string;
  caption: string;
}

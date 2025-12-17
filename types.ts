export enum Category {
  ELECTRONICS = 'إلكترونيات',
  HOME = 'منتجات منزلية',
  CARS = 'سيارات',
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  description: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  city: string;
  phone: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface PixelSettings {
  facebookPixelId: string;
  googleAnalyticsId: string;
  tiktokPixelId: string;
  customHeadScript: string;
}

export interface StoreSettings {
  storeName: string;
  domain: string;
  googleSheetWebhook: string;
}

export interface AppState {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  pixelSettings: PixelSettings;
  storeSettings: StoreSettings;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addOrder: (order: Order) => void;
  updateProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updatePixelSettings: (settings: PixelSettings) => void;
  updateStoreSettings: (settings: StoreSettings) => void;
}
import { Category, Product, PixelSettings, StoreSettings } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'هاتف ذكي برو ماكس',
    price: 8500,
    category: Category.ELECTRONICS,
    image: 'https://picsum.photos/400/400?random=1',
    description: 'أحدث هاتف ذكي بكاميرا عالية الدقة ومعالج قوي للألعاب والتطبيقات الثقيلة.',
    stock: 10,
  },
  {
    id: '2',
    name: 'مكنسة روبوت ذكية',
    price: 2200,
    category: Category.HOME,
    image: 'https://picsum.photos/400/400?random=2',
    description: 'مكنسة تنظف منزلك تلقائياً مع نظام ملاحة ليزر وتحكم عبر التطبيق.',
    stock: 25,
  },
  {
    id: '3',
    name: 'شاحن سيارة سريع',
    price: 150,
    category: Category.CARS,
    image: 'https://picsum.photos/400/400?random=3',
    description: 'شاحن سيارة مزدوج يدعم الشحن السريع لجميع الهواتف.',
    stock: 100,
  },
  {
    id: '4',
    name: 'سماعات بلوتوث عازلة للضوضاء',
    price: 450,
    category: Category.ELECTRONICS,
    image: 'https://picsum.photos/400/400?random=4',
    description: 'تجربة صوتية غامرة مع تقنية عزل الضوضاء النشط وبطارية تدوم طويلاً.',
    stock: 15,
  },
  {
    id: '5',
    name: 'طقم أواني طهي جرانيت',
    price: 1200,
    category: Category.HOME,
    image: 'https://picsum.photos/400/400?random=5',
    description: 'طقم متكامل مكون من 9 قطع غير قابل للالتصاق وصحي للطبخ.',
    stock: 8,
  }
];

export const MOROCCAN_CITIES = [
  'الدار البيضاء',
  'الرباط',
  'مراكش',
  'فاس',
  'طنجة',
  'أكادير',
  'مكناس',
  'وجدة',
  'القنيطرة',
  'تطوان',
  'العيون',
  'الداخلة'
];

export const INITIAL_PIXEL_SETTINGS: PixelSettings = {
  facebookPixelId: '',
  googleAnalyticsId: '',
  tiktokPixelId: '',
  customHeadScript: '',
};

export const INITIAL_STORE_SETTINGS: StoreSettings = {
  storeName: 'متجر المغرب',
  domain: 'myshop.ma',
  googleSheetWebhook: '',
};
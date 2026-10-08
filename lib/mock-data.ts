export type Category = 'الكل' | 'إلكترونيات' | 'ملابس' | 'منزل' | 'أثاث' | 'مكتبة';

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: Exclude<Category, 'الكل'>;
  seller: string;
  region: string;
  rating: number;
  image: string;
  stock: number;
  createdAt: string;
};

export type OrderStatus = 'قيد المراجعة' | 'مؤكد' | 'قيد التجهيز' | 'تم التسليم';

export type OrderItem = {
  id: number;
  productId: number;
  buyer: string;
  quantity: number;
  total: number;
  status: OrderStatus;
  paymentStatus: 'بانتظار الدفع' | 'تم الدفع' | 'مرفوض';
  transferRef: string;
  createdAt: string;
};

export const categories: Category[] = ['الكل', 'إلكترونيات', 'ملابس', 'منزل', 'أثاث', 'مكتبة'];

export const products: Product[] = [
  {
    id: 1,
    title: 'ساعة ذكية ذكية 46 ملم',
    description: 'مواصفات متقدمة مع قياس النشاط، GPS، مقاومة للماء ومتابعة اللياقة.',
    price: 2600,
    category: 'إلكترونيات',
    seller: 'متجر بلس',
    region: 'القاهرة',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80',
    stock: 8,
    createdAt: '2026-10-07'
  },
  {
    id: 2,
    title: 'حقيبة سفر أنيقة',
    description: 'حقيبة كبيرة مناسبة للرحلات، بتفاصيل عصرية وداخلية منظمة.',
    price: 980,
    category: 'ملابس',
    seller: 'دنيا ستايل',
    region: 'الإسكندرية',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80',
    stock: 12,
    createdAt: '2026-10-01'
  },
  {
    id: 3,
    title: 'طقم مائدة خشبية',
    description: 'طقم مائدة أنيق مع 4 كراسي، مناسب للمنازل العصرية.',
    price: 4200,
    category: 'أثاث',
    seller: 'أرابيا ديكور',
    region: 'الجيزة',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    stock: 3,
    createdAt: '2026-09-25'
  },
  {
    id: 4,
    title: 'مكينة قهوة عربية',
    description: 'مكينة قهوة احترافية مع نظام ثبات جيد وذوق قهوة متوازن.',
    price: 1450,
    category: 'منزل',
    seller: 'بيت الطهي',
    region: 'المنصورة',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
    stock: 15,
    createdAt: '2026-10-03'
  },
  {
    id: 5,
    title: 'مجموعة كتب تنمية بشرية',
    description: 'مجموعة مختارة من أفضل الكتب في التنمية الشخصية والإنتاجية.',
    price: 680,
    category: 'مكتبة',
    seller: 'مكتبة الرواد',
    region: 'اسوان',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80',
    stock: 20,
    createdAt: '2026-10-04'
  },
  {
    id: 6,
    title: 'مكبر صوت لاسلكي',
    description: 'صوت واضح، بطارية ممتدة، مناسب للمنزل والحديقة.',
    price: 1700,
    category: 'إلكترونيات',
    seller: 'صوتك',
    region: 'المنيا',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=80',
    stock: 9,
    createdAt: '2026-09-20'
  }
];

export const initialOrders: OrderItem[] = [
  {
    id: 101,
    productId: 1,
    buyer: 'أحمد محمد',
    quantity: 1,
    total: 2600,
    status: 'قيد المراجعة',
    paymentStatus: 'تم الدفع',
    transferRef: 'TR-24587',
    createdAt: '2026-10-08'
  },
  {
    id: 102,
    productId: 4,
    buyer: 'سارة علي',
    quantity: 1,
    total: 1450,
    status: 'مؤكد',
    paymentStatus: 'تم الدفع',
    transferRef: 'TR-24590',
    createdAt: '2026-10-07'
  }
];

export const formatPrice = (value: number) => `${value.toLocaleString('ar-EG')} جنيه`;

export const sanitizeText = (value: string) => value.trim().replace(/[<>]/g, '').slice(0, 150);

export const validateTransferReference = (value: string) => /^[A-Za-z0-9-]{4,30}$/.test(value.trim());

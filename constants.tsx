
import { VendorCategory, Vendor, Offer, Booking, Payment } from './types';

export const APP_NAME = "WedCircle";

export const SAMPLE_BOOKINGS: Booking[] = [
  {
    id: 'BK-001',
    userId: 'user-1',
    userName: 'Rahul & Aditi',
    vendorId: '1',
    vendorName: 'Saffron Spices Catering',
    date: 'Dec 12, 2026',
    status: 'confirmed',
    event: 'Wedding Reception',
    budget: '₹ 2.5L'
  },
  {
    id: 'BK-002',
    userId: 'user-1',
    userName: 'Rahul & Aditi',
    vendorId: '2',
    vendorName: 'Royal Frames Photography',
    date: 'Dec 10, 2026',
    status: 'pending',
    event: 'Sangeet Night',
    budget: '₹ 1.2L'
  }
];

export const SAMPLE_PAYMENTS: Payment[] = [
  {
    id: 'TXN-9901',
    userId: 'user-1',
    vendorId: '1',
    amount: 50000,
    date: 'Oct 15, 2025',
    status: 'successful',
    description: 'Booking Advance - Saffron Spices'
  },
  {
    id: 'TXN-9902',
    userId: 'user-1',
    vendorId: '2',
    amount: 25000,
    date: 'Nov 02, 2025',
    status: 'pending',
    description: 'Token Amount - Royal Frames'
  }
];

export const SAMPLE_OFFERS: Offer[] = [
  {
    id: 'off-1',
    vendorId: '1',
    vendorName: 'Saffron Spices Catering',
    category: VendorCategory.CATERING,
    type: 'percentage',
    title: 'Festive Feast Discount',
    description: 'Get 15% off on all bookings for the upcoming festive season.',
    originalPrice: 1200,
    discountedPrice: 1020,
    discountValue: '15% OFF',
    expiryDate: '2026-03-25T23:59:59',
    isPremiumExclusive: false
  },
  {
    id: 'off-2',
    vendorId: '2',
    vendorName: 'Royal Frames Photography',
    category: VendorCategory.PHOTOGRAPHY,
    type: 'flat',
    title: 'Early Bird Special',
    description: 'Book 6 months in advance and get a flat discount on your wedding film.',
    originalPrice: 150000,
    discountedPrice: 140000,
    discountValue: '₹10,000 OFF',
    expiryDate: '2026-04-10T23:59:59',
    isPremiumExclusive: true
  },
  {
    id: 'off-3',
    vendorId: '4',
    vendorName: 'The Grand Mahal',
    category: VendorCategory.VENUE,
    type: 'combo',
    title: 'Venue + Decor Combo',
    description: 'Book our venue and decor together to save 10% on the total package.',
    discountValue: '10% OFF',
    expiryDate: '2026-03-01T23:59:59',
    isPremiumExclusive: false
  }
];

export const SAMPLE_VENDORS: Vendor[] = [
  {
    id: '1',
    name: 'Saffron Spices Catering',
    category: VendorCategory.CATERING,
    rating: 4.8,
    reviews: 124,
    location: 'South Delhi',
    priceRange: '₹₹₹',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80',
    isVerified: true,
    thaliPrice: '₹1,200/Plate',
    activeOfferId: 'off-1'
  },
  {
    id: '2',
    name: 'Royal Frames Photography',
    category: VendorCategory.PHOTOGRAPHY,
    rating: 4.9,
    reviews: 89,
    location: 'Mumbai, Bandra',
    priceRange: '₹₹₹₹',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    isVerified: true,
    specialty: 'Cinematic Weddings',
    activeOfferId: 'off-2'
  },
  {
    id: '3',
    name: 'Glow by Jhanvi',
    category: VendorCategory.MAKEUP,
    rating: 4.7,
    reviews: 56,
    location: 'Bangalore, Indiranagar',
    priceRange: '₹₹',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80',
    isVerified: false,
    specialty: 'Bridal Airbrush'
  },
  {
    id: '4',
    name: 'The Grand Mahal',
    category: VendorCategory.VENUE,
    rating: 5.0,
    reviews: 210,
    location: 'Jaipur',
    priceRange: '₹₹₹₹₹',
    image: 'https://images.unsplash.com/photo-1542667593-47530661218d?w=800&q=80',
    isVerified: true,
    specialty: 'Palace Weddings',
    activeOfferId: 'off-3'
  }
];

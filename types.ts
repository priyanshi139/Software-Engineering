
export enum VendorCategory {
  CATERING = 'Caterers',
  PHOTOGRAPHY = 'Photographers',
  MAKEUP = 'Makeup Artists',
  VENUE = 'Venues',
  DECOR = 'Decorators',
  MEHENDI = 'Mehendi Artists',
  BRIDAL_WEAR = 'Bridal Wear',
  GROOM_WEAR = 'Groom Wear',
  INVITATIONS = 'Invitations',
  ENTERTAINMENT = 'Entertainment'
}

export type OfferType = 'flat' | 'percentage' | 'combo' | 'earlybird' | 'festive';

export interface Offer {
  id: string;
  vendorId: string;
  vendorName: string;
  category: VendorCategory;
  type: OfferType;
  title: string;
  description: string;
  originalPrice?: number;
  discountedPrice?: number;
  discountValue: string; // e.g. "₹5000 OFF" or "15% OFF"
  expiryDate: string;
  isPremiumExclusive: boolean;
}

export interface Vendor {
  id: string;
  name: string;
  category: VendorCategory;
  rating: number;
  reviews: number;
  location: string;
  priceRange: string;
  image: string;
  isVerified: boolean; // Bharosa Badge
  specialty?: string;
  thaliPrice?: string; // Specific for Catering
  activeOfferId?: string;
}

export interface BudgetCategory {
  name: string;
  allocated: number; // in Lakhs
  spent: number; // in Lakhs
}

export interface UserWeddingProfile {
  partnerName: string;
  weddingDate: string;
  location: string;
  totalBudget: number; // in Lakhs
}

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  vendorId: string;
  vendorName: string;
  date: string;
  status: 'pending' | 'confirmed' | 'declined';
  event: string;
  budget: string;
}

export interface Payment {
  id: string;
  userId: string;
  vendorId: string;
  amount: number;
  date: string;
  status: 'pending' | 'successful' | 'failed';
  description: string;
}

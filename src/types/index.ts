export type Language = 'en' | 'ar';

export type CategoryId = 
  | 'low_fat' 
  | 'seafood' 
  | 'fast_food' 
  | 'savory' 
  | 'desserts' 
  | 'beverages';

export interface MacroNutrients {
  calories: number;
  protein: number; // in grams
  carbs: number;   // in grams
  fat: number;     // in grams
  fiber?: number;  // in grams
}

export interface MenuItem {
  id: string;
  categoryId: CategoryId;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  priceDZD: number;
  standardPortion?: string; // e.g. "150g Protein + 200g Main"
  macros: MacroNutrients;
  image: string;
  isAvailable: boolean;
  isPopular?: boolean;
  tags: string[];
}

export interface ProteinOption {
  id: string;
  nameEn: string;
  nameAr: string;
  portion: string; // "150g"
  macros: MacroNutrients;
  priceDZD: number;
  description: string;
}

export interface CarbsOption {
  id: string;
  nameEn: string;
  nameAr: string;
  portion: string; // "200g"
  macros: MacroNutrients;
  priceDZD: number;
  description: string;
}

export interface AddonOption {
  id: string;
  nameEn: string;
  nameAr: string;
  category: 'snack' | 'sweet' | 'drink';
  macros: MacroNutrients;
  priceDZD: number;
  description: string;
}

export interface CustomBowl {
  id: string;
  protein: ProteinOption;
  carbs: CarbsOption;
  addons: AddonOption[];
  notes?: string;
  totalMacros: MacroNutrients;
  totalPriceDZD: number;
  quantity: number;
}

export interface CartItem {
  id: string;
  type: 'menu_item' | 'custom_bowl';
  menuItem?: MenuItem;
  customBowl?: CustomBowl;
  quantity: number;
  unitPriceDZD: number;
  totalPriceDZD: number;
  totalMacros: MacroNutrients;
}

export type SubscriptionPlanType = 'athlete_weekly' | 'athlete_monthly' | 'corporate_weekly' | 'corporate_monthly';

export interface SubscriptionConfig {
  planType: SubscriptionPlanType;
  titleEn: string;
  titleAr: string;
  targetAudience: 'gym' | 'corporate';
  mealsPerWeek: number;
  durationWeeks: number;
  priceDZD: number;
  discountPercentage: number;
  deliverySlots: string[];
  preferredSlot: string;
  proteinTarget: string;
  customerName: string;
  customerPhone: string;
  deliveryCommune: string;
  workplaceOrGym: string;
  notes: string;
}

export interface OrderSubmission {
  id: string;
  customerName: string;
  customerPhone: string;
  deliveryCommune: string;
  deliveryAddress: string;
  deliverySlotTime: string;
  items: CartItem[];
  orderType: 'direct_meal' | 'subscription';
  subscriptionDetails?: SubscriptionConfig;
  totalAmountDZD: number;
  paymentMethod: 'cash_on_delivery' | 'baridimob';
  totalMacros: MacroNutrients;
  status: 'pending' | 'preparing' | 'on_delivery' | 'delivered';
  createdAt: string;
}

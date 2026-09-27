export const FIGMA_DESIGN_SYSTEM = {
  brandName: 'Healthy Brunchy -Sol+',
  location: 'Mila, Algeria — Directly opposite DNC Employment Agency (مقابل وكالة التشغيل DNC)',
  primaryContact: '+213558327813 (WhatsApp)',
  storeAddress: 'Hai DNC - Opposite DNC Employment Agency, Mila Centre (حي DNC - مقابل وكالة التشغيل، ميلة)',
  coreProposition: 'Precision nutrition: 150g pure protein + 200g base main dish',
  colorTokens: [
    {
      role: 'Primary Dark Green (Health / Nature / Algeria)',
      hex: '#2D5A27',
      rgb: '45, 90, 39',
      usage: 'Navbar headers, primary CTA buttons, high-protein badges, active category indicators'
    },
    {
      role: 'Sun Yellow / Sol+ Accent (Energy / Solar / Vitality)',
      hex: '#FDB813',
      rgb: '253, 184, 19',
      usage: 'Sol+ badge highlights, macro calorie badges, discount pills, rating stars, active step rings'
    },
    {
      role: 'Deep Pine Forest (Contrast Surface)',
      hex: '#183813',
      rgb: '24, 56, 19',
      usage: 'Hero card backgrounds, footer, high-contrast modal headers'
    },
    {
      role: 'Solar Amber / Flame',
      hex: '#F59E0B',
      rgb: '245, 158, 11',
      usage: 'Carbs macro indicator, quick alert callouts, workout timer icon'
    },
    {
      role: 'Warm Cream / Organic Base',
      hex: '#FAF7F2',
      rgb: '250, 247, 242',
      usage: 'Primary body background, card subtle fills, soft elevation contrast'
    },
    {
      role: 'Organic Wood Chestnut',
      hex: '#3D2E1E',
      rgb: '61, 46, 30',
      usage: 'Warm subtle borders, artisan badge frames, wood texture overlays'
    },
    {
      role: 'Text Slate Dark',
      hex: '#1E293B',
      rgb: '30, 41, 59',
      usage: 'Primary body text, high legibility nutrition figures'
    }
  ],
  typography: {
    primaryLatin: 'Plus Jakarta Sans (Display & Numbers) / Inter (Body)',
    primaryArabic: 'Cairo (Heading & Body, optimized for Algerian French-Arabic bilingual clarity)',
    scale: [
      { name: 'Display 1', size: '48px / 3rem', weight: '800 ExtraBold', usage: 'Hero headlines, large macro total numbers' },
      { name: 'Heading 1', size: '32px / 2rem', weight: '700 Bold', usage: 'Section titles (Bowl Builder, Digital Menu, Subscriptions)' },
      { name: 'Heading 2', size: '24px / 1.5rem', weight: '700 Bold', usage: 'Dish card titles, step modal headers' },
      { name: 'Heading 3', size: '18px / 1.125rem', weight: '600 SemiBold', usage: 'Ingredient group headers, macro metrics' },
      { name: 'Body Large', size: '16px / 1rem', weight: '400 Regular & 500 Medium', usage: 'Descriptions, meal summaries' },
      { name: 'Caption / Badge', size: '13px / 0.8125rem', weight: '700 Bold', usage: '150g Protein badge, calories counter, DZD price' }
    ]
  },
  layoutGuidelines: {
    desktopGrid: '12 columns, 72px width, 24px gutter, 80px margin (Max container: 1280px)',
    tabletGrid: '8 columns, fluid width, 16px gutter, 32px margin',
    mobileGrid: '4 columns, fluid width, 12px gutter, 16px margin',
    spacingUnit: '8pt design system (4px, 8px, 16px, 24px, 32px, 48px, 64px)',
    cornerRadii: 'Cards: 16px (1rem), Buttons: 12px, Badges/Pills: 9999px (full pill), Modal: 24px',
    elevationShadows: {
      card: '0 4px 20px -2px rgba(45, 90, 39, 0.08)',
      cardHover: '0 12px 28px -4px rgba(45, 90, 39, 0.16)',
      floatingCart: '0 10px 30px rgba(0, 0, 0, 0.15)'
    }
  },
  componentSpecs: [
    {
      name: 'Interactive Bowl Visualizer (Canvas/SVG)',
      description: 'Dual concentric ring showing 150g pure protein (inner emerald segment) + 200g carbs base (outer amber segment). Dynamic dish illustration layered in real-time.',
      states: 'Empty -> Protein Selected -> Carbs Selected -> Add-ons Active'
    },
    {
      name: 'Macro Gauge Meter',
      description: '4 mini ring cards showing Calories, Protein (g), Carbs (g), and Fat (g) with progress percentage towards target athlete intake.',
      props: 'calories: number, protein: number, carbs: number, fat: number, targetProfile: "athlete" | "corporate"'
    },
    {
      name: 'WhatsApp Quick-Order Button',
      description: 'Instant green WhatsApp CTA that generates pre-encoded message containing order items, macros breakdown, delivery commune in Mila, and payment method.',
      states: 'Normal, Hover, Loading, Order Sent confirmation'
    },
    {
      name: 'Subscription Slot Matrix',
      description: 'Time-slot chips: Gym Pre-Workout (16:30), Gym Post-Workout (19:00), Corporate Lunch Slot (12:00-13:00) with Mila address selector.',
      states: 'Selected, Default, Disabled (if cut-off passed)'
    }
  ]
};

export const POSTGRES_DDL = `-- ========================================================
-- HEALTHY BRUNCHY -SOL+ (MILA, ALGERIA)
-- PRODUCTION POSTGRESQL RELATIONAL DATABASE SCHEMA (DDL)
-- ========================================================

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Custom Enums
CREATE TYPE user_role_enum AS ENUM ('customer', 'athlete', 'corporate', 'staff', 'admin');
CREATE TYPE order_status_enum AS ENUM ('pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled');
CREATE TYPE payment_method_enum AS ENUM ('cash_on_delivery', 'baridimob', 'ccp');
CREATE TYPE payment_status_enum AS ENUM ('unpaid', 'paid', 'refunded');
CREATE TYPE subscription_type_enum AS ENUM ('athlete_weekly', 'athlete_monthly', 'corporate_weekly', 'corporate_monthly');
CREATE TYPE delivery_slot_enum AS ENUM ('gym_pre_1630', 'gym_post_1900', 'office_lunch_1200', 'office_lunch_1300');
CREATE TYPE menu_category_enum AS ENUM ('low_fat', 'seafood', 'fast_food', 'savory', 'desserts', 'beverages');

-- 1. Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    phone_number VARCHAR(25) NOT NULL UNIQUE,
    email VARCHAR(255) UNIQUE,
    password_hash VARCHAR(255),
    role user_role_enum DEFAULT 'customer',
    workplace_or_gym VARCHAR(150),
    preferred_language VARCHAR(5) DEFAULT 'ar',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Delivery Addresses Table (Mila Communes)
CREATE TABLE addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    commune_name VARCHAR(100) NOT NULL, -- e.g. 'Mila Centre', 'Grarem Gouga', 'Chelghoum Laïd'
    neighborhood_street TEXT NOT NULL,
    building_floor TEXT,
    landmark_notes TEXT,
    is_default BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Categories Table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_code menu_category_enum NOT NULL UNIQUE,
    name_en VARCHAR(100) NOT NULL,
    name_ar VARCHAR(100) NOT NULL,
    description_en TEXT,
    description_ar TEXT,
    icon_name VARCHAR(50),
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Menu Items Table (Standard 150g Protein + 200g Dish Standard)
CREATE TABLE menu_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    name_en VARCHAR(150) NOT NULL,
    name_ar VARCHAR(150) NOT NULL,
    description_en TEXT,
    description_ar TEXT,
    price_dzd NUMERIC(10, 2) NOT NULL CHECK (price_dzd >= 0),
    standard_portion VARCHAR(100) DEFAULT '150g Protein + 200g Main Dish',
    
    -- Nutritional Specs (Macros)
    calories INT NOT NULL CHECK (calories >= 0),
    protein_g NUMERIC(6, 1) NOT NULL CHECK (protein_g >= 0),
    carbs_g NUMERIC(6, 1) NOT NULL CHECK (carbs_g >= 0),
    fat_g NUMERIC(6, 1) NOT NULL CHECK (fat_g >= 0),
    fiber_g NUMERIC(6, 1) DEFAULT 0,
    
    image_url TEXT,
    is_available BOOLEAN DEFAULT TRUE,
    is_popular BOOLEAN DEFAULT FALSE,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Bowl Builder Components (Proteins, Carbs, Addons)
CREATE TABLE bowl_components (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    component_type VARCHAR(20) NOT NULL CHECK (component_type IN ('protein', 'carbs', 'addon_snack', 'drink', 'dessert')),
    name_en VARCHAR(100) NOT NULL,
    name_ar VARCHAR(100) NOT NULL,
    portion_weight VARCHAR(50), -- '150g', '200g', etc.
    price_dzd NUMERIC(10, 2) NOT NULL DEFAULT 0,
    calories INT NOT NULL,
    protein_g NUMERIC(6, 1) NOT NULL,
    carbs_g NUMERIC(6, 1) NOT NULL,
    fat_g NUMERIC(6, 1) NOT NULL,
    fiber_g NUMERIC(6, 1) DEFAULT 0,
    is_in_stock BOOLEAN DEFAULT TRUE
);

-- 6. Custom Bowls Built by Customers
CREATE TABLE custom_bowls (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    protein_component_id UUID REFERENCES bowl_components(id),
    carbs_component_id UUID REFERENCES bowl_components(id),
    total_calories INT NOT NULL,
    total_protein_g NUMERIC(6, 1) NOT NULL,
    total_carbs_g NUMERIC(6, 1) NOT NULL,
    total_fat_g NUMERIC(6, 1) NOT NULL,
    calculated_price_dzd NUMERIC(10, 2) NOT NULL,
    special_instructions TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Custom Bowl Addons Junction Table
CREATE TABLE custom_bowl_addons (
    custom_bowl_id UUID REFERENCES custom_bowls(id) ON DELETE CASCADE,
    addon_component_id UUID REFERENCES bowl_components(id) ON DELETE RESTRICT,
    quantity INT DEFAULT 1,
    PRIMARY KEY (custom_bowl_id, addon_component_id)
);

-- 8. Subscriptions Table (Gym Athletes & Corporate Employees)
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    plan_type subscription_type_enum NOT NULL,
    delivery_slot delivery_slot_enum NOT NULL,
    workplace_or_gym VARCHAR(150),
    delivery_address_id UUID REFERENCES addresses(id),
    meals_per_week INT NOT NULL DEFAULT 5,
    duration_weeks INT NOT NULL DEFAULT 4,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_price_dzd NUMERIC(10, 2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    paused_dates DATE[] DEFAULT '{}',
    dietary_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Orders Table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number VARCHAR(30) UNIQUE NOT NULL, -- e.g. 'HB-MILA-2026-0042'
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    customer_name VARCHAR(150) NOT NULL,
    customer_phone VARCHAR(25) NOT NULL,
    delivery_commune VARCHAR(100) NOT NULL,
    delivery_address TEXT NOT NULL,
    delivery_slot VARCHAR(50),
    order_status order_status_enum DEFAULT 'pending',
    payment_method payment_method_enum DEFAULT 'cash_on_delivery',
    payment_status payment_status_enum DEFAULT 'unpaid',
    subtotal_dzd NUMERIC(10, 2) NOT NULL,
    delivery_fee_dzd NUMERIC(10, 2) NOT NULL DEFAULT 150,
    total_amount_dzd NUMERIC(10, 2) NOT NULL,
    total_protein_g NUMERIC(6, 1) DEFAULT 0,
    total_carbs_g NUMERIC(6, 1) DEFAULT 0,
    total_fat_g NUMERIC(6, 1) DEFAULT 0,
    total_calories INT DEFAULT 0,
    whatsapp_log TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Order Items Table
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    menu_item_id UUID REFERENCES menu_items(id) ON DELETE SET NULL,
    custom_bowl_id UUID REFERENCES custom_bowls(id) ON DELETE SET NULL,
    item_title VARCHAR(150) NOT NULL,
    quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
    unit_price_dzd NUMERIC(10, 2) NOT NULL,
    total_price_dzd NUMERIC(10, 2) NOT NULL,
    item_macros_snapshot JSONB NOT NULL
);

-- Indexes for Speed
CREATE INDEX idx_menu_items_category ON menu_items(category_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(order_status);
CREATE INDEX idx_subscriptions_user_active ON subscriptions(user_id, is_active);
CREATE INDEX idx_menu_items_available ON menu_items(is_available);

-- ========================================================
-- STORE PRIMARY LOCATION SEED & DEFAULT CONTACT SETTINGS
-- Location: Mila, Opposite DNC Employment Agency (مقابل وكالة التشغيل DNC)
-- WhatsApp: +213558327813
-- ========================================================
INSERT INTO addresses (id, commune_name, neighborhood_street, building_floor, landmark_notes, is_default)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    'Mila Centre',
    'Hai DNC (حي DNC)',
    'Ground Floor Kitchen (المطبخ المركزي)',
    'Directly opposite the DNC Employment Agency (مقابل وكالة التشغيل DNC)',
    TRUE
) ON CONFLICT DO NOTHING;

INSERT INTO users (id, full_name, phone_number, email, role, workplace_or_gym)
VALUES (
    '00000000-0000-0000-0000-000000000002',
    'Healthy Brunchy -Sol+ HQ (Mila)',
    '+213558327813',
    'contact@healthybrunchy-sol.dz',
    'admin',
    'Hai DNC Central Prep Hub'
) ON CONFLICT DO NOTHING;
`;

export const MONGO_SCHEMAS = `// ========================================================
// HEALTHY BRUNCHY -SOL+ (MILA, ALGERIA)
// PRODUCTION MONGOOSE SCHEMAS (MONGODB)
// ========================================================

import mongoose, { Schema, Document } from 'mongoose';

// 1. Shared Macros Sub-schema
const MacroNutrientsSchema = new Schema({
  calories: { type: Number, required: true, min: 0 },
  protein_g: { type: Number, required: true, min: 0 },
  carbs_g: { type: Number, required: true, min: 0 },
  fat_g: { type: Number, required: true, min: 0 },
  fiber_g: { type: Number, default: 0 }
}, { _id: false });

// 2. Menu Item Schema
export interface IMenuItem extends Document {
  category: 'low_fat' | 'seafood' | 'fast_food' | 'savory' | 'desserts' | 'beverages';
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  priceDZD: number;
  standardPortion: string; // '150g Protein + 200g Main Dish'
  macros: {
    calories: number;
    protein_g: number;
    carbs_g: number;
    fat_g: number;
    fiber_g: number;
  };
  imageUrl: string;
  isAvailable: boolean;
  isPopular: boolean;
  tags: string[];
}

export const MenuItemSchema = new Schema<IMenuItem>({
  category: { 
    type: String, 
    enum: ['low_fat', 'seafood', 'fast_food', 'savory', 'desserts', 'beverages'], 
    required: true,
    index: true 
  },
  nameEn: { type: String, required: true, trim: true },
  nameAr: { type: String, required: true, trim: true },
  descriptionEn: { type: String },
  descriptionAr: { type: String },
  priceDZD: { type: Number, required: true, min: 0 },
  standardPortion: { type: String, default: '150g Protein + 200g Main Dish' },
  macros: { type: MacroNutrientsSchema, required: true },
  imageUrl: { type: String, required: true },
  isAvailable: { type: Boolean, default: true, index: true },
  isPopular: { type: Boolean, default: false },
  tags: [{ type: String }]
}, { timestamps: true });

// 3. Custom Bowl (Macro Builder) Schema
export const CustomBowlSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  protein: {
    nameEn: { type: String, required: true },
    nameAr: { type: String, required: true },
    portion: { type: String, default: '150g' },
    macros: MacroNutrientsSchema,
    priceDZD: Number
  },
  carbs: {
    nameEn: { type: String, required: true },
    nameAr: { type: String, required: true },
    portion: { type: String, default: '200g' },
    macros: MacroNutrientsSchema,
    priceDZD: Number
  },
  addons: [{
    nameEn: String,
    nameAr: String,
    macros: MacroNutrientsSchema,
    priceDZD: Number
  }],
  totalMacros: { type: MacroNutrientsSchema, required: true },
  totalPriceDZD: { type: Number, required: true }
}, { timestamps: true });

// 4. Subscription Schema (Gym Athletes & Corporate Employees)
export const SubscriptionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  planType: { 
    type: String, 
    enum: ['athlete_weekly', 'athlete_monthly', 'corporate_weekly', 'corporate_monthly'], 
    required: true 
  },
  deliverySlot: { 
    type: String, 
    enum: ['gym_pre_1630', 'gym_post_1900', 'office_lunch_1200', 'office_lunch_1300'], 
    required: true 
  },
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  deliveryCommune: { type: String, required: true }, // Mila Centre, Grarem, Chelghoum Laid
  pickupLandmark: { type: String, default: 'مقابل وكالة التشغيل DNC' },
  storeOriginAddress: { type: String, default: 'Hai DNC - Opposite DNC Employment Agency, Mila' },
  workplaceOrGym: { type: String, required: true },
  durationWeeks: { type: Number, default: 4 },
  mealsPerWeek: { type: Number, default: 5 },
  priceDZD: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

// Store Constant Definitions
export const STORE_SETTINGS = {
  primaryPhone: '+213558327813',
  rawPhone: '0558327813',
  whatsappTarget: '213558327813',
  landmarkAr: 'مقابل وكالة التشغيل DNC',
  landmarkEn: 'Opposite DNC Employment Agency',
  commune: 'Mila Centre'
};

export const MenuItemModel = mongoose.model<IMenuItem>('MenuItem', MenuItemSchema);
export const CustomBowlModel = mongoose.model('CustomBowl', CustomBowlSchema);
export const SubscriptionModel = mongoose.model('Subscription', SubscriptionSchema);
`;

export const ARCHITECTURE_BOILERPLATES = {
  nextjs: `// ========================================================
// NEXT.JS 15 (APP ROUTER) CLEAN ARCHITECTURE BOILERPLATE
// Healthy Brunchy -Sol+ Digital Platform
// ========================================================

src/
├── app/
│   ├── [locale]/               # Bilingual i18n (en / ar)
│   │   ├── layout.tsx          # Root layout with Cairo & Plus Jakarta Sans
│   │   ├── page.tsx            # Hero + Bowl Builder + Menu Showcase
│   │   ├── menu/               # Categorized Digital Menu
│   │   │   └── page.tsx
│   │   ├── builder/            # Dedicated Interactive Bowl Builder
│   │   │   └── page.tsx
│   │   ├── subscriptions/      # Athlete & Corporate Subscription Engine
│   │   │   └── page.tsx
│   │   ├── checkout/           # Cart, Mila address selector, WhatsApp trigger
│   │   │   └── page.tsx
│   │   └── admin/              # Restaurant management portal (Protected)
│   │       └── page.tsx
│   └── api/
│       ├── menu/route.ts       # Menu items CRUD
│       ├── orders/route.ts     # Create order & trigger WhatsApp webhook
│       └── subscriptions/route.ts
├── components/
│   ├── ui/                     # Atoms: Button, Card, Badge, Slider, Dialog
│   ├── builder/                # BowlBuilderWizard, ProteinSelector, CarbSelector, MacroGauge
│   ├── menu/                   # MenuItemCard, CategoryFilter, MacroFilterPill
│   ├── subscriptions/          # PlanCard, SlotSelectorMatrix, GymSchedulePicker
│   └── shared/                 # Navbar, FloatingCartBar, MilaMapModal
├── core/
│   ├── domain/                 # Pure entities (Meal, MacroTarget, Subscription)
│   ├── use-cases/              # CalculateMacros, ValidatePortions, BuildWhatsAppPayload
│   └── repositories/           # IMenuRepository, IOrderRepository
├── hooks/
│   ├── useCart.ts              # Persistent Zustand tray state
│   ├── useMacroCalculator.ts   # Live calculation of 150g protein + 200g carbs
│   └── useLanguage.ts          # Arabic / English context
└── lib/
    ├── db.ts                   # Prisma / Drizzle Client
    ├── whatsapp.ts             # Encode WhatsApp URL with Algerian phone format
    └── utils.ts
`,

  expressNode: `// ========================================================
// NODE.JS EXPRESS + TYPESCRIPT CLEAN ARCHITECTURE
// Healthy Brunchy -Sol+ Backend API
// ========================================================

src/
├── domain/                     # Core Business Rules (Independent of Framework)
│   ├── entities/
│   │   ├── MenuItem.ts
│   │   ├── CustomBowl.ts       # Enforces 150g protein + 200g carb validation
│   │   ├── Subscription.ts
│   │   └── Order.ts
│   └── value-objects/
│       ├── MacroNutrients.ts
│       └── AlgerianPhone.ts
├── use-cases/                  # Application Business Rules
│   ├── menu/
│   │   ├── GetMenuByCategory.ts
│   │   └── UpdateItemAvailability.ts
│   ├── bowl/
│   │   └── AssembleCustomBowl.ts
│   ├── orders/
│   │   ├── PlaceOrder.ts
│   │   └── GenerateWhatsAppNotification.ts
│   └── subscriptions/
│       └── CreateAthleteSubscription.ts
├── interfaces/                 # Interface Adapters
│   ├── controllers/
│   │   ├── MenuController.ts
│   │   ├── OrderController.ts
│   │   └── SubscriptionController.ts
│   ├── repositories/
│   │   ├── IMenuRepository.ts
│   │   └── IOrderRepository.ts
│   └── dtos/
│       ├── CreateOrderDTO.ts
│       └── AssembleBowlDTO.ts
├── infrastructure/             # Frameworks & Drivers
│   ├── database/
│   │   ├── postgres/           # Drizzle or TypeORM implementation
│   │   └── migrations/
│   ├── webserver/
│   │   ├── server.ts
│   │   ├── routes/
│   │   │   ├── menu.routes.ts
│   │   │   ├── order.routes.ts
│   │   │   └── subscription.routes.ts
│   │   └── middlewares/
│   │       ├── auth.middleware.ts
│   │       └── validation.middleware.ts (Zod)
│   └── services/
│       └── WhatsAppService.ts
└── index.ts
`,

  fastapiPython: `# ========================================================
# PYTHON FASTAPI CLEAN ARCHITECTURE BOILERPLATE
# Healthy Brunchy -Sol+ Backend Service
# ========================================================

app/
├── core/
│   ├── config.py               # Pydantic Settings (.env, DATABASE_URL)
│   └── security.py             # JWT & Password hashing for Admin
├── domain/
│   ├── models/
│   │   ├── menu.py             # SQLAlchemy models for 6 menu categories
│   │   ├── subscription.py     # Athlete & Corporate subscriptions
│   │   └── order.py
│   └── schemas/
│       ├── macros.py           # MacroNutrients schema (Calories, Protein, Carbs, Fat)
│       ├── bowl_builder.py     # Request validation for 150g protein + 200g carbs
│       └── order_dto.py
├── repositories/
│   ├── base.py
│   ├── menu_repository.py      # Async SQLAlchemy queries
│   └── order_repository.py
├── services/
│   ├── macro_calculator.py     # Pure math for macronutrient totals
│   ├── order_service.py        # Business orchestration
│   └── whatsapp_formatter.py   # Mila delivery payload formatter
├── api/
│   ├── v1/
│   │   ├── endpoints/
│   │   │   ├── menu.py
│   │   │   ├── custom_bowl.py
│   │   │   ├── subscriptions.py
│   │   │   └── admin.py
│   │   └── api.py              # Root router
└── main.py                     # FastAPI ASGI app with CORS & lifespan
`,

  flutter: `// ========================================================
// FLUTTER (CROSS-PLATFORM MOBILE) FEATURE-FIRST ARCHITECTURE
// Healthy Brunchy -Sol+ (iOS & Android)
// ========================================================

lib/
├── core/
│   ├── constants/
│   │   ├── colors.dart         # #2D5A27 (Dark Green), #FDB813 (Sun Yellow)
│   │   └── dimensions.dart
│   ├── network/
│   │   └── api_client.dart
│   └── theme/
│       └── app_theme.dart      # Arabic (Cairo) and Latin font themes
├── features/
│   ├── bowl_builder/           # Interactive 150g + 200g Selector
│   │   ├── data/
│   │   ├── domain/models/bowl_selection.dart
│   │   └── presentation/
│   │       ├── bloc/bowl_builder_bloc.dart
│   │       └── widgets/interactive_dish_plate.dart
│   ├── digital_menu/           # 6 Categorized Menu Tabs
│   │   ├── data/models/menu_item_model.dart
│   │   └── presentation/pages/menu_page.dart
│   ├── subscriptions/          # Gym & Corporate Meal Plans
│   │   └── presentation/pages/subscription_wizard.dart
│   └── checkout/               # Mila Communes & WhatsApp Integration
│       └── presentation/pages/whatsapp_checkout_page.dart
└── main.dart
`
};

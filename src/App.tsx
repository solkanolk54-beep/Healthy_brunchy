import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BowlBuilder } from './components/BowlBuilder';
import { DigitalMenu } from './components/DigitalMenu';
import { SubscriptionsPage } from './components/SubscriptionsPage';
import { MilaLocationSection } from './components/MilaLocationSection';
import { AdminDashboard } from './components/AdminDashboard';
import { NutritionInsights } from './components/NutritionInsights';
import { CartCheckoutModal } from './components/CartCheckoutModal';
import { TechConsultantModal } from './components/TechConsultantModal';
import { MilaMapModal } from './components/shared/MilaMapModal';
import { Footer } from './components/Footer';

import { MenuItem, Language, CartItem, CustomBowl, SubscriptionConfig } from './types';
import { INITIAL_MENU_ITEMS } from './data/menuData';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [activeSection, setActiveSection] = useState<string>('home');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isTechModalOpen, setIsTechModalOpen] = useState<boolean>(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState<boolean>(false);

  // Seamless one-page smooth scroll navigation
  const onNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // IntersectionObserver to auto-update active section indicator on scroll
  React.useEffect(() => {
    const sectionIds = ['home', 'insights', 'builder', 'menu', 'subscriptions', 'location', 'admin'];

    const handleIntersection: IntersectionObserverCallback = (entries) => {
      // Find the entry with the highest intersection ratio
      const intersectingEntries = entries.filter(e => e.isIntersecting);
      if (intersectingEntries.length > 0) {
        // Choose the entry closest to top viewport
        const topEntry = intersectingEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (topEntry?.target?.id) {
          setActiveSection(topEntry.target.id);
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: [0, 0.2, 0.5]
    });

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Cart operations
  const handleAddToCart = (newItem: CartItem) => {
    setCartItems(prev => {
      // If it's a standard menu item, check if it exists in cart
      if (newItem.type === 'menu_item' && newItem.menuItem) {
        const existingIdx = prev.findIndex(
          i => i.type === 'menu_item' && i.menuItem?.id === newItem.menuItem?.id
        );
        if (existingIdx > -1) {
          const updated = [...prev];
          const curr = updated[existingIdx];
          const newQty = curr.quantity + newItem.quantity;
          updated[existingIdx] = {
            ...curr,
            quantity: newQty,
            totalPriceDZD: curr.unitPriceDZD * newQty
          };
          return updated;
        }
      }
      return [...prev, newItem];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => {
      return prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...item,
              quantity: newQty,
              totalPriceDZD: item.unitPriceDZD * newQty
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Direct WhatsApp from Bowl Builder
  const handleDirectWhatsAppBowl = (bowl: CustomBowl) => {
    const isAr = lang === 'ar';
    let msg = `🥗 *طلب وجبة مخصصة Sol+ (ميلة)* 🥗\n`;
    msg += `------------------------------------------\n`;
    msg += `📍 *نقطة الانطلاق والاستلام:* حي DNC - مقابل وكالة التشغيل DNC، ميلة\n`;
    msg += `🥩 *البروتين (150g):* ${bowl.protein.nameAr} (${bowl.protein.nameEn})\n`;
    msg += `🌾 *الكارب الأساسي (200g):* ${bowl.carbs.nameAr} (${bowl.carbs.nameEn})\n`;
    if (bowl.addons.length > 0) {
      msg += `✨ *الإضافات والمشروبات:* ${bowl.addons.map(a => a.nameAr).join(', ')}\n`;
    }
    if (bowl.notes) {
      msg += `📝 *ملاحظات خاصة:* ${bowl.notes}\n`;
    }
    msg += `------------------------------------------\n`;
    msg += `📊 *ماكروز الصحن:* ${bowl.totalMacros.protein}g بروتين | ${bowl.totalMacros.carbs}g كارب | ${bowl.totalMacros.calories} سعرة\n`;
    msg += `💵 *السعر الإجمالي (${bowl.quantity} وجبة):* ${(bowl.totalPriceDZD * bowl.quantity).toLocaleString()} دج\n`;
    msg += `📍 *الموقع:* ولاية ميلة\n`;
    msg += `------------------------------------------\n`;
    msg += `أرجو تأكيد الطلب وتحديد وقت التوصيل!`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/213558327813?text=${encoded}`, '_blank');
  };

  // Direct WhatsApp from Subscriptions
  const handleSubscribeWhatsApp = (config: SubscriptionConfig) => {
    let msg = `📋 *طلب اشتراك جديد: ${config.titleAr}* 📋\n`;
    msg += `------------------------------------------\n`;
    msg += `📍 *المقر ونقطة الانطلاق:* حي DNC - مقابل وكالة التشغيل DNC، ميلة\n`;
    msg += `👤 *الاسم:* ${config.customerName}\n`;
    msg += `📞 *الهاتف:* ${config.customerPhone}\n`;
    msg += `📍 *البلدية:* ${config.deliveryCommune}\n`;
    msg += `🏢 *المقر أو القاعة:* ${config.workplaceOrGym}\n`;
    msg += `⏰ *موعد التوصيل اليومي:* ${config.preferredSlot}\n`;
    msg += `📅 *المدة:* ${config.durationWeeks === 4 ? 'شهر كامل (4 أسابيع)' : 'أسبوع تجريبي'} - ${config.mealsPerWeek} أيام أسبوعياً\n`;
    msg += `🎯 *الهدف:* ${config.proteinTarget}\n`;
    if (config.notes) {
      msg += `📝 *ملاحظات:* ${config.notes}\n`;
    }
    msg += `------------------------------------------\n`;
    msg += `💵 *المبلغ الإجمالي للاشتراك:* ${config.priceDZD.toLocaleString()} دج (يشمل خصم ${config.discountPercentage}%)\n`;
    msg += `------------------------------------------\n`;
    msg += `أرغب في تأكيد اشتراكي والبدء هذا الأسبوع!`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/213558327813?text=${encoded}`, '_blank');
  };

  // General WhatsApp Contact
  const handleGeneralContactWhatsApp = () => {
    const msg = `مرحباً Healthy Brunchy -Sol+ بميلة (حي DNC - مقابل وكالة التشغيل)، أود الاستفسار عن قائمة الوجبات الموزونة والتوصيل إلى منطقتي!`;
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/213558327813?text=${encoded}`, '_blank');
  };

  // Admin inventory update
  const handleUpdateMenuItem = (updatedItem: MenuItem) => {
    setMenuItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  return (
    <div 
      dir={lang === 'ar' ? 'rtl' : 'ltr'} 
      className={`min-h-screen flex flex-col bg-[#FAF7F2] text-slate-800 ${
        lang === 'ar' ? 'font-arabic' : 'font-sans'
      }`}
    >
      {/* Navigation Header */}
      <Navbar
        currentTab={activeSection}
        setCurrentTab={onNavigate}
        lang={lang}
        setLang={setLang}
        cartItems={cartItems}
        setIsCartOpen={setIsCartOpen}
        setIsTechModalOpen={setIsTechModalOpen}
        setIsMapModalOpen={setIsMapModalOpen}
      />

      {/* Main Content Area - Seamless One-Page Layout */}
      <main className="flex-1">
        {/* Section 1: Hero & Brand Introduction */}
        <div id="home">
          <HeroSection
            lang={lang}
            onLaunchBuilder={() => onNavigate('builder')}
            onExploreMenu={() => onNavigate('menu')}
            onViewSubscriptions={() => onNavigate('subscriptions')}
          />
        </div>

        {/* Section 2: AI Nutrition Insights (Gemini 3.8 Powered) */}
        <div id="insights" className="scroll-mt-20 bg-gradient-to-b from-[#FAF7F2] to-emerald-50/30 border-b border-slate-200">
          <NutritionInsights
            lang={lang}
            onNavigateToBuilder={() => onNavigate('builder')}
          />
        </div>

        {/* Section 3: Interactive Macro Bowl Builder (150g Protein + 200g Carbs) */}
        <div id="builder" className="scroll-mt-20 bg-slate-50/50 border-b border-slate-200">
          <BowlBuilder
            lang={lang}
            onAddToCart={handleAddToCart}
            onDirectWhatsApp={handleDirectWhatsAppBowl}
          />
        </div>

        {/* Section 4: Approved 6-Category Digital Menu */}
        <div id="menu" className="scroll-mt-20 bg-white border-b border-slate-200">
          <DigitalMenu
            menuItems={menuItems}
            lang={lang}
            onAddToCart={handleAddToCart}
          />
        </div>

        {/* Section 5: Athlete & Corporate Subscriptions Engine */}
        <div id="subscriptions" className="scroll-mt-20 bg-[#FAF7F2] border-b border-slate-200">
          <SubscriptionsPage
            lang={lang}
            onSubscribeWhatsApp={handleSubscribeWhatsApp}
          />
        </div>

        {/* Section 6: Mila Store Kitchen & Communes Delivery Matrix */}
        <div id="location" className="scroll-mt-20">
          <MilaLocationSection
            lang={lang}
            onContactWhatsApp={handleGeneralContactWhatsApp}
          />
        </div>

        {/* Section 7: Restaurant Admin Management Console */}
        <div id="admin" className="scroll-mt-20 bg-slate-50/80 border-t border-slate-200">
          <AdminDashboard
            menuItems={menuItems}
            onUpdateMenuItem={handleUpdateMenuItem}
            lang={lang}
          />
        </div>
      </main>

      {/* Floating Tray Summary Bar on Mobile / Desktop if items exist */}
      {cartItems.length > 0 && !isCartOpen && (
        <aside 
          aria-label={lang === 'ar' ? 'ملخص السلة السريع' : 'Quick Cart Summary'}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-40 bg-[#1A3317] text-white p-3.5 rounded-2xl shadow-2xl border-2 border-[#FDB813] flex items-center justify-between animate-fade-in"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FDB813] text-[#1A3317] flex items-center justify-center font-black text-sm">
              {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
            </div>
            <div>
              <div className="text-xs font-bold text-white">
                {lang === 'ar' ? 'سلة الطلب' : 'Your Order Tray'}
              </div>
              <div className="text-[11px] text-emerald-300">
                {cartItems.reduce((acc, i) => acc + (i.totalMacros.protein * i.quantity), 0)}g Prot • {cartItems.reduce((acc, i) => acc + i.totalPriceDZD, 0).toLocaleString()} DZD
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-[#FDB813] hover:bg-amber-400 text-[#1A3317] font-black text-xs transition-all shadow-md"
          >
            {lang === 'ar' ? 'عرض السلة والتوصيل ←' : 'Checkout →'}
          </button>
        </aside>
      )}

      {/* Cart & Checkout Modal */}
      <CartCheckoutModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        lang={lang}
      />

      {/* Technical Consultant & Architecture Hub Modal */}
      <TechConsultantModal
        isOpen={isTechModalOpen}
        onClose={() => setIsTechModalOpen(false)}
        lang={lang}
      />

      {/* Mila Store Location & Map Details Modal */}
      <MilaMapModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        lang={lang}
      />

      {/* Brand Footer */}
      <Footer
        lang={lang}
        onNavigate={onNavigate}
        onOpenTech={() => setIsTechModalOpen(true)}
      />
    </div>
  );
}

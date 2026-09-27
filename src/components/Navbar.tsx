import React from 'react';
import { 
  Flame, 
  UtensilsCrossed, 
  Dumbbell, 
  Calendar, 
  ShoppingBag, 
  MapPin, 
  Code2, 
  SlidersHorizontal,
  Globe,
  Sun,
  Sparkles
} from 'lucide-react';
import { Language, CartItem } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  cartItems: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  setIsTechModalOpen: (open: boolean) => void;
  setIsMapModalOpen?: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  lang,
  setLang,
  cartItems,
  setIsCartOpen,
  setIsTechModalOpen,
  setIsMapModalOpen
}) => {
  const isAr = lang === 'ar';
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartProtein = cartItems.reduce((acc, item) => acc + (item.totalMacros.protein * item.quantity), 0);

  return (
    <header className="sticky top-0 z-40 bg-[#1A3317]/95 backdrop-blur-md text-white border-b border-[#2D5A27]/60 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Sol+ Emblem */}
          <div 
            onClick={() => setCurrentTab('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-[#FDB813] to-[#F59E0B] p-0.5 shadow-md group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full bg-[#1A3317] rounded-[14px] flex items-center justify-center relative overflow-hidden">
                <Sun className="w-6 h-6 text-[#FDB813] animate-pulse" />
                <span className="absolute -bottom-1 text-[9px] font-black text-[#FDB813] tracking-tighter">Sol+</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white font-sans">
                  Healthy Brunchy
                </span>
                <span className="bg-[#FDB813] text-[#1A3317] text-xs font-black px-1.5 py-0.5 rounded-md shadow-xs">
                  -Sol+
                </span>
              </div>
              <p 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMapModalOpen?.(true);
                }}
                className="text-[11px] text-emerald-200/90 hover:text-[#FDB813] transition-colors flex items-center gap-1 cursor-pointer"
                title={isAr ? 'اضغط لعرض تفاصيل الموقع وخريطة ميلة' : 'Click to view Mila HQ address and map'}
              >
                <MapPin className="w-3 h-3 text-[#FDB813] shrink-0" />
                <span>{isAr ? 'ميلة (مقابل وكالة التشغيل DNC) • 150غ بروتين' : 'Mila (Opp. DNC Agency) • 150g Protein'}</span>
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
            <button
              onClick={() => setCurrentTab('home')}
              className={`px-3 py-2 rounded-xl transition-all ${
                currentTab === 'home' 
                  ? 'bg-[#2D5A27] text-white shadow-inner font-semibold' 
                  : 'text-slate-200 hover:text-white hover:bg-white/5'
              }`}
            >
              {isAr ? 'الرئيسية' : 'Home'}
            </button>
            <button
              onClick={() => setCurrentTab('builder')}
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                currentTab === 'builder' 
                  ? 'bg-[#FDB813] text-[#1A3317] font-bold shadow-md' 
                  : 'text-amber-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Flame className="w-4 h-4 text-[#FDB813] group-hover:animate-bounce" />
              {isAr ? 'ركب وجبتك (حاسبة الماكروز)' : 'Build Bowl (150g+200g)'}
            </button>
            <button
              onClick={() => setCurrentTab('menu')}
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                currentTab === 'menu' 
                  ? 'bg-[#2D5A27] text-white font-semibold' 
                  : 'text-slate-200 hover:text-white hover:bg-white/5'
              }`}
            >
              <UtensilsCrossed className="w-4 h-4 text-emerald-300" />
              {isAr ? 'قائمة الطعام الكاملة' : 'Digital Menu'}
            </button>
            <button
              onClick={() => setCurrentTab('insights')}
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                currentTab === 'insights' 
                  ? 'bg-gradient-to-r from-emerald-600 to-[#2D5A27] text-[#FDB813] font-bold shadow-md border border-[#FDB813]/40' 
                  : 'text-amber-200 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#FDB813] animate-pulse" />
              <span>{isAr ? 'نصائح التغذية (Gemini)' : 'Nutrition Insights'}</span>
            </button>
            <button
              onClick={() => setCurrentTab('subscriptions')}
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                currentTab === 'subscriptions' 
                  ? 'bg-[#2D5A27] text-white font-semibold' 
                  : 'text-slate-200 hover:text-white hover:bg-white/5'
              }`}
            >
              <Calendar className="w-4 h-4 text-emerald-300" />
              {isAr ? 'الاشتراكات (رياضيين وموظفين)' : 'Subscriptions'}
            </button>
            <button
              onClick={() => setCurrentTab('location')}
              className={`px-3 py-2 rounded-xl transition-all ${
                currentTab === 'location' 
                  ? 'bg-[#2D5A27] text-white font-semibold' 
                  : 'text-slate-200 hover:text-white hover:bg-white/5'
              }`}
            >
              {isAr ? 'متجر ميلة والتوصيل' : 'Mila Store'}
            </button>
            <button
              onClick={() => setCurrentTab('admin')}
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                currentTab === 'admin' 
                  ? 'bg-slate-800 text-amber-300 border border-amber-400/40' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              {isAr ? 'إدارة المطعم' : 'Admin'}
            </button>
          </nav>

          {/* Right Action Bar (Lang toggle, Tech Specs Hub, Floating Cart) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Tech Blueprint Hub Button */}
            <button
              onClick={() => setIsTechModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-950 to-slate-900 border border-[#2D5A27] text-xs font-semibold text-emerald-200 hover:border-[#FDB813] hover:text-[#FDB813] transition-all shadow-sm"
              title="View Technical Specs, PostgreSQL DDL, and Clean Architecture"
            >
              <Code2 className="w-3.5 h-3.5 text-[#FDB813]" />
              <span className="hidden sm:inline">
                {isAr ? 'مخطط النظام (Figma & DB)' : 'Tech Blueprint & DDL'}
              </span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition-colors"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#FDB813]" />
              <span>{lang === 'en' ? 'عربي' : 'EN'}</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#2D5A27] hover:bg-[#386b31] border border-emerald-600/60 shadow-md transition-all group"
            >
              <ShoppingBag className="w-4 h-4 text-[#FDB813] group-hover:scale-110 transition-transform" />
              <div className="text-left text-xs hidden sm:block">
                <div className="font-bold text-white flex items-center gap-1">
                  <span>{isAr ? 'الطلب' : 'Tray'}</span>
                  {totalCartProtein > 0 && (
                    <span className="text-[10px] text-[#FDB813] bg-black/30 px-1 py-0.2 rounded">
                      {totalCartProtein}g P
                    </span>
                  )}
                </div>
              </div>
              {totalCartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#FDB813] text-[#1A3317] font-black text-xs flex items-center justify-center animate-bounce">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Mobile secondary navigation strip */}
        <div className="flex lg:hidden overflow-x-auto py-2.5 gap-2 border-t border-white/10 text-xs font-medium no-scrollbar">
          <button
            onClick={() => setCurrentTab('home')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${currentTab === 'home' ? 'bg-[#2D5A27] text-white' : 'text-slate-300'}`}
          >
            {isAr ? 'الرئيسية' : 'Home'}
          </button>
          <button
            onClick={() => setCurrentTab('builder')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-bold flex items-center gap-1 ${currentTab === 'builder' ? 'bg-[#FDB813] text-[#1A3317]' : 'text-amber-300'}`}
          >
            <Flame className="w-3 h-3" />
            {isAr ? 'ركب وجبتك 150غ+200غ' : 'Bowl Builder'}
          </button>
          <button
            onClick={() => setCurrentTab('menu')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${currentTab === 'menu' ? 'bg-[#2D5A27] text-white' : 'text-slate-300'}`}
          >
            {isAr ? 'قائمة الطعام (6 أصناف)' : 'Menu (6 Cats)'}
          </button>
          <button
            onClick={() => setCurrentTab('insights')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-bold flex items-center gap-1 ${currentTab === 'insights' ? 'bg-[#FDB813] text-[#1A3317]' : 'text-amber-300'}`}
          >
            <Sparkles className="w-3 h-3" />
            {isAr ? 'نصائح التغذية (Gemini)' : 'AI Insights'}
          </button>
          <button
            onClick={() => setCurrentTab('subscriptions')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${currentTab === 'subscriptions' ? 'bg-[#2D5A27] text-white' : 'text-slate-300'}`}
          >
            {isAr ? 'الاشتراكات' : 'Subscriptions'}
          </button>
          <button
            onClick={() => setCurrentTab('location')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${currentTab === 'location' ? 'bg-[#2D5A27] text-white' : 'text-slate-300'}`}
          >
            {isAr ? 'موقع ميلة' : 'Mila'}
          </button>
          <button
            onClick={() => setCurrentTab('admin')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${currentTab === 'admin' ? 'bg-slate-800 text-amber-300' : 'text-slate-400'}`}
          >
            {isAr ? 'الإدارة' : 'Admin'}
          </button>
        </div>

      </div>
    </header>
  );
};

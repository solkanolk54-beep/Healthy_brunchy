import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Search, 
  Filter, 
  ShoppingBag, 
  Flame, 
  Check, 
  Fish, 
  Utensils, 
  PieChart, 
  Cookie, 
  CupSoda,
  Tag,
  Dumbbell
} from 'lucide-react';
import { MenuItem, CategoryId, Language, CartItem } from '../types';
import { CATEGORIES } from '../data/menuData';

interface DigitalMenuProps {
  menuItems: MenuItem[];
  lang: Language;
  onAddToCart: (item: CartItem) => void;
}

export const DigitalMenu: React.FC<DigitalMenuProps> = ({
  menuItems,
  lang,
  onAddToCart
}) => {
  const isAr = lang === 'ar';

  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [macroFilter, setMacroFilter] = useState<'all' | 'high_protein' | 'low_calorie' | 'zero_fat'>('all');
  const [addedItemIds, setAddedItemIds] = useState<{ [key: string]: boolean }>({});

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      // Category filter
      if (selectedCategory !== 'all' && item.categoryId !== selectedCategory) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesEn = item.nameEn.toLowerCase().includes(query) || item.descriptionEn.toLowerCase().includes(query);
        const matchesAr = item.nameAr.toLowerCase().includes(query) || item.descriptionAr.toLowerCase().includes(query);
        const matchesTag = item.tags.some(t => t.toLowerCase().includes(query));
        if (!matchesEn && !matchesAr && !matchesTag) return false;
      }

      // Nutritional filter
      if (macroFilter === 'high_protein' && item.macros.protein < 40) return false;
      if (macroFilter === 'low_calorie' && item.macros.calories > 450) return false;
      if (macroFilter === 'zero_fat' && item.macros.fat > 6) return false;

      return true;
    });
  }, [menuItems, selectedCategory, searchQuery, macroFilter]);

  const handleAddItem = (item: MenuItem) => {
    const cartItem: CartItem = {
      id: `cart_item_${item.id}_${Date.now()}`,
      type: 'menu_item',
      menuItem: item,
      quantity: 1,
      unitPriceDZD: item.priceDZD,
      totalPriceDZD: item.priceDZD,
      totalMacros: item.macros
    };

    onAddToCart(cartItem);
    setAddedItemIds(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds(prev => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'low_fat': return <Sparkles className="w-4 h-4" />;
      case 'seafood': return <Fish className="w-4 h-4" />;
      case 'fast_food': return <Utensils className="w-4 h-4" />;
      case 'savory': return <PieChart className="w-4 h-4" />;
      case 'desserts': return <Cookie className="w-4 h-4" />;
      case 'beverages': return <CupSoda className="w-4 h-4" />;
      default: return <Utensils className="w-4 h-4" />;
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#2D5A27] text-xs font-bold uppercase tracking-wider mb-2">
            <Utensils className="w-3.5 h-3.5 text-[#FDB813]" />
            <span>{isAr ? 'القائمة المعتمدة رسمياً' : 'Official Approved Menu'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1A3317] tracking-tight">
            {isAr ? 'قائمة الطعام الرقمية (Digital Menu)' : 'Healthy Brunchy -Sol+ Menu'}
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mt-1">
            {isAr 
              ? 'وجبات غنية بالعناصر الغذائية الأساسية مع تفصيل دقيق لجرامات البروتين، الكارب، السعرات، والدهون الصحية.' 
              : 'Every dish crafted for peak fitness and clean energy. Weighed precision with 150g protein and 200g carbs base standard.'}
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isAr ? 'ابحث عن وجبة أو مكون...' : 'Search meals, macros, tags...'}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#2D5A27] shadow-xs"
          />
        </div>
      </div>

      {/* Category Tabs Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
            selectedCategory === 'all'
              ? 'bg-[#2D5A27] text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <span>{isAr ? 'جميع الأطباق (38)' : 'All Items (38)'}</span>
        </button>

        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id as CategoryId)}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              selectedCategory === cat.id
                ? 'bg-[#2D5A27] text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {getCategoryIcon(cat.id)}
            <span>{isAr ? cat.nameAr : cat.nameEn}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600">
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Secondary Quick Filter Pills (High protein, low cal, zero fat) */}
      <div className="flex flex-wrap items-center gap-2 mb-8 text-xs font-semibold">
        <span className="text-slate-500 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" />
          {isAr ? 'تصفية سريعة:' : 'Macro Filter:'}
        </span>

        <button
          onClick={() => setMacroFilter('all')}
          className={`px-3 py-1 rounded-lg transition-colors ${
            macroFilter === 'all' ? 'bg-[#1A3317] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          {isAr ? 'الكل' : 'All'}
        </button>

        <button
          onClick={() => setMacroFilter('high_protein')}
          className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1 ${
            macroFilter === 'high_protein' ? 'bg-[#FDB813] text-[#1A3317] font-black' : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
          }`}
        >
          <Dumbbell className="w-3 h-3" />
          <span>{isAr ? 'عالي البروتين (+40غ)' : 'High Protein (+40g)'}</span>
        </button>

        <button
          onClick={() => setMacroFilter('low_calorie')}
          className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1 ${
            macroFilter === 'low_calorie' ? 'bg-emerald-600 text-white font-bold' : 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
          }`}
        >
          <Flame className="w-3 h-3" />
          <span>{isAr ? 'خفيف السعرات (<450 سعرة)' : 'Under 450 kcal'}</span>
        </button>

        <button
          onClick={() => setMacroFilter('zero_fat')}
          className={`px-3 py-1 rounded-lg transition-colors ${
            macroFilter === 'zero_fat' ? 'bg-blue-600 text-white font-bold' : 'bg-blue-100 text-blue-900 hover:bg-blue-200'
          }`}
        >
          {isAr ? 'دهون شبه منعدمة (≤6غ)' : 'Ultra Low Fat (≤6g)'}
        </button>

        <span className="text-slate-400 text-xs ml-auto">
          {filteredItems.length} {isAr ? 'وجبة متوفرة' : 'meals matching'}
        </span>
      </div>

      {/* Menu Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => {
          const isAdded = !!addedItemIds[item.id];
          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col group"
            >
              {/* Image & Badges */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.nameEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Standard Portion pill */}
                {item.standardPortion && (
                  <div className="absolute top-3 left-3 bg-[#1A3317]/85 backdrop-blur-sm text-emerald-200 text-[10px] font-black px-2.5 py-1 rounded-full border border-emerald-500/30">
                    {item.standardPortion}
                  </div>
                )}

                {/* Popular pill */}
                {item.isPopular && (
                  <div className="absolute top-3 right-3 bg-[#FDB813] text-[#1A3317] text-[10px] font-black px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>{isAr ? 'الأكثر طلباً' : 'Popular'}</span>
                  </div>
                )}

                {/* Calorie badge */}
                <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-sm text-white text-xs font-black px-2.5 py-1 rounded-xl flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-[#FDB813]" />
                  <span>{item.macros.calories} kcal</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  {/* Bilingual Title */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-extrabold text-[#1A3317] text-base group-hover:text-[#2D5A27] transition-colors">
                        {isAr ? item.nameAr : item.nameEn}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        {isAr ? item.nameEn : item.nameAr}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {isAr ? item.descriptionAr : item.descriptionEn}
                  </p>
                </div>

                {/* Macro Nutrient Strip */}
                <div className="grid grid-cols-3 gap-1.5 p-2 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <div className="p-1">
                    <div className="text-[10px] text-emerald-800 font-bold uppercase">{isAr ? 'بروتين' : 'Protein'}</div>
                    <div className="text-sm font-black text-emerald-700">{item.macros.protein}g</div>
                  </div>
                  <div className="p-1 border-x border-slate-200">
                    <div className="text-[10px] text-amber-800 font-bold uppercase">{isAr ? 'كارب' : 'Carbs'}</div>
                    <div className="text-sm font-black text-slate-800">{item.macros.carbs}g</div>
                  </div>
                  <div className="p-1">
                    <div className="text-[10px] text-slate-500 font-bold uppercase">{isAr ? 'دهون' : 'Fat'}</div>
                    <div className="text-sm font-black text-slate-800">{item.macros.fat}g</div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Price & Add to Tray CTA */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-lg font-black text-[#2D5A27]">
                      {item.priceDZD} <span className="text-xs font-bold text-slate-500">DZD</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddItem(item)}
                    disabled={!item.isAvailable}
                    className={`py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      !item.isAvailable
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : isAdded
                        ? 'bg-[#2D5A27] text-[#FDB813] shadow-md scale-95'
                        : 'bg-[#2D5A27] hover:bg-[#386b31] text-white shadow-xs hover:shadow-md'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#FDB813]" />
                        <span>{isAr ? 'تمت الإضافة ✓' : 'Added ✓'}</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5 text-[#FDB813]" />
                        <span>{isAr ? 'أضف للطلب' : 'Add to Tray'}</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};

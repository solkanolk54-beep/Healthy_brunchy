import React, { useState, useMemo } from 'react';
import { 
  Flame, 
  Dumbbell, 
  Plus, 
  Minus, 
  Check, 
  Sparkles, 
  ShoppingBag, 
  Share2, 
  HelpCircle,
  Apple,
  RotateCcw,
  Zap,
  Coffee,
  CheckCircle2
} from 'lucide-react';
import { Language, ProteinOption, CarbsOption, AddonOption, CustomBowl, CartItem } from '../types';
import { PROTEIN_OPTIONS, CARBS_OPTIONS, ADDON_OPTIONS } from '../data/menuData';

interface BowlBuilderProps {
  lang: Language;
  onAddToCart: (item: CartItem) => void;
  onDirectWhatsApp: (bowl: CustomBowl) => void;
}

export const BowlBuilder: React.FC<BowlBuilderProps> = ({
  lang,
  onAddToCart,
  onDirectWhatsApp
}) => {
  const isAr = lang === 'ar';

  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedProtein, setSelectedProtein] = useState<ProteinOption>(PROTEIN_OPTIONS[0]);
  const [selectedCarbs, setSelectedCarbs] = useState<CarbsOption>(CARBS_OPTIONS[0]);
  const [selectedAddons, setSelectedAddons] = useState<AddonOption[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [notes, setNotes] = useState<string>('');
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  // Toggle addon selection
  const toggleAddon = (addon: AddonOption) => {
    if (selectedAddons.some(a => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  // Compute total macros
  const totals = useMemo(() => {
    let calories = selectedProtein.macros.calories + selectedCarbs.macros.calories;
    let protein = selectedProtein.macros.protein + selectedCarbs.macros.protein;
    let carbs = selectedProtein.macros.carbs + selectedCarbs.macros.carbs;
    let fat = selectedProtein.macros.fat + selectedCarbs.macros.fat;
    let fiber = (selectedProtein.macros.fiber || 0) + (selectedCarbs.macros.fiber || 0);

    let price = selectedProtein.priceDZD + selectedCarbs.priceDZD;

    selectedAddons.forEach(addon => {
      calories += addon.macros.calories;
      protein += addon.macros.protein;
      carbs += addon.macros.carbs;
      fat += addon.macros.fat;
      fiber += addon.macros.fiber || 0;
      price += addon.priceDZD;
    });

    return {
      macros: { calories, protein, carbs, fat, fiber },
      unitPrice: price,
      totalPrice: price * quantity
    };
  }, [selectedProtein, selectedCarbs, selectedAddons, quantity]);

  // Handle Add to Tray
  const handleAdd = () => {
    const customBowl: CustomBowl = {
      id: `bowl_${Date.now()}`,
      protein: selectedProtein,
      carbs: selectedCarbs,
      addons: selectedAddons,
      notes,
      totalMacros: totals.macros,
      totalPriceDZD: totals.unitPrice,
      quantity
    };

    const cartItem: CartItem = {
      id: `cart_bowl_${Date.now()}`,
      type: 'custom_bowl',
      customBowl,
      quantity,
      unitPriceDZD: totals.unitPrice,
      totalPriceDZD: totals.totalPrice,
      totalMacros: totals.macros
    };

    onAddToCart(cartItem);
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 2500);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#2D5A27] text-xs font-bold uppercase tracking-wider">
          <Flame className="w-3.5 h-3.5 text-[#FDB813]" />
          <span>{isAr ? 'حاسبة الماكروز الذكية' : 'Precision Macro Calculator'}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1A3317] tracking-tight">
          {isAr ? 'ركب وجبتك المخصصة (Build Your Own Bowl)' : 'Build Your Own Healthy Bowl'}
        </h2>
        <p className="text-slate-600 text-sm sm:text-base">
          {isAr 
            ? 'حدد 150غ من البروتين الصافي المفضل لديك، 200غ من الكاربوهيدرات النظيفة، وأضف لمساتك من السناكات والمشروبات الطبيعية مع متابعة فورية لمجموع السعرات والماكروز.'
            : 'Assemble your bowl: 150g pure weighed protein + 200g complex carbs + fitness add-ons. Watch your live macros calculate automatically.'}
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Step Selector Wizard (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Step Tabs */}
          <div className="grid grid-cols-4 gap-2 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm text-xs font-bold">
            <button
              onClick={() => setActiveStep(1)}
              className={`py-3 px-2 rounded-xl transition-all flex flex-col items-center gap-1 ${
                activeStep === 1 
                  ? 'bg-[#2D5A27] text-white shadow-md' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-[#FDB813] text-[#1A3317] flex items-center justify-center text-[10px] font-black">
                1
              </span>
              <span className="truncate">{isAr ? 'البروتين (150غ)' : 'Protein 150g'}</span>
            </button>

            <button
              onClick={() => setActiveStep(2)}
              className={`py-3 px-2 rounded-xl transition-all flex flex-col items-center gap-1 ${
                activeStep === 2 
                  ? 'bg-[#2D5A27] text-white shadow-md' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-[#FDB813] text-[#1A3317] flex items-center justify-center text-[10px] font-black">
                2
              </span>
              <span className="truncate">{isAr ? 'الكارب (200غ)' : 'Carbs 200g'}</span>
            </button>

            <button
              onClick={() => setActiveStep(3)}
              className={`py-3 px-2 rounded-xl transition-all flex flex-col items-center gap-1 ${
                activeStep === 3 
                  ? 'bg-[#2D5A27] text-white shadow-md' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-[#FDB813] text-[#1A3317] flex items-center justify-center text-[10px] font-black">
                3
              </span>
              <span className="truncate">{isAr ? 'مقبلات وسناكات' : 'Add-ons'}</span>
            </button>

            <button
              onClick={() => setActiveStep(4)}
              className={`py-3 px-2 rounded-xl transition-all flex flex-col items-center gap-1 ${
                activeStep === 4 
                  ? 'bg-[#2D5A27] text-white shadow-md' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-[#FDB813] text-[#1A3317] flex items-center justify-center text-[10px] font-black">
                4
              </span>
              <span className="truncate">{isAr ? 'مشروبات وتحلية' : 'Drinks & Sweets'}</span>
            </button>
          </div>

          {/* STEP 1: PROTEIN (150g) */}
          {activeStep === 1 && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#1A3317]">
                    {isAr ? 'الخطوة 1: اختر مصدر البروتين الأساسي (150غ)' : 'Step 1: Choose 150g Pure Protein'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {isAr ? 'جميع مصادر البروتين توزن نية ومطهوة بدقة فائقة' : 'Weighed raw and cooked with zero excess fats'}
                  </p>
                </div>
                <span className="bg-emerald-100 text-[#2D5A27] text-xs font-black px-2.5 py-1 rounded-full">
                  150g Weighed
                </span>
              </div>

              <div className="grid gap-3">
                {PROTEIN_OPTIONS.map((prot) => {
                  const isSelected = selectedProtein.id === prot.id;
                  return (
                    <div
                      key={prot.id}
                      onClick={() => setSelectedProtein(prot)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                        isSelected 
                          ? 'border-[#2D5A27] bg-emerald-50/70 shadow-sm' 
                          : 'border-slate-100 bg-slate-50/50 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-[#2D5A27] text-white' : 'border border-slate-300'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <div className="font-bold text-[#1A3317] text-sm sm:text-base">
                            {isAr ? prot.nameAr : prot.nameEn}
                          </div>
                          <p className="text-xs text-slate-500 max-w-sm hidden sm:block">
                            {prot.description}
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-[11px] font-semibold text-slate-600">
                            <span className="text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                              {prot.macros.protein}g Protein
                            </span>
                            <span>{prot.macros.calories} kcal</span>
                            <span>{prot.macros.fat}g Fat</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-extrabold text-[#2D5A27] text-base">
                          {prot.priceDZD} <span className="text-xs">DZD</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium">150g Net</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setActiveStep(2)}
                  className="px-5 py-2.5 rounded-xl bg-[#2D5A27] text-white font-bold text-xs hover:bg-[#386b31] transition-all flex items-center gap-1.5"
                >
                  <span>{isAr ? 'متابعة إلى الكارب (200غ)' : 'Next: Select Carbs (200g)'}</span>
                  <Check className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: CARBS BASE (200g) */}
          {activeStep === 2 && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#1A3317]">
                    {isAr ? 'الخطوة 2: اختر قاعدة الكاربوهيدرات النظيفة (200غ)' : 'Step 2: Choose 200g Clean Carbs Base'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {isAr ? 'كاربوهيدرات معقدة بطيئة الامتصاص لطاقة مستدامة' : 'Slow-release complex carbohydrates for all-day energy'}
                  </p>
                </div>
                <span className="bg-amber-100 text-amber-900 text-xs font-black px-2.5 py-1 rounded-full">
                  200g Weighed
                </span>
              </div>

              <div className="grid gap-3">
                {CARBS_OPTIONS.map((carb) => {
                  const isSelected = selectedCarbs.id === carb.id;
                  return (
                    <div
                      key={carb.id}
                      onClick={() => setSelectedCarbs(carb)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                        isSelected 
                          ? 'border-[#2D5A27] bg-emerald-50/70 shadow-sm' 
                          : 'border-slate-100 bg-slate-50/50 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-[#2D5A27] text-white' : 'border border-slate-300'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <div className="font-bold text-[#1A3317] text-sm sm:text-base">
                            {isAr ? carb.nameAr : carb.nameEn}
                          </div>
                          <p className="text-xs text-slate-500 max-w-sm hidden sm:block">
                            {carb.description}
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-[11px] font-semibold text-slate-600">
                            <span className="text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                              {carb.macros.carbs}g Carbs
                            </span>
                            <span>{carb.macros.calories} kcal</span>
                            <span>{carb.macros.fiber}g Fiber</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-extrabold text-[#2D5A27] text-base">
                          {carb.priceDZD} <span className="text-xs">DZD</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium">200g Base</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setActiveStep(1)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold transition-all"
                >
                  {isAr ? '← الخطوة السابقة' : '← Back to Protein'}
                </button>
                <button
                  onClick={() => setActiveStep(3)}
                  className="px-5 py-2.5 rounded-xl bg-[#2D5A27] text-white font-bold text-xs hover:bg-[#386b31] transition-all flex items-center gap-1.5"
                >
                  <span>{isAr ? 'متابعة إلى المقبلات' : 'Next: Add-ons & Snacks'}</span>
                  <Check className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: ADD-ONS & SNACKS */}
          {activeStep === 3 && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#1A3317]">
                    {isAr ? 'الخطوة 3: مقبلات وسناكات صحية (اختياري)' : 'Step 3: Healthy Add-ons & Snacks (Optional)'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {isAr ? 'همبرغر، طاكوس، شورما صحية أو ميني كيش' : 'Healthy mini burgers, whole tacos, shawarma or quiche'}
                  </p>
                </div>
                <span className="text-xs font-bold text-slate-400">
                  {selectedAddons.filter(a => a.category === 'snack').length} {isAr ? 'محدد' : 'selected'}
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {ADDON_OPTIONS.filter(a => a.category === 'snack').map((addon) => {
                  const isSelected = selectedAddons.some(a => a.id === addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon)}
                      className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected 
                          ? 'border-[#FDB813] bg-amber-50/60 shadow-sm' 
                          : 'border-slate-100 bg-slate-50/50 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="font-bold text-[#1A3317] text-sm">
                          {isAr ? addon.nameAr : addon.nameEn}
                        </div>
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                          isSelected ? 'bg-[#FDB813] text-[#1A3317]' : 'border border-slate-300'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-500 mb-2">
                        {addon.description}
                      </p>

                      <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                        <span className="text-[11px] font-semibold text-emerald-800">
                          +{addon.macros.protein}g P | {addon.macros.calories} kcal
                        </span>
                        <span className="font-black text-[#2D5A27]">
                          +{addon.priceDZD} DZD
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setActiveStep(2)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold"
                >
                  {isAr ? '← العودة للكارب' : '← Back'}
                </button>
                <button
                  onClick={() => setActiveStep(4)}
                  className="px-5 py-2.5 rounded-xl bg-[#2D5A27] text-white font-bold text-xs hover:bg-[#386b31] transition-all flex items-center gap-1.5"
                >
                  <span>{isAr ? 'متابعة إلى المشروبات والتحلية' : 'Next: Drinks & Desserts'}</span>
                  <Check className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: DRINKS & DESSERTS */}
          {activeStep === 4 && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#1A3317]">
                    {isAr ? 'الخطوة 4: مشروبات ديتوكس وحلويات صحية' : 'Step 4: Detox Juices & Healthy Treats'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {isAr ? 'عصائر طازجة بدون سكر، كرات طاقة بالتمر أو تشيز كيك خفيف' : 'Cold pressed zero sugar detox, date balls, protein pancakes'}
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {ADDON_OPTIONS.filter(a => a.category === 'drink' || a.category === 'sweet').map((addon) => {
                  const isSelected = selectedAddons.some(a => a.id === addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon)}
                      className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected 
                          ? 'border-[#FDB813] bg-amber-50/60 shadow-sm' 
                          : 'border-slate-100 bg-slate-50/50 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
                            addon.category === 'drink' ? 'bg-blue-100 text-blue-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {addon.category === 'drink' ? (isAr ? 'مشروب' : 'Drink') : (isAr ? 'تحلية صحية' : 'Guilt-Free')}
                          </span>
                          <div className="font-bold text-[#1A3317] text-sm mt-1">
                            {isAr ? addon.nameAr : addon.nameEn}
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                          isSelected ? 'bg-[#FDB813] text-[#1A3317]' : 'border border-slate-300'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-500 mb-2">
                        {addon.description}
                      </p>

                      <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                        <span className="text-[11px] font-semibold text-emerald-800">
                          {addon.macros.protein > 0 && `+${addon.macros.protein}g P | `}
                          {addon.macros.calories} kcal
                        </span>
                        <span className="font-black text-[#2D5A27]">
                          +{addon.priceDZD} DZD
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Special Instructions */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isAr ? 'ملاحظات خاصة للشيف (مثال: بدون ملح، دجاج محمر أكثر):' : 'Special kitchen instructions (e.g. less salt, well done):'}
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={isAr ? 'اكتب ملاحظاتك هنا...' : 'Any preferences...'}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-[#2D5A27]"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setActiveStep(3)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold"
                >
                  {isAr ? '← العودة للمقبلات' : '← Back'}
                </button>
                <span className="text-xs font-bold text-[#2D5A27]">
                  {isAr ? 'اكتمل بناء الصحن بنجاح ✓' : 'Bowl Assembly Complete ✓'}
                </span>
              </div>
            </div>
          )}

        </div>

        {/* Right Side: Live Visual Plate & Macro Gauge (5 cols) */}
        <div className="lg:col-span-5 sticky top-24 space-y-4">
          
          <div className="bg-[#183813] text-white rounded-3xl p-6 border-2 border-[#2D5A27] shadow-xl relative overflow-hidden">
            {/* Visual concentric plate ring */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#FDB813]">
                  {isAr ? 'ملخص الصحن المخصص' : 'Custom Bowl Summary'}
                </span>
                <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#FDB813]" />
                  <span>{isAr ? 'معيار Sol+ الرياضي' : 'Sol+ Performance Standard'}</span>
                </h3>
              </div>
              <div className="text-right">
                <div className="text-xl font-black text-[#FDB813]">
                  {totals.unitPrice} <span className="text-xs text-white">DZD</span>
                </div>
                <span className="text-[10px] text-emerald-300 font-semibold">
                  150g P + 200g C
                </span>
              </div>
            </div>

            {/* Selected Breakdown Card */}
            <div className="space-y-2.5 text-xs mb-5">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-emerald-500 text-white font-black text-[10px] flex items-center justify-center">
                    150g
                  </span>
                  <div>
                    <div className="font-bold text-white">
                      {isAr ? selectedProtein.nameAr : selectedProtein.nameEn}
                    </div>
                    <span className="text-[10px] text-emerald-300">
                      {selectedProtein.macros.protein}g protein | {selectedProtein.macros.calories} kcal
                    </span>
                  </div>
                </div>
                <span className="font-bold text-slate-200">{selectedProtein.priceDZD} DZD</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-amber-500 text-[#1A3317] font-black text-[10px] flex items-center justify-center">
                    200g
                  </span>
                  <div>
                    <div className="font-bold text-white">
                      {isAr ? selectedCarbs.nameAr : selectedCarbs.nameEn}
                    </div>
                    <span className="text-[10px] text-amber-200">
                      {selectedCarbs.macros.carbs}g carbs | {selectedCarbs.macros.calories} kcal
                    </span>
                  </div>
                </div>
                <span className="font-bold text-slate-200">{selectedCarbs.priceDZD} DZD</span>
              </div>

              {selectedAddons.length > 0 && (
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">
                    {isAr ? 'الإضافات والمشروبات:' : 'Add-ons & Drinks:'}
                  </div>
                  {selectedAddons.map(a => (
                    <div key={a.id} className="flex justify-between items-center text-[11px] text-slate-300">
                      <span>• {isAr ? a.nameAr : a.nameEn}</span>
                      <span className="text-[#FDB813]">+{a.priceDZD} DZD</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* REAL-TIME MACRO GAUGE CARDS */}
            <div className="p-4 rounded-2xl bg-black/40 border border-[#FDB813]/30 mb-5">
              <div className="text-xs font-bold text-amber-300 mb-3 flex items-center justify-between">
                <span>{isAr ? 'الماكروز المحسوبة للوجبة' : 'Computed Meal Macros'}</span>
                <span className="text-[10px] text-slate-400 font-normal">
                  {isAr ? 'دقة ميزان 100%' : '100% Weighed Accuracy'}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] text-slate-400 uppercase">{isAr ? 'سعرات' : 'Calories'}</div>
                  <div className="text-lg font-black text-white">{totals.macros.calories}</div>
                  <div className="text-[9px] text-[#FDB813]">kcal</div>
                </div>

                <div className="p-2 rounded-xl bg-emerald-950/70 border border-emerald-500/40">
                  <div className="text-[10px] text-emerald-300 uppercase font-bold">{isAr ? 'بروتين' : 'Protein'}</div>
                  <div className="text-lg font-black text-[#FDB813]">{totals.macros.protein}g</div>
                  <div className="text-[9px] text-emerald-200">{Math.round((totals.macros.protein * 4 / totals.macros.calories) * 100)}% cal</div>
                </div>

                <div className="p-2 rounded-xl bg-amber-950/60 border border-amber-500/40">
                  <div className="text-[10px] text-amber-300 uppercase font-bold">{isAr ? 'كارب' : 'Carbs'}</div>
                  <div className="text-lg font-black text-white">{totals.macros.carbs}g</div>
                  <div className="text-[9px] text-amber-200">{totals.macros.fiber}g fiber</div>
                </div>

                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] text-slate-400 uppercase">{isAr ? 'دهون' : 'Fat'}</div>
                  <div className="text-lg font-black text-white">{totals.macros.fat}g</div>
                  <div className="text-[9px] text-slate-400">clean</div>
                </div>
              </div>

              {/* Protein Target Bar for Gym Athletes */}
              <div className="mt-3 pt-2 border-t border-white/10">
                <div className="flex justify-between text-[10px] text-slate-300 mb-1">
                  <span>{isAr ? 'مقياس إمداد العضلات بالبروتين:' : 'Athlete Protein Benchmark:'}</span>
                  <span className="font-bold text-[#FDB813]">
                    {totals.macros.protein >= 45 ? (isAr ? 'ممتاز للبناء العضلي' : 'Optimal Muscle Protein') : (isAr ? 'متوسط ومناسب' : 'Balanced Intake')}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 via-[#FDB813] to-amber-400 transition-all duration-500"
                    style={{ width: `${Math.min(100, (totals.macros.protein / 60) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Quantity Selector & Action CTAs */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-300 font-medium">
                  {isAr ? 'عدد الوجبات:' : 'Meal Quantity:'}
                </span>
                <div className="flex items-center gap-2 bg-white/10 rounded-xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 rounded-lg bg-black/40 text-white flex items-center justify-center font-bold hover:bg-black/60 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-6 text-center font-black text-sm text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 rounded-lg bg-black/40 text-white flex items-center justify-center font-bold hover:bg-black/60 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="pt-2 grid sm:grid-cols-2 gap-2">
                <button
                  onClick={handleAdd}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#FDB813] hover:bg-amber-400 text-[#1A3317] font-black text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-[#1A3317]" />
                  <span>{isAr ? 'أضف الصحن للسلة' : 'Add Bowl to Tray'}</span>
                </button>

                <button
                  onClick={() => {
                    const customBowl: CustomBowl = {
                      id: `bowl_${Date.now()}`,
                      protein: selectedProtein,
                      carbs: selectedCarbs,
                      addons: selectedAddons,
                      notes,
                      totalMacros: totals.macros,
                      totalPriceDZD: totals.unitPrice,
                      quantity
                    };
                    onDirectWhatsApp(customBowl);
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{isAr ? 'طلب مباشر بالواتساب' : 'WhatsApp Order'}</span>
                </button>
              </div>

              {showCelebration && (
                <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-200 text-xs font-bold text-center flex items-center justify-center gap-2 animate-bounce">
                  <CheckCircle2 className="w-4 h-4 text-[#FDB813]" />
                  <span>{isAr ? 'تمت إضافة وجبتك المحسوبة إلى السلة!' : 'Bowl added to tray with exact macros!'}</span>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

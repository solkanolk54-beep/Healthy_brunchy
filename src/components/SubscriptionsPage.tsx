import React, { useState } from 'react';
import { 
  Calendar, 
  Dumbbell, 
  Briefcase, 
  Check, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  Share2,
  CheckCircle2,
  Percent
} from 'lucide-react';
import { Language, SubscriptionPlanType, SubscriptionConfig } from '../types';
import { MILA_COMMUNES } from '../data/menuData';

interface SubscriptionsPageProps {
  lang: Language;
  onSubscribeWhatsApp: (config: SubscriptionConfig) => void;
}

export const SubscriptionsPage: React.FC<SubscriptionsPageProps> = ({
  lang,
  onSubscribeWhatsApp
}) => {
  const isAr = lang === 'ar';

  const [activeAudience, setActiveAudience] = useState<'gym' | 'corporate'>('gym');
  const [duration, setDuration] = useState<'weekly' | 'monthly'>('monthly');
  const [daysPerWeek, setDaysPerWeek] = useState<number>(5);
  const [selectedSlot, setSelectedSlot] = useState<string>('16:30 (قبل التمرين Pre-Workout)');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [deliveryCommune, setDeliveryCommune] = useState<string>('Mila Ville / Centre');
  const [workplaceOrGym, setWorkplaceOrGym] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Pricing calculations
  // Single meal standard: ~850 DZD
  // Weekly (5 days) = 4,250 -> 5% off = 4,000 DZD
  // Monthly (20 days) = 17,000 -> 15% off = 14,450 DZD
  const baseMealPrice = activeAudience === 'gym' ? 900 : 850;
  const totalMeals = duration === 'weekly' ? daysPerWeek : (daysPerWeek * 4);
  const discountRate = duration === 'weekly' ? 0.06 : 0.15;
  const rawTotal = baseMealPrice * totalMeals;
  const finalPriceDZD = Math.round(rawTotal * (1 - discountRate));
  const savingsDZD = rawTotal - finalPriceDZD;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      alert(isAr ? 'الرجاء إدخال الاسم ورقم الهاتف' : 'Please provide name and phone number');
      return;
    }

    const planType: SubscriptionPlanType = `${activeAudience}_${duration}` as SubscriptionPlanType;

    const config: SubscriptionConfig = {
      planType,
      titleEn: activeAudience === 'gym' ? 'Athlete Performance Plan' : 'Corporate Smart Lunch Plan',
      titleAr: activeAudience === 'gym' ? 'اشتراك الرياضيين (High Protein)' : 'اشتراك موظفي الشركات والمؤسسات',
      targetAudience: activeAudience,
      mealsPerWeek: daysPerWeek,
      durationWeeks: duration === 'weekly' ? 1 : 4,
      priceDZD: finalPriceDZD,
      discountPercentage: Math.round(discountRate * 100),
      deliverySlots: activeAudience === 'gym' 
        ? ['16:30 (قبل التمرين Pre-Workout)', '19:00 (بعد التمرين Post-Workout)']
        : ['12:00 (استراحة الغداء الأولى)', '13:00 (استراحة الغداء الثانية)'],
      preferredSlot: selectedSlot,
      proteinTarget: activeAudience === 'gym' ? '150g pure protein (45g-50g per meal)' : '150g balanced protein + complex carbs',
      customerName,
      customerPhone,
      deliveryCommune,
      workplaceOrGym,
      notes
    };

    onSubscribeWhatsApp(config);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
          <Calendar className="w-3.5 h-3.5 text-[#FDB813]" />
          <span>{isAr ? 'محرك الاشتراكات المرنة' : 'Flexible Subscription Engine'}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1A3317] tracking-tight">
          {isAr ? 'باقات الاشتراك للرياضيين والموظفين' : 'Athlete & Corporate Meal Subscriptions'}
        </h2>
        <p className="text-slate-600 text-sm sm:text-base">
          {isAr 
            ? 'توصيل يومي منتظم في مواعيد محددة بدقة تتوافق مع ساعات تدريبك في صالات ميلة أو استراحة الغداء في شركتك، بخصم حصري يصل إلى 15%.'
            : 'Scheduled daily drops aligned with your gym training times or office lunch breaks across Mila. Freshly prepared, macro-calibrated, zero hassle.'}
        </p>
      </div>

      {/* Audience Selector Tabs */}
      <div className="max-w-md mx-auto grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm mb-8 text-xs sm:text-sm font-bold">
        <button
          onClick={() => {
            setActiveAudience('gym');
            setSelectedSlot('16:30 (قبل التمرين Pre-Workout)');
          }}
          className={`py-3 px-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeAudience === 'gym' 
              ? 'bg-[#2D5A27] text-white shadow-md' 
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Dumbbell className="w-4 h-4 text-[#FDB813]" />
          <span>{isAr ? 'رياضيي الجيم والأبطال' : 'Gym Athletes'}</span>
        </button>

        <button
          onClick={() => {
            setActiveAudience('corporate');
            setSelectedSlot('12:00 (استراحة الغداء الأولى)');
          }}
          className={`py-3 px-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeAudience === 'corporate' 
              ? 'bg-[#2D5A27] text-white shadow-md' 
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Briefcase className="w-4 h-4 text-[#FDB813]" />
          <span>{isAr ? 'موظفي الشركات والبنوك' : 'Corporate Employees'}</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Plan Showcase (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-500/40 shadow-xl space-y-6 relative overflow-hidden">
            
            {/* Discount Badge */}
            <div className="absolute top-4 right-4 bg-gradient-to-r from-[#FDB813] to-amber-500 text-[#1A3317] font-black text-xs px-3 py-1 rounded-full shadow-md flex items-center gap-1">
              <Percent className="w-3.5 h-3.5" />
              <span>{Math.round(discountRate * 100)}% {isAr ? 'توفير' : 'OFF'}</span>
            </div>

            <div>
              <span className="text-[11px] font-black uppercase text-[#2D5A27] tracking-wider">
                {activeAudience === 'gym' 
                  ? (isAr ? 'باقة الأداء الرياضي المكثف' : 'ATHLETE PERFORMANCE PLAN') 
                  : (isAr ? 'باقة غداء العمل الصحي والتركيز' : 'CORPORATE SMART LUNCH')}
              </span>
              <h3 className="text-2xl font-black text-[#1A3317] mt-1">
                {activeAudience === 'gym'
                  ? (isAr ? 'برنامج البناء العضلي والاسترجاع' : 'Hyper-Protein Muscle Builder')
                  : (isAr ? 'برنامج الطاقة المتوازنة بدون تخمة' : 'Zero-Drowsiness Corporate Meals')}
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                {activeAudience === 'gym'
                  ? (isAr ? '150غ بروتين صافي من الدجاج، الستيك، والسمك المشوي مع كاربوهيدرات نظيفة توزن بالميزان. مواعيد توصيل تتوافق مع توقيت دخولك للجيم في ميلة.'
                          : '150g weighted protein per meal. High leucine profile for optimal muscle protein synthesis (MPS). Directly delivered to your gym or home.')
                  : (isAr ? 'وجبات صحية مدروسة بمؤشر جلايسيمي منخفض لتجنب الخمول بعد الغداء، تعزز التركيز والنشاط الوظيفي حتى نهاية الدوام.'
                          : 'Low-glycemic sustained carbs + 150g clean protein. Eliminates post-lunch energy crashes for corporate teams in Mila.')}
              </p>
            </div>

            {/* Features Checklist */}
            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{isAr ? '150غ بروتين صافي + 200غ طبق أساسي يومياً' : '150g Pure Protein + 200g Base Main Dish'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {activeAudience === 'gym' 
                    ? (isAr ? 'توقيتات توصيل الجيم: 16:30 أو 19:00 مساءً' : 'Gym slot delivery: 16:30 or 19:00') 
                    : (isAr ? 'توقيتات غداء العمل: 12:00 أو 13:00 ظهراً' : 'Office slot delivery: 12:00 or 13:00')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{isAr ? 'تنوع يومي من 38 صنف معتمد في القائمة' : 'Daily meal variety across 38 menu items'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{isAr ? 'إمكانية إيقاف مؤقت للاشتراك عند السفر أو الراحة' : 'Free pause option if traveling or taking rest days'}</span>
              </div>
            </div>

            {/* Plan Duration Configurator */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  {isAr ? 'مدة الاشتراك:' : 'Subscription Duration:'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDuration('weekly')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                      duration === 'weekly' 
                        ? 'bg-[#2D5A27] text-white shadow-xs' 
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {isAr ? 'أسبوعي (تجريبي)' : 'Weekly (Trial)'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDuration('monthly')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                      duration === 'monthly' 
                        ? 'bg-[#2D5A27] text-white shadow-xs' 
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {isAr ? 'شهري (الأوفر - خصم 15%)' : 'Monthly (Best Value - 15%)'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  {isAr ? 'أيام التوصيل في الأسبوع:' : 'Delivery Days per Week:'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDaysPerWeek(5)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                      daysPerWeek === 5 
                        ? 'bg-[#2D5A27] text-white' 
                        : 'bg-white text-slate-700 border border-slate-200'
                    }`}
                  >
                    {isAr ? '5 أيام (الأحد - الخميس)' : '5 Days (Sun - Thu)'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDaysPerWeek(6)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                      daysPerWeek === 6 
                        ? 'bg-[#2D5A27] text-white' 
                        : 'bg-white text-slate-700 border border-slate-200'
                    }`}
                  >
                    {isAr ? '6 أيام (يشمل السبت)' : '6 Days (Inc. Saturday)'}
                  </button>
                </div>
              </div>

              {/* Price Calculation Box */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {totalMeals} {isAr ? 'وجبة موزونة كاملة' : 'weighed meals'}
                  </span>
                  <div className="text-xl font-black text-[#2D5A27]">
                    {finalPriceDZD.toLocaleString()} <span className="text-xs">DZD</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs line-through text-slate-400">
                    {rawTotal.toLocaleString()} DZD
                  </div>
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                    {isAr ? `توفير ${savingsDZD.toLocaleString()} دج` : `Save ${savingsDZD.toLocaleString()} DZD`}
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Right Subscription Form (6 cols) */}
        <div className="lg:col-span-6">
          <form 
            onSubmit={handleSubscribe}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-md space-y-4"
          >
            <div>
              <h3 className="text-lg font-black text-[#1A3317] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#FDB813]" />
                <span>{isAr ? 'تأكيد وحجز الاشتراك في ميلة' : 'Confirm Mila Subscription'}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {isAr ? 'سيتم ربطك مباشرة بمسؤول الاشتراكات عبر واتساب لتحديد جدول أطباقك' : 'Direct connection with our subscription manager via WhatsApp to customize your weekly menu'}
              </p>
            </div>

            {/* Delivery Slot Choice */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                <Clock className="w-3.5 h-3.5 inline mr-1 text-[#2D5A27]" />
                {isAr ? 'موعد التوصيل اليومي المفضل:' : 'Preferred Daily Delivery Slot:'}
              </label>
              <select
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#2D5A27]"
              >
                {activeAudience === 'gym' ? (
                  <>
                    <option value="16:30 (قبل التمرين Pre-Workout)">16:30 (قبل التمرين Pre-Workout)</option>
                    <option value="19:00 (بعد التمرين Post-Workout)">19:00 (بعد التمرين Post-Workout)</option>
                    <option value="12:30 (غداء مبكر للرياضي)">12:30 (غداء مبكر للرياضي)</option>
                  </>
                ) : (
                  <>
                    <option value="12:00 (استراحة الغداء الأولى)">12:00 (استراحة الغداء الأولى 12h00)</option>
                    <option value="13:00 (استراحة الغداء الثانية)">13:00 (استراحة الغداء الثانية 13h00)</option>
                  </>
                )}
              </select>
            </div>

            {/* Customer Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isAr ? 'الاسم الكامل:' : 'Full Name:'}
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder={isAr ? 'مثال: كريم بلقاسم' : 'e.g. Karim Belkacem'}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-[#2D5A27]"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isAr ? 'رقم الهاتف (الواتساب):' : 'Phone Number (WhatsApp):'}
              </label>
              <input
                type="tel"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="05 / 06 / 07 ..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-[#2D5A27]"
              />
            </div>

            {/* Mila Commune */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                <MapPin className="w-3.5 h-3.5 inline mr-1 text-[#FDB813]" />
                {isAr ? 'بلدية التوصيل في ميلة:' : 'Delivery Commune in Mila:'}
              </label>
              <select
                value={deliveryCommune}
                onChange={(e) => setDeliveryCommune(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#2D5A27]"
              >
                {MILA_COMMUNES.map(commune => (
                  <option key={commune.id} value={commune.nameEn}>
                    {commune.nameEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Workplace or Gym Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {activeAudience === 'gym' 
                  ? (isAr ? 'اسم القاعة الرياضية أو عنوان المنزل:' : 'Gym Name or Home Address in Mila:') 
                  : (isAr ? 'اسم الشركة / المؤسسة / البنك:' : 'Company / Bank / Office Name:')}
              </label>
              <input
                type="text"
                value={workplaceOrGym}
                onChange={(e) => setWorkplaceOrGym(e.target.value)}
                placeholder={activeAudience === 'gym' 
                  ? (isAr ? 'مثال: Power Gym ميلة، سنكلوف' : 'e.g. Olympic Gym Mila') 
                  : (isAr ? 'مثال: مقر بنك BNA ميلة، الدائرة...' : 'e.g. CPA Bank Mila Centre')}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-[#2D5A27]"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isAr ? 'استثناءات غذائية أو أهداف محددة:' : 'Dietary exclusions or fitness goals:'}
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={isAr ? 'مثال: حساسية من السمك، تركيز على الدجاج والستيك...' : 'e.g. No fish, prioritize chicken steak...'}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-[#2D5A27]"
              />
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#2D5A27] to-[#1A3317] hover:from-[#356d2e] hover:to-[#22441e] text-white font-extrabold text-sm shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4 text-[#FDB813]" />
              <span>
                {isAr 
                  ? `تأكيد الاشتراك عبر واتساب (${finalPriceDZD.toLocaleString()} دج)` 
                  : `Confirm Subscription via WhatsApp (${finalPriceDZD.toLocaleString()} DZD)`}
              </span>
            </button>

            {submitted && (
              <div className="p-3 rounded-xl bg-emerald-100 text-[#2D5A27] text-xs font-bold text-center flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FDB813]" />
                <span>{isAr ? 'تم فتح تطبيق واتساب لتأكيد الاشتراك!' : 'WhatsApp opened with subscription request!'}</span>
              </div>
            )}

            <p className="text-[11px] text-slate-400 text-center">
              {isAr ? 'الدفع متاح نقداً عند أول تسليم أو عبر BaridiMob / CCP' : 'Payment upon 1st delivery or BaridiMob / CCP accepted'}
            </p>
          </form>
        </div>

      </div>

    </section>
  );
};

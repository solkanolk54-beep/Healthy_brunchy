import React from 'react';
import { 
  Flame, 
  Dumbbell, 
  Briefcase, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  CheckCircle2, 
  ArrowRight,
  ChevronLeft
} from 'lucide-react';
import { Language } from '../types';

interface HeroSectionProps {
  lang: Language;
  onLaunchBuilder: () => void;
  onExploreMenu: () => void;
  onViewSubscriptions: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onLaunchBuilder,
  onExploreMenu,
  onViewSubscriptions
}) => {
  const isAr = lang === 'ar';

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#183813] via-[#1F4519] to-[#2D5A27] text-white pt-10 pb-20 px-4 sm:px-6 lg:px-8 border-b-4 border-[#FDB813]">
      {/* Decorative solar ray and organic ring background */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FDB813]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#FDB813]/40 text-xs text-amber-200 mb-6 font-medium shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-[#FDB813] animate-ping" />
          <span className="font-bold text-white">Sol+ Precision Nutrition</span>
          <span className="text-emerald-300">|</span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#FDB813]" />
            {isAr ? 'مقرنا في ميلة • التوصيل السريع متاح' : 'Mila, Algeria • Rapid Delivery Active'}
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
                {isAr ? (
                  <>
                    تغذية رياضية دقيقة <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FDB813] via-amber-300 to-yellow-200">
                      150غ بروتين صافي + 200غ طبق أساسي
                    </span>
                  </>
                ) : (
                  <>
                    Precision Nutrition for <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FDB813] via-amber-300 to-yellow-200">
                      Athletes & Busy Professionals
                    </span>
                  </>
                )}
              </h1>
              
              <p className="text-slate-200 text-base sm:text-lg max-w-2xl leading-relaxed">
                {isAr ? (
                  'العلامة الأولى المتخصصة في الوجبات الصحية المحسوبة بدقة الماكروز في ميلة. وجبات طازجة بدون زيوت مهدرجة، محسوبة السعرات لدعم بناء العضلات والنشاط الذهني اليومي.'
                ) : (
                  'The gold standard in sports nutrition and employee health in Mila. Every signature meal features 150g weighed pure protein + 200g complex carbs with zero junk oils.'
                )}
              </p>
            </div>

            {/* Core Golden Rule Feature Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-black/25 backdrop-blur-md border border-[#FDB813]/30 shadow-xl grid sm:grid-cols-3 gap-4 text-center sm:text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FDB813] text-[#1A3317] font-black text-sm flex items-center justify-center shrink-0 shadow-md">
                  150g
                </div>
                <div>
                  <div className="text-xs text-amber-200 font-bold uppercase tracking-wider">
                    {isAr ? 'بروتين نقي' : 'Pure Protein'}
                  </div>
                  <div className="text-xs text-slate-300">
                    {isAr ? 'دجاج، ستيك، كفتة، سمك' : 'Chicken, Steak, Fish'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t sm:border-t-0 sm:border-l border-white/10 pt-3 sm:pt-0 sm:pl-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-md">
                  200g
                </div>
                <div>
                  <div className="text-xs text-emerald-200 font-bold uppercase tracking-wider">
                    {isAr ? 'كاربوهيدرات نظيفة' : 'Clean Carbs'}
                  </div>
                  <div className="text-xs text-slate-300">
                    {isAr ? 'بسمتي، بطاطا، برغل' : 'Basmati, Potatoes'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t sm:border-t-0 sm:border-l border-white/10 pt-3 sm:pt-0 sm:pl-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-md">
                  Sol+
                </div>
                <div>
                  <div className="text-xs text-amber-300 font-bold uppercase tracking-wider">
                    {isAr ? 'طاقة وحيوية' : 'Energy & Focus'}
                  </div>
                  <div className="text-xs text-slate-300">
                    {isAr ? 'ديتوكس وسناكات صحية' : 'Zero Food Coma'}
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onLaunchBuilder}
                className="px-6 py-3.5 rounded-xl bg-[#FDB813] hover:bg-amber-400 text-[#1A3317] font-extrabold text-sm sm:text-base shadow-lg hover:shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Flame className="w-5 h-5 text-[#1A3317]" />
                <span>{isAr ? 'ركب وجبتك المخصصة الآن' : 'Build Custom Bowl (Macro Calc)'}</span>
                {isAr ? <ChevronLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>

              <button
                onClick={onExploreMenu}
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 backdrop-blur-sm transition-all"
              >
                {isAr ? 'استعراض قائمة الطعام (38 وجبة)' : 'Explore 38 Menu Items'}
              </button>
            </div>

            {/* Micro Trust Points */}
            <div className="flex flex-wrap gap-y-2 gap-x-6 text-xs text-emerald-100/90 pt-2 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#FDB813]" />
                {isAr ? 'حساب دقيق لـ (البروتين، الكارب، الدهون)' : 'Exact grams & calories counted'}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#FDB813]" />
                {isAr ? 'توصيل مخصص للصالات الرياضية ومقرات العمل' : 'Delivery slots for Gyms & Offices in Mila'}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#FDB813]" />
                {isAr ? 'طلب فوري ومباشر عبر واتساب' : 'Direct 1-Click WhatsApp Ordering'}
              </span>
            </div>

          </div>

          {/* Right Column: Visual Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 z-20 bg-[#FDB813] text-[#1A3317] font-black text-xs px-3.5 py-1.5 rounded-full shadow-lg border-2 border-white flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAr ? 'الأكثر طلباً في ميلة' : '#1 Healthy Spot Mila'}</span>
              </div>

              {/* Main Card */}
              <div className="rounded-3xl bg-[#1E3E1A]/90 p-5 border border-emerald-500/40 shadow-2xl backdrop-blur-md space-y-4">
                <div className="relative h-56 rounded-2xl overflow-hidden shadow-inner group">
                  <img
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700&auto=format&fit=crop&q=80"
                    alt="Healthy Brunchy Bowl"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                    <span className="text-[11px] font-black tracking-wider text-[#FDB813] uppercase">
                      {isAr ? 'المعيار الذهبي' : 'Golden Standard'}
                    </span>
                    <h3 className="text-white font-bold text-lg">
                      {isAr ? 'صحن البناء العضلي المتكامل Sol+' : 'Sol+ Complete Muscle Bowl'}
                    </h3>
                    <p className="text-xs text-slate-200">
                      150g Grilled Chicken + 200g Basmati Rice + Detox Juices
                    </p>
                  </div>
                </div>

                {/* Live Macro Snapshot Grid */}
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-black/30 border border-white/5">
                    <div className="text-[10px] text-slate-300 uppercase">{isAr ? 'سعرات' : 'Calories'}</div>
                    <div className="text-base font-extrabold text-white">510</div>
                    <div className="text-[9px] text-[#FDB813]">kcal</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30">
                    <div className="text-[10px] text-emerald-300 uppercase">{isAr ? 'بروتين' : 'Protein'}</div>
                    <div className="text-base font-extrabold text-[#FDB813]">48g</div>
                    <div className="text-[9px] text-emerald-200">150g meat</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/30 border border-white/5">
                    <div className="text-[10px] text-slate-300 uppercase">{isAr ? 'كارب' : 'Carbs'}</div>
                    <div className="text-base font-extrabold text-white">56g</div>
                    <div className="text-[9px] text-slate-400">clean</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/30 border border-white/5">
                    <div className="text-[10px] text-slate-300 uppercase">{isAr ? 'دهون' : 'Fats'}</div>
                    <div className="text-base font-extrabold text-white">6g</div>
                    <div className="text-[9px] text-emerald-400">healthy</div>
                  </div>
                </div>

                {/* Subscriptions CTA Strip */}
                <div 
                  onClick={onViewSubscriptions}
                  className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-900/80 to-[#2D5A27] border border-[#FDB813]/40 cursor-pointer hover:border-[#FDB813] transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#FDB813] text-[#1A3317] flex items-center justify-center font-bold">
                      <Dumbbell className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">
                        {isAr ? 'اشتراكات الرياضيين والموظفين' : 'Athlete & Corporate Plans'}
                      </div>
                      <div className="text-[11px] text-emerald-200">
                        {isAr ? 'وفر حتى 18% مع التوصيل اليومي' : 'Save up to 18% with scheduled drops'}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-black text-[#FDB813]">
                    {isAr ? 'استكشف ←' : 'View →'}
                  </span>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

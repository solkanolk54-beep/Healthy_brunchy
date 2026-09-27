import React from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Dumbbell, 
  CheckCircle2,
  Truck
} from 'lucide-react';
import { Language } from '../types';
import { MILA_COMMUNES } from '../data/menuData';

interface MilaLocationSectionProps {
  lang: Language;
  onContactWhatsApp: () => void;
}

export const MilaLocationSection: React.FC<MilaLocationSectionProps> = ({
  lang,
  onContactWhatsApp
}) => {
  const isAr = lang === 'ar';

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#2D5A27] text-xs font-bold uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5 text-[#FDB813]" />
          <span>{isAr ? 'مقرنا والتغطية اللوجستية' : 'Store Location & Mila Coverage'}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1A3317] tracking-tight">
          {isAr ? 'متجر ميلة وشبكة التوصيل السريع' : 'Healthy Brunchy -Sol+ Hub in Mila'}
        </h2>
        <p className="text-slate-600 text-sm sm:text-base">
          {isAr 
            ? 'مطبخنا المركزي في قلب ميلة مجهز بأحدث أدوات قياس الماكروز والطهي الصحي بالبخار والشواء الجاف بدون زيوت مهدرجة.' 
            : 'Our central prep kitchen in Mila is fitted with high-precision digital macro scales, dry griddles, and steam ovens.'}
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Card: Operational Info & Gym Partners */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-extrabold text-lg text-[#1A3317]">
                  {isAr ? 'المقر الرئيسي وساعات العمل' : 'Central Kitchen & Operational Hours'}
                </h3>
                <p className="text-xs text-slate-500">Mila Centre, Wilaya de Mila, Algeria</p>
              </div>
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#2D5A27] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">
                    {isAr ? 'ساعات العمل اليومية:' : 'Operational Daily Hours:'}
                  </div>
                  <div className="text-slate-600 mt-0.5">
                    {isAr ? 'السبت - الخميس: 09:30 صباحاً حتى 22:30 ليلاً' : 'Saturday - Thursday: 09:30 AM – 10:30 PM'}
                  </div>
                  <div className="text-slate-500 text-xs">
                    {isAr ? 'الجمعة: 14:00 ظهراً حتى 22:30 ليلاً' : 'Friday: 02:00 PM – 10:30 PM'}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#FDB813] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">
                    {isAr ? 'العنوان التفصيلي والمعلم:' : 'Detailed Address & Landmark:'}
                  </div>
                  <div className="text-slate-800 font-extrabold mt-0.5">
                    {isAr ? 'حي DNC - مقابل وكالة التشغيل، ميلة' : 'Hai DNC - Opposite DNC Employment Agency, Mila'}
                  </div>
                  <div className="text-[11px] text-emerald-700 font-medium">
                    {isAr ? 'معلم الوصول: مباشرة مقابل وكالة التشغيل DNC' : 'Direct Landmark: Directly opposite DNC Employment Agency'}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">
                    {isAr ? 'خط الطلبات والاشتراكات المباشر (WhatsApp):' : 'Direct WhatsApp & Order Hotline:'}
                  </div>
                  <div className="text-[#2D5A27] font-mono font-black text-sm mt-0.5">
                    +213 558 32 78 13 <span className="text-xs text-slate-500 font-normal">/ 0558327813</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout Button */}
            <button
              onClick={onContactWhatsApp}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#2D5A27] to-[#1A3317] hover:from-[#356d2e] hover:to-[#22441e] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#FDB813]" />
              <span>{isAr ? 'تواصل مباشرة عبر واتساب مع فرع ميلة' : 'Chat with Mila Branch via WhatsApp'}</span>
            </button>
          </div>

          {/* Partner Gyms Showcase */}
          <div className="bg-[#183813] text-white rounded-3xl p-6 border border-[#2D5A27] shadow-lg space-y-4">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Dumbbell className="w-4 h-4 text-[#FDB813]" />
              <span>{isAr ? 'قاعات الرياضة الشريكة في ميلة' : 'Mila Partner Gyms & Fitness Centers'}</span>
            </div>
            
            <p className="text-xs text-slate-300">
              {isAr 
                ? 'نوصل وجباتك الموزونة مباشرة إلى خزانتك أو استقبال القاعة في المواعيد المحددة (16:30 أو 19:00).'
                : 'Direct drop-offs to your gym reception or locker at designated hours (16:30 or 19:00).'}
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FDB813] shrink-0" />
                <span className="truncate">Olympic Gym (ميلة)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FDB813] shrink-0" />
                <span className="truncate">Power Gym (سنكلوف)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FDB813] shrink-0" />
                <span className="truncate">Titan Club (شلغوم العيد)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FDB813] shrink-0" />
                <span className="truncate">Fitness Pro (قرارم قوقة)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FDB813] shrink-0" />
                <span className="truncate">Kys Gym (ميلة)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FDB813] shrink-0" />
                <span className="truncate">Magic Form (ميلة)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Card: Commune Delivery Matrix */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-extrabold text-lg text-[#1A3317] flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#2D5A27]" />
                <span>{isAr ? 'خريطة بلديات ولاية ميلة المشمولة بالتوصيل' : 'Mila Communes Delivery Matrix'}</span>
              </h3>
              <p className="text-xs text-slate-500">
                {isAr ? 'أسعار التوصيل المحددة وزمن الوصول التقريبي' : 'Guaranteed delivery times & official dispatch rates'}
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            {MILA_COMMUNES.map(commune => (
              <div 
                key={commune.id} 
                className="p-3 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-emerald-50/40 hover:border-emerald-200 transition-colors flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-[#2D5A27] flex items-center justify-center font-bold">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{commune.nameEn}</div>
                    <span className="text-[10px] text-slate-400">
                      {isAr ? 'توصيل يومي منتظم' : 'Daily active dispatch'}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-black text-[#2D5A27] text-sm">
                    {commune.deliveryFeeDZD} <span className="text-[10px] font-bold">DZD</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2.5">
            <span className="text-base">💡</span>
            <span>
              {isAr 
                ? 'للمؤسسات والشركات في ميلة: عند اشتراك أكثر من 5 موظفين يكون التوصيل اليومي مجانياً تماماً.' 
                : 'Corporate perk: Free daily delivery across Mila for office batches of 5+ meals.'}
            </span>
          </div>

        </div>

      </div>

    </section>
  );
};

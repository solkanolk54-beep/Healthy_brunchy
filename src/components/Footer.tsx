import React from 'react';
import { 
  Flame, 
  MapPin, 
  Phone, 
  Clock, 
  Heart, 
  ShieldCheck, 
  Sun,
  Code2
} from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  lang: Language;
  onNavigate: (tab: string) => void;
  onOpenTech: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onNavigate,
  onOpenTech
}) => {
  const isAr = lang === 'ar';

  return (
    <footer className="bg-[#122410] text-slate-300 border-t-4 border-[#FDB813] pt-14 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FDB813] to-amber-500 flex items-center justify-center text-[#1A3317]">
                <Sun className="w-5 h-5 font-black" />
              </div>
              <div>
                <span className="font-black text-lg text-white">Healthy Brunchy</span>
                <span className="text-[#FDB813] font-black text-sm ml-1">-Sol+</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {isAr 
                ? 'العلامة الرائدة في التغذية الرياضية الدقيقة في ميلة. وجبات موزونة بمقاييس 150غ بروتين صافي + 200غ طبق أساسي لدعم الأداء البدني والذهني.'
                : 'Precision sports & corporate nutrition in Mila, Algeria. Standard portioning: 150g pure protein + 200g base dish.'}
            </p>

            <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold">
              <MapPin className="w-4 h-4 text-[#FDB813] shrink-0" />
              <span>{isAr ? 'حي DNC - مقابل وكالة التشغيل، ميلة' : 'Hai DNC - Opposite DNC Employment Agency, Mila'}</span>
            </div>
            <div className="text-[11px] text-emerald-300">
              {isAr ? 'معلم الوصول: مباشرة مقابل وكالة التشغيل DNC' : 'Landmark: Opposite DNC Agency'}
            </div>
          </div>

          {/* Col 2: Fast Links */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-white uppercase tracking-wider">
              {isAr ? 'روابط المنصة' : 'Platform Navigation'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => onNavigate('home')} 
                  className="hover:text-[#FDB813] transition-colors"
                >
                  {isAr ? 'الصفحة الرئيسية' : 'Home'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('builder')} 
                  className="hover:text-[#FDB813] transition-colors text-amber-300 font-bold"
                >
                  {isAr ? 'حاسبة الماكروز (ركب صحنك)' : 'Macro Calculator (Build Bowl)'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('menu')} 
                  className="hover:text-[#FDB813] transition-colors"
                >
                  {isAr ? 'قائمة الطعام (6 فئات)' : 'Digital Menu (6 Categories)'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('subscriptions')} 
                  className="hover:text-[#FDB813] transition-colors"
                >
                  {isAr ? 'اشتراكات الرياضيين والموظفين' : 'Athlete & Corporate Subscriptions'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('location')} 
                  className="hover:text-[#FDB813] transition-colors"
                >
                  {isAr ? 'متجر ميلة والتوصيل' : 'Mila Kitchen & Delivery Matrix'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: The 6 Categories */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-white uppercase tracking-wider">
              {isAr ? 'الفئات المعتمدة' : 'Menu Structure'}
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>1. {isAr ? 'الوجبات الخالية من الدسم (150g+200g)' : 'Zero/Low Fat Meals (150g+200g)'}</li>
              <li>2. {isAr ? 'وجبات الأسماك والمأكولات البحرية' : 'Seafood & Baked Fish'}</li>
              <li>3. {isAr ? 'المقبلات والوجبات السريعة الصحية' : 'Healthy Fast Food (Burgers, Tacos)'}</li>
              <li>4. {isAr ? 'المملحات (سوفلي، بيتزا كاري)' : 'Healthy Savory Items'}</li>
              <li>5. {isAr ? 'حلويات وسناكات بدون سكر' : 'Guilt-Free Desserts (Date Balls, Pancakes)'}</li>
              <li>6. {isAr ? 'تحليات ومشروبات الديتوكس الطبيعية' : 'Detox Elixirs & Cold Juices'}</li>
            </ul>
          </div>

          {/* Col 4: Lead Architect Specs & Hours */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-white uppercase tracking-wider">
              {isAr ? 'المواصفات التقنية' : 'Architect Deliverables'}
            </h4>
            <p className="text-xs text-slate-400">
              {isAr 
                ? 'مخطط النظام كامل متوفر في المنصة: Figma Tokens، كود PostgreSQL DDL، مخططات MongoDB، وهياكل Clean Architecture.'
                : 'Production Figma Tokens, complete PostgreSQL DDL, MongoDB Mongoose schemas, and Next.js / Express boilerplate.'}
            </p>

            <button
              onClick={onOpenTech}
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-900 to-slate-800 border border-emerald-500/50 hover:border-[#FDB813] text-[#FDB813] text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>{isAr ? 'فتح المخطط التقني وSQL' : 'Open Tech Blueprint & DDL'}</span>
            </button>

            <a
              href="https://wa.me/213558327813"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-[#FDB813] hover:underline font-mono font-bold flex items-center gap-1 pt-1"
            >
              <span>📞 WhatsApp: +213 558 32 78 13 (0558327813)</span>
            </a>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <div>
            © {new Date().getFullYear()} Healthy Brunchy -Sol+ (Mila, Algeria). All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Precision nutrition with</span>
            <span className="text-[#FDB813] font-bold">150g Protein + 200g Carbs</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

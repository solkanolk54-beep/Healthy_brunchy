import React from 'react';
import { 
  X, 
  MapPin, 
  Phone, 
  Clock, 
  Navigation, 
  CheckCircle2, 
  Share2, 
  Building2, 
  Sparkles 
} from 'lucide-react';
import { Language } from '../../types';
import { STORE_CONTACT, buildWhatsAppUrl } from '../../lib/whatsapp';
import { MILA_COMMUNES } from '../../data/menuData';

interface MilaMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const MilaMapModal: React.FC<MilaMapModalProps> = ({
  isOpen,
  onClose,
  lang
}) => {
  if (!isOpen) return null;

  const isAr = lang === 'ar';

  const orderDirectMessage = isAr
    ? `مرحباً Healthy Brunchy -Sol+ بميلة، أرغب في طلب وجبة صحية مع التوصيل من مقركم بحي DNC (مقابل وكالة التشغيل DNC).`
    : `Hello Healthy Brunchy -Sol+ Mila, I would like to place an order from your kitchen at Hai DNC (Opposite DNC Employment Agency).`;

  const whatsAppUrl = buildWhatsAppUrl(orderDirectMessage);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#183813] text-white flex items-center justify-between border-b-2 border-[#FDB813]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FDB813] text-[#1A3317] flex items-center justify-center font-black">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-base sm:text-lg">
                {isAr ? 'موقع وتفاصيل متجر ميلة المركزي' : 'Healthy Brunchy -Sol+ Mila HQ'}
              </h2>
              <p className="text-xs text-emerald-200">
                {isAr ? STORE_CONTACT.addressAr : STORE_CONTACT.addressEn}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          
          {/* Exact Landmark Highlight Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 to-[#2D5A27] text-white border-2 border-[#FDB813] shadow-md space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-[#FDB813] tracking-wider">
                {isAr ? 'المعلم الرئيسي المؤكد للوصول' : 'Confirmed Landmark & Pickup'}
              </span>
              <span className="bg-[#FDB813] text-[#1A3317] text-[10px] font-black px-2 py-0.5 rounded-full">
                Mila Centre
              </span>
            </div>
            <div className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#FDB813] shrink-0" />
              <span>{isAr ? 'حي DNC - مقابل وكالة التشغيل، ميلة' : 'Hai DNC - Opposite DNC Employment Agency, Mila'}</span>
            </div>
            <p className="text-xs text-emerald-100/90 leading-relaxed">
              {isAr
                ? 'يقع مطبخنا المركزي مباشرة في حي DNC قبالة وكالة التشغيل DNC، مع توفر استلام مباشر ومحطة انطلاق لأسطول التوصيل لجميع بلديات الولاية.'
                : 'Our central prep kitchen is located directly opposite the DNC Employment Agency, providing quick takeout pickup and dispatch to all Mila communes.'}
            </p>
          </div>

          {/* Contact & Hours */}
          <div className="grid sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>{isAr ? 'رقم الهاتف والواتساب:' : 'Official Phone & WhatsApp:'}</span>
              </div>
              <div className="text-base font-black text-[#2D5A27] font-mono">
                {STORE_CONTACT.primaryPhoneFormatted}
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                {STORE_CONTACT.primaryPhoneRaw}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>{isAr ? 'ساعات العمل الرسمية:' : 'Operational Hours:'}</span>
              </div>
              <div className="font-semibold text-slate-800">
                {isAr ? STORE_CONTACT.operationalHoursAr : STORE_CONTACT.operationalHoursEn}
              </div>
              <div className="text-[11px] text-emerald-600 font-bold">
                {isAr ? 'خدمة التوصيل السريع متاحة يومياً' : 'Daily fast delivery active'}
              </div>
            </div>
          </div>

          {/* Delivery Communes Coverage */}
          <div>
            <h4 className="font-extrabold text-sm text-[#1A3317] mb-2 flex items-center gap-1.5">
              <Navigation className="w-4 h-4 text-[#FDB813]" />
              <span>{isAr ? 'بلديات ولاية ميلة المشمولة بالتوصيل' : 'Delivery Coverage Across Mila Communes'}</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {MILA_COMMUNES.map((c) => (
                <div key={c.id} className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                  <span className="font-bold text-slate-800 text-[11px] truncate">{c.nameEn}</span>
                  <span className="text-[10px] text-[#2D5A27] font-black">{c.deliveryFeeDZD} DZD</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Action Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-2">
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex-1 py-3.5 px-5 rounded-xl bg-[#2D5A27] hover:bg-[#386b31] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4 text-[#FDB813]" />
            <span>
              {isAr 
                ? `طلب فوري عبر واتساب (${STORE_CONTACT.primaryPhoneRaw})` 
                : `Order via WhatsApp (${STORE_CONTACT.primaryPhoneFormatted})`}
            </span>
          </a>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors"
          >
            {isAr ? 'إغلاق' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};

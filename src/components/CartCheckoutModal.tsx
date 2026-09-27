import React, { useState, useMemo } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  MapPin, 
  Clock, 
  Share2, 
  CheckCircle2, 
  Copy, 
  Flame, 
  Dumbbell,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { Language, CartItem } from '../types';
import { MILA_COMMUNES } from '../data/menuData';

interface CartCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  lang: Language;
}

export const CartCheckoutModal: React.FC<CartCheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  lang
}) => {
  if (!isOpen) return null;

  const isAr = lang === 'ar';

  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [selectedCommuneId, setSelectedCommuneId] = useState<string>('mila_centre');
  const [streetAddress, setStreetAddress] = useState<string>('');
  const [deliverySlot, setDeliverySlot] = useState<string>('في أقرب وقت ممكن (Immediate / ASAP)');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'baridimob'>('cod');
  const [copied, setCopied] = useState<boolean>(false);

  const selectedCommune = MILA_COMMUNES.find(c => c.id === selectedCommuneId) || MILA_COMMUNES[0];

  // Totals
  const { subtotal, deliveryFee, grandTotal, totalMacros } = useMemo(() => {
    let sub = 0;
    let cal = 0;
    let prot = 0;
    let carbs = 0;
    let fat = 0;

    cartItems.forEach(item => {
      sub += item.totalPriceDZD;
      cal += (item.totalMacros.calories * item.quantity);
      prot += (item.totalMacros.protein * item.quantity);
      carbs += (item.totalMacros.carbs * item.quantity);
      fat += (item.totalMacros.fat * item.quantity);
    });

    const fee = cartItems.length > 0 ? selectedCommune.deliveryFeeDZD : 0;

    return {
      subtotal: sub,
      deliveryFee: fee,
      grandTotal: sub + fee,
      totalMacros: { calories: cal, protein: prot, carbs, fat }
    };
  }, [cartItems, selectedCommune]);

  // Construct WhatsApp Payload
  const generateWhatsAppMessage = () => {
    let msg = `🥗 *طلب جديد من منصة Healthy Brunchy -Sol+ (ميلة)* 🥗\n`;
    msg += `------------------------------------------\n`;
    msg += `📍 *نقطة الانطلاق والاستلام:* حي DNC - مقابل وكالة التشغيل DNC، ميلة\n`;
    msg += `👤 *الزبون:* ${customerName || 'زبون ميلة'}\n`;
    msg += `📞 *الهاتف:* ${customerPhone || 'غير محدد'}\n`;
    msg += `🚚 *البلدية والعنوان:* ${selectedCommune.nameEn} - ${streetAddress || 'المقر الرئيسي'}\n`;
    msg += `⏰ *توقيت التوصيل المفضل:* ${deliverySlot}\n`;
    msg += `💳 *طريقة الدفع:* ${paymentMethod === 'cod' ? 'الدفع نقداً عند الاستلام (COD)' : 'عبر تطبيق بريدي موب (BaridiMob)'}\n`;
    msg += `------------------------------------------\n`;
    msg += `🛒 *تفاصيل الوجبات والماكروز:*\n`;

    cartItems.forEach((item, idx) => {
      if (item.type === 'custom_bowl' && item.customBowl) {
        const b = item.customBowl;
        msg += `${idx + 1}. *صحن مخصص Sol+ (عدد ${item.quantity})*\n`;
        msg += `   • البروتين: ${b.protein.nameAr} (${b.protein.portion})\n`;
        msg += `   • الكارب: ${b.carbs.nameAr} (${b.carbs.portion})\n`;
        if (b.addons.length > 0) {
          msg += `   • الإضافات: ${b.addons.map(a => a.nameAr).join(', ')}\n`;
        }
        msg += `   • ماكروز الصحن: ${b.totalMacros.protein}g بروتين | ${b.totalMacros.calories} سعرة\n`;
        msg += `   • السعر: ${item.totalPriceDZD} دج\n\n`;
      } else if (item.menuItem) {
        const m = item.menuItem;
        msg += `${idx + 1}. *${m.nameAr}* (${m.nameEn}) x ${item.quantity}\n`;
        msg += `   • الماكروز: ${m.macros.protein}g بروتين | ${m.macros.calories} سعرة\n`;
        msg += `   • السعر: ${item.totalPriceDZD} دج\n\n`;
      }
    });

    msg += `------------------------------------------\n`;
    msg += `📊 *إجمالي الماكروز للطلب كاملاً:*\n`;
    msg += `🔥 السعرات: ${totalMacros.calories} kcal\n`;
    msg += `💪 البروتين الصافي: ${totalMacros.protein}g\n`;
    msg += `🌾 الكاربوهيدرات: ${totalMacros.carbs}g\n`;
    msg += `🥑 الدهون الصحية: ${totalMacros.fat}g\n`;
    msg += `------------------------------------------\n`;
    msg += `💵 *المجموع الفرعي:* ${subtotal.toLocaleString()} دج\n`;
    msg += `🚚 *تكلفة التوصيل:* ${deliveryFee} دج\n`;
    msg += `⭐ *المبلغ الإجمالي للدفع:* ${grandTotal.toLocaleString()} دج\n`;
    msg += `------------------------------------------\n`;
    msg += `شكراً لاختياركم Healthy Brunchy -Sol+ بميلة!`;

    return msg;
  };

  const handleSendWhatsApp = () => {
    if (!customerPhone) {
      alert(isAr ? 'الرجاء إدخال رقم هاتفك لتأكيد التوصيل' : 'Please provide your phone number');
      return;
    }
    const message = generateWhatsAppMessage();
    const encoded = encodeURIComponent(message);
    // Healthy Brunchy restaurant direct WhatsApp line
    const phone = '213558327813'; 
    window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
  };

  const handleCopyMessage = () => {
    const message = generateWhatsAppMessage();
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-[#183813] text-white flex items-center justify-between border-b-2 border-[#FDB813]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FDB813] text-[#1A3317] flex items-center justify-center font-black">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-base sm:text-lg">
                {isAr ? 'سلة الطلبات وإتمام التوصيل في ميلة' : 'Tray Breakdown & Mila Checkout'}
              </h2>
              <p className="text-xs text-emerald-200">
                {cartItems.length} {isAr ? 'وجبة محددة' : 'items'} • {totalMacros.protein}g {isAr ? 'بروتين إجمالي' : 'Total Protein'}
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

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {cartItems.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-700 text-base">
                {isAr ? 'سلتك فارغة حالياً' : 'Your tray is currently empty'}
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                {isAr 
                  ? 'اختر من قائمة الأطباق الصحية أو استخدم حاسبة الماكروز لتركيب صحنك المخصص (150غ بروتين + 200غ طبق أساسي).'
                  : 'Add items from our 6 categories or customize your 150g protein + 200g carbs bowl.'}
              </p>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
                  <span>{isAr ? 'الأطباق المختارة' : 'Selected Meals'}</span>
                  <button 
                    onClick={onClearCart} 
                    className="text-rose-600 hover:text-rose-700 flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>{isAr ? 'إفراغ السلة' : 'Clear all'}</span>
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {cartItems.map((item) => (
                    <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-slate-900 text-sm truncate">
                          {item.type === 'custom_bowl' && item.customBowl ? (
                            <span>
                              {isAr ? 'صحن مخصص Sol+:' : 'Custom Bowl:'} {isAr ? item.customBowl.protein.nameAr : item.customBowl.protein.nameEn} + {isAr ? item.customBowl.carbs.nameAr : item.customBowl.carbs.nameEn}
                            </span>
                          ) : (
                            <span>{isAr ? item.menuItem?.nameAr : item.menuItem?.nameEn}</span>
                          )}
                        </div>
                        
                        <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-2 mt-0.5">
                          <span>{item.totalMacros.protein}g Prot</span>
                          <span>•</span>
                          <span>{item.totalMacros.calories} kcal</span>
                          <span>•</span>
                          <span>{item.totalPriceDZD} DZD</span>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="w-6 h-6 rounded bg-white text-slate-700 flex items-center justify-center hover:bg-slate-200 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="w-6 h-6 rounded bg-white text-slate-700 flex items-center justify-center hover:bg-slate-200 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Macros Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 to-[#183813] text-white border border-emerald-500/30">
                <div className="text-xs font-bold text-amber-300 mb-2 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-[#FDB813]" />
                  <span>{isAr ? 'مجموع ماكروز الطلب كاملاً:' : 'Cart Nutrition Totals:'}</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-1.5 rounded-lg bg-white/5">
                    <div className="text-[10px] text-slate-400">{isAr ? 'سعرات' : 'Calories'}</div>
                    <div className="font-extrabold text-white text-sm">{totalMacros.calories}</div>
                  </div>
                  <div className="p-1.5 rounded-lg bg-emerald-900/60 border border-emerald-500/30">
                    <div className="text-[10px] text-emerald-300 font-bold">{isAr ? 'بروتين' : 'Protein'}</div>
                    <div className="font-extrabold text-[#FDB813] text-sm">{totalMacros.protein}g</div>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white/5">
                    <div className="text-[10px] text-slate-400">{isAr ? 'كارب' : 'Carbs'}</div>
                    <div className="font-extrabold text-white text-sm">{totalMacros.carbs}g</div>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white/5">
                    <div className="text-[10px] text-slate-400">{isAr ? 'دهون' : 'Fats'}</div>
                    <div className="font-extrabold text-white text-sm">{totalMacros.fat}g</div>
                  </div>
                </div>
              </div>

              {/* Delivery Details Form */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#2D5A27]" />
                  <span>{isAr ? 'بيانات التوصيل في ولاية ميلة' : 'Mila Delivery Address & Contact'}</span>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      {isAr ? 'الاسم الكامل:' : 'Full Name:'}
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder={isAr ? 'اسم المستلم...' : 'Your name...'}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:border-[#2D5A27]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      {isAr ? 'رقم الهاتف (الواتساب):' : 'Phone / WhatsApp:'}
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="05 / 06 / 07..."
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:border-[#2D5A27]"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      {isAr ? 'بلدية التوصيل:' : 'Delivery Commune:'}
                    </label>
                    <select
                      value={selectedCommuneId}
                      onChange={(e) => setSelectedCommuneId(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:border-[#2D5A27]"
                    >
                      {MILA_COMMUNES.map(commune => (
                        <option key={commune.id} value={commune.id}>
                          {commune.nameEn} ({commune.deliveryFeeDZD} DZD)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      {isAr ? 'موعد التوصيل:' : 'Delivery Timing:'}
                    </label>
                    <select
                      value={deliverySlot}
                      onChange={(e) => setDeliverySlot(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:border-[#2D5A27]"
                    >
                      <option value="في أقرب وقت ممكن (Immediate / ASAP)">في أقرب وقت ممكن (Immediate / ASAP)</option>
                      <option value="استراحة الغداء 12:00 - 13:00">استراحة الغداء (12:00 - 13:00)</option>
                      <option value="قبل التمرين 16:30">قبل التمرين (16:30 Pre-Workout)</option>
                      <option value="بعد التمرين 19:00">بعد التمرين (19:00 Post-Workout)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    {isAr ? 'العنوان بالتفصيل (الحي، رقم العمارة، أو اسم القاعة الرياضية):' : 'Street Address or Landmark (Gym / Office):'}
                  </label>
                  <input
                    type="text"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    placeholder={isAr ? 'مثال: حي الكراغلة، بجانب بنك BNA...' : 'e.g. Near Olympic Gym, Mila Centre'}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:border-[#2D5A27]"
                  />
                </div>

                {/* Payment Option */}
                <div className="pt-2">
                  <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
                    {isAr ? 'طريقة الدفع:' : 'Payment Method:'}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-[#2D5A27] bg-emerald-50 text-[#2D5A27]'
                          : 'border-slate-200 bg-white text-slate-600'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isAr ? 'نقداً عند الاستلام (COD)' : 'Cash on Delivery'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('baridimob')}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        paymentMethod === 'baridimob'
                          ? 'border-[#2D5A27] bg-emerald-50 text-[#2D5A27]'
                          : 'border-slate-200 bg-white text-slate-600'
                      }`}
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>{isAr ? 'بريدي موب (BaridiMob)' : 'BaridiMob Transfer'}</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Order Financial Totals */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>{isAr ? 'المجموع الفرعي للأطباق:' : 'Meals Subtotal:'}</span>
                  <span className="font-bold">{subtotal.toLocaleString()} DZD</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>{isAr ? `توصيل (${selectedCommune.nameEn}):` : `Delivery fee:`}</span>
                  <span className="font-bold">{deliveryFee} DZD</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm">
                  <span className="font-black text-[#1A3317]">{isAr ? 'المبلغ الإجمالي للدفع:' : 'Total Amount:'}</span>
                  <span className="text-lg font-black text-[#2D5A27]">{grandTotal.toLocaleString()} DZD</span>
                </div>
              </div>
            </>
          )}

        </div>

        {/* Modal Action Footer */}
        {cartItems.length > 0 && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-2">
            <button
              onClick={handleCopyMessage}
              className="w-full sm:w-auto px-4 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Copy className="w-4 h-4" />
              <span>{copied ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ نص الطلب' : 'Copy Text')}</span>
            </button>

            <button
              onClick={handleSendWhatsApp}
              className="w-full flex-1 py-3 px-5 rounded-xl bg-[#2D5A27] hover:bg-[#386b31] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4 text-[#FDB813]" />
              <span>
                {isAr 
                  ? `إرسال وتأكيد الطلب عبر واتساب (${grandTotal.toLocaleString()} دج)` 
                  : `Send Order via WhatsApp (${grandTotal.toLocaleString()} DZD)`}
              </span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

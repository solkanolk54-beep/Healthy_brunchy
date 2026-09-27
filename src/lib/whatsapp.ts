/**
 * Healthy Brunchy -Sol+ (Mila, Algeria)
 * WhatsApp Order & Contact Helper Utility
 */

export const STORE_CONTACT = {
  brandName: 'Healthy Brunchy -Sol+',
  primaryPhoneFormatted: '+213 558 32 78 13',
  primaryPhoneRaw: '0558327813',
  whatsappRecipientNumber: '213558327813',
  addressEn: 'Hai DNC - Opposite DNC Employment Agency, Mila Centre, Algeria',
  addressAr: 'حي DNC - مقابل وكالة التشغيل، ميلة، الجزائر',
  landmarkEn: 'Directly opposite the DNC Employment Agency',
  landmarkAr: 'مقابل وكالة التشغيل DNC',
  operationalHoursEn: 'Sat - Thu: 09:30 AM – 10:30 PM | Fri: 02:00 PM – 10:30 PM',
  operationalHoursAr: 'السبت - الخميس: 09:30 - 22:30 | الجمعة: 14:00 - 22:30',
};

export function buildWhatsAppUrl(message: string, recipientNumber: string = STORE_CONTACT.whatsappRecipientNumber): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${recipientNumber}?text=${encoded}`;
}

export function formatOrderReceipt(params: {
  customerName: string;
  customerPhone: string;
  deliveryCommune: string;
  streetAddress?: string;
  deliverySlot: string;
  paymentMethod: 'cod' | 'baridimob';
  itemsList: string;
  macrosSummary: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  subtotalDZD: number;
  deliveryFeeDZD: number;
  grandTotalDZD: number;
  isArabic?: boolean;
}): string {
  const {
    customerName,
    customerPhone,
    deliveryCommune,
    streetAddress,
    deliverySlot,
    paymentMethod,
    itemsList,
    macrosSummary,
    subtotalDZD,
    deliveryFeeDZD,
    grandTotalDZD,
    isArabic = true
  } = params;

  if (isArabic) {
    return `🥗 *طلب جديد من منصة Healthy Brunchy -Sol+ (ميلة)* 🥗
------------------------------------------
📍 *المقر ونقطة الانطلاق:* ${STORE_CONTACT.addressAr} (${STORE_CONTACT.landmarkAr})
👤 *الزبون:* ${customerName || 'زبون ميلة'}
📞 *هاتف الزبون:* ${customerPhone || 'غير محدد'}
🚚 *عنوان التوصيل:* ${deliveryCommune}${streetAddress ? ` - ${streetAddress}` : ''}
⏰ *موعد التوصيل المفضل:* ${deliverySlot}
💳 *طريقة الدفع:* ${paymentMethod === 'cod' ? 'نقداً عند الاستلام (COD)' : 'بريدي موب (BaridiMob)'}
------------------------------------------
🛒 *قائمة الوجبات:*
${itemsList}
------------------------------------------
📊 *إجمالي الماكروز للطلب:*
🔥 السعرات: ${macrosSummary.calories} kcal
💪 البروتين الصافي: ${macrosSummary.protein}g (معيار 150g بروتين لكل وجبة)
🌾 الكاربوهيدرات: ${macrosSummary.carbs}g
🥑 الدهون الصحية: ${macrosSummary.fat}g
------------------------------------------
💵 *المجموع الفرعي:* ${subtotalDZD.toLocaleString()} دج
🚚 *تكلفة التوصيل:* ${deliveryFeeDZD} دج
⭐ *المبلغ الإجمالي المستحق:* ${grandTotalDZD.toLocaleString()} دج
------------------------------------------
📍 *الاستلام المباشر متاح:* ميلة، ${STORE_CONTACT.landmarkAr}
📞 *خط المطعم المباشر:* ${STORE_CONTACT.primaryPhoneFormatted}`;
  }

  return `🥗 *New Order - Healthy Brunchy -Sol+ (Mila)* 🥗
------------------------------------------
📍 *Store Origin:* ${STORE_CONTACT.addressEn} (${STORE_CONTACT.landmarkEn})
👤 *Customer:* ${customerName || 'Mila Customer'}
📞 *Phone:* ${customerPhone || 'Not specified'}
🚚 *Delivery Zone:* ${deliveryCommune}${streetAddress ? ` - ${streetAddress}` : ''}
⏰ *Delivery Slot:* ${deliverySlot}
💳 *Payment:* ${paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'BaridiMob Transfer'}
------------------------------------------
🛒 *Ordered Items:*
${itemsList}
------------------------------------------
📊 *Nutrition Breakdown:*
🔥 Calories: ${macrosSummary.calories} kcal
💪 Pure Protein: ${macrosSummary.protein}g (150g pure protein standard)
🌾 Complex Carbs: ${macrosSummary.carbs}g
🥑 Healthy Fats: ${macrosSummary.fat}g
------------------------------------------
💵 *Subtotal:* ${subtotalDZD.toLocaleString()} DZD
🚚 *Delivery Fee:* ${deliveryFeeDZD} DZD
⭐ *Total Due:* ${grandTotalDZD.toLocaleString()} DZD
------------------------------------------
📍 *Direct Pickup:* Mila, ${STORE_CONTACT.landmarkEn}
📞 *Store Hotline:* ${STORE_CONTACT.primaryPhoneFormatted}`;
}

import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  Check, 
  X, 
  DollarSign, 
  Eye, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Dumbbell, 
  Briefcase, 
  Search,
  Package
} from 'lucide-react';
import { MenuItem, Language } from '../types';

interface AdminDashboardProps {
  menuItems: MenuItem[];
  onUpdateMenuItem: (updated: MenuItem) => void;
  lang: Language;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  menuItems,
  onUpdateMenuItem,
  lang
}) => {
  const isAr = lang === 'ar';

  const [activeTab, setActiveTab] = useState<'inventory' | 'subscriptions' | 'orders'>('inventory');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(0);

  // Simulated live orders and subscriptions for Mila store
  const [simulatedOrders, setSimulatedOrders] = useState([
    {
      id: 'HB-MILA-104',
      customer: 'أحمد بن علي (Ahmed Benali)',
      phone: '0661 24 55 12',
      commune: 'Mila Centre (حي الكراغلة)',
      items: '150g Chicken + 200g Basmati Rice + Detox Juices',
      macros: '48g Protein | 510 kcal',
      totalDZD: 950,
      slot: '16:30 (قبل الجيم)',
      status: 'preparing' as const
    },
    {
      id: 'HB-MILA-103',
      customer: 'دكتورة مريم ساحلي (Dr. Meriem)',
      phone: '0550 18 99 44',
      commune: 'Chelghoum Laïd (مستشفى شلغوم العيد)',
      items: 'Cauliflower Gratin + Grilled Fish + Green Apple Juice',
      macros: '43g Protein | 430 kcal',
      totalDZD: 1400,
      slot: '12:30 (غداء)',
      status: 'out_for_delivery' as const
    },
    {
      id: 'HB-MILA-102',
      customer: 'سفيان بوديسة (Olympic Gym Mila)',
      phone: '0772 45 88 19',
      commune: 'Mila (قاعة أولمبيك)',
      items: 'Beef Steak Meal (150g Beef + 200g Potatoes)',
      macros: '48g Protein | 560 kcal',
      totalDZD: 1150,
      slot: '19:00 (بعد التمرين)',
      status: 'delivered' as const
    }
  ]);

  const [simulatedSubscriptions, setSimulatedSubscriptions] = useState([
    {
      id: 'SUB-ATH-01',
      customer: 'كريم مرابط (Karim M.)',
      plan: 'Athlete Hyper-Protein (شهري - 20 وجبة)',
      gym: 'Power Gym Mila',
      slot: '16:30 Pre-Workout',
      status: 'active',
      renewDate: '2026-10-24'
    },
    {
      id: 'SUB-CORP-04',
      customer: 'وكالة بنك BNA ميلة (Catering 6 staff)',
      plan: 'Corporate Smart Lunch (شهري - 24 وجبة)',
      gym: 'Agence BNA Mila Centre',
      slot: '12:00 Office Lunch',
      status: 'active',
      renewDate: '2026-10-28'
    }
  ]);

  const handleToggleStock = (item: MenuItem) => {
    onUpdateMenuItem({
      ...item,
      isAvailable: !item.isAvailable
    });
  };

  const handleStartEditPrice = (item: MenuItem) => {
    setEditingPriceId(item.id);
    setTempPrice(item.priceDZD);
  };

  const handleSavePrice = (item: MenuItem) => {
    onUpdateMenuItem({
      ...item,
      priceDZD: Number(tempPrice)
    });
    setEditingPriceId(null);
  };

  const filteredItems = menuItems.filter(item => 
    item.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.nameAr.includes(searchTerm)
  );

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{isAr ? 'لوحة تحكم إدارة المطعم' : 'Restaurant Management Console'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A3317]">
            {isAr ? 'إدارة المخزون، الأسعار والاشتراكات (ميلة)' : 'Inventory, Pricing & Subscriptions (Mila)'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isAr ? 'تحديث فوري لتوفر الوجبات وتعديل الأسعار بالدينار الجزائري ومتابعة التوصيل' : 'Live toggling of meal stocks, DZD price updates, and subscription orders dispatch'}
          </p>
          <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800 font-semibold">
            <span>📍 {isAr ? 'المقر المركزي: حي DNC - مقابل وكالة التشغيل DNC، ميلة' : 'HQ: Hai DNC - Opposite DNC Employment Agency, Mila'}</span>
            <span>•</span>
            <span className="font-mono font-bold">📞 +213 558 32 78 13 (0558327813)</span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl text-xs font-bold">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`py-2 px-3 rounded-xl transition-all ${
              activeTab === 'inventory' ? 'bg-[#2D5A27] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isAr ? 'الأطباق والأسعار' : 'Menu Inventory'}
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-2 px-3 rounded-xl transition-all ${
              activeTab === 'orders' ? 'bg-[#2D5A27] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isAr ? 'الطلبات النشطة (3)' : 'Live Orders (3)'}
          </button>
          <button
            onClick={() => setActiveTab('subscriptions')}
            className={`py-2 px-3 rounded-xl transition-all ${
              activeTab === 'subscriptions' ? 'bg-[#2D5A27] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isAr ? 'الاشتراكات الشهرية' : 'Subscriptions'}
          </button>
        </div>
      </div>

      {/* METRIC KPI TILES */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-bold uppercase">{isAr ? 'إجمالي الأطباق' : 'Total Items'}</div>
          <div className="text-2xl font-black text-[#1A3317] mt-1">{menuItems.length}</div>
          <span className="text-[10px] text-emerald-600 font-semibold">{isAr ? '6 تصنيفات معتمدة' : '6 Approved Categories'}</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-bold uppercase">{isAr ? 'الوجبات المتوفرة' : 'In Stock'}</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">
            {menuItems.filter(i => i.isAvailable).length}
          </div>
          <span className="text-[10px] text-slate-400 font-semibold">{isAr ? 'جاهزة للتحضير الفوري' : 'Active on client menu'}</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-bold uppercase">{isAr ? 'طلبات اليوم' : 'Today Orders'}</div>
          <div className="text-2xl font-black text-[#FDB813] mt-1">3,500 <span className="text-xs text-slate-500">DZD</span></div>
          <span className="text-[10px] text-emerald-600 font-semibold">3 {isAr ? 'طلبات نشطة' : 'active deliveries'}</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-bold uppercase">{isAr ? 'الاشتراكات النشطة' : 'Active Subs'}</div>
          <div className="text-2xl font-black text-amber-600 mt-1">2</div>
          <span className="text-[10px] text-slate-400 font-semibold">{isAr ? 'رياضي + مؤسسات' : 'Gym & Corporate'}</span>
        </div>
      </div>

      {/* TAB 1: INVENTORY & PRICING */}
      {activeTab === 'inventory' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
              {isAr ? 'قائمة الوجبات والتحكم بالتوفر والأسعار' : 'Meals Stock & DZD Price Management'}
            </h3>

            <div className="relative w-48 sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={isAr ? 'بحث سريع...' : 'Filter item...'}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-[#2D5A27]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">{isAr ? 'الوجبة' : 'Item Name'}</th>
                  <th className="py-3 px-4">{isAr ? 'التصنيف' : 'Category'}</th>
                  <th className="py-3 px-4">{isAr ? 'الماكروز' : 'Macros'}</th>
                  <th className="py-3 px-4">{isAr ? 'السعر (دج)' : 'Price (DZD)'}</th>
                  <th className="py-3 px-4">{isAr ? 'حالة التوفر' : 'Stock Status'}</th>
                  <th className="py-3 px-4 text-right">{isAr ? 'إجراء' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredItems.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{item.nameEn}</div>
                      <div className="text-[11px] text-slate-500">{item.nameAr}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-600 capitalize">
                      {item.categoryId.replace('_', ' ')}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-emerald-700 font-bold">{item.macros.protein}g P</span> / {item.macros.calories} kcal
                    </td>
                    <td className="py-3 px-4">
                      {editingPriceId === item.id ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            value={tempPrice}
                            onChange={(e) => setTempPrice(Number(e.target.value))}
                            className="w-20 px-2 py-1 border border-[#2D5A27] rounded text-xs"
                          />
                          <button
                            onClick={() => handleSavePrice(item)}
                            className="bg-[#2D5A27] text-white p-1 rounded hover:bg-[#386b31]"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div 
                          onClick={() => handleStartEditPrice(item)}
                          className="font-extrabold text-[#2D5A27] cursor-pointer hover:underline flex items-center gap-1"
                          title="Click to edit price"
                        >
                          <span>{item.priceDZD} DZD</span>
                          <span className="text-[9px] text-slate-400">✎</span>
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleToggleStock(item)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-black transition-colors ${
                          item.isAvailable 
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
                            : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                        }`}
                      >
                        {item.isAvailable ? (isAr ? 'متوفر ✓' : 'In Stock') : (isAr ? 'نفذت الكمية ✕' : 'Out of Stock')}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleToggleStock(item)}
                        className="text-xs text-slate-600 hover:text-[#2D5A27] font-bold"
                      >
                        {item.isAvailable ? (isAr ? 'تعطيل' : 'Disable') : (isAr ? 'تفعيل' : 'Enable')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* TAB 2: LIVE ORDERS */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h3 className="font-extrabold text-slate-900 text-base">
            {isAr ? 'الطلبات النشطة الحالية لتوصيل ميلة' : 'Active Orders Queue in Mila'}
          </h3>

          <div className="space-y-3">
            {simulatedOrders.map(order => (
              <div 
                key={order.id} 
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-xs text-[#2D5A27] bg-emerald-100 px-2 py-0.5 rounded">
                      {order.id}
                    </span>
                    <span className="font-bold text-slate-900 text-sm">{order.customer}</span>
                    <span className="text-xs text-slate-500">({order.phone})</span>
                  </div>
                  <div className="text-xs text-slate-600 mt-1">
                    📍 {order.commune} • ⏰ {order.slot}
                  </div>
                  <div className="text-xs text-emerald-800 font-semibold mt-0.5">
                    {order.items} • <span className="text-slate-500">{order.macros}</span>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between">
                  <div className="text-base font-black text-[#2D5A27]">
                    {order.totalDZD} DZD
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase mt-1 ${
                    order.status === 'preparing' ? 'bg-amber-100 text-amber-800' :
                    order.status === 'out_for_delivery' ? 'bg-blue-100 text-blue-800' :
                    'bg-emerald-100 text-emerald-800'
                  }`}>
                    {order.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SUBSCRIPTIONS */}
      {activeTab === 'subscriptions' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h3 className="font-extrabold text-slate-900 text-base">
            {isAr ? 'عقود الاشتراكات للصالات والمؤسسات' : 'Active Subscription Contracts in Mila'}
          </h3>

          <div className="space-y-3">
            {simulatedSubscriptions.map(sub => (
              <div 
                key={sub.id} 
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-xs text-[#FDB813] bg-[#1A3317] px-2 py-0.5 rounded">
                      {sub.id}
                    </span>
                    <span className="font-bold text-slate-900 text-sm">{sub.customer}</span>
                  </div>
                  <div className="text-xs text-slate-600 mt-1">
                    🎯 {sub.plan} • 🏢 {sub.gym}
                  </div>
                  <div className="text-xs text-emerald-700 font-semibold mt-0.5">
                    ⏰ {sub.slot} • تجديد العقد: {sub.renewDate}
                  </div>
                </div>

                <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full uppercase">
                  {sub.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </section>
  );
};

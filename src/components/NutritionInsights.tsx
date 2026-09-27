import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Flame, 
  Dumbbell, 
  Clock, 
  Brain, 
  Zap, 
  Lightbulb, 
  UtensilsCrossed, 
  ArrowRight, 
  CheckCircle2, 
  RefreshCw,
  HeartPulse,
  Sliders,
  ChevronLeft
} from 'lucide-react';
import { Language } from '../types';

interface NutritionInsightsProps {
  lang: Language;
  onApplyRecommendedBowl?: (combo: {
    proteinName: string;
    carbsName: string;
    addonName: string;
    drinkName: string;
  }) => void;
  onNavigateToBuilder?: () => void;
}

interface MealTip {
  timeSlot: string;
  tipTitle: string;
  recommendation: string;
  recommendedBrunchyMeal: string;
}

interface InsightsData {
  macroAssessment: string;
  mealTimingTips: MealTip[];
  actionableDietHack: string;
  suggestedBrunchyBowlCombo: {
    proteinChoice: string;
    carbsChoice: string;
    addonChoice: string;
    drinkChoice: string;
    reasoning: string;
  };
}

export const NutritionInsights: React.FC<NutritionInsightsProps> = ({
  lang,
  onApplyRecommendedBowl,
  onNavigateToBuilder
}) => {
  const isAr = lang === 'ar';

  // Macro Goals State
  const [selectedGoalPreset, setSelectedGoalPreset] = useState<string>('muscle_growth');
  const [calories, setCalories] = useState<number>(2350);
  const [protein, setProtein] = useState<number>(150);
  const [carbs, setCarbs] = useState<number>(210);
  const [fat, setFat] = useState<number>(55);
  const [activitySlot, setActivitySlot] = useState<string>(
    isAr ? 'تمرين مسائي في قاعات ميلة (16:30 - 18:00)' : 'Evening Gym in Mila (16:30 - 18:00)'
  );

  // AI Generation State
  const [loading, setLoading] = useState<boolean>(false);
  const [insights, setInsights] = useState<InsightsData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Goal Presets
  const presets = [
    {
      id: 'muscle_growth',
      titleEn: 'Muscle Growth (Hypertrophy)',
      titleAr: 'بناء عضلي وتضخيم نقي',
      calories: 2450,
      protein: 160,
      carbs: 220,
      fat: 60,
      slotEn: 'Evening Gym Session (16:30 - 18:00)',
      slotAr: 'تمرين مسائي في صالات ميلة (16:30 - 18:00)'
    },
    {
      id: 'fat_loss',
      titleEn: 'Fat Loss & Lean Muscle',
      titleAr: 'تنشيف وحرق دهون مع ثبات العضل',
      calories: 1850,
      protein: 150,
      carbs: 140,
      fat: 45,
      slotEn: 'Morning Cardio + Afternoon Lift (17:00)',
      slotAr: 'كارديو صباحي + تدريب بعد العصر (17:00)'
    },
    {
      id: 'corporate_energy',
      titleEn: 'Corporate Focus & Sustained Energy',
      titleAr: 'طاقة المكاتب والتركيز الذهني بدون خمول',
      calories: 2050,
      protein: 130,
      carbs: 180,
      fat: 50,
      slotEn: 'Office Lunch Break (12:00 - 13:00)',
      slotAr: 'استراحة غداء العمل (12:00 - 13:00)'
    },
    {
      id: 'endurance',
      titleEn: 'Endurance & Stamina',
      titleAr: 'قوة تحمل وجري هوائي',
      calories: 2350,
      protein: 125,
      carbs: 260,
      fat: 55,
      slotEn: 'Early Morning Run / Endurance (07:00)',
      slotAr: 'جري صباحي أو لياقة بدنية (07:00)'
    }
  ];

  const handleSelectPreset = (p: typeof presets[0]) => {
    setSelectedGoalPreset(p.id);
    setCalories(p.calories);
    setProtein(p.protein);
    setCarbs(p.carbs);
    setFat(p.fat);
    setActivitySlot(isAr ? p.slotAr : p.slotEn);
  };

  // Fetch Insights from backend Gemini API
  const generateInsights = async () => {
    setLoading(true);
    setErrorMsg(null);

    const goalObj = presets.find(p => p.id === selectedGoalPreset);
    const goalTitle = isAr ? goalObj?.titleAr : goalObj?.titleEn;

    try {
      const res = await fetch('/api/nutrition-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          goal: goalTitle || 'Athletic Precision Nutrition',
          calories,
          protein,
          carbs,
          fat,
          activitySlot,
          language: lang,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch insights from Gemini server.');
      }

      const data = await res.json();
      if (data.insights) {
        setInsights(data.insights);
      } else {
        throw new Error('No insights returned.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(
        isAr 
          ? 'تعذر الاتصال بخدمة الذكاء الاصطناعي مؤقتاً، تم عرض النصائح التغذوية القياسية المعتمدة.'
          : 'Unable to reach Gemini API temporarily. Showing calibrated baseline advice.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Initial load once on mount
  useEffect(() => {
    generateInsights();
  }, [lang]);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-100 to-emerald-100 text-[#2D5A27] text-xs font-black uppercase tracking-wider shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#FDB813]" />
          <span>{isAr ? 'نظام التحليل الذكي عبر Gemini' : 'Powered by Gemini 3.8'}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1A3317] tracking-tight">
          {isAr ? 'رؤى وتوجيهات التغذية الذكية (Nutrition Insights)' : 'AI Daily Nutrition Insights'}
        </h2>
        <p className="text-slate-600 text-sm sm:text-base">
          {isAr 
            ? 'حدد أهداف الماكروز اليومية وساعات نشاطك الرياضي أو الوظيفي في ميلة، ليقوم مستشار التغذية الذكي باقتراح التوقيت الأمثل للوجبات وتركيبات الصحون الصحية المتوافقة مع معيار 150غ بروتين + 200غ طبق أساسي.'
            : 'Calibrate your daily macro goals and workout timing. Our Gemini engine provides precision meal timing, recovery tips, and tailored bowl combinations.'}
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Controller: Goal & Macro Adjuster (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-lg space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-[#2D5A27]" />
                <h3 className="font-extrabold text-base text-[#1A3317]">
                  {isAr ? 'ضبط أهداف الماكروز اليومية' : 'Configure Macro Targets'}
                </h3>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                {isAr ? 'حسب معيار ميلة' : 'Mila Standard'}
              </span>
            </div>

            {/* Presets Grid */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                {isAr ? 'اختر الهدف الأساسي:' : 'Select Primary Goal:'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {presets.map((p) => {
                  const isSelected = selectedGoalPreset === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => handleSelectPreset(p)}
                      className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#2D5A27] bg-emerald-50/70 shadow-sm'
                          : 'border-slate-100 bg-slate-50/60 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[10px] font-black uppercase ${isSelected ? 'text-[#2D5A27]' : 'text-slate-400'}`}>
                          {p.calories} kcal
                        </span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#2D5A27]" />}
                      </div>
                      <span className="font-bold text-xs text-[#1A3317] line-clamp-1">
                        {isAr ? p.titleAr : p.titleEn}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sliders & Granular Controls */}
            <div className="space-y-4 pt-1">
              
              {/* Calories */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-700 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-[#FDB813]" />
                    {isAr ? 'السعرات المستهدفة:' : 'Target Calories:'}
                  </span>
                  <span className="font-mono text-emerald-800">{calories} kcal</span>
                </div>
                <input
                  type="range"
                  min={1400}
                  max={3400}
                  step={50}
                  value={calories}
                  onChange={(e) => setCalories(Number(e.target.value))}
                  className="w-full accent-[#2D5A27] cursor-pointer"
                />
              </div>

              {/* Protein */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-700 flex items-center gap-1">
                    <Dumbbell className="w-3.5 h-3.5 text-[#2D5A27]" />
                    {isAr ? 'البروتين المستهدف:' : 'Target Protein:'}
                  </span>
                  <span className="font-mono text-[#2D5A27] font-black">{protein}g</span>
                </div>
                <input
                  type="range"
                  min={90}
                  max={220}
                  step={5}
                  value={protein}
                  onChange={(e) => setProtein(Number(e.target.value))}
                  className="w-full accent-[#2D5A27] cursor-pointer"
                />
                <span className="text-[10px] text-slate-400">
                  {isAr ? 'معيارنا الثابت: 150غ صافي لكل وجبة رئيسية' : 'Brand standard: 150g pure protein per main meal'}
                </span>
              </div>

              {/* Carbs */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-700 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    {isAr ? 'الكاربوهيدرات المعقدة:' : 'Complex Carbs:'}
                  </span>
                  <span className="font-mono text-amber-700 font-black">{carbs}g</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={350}
                  step={10}
                  value={carbs}
                  onChange={(e) => setCarbs(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <span className="text-[10px] text-slate-400">
                  {isAr ? 'معيارنا الثابت: 200غ طبق أساسي (بسمتي، برغل، بطاطا)' : 'Brand standard: 200g base carbs (Basmati, Bulgur, Potato)'}
                </span>
              </div>

              {/* Fat */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-700">{isAr ? 'الدهون الصحية:' : 'Healthy Fats:'}</span>
                  <span className="font-mono text-slate-700 font-bold">{fat}g</span>
                </div>
                <input
                  type="range"
                  min={30}
                  max={90}
                  step={5}
                  value={fat}
                  onChange={(e) => setFat(Number(e.target.value))}
                  className="w-full accent-slate-600 cursor-pointer"
                />
              </div>

              {/* Activity / Delivery Timing */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#2D5A27]" />
                  {isAr ? 'توقيت التمرين أو وجبة الدوام في ميلة:' : 'Training / Work Schedule in Mila:'}
                </label>
                <select
                  value={activitySlot}
                  onChange={(e) => setActivitySlot(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#2D5A27]"
                >
                  <option value="تمرين مسائي في صالات ميلة (16:30 - 18:00)">
                    {isAr ? 'تمرين مسائي في صالات ميلة (16:30 - 18:00)' : 'Evening Gym in Mila (16:30 - 18:00)'}
                  </option>
                  <option value="تمرين ليلي متأخر (19:00 - 20:30)">
                    {isAr ? 'تمرين ليلي متأخر (19:00 - 20:30)' : 'Late Night Workout (19:00 - 20:30)'}
                  </option>
                  <option value="استراحة غداء العمل بالمكاتب والبنوك (12:00 - 13:00)">
                    {isAr ? 'استراحة غداء العمل بالمكاتب والبنوك (12:00 - 13:00)' : 'Corporate Office Lunch (12:00 - 13:00)'}
                  </option>
                  <option value="تمرين صباحي باكر (07:00 - 08:30)">
                    {isAr ? 'تمرين صباحي باكر (07:00 - 08:30)' : 'Early Morning Session (07:00 - 08:30)'}
                  </option>
                </select>
              </div>

            </div>

            {/* Generate Button */}
            <button
              onClick={generateInsights}
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#2D5A27] via-emerald-800 to-[#1A3317] hover:from-[#356d2e] hover:to-[#22441e] text-white font-extrabold text-xs sm:text-sm shadow-xl transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-75"
            >
              <RefreshCw className={`w-4 h-4 text-[#FDB813] ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform'}`} />
              <span>
                {loading 
                  ? (isAr ? 'جاري استدعاء محرك الذكاء الاصطناعي Gemini...' : 'Generating Insights with Gemini...') 
                  : (isAr ? 'توليد نصائح التغذية الذكية' : 'Generate AI Nutrition Insights')}
              </span>
            </button>

          </div>
        </div>

        {/* Right Output: Insights Display (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {loading ? (
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#2D5A27] flex items-center justify-center mx-auto animate-pulse">
                <Brain className="w-7 h-7 text-[#FDB813]" />
              </div>
              <h3 className="font-extrabold text-base text-[#1A3317]">
                {isAr ? 'يقوم نموذج Gemini بتحليل توزيع الماكروز الآن...' : 'Gemini is analyzing your macro distribution...'}
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                {isAr 
                  ? 'نقوم بحساب توقيتات إمداد الأحماض الأمينية واستشفاء الجليكوجين بناءً على قائمة وجبات Healthy Brunchy -Sol+ المعتمدة بميلة.' 
                  : 'Synthesizing clinical meal timing, glycogen replenishment windows, and 150g protein portion optimization.'}
              </p>
              <div className="w-48 h-2 rounded-full bg-slate-100 mx-auto overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#FDB813] to-[#2D5A27] animate-pulse w-3/4" />
              </div>
            </div>
          ) : insights ? (
            <div className="space-y-5">
              
              {/* Card 1: Macro Assessment */}
              <div className="bg-gradient-to-r from-[#183813] to-[#2D5A27] text-white rounded-3xl p-6 shadow-xl border border-emerald-500/40 relative overflow-hidden">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-[#FDB813] text-[#1A3317] flex items-center justify-center font-bold text-xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-amber-200">
                    {isAr ? 'التقييم العلمي للماكروز' : 'Scientific Macro Evaluation'}
                  </span>
                </div>
                <p className="text-sm sm:text-base font-semibold text-slate-100 leading-relaxed">
                  {insights.macroAssessment}
                </p>
                <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs text-emerald-200">
                  <span>🔥 {calories} kcal Total</span>
                  <span>💪 {protein}g Target Protein</span>
                  <span>🌾 {carbs}g Complex Carbs</span>
                </div>
              </div>

              {/* Card 2: Meal Timing Tips */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-md space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#2D5A27]" />
                    <h3 className="font-extrabold text-base text-[#1A3317]">
                      {isAr ? 'التوقيت الأمثل لتناول الوجبات (Meal Timing)' : 'Precision Meal Timing Protocol'}
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-slate-400">
                    {insights.mealTimingTips.length} {isAr ? 'توصيات زمنية' : 'time windows'}
                  </span>
                </div>

                <div className="space-y-3">
                  {insights.mealTimingTips.map((tip, idx) => (
                    <div 
                      key={idx} 
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-emerald-300 transition-colors space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase text-[#2D5A27] bg-emerald-100/80 px-2 py-0.5 rounded-md">
                          ⏰ {tip.timeSlot}
                        </span>
                        <span className="text-xs font-black text-slate-800">
                          {tip.tipTitle}
                        </span>
                      </div>
                      
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {tip.recommendation}
                      </p>

                      <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">
                          {isAr ? 'الطبق المعتمد الموصى به:' : 'Recommended Brunchy Dish:'}
                        </span>
                        <span className="font-extrabold text-emerald-800 flex items-center gap-1">
                          <UtensilsCrossed className="w-3.5 h-3.5 text-[#FDB813]" />
                          {tip.recommendedBrunchyMeal}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 3: Actionable Diet Hack & Suggested Bowl Combo */}
              <div className="grid sm:grid-cols-1 gap-5">
                
                {/* Practical Diet Hack */}
                <div className="bg-amber-50/80 rounded-3xl p-5 border border-amber-200/80 shadow-xs flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#FDB813] text-[#1A3317] flex items-center justify-center shrink-0 font-bold shadow-xs">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase text-amber-900 tracking-wider">
                      {isAr ? 'نصيحة ذهبية للامتصاص والهضم' : 'Bio-Availability & Digestion Hack'}
                    </div>
                    <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                      {insights.actionableDietHack}
                    </p>
                  </div>
                </div>

                {/* Suggested Brunchy Bowl Combo */}
                {insights.suggestedBrunchyBowlCombo && (
                  <div className="bg-white rounded-3xl p-6 border-2 border-[#2D5A27]/30 shadow-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-[#2D5A27] text-[#FDB813] flex items-center justify-center font-bold">
                          <UtensilsCrossed className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-black text-sm text-[#1A3317]">
                            {isAr ? 'تركيبة الصحن المقترحة من الشيف (Sol+ Bowl)' : 'Chef-Suggested Sol+ Custom Bowl'}
                          </h4>
                          <span className="text-[10px] text-slate-400">
                            150g Protein + 200g Carbs + Fitness Add-on + Drink
                          </span>
                        </div>
                      </div>

                      {onNavigateToBuilder && (
                        <button
                          onClick={onNavigateToBuilder}
                          className="px-3 py-1.5 rounded-xl bg-[#FDB813] hover:bg-amber-400 text-[#1A3317] text-xs font-black transition-all flex items-center gap-1 shadow-xs"
                        >
                          <span>{isAr ? 'فتح حاسبة الماكروز' : 'Assemble Now'}</span>
                          {isAr ? <ChevronLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                        </button>
                      )}
                    </div>

                    {/* Breakdown items */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                      <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
                        <div className="text-[10px] text-emerald-800 font-bold uppercase">{isAr ? 'بروتين (150غ)' : 'Protein'}</div>
                        <div className="font-extrabold text-[#1A3317] mt-0.5">{insights.suggestedBrunchyBowlCombo.proteinChoice}</div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-100">
                        <div className="text-[10px] text-amber-800 font-bold uppercase">{isAr ? 'كارب (200غ)' : 'Carbs'}</div>
                        <div className="font-extrabold text-[#1A3317] mt-0.5">{insights.suggestedBrunchyBowlCombo.carbsChoice}</div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="text-[10px] text-slate-500 font-bold uppercase">{isAr ? 'سناك / مقبلة' : 'Add-on'}</div>
                        <div className="font-extrabold text-[#1A3317] mt-0.5">{insights.suggestedBrunchyBowlCombo.addonChoice}</div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100">
                        <div className="text-[10px] text-blue-800 font-bold uppercase">{isAr ? 'مشروب طبيعي' : 'Juice / Detox'}</div>
                        <div className="font-extrabold text-[#1A3317] mt-0.5">{insights.suggestedBrunchyBowlCombo.drinkChoice}</div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                      <strong>{isAr ? 'سبب التوصية:' : 'Scientific rationale:'}</strong> {insights.suggestedBrunchyBowlCombo.reasoning}
                    </p>
                  </div>
                )}

              </div>

            </div>
          ) : null}

        </div>

      </div>

    </section>
  );
};

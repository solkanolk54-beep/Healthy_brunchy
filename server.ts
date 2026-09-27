import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

// Initialize GoogleGenAI client on the server
const apiKey = process.env.GEMINI_API_KEY || '';
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// POST endpoint for Nutrition Insights
app.post('/api/nutrition-insights', async (req, res) => {
  try {
    const { goal, calories, protein, carbs, fat, activitySlot, language } = req.body;

    const isAr = language === 'ar';

    // If API key is missing or AI client is not initialized, return a high-quality tailored fallback
    if (!ai || !apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      return res.json({
        success: true,
        isFallback: true,
        insights: {
          macroAssessment: isAr
            ? `استناداً إلى هدفك (${goal})، توزيع الماكروز (${protein}غ بروتين، ${carbs}غ كارب، ${fat}غ دهون) يحقق توازناً مثالياً للبناء العضلي وتجنب الخمول بعد الوجبات.`
            : `Based on your goal (${goal}), your macro targets (${protein}g Protein, ${carbs}g Carbs, ${fat}g Fat) provide an optimal amino acid pool for muscle recovery while preventing mid-day glycemic crashes.`,
          mealTimingTips: [
            {
              timeSlot: isAr ? 'قبل التمرين / الغداء (12:00 - 16:30)' : 'Pre-Workout / Midday (12:00 - 16:30)',
              tipTitle: isAr ? 'شحن الجليكوجين بالكارب المعقد' : 'Glycogen Priming with Complex Carbs',
              recommendation: isAr
                ? 'تناول وجبة متوازنة تحتوي على 200غ من أرز البسمتي أو البرغل بالخضار قبل التمرين بساعتين لضمان استقرار سكر الدم.'
                : 'Consume your 200g complex carbs (Basmati rice or vegetables bulgur) ~2 hours before physical exertion for sustained intracellular energy.',
              recommendedBrunchyMeal: isAr ? 'أرز بالخضار في الفرن + دجاج مشوي 150غ' : 'Baked Oven Rice with Veggies + 150g Grilled Chicken'
            },
            {
              timeSlot: isAr ? 'بعد التمرين (19:00 - 20:30)' : 'Post-Workout Anabolic Window (19:00 - 20:30)',
              tipTitle: isAr ? 'استشفاء ليفي سريع بالبروتين النقي' : 'High-Leucine Protein Synthesis',
              recommendation: isAr
                ? 'يحتاج جسمك إلى 40-48غ بروتين كامل ذو قيمة حيوية عالية مع خضار سلق أو غراتان صحي خفيف.'
                : 'Target 40-48g of fast-assimilating protein with low dietary lipids to optimize MPS and repair micro-tears.',
              recommendedBrunchyMeal: isAr ? 'ستيك لحم بقري طري 150غ أو سمك متبل بالفرن' : 'Tender Beef Steak Meal 150g or Baked White Fish'
            }
          ],
          actionableDietHack: isAr
            ? 'احرص على شرب ديتوكس Sol+ الأخضر أو عصير الليمون الطبيعي بدون سكر قبل الوجبة بـ 15 دقيقة لتحفيز الإنزيمات الهاضمة ومضاعفة امتصاص الحديد والزنك.'
            : 'Drink the Sol+ Green Detox with mint and lemon 15 minutes before high-protein meals to activate digestive enzymes and maximize micronutrient absorption.',
          suggestedBrunchyBowlCombo: {
            proteinChoice: isAr ? 'صدر دجاج مشوي متبل (150غ صافي)' : 'Grilled Chicken Breast (150g Net)',
            carbsChoice: isAr ? 'أرز بسمتي فاخر (200غ)' : 'Aromatic Basmati Rice (200g)',
            addonChoice: isAr ? 'ميني كيش بالسبانخ والبيض' : 'Mini Spinach & Egg Quiche',
            drinkChoice: isAr ? 'ديتوكس أخضر صحي Sol+' : 'Sol+ Green Detox Cleanser',
            reasoning: isAr
              ? 'هذه التشكيلة توفر 48غ بروتين عالي النقاوة، 58غ كاربوهيدرات بطيئة الاحتراق، ومضادات أكسدة طبيعية لدعم النشاط طوال اليوم في ميلة.'
              : 'Delivers 48g pure protein, 58g slow-burning carbs, and raw green phytonutrients perfectly fitting your athletic target.'
          }
        }
      });
    }

    // Call Gemini API using gemini-3.8-flash with structured JSON response
    const prompt = `You are the Head Sports Nutritionist and Executive Chef at "Healthy Brunchy -Sol+" in Mila, Algeria.
Our brand philosophy is "Precision Nutrition based on standard macros: 150g pure protein + 200g base main dish" with zero unhealthy oils and calculated macros.

The user has set the following daily macro goals and lifestyle parameters:
- Goal: ${goal}
- Target Daily Calories: ${calories} kcal
- Target Daily Protein: ${protein} grams
- Target Daily Carbs: ${carbs} grams
- Target Daily Fat: ${fat} grams
- Activity / Delivery Window: ${activitySlot}
- Preferred Language: ${isAr ? 'Arabic' : 'English'}

Provide actionable, scientific, and motivating nutrition insights tailored to Healthy Brunchy -Sol+'s exact menu and portion standards (150g Protein + 200g Base Carbs, Healthy Addons, Detox Juices).
Respond ONLY in valid JSON matching the schema provided.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: `You are an expert sports dietitian and nutritionist for Healthy Brunchy -Sol+ in Mila, Algeria. Language required: ${isAr ? 'Arabic' : 'English'}. Provide specific, inspiring advice emphasizing 150g protein and 200g base carbs.`,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            macroAssessment: {
              type: Type.STRING,
              description: 'Scientific assessment of the macro distribution for their specific goal in 1-2 punchy sentences.',
            },
            mealTimingTips: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  timeSlot: { type: Type.STRING },
                  tipTitle: { type: Type.STRING },
                  recommendation: { type: Type.STRING },
                  recommendedBrunchyMeal: { type: Type.STRING },
                },
                required: ['timeSlot', 'tipTitle', 'recommendation', 'recommendedBrunchyMeal'],
              },
            },
            actionableDietHack: {
              type: Type.STRING,
              description: 'Specific practical tip for hydration, digestion, or clean energy.',
            },
            suggestedBrunchyBowlCombo: {
              type: Type.OBJECT,
              properties: {
                proteinChoice: { type: Type.STRING },
                carbsChoice: { type: Type.STRING },
                addonChoice: { type: Type.STRING },
                drinkChoice: { type: Type.STRING },
                reasoning: { type: Type.STRING },
              },
              required: ['proteinChoice', 'carbsChoice', 'addonChoice', 'drinkChoice', 'reasoning'],
            },
          },
          required: [
            'macroAssessment',
            'mealTimingTips',
            'actionableDietHack',
            'suggestedBrunchyBowlCombo',
          ],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({
      success: true,
      insights: parsed,
    });
  } catch (error: any) {
    console.error('Error generating nutrition insights:', error);
    // Graceful fallback
    const isAr = req.body?.language === 'ar';
    return res.json({
      success: true,
      isFallback: true,
      insights: {
        macroAssessment: isAr
          ? 'توزيع الماكروز المختار يدعم استشفاء العضلات بنسبة عالية من البروتين الصافي مع تحكم دقيق في مستويات الأنسولين.'
          : 'Your selected macro ratios supply optimal branched-chain amino acids (BCAAs) with clean low-glycemic fuel.',
        mealTimingTips: [
          {
            timeSlot: isAr ? 'الغداء / قبل التمرين' : 'Midday / Pre-Workout',
            tipTitle: isAr ? 'طاقة مستدامة بدون تخمة' : 'Sustained Cellular Energy',
            recommendation: isAr
              ? 'اختر 200غ من أرز البسمتي أو البرغل مع 150غ دجاج أو لحم مشوي.'
              : 'Choose 200g Basmati Rice or Vegetables Bulgur with 150g lean grilled protein.',
            recommendedBrunchyMeal: isAr ? 'وجبة أرز بالشعيرية مع دجاج مشوي' : 'Vermicelli Rice Meal with 150g Grilled Chicken'
          }
        ],
        actionableDietHack: isAr
          ? 'احرص على شرب 500 مل من الماء مع عصير الليمون أو الديتوكس قبل الوجبة بـ 15 دقيقة لتحسين كفاءة الهضم.'
          : 'Drink 500ml of water with cold lemon or detox elixir 15 minutes prior to meals for maximum nutrient uptake.',
        suggestedBrunchyBowlCombo: {
          proteinChoice: isAr ? 'صدر دجاج مشوي متبل (150غ)' : 'Grilled Chicken Breast (150g)',
          carbsChoice: isAr ? 'أرز بسمتي عطري (200غ)' : 'Aromatic Basmati Rice (200g)',
          addonChoice: isAr ? 'شورما دجاج صحية ملفوفة' : 'Healthy Chicken Shawarma Roll',
          drinkChoice: isAr ? 'ديتوكس أخضر صحي Sol+' : 'Sol+ Green Detox Cleanser',
          reasoning: isAr
            ? 'تركيبة متكاملة تعطي أكثر من 48غ بروتين مع طاقة مستقرة بدون أي دهون مهدرجة.'
            : 'Comprehensive meal combo providing 48g+ pure protein with zero trans-fats.'
        }
      }
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve('dist/index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer();

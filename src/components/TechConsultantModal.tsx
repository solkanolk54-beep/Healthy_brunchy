import React, { useState } from 'react';
import { 
  X, 
  Code2, 
  Database, 
  Palette, 
  Copy, 
  Check, 
  Layers, 
  Terminal, 
  Cpu, 
  Sparkles,
  FileCode,
  Smartphone
} from 'lucide-react';
import { 
  FIGMA_DESIGN_SYSTEM, 
  POSTGRES_DDL, 
  MONGO_SCHEMAS, 
  ARCHITECTURE_BOILERPLATES 
} from '../data/techSpecs';
import { Language } from '../types';

interface TechConsultantModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const TechConsultantModal: React.FC<TechConsultantModalProps> = ({
  isOpen,
  onClose,
  lang
}) => {
  if (!isOpen) return null;

  const isAr = lang === 'ar';
  const [activeTab, setActiveTab] = useState<'figma' | 'postgres' | 'mongo' | 'boilerplate'>('figma');
  const [boilerplateChoice, setBoilerplateChoice] = useState<'nextjs' | 'expressNode' | 'fastapiPython' | 'flutter'>('nextjs');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopy = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
      <div className="relative w-full max-w-5xl bg-slate-900 text-white rounded-3xl shadow-2xl border border-emerald-500/40 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 border-b border-emerald-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#FDB813] to-amber-500 text-[#1A3317] flex items-center justify-center font-black shadow-lg">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-base sm:text-lg text-white">
                  {isAr ? 'المخطط المعماري الهندسي ومنظومة التصميم' : 'Lead Architect & UI/UX Consultant Blueprint'}
                </h2>
                <span className="bg-[#2D5A27] text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/40">
                  Figma + DB + Clean Arch
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Healthy Brunchy -Sol+ (Mila, Algeria) • Production-ready deliverables
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

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 p-3 bg-slate-950 border-b border-slate-800 overflow-x-auto no-scrollbar text-xs font-bold">
          <button
            onClick={() => setActiveTab('figma')}
            className={`py-2 px-3.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'figma' 
                ? 'bg-[#FDB813] text-[#1A3317] shadow-md' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>{isAr ? '1. منظومة التصميم (Figma UI/UX)' : '1. Figma UI/UX Design System'}</span>
          </button>

          <button
            onClick={() => setActiveTab('postgres')}
            className={`py-2 px-3.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'postgres' 
                ? 'bg-[#2D5A27] text-white shadow-md' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Database className="w-4 h-4 text-emerald-300" />
            <span>{isAr ? '2. قاعدة البيانات (PostgreSQL DDL)' : '2. PostgreSQL DDL Schema'}</span>
          </button>

          <button
            onClick={() => setActiveTab('mongo')}
            className={`py-2 px-3.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'mongo' 
                ? 'bg-[#2D5A27] text-white shadow-md' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-4 h-4 text-emerald-300" />
            <span>{isAr ? '3. مخطط MongoDB (Mongoose)' : '3. MongoDB Mongoose Schemas'}</span>
          </button>

          <button
            onClick={() => setActiveTab('boilerplate')}
            className={`py-2 px-3.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'boilerplate' 
                ? 'bg-[#2D5A27] text-white shadow-md' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Terminal className="w-4 h-4 text-[#FDB813]" />
            <span>{isAr ? '4. هيكل Clean Architecture (Frontend & Backend)' : '4. Clean Architecture Boilerplates'}</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* TAB 1: FIGMA DESIGN SYSTEM */}
          {activeTab === 'figma' && (
            <div className="space-y-6">
              
              {/* Brand Overview */}
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                <span className="text-[11px] font-black uppercase text-[#FDB813] tracking-wider">
                  Brand Identity & Aesthetics
                </span>
                <h3 className="text-xl font-black text-white">
                  {FIGMA_DESIGN_SYSTEM.brandName} — {FIGMA_DESIGN_SYSTEM.location}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Sporty, modern identity blending <strong className="text-emerald-400">#2D5A27 Dark Green</strong> (nature/health), <strong className="text-[#FDB813]">#FDB813 Sun Yellow</strong> (energy/Sol+), and organic wood textures. Core Value Proposition: <em>{FIGMA_DESIGN_SYSTEM.coreProposition}</em>.
                </p>
              </div>

              {/* Color Tokens Matrix */}
              <div>
                <h4 className="font-extrabold text-sm text-emerald-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-[#FDB813]" />
                  <span>Color Tokens (Figma Variables)</span>
                </h4>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {FIGMA_DESIGN_SYSTEM.colorTokens.map((token, idx) => (
                    <div 
                      key={idx} 
                      className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700 flex flex-col justify-between"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div 
                          className="w-10 h-10 rounded-xl border border-white/20 shadow-md shrink-0" 
                          style={{ backgroundColor: token.hex }}
                        />
                        <div>
                          <div className="font-bold text-xs text-white">{token.role}</div>
                          <div className="text-[11px] font-mono text-[#FDB813]">{token.hex}</div>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-tight">
                        {token.usage}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typography Specs */}
              <div>
                <h4 className="font-extrabold text-sm text-emerald-300 uppercase tracking-wider mb-3">
                  Typography Scale (Cairo for Arabic + Plus Jakarta Sans for Latin)
                </h4>
                <div className="overflow-x-auto rounded-2xl border border-slate-700 bg-slate-800/60">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900 text-slate-400 uppercase font-bold border-b border-slate-700">
                      <tr>
                        <th className="py-2.5 px-3">Level</th>
                        <th className="py-2.5 px-3">Size</th>
                        <th className="py-2.5 px-3">Weight</th>
                        <th className="py-2.5 px-3">Usage</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/60">
                      {FIGMA_DESIGN_SYSTEM.typography.scale.map((scale, i) => (
                        <tr key={i} className="hover:bg-slate-700/40">
                          <td className="py-2.5 px-3 font-bold text-white">{scale.name}</td>
                          <td className="py-2.5 px-3 font-mono text-emerald-300">{scale.size}</td>
                          <td className="py-2.5 px-3 text-slate-300">{scale.weight}</td>
                          <td className="py-2.5 px-3 text-slate-400">{scale.usage}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Layout Grids & Spacing */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-2">
                  <h5 className="font-bold text-xs uppercase text-[#FDB813]">Grid Breakpoints</h5>
                  <ul className="text-xs text-slate-300 space-y-1">
                    <li>• <strong>Desktop:</strong> {FIGMA_DESIGN_SYSTEM.layoutGuidelines.desktopGrid}</li>
                    <li>• <strong>Tablet:</strong> {FIGMA_DESIGN_SYSTEM.layoutGuidelines.tabletGrid}</li>
                    <li>• <strong>Mobile:</strong> {FIGMA_DESIGN_SYSTEM.layoutGuidelines.mobileGrid}</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-2">
                  <h5 className="font-bold text-xs uppercase text-[#FDB813]">Spacings & Radii</h5>
                  <ul className="text-xs text-slate-300 space-y-1">
                    <li>• <strong>Spacing Unit:</strong> {FIGMA_DESIGN_SYSTEM.layoutGuidelines.spacingUnit}</li>
                    <li>• <strong>Border Radii:</strong> {FIGMA_DESIGN_SYSTEM.layoutGuidelines.cornerRadii}</li>
                  </ul>
                </div>
              </div>

              {/* Core Components Guidelines */}
              <div>
                <h4 className="font-extrabold text-sm text-emerald-300 uppercase tracking-wider mb-3">
                  Signature Custom Components Anatomy
                </h4>
                <div className="space-y-3">
                  {FIGMA_DESIGN_SYSTEM.componentSpecs.map((comp, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700">
                      <div className="font-bold text-sm text-white flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#FDB813]" />
                        <span>{comp.name}</span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1">{comp.description}</p>
                      {comp.states && (
                        <div className="text-[11px] text-amber-300 mt-1 font-mono">
                          States: {comp.states}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: POSTGRESQL DDL */}
          {activeTab === 'postgres' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-emerald-300">
                    Production PostgreSQL Relational Schema (DDL)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Includes 10 normalized tables, UUID primary keys, check constraints, foreign keys, and indexes.
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(POSTGRES_DDL, 'postgres')}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md"
                >
                  {copiedSection === 'postgres' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === 'postgres' ? 'Copied to Clipboard!' : 'Copy SQL Script'}</span>
                </button>
              </div>

              <div className="relative">
                <pre className="p-4 rounded-2xl bg-black/80 border border-slate-800 text-[11px] font-mono text-emerald-200 overflow-x-auto leading-relaxed max-h-[500px]">
                  {POSTGRES_DDL}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: MONGODB MONGOOSE */}
          {activeTab === 'mongo' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-emerald-300">
                    Production Mongoose Schemas (MongoDB / TypeScript)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Typed models with nested MacroNutrientsSchema, custom bowl validation, and subscriptions.
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(MONGO_SCHEMAS, 'mongo')}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md"
                >
                  {copiedSection === 'mongo' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === 'mongo' ? 'Copied to Clipboard!' : 'Copy Schemas'}</span>
                </button>
              </div>

              <div className="relative">
                <pre className="p-4 rounded-2xl bg-black/80 border border-slate-800 text-[11px] font-mono text-amber-200 overflow-x-auto leading-relaxed max-h-[500px]">
                  {MONGO_SCHEMAS}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 4: CLEAN ARCHITECTURE BOILERPLATES */}
          {activeTab === 'boilerplate' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-sm text-emerald-300">
                    Clean Architecture Boilerplate Code Structures
                  </h3>
                  <p className="text-xs text-slate-400">
                    Enterprise separation of concerns: Domain Entities, Use Cases, Repositories, Interfaces, and Drivers.
                  </p>
                </div>

                {/* Sub-selector */}
                <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl text-xs font-bold">
                  <button
                    onClick={() => setBoilerplateChoice('nextjs')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      boilerplateChoice === 'nextjs' ? 'bg-[#FDB813] text-[#1A3317]' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Next.js (Web)
                  </button>
                  <button
                    onClick={() => setBoilerplateChoice('expressNode')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      boilerplateChoice === 'expressNode' ? 'bg-[#FDB813] text-[#1A3317]' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Node.js Express
                  </button>
                  <button
                    onClick={() => setBoilerplateChoice('fastapiPython')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      boilerplateChoice === 'fastapiPython' ? 'bg-[#FDB813] text-[#1A3317]' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Python FastAPI
                  </button>
                  <button
                    onClick={() => setBoilerplateChoice('flutter')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      boilerplateChoice === 'flutter' ? 'bg-[#FDB813] text-[#1A3317]' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Flutter (App)
                  </button>
                </div>
              </div>

              <div className="relative">
                <button
                  onClick={() => handleCopy(ARCHITECTURE_BOILERPLATES[boilerplateChoice], boilerplateChoice)}
                  className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-[11px] flex items-center gap-1 transition-colors"
                >
                  {copiedSection === boilerplateChoice ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedSection === boilerplateChoice ? 'Copied' : 'Copy'}</span>
                </button>
                <pre className="p-4 rounded-2xl bg-black/85 border border-slate-800 text-[11px] font-mono text-cyan-200 overflow-x-auto leading-relaxed max-h-[500px]">
                  {ARCHITECTURE_BOILERPLATES[boilerplateChoice]}
                </pre>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Consultant Version 2.4 • Compliant with Healthy Brunchy -Sol+ Specifications</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-colors"
          >
            {isAr ? 'إغلاق المخطط' : 'Close Hub'}
          </button>
        </div>

      </div>
    </div>
  );
};

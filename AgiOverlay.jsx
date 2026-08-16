import { BrainCircuit, Cpu, X, Sparkles, Zap } from 'lucide-react';

const AgiOverlay = ({ isVisible, onToggle, agiState, agiLogs, onRunAgiTask, isAnalyzing }) => {
  if (!isVisible) return (
    <button
      onClick={onToggle}
      className="fixed bottom-6 left-6 z-40 bg-indigo-950/90 border border-indigo-500/50 hover:border-indigo-400 text-indigo-300 p-2.5 rounded-xl shadow-2xl flex items-center gap-2 transition-all group"
      title="Open AGI Engine Overlay"
    >
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
      </span>
      <BrainCircuit className="w-4 h-4 text-indigo-400" />
      <span className="text-xs font-semibold tracking-wider text-indigo-100 uppercase">AGI Layer</span>
    </button>
  );

  return (
    <div className="fixed bottom-6 left-6 z-40 w-96 glass-overlay rounded-2xl shadow-2xl p-4 border border-indigo-500/40 text-white transition-all animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center justify-between pb-3 border-b border-indigo-900/60">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-600/30 border border-indigo-500/50 text-indigo-300 animate-pulse">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-200">AGI Engine Core</h3>
              <span className="px-1.5 py-0.5 text-[9px] font-mono bg-indigo-500/20 text-indigo-300 rounded border border-indigo-500/30">
                Gemini 1.5
              </span>
            </div>
            <p className="text-[10px] text-slate-400">Autonomous Search Intelligence</p>
          </div>
        </div>
        <button onClick={onToggle} className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3 space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-400">Agent Status:</span>
          <span className="font-mono font-medium text-indigo-300 flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${isAnalyzing ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`}></span>
            {agiState.status}
          </span>
        </div>

        <div>
          <div className="flex justify-between text-[11px] text-slate-400 mb-1">
            <span>Reasoning Depth & Confidence</span>
            <span className="font-mono text-indigo-300">{(agiState.confidence * 100).toFixed(0)}%</span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-2 border border-slate-800 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${agiState.confidence * 100}%` }}
            />
          </div>
        </div>

        <div className="mt-3 bg-slate-950/90 rounded-xl p-3 border border-indigo-900/40 font-mono text-[11px] h-28 overflow-y-auto space-y-1.5">
          <div className="text-indigo-400 text-[10px] uppercase tracking-wider border-b border-slate-800 pb-1 mb-1">
            // System Thought Stream
          </div>
          {agiLogs.map((log, i) => (
            <div key={i} className="text-slate-300 flex items-start gap-1.5 leading-snug">
              <span className="text-indigo-500 select-none">&gt;</span>
              <span>{log}</span>
            </div>
          ))}
          {isAnalyzing && (
            <div className="text-amber-400 flex items-center gap-1 italic animate-pulse">
              <span>Synthesizing neural recommendations...</span>
            </div>
          )}
        </div>

        <div className="pt-2 flex gap-2">
          <button
            onClick={() => onRunAgiTask("Identify CTR Opportunities")}
            disabled={isAnalyzing}
            className="flex-1 py-1.5 px-2 bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 rounded-lg text-[11px] font-medium text-indigo-200 transition flex items-center justify-center gap-1 disabled:opacity-50"
          >
            <Sparkles className="w-3 h-3 text-indigo-400" />
            CTR Boost
          </button>
          <button
            onClick={() => onRunAgiTask("Analyze Query Anomalies")}
            disabled={isAnalyzing}
            className="flex-1 py-1.5 px-2 bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 rounded-lg text-[11px] font-medium text-purple-200 transition flex items-center justify-center gap-1 disabled:opacity-50"
          >
            <Zap className="w-3 h-3 text-purple-400" />
            Anomaly Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgiOverlay;
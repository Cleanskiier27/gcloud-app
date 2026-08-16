import { BarChart3, Activity, X, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatsOverlay = ({ metrics, isVisible, onToggle, liveTicks, autoSimulate, setAutoSimulate }) => {
  if (!isVisible) return (
    <button
      onClick={onToggle}
      className="fixed top-20 right-6 z-40 bg-slate-900/90 border border-slate-700/80 hover:border-sky-500 text-sky-400 p-2.5 rounded-xl shadow-2xl flex items-center gap-2 transition-all group"
      title="Open Stats Overlay"
    >
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
      </span>
      <BarChart3 className="w-4 h-4" />
      <span className="text-xs font-semibold tracking-wider text-slate-200 uppercase">Stats HUD</span>
    </button>
  );

  return (
    <div className="fixed top-20 right-6 z-40 w-80 glass-overlay rounded-2xl shadow-2xl p-4 border border-sky-500/30 text-white transition-all animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">Realtime Stats Overlay</h3>
            <p className="text-[10px] text-slate-400">Live Telemetry & Search HUD</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setAutoSimulate(!autoSimulate)}
            className={`p-1 px-2 text-[10px] rounded font-mono font-medium transition ${autoSimulate ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'}`}
            title="Toggle Real-time Tick Simulation"
          >
            {autoSimulate ? 'LIVE' : 'PAUSED'}
          </button>
          <button onClick={onToggle} className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-3">
        <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Total Clicks</span>
          <span className="text-base font-bold font-mono text-emerald-400">
            {(metrics.clicks + liveTicks).toLocaleString()}
          </span>
          <span className="text-[10px] text-emerald-400 flex items-center gap-0.5 mt-0.5">
            <TrendingUp className="w-3 h-3" /> +{metrics.changes.clicks}%
          </span>
        </div>

        <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Impressions</span>
          <span className="text-base font-bold font-mono text-sky-400">
            {((metrics.impressions + (liveTicks * 24)) / 1000000).toFixed(2)}M
          </span>
          <span className="text-[10px] text-sky-400 flex items-center gap-0.5 mt-0.5">
            <TrendingUp className="w-3 h-3" /> +{metrics.changes.impressions}%
          </span>
        </div>

        <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Avg CTR</span>
          <span className="text-base font-bold font-mono text-purple-400">
            {(metrics.ctr * 100).toFixed(2)}%
          </span>
          <span className="text-[10px] text-purple-400 flex items-center gap-0.5 mt-0.5">
            <ArrowUpRight className="w-3 h-3" /> +{metrics.changes.ctr}%
          </span>
        </div>

        <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Avg Position</span>
          <span className="text-base font-bold font-mono text-amber-400">
            {metrics.position.toFixed(1)}
          </span>
          <span className="text-[10px] text-amber-400 flex items-center gap-0.5 mt-0.5">
            <ArrowDownRight className="w-3 h-3" /> {metrics.changes.position} pos
          </span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-800">
        <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
          <span>Realtime Throughput</span>
          <span className="font-mono text-sky-400">{240 + (liveTicks % 40)} req/s</span>
        </div>
        <div className="h-8 flex items-end gap-1 bg-slate-950/80 p-1 rounded-lg border border-slate-850">
          {Array.from({ length: 20 }).map((_, idx) => <div key={idx} className="flex-1 bg-gradient-to-t from-sky-600 to-indigo-400 rounded-xs transition-all duration-300" style={{ height: `${Math.min(100, Math.max(20, (Math.sin(idx + liveTicks * 0.5) * 40 + 50) + (Math.random() * 15)))}%` }} />)}
        </div>
      </div>
    </div>
  );
};

export default StatsOverlay;
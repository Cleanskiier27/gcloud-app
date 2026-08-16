import { FileCheck, RefreshCw, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';
import { URL_INSPECTION_LIST } from '../data';

const UrlInspection = () => {
  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-emerald-400" />
            URL Indexing & Core Web Vitals
          </h2>
          <p className="text-xs text-slate-400">Chrome OS Dev Portal Indexation Status</p>
        </div>
        <button className="px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-medium transition flex items-center gap-1.5">
          <RefreshCw className="w-3.5 h-3.5" />
          Re-index All
        </button>
      </div>

      <div className="space-y-3">
        {URL_INSPECTION_LIST.map((item, idx) => (
          <div key={idx} className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="text-xs font-mono font-medium text-sky-400 truncate max-w-md">
                {item.url}
              </div>
              <div className="flex items-center gap-3 text-[11px] text-slate-400">
                <span>Last Crawled: {item.lastCrawled}</span>
                <span>•</span>
                <span className="text-slate-300">Vitals: {item.coreWebVitals}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {item.indexed ? (
                <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-lg text-[10px] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Indexed
                </span>
              ) : (
                <span className="px-2.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-lg text-[10px] font-semibold flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Not Indexed
                </span>
              )}
              <button className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg transition" title="Inspect DOM">
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UrlInspection;
import { useMemo } from 'react';
import { LineChart } from 'lucide-react';

const PerformanceChart = ({ timeline, selectedMetric, setSelectedMetric }) => {
  const maxVal = useMemo(() => {
    return Math.max(...timeline.map(d => d[selectedMetric])) * 1.15;
  }, [timeline, selectedMetric]);

  const minVal = useMemo(() => {
    return Math.min(...timeline.map(d => d[selectedMetric])) * 0.85;
  }, [timeline, selectedMetric]);

  const points = useMemo(() => {
    const width = 800;
    const height = 220;
    const step = width / (timeline.length - 1);

    return timeline.map((d, i) => {
      const x = i * step;
      const y = height - ((d[selectedMetric] - minVal) / (maxVal - minVal || 1)) * (height - 30) - 15;
      return { x, y, date: d.date, value: d[selectedMetric] };
    });
  }, [timeline, selectedMetric, maxVal, minVal]);

  const svgPath = useMemo(() => {
    if (!points.length) return '';
    return points.reduce((acc, pt, i) => {
      return i === 0 ? `M ${pt.x},${pt.y}` : `${acc} L ${pt.x},${pt.y}`;
    }, '');
  }, [points]);

  const areaPath = useMemo(() => {
    if (!points.length) return '';
    const first = points[0];
    const last = points[points.length - 1];
    return `${svgPath} L ${last.x},220 L ${first.x},220 Z`;
  }, [svgPath, points]);

  const formatMetricValue = (key, val) => {
    if (key === 'ctr') return `${(val * 100).toFixed(2)}%`;
    if (key === 'impressions') return val > 1000000 ? `${(val / 1000000).toFixed(2)}M` : `${(val / 1000).toFixed(0)}k`;
    if (key === 'position') return val.toFixed(1);
    return val.toLocaleString();
  };

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <LineChart className="w-5 h-5 text-sky-400" />
            Performance Telemetry
          </h2>
          <p className="text-xs text-slate-400">Interactive trends over the past 14 days</p>
        </div>

        <div className="flex bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          {['clicks', 'impressions', 'ctr', 'position'].map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMetric(m)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${selectedMetric === m
                  ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30'
                  : 'text-slate-400 hover:text-slate-200'
                }`}
            >
              {m.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="relative w-full h-60">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 800 220" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          <line x1="0" y1="40" x2="800" y2="40" stroke="#1e293b" strokeDasharray="4 4" />
          <line x1="0" y1="100" x2="800" y2="100" stroke="#1e293b" strokeDasharray="4 4" />
          <line x1="0" y1="160" x2="800" y2="160" stroke="#1e293b" strokeDasharray="4 4" />

          <path d={areaPath} fill="url(#chartGradient)" />

          <path
            d={svgPath}
            fill="none"
            stroke="#38bdf8"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {points.map((pt, idx) => (
            <g key={idx} className="group cursor-pointer">
              <circle
                cx={pt.x}
                cy={pt.y}
                r="5"
                className="fill-slate-900 stroke-sky-400 stroke-2 group-hover:r-7 transition-all"
              />
              <foreignObject x={Math.min(700, Math.max(0, pt.x - 45))} y={Math.max(0, pt.y - 45)} width="90" height="40" className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-slate-900 border border-sky-500/50 text-white rounded p-1 text-[10px] text-center font-mono shadow-xl">
                  <div>{pt.date}</div>
                  <div className="font-bold text-sky-400">{formatMetricValue(selectedMetric, pt.value)}</div>
                </div>
              </foreignObject>
            </g>
          ))}
        </svg>
      </div>

      <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-2 pt-2 border-t border-slate-800">
        {points.map((p, i) => (
          <span key={i}>{p.date}</span>
        ))}
      </div>
    </div>
  );
};

export default PerformanceChart;
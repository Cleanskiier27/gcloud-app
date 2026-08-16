import { useState, useMemo } from 'react';
import { Search, Sparkles, Loader2 } from 'lucide-react';

const QueriesTable = ({ queries, onAnalyzeQuery, analyzingQueryId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [intentFilter, setIntentFilter] = useState('All');

  const filteredQueries = useMemo(() => {
    return queries.filter(q => {
      const matchesTerm = q.query.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesIntent = intentFilter === 'All' || q.intent === intentFilter;
      return matchesTerm && matchesIntent;
    });
  }, [queries, searchTerm, intentFilter]);

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Search className="w-5 h-5 text-indigo-400" />
            Top Search Queries
          </h2>
          <p className="text-xs text-slate-400">Search keywords ranked by organic performance</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter queries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-900/80 border border-slate-700/60 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-48 transition"
            />
          </div>

          <select
            value={intentFilter}
            onChange={(e) => setIntentFilter(e.target.value)}
            className="bg-slate-900/80 border border-slate-700/60 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Intents</option>
            <option value="Informational">Informational</option>
            <option value="Transactional">Transactional</option>
            <option value="Navigational">Navigational</option>
            <option value="Commercial">Commercial</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900/80 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
            <tr>
              <th className="p-3">Query Keyword</th>
              <th className="p-3">Intent</th>
              <th className="p-3 text-right">Clicks</th>
              <th className="p-3 text-right">Impressions</th>
              <th className="p-3 text-right">CTR</th>
              <th className="p-3 text-right">Position</th>
              <th className="p-3 text-center">AGI Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-200">
            {filteredQueries.map((q) => (
              <tr key={q.id} className="hover:bg-slate-800/40 transition">
                <td className="p-3 font-medium text-slate-100 font-mono">
                  {q.query}
                </td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-800 text-indigo-300 border border-slate-700">
                    {q.intent}
                  </span>
                </td>
                <td className="p-3 text-right font-mono text-emerald-400 font-semibold">
                  {q.clicks.toLocaleString()}
                </td>
                <td className="p-3 text-right font-mono text-slate-300">
                  {q.impressions.toLocaleString()}
                </td>
                <td className="p-3 text-right font-mono text-purple-400">
                  {(q.ctr * 100).toFixed(2)}%
                </td>
                <td className="p-3 text-right font-mono text-amber-400 font-medium">
                  {q.position.toFixed(1)}
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => onAnalyzeQuery(q)}
                    disabled={!!analyzingQueryId}
                    className="p-1.5 px-2.5 bg-indigo-600/20 hover:bg-indigo-600/40 border border-indigo-500/40 text-indigo-300 rounded-lg text-[10px] font-medium transition inline-flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Analyze keyword with Gemini AGI"
                  >
                    {analyzingQueryId === q.id ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Sparkles className="w-3 h-3 text-indigo-400" />
                    )}
                    {analyzingQueryId === q.id ? 'Analyzing...' : 'Analyze'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QueriesTable;
import { useState, useEffect } from 'react';
import { INITIAL_METRICS, INITIAL_QUERIES, PERFORMANCE_TIMELINE } from './data';
import StatsOverlay from './components/StatsOverlay';
import AgiOverlay from './components/AgiOverlay';
import PerformanceChart from './components/PerformanceChart';
import QueriesTable from './components/QueriesTable';
import UrlInspection from './components/UrlInspection';
import GeminiInsightsLab from './components/GeminiInsightsLab';
import { LayoutDashboard, Search, Sparkles, BarChart2, BrainCircuit } from 'lucide-react';
import { useGemini } from './hooks/useGemini'; // Assuming you create this file

const App = () => {
  // Overlays state
  const [showStatsOverlay, setShowStatsOverlay] = useState(true);
  const [showAgiOverlay, setShowAgiOverlay] = useState(true);

  // Simulation ticks
  const [liveTicks, setLiveTicks] = useState(0);
  const [autoSimulate, setAutoSimulate] = useState(true);

  // Selected metric for chart
  const [selectedMetric, setSelectedMetric] = useState('clicks');

  // Active tab
  const [activeTab, setActiveTab] = useState('performance');

  // AGI State
  const [agiState, setAgiState] = useState({
    status: 'Active Monitoring',
    confidence: 0.94
  });
  const [agiLogs, setAgiLogs] = useState([
    "Connecting to Chrome OS Telemetry bus...",
    "Analyzing search engine ranking shifts...",
    "No critical search cannibalization detected."
  ]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Gemini Prompt & AI Output state
  const { aiResponse, isLoadingAi, generateInsight, setAiResponse } = useGemini();
  const [queryPrompt, setQueryPrompt] = useState('');
  const [analyzingQueryId, setAnalyzingQueryId] = useState(null);

  // Realtime Simulation Timer
  useEffect(() => {
    if (!autoSimulate) return;
    const interval = setInterval(() => {
      setLiveTicks(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, [autoSimulate]);

  // Trigger AGI reasoning task
  const handleRunAgiTask = (taskName) => {
    setIsAnalyzing(true);
    setAgiState({ status: 'Deep Reasoning', confidence: 0.72 });
    setAgiLogs(prev => [...prev, `[Task Init]: ${taskName}`]);

    setTimeout(() => {
      setAgiState({ status: 'Executing Neural Pass', confidence: 0.88 });
      setAgiLogs(prev => [...prev, `Evaluating keyword density against intent vector...`]);
    }, 1200);

    setTimeout(() => {
      setAgiState({ status: 'Active Monitoring', confidence: 0.96 });
      setAgiLogs(prev => [...prev, `[Success]: Recommendation model updated for ${taskName}.`]);
      setIsAnalyzing(false);
    }, 2500);
  };

  const handleGenerateInsight = async (prompt) => {
    await generateInsight(prompt);
    setAnalyzingQueryId(null); // Reset the specific query loading state
  };

  const handleAnalyzeQuery = (query) => {
    const prompt = `Analyze search performance and optimization strategy for keyword: "${query.query}"`;
    setQueryPrompt(prompt);
    setActiveTab('insights');
    setAnalyzingQueryId(query.id);
    generateInsight(prompt);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden relative">
      <header className="h-16 border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-md px-6 flex items-center justify-between z-30 shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/20 font-bold font-mono">OS</div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold tracking-tight text-white">Chrome OS</h1>
              <span className="px-2 py-0.5 text-[10px] font-mono bg-sky-500/20 text-sky-300 rounded-full border border-sky-500/30">Console v128</span>
            </div>
            <p className="text-[11px] text-slate-400">Search Console & AGI Intelligence Layer</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
          <button onClick={() => setActiveTab('performance')} className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-2 ${activeTab === 'performance' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}>
            <LayoutDashboard className="w-3.5 h-3.5" /> Performance
          </button>
          <button onClick={() => setActiveTab('queries')} className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-2 ${activeTab === 'queries' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}>
            <Search className="w-3.5 h-3.5" /> Queries
          </button>
          <button onClick={() => setActiveTab('insights')} className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-2 ${activeTab === 'insights' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}>
            <Sparkles className="w-3.5 h-3.5 text-amber-300" /> AGI Lab
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={() => setShowStatsOverlay(!showStatsOverlay)} className={`p-2 rounded-xl border text-xs font-medium transition flex items-center gap-1.5 ${showStatsOverlay ? 'bg-sky-500/20 text-sky-300 border-sky-500/40' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'}`} title="Toggle Stats Overlay HUD">
            <BarChart2 className="w-4 h-4" /> <span className="hidden sm:inline">Stats HUD</span>
          </button>
          <button onClick={() => setShowAgiOverlay(!showAgiOverlay)} className={`p-2 rounded-xl border text-xs font-medium transition flex items-center gap-1.5 ${showAgiOverlay ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'}`} title="Toggle AGI Reasoning Layer">
            <BrainCircuit className="w-4 h-4" /> <span className="hidden sm:inline">AGI Layer</span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-6 relative pb-24">
        {activeTab === 'performance' && (
          <div className="space-y-6 max-w-7xl mx-auto">
            <PerformanceChart timeline={PERFORMANCE_TIMELINE} selectedMetric={selectedMetric} setSelectedMetric={setSelectedMetric} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <QueriesTable queries={INITIAL_QUERIES} onAnalyzeQuery={handleAnalyzeQuery} analyzingQueryId={analyzingQueryId} />
              </div>
              <div>
                <UrlInspection />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'queries' && (
          <div className="max-w-7xl mx-auto">
            <QueriesTable queries={INITIAL_QUERIES} onAnalyzeQuery={handleAnalyzeQuery} analyzingQueryId={analyzingQueryId} />
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <GeminiInsightsLab queryPrompt={queryPrompt} setQueryPrompt={setQueryPrompt} onGenerateInsight={handleGenerateInsight} aiResponse={aiResponse} isLoadingAi={isLoadingAi} />
          </div>
        )}
      </main>

      <StatsOverlay metrics={INITIAL_METRICS} isVisible={showStatsOverlay} onToggle={() => setShowStatsOverlay(!showStatsOverlay)} liveTicks={liveTicks} autoSimulate={autoSimulate} setAutoSimulate={setAutoSimulate} />
      <AgiOverlay isVisible={showAgiOverlay} onToggle={() => setShowAgiOverlay(!showAgiOverlay)} agiState={agiState} agiLogs={agiLogs} onRunAgiTask={handleRunAgiTask} isAnalyzing={isAnalyzing} />
    </div>
  );
};

export default App;
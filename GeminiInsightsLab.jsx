import { Sparkles, Loader2, Send, Bot } from 'lucide-react';

const GeminiInsightsLab = ({ queryPrompt, setQueryPrompt, onGenerateInsight, aiResponse, isLoadingAi }) => {
  return (
    <div className="glass-card rounded-2xl p-5 border border-indigo-500/30 bg-gradient-to-br from-slate-900/90 via-indigo-950/20 to-slate-900/90">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-indigo-600/30 border border-indigo-500/50 rounded-xl text-indigo-300">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-white">Gemini AGI Search Optimization Lab</h2>
          <p className="text-xs text-slate-400">Run direct queries to Gemini LLM for search architecture recommendations</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={queryPrompt}
            onChange={(e) => setQueryPrompt(e.target.value)}
            placeholder="Ask Gemini: e.g. How can we increase CTR on developer tools queries?"
            className="flex-1 bg-slate-950/80 border border-indigo-500/40 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400 font-mono"
          />
          <button
            onClick={() => onGenerateInsight(queryPrompt)}
            disabled={isLoadingAi || !queryPrompt.trim()}
            className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/30 transition disabled:opacity-50 flex items-center gap-2"
          >
            {isLoadingAi ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Reasoning...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Generate
              </>
            )}
          </button>
        </div>

        {aiResponse && (
          <div className="mt-4 p-4 bg-slate-950/90 rounded-xl border border-indigo-500/30 font-mono text-xs text-indigo-100 space-y-2 animate-in fade-in">
            <div className="flex items-center justify-between text-[10px] text-indigo-400 border-b border-indigo-900/50 pb-2">
              <span className="flex items-center gap-1">
                <Bot className="w-3.5 h-3.5" /> Gemini 1.5 Flash Response
              </span>
              <span>Grounding: Search Analytics</span>
            </div>
            <div className="whitespace-pre-wrap leading-relaxed text-slate-200"
              dangerouslySetInnerHTML={{ __html: aiResponse.replace(/\*\*(.*?)\*\*/g, '<strong class="text-indigo-300 font-semibold">$1</strong>').replace(/\* (.*?):/g, '<div class="mt-2"><strong class="text-sky-300 font-medium">$1:</strong></div>') }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GeminiInsightsLab;
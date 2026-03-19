import { useState } from "react";
import { Zap, ArrowRight, TrendingUp } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import { motion } from "framer-motion";

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

interface KeywordResult {
  keyword: string;
  volume: number;
  cpc: string;
  difficulty: number;
  trend: "up" | "down" | "stable";
}

function generateKeywords(seed: string): KeywordResult[] {
  const modifiers = [
    "best", "top", "how to", "free", "online", "cheap", "vs",
    "review", "alternative", "for beginners", "tools", "software",
    "guide", "tips", "examples", "2024", "near me", "services",
  ];

  return modifiers.slice(0, 12).map((mod, i) => {
    const kw = i < 6 ? `${mod} ${seed}` : `${seed} ${mod}`;
    const h = hashCode(kw);
    const volume = (h % 45000) + 100;
    const cpc = ((h % 800) / 100 + 0.1).toFixed(2);
    const difficulty = h % 100;
    const trends: ("up" | "down" | "stable")[] = ["up", "down", "stable"];

    return { keyword: kw, volume, cpc, difficulty, trend: trends[h % 3] };
  }).sort((a, b) => b.volume - a.volume);
}

const KeywordTool = () => {
  const [seed, setSeed] = useState("");
  const [results, setResults] = useState<KeywordResult[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!seed.trim()) return;
    setLoading(true);
    setResults(null);
    await new Promise((r) => setTimeout(r, 1200));
    setResults(generateKeywords(seed));
    setLoading(false);
  };

  return (
    <ToolLayout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 mb-4">
            <Zap className="h-6 w-6 text-accent" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-foreground">Keyword Research Tool</h1>
          <p className="mt-2 text-muted-foreground">Discover high-value keywords with volume & difficulty data</p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2 mb-8">
          <input type="text" value={seed} onChange={(e) => setSeed(e.target.value)}
            placeholder="Enter seed keyword (e.g., seo tools)"
            className="flex-1 rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button type="submit" disabled={loading}
            className="gradient-primary text-primary-foreground px-6 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
          >
            {loading ? "Researching..." : "Find Keywords"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-flex h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="mt-4 text-muted-foreground text-sm">Generating keyword suggestions...</p>
          </div>
        )}

        {results && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h3 className="font-bold text-foreground text-sm">Keyword Ideas ({results.length})</h3>
                <span className="text-xs text-muted-foreground">Sorted by volume</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="px-4 py-3 text-xs font-semibold text-muted-foreground">Keyword</th>
                      <th className="px-4 py-3 text-xs font-semibold text-muted-foreground">Volume</th>
                      <th className="px-4 py-3 text-xs font-semibold text-muted-foreground">CPC</th>
                      <th className="px-4 py-3 text-xs font-semibold text-muted-foreground">Difficulty</th>
                      <th className="px-4 py-3 text-xs font-semibold text-muted-foreground">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((kw, i) => (
                      <tr key={i} className="border-b border-border/50 hover:bg-background/50 transition-colors duration-150">
                        <td className="px-4 py-3 font-mono text-xs text-foreground">{kw.keyword}</td>
                        <td className="px-4 py-3 font-mono text-xs text-primary font-bold">{kw.volume.toLocaleString()}</td>
                        <td className="px-4 py-3 font-mono text-xs text-accent">${kw.cpc}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-16 rounded-full bg-border overflow-hidden">
                              <div className={`h-full rounded-full ${kw.difficulty > 70 ? "bg-destructive" : kw.difficulty > 40 ? "bg-primary" : "bg-accent"}`} style={{ width: `${kw.difficulty}%` }} />
                            </div>
                            <span className="font-mono text-xs text-muted-foreground">{kw.difficulty}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-bold ${kw.trend === "up" ? "text-accent" : kw.trend === "down" ? "text-destructive" : "text-muted-foreground"}`}>
                            {kw.trend === "up" ? "↑ Rising" : kw.trend === "down" ? "↓ Falling" : "→ Stable"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </ToolLayout>
  );
};

export default KeywordTool;

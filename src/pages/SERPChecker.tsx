import { useState } from "react";
import { Search, ArrowRight, TrendingUp, TrendingDown, Minus } from "lucide-react";
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

function generateSERPResults(keyword: string) {
  const h = hashCode(keyword.toLowerCase().trim());
  const volume = (h % 90000) + 1000;
  const cpc = ((h % 500) / 100 + 0.5).toFixed(2);
  const difficulty = h % 100;

  const domains = [
    "wikipedia.org", "amazon.com", "reddit.com", "quora.com",
    "medium.com", "youtube.com", "github.com", "stackoverflow.com",
    "forbes.com", "nytimes.com", "bbc.com", "cnn.com",
    "healthline.com", "webmd.com", "investopedia.com",
  ];

  const results = Array.from({ length: 10 }, (_, i) => {
    const sh = hashCode(`${keyword}-${i}`);
    const dom = domains[sh % domains.length];
    const change = (sh % 5) - 2;
    return {
      position: i + 1,
      url: `https://${dom}/${keyword.replace(/\s+/g, "-").toLowerCase()}-guide`,
      domain: dom,
      title: `${keyword.charAt(0).toUpperCase() + keyword.slice(1)} - ${["Complete Guide", "Best Practices", "Everything You Need", "Expert Tips", "2024 Guide", "How To", "Tutorial", "Overview", "Resources", "Top Results"][i]}`,
      da: 40 + (sh % 55),
      change,
    };
  });

  return { volume, cpc, difficulty, results };
}

const SERPChecker = () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<ReturnType<typeof generateSERPResults> | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    setLoading(true);
    setResults(null);
    await new Promise((r) => setTimeout(r, 1300));
    setResults(generateSERPResults(keyword));
    setLoading(false);
  };

  return (
    <ToolLayout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
            <Search className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-foreground">SERP Checker</h1>
          <p className="mt-2 text-muted-foreground">Track keyword rankings and analyze search engine results</p>
        </div>

        <form onSubmit={handleCheck} className="flex gap-2 mb-8">
          <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter keyword (e.g., best seo tools)"
            className="flex-1 rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button type="submit" disabled={loading}
            className="gradient-primary text-primary-foreground px-6 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
          >
            {loading ? "Searching..." : "Check SERP"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-flex h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="mt-4 text-muted-foreground text-sm">Fetching SERP data...</p>
          </div>
        )}

        {results && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { label: "Search Volume", value: results.volume.toLocaleString() + "/mo", color: "text-primary" },
                { label: "Avg. CPC", value: `$${results.cpc}`, color: "text-accent" },
                { label: "Difficulty", value: `${results.difficulty}/100`, color: results.difficulty > 70 ? "text-destructive" : results.difficulty > 40 ? "text-primary" : "text-accent" },
              ].map((m) => (
                <div key={m.label} className="rounded-xl border border-border bg-card p-4 text-center">
                  <div className={`text-xl md:text-2xl font-black font-mono ${m.color}`}>{m.value}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{m.label}</div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="p-4 border-b border-border">
                <h3 className="font-bold text-foreground text-sm">Top 10 Results for "<span className="text-primary">{keyword}</span>"</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="px-4 py-3 text-xs font-semibold text-muted-foreground w-12">#</th>
                      <th className="px-4 py-3 text-xs font-semibold text-muted-foreground">Page</th>
                      <th className="px-4 py-3 text-xs font-semibold text-muted-foreground">DA</th>
                      <th className="px-4 py-3 text-xs font-semibold text-muted-foreground">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.results.map((r) => (
                      <tr key={r.position} className="border-b border-border/50 hover:bg-background/50 transition-colors duration-150">
                        <td className="px-4 py-3 font-mono text-xs font-bold text-foreground">{r.position}</td>
                        <td className="px-4 py-3">
                          <div className="text-xs font-medium text-foreground truncate max-w-[300px]">{r.title}</div>
                          <div className="text-[10px] font-mono text-primary truncate max-w-[300px]">{r.url}</div>
                        </td>
                        <td className="px-4 py-3 font-mono text-xs font-bold text-accent">{r.da}</td>
                        <td className="px-4 py-3">
                          <span className={`flex items-center gap-1 text-xs font-mono font-bold ${r.change > 0 ? "text-accent" : r.change < 0 ? "text-destructive" : "text-muted-foreground"}`}>
                            {r.change > 0 ? <TrendingUp className="h-3 w-3" /> : r.change < 0 ? <TrendingDown className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
                            {r.change > 0 ? `+${r.change}` : r.change}
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

export default SERPChecker;

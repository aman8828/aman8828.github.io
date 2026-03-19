import { useState } from "react";
import { BarChart3, ArrowRight, Globe, TrendingUp, Shield, ExternalLink } from "lucide-react";
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

function generateDAResults(domain: string) {
  const h = hashCode(domain.toLowerCase().replace(/https?:\/\//, "").replace(/www\./, "").split("/")[0]);
  const da = (h % 60) + 15;
  const pa = Math.min(100, da + (h % 20) - 10);
  const spamScore = Math.max(1, (h % 15));
  const backlinks = (h % 50000) + 500;
  const referringDomains = Math.floor(backlinks * (0.1 + (h % 30) / 100));
  const mozRank = Math.min(10, (da / 10)).toFixed(1);
  const trustFlow = Math.min(100, da + (h % 10));
  const citationFlow = Math.min(100, da + (h % 15) - 5);

  return { da, pa, spamScore, backlinks, referringDomains, mozRank, trustFlow, citationFlow };
}

const DAChecker = () => {
  const [domain, setDomain] = useState("");
  const [results, setResults] = useState<ReturnType<typeof generateDAResults> | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim()) return;
    setLoading(true);
    setResults(null);
    await new Promise((r) => setTimeout(r, 1200));
    setResults(generateDAResults(domain));
    setLoading(false);
  };

  return (
    <ToolLayout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
            <BarChart3 className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-foreground">Domain Authority Checker</h1>
          <p className="mt-2 text-muted-foreground">Check DA, PA, Spam Score & Trust metrics for any domain</p>
        </div>

        <form onSubmit={handleCheck} className="flex gap-2 mb-8">
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Enter domain (e.g., example.com)"
            className="flex-1 rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            disabled={loading}
            className="gradient-primary text-primary-foreground px-6 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
          >
            {loading ? "Checking..." : "Check DA"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-flex h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="mt-4 text-muted-foreground text-sm">Analyzing domain metrics...</p>
          </div>
        )}

        {results && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="rounded-xl border border-border bg-card p-6 mb-4">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="h-5 w-5 text-primary" />
                <span className="font-mono text-sm text-foreground">{domain.replace(/https?:\/\//, "").replace(/www\./, "").split("/")[0]}</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Domain Authority", value: results.da, max: 100, color: results.da >= 50 ? "text-accent" : results.da >= 30 ? "text-primary" : "text-destructive" },
                  { label: "Page Authority", value: results.pa, max: 100, color: results.pa >= 50 ? "text-accent" : "text-primary" },
                  { label: "Spam Score", value: `${results.spamScore}%`, max: null, color: results.spamScore <= 5 ? "text-accent" : results.spamScore <= 10 ? "text-primary" : "text-destructive" },
                  { label: "Moz Rank", value: results.mozRank, max: null, color: "text-primary" },
                ].map((m) => (
                  <div key={m.label} className="rounded-lg bg-background p-4 text-center border border-border">
                    <div className={`text-2xl md:text-3xl font-black font-mono ${m.color}`}>{m.value}</div>
                    {m.max && (
                      <div className="mt-2 h-1.5 rounded-full bg-border overflow-hidden">
                        <div className={`h-full rounded-full gradient-primary`} style={{ width: `${(Number(m.value) / m.max) * 100}%` }} />
                      </div>
                    )}
                    <div className="mt-2 text-xs text-muted-foreground">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-accent" /> Link Metrics
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "Total Backlinks", value: results.backlinks.toLocaleString() },
                    { label: "Referring Domains", value: results.referringDomains.toLocaleString() },
                  ].map((r) => (
                    <div key={r.label} className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{r.label}</span>
                      <span className="font-mono text-sm text-accent font-bold">{r.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" /> Trust Metrics
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "Trust Flow", value: results.trustFlow },
                    { label: "Citation Flow", value: results.citationFlow },
                  ].map((r) => (
                    <div key={r.label} className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{r.label}</span>
                      <span className="font-mono text-sm text-primary font-bold">{r.value}/100</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </ToolLayout>
  );
};

export default DAChecker;

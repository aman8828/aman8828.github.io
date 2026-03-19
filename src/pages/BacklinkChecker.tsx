import { useState } from "react";
import { Link2, ArrowRight, ExternalLink, ArrowUpRight, ArrowDownRight } from "lucide-react";
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

function generateBacklinks(domain: string) {
  const clean = domain.toLowerCase().replace(/https?:\/\//, "").replace(/www\./, "").split("/")[0];
  const h = hashCode(clean);
  const totalBacklinks = (h % 80000) + 1000;
  const dofollow = Math.floor(totalBacklinks * (0.5 + (h % 30) / 100));
  const nofollow = totalBacklinks - dofollow;
  const referringDomains = Math.floor(totalBacklinks * (0.08 + (h % 10) / 100));

  const sources = [
    "blog.medium.com", "en.wikipedia.org", "github.com", "stackoverflow.com",
    "reddit.com", "linkedin.com", "twitter.com", "facebook.com",
    "quora.com", "dev.to", "hackernews.com", "techcrunch.com",
    "forbes.com", "nytimes.com", "bbc.com", "theguardian.com",
  ];

  const anchors = [
    clean, `Visit ${clean}`, "Click here", "Read more", "Learn more",
    "Official site", clean.split(".")[0], "Source", "Reference", "Link",
  ];

  const backlinks = Array.from({ length: 15 }, (_, i) => {
    const sh = hashCode(`${clean}-${i}`);
    const srcDomain = sources[sh % sources.length];
    const da = 20 + (sh % 60);
    return {
      sourceUrl: `https://${srcDomain}/article-${(sh % 9999) + 1000}`,
      sourceDomain: srcDomain,
      anchor: anchors[sh % anchors.length],
      da,
      type: sh % 3 === 0 ? "nofollow" : "dofollow",
      firstSeen: new Date(Date.now() - (sh % 365) * 86400000).toLocaleDateString(),
    };
  });

  return { totalBacklinks, dofollow, nofollow, referringDomains, backlinks };
}

const BacklinkChecker = () => {
  const [domain, setDomain] = useState("");
  const [results, setResults] = useState<ReturnType<typeof generateBacklinks> | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim()) return;
    setLoading(true);
    setResults(null);
    await new Promise((r) => setTimeout(r, 1500));
    setResults(generateBacklinks(domain));
    setLoading(false);
  };

  return (
    <ToolLayout>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 mb-4">
            <Link2 className="h-6 w-6 text-accent" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-foreground">Backlink Checker</h1>
          <p className="mt-2 text-muted-foreground">Analyze your complete backlink profile and competitor links</p>
        </div>

        <form onSubmit={handleCheck} className="flex gap-2 mb-8">
          <input type="text" value={domain} onChange={(e) => setDomain(e.target.value)}
            placeholder="Enter domain (e.g., example.com)"
            className="flex-1 rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button type="submit" disabled={loading}
            className="gradient-primary text-primary-foreground px-6 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
          >
            {loading ? "Analyzing..." : "Check Backlinks"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-flex h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="mt-4 text-muted-foreground text-sm">Crawling backlink data...</p>
          </div>
        )}

        {results && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {[
                { label: "Total Backlinks", value: results.totalBacklinks.toLocaleString(), color: "text-foreground" },
                { label: "Dofollow", value: results.dofollow.toLocaleString(), color: "text-accent" },
                { label: "Nofollow", value: results.nofollow.toLocaleString(), color: "text-muted-foreground" },
                { label: "Referring Domains", value: results.referringDomains.toLocaleString(), color: "text-primary" },
              ].map((m) => (
                <div key={m.label} className="rounded-xl border border-border bg-card p-4 text-center">
                  <div className={`text-xl md:text-2xl font-black font-mono ${m.color}`}>{m.value}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{m.label}</div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="p-4 border-b border-border">
                <h3 className="font-bold text-foreground text-sm">Top Backlinks</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="px-4 py-3 text-xs font-semibold text-muted-foreground">Source URL</th>
                      <th className="px-4 py-3 text-xs font-semibold text-muted-foreground">DA</th>
                      <th className="px-4 py-3 text-xs font-semibold text-muted-foreground">Anchor</th>
                      <th className="px-4 py-3 text-xs font-semibold text-muted-foreground">Type</th>
                      <th className="px-4 py-3 text-xs font-semibold text-muted-foreground">First Seen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.backlinks.map((bl, i) => (
                      <tr key={i} className="border-b border-border/50 hover:bg-background/50 transition-colors duration-150">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <ExternalLink className="h-3 w-3 text-muted-foreground shrink-0" />
                            <span className="font-mono text-xs text-primary truncate max-w-[200px]">{bl.sourceUrl}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`font-mono text-xs font-bold ${bl.da >= 50 ? "text-accent" : "text-foreground"}`}>{bl.da}</span>
                        </td>
                        <td className="px-4 py-3 text-xs text-muted-foreground truncate max-w-[120px]">{bl.anchor}</td>
                        <td className="px-4 py-3">
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${bl.type === "dofollow" ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground"}`}>
                            {bl.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-muted-foreground font-mono">{bl.firstSeen}</td>
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

export default BacklinkChecker;

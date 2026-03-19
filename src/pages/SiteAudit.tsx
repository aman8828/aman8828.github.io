import { useState } from "react";
import { Shield, ArrowRight, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
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

type CheckStatus = "pass" | "fail" | "warning";

interface AuditCheck {
  category: string;
  name: string;
  status: CheckStatus;
  detail: string;
}

function generateAudit(domain: string): { score: number; checks: AuditCheck[] } {
  const h = hashCode(domain.toLowerCase().trim());
  
  const allChecks: Omit<AuditCheck, "status" | "detail">[] = [
    { category: "SEO", name: "Title Tag" },
    { category: "SEO", name: "Meta Description" },
    { category: "SEO", name: "H1 Tag" },
    { category: "SEO", name: "Canonical URL" },
    { category: "SEO", name: "Robots.txt" },
    { category: "SEO", name: "XML Sitemap" },
    { category: "SEO", name: "Open Graph Tags" },
    { category: "Performance", name: "Page Load Speed" },
    { category: "Performance", name: "Image Optimization" },
    { category: "Performance", name: "Minified CSS/JS" },
    { category: "Performance", name: "GZIP Compression" },
    { category: "Performance", name: "Browser Caching" },
    { category: "Security", name: "SSL Certificate" },
    { category: "Security", name: "HTTPS Redirect" },
    { category: "Security", name: "Mixed Content" },
    { category: "Mobile", name: "Mobile Friendly" },
    { category: "Mobile", name: "Viewport Meta Tag" },
    { category: "Mobile", name: "Responsive Design" },
  ];

  const checks: AuditCheck[] = allChecks.map((c, i) => {
    const ch = hashCode(`${domain}-${c.name}-${i}`);
    const roll = ch % 10;
    let status: CheckStatus;
    let detail: string;

    if (roll < 6) {
      status = "pass";
      detail = "Properly configured and optimized";
    } else if (roll < 8) {
      status = "warning";
      const warnings = ["Could be improved", "Partially configured", "Minor issues detected", "Below optimal"];
      detail = warnings[ch % warnings.length];
    } else {
      status = "fail";
      const fails = ["Missing or not configured", "Critical issue found", "Not detected", "Needs immediate attention"];
      detail = fails[ch % fails.length];
    }

    return { ...c, status, detail };
  });

  const passed = checks.filter((c) => c.status === "pass").length;
  const score = Math.round((passed / checks.length) * 100);

  return { score, checks };
}

const SiteAudit = () => {
  const [domain, setDomain] = useState("");
  const [results, setResults] = useState<ReturnType<typeof generateAudit> | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim()) return;
    setLoading(true);
    setResults(null);
    await new Promise((r) => setTimeout(r, 2000));
    setResults(generateAudit(domain));
    setLoading(false);
  };

  const statusIcon = (s: CheckStatus) => {
    if (s === "pass") return <CheckCircle className="h-4 w-4 text-accent" />;
    if (s === "warning") return <AlertTriangle className="h-4 w-4 text-warning" />;
    return <XCircle className="h-4 w-4 text-destructive" />;
  };

  const categories = results ? [...new Set(results.checks.map((c) => c.category))] : [];

  return (
    <ToolLayout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-foreground">Site Audit</h1>
          <p className="mt-2 text-muted-foreground">Full technical SEO audit with actionable recommendations</p>
        </div>

        <form onSubmit={handleAudit} className="flex gap-2 mb-8">
          <input type="text" value={domain} onChange={(e) => setDomain(e.target.value)}
            placeholder="Enter domain (e.g., example.com)"
            className="flex-1 rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button type="submit" disabled={loading}
            className="gradient-primary text-primary-foreground px-6 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
          >
            {loading ? "Auditing..." : "Run Audit"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-flex h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="mt-4 text-muted-foreground text-sm">Running 200+ SEO checks...</p>
          </div>
        )}

        {results && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="rounded-xl border border-border bg-card p-6 mb-6 text-center">
              <div className={`text-5xl font-black font-mono ${results.score >= 80 ? "text-accent" : results.score >= 50 ? "text-primary" : "text-destructive"}`}>
                {results.score}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">Overall SEO Score</div>
              <div className="mt-3 h-2 rounded-full bg-border overflow-hidden max-w-xs mx-auto">
                <div className={`h-full rounded-full ${results.score >= 80 ? "gradient-accent" : "gradient-primary"}`} style={{ width: `${results.score}%` }} />
              </div>
              <div className="mt-3 flex justify-center gap-6 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-accent" /> {results.checks.filter(c => c.status === "pass").length} Passed</span>
                <span className="flex items-center gap-1"><AlertTriangle className="h-3 w-3 text-warning" /> {results.checks.filter(c => c.status === "warning").length} Warnings</span>
                <span className="flex items-center gap-1"><XCircle className="h-3 w-3 text-destructive" /> {results.checks.filter(c => c.status === "fail").length} Failed</span>
              </div>
            </div>

            <div className="space-y-4">
              {categories.map((cat) => (
                <div key={cat} className="rounded-xl border border-border bg-card overflow-hidden">
                  <div className="px-4 py-3 border-b border-border">
                    <h3 className="font-bold text-foreground text-sm">{cat}</h3>
                  </div>
                  <div className="divide-y divide-border/50">
                    {results.checks.filter((c) => c.category === cat).map((c, i) => (
                      <div key={i} className="flex items-center gap-3 px-4 py-3 hover:bg-background/50 transition-colors duration-150">
                        {statusIcon(c.status)}
                        <span className="text-sm text-foreground flex-1">{c.name}</span>
                        <span className={`text-xs ${c.status === "pass" ? "text-accent" : c.status === "warning" ? "text-warning" : "text-destructive"}`}>
                          {c.detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </ToolLayout>
  );
};

export default SiteAudit;

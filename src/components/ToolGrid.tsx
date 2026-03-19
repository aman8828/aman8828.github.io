import { motion } from "framer-motion";
import { Link2, BarChart3, Globe, Search, Shield, Zap, ArrowRight } from "lucide-react";

const tools = [
  {
    icon: BarChart3,
    title: "DA Checker",
    description: "Check Domain Authority & Page Authority scores instantly",
    stat: "50+ metrics",
    badge: "Popular",
    badgeColor: "bg-primary/20 text-primary",
    href: "/da-checker",
  },
  {
    icon: Link2,
    title: "Backlink Checker",
    description: "Analyze your complete backlink profile and competitor links",
    stat: "Real-time data",
    badge: "Pro",
    badgeColor: "bg-accent/20 text-accent",
    href: "/backlink-checker",
  },
  {
    icon: Search,
    title: "SERP Checker",
    description: "Track keyword rankings across search engines globally",
    stat: "100+ countries",
    badge: "New",
    badgeColor: "bg-primary/20 text-primary",
    href: "/serp-checker",
  },
  {
    icon: Globe,
    title: "IP Lookup",
    description: "Find IP address, hosting info, and server location details",
    stat: "Instant results",
    badge: "Fast",
    badgeColor: "bg-accent/20 text-accent",
    href: "/ip-lookup",
  },
  {
    icon: Shield,
    title: "Site Audit",
    description: "Full technical SEO audit with actionable recommendations",
    stat: "200+ checks",
    badge: "Deep",
    badgeColor: "bg-primary/20 text-primary",
    href: "/site-audit",
  },
  {
    icon: Zap,
    title: "Keyword Research",
    description: "Discover high-value keywords with volume & difficulty data",
    stat: "Bulk analysis",
    badge: "AI",
    badgeColor: "bg-accent/20 text-accent",
    href: "/keyword-tool",
  },
];

const ToolGrid = () => {
  return (
    <section className="py-20 relative">
      <div className="container px-4">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 text-xs text-accent mb-4">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse-glow" />
            Free SEO Tools • No Signup Required
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Professional SEO Tools
          </h2>
          <p className="mt-2 text-muted-foreground max-w-lg mx-auto">
            Enterprise-grade tools for domain analysis, backlink auditing, and keyword research
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool, i) => (
            <motion.a
              key={tool.title}
              href={tool.href}
              className="group block rounded-xl border border-border bg-card p-6 transition-all duration-150 hover:border-primary/50 hover:glow-primary"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <tool.icon className="h-5 w-5 text-primary" />
                </div>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${tool.badgeColor}`}>
                  {tool.badge}
                </span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1">{tool.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-accent">{tool.stat}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-150" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolGrid;

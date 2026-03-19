import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useState } from "react";

const HeroSection = () => {
  const [url, setUrl] = useState("");

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 bg-background/60" />

      <div className="container relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary mb-6">
            ⚡ Powered by Real-Time SEO Data
          </span>
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl font-black text-foreground leading-tight mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          All-in-One SEO
          <br />
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-primary)" }}>
            Tool Suite
          </span>
        </motion.h1>

        <motion.p
          className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Check Domain Authority, analyze backlinks, track keywords, and audit
          your website — all from one powerful dashboard. Free SEO tools for professionals.
        </motion.p>

        <motion.div
          className="mt-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center gap-0 rounded-xl border border-border bg-card p-1.5 glow-primary">
            <div className="flex items-center flex-1 gap-2 px-4">
              <Search className="h-5 w-5 text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Enter domain or URL (e.g., example.com)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-sm py-3 focus:outline-none font-mono"
              />
            </div>
            <button className="gradient-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-bold whitespace-nowrap transition-all duration-150 hover:opacity-90 shrink-0">
              Analyze Now
            </button>
          </div>
        </motion.div>

        <motion.div
          className="mt-6 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <span className="inline-flex items-center gap-1.5 text-xs text-accent">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse-glow" />
            All Tools Online • 99.9% Uptime
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

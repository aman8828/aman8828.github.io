import { motion } from "framer-motion";
import { Database, Cpu, Globe, Zap } from "lucide-react";

const features = [
  {
    icon: Database,
    title: "Massive Database",
    desc: "Access data from over 500 million backlinks and 10 million domains updated in real-time.",
  },
  {
    icon: Cpu,
    title: "AI-Powered Analysis",
    desc: "Smart algorithms detect SEO issues and provide actionable fix recommendations.",
  },
  {
    icon: Globe,
    title: "Global Coverage",
    desc: "Track rankings and analyze competitors across 100+ countries and search engines.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    desc: "Get comprehensive SEO data in under 2 seconds with our optimized infrastructure.",
  },
];

const FeaturesSection = () => (
  <section className="py-20">
    <div className="container px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Why Professionals Choose Us</h2>
        <p className="mt-2 text-muted-foreground">Built for speed, accuracy, and scale</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            className="flex gap-4 rounded-xl border border-border bg-card p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
              <f.icon className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;

import { motion } from "framer-motion";

const metrics = [
  { value: "10M+", label: "Domains Analyzed" },
  { value: "500M+", label: "Backlinks Indexed" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Free Access" },
];

const MetricsSection = () => (
  <section className="py-16 border-y border-border">
    <div className="container px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <div className="text-3xl md:text-4xl font-black text-foreground font-mono">{m.value}</div>
            <div className="mt-1 text-sm text-muted-foreground">{m.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default MetricsSection;

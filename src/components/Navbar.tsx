import { Link } from "react-router-dom";
import { Search, Globe, Link2, BarChart3, Shield, Zap, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "DA Checker", href: "/da-checker" },
  { label: "Backlink Checker", href: "/backlink-checker" },
  { label: "SERP Checker", href: "/serp-checker" },
  { label: "IP Lookup", href: "/ip-lookup" },
  { label: "Keyword Tool", href: "/keyword-tool" },
  { label: "About", href: "/about" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
            <Globe className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <span className="text-lg font-bold text-foreground">SEO ToolHub</span>
            <p className="text-[10px] leading-none text-accent">⚡ Pro SEO Suite</p>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-150"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <span className="text-xs text-muted-foreground">Credits: <span className="text-accent font-mono font-bold">∞</span></span>
          <button className="gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 hover:opacity-90">
            Sign In
          </button>
        </div>

        <button className="lg:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="container py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

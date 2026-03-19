import { Globe } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border py-12">
    <div className="container px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
              <Globe className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">SEO ToolHub</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Professional SEO tools for marketers, developers, and businesses.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3 text-sm">Tools</h4>
          <div className="flex flex-col gap-2">
            {["DA Checker", "Backlink Checker", "SERP Checker", "IP Lookup"].map((t) => (
              <span key={t} className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors duration-150">{t}</span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3 text-sm">Resources</h4>
          <div className="flex flex-col gap-2">
            {["SEO Blog", "API Docs", "Tutorials", "Changelog"].map((t) => (
              <span key={t} className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors duration-150">{t}</span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3 text-sm">Company</h4>
          <div className="flex flex-col gap-2">
            {["About", "Contact", "Privacy", "Terms"].map((t) => (
              <span key={t} className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors duration-150">{t}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-border text-center">
        <p className="text-xs text-muted-foreground">
          © 2026 SEO ToolHub. All rights reserved. Built for SEO professionals.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;

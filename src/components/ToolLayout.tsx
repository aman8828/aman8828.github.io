import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReactNode } from "react";

interface ToolLayoutProps {
  children: ReactNode;
}

const ToolLayout = ({ children }: ToolLayoutProps) => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-24 pb-16">
      <div className="container px-4">{children}</div>
    </main>
    <Footer />
  </div>
);

export default ToolLayout;

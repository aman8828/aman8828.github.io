import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ToolGrid from "@/components/ToolGrid";
import MetricsSection from "@/components/MetricsSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <HeroSection />
        <ToolGrid />
        <MetricsSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

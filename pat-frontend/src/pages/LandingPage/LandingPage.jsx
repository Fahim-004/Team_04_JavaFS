import Navbar from "../../components/Navbar/Navbar";
import HeroSection from "../../components/HeroSection/HeroSection";
import Features from "../../components/Features/Features";
import StatsSection from "../../components/StatsSection/StatsSection";
import HowItWorks from "../../components/HowItWorks/HowItWorks";

const LandingPage = () => {
  return (
    <div className="font-sans bg-slate-50">

      <Navbar />

      <HeroSection />

      <StatsSection />

      <Features />

      <HowItWorks />

    </div>
  );
};

export default LandingPage;
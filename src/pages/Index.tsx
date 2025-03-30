
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import EnhancedHero from "@/components/home/EnhancedHero";
import FeaturedCampaigns from "@/components/home/FeaturedCampaigns";
import CompletedCampaigns from "@/components/home/CompletedCampaigns";
import MissionSection from "@/components/home/MissionSection";
import CallToAction from "@/components/home/CallToAction";
import WebsiteLoader from "@/components/animations/WebsiteLoader";

// Main Index component
const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set loading time to 1 second as requested
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <WebsiteLoader onComplete={() => setLoading(false)} duration={1000} />}
      
      <Layout>
        <EnhancedHero />
        <FeaturedCampaigns />
        <CompletedCampaigns />
        <MissionSection />
        <CallToAction />
      </Layout>
    </>
  );
};

export default Index;

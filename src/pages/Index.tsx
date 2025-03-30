
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import VideoSection from "@/components/home/VideoSection";
import FeaturedCampaigns from "@/components/home/FeaturedCampaigns";
import CompletedCampaigns from "@/components/home/CompletedCampaigns";
import MissionSection from "@/components/home/MissionSection";
import CallToAction from "@/components/home/CallToAction";
import WebsiteLoader from "@/components/animations/WebsiteLoader";

// Main Index component
const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating loading resources
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <WebsiteLoader onComplete={() => setLoading(false)} />}
      
      <Layout>
        <Hero />
        <VideoSection />
        <FeaturedCampaigns />
        <CompletedCampaigns />
        <MissionSection />
        <CallToAction />
      </Layout>
    </>
  );
};

export default Index;

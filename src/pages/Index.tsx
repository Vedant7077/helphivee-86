
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import VideoSection from "@/components/home/VideoSection";
import FeaturedCampaigns from "@/components/home/FeaturedCampaigns";
import MissionSection from "@/components/home/MissionSection";
import CallToAction from "@/components/home/CallToAction";

// Main Index component
const Index = () => {
  return (
    <Layout>
      <Hero />
      <VideoSection />
      <FeaturedCampaigns />
      <MissionSection />
      <CallToAction />
    </Layout>
  );
};

export default Index;

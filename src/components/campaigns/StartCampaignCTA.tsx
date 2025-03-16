
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const StartCampaignCTA = () => {
  return (
    <div className="mt-20 bg-charity-coral-light p-10 rounded-lg text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Start Your Own Campaign</h2>
      <p className="text-lg text-gray-800 mb-6 max-w-3xl mx-auto">
        Have a cause you're passionate about? Start your own fundraising campaign and make a difference with us.
      </p>
      <Link to="/create-campaign">
        <Button className="bg-charity-coral hover:bg-charity-coral-dark text-white px-8 py-3 text-lg">
          Start a Campaign
        </Button>
      </Link>
    </div>
  );
};

export default StartCampaignCTA;

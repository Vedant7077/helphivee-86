import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <div className="bg-charity-blue py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          Ready to Make a Difference?
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-indigo-100 sm:mt-4">
          Join our community and help us create a brighter future for children in need.
        </p>
        <Link to="/campaigns">
          <Button className="mt-8 bg-white text-charity-blue hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-md">
            Explore Campaigns
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CallToAction;

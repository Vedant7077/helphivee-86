
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CallToAction = () => (
  <div className="bg-charity-coral-light">
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
      <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        <span className="block">Ready to make a difference?</span>
        <span className="block">Start today with us.</span>
      </h2>
      <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
        <div className="inline-flex rounded-md shadow">
          <Button className="px-6 py-3 text-base font-medium rounded-md text-charity-coral bg-white hover:bg-gray-50">
            <Link to="/campaigns">Start a Campaign</Link>
          </Button>
        </div>
        <div className="ml-3 inline-flex rounded-md shadow">
          <Button variant="secondary" className="px-6 py-3 text-base font-medium rounded-md text-white bg-charity-coral border border-white hover:bg-charity-coral-light">
            <Link to="/contact">Volunteer With Us</Link>
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export default CallToAction;

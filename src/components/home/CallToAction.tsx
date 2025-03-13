
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CallToAction = () => (
  <div className="bg-charity-green-light">
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
      <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        <span className="block">Ready to make a difference?</span>
        <span className="block">Start today with us.</span>
      </h2>
      <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0 gap-4">
        <Button className="px-6 py-2 text-base font-medium rounded-md text-charity-green-dark bg-charity-offwhite hover:bg-white">
          <Link to="/campaigns" className="w-full h-full flex items-center justify-center">Start a Campaign</Link>
        </Button>
        <Button variant="secondary" className="px-6 py-2 text-base font-medium rounded-md text-white bg-charity-green border border-white hover:bg-charity-green-dark">
          <Link to="/contact" className="w-full h-full flex items-center justify-center">Volunteer With Us</Link>
        </Button>
      </div>
    </div>
  </div>
);

export default CallToAction;

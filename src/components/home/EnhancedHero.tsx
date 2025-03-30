
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// More extensive image collection
const backgroundImages = [
  "https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", // Children smiling
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", // Community help
  "https://images.unsplash.com/photo-1469571486292-b53e58fd5e1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", // Volunteer work
  "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",  // Helping hands
  "https://images.unsplash.com/photo-1509099652299-30938b0aeb63?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", // Education
  "https://images.unsplash.com/photo-1528502668750-88ba58015b2f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", // Community project
  "https://images.unsplash.com/photo-1524069290683-0457abfe42c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", // Healthcare
  "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"  // Children learning
];

// Testimonial quotes
const testimonials = [
  {
    quote: "Prayaas has changed so many lives in our community. Their work is truly inspiring.",
    author: "Rajesh Kumar, Community Leader"
  },
  {
    quote: "The education initiative by Prayaas gave my children a chance at a better future.",
    author: "Sunita Sharma, Parent"
  },
  {
    quote: "Volunteering with Prayaas has been the most rewarding experience of my life.",
    author: "Amit Singh, Volunteer"
  },
  {
    quote: "The healthcare programs have made a significant difference in rural areas.",
    author: "Dr. Priya Patel, Healthcare Partner"
  }
];

const EnhancedHero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    // Image rotation
    const imageInterval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % backgroundImages.length);
        setFadeIn(true);
      }, 500);
    }, 5000); // Change image every 5 seconds

    // Testimonial rotation
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonialIndex(prevIndex => (prevIndex + 1) % testimonials.length);
    }, 8000); // Change testimonial every 8 seconds

    return () => {
      clearInterval(imageInterval);
      clearInterval(testimonialInterval);
    };
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Main hero section with auto-changing background */}
      <div 
        className={`relative py-20 px-4 sm:px-6 lg:px-8 text-white min-h-[600px] transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-80'}`}
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImages[currentImageIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="sm:text-center lg:text-left animate-fade-up">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              <span className="block">Creating hope with</span>
              <span className="block text-charity-offwhite">meaningful action</span>
            </h1>
            <p className="mt-3 text-base sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Join our mission at Prayaas to create brighter futures for children in need through 
              education, healthcare, and community development.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-wrap gap-4">
              <Link to="/donate" className="w-auto">
                <Button className="px-6 py-2 text-sm font-medium rounded-md text-charity-green-dark bg-charity-offwhite hover:bg-white md:py-2 md:text-base">
                  Donate Now
                </Button>
              </Link>
              <Link to="/create-campaign" className="w-auto">
                <Button variant="outline" className="px-6 py-2 text-sm font-medium rounded-md text-charity-offwhite bg-transparent border-charity-offwhite hover:bg-charity-green md:py-2 md:text-base">
                  Start a Campaign
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Image selector dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setFadeIn(false);
              setTimeout(() => {
                setCurrentImageIndex(index);
                setFadeIn(true);
              }, 300);
            }}
            className={`h-2 w-2 rounded-full transition-all ${
              currentImageIndex === index ? 'bg-white scale-125' : 'bg-gray-400 bg-opacity-60'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Testimonial section */}
      <div className="bg-charity-green-light py-10 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="text-xl md:text-2xl font-medium text-white italic">
            "{testimonials[currentTestimonialIndex].quote}"
          </blockquote>
          <p className="mt-4 text-white font-semibold">
            {testimonials[currentTestimonialIndex].author}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnhancedHero;

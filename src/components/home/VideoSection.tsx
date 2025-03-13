
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const videos = [
  {
    id: 1,
    title: "Building Schools in Tanzania",
    description: "See how your donations are helping build new schools in rural Tanzania.",
    url: "https://player.vimeo.com/video/164009822",
    thumbnail: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 2,
    title: "Clean Water Initiative",
    description: "Our clean water projects are transforming communities across Africa.",
    url: "https://player.vimeo.com/video/164009822",
    thumbnail: "https://images.unsplash.com/photo-1532639539566-313a88e4d1ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 3,
    title: "Healthcare for Children",
    description: "Providing essential healthcare to children in need around the world.",
    url: "https://player.vimeo.com/video/164009822",
    thumbnail: "https://images.unsplash.com/photo-1542884748-2b87b36c6b90?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  },
];

const VideoSection = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentVideoIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentVideoIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setCurrentVideoIndex(index);
  };

  return (
    <div className="relative bg-charity-offwhite py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-charity-green-dark mb-10">
          See Our Impact
        </h2>
        
        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-4xl">
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl">
              <iframe
                src={videos[currentVideoIndex].url}
                className="w-full h-[400px] md:h-[500px] rounded-lg"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={videos[currentVideoIndex].title}
              ></iframe>
            </div>
            
            <div className="mt-4 text-center">
              <h3 className="text-xl font-semibold text-charity-green-dark">
                {videos[currentVideoIndex].title}
              </h3>
              <p className="mt-1 text-gray-600">
                {videos[currentVideoIndex].description}
              </p>
            </div>
            
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-4 md:-translate-x-10">
              <button
                onClick={handlePrevious}
                className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
                aria-label="Previous video"
              >
                <ChevronLeft className="h-6 w-6 text-charity-green-dark" />
              </button>
            </div>
            
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4 md:translate-x-10">
              <button
                onClick={handleNext}
                className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
                aria-label="Next video"
              >
                <ChevronRight className="h-6 w-6 text-charity-green-dark" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-6 space-x-2">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 w-2 rounded-full focus:outline-none ${
                index === currentVideoIndex ? 'bg-charity-green-dark' : 'bg-gray-300'
              }`}
              aria-label={`Go to video ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoSection;

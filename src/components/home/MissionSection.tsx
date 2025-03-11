
const MissionSection = () => (
  <div className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="lg:text-center">
        <h2 className="text-base text-charity-coral-light font-semibold tracking-wide uppercase">Our Mission</h2>
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Building brighter futures together
        </p>
        <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
          We believe that every child deserves a chance at a bright future, regardless of their circumstances.
        </p>
      </div>

      <div className="mt-10">
        <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
          {[
            {
              title: "Education Support",
              description: "Providing access to quality education and learning resources for underprivileged children.",
              icon: "📚"
            },
            {
              title: "Healthcare Initiatives",
              description: "Ensuring children have access to essential healthcare services and medical treatments.",
              icon: "🏥"
            },
            {
              title: "Community Development",
              description: "Building stronger communities through infrastructure improvements and support programs.",
              icon: "🏘️"
            },
            {
              title: "Emergency Relief",
              description: "Responding quickly to emergencies and natural disasters to protect vulnerable children.",
              icon: "🆘"
            }
          ].map((feature, index) => (
            <div key={index} className="relative">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-charity-blue text-white text-2xl">
                {feature.icon}
              </div>
              <div className="ml-16">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-base text-gray-500">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default MissionSection;

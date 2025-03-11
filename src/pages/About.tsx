
import Layout from "@/components/layout/Layout";

const About = () => {
  return (
    <Layout>
      <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              About Brighter Futures
            </h1>
            <p className="mt-5 max-w-3xl mx-auto text-xl text-gray-500">
              Making a difference in the lives of children around the world.
            </p>
          </div>

          {/* Our Story */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <p className="text-lg text-gray-700 mb-6">
                Founded in 2010, Brighter Futures Fund began with a simple mission: to provide every child with the opportunity to thrive, regardless of their circumstances. What started as a small community initiative has grown into an international organization that has impacted the lives of over 50,000 children worldwide.
              </p>
              <p className="text-lg text-gray-700">
                Our journey began when our founder, Sarah Johnson, witnessed firsthand the challenges faced by children in underprivileged communities during her volunteer work. Determined to make a difference, she gathered a team of passionate individuals who shared her vision of creating sustainable change through education, healthcare, and community development initiatives.
              </p>
            </div>
          </div>

          {/* Our Mission and Vision */}
          <div className="grid md:grid-cols-2 gap-10 mb-20">
            <div className="bg-charity-blue p-8 rounded-lg text-white">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-lg">
                To empower children and communities by providing access to quality education, healthcare, and sustainable development programs that create lasting positive change.
              </p>
            </div>
            <div className="bg-charity-coral p-8 rounded-lg text-white">
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-lg">
                A world where every child has the opportunity to reach their full potential, free from the constraints of poverty, illness, and limited access to education.
              </p>
            </div>
          </div>

          {/* Our Team */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-10">Our Leadership Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Founder & Executive Director",
                  bio: "With over 15 years of nonprofit experience, Sarah has dedicated her career to improving children's lives globally.",
                  image: "/placeholder.svg"
                },
                {
                  name: "David Rodriguez",
                  role: "Director of Programs",
                  bio: "David brings 10 years of international development expertise, overseeing our educational and healthcare initiatives.",
                  image: "/placeholder.svg"
                },
                {
                  name: "Michelle Lee",
                  role: "Chief Financial Officer",
                  bio: "A finance expert with a passion for nonprofit work, Michelle ensures our resources have maximum impact.",
                  image: "/placeholder.svg"
                },
                {
                  name: "James Wilson",
                  role: "Director of Partnerships",
                  bio: "James builds strategic relationships with corporate partners and foundations to expand our reach.",
                  image: "/placeholder.svg"
                },
                {
                  name: "Priya Patel",
                  role: "Director of Global Operations",
                  bio: "With experience in 20+ countries, Priya coordinates our international programs and field teams.",
                  image: "/placeholder.svg"
                },
                {
                  name: "Daniel Kim",
                  role: "Communications Director",
                  bio: "Daniel leads our storytelling efforts, bringing the impact of our work to supporters worldwide.",
                  image: "/placeholder.svg"
                }
              ].map((member, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                  <div className="h-48 bg-gray-200">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-charity-blue mb-3">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Our Impact */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="text-4xl font-bold text-charity-blue mb-2">50,000+</div>
                <p className="text-lg text-gray-700">Children supported through our programs</p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="text-4xl font-bold text-charity-blue mb-2">200+</div>
                <p className="text-lg text-gray-700">Schools built or renovated</p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="text-4xl font-bold text-charity-blue mb-2">25</div>
                <p className="text-lg text-gray-700">Countries where we operate</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-charity-coral-light text-center p-10 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Mission</h2>
            <p className="text-lg text-gray-800 mb-6 max-w-3xl mx-auto">
              There are many ways to get involved and support our work. Whether through donations, volunteering, or partnerships, your contribution makes a difference.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/donate" className="bg-charity-coral text-white py-3 px-6 rounded-md font-medium hover:bg-charity-coral-dark transition-colors">
                Donate Now
              </a>
              <a href="/contact" className="bg-white text-charity-coral py-3 px-6 rounded-md font-medium hover:bg-gray-100 transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;

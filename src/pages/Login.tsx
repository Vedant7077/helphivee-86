
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import { useAuth } from "@/context/AuthContext";
import WebsiteLoader from "@/components/animations/WebsiteLoader";

const Login = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  // Get the returnTo parameter from the URL
  const searchParams = new URLSearchParams(location.search);
  const returnTo = searchParams.get('returnTo') || '/';

  useEffect(() => {
    // Faster loading time (0.5 seconds)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // If user is already logged in, redirect to the returnTo URL or home
  if (user) {
    navigate(returnTo);
    return null;
  }

  return (
    <Layout>
      {loading && <WebsiteLoader duration={1500} />}
      
      <div className="container max-w-md mx-auto py-16">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Welcome to Soulful Giving</h1>
          <p className="text-gray-600 mt-2">Sign in to your account or create a new one</p>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="p-6">
              <LoginForm returnTo={returnTo} />
            </TabsContent>

            <TabsContent value="signup" className="p-6">
              <SignupForm returnTo={returnTo} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Login;

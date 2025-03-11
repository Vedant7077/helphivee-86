
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import Layout from "@/components/layout/Layout";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();

  const handleSuccess = () => {
    // Redirect to home page after successful login/signup
    navigate("/");
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 w-full mb-8">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <LoginForm onSuccess={handleSuccess} />
              </TabsContent>
              
              <TabsContent value="signup">
                <SignupForm onSuccess={handleSuccess} />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-600">
            <p>
              By using our platform, you agree to our{" "}
              <a href="#" className="text-charity-blue hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-charity-blue hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;

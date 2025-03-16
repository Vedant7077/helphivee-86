
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

interface AuthModalProps {
  defaultTab?: 'login' | 'signup';
  onClose?: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ defaultTab = 'login', onClose }) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab);

  const handleSuccess = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in max-w-md w-full mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger 
            value="login"
            className="py-3 data-[state=active]:bg-charity-blue/10 data-[state=active]:text-charity-blue"
          >
            Login
          </TabsTrigger>
          <TabsTrigger 
            value="signup" 
            className="py-3 data-[state=active]:bg-charity-coral/10 data-[state=active]:text-charity-coral"
          >
            Sign Up
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login" className="p-6">
          <LoginForm onSuccess={handleSuccess} />
        </TabsContent>
        <TabsContent value="signup" className="p-6">
          <SignupForm onSuccess={handleSuccess} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthModal;

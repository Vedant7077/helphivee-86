
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';

interface LoginFormProps {
  onSuccess?: () => void;
  redirectTo?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  onSuccess, 
  redirectTo = '/' 
}) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (error) setError(null);
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    
    // Validate form
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login(formData.email, formData.password);
      toast({
        title: "Login successful",
        description: "Welcome back to Brighter Futures!",
      });
      
      // Call onSuccess callback if provided
      if (onSuccess) onSuccess();
      
      // Redirect after successful login
      navigate(redirectTo);
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Mock credentials hint
  const setMockCredentials = (role: 'donor' | 'organizer' | 'admin') => {
    let email;
    
    switch (role) {
      case 'donor':
        email = 'john@example.com';
        break;
      case 'organizer':
        email = 'jane@example.com';
        break;
      case 'admin':
        email = 'admin@example.com';
        break;
    }
    
    setFormData({
      email,
      password: 'password123',
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
        <p className="text-gray-600 mt-2">
          Sign in to continue to your account
        </p>
      </div>
      
      {error && (
        <div className="p-3 rounded-md bg-red-50 flex gap-2 items-start">
          <AlertCircle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-gray-400" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Your email address"
              value={formData.email}
              onChange={handleChange}
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-charity-blue focus:ring-charity-blue sm:text-sm py-3 border"
              required
            />
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <a href="#" className="text-sm text-charity-blue hover:underline">
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-400" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Your password"
              value={formData.password}
              onChange={handleChange}
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-charity-blue focus:ring-charity-blue sm:text-sm py-3 border"
              required
            />
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full btn-primary"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>
      
      {/* Mock credentials helper - only for demo purposes */}
      <div className="border-t border-gray-200 pt-4">
        <p className="text-sm text-gray-500 mb-2 text-center">Demo accounts:</p>
        <div className="flex justify-between gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs flex-1"
            onClick={() => setMockCredentials('donor')}
          >
            Try as Donor
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs flex-1"
            onClick={() => setMockCredentials('organizer')}
          >
            Try as Organizer
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs flex-1"
            onClick={() => setMockCredentials('admin')}
          >
            Try as Admin
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

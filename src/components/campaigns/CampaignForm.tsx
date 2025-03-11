
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Check, Calendar } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';

const categories = [
  'Education',
  'Healthcare',
  'Environment',
  'Water & Sanitation',
  'Food Security',
  'Human Rights',
  'Disaster Relief',
  'Animal Welfare',
  'Arts & Culture',
  'Community Development',
];

const CampaignForm: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    goalAmount: '',
    deadline: '',
    story: '',
  });
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle drag events
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };
  
  // Handle drop event
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.includes('image')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };
  
  // Remove image preview
  const removeImage = () => {
    setImagePreview(null);
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.description || !formData.category || 
        !formData.goalAmount || !formData.deadline || !imagePreview) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields and upload a campaign image.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Campaign submitted successfully!",
        description: "Your campaign has been submitted for review.",
      });
      
      // Redirect to campaigns page
      navigate('/campaigns');
    } catch (error) {
      console.error('Error submitting campaign:', error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your campaign. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
      {/* Campaign Image Upload */}
      <div className="space-y-2">
        <label htmlFor="image" className="block font-medium text-gray-700">
          Campaign Image<span className="text-red-500">*</span>
        </label>
        <div
          className={`border-2 border-dashed rounded-lg p-6 transition-all flex flex-col items-center justify-center ${
            isDragging ? 'border-charity-blue bg-charity-blue/5' : imagePreview ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-charity-blue'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {imagePreview ? (
            <div className="relative w-full">
              <img
                src={imagePreview}
                alt="Campaign Preview"
                className="mx-auto rounded-lg max-h-64 object-cover"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-red-100 transition-colors"
              >
                <X size={16} className="text-red-500" />
              </button>
              <div className="flex items-center justify-center mt-4">
                <Check size={16} className="text-green-500 mr-2" />
                <span className="text-green-500">Image uploaded successfully</span>
              </div>
            </div>
          ) : (
            <>
              <Upload size={32} className="text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-2">
                Drag & drop an image or click to browse
              </p>
              <p className="text-xs text-gray-400">
                Recommended: High-quality image (16:9 ratio, max 5MB)
              </p>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => document.getElementById('image')?.click()}
                className="mt-4 px-4 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Select Image
              </button>
            </>
          )}
        </div>
      </div>

      {/* Campaign Basic Info */}
      <div className="space-y-6">
        <div>
          <label htmlFor="title" className="block font-medium text-gray-700">
            Campaign Title<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="e.g., Clean Water for Rural Communities"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-charity-blue focus:border-transparent"
            maxLength={100}
          />
          <div className="flex justify-end mt-1">
            <span className="text-xs text-gray-500">
              {formData.title.length}/100 characters
            </span>
          </div>
        </div>
        
        <div>
          <label htmlFor="description" className="block font-medium text-gray-700">
            Short Description<span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Briefly describe your campaign (will appear in campaign cards)"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-charity-blue focus:border-transparent resize-none"
            maxLength={200}
          />
          <div className="flex justify-end mt-1">
            <span className="text-xs text-gray-500">
              {formData.description.length}/200 characters
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="category" className="block font-medium text-gray-700">
              Category<span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-charity-blue focus:border-transparent bg-white"
            >
              <option value="" disabled>Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="goalAmount" className="block font-medium text-gray-700">
              Fundraising Goal ($)<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="goalAmount"
              name="goalAmount"
              placeholder="e.g., 5000"
              value={formData.goalAmount}
              onChange={handleChange}
              min="100"
              step="100"
              className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-charity-blue focus:border-transparent"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="deadline" className="block font-medium text-gray-700">
            Campaign End Date<span className="text-red-500">*</span>
          </label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Calendar size={18} className="text-gray-400" />
            </div>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className="block w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-charity-blue focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Campaign Story */}
      <div>
        <label htmlFor="story" className="block font-medium text-gray-700">
          Campaign Story<span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-gray-500 mb-2">
          Tell potential donors about your campaign, who it will help, and how the funds will be used.
        </p>
        <textarea
          id="story"
          name="story"
          placeholder="Share your campaign story in detail..."
          value={formData.story}
          onChange={handleChange}
          rows={8}
          className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-charity-blue focus:border-transparent"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`btn-primary w-full ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Campaign for Review'}
        </button>
        <p className="text-sm text-gray-500 text-center mt-3">
          Your campaign will be reviewed by our team before it goes live.
        </p>
      </div>
    </form>
  );
};

export default CampaignForm;

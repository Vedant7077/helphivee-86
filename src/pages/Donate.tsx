
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import DonationFireworks from "@/components/animations/DonationFireworks";
import WebsiteLoader from "@/components/animations/WebsiteLoader";

const donationSchema = z.object({
  amount: z.string().min(1, "Please select or enter an amount"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  address: z.string().min(5, "Please enter your complete address"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zipCode: z.string().min(5, "Please enter a valid zip code"),
  cardNumber: z.string().min(13, "Please enter a valid card number"),
  cardExpiry: z.string().min(5, "Please enter a valid expiry date (MM/YY)"),
  cardCvv: z.string().min(3, "Please enter a valid CVV"),
  comments: z.string().optional(),
  subscribe: z.boolean().optional(),
  anonymous: z.boolean().optional(),
});

type DonationFormValues = z.infer<typeof donationSchema>;

const Donate = () => {
  const [customAmount, setCustomAmount] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showFireworks, setShowFireworks] = useState(false);
  const [campaignDetails, setCampaignDetails] = useState<any>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const campaignId = new URLSearchParams(location.search).get('campaignId');

  // Load campaign details if campaignId is provided
  useEffect(() => {
    const fetchCampaignDetails = async () => {
      if (campaignId) {
        try {
          const { data, error } = await supabase
            .from('campaigns')
            .select('*')
            .eq('id', campaignId)
            .single();
            
          if (error) throw error;
          if (data) setCampaignDetails(data);
        } catch (error) {
          console.error("Error fetching campaign details:", error);
        }
      }
      
      // Simulate loading
      setTimeout(() => setLoading(false), 1500);
    };
    
    fetchCampaignDetails();
  }, [campaignId]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user && !loading) {
      // Add a message to inform users they need to log in
      toast({
        title: "Authentication required",
        description: "Please log in to make a donation.",
        variant: "destructive",
      });
      
      // Use a timeout to allow the toast to be displayed before redirecting
      const redirectTimeout = setTimeout(() => {
        navigate(`/login?returnTo=${encodeURIComponent(`/donate${campaignId ? `?campaignId=${campaignId}` : ''}`)}`);
      }, 1500);
      
      return () => clearTimeout(redirectTimeout);
    }
  }, [user, campaignId, navigate, toast, loading]);

  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: campaignDetails?.goal ? Math.min(50, Math.round(campaignDetails.goal * 0.1)).toString() : "50",
      firstName: "",
      lastName: "",
      email: user?.email || "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvv: "",
      comments: campaignDetails?.title ? `Donation for: ${campaignDetails.title}` : "",
      subscribe: true,
      anonymous: false,
    },
  });

  // Update form defaults when campaign details are loaded
  useEffect(() => {
    if (campaignDetails) {
      form.setValue('comments', `Donation for: ${campaignDetails.title}`);
      // Set a reasonable default amount (10% of the goal or 50, whichever is less)
      const defaultAmount = Math.min(50, Math.round(campaignDetails.goal * 0.1)).toString();
      form.setValue('amount', defaultAmount);
    }
  }, [campaignDetails, form]);

  const onSubmit = async (data: DonationFormValues) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to make a donation.",
        variant: "destructive",
      });
      
      // Redirect to login page, with a return URL to come back to the donation page
      navigate(`/login?returnTo=${encodeURIComponent(`/donate${campaignId ? `?campaignId=${campaignId}` : ''}`)}`);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Insert donation record into Supabase
      const donationData = {
        user_id: user.id,
        amount: Number(data.amount),
        campaign_id: campaignId || null,
        anonymous: data.anonymous,
        donor_name: data.anonymous ? null : `${data.firstName} ${data.lastName}`,
        created_at: new Date().toISOString(),
      };
      
      const { error } = await supabase
        .from('donations')
        .insert(donationData);
      
      if (error) throw error;
      
      // This would be replaced with actual payment processing logic
      console.log("Donation data:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // If donation was for a specific campaign, update the campaign's amount
      if (campaignId) {
        const { error: updateError } = await supabase.rpc('increment_campaign_amount', {
          campaign_id: campaignId,
          amount_to_add: Number(data.amount)
        });
        
        if (updateError) console.error("Error updating campaign amount:", updateError);
      }
      
      // Show fireworks animation
      setShowFireworks(true);
      
      // After animation finishes, reset form and show toast
      setTimeout(() => {
        setShowFireworks(false);
        toast({
          title: "Thank you for your donation!",
          description: "Your generosity makes our work possible.",
        });
        form.reset();
        setCustomAmount(false);
      }, 8000);
      
    } catch (error: any) {
      console.error("Donation error:", error);
      toast({
        title: "Something went wrong.",
        description: error.message || "Please try again later or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading if page is loading
  if (loading) {
    return (
      <Layout>
        <WebsiteLoader duration={1500} />
        <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Make a Donation</h1>
            <p className="mt-4 text-xl text-gray-600">Loading donation form...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Show loading or redirect if not logged in
  if (!user) {
    return (
      <Layout>
        <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Make a Donation</h1>
            <p className="mt-4 text-xl text-gray-600">Redirecting to login page...</p>
            <div className="mt-8">
              <Button 
                onClick={() => navigate(`/login?returnTo=${encodeURIComponent(`/donate${campaignId ? `?campaignId=${campaignId}` : ''}`)}`)}
                className="bg-charity-green hover:bg-charity-green-dark text-white"
              >
                Login to Donate
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      {showFireworks && <DonationFireworks />}
      
      <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Make a Donation</h1>
            
            {campaignDetails ? (
              <div className="mt-4">
                <p className="text-xl text-charity-green-dark font-medium">
                  Donating to: {campaignDetails.title}
                </p>
                <p className="mt-2 text-gray-600">
                  {campaignDetails.description?.substring(0, 150)}
                  {campaignDetails.description?.length > 150 ? '...' : ''}
                </p>
                <div className="mt-4 flex justify-center">
                  <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-4">
                    <div className="flex justify-between text-sm font-medium mb-2">
                      <span className="text-charity-green-dark">${campaignDetails.current_amount?.toLocaleString()} raised</span>
                      <span className="text-gray-500">of ${campaignDetails.goal?.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-charity-green h-2.5 rounded-full" 
                        style={{ width: `${Math.min(Math.round((campaignDetails.current_amount / campaignDetails.goal) * 100), 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="mt-4 text-xl text-gray-600">Your contribution helps create brighter futures for children in need</p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="p-8">
                {/* Donation Amount */}
                <div className="mb-10">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Donation Amount</h2>
                  
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel>Select Amount</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => {
                              if (value === "custom") {
                                setCustomAmount(true);
                                field.onChange("");
                              } else {
                                setCustomAmount(false);
                                field.onChange(value);
                              }
                            }}
                            defaultValue={field.value}
                            className="grid grid-cols-2 md:grid-cols-4 gap-4"
                          >
                            {["25", "50", "100", "250"].map((amount) => (
                              <div key={amount} className="flex items-center">
                                <RadioGroupItem value={amount} id={`amount-${amount}`} className="sr-only" />
                                <label
                                  htmlFor={`amount-${amount}`}
                                  className={`w-full text-center py-3 px-4 border rounded-md cursor-pointer transition-all ${
                                    field.value === amount && !customAmount
                                      ? "bg-charity-blue text-white border-charity-blue"
                                      : "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
                                  }`}
                                >
                                  ${amount}
                                </label>
                              </div>
                            ))}
                            <div className="flex items-center">
                              <RadioGroupItem value="custom" id="amount-custom" className="sr-only" />
                              <label
                                htmlFor="amount-custom"
                                className={`w-full text-center py-3 px-4 border rounded-md cursor-pointer transition-all ${
                                  customAmount
                                    ? "bg-charity-blue text-white border-charity-blue"
                                    : "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
                                }`}
                              >
                                Custom
                              </label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        
                        {customAmount && (
                          <div className="mt-4">
                            <Input
                              type="number"
                              placeholder="Enter amount"
                              onChange={(e) => field.onChange(e.target.value)}
                              className="border-gray-300"
                              min="1"
                            />
                          </div>
                        )}
                        
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Personal Information */}
                <div className="mb-10">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={isSubmitting} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={isSubmitting} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} disabled={isSubmitting} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone (Optional)</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={isSubmitting} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={isSubmitting} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={isSubmitting} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input {...field} disabled={isSubmitting} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Zip Code</FormLabel>
                            <FormControl>
                              <Input {...field} disabled={isSubmitting} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="mb-10">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Payment Information</h2>
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="cardNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Card Number</FormLabel>
                          <FormControl>
                            <Input placeholder="1234 5678 9012 3456" {...field} disabled={isSubmitting} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="cardExpiry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expiry Date</FormLabel>
                            <FormControl>
                              <Input placeholder="MM/YY" {...field} disabled={isSubmitting} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="cardCvv"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CVV</FormLabel>
                            <FormControl>
                              <Input placeholder="123" type="password" {...field} disabled={isSubmitting} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="mb-10">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Additional Information</h2>
                  
                  <FormField
                    control={form.control}
                    name="comments"
                    render={({ field }) => (
                      <FormItem className="mb-6">
                        <FormLabel>Comments (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Any additional comments or specific campaign you'd like to support..." 
                            {...field} 
                            disabled={isSubmitting}
                            className="min-h-[100px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="subscribe"
                      render={({ field }) => (
                        <FormItem className="flex items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox 
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Subscribe to our newsletter</FormLabel>
                            <p className="text-sm text-gray-500">Receive updates about our campaigns and how your donations are helping.</p>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="anonymous"
                      render={({ field }) => (
                        <FormItem className="flex items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox 
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Make this donation anonymous</FormLabel>
                            <p className="text-sm text-gray-500">Your name will not be displayed publicly.</p>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-charity-coral hover:bg-charity-coral-light text-white text-lg py-6"
                  disabled={isSubmitting || !user}
                >
                  {isSubmitting ? "Processing..." : !user ? "Login to Donate" : "Complete Donation"}
                </Button>

                <p className="text-center text-sm text-gray-500 mt-4">
                  Your donation is tax-deductible. You will receive a receipt via email.
                </p>
              </form>
            </Form>
          </div>

          {/* Support Options */}
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-charity-blue text-3xl font-bold mb-2">Monthly Giving</div>
              <p className="text-gray-600 mb-4">
                Become a monthly donor and provide ongoing support to our programs.
              </p>
              <Button variant="outline" className="border-charity-blue text-charity-blue hover:bg-charity-blue hover:text-white">
                Learn More
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-charity-blue text-3xl font-bold mb-2">Legacy Giving</div>
              <p className="text-gray-600 mb-4">
                Make a lasting impact by including Brighter Futures in your estate planning.
              </p>
              <Button variant="outline" className="border-charity-blue text-charity-blue hover:bg-charity-blue hover:text-white">
                Learn More
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-charity-blue text-3xl font-bold mb-2">Corporate Giving</div>
              <p className="text-gray-600 mb-4">
                Partner with us through corporate giving and employee matching programs.
              </p>
              <Button variant="outline" className="border-charity-blue text-charity-blue hover:bg-charity-blue hover:text-white">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Donate;

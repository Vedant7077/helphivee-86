
import { useState } from "react";
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
  const { toast } = useToast();

  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: "50",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvv: "",
      comments: "",
      subscribe: true,
      anonymous: false,
    },
  });

  const onSubmit = async (data: DonationFormValues) => {
    setIsSubmitting(true);
    
    try {
      // This would be replaced with actual payment processing logic
      console.log("Donation data:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Thank you for your donation!",
        description: "Your generosity makes our work possible.",
      });
      
      form.reset();
      setCustomAmount(false);
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "Please try again later or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Make a Donation</h1>
            <p className="mt-4 text-xl text-gray-600">Your contribution helps create brighter futures for children in need</p>
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Complete Donation"}
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

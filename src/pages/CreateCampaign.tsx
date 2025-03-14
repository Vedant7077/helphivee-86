
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const campaignSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }).max(100),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  goal: z.coerce.number().min(100, { message: "Fundraising goal must be at least $100" }),
  deadline: z.string().refine((date) => new Date(date) > new Date(), {
    message: "Deadline must be in the future",
  }),
  category: z.string().min(1, { message: "Please select a category" }),
  image: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, { message: "Image is required" })
    .refine((files) => files[0].size <= MAX_FILE_SIZE, {
      message: `Max file size is 5MB`,
    })
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files[0].type), {
      message: "Only .jpg, .jpeg, .png and .webp formats are supported",
    })
    .optional(),
});

type CampaignFormValues = z.infer<typeof campaignSchema>;

const CreateCampaign = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      title: "",
      description: "",
      goal: 1000,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10), // 30 days from now
      category: "education",
    },
  });

  const onSubmit = async (data: CampaignFormValues) => {
    if (!user) {
      toast({
        title: "You need to be logged in",
        description: "Please sign in to create a campaign",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    setIsLoading(true);

    try {
      let imageUrl = "";

      if (data.image && data.image.length > 0) {
        const file = data.image[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `campaign-images/${fileName}`;

        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('campaigns')
          .upload(filePath, file);

        if (uploadError) {
          throw new Error('Error uploading image');
        }

        const { data: urlData } = supabase.storage
          .from('campaigns')
          .getPublicUrl(filePath);

        imageUrl = urlData.publicUrl;
      }

      const { error } = await supabase
        .from('campaigns')
        .insert({
          title: data.title,
          description: data.description,
          goal: data.goal,
          deadline: data.deadline,
          category: data.category,
          image_url: imageUrl,
          user_id: user.id,
          current_amount: 0,
          status: 'active',
          created_at: new Date().toISOString(),
        });

      if (error) throw error;

      toast({
        title: "Campaign created!",
        description: "Your fundraising campaign has been created successfully.",
      });

      navigate("/campaigns");
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast({
        title: "Error creating campaign",
        description: "There was a problem creating your campaign. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <Layout>
      <div className="bg-charity-offwhite py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-charity-green-dark">Start Your Fundraising Campaign</h1>
            <p className="mt-2 text-gray-600">Create a campaign to raise funds for a cause you care about</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Campaign Details</CardTitle>
              <CardDescription>
                Fill out the form below to create your fundraising campaign.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Campaign Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Build a School in Tanzania" {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Campaign Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Explain your campaign and why it matters..." 
                            className="min-h-32" 
                            {...field} 
                            disabled={isLoading} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="goal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fundraising Goal ($)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="100" 
                              placeholder="1000" 
                              {...field}
                              disabled={isLoading} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="deadline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Date</FormLabel>
                          <FormControl>
                            <Input 
                              type="date" 
                              {...field}
                              disabled={isLoading} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            {...field}
                            disabled={isLoading}
                          >
                            <option value="education">Education</option>
                            <option value="health">Health & Medical</option>
                            <option value="environment">Environment</option>
                            <option value="animals">Animals & Pets</option>
                            <option value="community">Community Development</option>
                            <option value="disaster">Disaster Relief</option>
                            <option value="other">Other</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { onChange, value, ...rest } }) => (
                      <FormItem>
                        <FormLabel>Campaign Image</FormLabel>
                        <FormControl>
                          <Input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => {
                              onChange(e.target.files);
                              handleImageChange(e);
                            }}
                            disabled={isLoading} 
                            {...rest}
                          />
                        </FormControl>
                        {previewUrl && (
                          <div className="mt-2">
                            <p className="text-sm text-gray-500 mb-1">Image Preview:</p>
                            <img 
                              src={previewUrl} 
                              alt="Preview" 
                              className="max-h-40 rounded-md object-cover" 
                            />
                          </div>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full bg-charity-green hover:bg-charity-green-dark"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating Campaign..." : "Create Campaign"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCampaign;

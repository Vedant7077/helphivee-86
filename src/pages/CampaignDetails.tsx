import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Users, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

interface Campaign {
  id: string;
  title: string;
  description: string;
  goal: number;
  current_amount: number;
  deadline: string;
  category: string;
  image_url: string;
  user_id: string;
  created_at: string;
  status: string;
}

const CampaignDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        if (!id) {
          setError("Campaign ID is missing");
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("campaigns")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          throw error;
        }

        if (!data) {
          setError("Campaign not found");
        } else {
          setCampaign(data);
        }
      } catch (err: any) {
        console.error("Error fetching campaign:", err);
        setError(err.message || "Failed to load campaign details");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
    window.scrollTo(0, 0);
    
    if (id) {
      const channel = supabase
        .channel('campaign-updates')
        .on('postgres_changes', 
          { 
            event: 'UPDATE', 
            schema: 'public', 
            table: 'campaigns',
            filter: `id=eq.${id}`
          }, 
          (payload) => {
            console.log('Campaign updated:', payload);
            if (payload.new && campaign && payload.new.current_amount !== campaign.current_amount) {
              setIsAnimating(true);
              setCampaign(payload.new as Campaign);
              setTimeout(() => setIsAnimating(false), 2000);
            } else {
              setCampaign(payload.new as Campaign);
            }
          }
        )
        .subscribe();
        
      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [id]);
  
  useEffect(() => {
    if (campaign) {
      const calculatedProgress = Math.min(Math.round((campaign.current_amount / campaign.goal) * 100), 100);
      setProgress(calculatedProgress);
    }
  }, [campaign]);

  const getDaysLeft = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const timeDiff = deadlineDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff > 0 ? daysDiff : 0;
  };

  const getLocalImage = (index: number | string) => {
    const localImages = [
      "/placeholder.svg",
      "https://images.unsplash.com/photo-1522661067900-ab829854a57f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1624727828489-a1e03b79bba8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1574722772249-e21eeef4f1bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    ];
    
    if (typeof index === 'string') {
      const numericIndex = index.charCodeAt(0) % localImages.length;
      return localImages[numericIndex];
    }
    
    return localImages[index % localImages.length];
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    const campaignId = typeof id === 'string' 
      ? id.charCodeAt(0) % 6 
      : (parseInt(id || "0") % 6);
    target.src = getLocalImage(campaignId);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-10 px-4">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-72 w-full mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-3/4" />
            </div>
            <div>
              <Skeleton className="h-40 w-full mb-4" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !campaign) {
    return (
      <Layout>
        <div className="container mx-auto py-10 px-4 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Campaign</h1>
          <p className="text-gray-700 mb-6">{error || "Campaign not found"}</p>
          <Button onClick={() => navigate("/campaigns")}>
            Back to Campaigns
          </Button>
        </div>
      </Layout>
    );
  }

  const daysLeft = getDaysLeft(campaign.deadline);
  const formattedDate = new Date(campaign.deadline).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  
  const isCompleted = campaign.status === 'completed' || campaign.current_amount >= campaign.goal || daysLeft === 0;

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <div className="mb-6">
          <Link to="/campaigns" className="text-charity-blue hover:underline mb-4 inline-block">
            &larr; Back to Campaigns
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">{campaign.title}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="mb-8">
              <div className="h-72 md:h-96 bg-gray-200 rounded-lg overflow-hidden mb-4">
                <img 
                  src={campaign.image_url} 
                  alt={campaign.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />
                {isCompleted && (
                  <div className="absolute top-0 right-0 bg-charity-green text-white px-3 py-1 text-sm font-medium">
                    Completed
                  </div>
                )}
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium px-2 py-1 bg-gray-100 rounded-full text-charity-blue">
                    {campaign.category}
                  </span>
                  <span className="text-sm text-gray-500">Created on {new Date(campaign.created_at).toLocaleDateString()}</span>
                </div>
                
                <Progress 
                  value={progress} 
                  className={`h-2 mb-2 ${isAnimating ? 'transition-all duration-1000 ease-out animate-pulse' : ''}`} 
                />
                
                <div className="flex justify-between text-sm font-medium mb-1">
                  <span className="text-charity-blue">${campaign.current_amount.toLocaleString()} raised</span>
                  <span className="text-gray-500">of ${campaign.goal.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{progress}% complete</span>
                  <span className="text-sm text-gray-600">{daysLeft} days left</span>
                </div>
              </div>
            </div>
            
            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold mb-4">About This Campaign</h2>
              <p className="text-gray-700 whitespace-pre-line">{campaign.description}</p>
            </div>
          </div>
          
          <div>
            <Card className="sticky top-24">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Campaign Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-charity-blue mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Deadline</p>
                      <p className="font-medium">{formattedDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-charity-blue mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p className={`font-medium capitalize ${isCompleted ? 'text-charity-green' : ''}`}>
                        {isCompleted ? 'Completed' : campaign.status}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Heart className="h-5 w-5 text-charity-blue mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Goal</p>
                      <p className="font-medium">${campaign.goal.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                
                <Link to={`/donate?campaignId=${campaign.id}`} className="w-full block">
                  <Button 
                    className={`w-full ${isCompleted 
                      ? 'bg-gray-400 hover:bg-gray-500 cursor-not-allowed' 
                      : 'bg-charity-blue hover:bg-charity-blue-light'}`}
                    disabled={isCompleted}
                  >
                    {isCompleted ? 'Campaign Completed' : 'Donate Now'}
                  </Button>
                </Link>
                {isCompleted && (
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    This campaign has completed its goal. Thank you for your support!
                  </p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CampaignDetails;

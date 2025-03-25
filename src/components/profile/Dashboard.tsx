
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";

interface DashboardStats {
  totalCampaigns: number;
  totalDonations: number;
  totalAmountDonated: number;
  activeCampaigns: number;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        
        // Get user's campaigns
        const { data: campaigns, error: campaignsError } = await supabase
          .from('campaigns')
          .select('*')
          .eq('user_id', user.id);
        
        if (campaignsError) throw campaignsError;
        
        // Get user's donations
        const { data: donations, error: donationsError } = await supabase
          .from('donations')
          .select('*')
          .eq('user_id', user.id);
        
        // If the donations table doesn't exist yet, we'll use mock data
        const userDonations = donationsError ? [] : donations || [];
        
        // Calculate stats
        const activeCampaigns = campaigns?.filter(c => c.status === 'active').length || 0;
        const totalAmountDonated = userDonations.reduce((sum, donation) => sum + donation.amount, 0);
        
        setStats({
          totalCampaigns: campaigns?.length || 0,
          totalDonations: userDonations.length,
          totalAmountDonated,
          activeCampaigns
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        // Set mock data if there's an error
        setStats({
          totalCampaigns: 0,
          totalDonations: 0,
          totalAmountDonated: 0,
          activeCampaigns: 0
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [user]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map(i => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Total Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats?.totalCampaigns || 0}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Active Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats?.activeCampaigns || 0}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Donations Made</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats?.totalDonations || 0}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Total Donated</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">${stats?.totalAmountDonated?.toLocaleString() || 0}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

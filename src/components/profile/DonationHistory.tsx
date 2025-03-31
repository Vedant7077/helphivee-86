
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";

type Donation = {
  id: string;
  amount: number;
  campaign_title: string;
  created_at: string;
  campaign_id: string;
};

const DonationHistory = () => {
  const { user } = useAuth();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDonations() {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('donations')
          .select(`
            id,
            amount,
            created_at,
            campaign_id,
            campaigns(title)
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        const formattedDonations = data.map((item: any) => ({
          id: item.id,
          amount: item.amount,
          campaign_title: item.campaigns?.title || 'General Donation',
          created_at: item.created_at,
          campaign_id: item.campaign_id
        }));
        
        setDonations(formattedDonations);
      } catch (error) {
        console.error('Error fetching donations:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchDonations();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-charity-green" />
        <span className="ml-2">Loading donation history...</span>
      </div>
    );
  }

  if (donations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Donation History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500">You haven't made any donations yet.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Donation History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Campaign</th>
                <th className="text-right py-3 px-4">Amount</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    {format(new Date(donation.created_at), 'MMM d, yyyy')}
                  </td>
                  <td className="py-3 px-4">
                    {donation.campaign_title}
                  </td>
                  <td className="py-3 px-4 text-right font-medium">
                    ${donation.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DonationHistory;

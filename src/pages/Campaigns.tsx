
// Since we might have duplicated functionality with our new CampaignsList page,
// we'll make the Campaigns.tsx page redirect to the new page

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Campaigns = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the new campaigns page
    navigate("/campaigns");
  }, [navigate]);
  
  return null; // No rendering needed
};

export default Campaigns;

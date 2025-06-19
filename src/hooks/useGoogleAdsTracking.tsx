import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useGoogleAdsTracking = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("config", "AW-16836532366", {
        page_path: location.pathname,
      });
    }
  }, [location]);
};

export default useGoogleAdsTracking;

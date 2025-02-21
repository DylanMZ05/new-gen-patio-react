import { useEffect, useState } from "react";

const GOOGLE_PLACES_API_KEY = "TU_API_KEY_AQUÍ"; // 🔥 Reemplázala con tu clave
const PLACE_ID = "TU_PLACE_ID_AQUÍ"; // 🔥 Reemplázala con el ID de tu negocio

type Review = {
  author_name: string;
  text: string;
  rating: number;
  profile_photo_url?: string;
};

export const useGoogleReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${GOOGLE_PLACES_API_KEY}`,
        );
        const data = await response.json();
        setReviews(data.result.reviews || []);
      } catch (error) {
        console.error("Error fetching Google Reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return reviews;
};

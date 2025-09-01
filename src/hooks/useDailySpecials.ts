import { useState, useEffect } from 'react';

export interface DailySpecial {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export const useDailySpecials = () => {
  const [dailySpecials, setDailySpecials] = useState<DailySpecial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDailySpecials = async () => {
      try {
        setLoading(true);
        // Use full backend URL with port 8000
        const response = await fetch('http://127.0.0.1:8000/api/menu/daily-specials/');
        
        if (!response.ok) {
          throw new Error('Failed to fetch daily specials');
        }
        
        const data = await response.json();
        
        // Check if there are any daily specials
        if (!data || data.length === 0) {
          setDailySpecials([]);
          setError('No dishes available for today');
          return;
        }
        
        // Transform the data to match our frontend interface
        const transformedData: DailySpecial[] = data.map((item: any) => ({
          id: item.id.toString(),
          name: item.name,
          description: item.description,
          price: parseFloat(item.price),
          image: item.image || '/images/Dining/menu/default-dish.jpg',
        }));
        
        setDailySpecials(transformedData);
        setError(null);
      } catch (err) {
        console.error('Error fetching daily specials:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        
        // Fallback to mock data if API fails
        setDailySpecials([
          {
            id: '1',
            name: "Chef's Special Fish Curry",
            description: "Today's catch prepared with traditional Kerala spices and coconut milk",
            price: 600,
            image: "/images/Dining/menu/kerala-main-course.jpg",
          },
          {
            id: '2',
            name: "Amritha Heritage Roast Chicken",
            description: "Our signature dish prepared with secret family recipe",
            price: 450,
            image: "/images/Dining/menu/heritage-dishes.avif",
          },
          {
            id: '3',
            name: "Kohinoor Special Prawns Biryani",
            description: "Aromatic biryani with fresh prawns and fragrant spices",
            price: 650,
            image: "/images/Dining/menu/regional.webp",
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchDailySpecials();
  }, []);

  return { dailySpecials, loading, error };
};

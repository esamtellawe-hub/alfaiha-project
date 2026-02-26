import { useState, useEffect } from 'react';

export const useAcademy = () => {
  const [data, setData] = useState({
    sections: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAcademyData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/content/academy-page'); // Adjust URL if needed
        if (!response.ok) {
          throw new Error('Failed to fetch academy data');
        }
        const json = await response.json();
        
        setData({
          sections: json.sections || {}
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAcademyData();
  }, []);

  return { ...data, loading, error };
};

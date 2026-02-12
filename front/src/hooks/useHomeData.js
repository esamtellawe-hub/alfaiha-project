import { useState, useEffect } from 'react';
import api from '../api/axios';

const useHomeData = () => {
  const [data, setData] = useState({
    hero: [],
    sections: {}, // Will map section_key -> data
    certifications: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await api.get('/home');
        // Response structure: { hero: [], sections: { key: obj }, certifications: [] }
        setData({
          hero: response.data.hero || [],
          sections: response.data.sections || {},
          certifications: response.data.certifications || [],
          featuredProducts: response.data.featuredProducts || [],
          loading: false,
          error: null
        });
      } catch (err) {
        console.error("Failed to fetch home data:", err);
        setData(prev => ({ ...prev, loading: false, error: err }));
      }
    };

    fetchHomeData();
  }, []);

  return data;
};

export default useHomeData;

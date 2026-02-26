import { useState, useEffect } from 'react';
import api from '../api/axios';

const useNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await api.get('/content/news');
        setArticles(response.data);
      } catch (err) {
        console.error('Failed to fetch news:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return { articles, loading, error };
};

export default useNews;

import { useState, useEffect } from 'react';
import api from '../api/axios';

const useBlogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/content/blogs');
        setPosts(response.data);
      } catch (err) {
        console.error('Failed to fetch blog posts:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
};

export default useBlogs;

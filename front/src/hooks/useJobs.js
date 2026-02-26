import { useState, useEffect } from 'react';
import api from '../api/axios';

const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get('/content/jobs');
        setJobs(response.data);
      } catch (err) {
        console.error('Failed to fetch jobs:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return { jobs, loading, error };
};

export default useJobs;

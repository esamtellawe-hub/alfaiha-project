import { useState, useEffect } from 'react';
import axios from 'axios';

const useAbout = () => {
    const [sections, setSections] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                // Determine API URL based on environment
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                
                // Fetch About Page CMS Data
                const response = await axios.get(`${API_URL}/api/content/about-page`);
                
                setSections(response.data.sections || {});
                setLoading(false);
            } catch (err) {
                console.error('Error fetching about page data:', err);
                setError(err.message || "Failed to load about us data");
                setLoading(false);
            }
        };

        fetchAbout();
    }, []);

    return { sections, loading, error };
};

export default useAbout;

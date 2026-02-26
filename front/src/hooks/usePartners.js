import { useState, useEffect } from 'react';
import axios from 'axios';

const usePartners = () => {
    const [sections, setSections] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                // Determine API URL based on environment
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                
                // Fetch Partner Page CMS Data
                const response = await axios.get(`${API_URL}/api/content/partners-page`);
                
                setSections(response.data.sections || {});
                setLoading(false);
            } catch (err) {
                console.error('Error fetching partners page data:', err);
                setError(err.message || "Failed to load partners data");
                setLoading(false);
            }
        };

        fetchPartners();
    }, []);

    return { sections, loading, error };
};

export default usePartners;

import { useState, useEffect } from 'react';
import api from '../api/axios';

const useSolutions = () => {
    const [sections, setSections] = useState({});
    const [solutions, setSolutions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSolutions = async () => {
            try {
                // Now fetching sections and categories together
                const response = await api.get('/content/solutions-page');
                setSections(response.data.sections || {});
                setSolutions(response.data.categories || []); // Ensure this matches the API return key
                setLoading(false);
            } catch (err) {
                console.error("Error fetching solutions:", err);
                setError(err);
                setLoading(false);
            }
        };

        fetchSolutions();
    }, []);

    return { sections, solutions, loading, error };
};

export default useSolutions;

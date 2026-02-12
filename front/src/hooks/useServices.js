import { useState, useEffect } from 'react';
import api from '../api/axios';

const useServices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await api.get('/content/services');
                setServices(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching services:", err);
                setError(err);
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    return { services, loading, error };
};

export default useServices;

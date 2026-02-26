import { useState, useEffect, useCallback } from 'react';
import api from '../api/axios';

const useProducts = () => {
    const [categories, setCategories] = useState([]);
    const [sectors, setSectors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch master data on mount
    useEffect(() => {
        const fetchMasterData = async () => {
            try {
                const [catsRes, sectorsRes] = await Promise.all([
                    api.get('/data/categories'),
                    api.get('/data/sectors')
                ]);
                setCategories(catsRes.data);
                setSectors(sectorsRes.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching master data:", err);
                setError(err);
                setLoading(false);
            }
        };
        fetchMasterData();
    }, []);

    // Helper to fetch products with filters
    const getProducts = useCallback(async (filters = {}) => {
        try {
            const params = new URLSearchParams();
            if (filters.category) params.append('category', filters.category); // Slug
            if (filters.search) params.append('search', filters.search);
            if (filters.limit) params.append('limit', filters.limit);
            
            const response = await api.get(`/data/all-solutions?${params.toString()}`);
            return response.data;
        } catch (err) {
            console.error("Error fetching products:", err);
            throw err;
        }
    }, []);

    return { categories, sectors, loading, error, getProducts };
};

export default useProducts;

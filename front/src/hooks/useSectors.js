import { useState, useEffect } from 'react';
import axios from 'axios';

const useSectors = () => {
    const [sections, setSections] = useState({});
    const [sectors, setSectors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSectors = async () => {
            try {
                // Determine API URL based on environment
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                
                const response = await axios.get(`${API_URL}/api/content/sectors-page`);
                
                // Store the static texts
                setSections(response.data.sections || {});

                // Transform data from response.data.sectors: Map 'solutions' to 'products' and ensure correct slug for linking
                const transformedData = (response.data.sectors || []).map(sector => ({
                    ...sector,
                    areas: sector.areas ? sector.areas.map(area => ({
                        ...area,
                        products: area.solutions ? area.solutions.map(sol => ({
                            ...sol,
                            name: sol.name_en, // Ensure name is top-level
                            slug: sol.category ? sol.category.slug : sol.slug, // Use Category Slug for linking!
                            icon: sol.category ? sol.category.icon_name : 'Box',
                            description: sol.category ? sol.category.description_en : sol.description_en
                        })) : []
                    })) : []
                }));

                setSectors(transformedData);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching sectors:', err);
                setError(err);
                setLoading(false);
            }
        };

        fetchSectors();
    }, []);

    return { sections, sectors, loading, error };
};

export default useSectors;

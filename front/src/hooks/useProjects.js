import { useState, useEffect } from 'react';
import axios from 'axios';

const useProjects = () => {
    const [sections, setSections] = useState({});
    const [projectsData, setProjectsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // Determine API URL based on environment
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                
                // Fetch combined CMS text and projects dataset
                const response = await axios.get(`${API_URL}/api/content/projects-page`);
                
                setSections(response.data.sections || {});
                setProjectsData(response.data.projects || []);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching projects page data:', err);
                setError(err.message || "Failed to load projects");
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return { sections, projectsData, loading, error };
};

export default useProjects;

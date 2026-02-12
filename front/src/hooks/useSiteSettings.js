import { useState, useEffect } from 'react';
import api from '../api/axios';

const useSiteSettings = () => {
  const [settings, setSettings] = useState({});
  const [regionalOffices, setRegionalOffices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const [settingsRes, officesRes] = await Promise.all([
          api.get('/system/settings'),
          api.get('/system/offices')
        ]);
        
        setSettings(settingsRes.data);
        setRegionalOffices(officesRes.data);
      } catch (err) {
        console.error("Failed to fetch site settings:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, regionalOffices, loading, error };
};

export default useSiteSettings;

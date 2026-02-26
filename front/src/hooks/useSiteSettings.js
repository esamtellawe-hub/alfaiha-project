import { useState, useEffect } from 'react';
import api from '../api/axios';

const useSiteSettings = () => {
  const [settings, setSettings] = useState({});        // site_settings (logo, social links)
  const [footerSections, setFooterSections] = useState({});  // footer_sections (texts in 3 langs)
  const [footerLinks, setFooterLinks] = useState({});        // footer_links (links per column)
  const [footerCategories, setFooterCategories] = useState([]);
  const [regionalOffices, setRegionalOffices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await api.get('/system/footer-data');
        const data = response.data;

        setSettings(data.settings || {});
        setFooterSections(data.footerSections || {});
        setFooterLinks(data.links || {});
        setFooterCategories(data.categories || []);
        setRegionalOffices(data.offices || []);
      } catch (err) {
        console.error('Failed to fetch footer data:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  return { settings, footerSections, footerLinks, footerCategories, regionalOffices, loading, error };
};

export default useSiteSettings;

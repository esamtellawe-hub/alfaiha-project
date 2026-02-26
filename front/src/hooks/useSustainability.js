import { useState, useEffect } from 'react';
import api from '../api/axios';

const useSustainability = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/content/sustainability')
      .then(r => setSections(r.data))
      .catch(e => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  const getSection = (key) => sections.find(s => s.section_key === key) || {};

  return { sections, loading, getSection };
};

export default useSustainability;

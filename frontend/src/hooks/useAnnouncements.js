import { useState, useEffect } from 'react';
import { apiRequest } from '../utils/api';

const useAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnnouncements = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiRequest('/announcements');
      setAnnouncements(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addAnnouncement = async (message) => {
    try {
      const newAnnouncement = await apiRequest('/announcements', 'POST', {
        message
      });
      setAnnouncements(prev => [newAnnouncement.data, ...prev]);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const deleteAnnouncement = async (id) => {
    try {
      await apiRequest(`/announcements/${id}`, 'DELETE');
      setAnnouncements(prev => prev.filter(a => a.id !== id));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return {
    announcements,
    loading,
    error,
    fetchAnnouncements,
    addAnnouncement,
    deleteAnnouncement
  };
};

export default useAnnouncements;
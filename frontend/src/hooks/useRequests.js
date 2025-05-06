import { useState, useEffect } from 'react';
import { apiRequest } from '../utils/api';

const useRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiRequest('/requests');
      setRequests(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (id, status, response = '') => {
    try {
      const updatedRequest = await apiRequest(`/requests/${id}`, 'PUT', {
        status,
        response
      });
      setRequests(prev =>
        prev.map(req => (req.id === id ? updatedRequest.data : req))
      );
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return {
    requests,
    loading,
    error,
    fetchRequests,
    updateRequestStatus
  };
};

export default useRequests;
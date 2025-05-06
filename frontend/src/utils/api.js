// src/utils/api.js
export const apiRequest = async (endpoint, method = 'GET', body = null) => {
    const headers = {
      'Content-Type': 'application/json'
    };
  
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  
    const config = {
      method,
      headers,
      body: body ? JSON.stringify(body) : null
    };
  
    const response = await fetch(`/api${endpoint}`, config);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'API request failed');
    }
  
    return response.json();
  };
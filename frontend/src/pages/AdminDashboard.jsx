import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AdminStats from '../components/admin/AdminStats';
import RequestManagement from '../components/admin/RequestManagement';
import AnnouncementManagement from '../components/admin/AnnouncementManagement';
import AdminSidebar from '../components/admin/AdminSidebar';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ImageModal from '../components/common/ImageModal';
import './AdminDashboard.css';

// Validation utility function
const validateRequestSchema = (request) => {
  const requiredFields = {
    id: 'string',
    title: 'string',
    description: 'string',
    category: 'string',
    status: 'string',
    priority: 'string',
    date: 'string',
    response: 'string',
    image: 'string|null',
    studentName: 'string',
    studentEmail: 'string'
  };

  return Object.keys(requiredFields).every(key => {
    if (!(key in request)) return false;
    const type = requiredFields[key];
    if (type === 'string|null') {
      return typeof request[key] === 'string' || request[key] === null;
    }
    return typeof request[key] === type;
  });
};

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedImage, setSelectedImage] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    priority: 'all'
  });
  const navigate = useNavigate();

  // Data backup system
  const backupData = () => {
    try {
      const backup = {
        requests: JSON.parse(localStorage.getItem('studentRequests') || '[]'),
        announcements: JSON.parse(localStorage.getItem('announcements') || '[]'),
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('backup', JSON.stringify(backup));
    } catch (error) {
      console.error('Backup failed:', error);
    }
  };

  useEffect(() => {
    const loadData = () => {
      try {
        backupData();
        const savedRequests = JSON.parse(localStorage.getItem('studentRequests') || '[]');
        const savedAnnouncements = JSON.parse(localStorage.getItem('announcements') || '[]');

        // Validate and normalize requests
        const validatedRequests = savedRequests.map(req => ({
          id: req.id || Date.now().toString(),
          title: req.title || 'Untitled Request',
          description: req.description || '',
          category: req.category || 'general',
          status: req.status || 'pending',
          priority: req.priority || 'medium',
          date: req.date || new Date().toISOString(),
          response: req.response || '',
          image: req.image || null,
          studentName: req.studentName || 'Anonymous',
          studentEmail: req.studentEmail || 'no-email@example.com'
        }));

        // Filter out invalid requests
        const validRequests = validatedRequests.filter(validateRequestSchema);
        
        if (validRequests.length !== savedRequests.length) {
          console.warn('Filtered invalid requests:', savedRequests.length - validRequests.length);
          localStorage.setItem('studentRequests', JSON.stringify(validRequests));
        }

        setRequests(validRequests);
        setAnnouncements(savedAnnouncements);
      } catch (error) {
        setError(`Data load failed: ${error.message}`);
        // Initialize empty arrays if corrupted
        localStorage.setItem('studentRequests', '[]');
        localStorage.setItem('announcements', '[]');
      } finally {
        setLoading(false);
      }
    };
    setTimeout(loadData, 500);
  }, []);

  // Periodic data validation
  useEffect(() => {
    const interval = setInterval(() => {
      const requests = JSON.parse(localStorage.getItem('studentRequests') || '[]');
      const invalidRequests = requests.filter(req => !validateRequestSchema(req));
      
      if (invalidRequests.length > 0) {
        console.warn('Found invalid requests:', invalidRequests.length);
        setError('Data corruption detected. Please check system logs.');
        backupData();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Data processing for visualizations
  const statusData = Object.entries(
    requests.reduce((acc, req) => {
      acc[req.status] = (acc[req.status] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const categoryData = Object.entries(
    requests.reduce((acc, req) => {
      acc[req.category] = (acc[req.category] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const trendData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return {
      date: date.toISOString().split('T')[0],
      count: requests.filter(req => 
        req.date && new Date(req.date).toDateString() === date.toDateString()
      ).length
    };
  }).reverse();

  const filteredRequests = requests.filter(req => {
    return (
      (filters.status === 'all' || req.status === filters.status) &&
      (filters.category === 'all' || req.category === filters.category) &&
      (filters.priority === 'all' || req.priority === filters.priority)
    );
  });

  const updateRequestStatus = (id, newStatus, response = '') => {
    try {
      backupData();
      const updatedRequests = requests.map(req => {
        if (!req.id || !validateRequestSchema(req)) {
          console.error('Invalid request found:', req);
          return req;
        }
        return req.id === id ? { 
          ...req,
          status: newStatus,
          response: response || req.response,
          lastUpdated: new Date().toISOString()
        } : req;
      });
      
      setRequests(updatedRequests);
      localStorage.setItem('studentRequests', JSON.stringify(updatedRequests));
    } catch (error) {
      setError(`Status update failed: ${error.message}`);
    }
  };

  const handleAnnouncementUpdate = (message, action) => {
    try {
      backupData();
      if (action === 'add') {
        const newAnnouncement = {
          id: Date.now(),
          message,
          date: new Date().toISOString()
        };
        const updatedAnnouncements = [newAnnouncement, ...announcements];
        setAnnouncements(updatedAnnouncements);
        localStorage.setItem('announcements', JSON.stringify(updatedAnnouncements));
      } else if (action === 'delete') {
        const updatedAnnouncements = announcements.filter(a => a.id !== message);
        setAnnouncements(updatedAnnouncements);
        localStorage.setItem('announcements', JSON.stringify(updatedAnnouncements));
      }
    } catch (error) {
      setError(`Announcement operation failed: ${error.message}`);
    }
  };

  if (loading) return <LoadingSpinner fullPage />;

  return (
    <div className="admin-layout">
      <AdminSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={() => {
          localStorage.removeItem('currentUser');
          navigate('/');
        }}
      />
      
      <main className="admin-main">
        {error && (
          <div className="alert error">
            <span>{error}</span>
            <button 
              onClick={() => setError('')} 
              className="close-btn"
              aria-label="Close error message"
            >
              &times;
            </button>
          </div>
        )}

        <div className="dashboard-content">
          {activeTab === 'dashboard' && (
            <>
              <h1 className="page-title">Admin Dashboard Overview</h1>
              <div className="metrics-grid">
                <AdminStats requests={requests} />
                
                <div className="chart-card">
                  <h3>Request Status Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={statusData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                      />
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="chart-card">
                  <h3>Requests Trend (Last 30 Days)</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="count" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="chart-card">
                  <h3>Category Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={categoryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="quick-actions">
                <h3>Quick Actions</h3>
                <div className="action-buttons">
                  <button 
                    className="btn primary"
                    onClick={() => setActiveTab('announcements')}
                  >
                    Post New Announcement
                  </button>
                  <button
                    className="btn secondary"
                    onClick={() => setActiveTab('requests')}
                  >
                    View All Requests
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === 'requests' && (
            <div className="management-section">
              <div className="filters-row">
                <select 
                  value={filters.status}
                  onChange={e => setFilters({...filters, status: e.target.value})}
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>

                <select
                  value={filters.category}
                  onChange={e => setFilters({...filters, category: e.target.value})}
                >
                  <option value="all">All Categories</option>
                  <option value="technical">Technical</option>
                  <option value="academic">Academic</option>
                  <option value="facilities">Facilities</option>
                </select>

                <select
                  value={filters.priority}
                  onChange={e => setFilters({...filters, priority: e.target.value})}
                >
                  <option value="all">All Priorities</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <RequestManagement 
                requests={filteredRequests} 
                onStatusUpdate={updateRequestStatus}
                onImageClick={setSelectedImage}
              />
            </div>
          )}

          {activeTab === 'announcements' && (
            <div className="management-section">
              <AnnouncementManagement 
                announcements={announcements} 
                onAdd={(msg) => handleAnnouncementUpdate(msg, 'add')}
                onDelete={(id) => handleAnnouncementUpdate(id, 'delete')}
              />
            </div>
          )}
        </div>

        {selectedImage && (
          <ImageModal
            imageUrl={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
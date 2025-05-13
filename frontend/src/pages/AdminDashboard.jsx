import { useState, useEffect } from 'react';
import { Cell } from "recharts";

import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AdminStats from '../components/admin/AdminStats';
import RequestManagement from '../components/admin/RequestManagement';
import AnnouncementManagement from '../components/admin/AnnouncementManagement';
import AdminSidebar from '../components/admin/AdminSidebar';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ImageModal from '../components/common/ImageModal';
import '../styles/AdminDashboard.css';

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

  useEffect(() => {
    const loadData = () => {
      try {
        const savedRequests = JSON.parse(localStorage.getItem('studentRequests') || '[]');
        const savedAnnouncements = JSON.parse(localStorage.getItem('announcements') || '[]');
        setRequests(savedRequests);
        setAnnouncements(savedAnnouncements);
      } catch {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    setTimeout(loadData, 500);
  }, []);
const statusData = requests.length > 0 ? Object.entries(
  requests.reduce((acc, req) => {
    acc[req.status] = (acc[req.status] || 0) + 1;
    return acc;
  }, {})
).map(([name, value]) => ({ name, value })) : [
  { name: "Pending", value: 3 },
  { name: "In Progress", value: 2 },
  { name: "Resolved", value: 5 }
];

const trendData = requests.length > 0 ? Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - i);
  return {
    date: date.toISOString().split('T')[0],
    count: requests.filter(req => 
      new Date(req.date).toDateString() === date.toDateString()
    ).length
  };
}).reverse() : [
  { date: "2025-04-01", count: 1 },
  { date: "2025-04-02", count: 2 },
  { date: "2025-04-03", count: 0 },
  { date: "2025-04-04", count: 3 }
];

  const updateRequestStatus = (id, newStatus) => {
    const updatedRequests = requests.map(req => 
      req.id === id ? { ...req, status: newStatus } : req
    );
    setRequests(updatedRequests);
    localStorage.setItem('studentRequests', JSON.stringify(updatedRequests));
  };

  const handleAnnouncement = (announcement, action) => {
    if (action === 'add') {
      const newAnnouncements = [{
        id: Date.now(),
        message: announcement.message,
        image: announcement.image || null,
        date: new Date().toISOString()
      }, ...announcements];
      setAnnouncements(newAnnouncements);
      localStorage.setItem('announcements', JSON.stringify(newAnnouncements));
    } else {
      const newAnnouncements = announcements.filter(a => a.id !== announcement);
      setAnnouncements(newAnnouncements);
      localStorage.setItem('announcements', JSON.stringify(newAnnouncements));
    }
  };

  if (loading) return <LoadingSpinner fullPage />;

  return (
    <div className="admin-container">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="admin-main">
        <div className="admin-header">
          <h1>CampusHelp Admin Dashboard</h1>
          <button 
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem('currentUser');
              navigate('/');
            }}
          >
            Logout
          </button>
        </div>

        {error && <div className="alert error">{error}</div>}

        {activeTab === 'dashboard' && (
          <>
            <div className="dashboard-grid">
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
      label
    >
      {statusData.map((entry, index) => (
        <Cell 
          key={`cell-${index}`} 
          fill={index === 0 ? "#FFA500" : index === 1 ? "#FF7F50" : index === 2 ? "#FF4500" : "#E65100"} 
        />
      ))}
    </Pie>
    <Tooltip />
    <Legend />
  </PieChart>
</ResponsiveContainer>

              </div>

              <div className="chart-card">
                <h3>Request Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="count" 
                      stroke="#FF7F50"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="quick-actions-container">
              <div className="quick-actions">
                <button 
                  className="action-btn primary"
                  onClick={() => setActiveTab('announcements')}
                >
                  <span className="icon">+</span> New Announcement
                </button>
                <button
                  className="action-btn secondary"
                  onClick={() => setActiveTab('requests')}
                >
                  <span className="icon"></span> Manage Requests
                </button>
              </div>
            </div>
          </>
        )}

        {activeTab === 'requests' && (
          <div className="management-section">
            <div className="section-header">
              <h2>Request Management</h2>
              <div className="filters">
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
            </div>
            <RequestManagement 
              requests={requests} 
              onStatusUpdate={updateRequestStatus}
              onImageClick={setSelectedImage}
            />
          </div>
        )}

        {activeTab === 'announcements' && (
          <div className="management-section">
            <div className="section-header">
              <h2>Manage Announcements</h2>
            </div>
            <AnnouncementManagement 
              announcements={announcements} 
              onAddAnnouncement={(message, image) => handleAnnouncement({ message, image }, 'add')}
              onDelete={id => handleAnnouncement(id, 'delete')}
            />
          </div>
        )}

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
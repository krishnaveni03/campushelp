import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import RequestForm from '../components/student/RequestForm';
import RequestList from '../components/student/RequestList';
import Announcements from '../components/student/Announcements';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const categories = ['Hostel', 'Academics', 'Library', 'Technical', 'Other'];

  useEffect(() => {
    const savedRequests = JSON.parse(localStorage.getItem('studentRequests')) || [];
    const savedAnnouncements = JSON.parse(localStorage.getItem('announcements')) || [];
    setRequests(savedRequests);
    setAnnouncements(savedAnnouncements);
  }, []);

  const addRequest = (newRequest) => {
    const updatedRequests = [...requests, newRequest];
    setRequests(updatedRequests);
    localStorage.setItem('studentRequests', JSON.stringify(updatedRequests));
  };

  const upvoteRequest = (requestId) => {
    const updatedRequests = requests.map(req =>
      req.id === requestId ? { ...req, upvotes: (req.upvotes || 0) + 1 } : req
    );
    setRequests(updatedRequests);
    localStorage.setItem('studentRequests', JSON.stringify(updatedRequests));
  };

  const filteredRequests = requests.filter(req => {
    const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || req.category === categoryFilter;
    const matchesSearch = req.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesCategory && matchesSearch;
  });

  return (
    <div className="student-dashboard">
      <header className="dashboard-header">
  <div className="header-wrapper">
    <div className="header-left">
      <h1 className="text-2xl font-bold text-white">Student Helpdesk Portal</h1>
      <p className="text-sm text-white">Track and manage your campus requests</p>
    </div>
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
</header>


      <main className="container">
        <section className="dashboard-controls">
          <div className="controls-container">
            <div className="search-filter-group">
              <input
                type="text"
                placeholder="🔍 Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <div className="select-group">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Statuses</option>
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="quick-actions">
              <button
                className="action-btn primary"
                onClick={() => document.getElementById('requestForm').scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="icon">+</span>
                Submit New Request
              </button>
            </div>
          </div>
        </section>

        <section className="dashboard-main">
          <div className="main-content">
            <div className="request-form-section" id="requestForm">
              <div className="form-card">
                <div className="card-header">
                  <h2>Submit New Request</h2>
                </div>
                <RequestForm onSubmit={addRequest} categories={categories} />
              </div>
            </div>

            <div className="requests-list-section">
              <div className="list-card">
                <div className="card-header">
                  <h2>Your Requests</h2>
                  <span className="results-count">{filteredRequests.length} results</span>
                </div>
                <RequestList requests={filteredRequests} onUpvote={upvoteRequest} />
              </div>
            </div>
          </div>

          <aside className="sidebar">
            <div className="announcements-card">
              <div className="card-header">
                <h2>📢 Latest Announcements</h2>
              </div>
              <Announcements announcements={announcements} />
            </div>
            <div className="knowledge-base">
              <div className="card-header">
                <h2>📚 Knowledge Base</h2>
              </div>
              <div className="kb-items">
                <Link to="/faqs" className="kb-item">
                  <span className="icon">❓</span>
                  FAQs
                </Link>
                <Link to="/campus-map" className="kb-item">
                  <span className="icon">📍</span>
                  Campus Map
                </Link>
                <Link to="/contact-directory" className="kb-item">
                  <span className="icon">📞</span>
                  Contact Directory
                </Link>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
};

export default StudentDashboard;
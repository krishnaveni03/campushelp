import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ComplaintForm from '../components/student/ComplaintForm';
import ComplaintList from '../components/student/ComplaintList';
import Announcements from '../components/student/Announcements';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const categories = ['Hostel', 'Academics', 'Library', 'Technical', 'Other'];

  useEffect(() => {
    const savedComplaints = JSON.parse(localStorage.getItem('studentComplaints')) || [];
    const savedAnnouncements = JSON.parse(localStorage.getItem('announcements')) || [];
    setComplaints(savedComplaints);
    setAnnouncements(savedAnnouncements);
  }, []);

  const addComplaint = (newComplaint) => {
    const updatedComplaints = [...complaints, newComplaint];
    setComplaints(updatedComplaints);
    localStorage.setItem('studentComplaints', JSON.stringify(updatedComplaints));
  };

  const upvoteComplaint = (complaintId) => {
    const updatedComplaints = complaints.map(complaint =>
      complaint.id === complaintId
        ? { ...complaint, upvotes: (complaint.upvotes || 0) + 1 }
        : complaint
    );
    setComplaints(updatedComplaints);
    localStorage.setItem('studentComplaints', JSON.stringify(updatedComplaints));
  };

  const filteredComplaints = complaints.filter(complaint => {
    const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || complaint.category === categoryFilter;
    const matchesSearch =
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (complaint.title && complaint.title.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesCategory && matchesSearch;
  });

  return (
    <div className="student-dashboard">
      <header className="dashboard-header">
        <div className="header-wrapper">
          <div className="header-left">
            <h1 className="text-2xl font-bold text-white">Student Helpdesk Portal</h1>
            <p className="text-sm text-white">
              Track and manage your campus complaints
            </p>
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
                placeholder="🔍 Search complaints..."
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
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="quick-actions">
              <button
                className="action-btn primary"
                onClick={() =>
                  document
                    .getElementById('complaintForm')
                    .scrollIntoView({ behavior: 'smooth' })
                }
              >
                <span className="icon">+</span> Submit New Complaint
              </button>
            </div>
          </div>
        </section>

        <section className="dashboard-main">
          <div className="main-content">
            <div className="complaint-form-section" id="complaintForm">
              <div className="form-card fade-in">
                <div className="card-header">
                  <h2>Submit New Complaint</h2>
                </div>
                <ComplaintForm onSubmit={addComplaint} categories={categories} />
              </div>
            </div>

            <div className="complaints-list-section">
              <div className="list-card fade-in">
                <div className="card-header">
                  <h2>Your Complaints</h2>
                  <span className="results-count">{filteredComplaints.length} results</span>
                </div>
                <ComplaintList complaints={filteredComplaints} onUpvote={upvoteComplaint} />
              </div>
            </div>
          </div>

          <aside className="sidebar fade-in">
            <div className="announcements-card">
              <div className="card-header">
                <h2>Latest Announcements</h2>
              </div>
              <Announcements announcements={announcements} />
            </div>
            <div className="knowledge-base">
              <div className="card-header">
                <h2>Knowledge Base</h2>
              </div>
              <div className="kb-items">
                <Link to="/faqs" className="kb-item">
                  <span className="icon"></span> FAQs
                </Link>
                <Link to="/campus-map" className="kb-item">
                  <span className="icon"></span> Campus Map
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

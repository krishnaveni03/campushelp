import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/AdminSidebar.css';

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="admin-sidebar">
      <div className="sidebar-header">
        <h3>CampusHelp Admin</h3>
      </div>
      <ul className="sidebar-menu">
        <li>
          <button 
            className={activeTab === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
        </li>
        <li>
          <button 
            className={activeTab === 'requests' ? 'active' : ''}
            onClick={() => setActiveTab('requests')}
          >
            Requests
          </button>
        </li>
        <li>
          <button 
            className={activeTab === 'announcements' ? 'active' : ''}
            onClick={() => setActiveTab('announcements')}
          >
            Announcements
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default AdminSidebar;
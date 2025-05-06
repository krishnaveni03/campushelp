import { Link } from 'react-router-dom';
import './KnowledgeBase.css';

const ContactDirectory = () => {
  return (
    <div className="knowledge-base-container">
      <div className="header">
        <h1>Contact Directory</h1>
        <Link to="/student-dashboard" className="back-btn">← Back to Dashboard</Link>
      </div>

      <div className="content">
        <div className="department-list">
          <div className="department-card">
            <h2>Academic Office</h2>
            <p>📞 (02) 1234 5678</p>
            <p>📧 academics@university.edu</p>
            <p>🏢 Building 1, Level 3</p>
          </div>

          <div className="department-card">
            <h2>IT Support</h2>
            <p>📞 (02) 1234 8765</p>
            <p>📧 itsupport@university.edu</p>
            <p>🏢 Building 2, Level 1</p>
          </div>

          <div className="department-card">
            <h2>Student Services</h2>
            <p>📞 (02) 1234 4321</p>
            <p>📧 studentservices@university.edu</p>
            <p>🏢 Student Center, Building 3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDirectory;
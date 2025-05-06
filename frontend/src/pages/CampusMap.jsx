import { Link } from 'react-router-dom';
import './KnowledgeBase.css';

const CampusMap = () => {
  return (
    <div className="knowledge-base-container">
      <div className="header">
        <h1>Campus Map</h1>
        <Link to="/student-dashboard" className="back-btn">← Back to Dashboard</Link>
      </div>

      <div className="content">
        <div className="map-container">
          <iframe 
            title="Campus Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.783330078342!2d151.1953558152106!3d-33.88388092659315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ae1d486416bf%3A0xf8d6397db7a4a518!2sUniversity%20of%20Technology%20Sydney!5e0!3m2!1sen!2sau!4v1657842340517!5m2!1sen!2sau"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          
          <div className="key-locations">
            <h2>Key Locations</h2>
            <ul>
              <li>Building 1 - Administration</li>
              <li>Building 2 - Library</li>
              <li>Building 3 - Student Center</li>
              <li>Building 4 - Science Labs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampusMap;

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaSearch } from 'react-icons/fa';
import './ContactDirectory.css';

const ContactDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const departments = [
    {
      name: 'Academic Office',
      phone: '(02) 1234 5678',
      email: 'academics@university.edu',
      location: 'Building 1, Level 3',
      hours: 'Mon-Fri: 9:00 AM - 5:00 PM',
      description: 'Handle all academic-related inquiries and administrative procedures'
    },
    {
      name: 'IT Support',
      phone: '(02) 1234 8765',
      email: 'itsupport@university.edu',
      location: 'Building 2, Level 1',
      hours: 'Mon-Sat: 8:00 AM - 8:00 PM',
      description: 'Technical support for all campus technology services'
    },
    {
      name: 'Student Services',
      phone: '(02) 1234 4321',
      email: 'studentservices@university.edu',
      location: 'Student Center, Building 3',
      hours: 'Mon-Fri: 8:30 AM - 6:00 PM',
      description: 'Support for student welfare, accommodation, and general inquiries'
    },
    {
      name: 'Library Services',
      phone: '(02) 1234 1234',
      email: 'library@university.edu',
      location: 'Library Building, Ground Floor',
      hours: 'Mon-Sun: 8:00 AM - 10:00 PM',
      description: 'Library services and resources access'
    }
  ];

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="contact-directory">
      <div className="directory-header">
        <h1>Campus Contact Directory</h1>
        <Link to="/student-dashboard" className="back-btn">← Back to Dashboard</Link>
      </div>

      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder=" "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="departments-grid">
        {filteredDepartments.map((dept, index) => (
          <div key={index} className="department-card">
            <h2>{dept.name}</h2>
            <div className="contact-info">
              <p><FaPhone className="icon" /> <a href={`tel:${dept.phone}`}>{dept.phone}</a></p>
              <p><FaEnvelope className="icon" /> <a href={`mailto:${dept.email}`}>{dept.email}</a></p>
              <p><FaMapMarkerAlt className="icon" /> {dept.location}</p>
              <p><FaClock className="icon" /> {dept.hours}</p>
            </div>
            <p className="description">{dept.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactDirectory;

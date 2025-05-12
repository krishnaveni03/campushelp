import React, { useState } from 'react';
import './AnnouncementManagement.css';

const AnnouncementManagement = ({ announcements, onAddAnnouncement, onDelete }) => {
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newAnnouncement.trim()) {
      const imageUrl = imageFile ? URL.createObjectURL(imageFile) : null;
      onAddAnnouncement(newAnnouncement, imageUrl);
      setNewAnnouncement('');
      setImageFile(null);
    }
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit} className="announcement-form">
        <textarea
          value={newAnnouncement}
          onChange={(e) => setNewAnnouncement(e.target.value)}
          placeholder="Enter new announcement..."
          required
        />
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => setImageFile(e.target.files[0])}
        />
       <button type="submit" className="post-btn">Post Announcement</button>
      </form>
      
      <div className="current-announcements">
        <h3>Current Announcements</h3>
        {announcements.length === 0 ? (
          <p>No announcements posted</p>
        ) : (
          <ul>
            {announcements.map((announcement) => (
              <li key={announcement.id}>
                <p>{announcement.message}</p>
                {announcement.image && <img src={announcement.image} alt="Announcement Poster" style={{ width: '200px' }} />}
                <button 
                  className="delete-btn"
                  onClick={() => onDelete(announcement.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AnnouncementManagement;

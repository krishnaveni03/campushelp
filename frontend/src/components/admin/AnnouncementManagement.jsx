import React, { useState } from 'react';

const AnnouncementManagement = ({ announcements, onAddAnnouncement }) => {
  const [newAnnouncement, setNewAnnouncement] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newAnnouncement.trim()) {
      onAddAnnouncement(newAnnouncement);
      setNewAnnouncement('');
    }
  };

  return (
    <div className="card">
      <h2>Manage Announcements</h2>
      <form onSubmit={handleSubmit} className="announcement-form">
        <textarea
          value={newAnnouncement}
          onChange={(e) => setNewAnnouncement(e.target.value)}
          placeholder="Enter new announcement..."
          required
        />
        <button type="submit">Post Announcement</button>
      </form>
      
      <div className="current-announcements">
        <h3>Current Announcements</h3>
        {announcements.length === 0 ? (
          <p>No announcements posted</p>
        ) : (
          <ul>
            {announcements.map(announcement => (
              <li key={announcement.id}>
                <p>{announcement.message}</p>
                <button className="delete-btn">Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AnnouncementManagement;
import React from 'react';

const Announcements = ({ announcements }) => {
  return (
    <div className="card announcements">
      <h2>Announcements</h2>
      {announcements.length === 0 ? (
        <p>No announcements currently</p>
      ) : (
        <ul>
          {announcements.map(announcement => (
            <li key={announcement.id}>
              <div className="announcement-date">
                {new Date().toLocaleDateString()}
              </div>
              <div className="announcement-message">
                {announcement.message}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Announcements;
import React from "react";

export default function AnnouncementList({ announcements }) {
  return (
    <section className="list-section">
      <h2>Announcements</h2>
      {announcements.map((a, idx) => (
        <div key={idx} className="announcement">
          <p>{a.message}</p>
        </div>
      ))}
    </section>
  );
}
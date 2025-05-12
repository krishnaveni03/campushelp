const ComplaintList = ({ complaints }) => {
  return (
    <div className="complaint-list">
      {complaints.length === 0 && <p>No complaints found.</p>}
      {complaints.map((complaint) => (
        <div key={complaint.id} className="complaint-card">
          <h3>{complaint.title}</h3>
          <p><strong>Category:</strong> {complaint.category}</p>
          <p><strong>Urgency:</strong> {complaint.urgency}</p>
          <p>{complaint.description}</p>
          <div className="complaint-actions">
            <span>Status: {complaint.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComplaintList;

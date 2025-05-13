import { useState } from 'react';
import FeedbackForm from './FeedbackForm';
const ComplaintList = ({ complaints }) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const handleFeedbackSubmit = (complaintId, rating, comment) => {
    // Here you would typically make an API call to save the feedback
    console.log('Feedback submitted:', { complaintId, rating, comment });
    setShowFeedback(false);
  };
  return (
    <div className="complaint-list">
      {complaints.length === 0 && <p>No complaints found.</p>}
      {complaints.map((complaint) => (
        <div key={complaint.id} className="complaint-card">
          <p>{complaint.description}</p>
          <div className="complaint-actions">
            <span>Status: {complaint.status}</span>
            {complaint.status === 'Resolved' && (
              <button 
                className="feedback-btn"
                onClick={() => {
                  setSelectedComplaint(complaint);
                  setShowFeedback(true);
                }}
              >
                Give Feedback
              </button>
            )}
          </div>
        </div>
      ))}
      
      {showFeedback && selectedComplaint && (
        <div className="modal">
          <div className="modal-content">
            <FeedbackForm
              requestId={selectedComplaint.id}
              onSubmit={handleFeedbackSubmit}
              onClose={() => setShowFeedback(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default ComplaintList;
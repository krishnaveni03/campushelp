import { useEffect, useState } from 'react';

const RequestDetailsModal = ({ request, onClose, onStatusUpdate }) => {
  const [response, setResponse] = useState(request.response || '');
  const [status, setStatus] = useState(request.status);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onStatusUpdate(request.id, status, response);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Request Details</h2>
          <button onClick={onClose} className="close-btn">
            &times;
          </button>
        </div>
        
        <div className="modal-body">
          <div className="detail-row">
            <span className="detail-label">Student:</span>
            <span>{request.studentName} ({request.studentId})</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Category:</span>
            <span>{request.category}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Submitted:</span>
            <span>{new Date(request.createdAt).toLocaleString()}</span>
          </div>
          <div className="detail-row full-width">
            <span className="detail-label">Description:</span>
            <p>{request.description}</p>
          </div>
          
          <div className="form-group">
            <label>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={`status-select ${status.toLowerCase().replace(' ', '-')}`}
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Admin Response</label>
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Enter your response..."
              rows={4}
            />
          </div>
        </div>
        
        <div className="modal-footer">
          <button onClick={onClose} className="btn secondary">
            Cancel
          </button>
          <button 
            onClick={handleSubmit} 
            className="btn primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailsModal;
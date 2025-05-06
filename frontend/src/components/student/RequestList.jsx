import React from 'react';


const statusColors = {
  Open: 'blue',
  'In Progress': 'orange',
  Resolved: 'green'
};

const RequestList = ({ requests }) => {
  return (
    <div className="card">
      <h2>Your Requests</h2>
      {requests.length === 0 ? (
        <p>No requests submitted yet</p>
      ) : (
        <div className="requests-container">
          {requests.map(request => (
            <div key={request.id} className="request-item">
              <div className="request-header">
                <span className="category">{request.category}</span>
                <span 
                  className="status" 
                  style={{ backgroundColor: statusColors[request.status] }}
                >
                  {request.status}
                </span>
              </div>
              <p className="description">{request.description}</p>
              {request.response && (
                <div className="admin-response">
                  <strong>Admin Response:</strong> {request.response}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestList;
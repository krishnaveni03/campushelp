const AdminStats = ({ requests }) => {
  const counts = {
    total: requests.length,
    open: requests.filter(req => req.status === 'open').length,
    inProgress: requests.filter(req => req.status === 'in-progress').length,
    resolved: requests.filter(req => req.status === 'resolved').length,
  };

  return (
    <div className="admin-stats">
      <div className="stat-row">
        <div className="stat-card">
          <h3>Total Requests</h3>
          <p>{counts.total}</p>
        </div>
        <div className="stat-card">
          <h3>Open</h3>
          <p>{counts.open}</p>
        </div>
      </div>
      <div className="stat-row">
        <div className="stat-card">
          <h3>In Progress</h3>
          <p>{counts.inProgress}</p>
        </div>
        <div className="stat-card">
          <h3>Resolved</h3>
          <p>{counts.resolved}</p>
        </div>
      </div>
    </div>
  );
};
export default AdminStats;
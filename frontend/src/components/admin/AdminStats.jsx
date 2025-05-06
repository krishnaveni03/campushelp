const AdminStats = ({ requests }) => {
    const stats = {
      total: requests.length,
      open: requests.filter(r => r.status === 'Open').length,
      inProgress: requests.filter(r => r.status === 'In Progress').length,
      resolved: requests.filter(r => r.status === 'Resolved').length,
    };
  
    return (
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Requests</h3>
          <p className="stat-value">{stats.total}</p>
        </div>
        <div className="stat-card">
          <h3>Open</h3>
          <p className="stat-value open">{stats.open}</p>
        </div>
        <div className="stat-card">
          <h3>In Progress</h3>
          <p className="stat-value in-progress">{stats.inProgress}</p>
        </div>
        <div className="stat-card">
          <h3>Resolved</h3>
          <p className="stat-value resolved">{stats.resolved}</p>
        </div>
      </div>
    );
  };
  
  export default AdminStats;
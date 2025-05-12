import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Alert from '../components/common/Alert';

const detectRole = (username) => {
  return username.toLowerCase().includes('admin') ? 'admin' : 'student';
};

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!credentials.username || !credentials.password) {
      setError('Please enter both username and password.');
      return;
    }

    const role = detectRole(credentials.username); // Detect role based on username
    const token = btoa(`${credentials.username}:${Date.now()}`);
    const user = {
      id: Date.now(),
      name: credentials.username,
      role,
      token: `mock-jwt-${token}`,
      lastLogin: new Date().toISOString()
    };

    localStorage.setItem('currentUser', JSON.stringify(user));

    // Redirect based on detected role
    navigate(role === 'admin' ? '/admin-dashboard' : '/student-dashboard');
  };

  return (
    <div className="page-wrapper">
      <div className="login-wrapper">
        <div className="login-left">
          <h2 className="heading orange">Campus HelpDesk</h2>
          <p className="subheading">Manage and track your complaints efficiently</p>

          <h3 className="section-title">Login to your account</h3>
          <p className="section-desc">Enter your credentials to access the complaint management system.</p>

          <form onSubmit={handleLogin}>
            {error && <Alert message={error} type="error" />}
            <div className="form-group">
              <input
                type="text"
                placeholder="Username"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
            </div>
            <button type="submit" className="primary-btn">Login</button>
          </form>

          <div className="info-box">
            <strong>Welcome to CampusHelp</strong>
            <p>Please enter your login credentials to access the system. If you need assistance, contact your campus IT support.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

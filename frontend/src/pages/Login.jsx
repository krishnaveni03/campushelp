// src/pages/Login.jsx
import './Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleSelector from '../components/RoleSelector';
import Alert from '../components/common/Alert';

const Login = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!credentials.username || !credentials.password) {
      setError('Please fill in all fields');
      return;
    }

    // Create mock user data
    const mockUser = {
      id: Date.now(),
      name: credentials.username,
      role: isAdmin ? 'admin' : 'student',
      token: 'mock-token-' + Date.now(),
      avatar: `https://i.pravatar.cc/150?u=${credentials.username}`,
      lastLogin: new Date().toISOString()
    };

    // Store in localStorage
    localStorage.setItem('currentUser', JSON.stringify(mockUser));
    
    // Clear form
    setCredentials({ username: '', password: '' });
    
    // Redirect based on role
    navigate(isAdmin ? '/admin-dashboard' : '/student-dashboard');
  };

  return (
    <div className="page-container">
      <div className="login-card">
        <h1>Welcome to CampusHelp</h1>
        
        <RoleSelector isAdmin={isAdmin} setIsAdmin={setIsAdmin} />

        <form onSubmit={handleLogin}>
          {error && <Alert message={error} type="error" />}
          
          <div className="form-group">
            <input
              type="text"
              placeholder={isAdmin ? "Admin ID" : "Student ID"}
              value={credentials.username}
              onChange={(e) => setCredentials(p => ({...p, username: e.target.value}))}
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials(p => ({...p, password: e.target.value}))}
              required
            />
          </div>
          
          <button type="submit" className="primary-btn">
            {isAdmin ? 'Admin Login' : 'Student Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
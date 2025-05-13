
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css';
import Alert from '../components/common/Alert';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validatePassword = (password) => {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /[0-9]/.test(password);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }

    if (!validatePassword(formData.password)) {
      setError('Password must be at least 8 characters with uppercase, lowercase, and numbers');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Mock signup - replace with actual authentication
    const user = {
      id: Date.now(),
      name: formData.name,
      role: formData.role,
      email: formData.email
    };
    localStorage.setItem('currentUser', JSON.stringify(user));
    navigate(formData.role === 'admin' ? '/admin-dashboard' : '/student-dashboard');
  };

  return (
    <div className="page-wrapper">
      <div className="signup-wrapper">
        <h2 className="heading orange">Campus HelpDesk</h2>
        <h3 className="section-title">Create Account</h3>
        
        <form onSubmit={handleSignup}>
          {error && <Alert message={error} type="error" />}
          
          <div className="form-group">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
          </div>
          
          <div className="form-group">
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="student">Student</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
          
          <button type="submit" className="primary-btn">Sign Up</button>
        </form>
        
        <p className="login-link">
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

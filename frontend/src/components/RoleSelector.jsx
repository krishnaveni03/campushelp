// src/components/RoleSelector.jsx
// At the top of RoleSelector.jsx
import './RoleSelector.css';

const RoleSelector = ({ isAdmin, setIsAdmin }) => {
    return (
      <div className="role-selector">
        <button
          className={`role-btn ${!isAdmin ? 'active' : ''}`}
          onClick={() => setIsAdmin(false)}
          type="button"
        >
          Student
        </button>
        <button
          className={`role-btn ${isAdmin ? 'active' : ''}`}
          onClick={() => setIsAdmin(true)}
          type="button"
        >
          Admin
        </button>
      </div>
    );
  };
  
  export default RoleSelector;
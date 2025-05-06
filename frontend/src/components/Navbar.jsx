import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  
  return (
    <nav>
      {user && (
        <div className="user-info">
          <span>Welcome, {user.name}</span>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </nav>
  );
};
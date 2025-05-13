import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Login from './pages/Login';
import Signup from './pages/Signup';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
// Ensure these match your actual filenames
import FAQs from './pages/FAQs';  // If file is FAQs.jsx
import CampusMap from './pages/CampusMap';  // If file is CampusMap.jsx
import ContactDirectory from './pages/ContactDirectory';  // If file is ContactDirectory.jsx

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Student Routes */}
          <Route element={<ProtectedRoute allowedRoles={['student']} />}>
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/campus-map" element={<CampusMap />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
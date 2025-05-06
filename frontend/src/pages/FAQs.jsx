import { Link } from 'react-router-dom';
import './KnowledgeBase.css';

const FAQs = () => {
  return (
    <div className="knowledge-base-container">
      <div className="header">
        <h1>Frequently Asked Questions</h1>
        <Link to="/student-dashboard" className="back-btn">← Back to Dashboard</Link>
      </div>
      
      <div className="content">
        <div className="faq-section">
          <h2>General Questions</h2>
          <div className="faq-item">
            <h3>How do I reset my password?</h3>
            <p>Visit the campus IT portal and use the 'Forgot Password' feature. If issues persist, contact IT support.</p>
          </div>
          <div className="faq-item">
            <h3>Where can I find my class schedule?</h3>
            <p>Schedules are available on the student portal under 'Academic Profile'.</p>
          </div>
        </div>

        <div className="faq-section">
          <h2>Technical Support</h2>
          <div className="faq-item">
            <h3>How to access online library resources?</h3>
            <p>Use your student credentials to log in to the Digital Library portal. Contact library@university.edu for access issues.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
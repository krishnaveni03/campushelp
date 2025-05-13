
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import './KnowledgeBase.css';

const FAQs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [faqs, setFaqs] = useState({});
  const [expandedItems, setExpandedItems] = useState({});
  const [newFaq, setNewFaq] = useState({ category: 'general', question: '', answer: '' });
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const savedFaqs = localStorage.getItem('campushelp_faqs');
    if (savedFaqs) {
      setFaqs(JSON.parse(savedFaqs));
    } else {
      const defaultFaqs = {
        'Login Issues': [
          {
            question: "How do I reset my password?",
            answer: "Visit the campus IT portal and use the 'Forgot Password' feature. If issues persist, contact IT support."
          }
        ],
        'Hostel': [
          {
            question: "What's the process for room allocation?",
            answer: "Room allocation is done based on year of study and previous semester's academic performance."
          }
        ],
        'ID Card': [
          {
            question: "How can I get a replacement ID card?",
            answer: "Visit the Student Services office with a copy of the FIR (if lost) or damaged card. Pay the replacement fee and collect your new card within 3 working days."
          }
        ]
      };
      setFaqs(defaultFaqs);
      localStorage.setItem('campushelp_faqs', JSON.stringify(defaultFaqs));
    }
  }, []);

  const toggleExpand = (category, index) => {
    const key = `${category}-${index}`;
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleAddFaq = (e) => {
    e.preventDefault();
    if (!newFaq.question || !newFaq.answer) return;

    const updatedFaqs = {
      ...faqs,
      [newFaq.category]: [
        ...(faqs[newFaq.category] || []),
        { question: newFaq.question, answer: newFaq.answer }
      ]
    };

    setFaqs(updatedFaqs);
    localStorage.setItem('campushelp_faqs', JSON.stringify(updatedFaqs));
    setNewFaq({ category: 'general', question: '', answer: '' });
  };

  const handleDeleteFaq = (category, index) => {
    const updatedFaqs = {
      ...faqs,
      [category]: faqs[category].filter((_, i) => i !== index)
    };
    setFaqs(updatedFaqs);
    localStorage.setItem('campushelp_faqs', JSON.stringify(updatedFaqs));
  };

  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text;
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === searchTerm.toLowerCase() 
        ? <span key={i} className="highlight">{part}</span>
        : part
    );
  };

  const filteredFaqs = Object.entries(faqs).reduce((acc, [category, questions]) => {
    const filtered = questions.filter(
      ({ question, answer }) =>
        (selectedCategory === 'all' || selectedCategory === category) &&
        (question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        answer.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {});

  return (
    <div className="knowledge-base-container">
      <div className="header">
        <h1>Frequently Asked Questions</h1>
        <Link to="/student-dashboard" className="back-btn">
          ← Back to Dashboard
        </Link>
      </div>

      {isAdmin && (
        <form onSubmit={handleAddFaq} className="faq-form">
          <h2>Add New FAQ</h2>
          <select
            value={newFaq.category}
            onChange={(e) => setNewFaq({ ...newFaq, category: e.target.value })}
          >
            <option value="Login Issues">Login Issues</option>
            <option value="Hostel">Hostel</option>
            <option value="ID Card">ID Card</option>
          </select>
          <input
            type="text"
            placeholder="Question"
            value={newFaq.question}
            onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
          />
          <textarea
            placeholder="Answer"
            value={newFaq.answer}
            onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
          />
          <button type="submit">Add FAQ</button>
        </form>
      )}

      <div className="faq-controls">
        <input
          type="text"
          placeholder="🔍 Search FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="category-chips">
          <button 
            className={`category-chip ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All
          </button>
          {Object.keys(faqs).map(category => (
            <button
              key={category}
              className={`category-chip ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="content">
        {Object.entries(filteredFaqs).map(([category, questions]) => (
          <div key={category} className="faq-section">
            <h2>{category}</h2>
            {questions.map((faq, index) => {
              const key = `${category}-${index}`;
              return (
                <div key={index} className="faq-item">
                  <button
                    className={`faq-question ${expandedItems[key] ? 'expanded' : ''}`}
                    onClick={() => toggleExpand(category, index)}
                  >
                    {highlightText(faq.question, searchTerm)}
                    <span className="expand-icon">{expandedItems[key] ? '−' : '+'}</span>
                  </button>
                  {expandedItems[key] && (
                    <div className="faq-answer">
                      {highlightText(faq.answer, searchTerm)}
                      {isAdmin && (
                        <button 
                          onClick={() => handleDeleteFaq(category, index)}
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
        {Object.keys(filteredFaqs).length === 0 && (
          <p className="no-results">No FAQs found matching your search criteria.</p>
        )}
      </div>

      <div className="need-help-section">
        <p>Still need help? <Link to="/contact-directory">Contact our support team</Link></p>
      </div>
    </div>
  );
};

export default FAQs;

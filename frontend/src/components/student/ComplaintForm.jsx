import { useState } from 'react';

const ComplaintForm = ({ onSubmit, categories }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [urgency, setUrgency] = useState('Medium');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate file size (limit: 5MB)
    if (file && file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB.');
      return;
    }

    const newComplaint = {
      id: Date.now(),
      title,
      category,
      urgency,
      description,
      file,
      status: 'Open',
      upvotes: 0,
    };

    onSubmit(newComplaint);

    // Reset form fields after submission
    setTitle('');
    setCategory(categories[0]);
    setUrgency('Medium');
    setDescription('');
    setFile(null);
  };

  return (
    <form className="complaint-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="complaintTitle">Complaint Title</label>
        <input
          type="text"
          id="complaintTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter complaint title..."
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="complaintCategory">Category</label>
        <select
          id="complaintCategory"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="complaintUrgency">Urgency</label>
        <select
          id="complaintUrgency"
          value={urgency}
          onChange={(e) => setUrgency(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="complaintDescription">Detailed Description</label>
        <textarea
          id="complaintDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your complaint in detail..."
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="supportingDocuments">Supporting Documents</label>
        <input
          type="file"
          id="supportingDocuments"
          onChange={(e) => setFile(e.target.files[0])}
          accept=".pdf,.doc,.docx,.png,.jpg"
        />
        <small>Maximum file size: 5MB</small>
      </div>

      <button type="submit" className="submit-btn">Submit Complaint</button>
    </form>
  );
};

export default ComplaintForm;

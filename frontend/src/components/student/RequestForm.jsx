// components/student/RequestForm.jsx
import { useState } from 'react';

const RequestForm = ({ onSubmit, categories }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: categories[0],
    priority: 'Medium',
    images: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: Date.now(),
      date: new Date().toISOString(),
      status: 'Open',
      upvotes: 0
    });
    setFormData({
      title: '',
      description: '',
      category: categories[0],
      priority: 'Medium',
      images: []
    });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const imagePromises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });
    
    const newImages = await Promise.all(imagePromises);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages].slice(0, 3)
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="request-form">
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value})}
          required
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Priority</label>
        <select
          value={formData.priority}
          onChange={(e) => setFormData({...formData, priority: e.target.value})}
          required
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          required
        />
      </div>

      <div className="form-group">
        <label>Upload Images (Max 3)</label>
        <div className="image-upload-container">
          <label className="upload-btn">
            📸 Upload Images
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              disabled={formData.images.length >= 3}
              style={{ display: 'none' }}
            />
          </label>
          <span className="upload-note">Supported formats: JPG, PNG, GIF (Max 5MB each)</span>
        </div>
        
        <div className="image-previews">
          {formData.images.map((img, index) => (
            <div key={index} className="image-preview">
              <img src={img} alt={`Preview ${index + 1}`} />
              <button
                type="button"
                className="remove-image"
                onClick={() => removeImage(index)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <button type="submit" className="submit-btn">
        Submit Request
      </button>
    </form>
  );
};

export default RequestForm;

import React, { useState } from 'react';

const RatingSystem = ({ requestId, currentRating, onRate }) => {
    const [hoverRating, setHoverRating] = useState(0);
  
    return (
      <div className="rating-system">
        <p>Rate this resolution:</p>
        <div className="rating-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className={`star-btn ${(hoverRating || currentRating) >= star ? 'active' : ''}`}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => onRate(requestId, star)}
              aria-label={`Rate ${star} stars`}
            >
              ★
            </button>
          ))}
        </div>
      </div>
    );
  };
  
export default RatingSystem;
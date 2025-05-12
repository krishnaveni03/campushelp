import { useState } from "react";
import "./CampusMap.css";
import adminImg from "./administration.png";
import libraryImg from "./library.png";
import studentImg from "./student_center.png";
import extraImg from "./campusmap.png"; // New image

const locations = [
  { name: "Administration", img: adminImg, hours: "Mon-Fri: 9AM - 5PM | Sat-Sun: Closed" },
  { name: "Library", img: libraryImg, hours: "Mon-Sat: 8AM - 9PM | Sun: 10AM - 6PM" },
  { name: "Student Center", img: studentImg, hours: "Daily: 7AM - 11PM" }
];

const CampusMap = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <div className="campus-map-container">
      <h1>Campus Help Map</h1>

      <div className="locations-grid">
        {locations.map((location) => (
          <div key={location.name} className="location-card" onClick={() => setSelectedLocation(location)}>
            <img src={location.img} alt={location.name} className="location-img" />
            <h3>{location.name}</h3>
          </div>
        ))}
      </div>

      {/* New Image Below Locations */}
      <div className="extra-image-container">
        <img src={extraImg} alt="Additional Location" className="extra-img" />
        <h3>Campus Map</h3>
      </div>

      {selectedLocation && (
        <div className="details-modal fade-in">
          <button onClick={() => setSelectedLocation(null)} className="close-btn">✖</button>
          <h2>{selectedLocation.name}</h2>
          <img src={selectedLocation.img} alt={selectedLocation.name} className="details-img" />
          <p><strong>Opening Hours:</strong> {selectedLocation.hours}</p>
        </div>
      )}
    </div>
  );
};

export default CampusMap;

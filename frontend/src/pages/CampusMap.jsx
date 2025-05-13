import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import "./CampusMap.css";

// Fix for the marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const locations = [
  {
    id: 1,
    name: "Administration",
    position: [51.505, -0.09],
    hours: "Mon-Fri: 9AM - 5PM | Sat-Sun: Closed",
    description: "Main administrative building housing offices and support services."
  },
  {
    id: 2,
    name: "Library",
    position: [51.506, -0.091],
    hours: "Mon-Sat: 8AM - 9PM | Sun: 10AM - 6PM",
    description: "Central library with study spaces and research resources."
  },
  {
    id: 3,
    name: "Student Center",
    position: [51.507, -0.089],
    hours: "Daily: 7AM - 11PM",
    description: "Hub for student activities and services."
  }
];

const CampusMap = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <div className="campus-map-container">
      <h2>Campus Map</h2>
      <div className="map-content">
        <MapContainer
          center={[51.505, -0.09]}
          zoom={17}
          scrollWheelZoom={true}
          className="map-view"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {locations.map((location) => (
            <Marker
              key={location.id}
              position={location.position}
              eventHandlers={{
                click: () => setSelectedLocation(location),
              }}
            >
              <Popup>
                <div className="location-popup">
                  <h3>{location.name}</h3>
                  <p>{location.description}</p>
                  <p className="hours">{location.hours}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <div className="location-list">
          {locations.map((location) => (
            <div
              key={location.id}
              className={`location-item ${selectedLocation?.id === location.id ? 'active' : ''}`}
              onClick={() => setSelectedLocation(location)}
            >
              <h3>{location.name}</h3>
              <p>{location.hours}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampusMap;

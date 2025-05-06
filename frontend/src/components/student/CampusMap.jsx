const CampusMap = () => (
    <div className="campus-map">
      <h2>Interactive Campus Map</h2>
      <iframe 
        title="Campus Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123456789!2d... (your map URL)"
        style={{ width: '100%', height: '500px', border: 0 }}
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
  
  export default CampusMap;
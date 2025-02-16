import "./Streetview.css";

export default function StreetView() {
  const API_KEY = "AIzaSyAWG4QkqvAc1vTXbnhNko7jA05SqvqWnrg";
  const lat = 42.345446;
  const lng = -71.081856;
  return (
    <div className="street-view-container">
      <div className="street-view-box">
        fdksjlaflkdsf
      <div className="street-view-embed">
        <iframe
          width="600"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/streetview?key=${API_KEY}
      &location=${lat},${lng}
      &heading=210
      &pitch=10
      &fov=35`}
        ></iframe>
      </div></div>
    </div>
  );
}

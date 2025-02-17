import "./Streetview.css";

export default function StreetView({lat, lng}: {lat: number, lng: number}) {
  const API_KEY = process.env.NEXT_PUBLIC_STREET_VIEW_API;
  // const lat = 42.345446;
  // const lng = -71.081856;
  return (
    <div className="street-view-container">
      <div className="street-view-box">
      <div className="street-view-embed">
      <div
    className="absolute top-0 left-0 bg-red-900 w-full"
    style={{ zIndex: 10000, height: 100}}
  ></div>
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

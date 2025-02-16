"use client";

import { useRef, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import L, { LatLngLiteral } from "leaflet";
import "leaflet/dist/leaflet.css";
import osm from "../utils/leaflet";

const BasicMap = () => {

  const [markerPosition, setMarkerPosition] = useState<LatLngLiteral | null>(
    null
  );

  const [center] = useState({ lat: 44.04901, lng: -73.9647 });
  const ZOOM_LEVEL = 12;
  const mapRef = useRef(null);

  const customIcon = L.icon({
    iconUrl: "/user-guess.png",
    iconSize: [38, 38],
    iconAnchor: [19, 38],
  });

  interface LocationMarkerProps {
    setMarkerPosition: (pos: LatLngLiteral) => void;
  }

  function LocationMarker({ setMarkerPosition }: LocationMarkerProps) {
    // useMapEvents is dynamically imported so TS might complain.
    // You can cast the result if needed.
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        console.log("Marker dropped at:", lat, lng);
        setMarkerPosition({ lat, lng });
      },
    });
    return null;
  }


  return (
    <div className="leaflet-container-wrapper">
      <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef} className="leaflet-map">
        <TileLayer
          url={osm.maptiler.url}
          attribution={osm.maptiler.attribution}
        />
        <LocationMarker setMarkerPosition={setMarkerPosition} />
        {markerPosition && (
          <Marker position={markerPosition} icon={customIcon} />
        )}
      </MapContainer>
    </div>
  );
};

export default BasicMap;

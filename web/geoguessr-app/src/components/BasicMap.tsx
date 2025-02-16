"use client";

import { useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import osm from "../utils/leaflet";

const BasicMap = () => {
  const [center] = useState({ lat: 44.04901, lng: -73.9647 });
  const ZOOM_LEVEL = 12;
  const mapRef = useRef(null);

  return (
    <div className="leaflet-container-wrapper">
      <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
        <TileLayer
          url={osm.maptiler.url}
          attribution={osm.maptiler.attribution}
        />
      </MapContainer>
    </div>
  );
};

export default BasicMap;

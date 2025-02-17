"use client";

import { useRef, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import L, { LatLngLiteral } from "leaflet";
import "leaflet/dist/leaflet.css";
import osm from "../utils/leaflet";

const BasicMapWithMarker = ({setLat, setLng}: {setLat: (n: number) => void, setLng: (n: number) => void}) => {

  const [markerPosition, setMarkerPosition] = useState<LatLngLiteral | null>(
    null
  );

  const [center] = useState({ lat: 0, lng: 0 });
  const ZOOM_LEVEL = 0.5;
  const mapRef = useRef(null);

  const customIcon = L.icon({
    iconUrl: "/user-marker.webp",
    iconSize: [25, 25],
    iconAnchor: [12.5, 25],
  });

  interface LocationMarkerProps {
    setMarkerPosition: (pos: LatLngLiteral) => void;
  }

  function LocationMarker({ setMarkerPosition }: LocationMarkerProps) {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        console.log("Marker dropped at:", lat, lng);
        setLat(lat);
        setLng(lng);
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

export default BasicMapWithMarker;

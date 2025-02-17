"use client";

import { useRef, useState } from "react";
import { MapContainer, Marker, TileLayer, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import osm from "../utils/leaflet";

const BasicMapResult = ({
  userLat,
  userLng,
  correctLat,
  correctLng,
  zoom,
}: {
  userLat: number | null;
  userLng: number | null;
  correctLat: number; // make this not null later
  correctLng: number;
  zoom: number;
}) => {
  const userMarkerPosition = { lat: userLat, lng: userLng };
  const correctMarkerPosition = { lat: correctLat, lng: correctLng };
  const centerPosition =
    userLat && userLng 
      ? {
          lat: (userLat + correctLat) / 2,
          lng: (userLng + correctLng) / 2,
        }
      : {
          lat: correctLat,
          lng: correctLng,
        };

  const [center] = useState(centerPosition);
  const ZOOM_LEVEL = zoom;
  const mapRef = useRef(null);
  const ZOOM_DELTA = 2;
  const PX_PER_ZOOM_LEVEL = 2;

  const userIcon = L.icon({
    iconUrl: "/user-marker.webp",
    iconSize: [25, 25],
    iconAnchor: [12.5, 25],
  });
  const correctIcon = L.icon({
    iconUrl: "/correctIcon.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const dottedLine = {
    color: "black",
    weight: 7,
    opacity: 1,
    dashArray: "5, 15",
  };

  return (
    <div className="leaflet-container-result-wrapper">
      <MapContainer
        center={center}
        zoom={ZOOM_LEVEL}
        zoomDelta={ZOOM_DELTA}
        wheelPxPerZoomLevel={PX_PER_ZOOM_LEVEL}
        scrollWheelZoom={true}
        ref={mapRef}
        className="leaflet-result-map"
      >
        <TileLayer
          url={osm.maptiler.url}
          attribution={osm.maptiler.attribution}
        />
        {correctMarkerPosition && (
          <Marker position={correctMarkerPosition} icon={correctIcon} />
        )}

        {userMarkerPosition.lat && userMarkerPosition.lng && (
          <Marker
            position={{
              lat: userMarkerPosition.lat,
              lng: userMarkerPosition.lng,
            }}
            icon={userIcon}
          />
        )}

        {userMarkerPosition.lat && userMarkerPosition.lng && (
          <Polyline
            positions={[
              [userMarkerPosition.lat, userMarkerPosition.lng],
              [correctMarkerPosition.lat, correctMarkerPosition.lng],
            ]}
            pathOptions={dottedLine}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default BasicMapResult;

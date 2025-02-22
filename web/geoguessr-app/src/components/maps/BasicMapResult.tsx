"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer, Polyline, useMap } from "react-leaflet";
import L, { setOptions } from "leaflet";
import "leaflet/dist/leaflet.css";
import osm from "../../utils/leaflet";

const BasicMapResult = ({
  userLat,
  userLng,
  correctLat,
  correctLng,
}: {
  userLat: number | null;
  userLng: number | null;
  correctLat: number; // make this not null later
  correctLng: number;
}) => {
  const userMarkerPosition = { lat: userLat, lng: userLng };
  const correctMarkerPosition = { lat: correctLat, lng: correctLng };

  const ZOOM_DELTA = 2;
  const PX_PER_ZOOM_LEVEL = 2;

  const userIcon = L.icon({
    iconUrl: "/user-marker.webp",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
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
        center={[userLat ?? correctLat, userLng ?? correctLng]}
        zoomDelta={ZOOM_DELTA}
        wheelPxPerZoomLevel={PX_PER_ZOOM_LEVEL}
        scrollWheelZoom={true}
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

        <FitBounds
          userLat={userLat ?? 0}
          userLng={userLng ?? 0}
          correctLat={correctLat}
          correctLng={correctLng}
        />
      </MapContainer>
    </div>
  );
};


export default BasicMapResult;

// sets the bound to include both markers
const FitBounds = ({ userLat, userLng, correctLat, correctLng }: { userLat: number | null, userLng: number | null, correctLat: number, correctLng: number }) => {
  const map = useMap();

  useEffect(() => {
    if (map && userLat && userLng && correctLat && correctLng) {
      const bounds: L.LatLngBoundsExpression = [
        [userLat, userLng],
        [correctLat, correctLng],
      ];
      map.fitBounds(bounds, 
        {
          paddingTopLeft: [0, 40]
        }
      );
    }
  }, [map, userLat, userLng, correctLat, correctLng]);

  return null;
};


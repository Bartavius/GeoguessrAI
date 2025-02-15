// components/InteractiveMap.tsx
import { MapContainer, TileLayer, Marker, Popup, MapContainerProps } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { FC } from 'react'

// Fix default icon issues with Leaflet (if needed)
import L from 'leaflet'
const markerIconPng = require('leaflet/dist/images/marker-icon.png').default as string;
const markerShadowPng = require('leaflet/dist/images/marker-shadow.png').default as string;

const defaultIcon = L.icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconAnchor: [12, 41]
})
L.Marker.prototype.options.icon = defaultIcon

const InteractiveMap: FC<MapContainerProps & { center: [number, number] }> = ({ center, ...props }) => {
  return (
    <MapContainer center={center} zoom={13} style={{ height: '400px', width: '100%' }} {...props}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default InteractiveMap

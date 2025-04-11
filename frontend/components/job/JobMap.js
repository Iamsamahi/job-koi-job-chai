import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function JobMap({ coordinates, title }) {
  if (!coordinates || coordinates.length !== 2) return null;

  return (
    <MapContainer
      center={coordinates}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: '400px', width: '100%', marginTop: '1rem', borderRadius: '10px' }}
    >
      <TileLayer
        url={`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_KEY}`}
        attribution='&copy; <a href="https://www.geoapify.com/">Geoapify</a>'
      />
      <Marker position={coordinates}>
        <Popup>{title}</Popup>
      </Marker>
    </MapContainer>
  );
}

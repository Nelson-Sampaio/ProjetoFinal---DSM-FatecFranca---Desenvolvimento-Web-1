
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Correção necessária para o ícone padrão do Leaflet funcionar no Vite/React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Componente auxiliar para mover o mapa quando a posição muda
function AtualizadorDeMapa({ centro }) {
  const map = useMap();
  map.setView(centro, 16);
  return null;
}

export default function Mapa({ posicao, endereco }) {
  return (
    <div style={{ height: '400px', width: '100%', borderRadius: '1rem', overflow: 'hidden' }} className="shadow-sm">
      <MapContainer 
        center={posicao} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={posicao}>
          <Popup>{endereco || "Localização Atual"}</Popup>
        </Marker>
        <AtualizadorDeMapa centro={posicao} />
      </MapContainer>
    </div>
  );
}
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin, Navigation, Phone, Clock } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default icon issue with leaflet in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const recyclingCenters = [
  {
    id: 1,
    name: 'Green City Recycling',
    position: [40.7128, -74.006],
    phone: '+1 212-555-1234',
    hours: 'Mon-Fri 9am - 6pm',
    acceptedTypes: ['Plastic', 'Paper', 'Metal'],
  },
  {
    id: 2,
    name: 'Eco Waste Solutions',
    position: [40.73061, -73.935242],
    phone: '+1 212-555-5678',
    hours: 'Mon-Sat 8am - 5pm',
    acceptedTypes: ['Organic', 'Glass', 'E-Waste'],
  },
  {
    id: 3,
    name: 'Recycle Hub',
    position: [40.758896, -73.98513],
    phone: '+1 212-555-9012',
    hours: 'Daily 10am - 7pm',
    acceptedTypes: ['Plastic', 'Glass', 'Paper', 'Metal'],
  },
];

const Locations = () => {
  const [mapCenter, setMapCenter] = useState([40.73061, -73.935242]);
  const [mapZoom, setMapZoom] = useState(12);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <MapPin className="w-16 h-16 text-eco-green-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Recycling Centers</h1>
          <p className="text-xl text-gray-600 mb-8">Find nearby recycling facilities and waste collection points</p>
        </motion.div>

        <div className="bg-white rounded-xl shadow-lg p-4 max-w-5xl mx-auto">
          <MapContainer center={mapCenter} zoom={mapZoom} scrollWheelZoom={false} style={{ height: '400px', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {recyclingCenters.map(center => (
              <Marker key={center.id} position={center.position}>
                <Popup>
                  <div className="text-left">
                    <h2 className="font-bold text-lg mb-1">{center.name}</h2>
                    <p><Navigation className="inline w-4 h-4 mr-1 text-eco-blue-600" /> Operating Hours: {center.hours}</p>
                    <p><Phone className="inline w-4 h-4 mr-1 text-eco-blue-600" /> Contact: {center.phone}</p>
                    <p><Clock className="inline w-4 h-4 mr-1 text-eco-blue-600" /> Accepted Types: {center.acceptedTypes.join(', ')}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Locations;

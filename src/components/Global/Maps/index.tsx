import React from 'react';
import { Center, Box } from '@chakra-ui/react';
// import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { MapContainer, TileLayer, Popup, Marker, Polygon } from 'react-leaflet';
import './styles.css';

const redOptions = { color: 'red' };

// const rectangle = [
//   [51.49, -0.08],
//   [51.5, -0.06],
// ];

export default function Maps() {
  return (
    <Center>
      <Box w="800px" borderRadius="27px">
        <MapContainer
          className="markercluster-map"
          center={[-19.4346157, -54.5470082]}
          zoom={13}
          scrollWheelZoom
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          <Marker position={[-19.4346157, -54.5470082]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          <Polygon
            pathOptions={redOptions}
            positions={[
              [-19.434, -53.547],
              [-19.434, -54.537],
              [-18.434, -54.027],
              [-18.434, -53.027],
              [-19.434, -52.027],
            ]}
          />
        </MapContainer>
      </Box>
    </Center>
  );
}

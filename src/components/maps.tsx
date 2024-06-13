'use client';

import React, { FC } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon, LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapComponent {
  destino?: string;
  numPackage?: string;
  userInfo?: string;
  coordinates?: LatLngTuple;
}

export const MapComponent: FC<MapComponent> = ({ destino, numPackage, userInfo, coordinates }) => {
  const myIcon = new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3699/3699580.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32]
  });

  return (
    <div className="relative">
      <MapContainer
        center={coordinates}
        zoom={13}
        scrollWheelZoom={false}
        touchZoom={true}
        style={{ height: '400px', width: '100%', zIndex: '1', borderRadius: '10px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {coordinates && (
          <Marker position={coordinates} icon={myIcon}>
            <Popup>Tu ubicación</Popup>
          </Marker>
        )}
      </MapContainer>
      <div className="absolute bottom-0 z-10  w-full mb-6 flex flex-col justify-center items-center rounded-[12px]">
        <div className="bg-lightPurple w-[270px] h-[75px] flex justify-start items-center rounded-[10px]">
          <div className="text-[12.1px] leading-[13px] p-3">
            <p>
              <span className="font-bold">Destino</span>
              {`: ${destino}`}
            </p>
            <p>
              <span className="font-bold">Número de paquete</span>
              {`: ${numPackage}`}
            </p>
            <p>
              <span className="font-bold">Recibe</span>
              {`: ${userInfo}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

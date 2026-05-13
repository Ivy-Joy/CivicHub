// src/components/station/StationMap.jsx
import React from 'react';
import { Card } from 'react-bootstrap';
import { GeoAltFill } from 'react-bootstrap-icons';

export default function StationMap({ stations = [], selectedStationId, onSelectStation, mapImageUrl }) {
  return (
    <Card className="border-0 shadow-sm overflow-hidden h-100" style={{ borderRadius: 24, minHeight: 560 }}>
      <div
        className="position-relative h-100"
        style={{
          minHeight: 560,
          backgroundImage: `linear-gradient(rgba(7,17,31,0.08), rgba(7,17,31,0.08)), url(${mapImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {stations.map((station, index) => {
          // FIX 1: Ensure we have a unique key. Fallback to index if ID is missing.
          const uniqueKey = station.id || `station-idx-${index}`;
          const active = station.id === selectedStationId;

          // FIX 2: Only render pins that have coordinates
          if (!station.mapX || !station.mapY) return null;

          return (
            <button
              key={uniqueKey}
              type="button"
              onClick={() => onSelectStation(station.id)}
              className="position-absolute border-0 bg-transparent p-0"
              style={{
                left: station.mapX,
                top: station.mapY,
                transform: 'translate(-50%, -100%)',
                cursor: 'pointer',
                zIndex: active ? 5 : 1,
                transition: 'all 0.2s ease', // Smooth transition for selection
              }}
              aria-label={station.name || 'Polling Station'}
            >
              <div className="d-flex flex-column align-items-center">
                <div
                  className={`rounded-circle d-flex align-items-center justify-content-center shadow${active ? '-lg' : ''}`}
                  style={{ 
                    width: active ? 56 : 40, 
                    height: active ? 56 : 40, 
                    backgroundColor: active ? '#0d6efd' : '#d63384', 
                    color: 'white' 
                  }}
                >
                  <GeoAltFill size={active ? 24 : 16} />
                </div>
                
                {active && (
                  <div className="mt-2 px-2 py-1 bg-white shadow-sm rounded-pill small fw-semibold text-dark">
                    {station.stationCode || station.code || 'Selected'}
                  </div>
                )}
              </div>
            </button>
          );
        })}

        {/* Zoom Controls */}
        <div className="position-absolute bottom-0 end-0 m-3 p-2 bg-white rounded-4 shadow-sm d-flex gap-2">
          <button className="btn btn-light btn-sm rounded-circle px-3">+</button>
          <button className="btn btn-light btn-sm rounded-circle px-3">−</button>
        </div>
      </div>
    </Card>
  );
}
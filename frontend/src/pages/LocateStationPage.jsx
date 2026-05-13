// src/pages/LocateStationPage.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import StationSearchBar from '../components/station/StationSearchBar';
import LocationButton from '../components/station/LocationButton';
import StationMap from '../components/station/StationMap';
import StationResultCard from '../components/station/StationResultCard';
import SelectedStationSummary from '../components/station/SelectedStationSummary';

import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';

import { civicApi } from '../services/civicApi';
import { haversineDistanceKm, formatDistanceKm } from '../utils/geo';

const MAP_IMAGE_URL = 'https://i.imgur.com/Q9vQ6Xb.png';

export default function LocateStationPage() {
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [stations, setStations] = useState([]);
  const [selectedStationId, setSelectedStationId] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  const [loading, setLoading] = useState(false); // Start false to prevent initial fetch
  const [searchingLocation, setSearchingLocation] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // Controls the "Search to start" view

  const [error, setError] = useState('');
  const [locationError, setLocationError] = useState('');

  // ================= FETCH STATIONS =================
  const fetchStations = async (nextQuery = query, nextLocation = userLocation) => {
    // Prevent fetching empty results on mount
    if (!nextQuery && !nextLocation) return;

    setLoading(true);
    setError('');
    setHasSearched(true);

    try {
      const data = await civicApi.searchStations(nextQuery, nextLocation);
      const items = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];

      setStations(items);

      if (items.length && (!selectedStationId || !items.some((s) => s.id === selectedStationId))) {
        setSelectedStationId(items[0].id);
      }
    } catch (err) {
      setError(err.message || 'Could not load stations');
    } finally {
      setLoading(false);
    }
  };

  // Debounce search input to avoid hitting backend on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim().length > 2) {
        fetchStations(query, userLocation);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  const selectedStation = useMemo(
    () => stations.find((s) => s.id === selectedStationId) || null,
    [stations, selectedStationId]
  );

  // ================= USE LOCATION =================
  // ================= USE LOCATION =================
const handleUseLocation = () => {
  setLocationError('');
  setSearchingLocation(true);

  if (!navigator.geolocation) {
    setSearchingLocation(false);
    setLocationError('Your browser does not support live location.');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const nextLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      setUserLocation(nextLocation);

      try {
        const data = await civicApi.searchStations(query, nextLocation);
        const items = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];

        // ✅ Apply haversineDistanceKm correctly to distanceKm and distanceLabel
        const mappedItems = items.map((item) => {
          const distance = typeof item.lat === 'number' && typeof item.lng === 'number'
            ? haversineDistanceKm(nextLocation, { lat: item.lat, lng: item.lng })
            : Number.MAX_SAFE_INTEGER;

          return {
            ...item,
            distanceKm: distance,
            distanceLabel: distance === Number.MAX_SAFE_INTEGER ? '—' : formatDistanceKm(distance),
          };
        });

        // ✅ Sort by the actual distanceKm
        mappedItems.sort((a, b) => a.distanceKm - b.distanceKm);

        setStations(mappedItems);

        if (mappedItems.length) {
          setSelectedStationId(mappedItems[0].id); // Select the closest one
        }
      } catch (err) {
        setLocationError(err.message || 'Could not load nearby stations');
      } finally {
        setSearchingLocation(false);
      }
    },
    () => {
      setSearchingLocation(false);
      setLocationError('Location access was denied. Search manually instead.');
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
};
  // ================= GOOGLE MAPS =================
  const openDirections = () => {
    if (!selectedStation) return;
    const hasCoords = typeof selectedStation.lat === 'number' && typeof selectedStation.lng === 'number';
    let url = hasCoords
      ? `https://www.google.com/maps/dir/?api=1&destination=${selectedStation.lat},${selectedStation.lng}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedStation.name)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // ================= NAVIGATE TO WHO REPRESENTS (RESTORED) =================
  const openWhoRepresents = async () => {
    if (!selectedStation) return;
    try {
      const data = await civicApi.getAreaByStationId(selectedStation.id);
      const areaId = data?.data?.id || data?.id;
      navigate('/whorepresents', { state: { areaId, stationId: selectedStation.id } });
    } catch {
      navigate('/whorepresents', { state: { stationId: selectedStation.id } });
    }
  };

  return (
    <div style={{ background: 'linear-gradient(180deg, #f7f9fc 0%, #eef3f9 100%)', minHeight: '100vh' }}>
      <Container className="py-4 py-lg-5">
        <Row className="g-4">
          <Col lg={4}>
            <div className="mb-3">
              <div className="text-uppercase small fw-semibold text-muted mb-1">Locate My Station</div>
              <h2 className="fw-bold mb-2">Find your registration or polling station</h2>
              <p className="text-muted mb-0">Search by place or use your live location.</p>
            </div>

            <StationSearchBar value={query} onChange={setQuery} />

            <div className="mt-3">
              <LocationButton loading={searchingLocation} onClick={handleUseLocation} />
            </div>

            {locationError && <Alert variant="warning" className="mt-3 mb-0">{locationError}</Alert>}

            <div className="mt-4 d-grid gap-3">
              {!hasSearched ? (
                <div className="text-center py-5 bg-white rounded-4 border">
                  <p className="text-muted mb-0">Type a name above to search for stations.</p>
                </div>
              ) : loading ? (
                <LoadingState label="Loading stations..." />
              ) : error ? (
                <ErrorState title="Stations could not load" message={error} onRetry={() => fetchStations()} />
              ) : stations.length ? (
                stations.map((station) => (
                  <StationResultCard
                    key={station.id}
                    station={{
                      ...station,
                      distanceLabel: station.distanceLabel || formatDistanceKm(station.distanceKm),
                    }}
                    active={station.id === selectedStationId}
                    onClick={() => setSelectedStationId(station.id)}
                  />
                ))
              ) : (
                <EmptyState title="No stations found" description="Try a different location name." />
              )}
            </div>
          </Col>

          <Col lg={8}>
            <StationMap
              stations={stations}
              selectedStationId={selectedStationId}
              onSelectStation={setSelectedStationId}
              mapImageUrl={MAP_IMAGE_URL}
            />

            <SelectedStationSummary
              station={selectedStation ? {
                ...selectedStation,
                distanceLabel: selectedStation.distanceLabel || formatDistanceKm(selectedStation.distanceKm),
              } : null}
              onDirections={openDirections}
              onOpenAreaHub={openWhoRepresents}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
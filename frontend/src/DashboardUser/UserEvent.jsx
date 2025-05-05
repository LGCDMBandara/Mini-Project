import React, { useEffect, useRef, useState, useMemo } from 'react';
import UserNav from '../Component/UserNav';
import UserMainNav from '../Component/UserMainNav';
import Alert from '../Component/Alert';
import './userEvent.css';
import { useTranslation } from 'react-i18next';

const UserEvent = () => {
  const { t } = useTranslation();
  const mapRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [availableDistricts, setAvailableDistricts] = useState([]);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [isMapScriptLoaded, setIsMapScriptLoaded] = useState(false);

  const GOOGLE_MAPS_API_KEY = 'AIzaSyAsfuQQDAhqljnQkU-FIABl15DWBSHGvnw';
  const MAP_ID = '9e2f7a79153799e0'; 

  const provinces = [
    'Western Province',
    'Central Province',
    'Southern Province',
    'Northern Province',
    'Eastern Province',
    'North Western Province',
    'North Central Province',
    'Uva Province',
    'Sabaragamuwa Province',
  ];

  const districtsByProvince = {
    'Western Province': ['Colombo District', 'Gampaha District', 'Kalutara District'],
    'Central Province': ['Kandy District', 'Matale District', 'NuwaraEliya District'],
    'Southern Province': ['Galle District', 'Matara District', 'Hambanthota District'],
    'Northern Province': ['Jaffna District', 'Kilinochchi District', 'Mannar District', 'Vavuniya District', 'Mullaitivu District'],
    'Eastern Province': ['Trincomalee District', 'Batticaloa District', 'Ampara District'],
    'North Western Province': ['Kurunegala District', 'Puttalam District'],
    'North Central Province': ['Anuradhapura District', 'Polonnaruwa District'],
    'Uva Province': ['Badulla District', 'Monaragala District'],
    'Sabaragamuwa Province': ['Ratnapura District', 'Kegalle District'],
  };

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleProvinceChange = (e) => {
    const province = e.target.value;
    setSelectedProvince(province);
    setAvailableDistricts(districtsByProvince[province] || []);
    setSelectedDistrict('');
  };
  const handleDistrictChange = (e) => setSelectedDistrict(e.target.value);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch = !search || event.date === search;
      const matchesProvince = !selectedProvince || event.province === selectedProvince;
      const matchesDistrict = !selectedDistrict || event.district === selectedDistrict;
      return matchesSearch && matchesProvince && matchesDistrict;
    });
  }, [events, search, selectedProvince, selectedDistrict]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events/fetch');
        if (!response.ok) throw new Error('Failed to fetch events');
        const data = await response.json();
        setEvents(data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    if (window.google && window.google.maps) {
      setIsMapScriptLoaded(true);
      return;
    }
  
    const loadScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=marker&v=weekly`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.google && window.google.maps) {
          setIsMapScriptLoaded(true);
        } else {
          console.error('Google Maps API failed to initialize');
        }
      };
      script.onerror = () => console.error('Failed to load Google Maps script');
      document.head.appendChild(script);
    };
  
    const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`);
    if (!existingScript) {
      loadScript();
    } else {
      existingScript.onload = () => {
        if (window.google && window.google.maps) {
          setIsMapScriptLoaded(true);
        }
      };
    }
  }, [GOOGLE_MAPS_API_KEY]);
  
  useEffect(() => {
    if (!isMapScriptLoaded || !window.google || !window.google.maps || !mapRef.current || map) return;
  
    try {
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: { lat: 7.8731, lng: 80.7718 },
        zoom: 5,
        mapId: MAP_ID,
      });
      setMap(mapInstance);
    } catch (error) {
      console.error('Error initializing Google Map:', error);
    }
  }, [isMapScriptLoaded, map, MAP_ID]);

  useEffect(() => {
    if (!map || !isMapScriptLoaded || !window.google) return;

    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);

    const eventsToDisplay = filteredEvents.length > 0 || search || selectedProvince || selectedDistrict
      ? filteredEvents
      : events;

    const newMarkers = eventsToDisplay.map((event) => {
      const [latStr, lngStr] = event.location?.split(',').map((coord) => coord?.trim()) || [];
      const lat = parseFloat(latStr);
      const lng = parseFloat(lngStr);

      if (
        !isNaN(lat) && !isNaN(lng) &&
        lat >= -90 && lat <= 90 &&
        lng >= -180 && lng <= 180
      ) {

        const marker = new window.google.maps.marker.AdvancedMarkerElement({
          position: { lat, lng },
          map,
          title: event.teamName,
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; max-width: 200px; text-align: center;">
              <h5 style="font-size: 14px; font-weight: 500; margin: 0; color: #333;">
                <strong>${t('Organizer')}: </strong> ${event.teamName}
              </h5>
              <p style="font-size: 16px; margin: 5px 0; color: #555;">
                <strong>${t('Date')}: </strong> ${event.date}
              </p>
              <p style="font-size: 16px; margin: 5px 0; color: #555;">
                <strong>${t('Time')}: </strong> ${event.fromTime} - ${event.toTime}
              </p>
              <p style="font-size: 16px; margin: 5px 0; color: #555;">
                <strong>${t('Urgent Blood Type')}: </strong> ${event.bloodgroup}
              </p>
            </div>
          `,
        });

        marker.addListener('gmp-click', () => {
          infoWindow.open({ anchor: marker, map });
        });

        return marker;
      } else {
        console.error('Invalid event location:', event.location);
        return null;
      }
    }).filter((marker) => marker !== null);

    setMarkers(newMarkers);

    if (newMarkers.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      newMarkers.forEach((marker) => bounds.extend(marker.position));
      map.fitBounds(bounds);
    }
  }, [map, isMapScriptLoaded, events, filteredEvents, t]);

  return (
    <div className="mainUser">
      <Alert />
      <UserNav />
      <UserMainNav />
      <div className="userEvent-card">
        <div className="userEvent-main">
          <div className="usercard-map">
            <div className="usercard-header">
              <h1 className="usermap-title">{t('Donation Events')}</h1>
            </div>
            <div className="usermap-filters">
              <input
                type="date"
                value={search}
                onChange={handleSearchChange}
                className="usermap-input"
              />
              <select
                value={selectedProvince}
                onChange={handleProvinceChange}
                className="usermap-select"
              >
                <option value="">--{t('Select Province')}--</option>
                {provinces.map((province) => (
                  <option key={province} value={province}>{t(province)}</option>
                ))}
              </select>
              <select
                value={selectedDistrict}
                onChange={handleDistrictChange}
                className="usermap-select"
                disabled={!availableDistricts.length}
              >
                <option value="">--{t('Select District')}--</option>
                {availableDistricts.map((district) => (
                  <option key={district} value={district}>{t(district)}</option>
                ))}
              </select>
            </div>
            <div ref={mapRef} style={{ width: '100%', height: '390px', borderRadius: '15px' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEvent;
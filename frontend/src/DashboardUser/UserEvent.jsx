import React, { useEffect, useRef, useState } from 'react';
import UserNav from '../Component/UserNav';
import './userEvent.css';
import UserMainNav from '../Component/UserMainNav';
import Alert from '../Component/Alert';

const UserEvent = () => {
   /* const mapRef = useRef(null);
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [availableDistricts, setAvailableDistricts] = useState([]);
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);

    const provinces = [
        'Western Province', 'Central Province', 'Southern Province',
        'Northern Province', 'Eastern Province',
        'North Western Province', 'North Central Province',
        'Uva Province', 'Sabaragamuwa Province',
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

    // Filter events based on search, province, and district
    const filteredEvents = events.filter((event) => {
        const matchesSearch = !search || event.date === search;
        const matchesProvince = !selectedProvince || event.province === selectedProvince;
        const matchesDistrict = !selectedDistrict || event.district === selectedDistrict;
        return matchesSearch && matchesProvince && matchesDistrict;
    });

    // Fetch events from the backend
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

    // Initialize Google Map
    useEffect(() => {
        let script;
        const initializeMap = () => {
            const mapInstance = new window.google.maps.Map(mapRef.current, {
                center: { lat: 7.8731, lng: 80.7718 },
                zoom: 7,
            });
            setMap(mapInstance);
        };

        if (!window.google) {
            script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAsfuQQDAhqljnQkU-FIABl15DWBSHGvnw&libraries=marker&callback=initializeMap`;
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
            window.initializeMap = initializeMap;
        } else {
            initializeMap();
        }

        return () => {
            if (script) script.remove();
            window.initializeMap = undefined;
        };
    }, []); // Empty dependency array to run once

    // Update markers
    useEffect(() => {
        if (!map) return;

        // Clear existing markers
        markers.forEach(marker => marker.map = null);
        setMarkers([]);

        // Use filteredEvents if filters are applied, otherwise use all events
        const eventsToDisplay = (search || selectedProvince || selectedDistrict)
            ? filteredEvents
            : events;

        eventsToDisplay.forEach(event => {
            let lat, lng;

            // Parse location
            if (typeof event.location === 'string') {
                const coords = event.location.split(',').map(coord => parseFloat(coord.trim()));
                if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
                    lat = coords[0];
                    lng = coords[1];
                }
            } else if (event.location && typeof event.location === 'object') {
                lat = event.location.lat;
                lng = event.location.lng;
            } else if (Array.isArray(event.location) && event.location.length === 2) {
                lat = event.location[0];
                lng = event.location[1];
            }

            // Validate coordinates
            if (
                lat !== undefined && lng !== undefined &&
                !isNaN(lat) && !isNaN(lng) &&
                lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180
            ) {
                // Use AdvancedMarkerElement
                const marker = new window.google.maps.marker.AdvancedMarkerElement({
                    position: { lat, lng },
                    map,
                    title: event.teamName,
                });

                const infoWindow = new window.google.maps.InfoWindow({
                    content: `
                        <div style="padding: 8px; max-width: 200px; text-align: center;">
                            <h5 style="font-size: 16px; font-weight: bold; margin: 0; color: #333;">
                                <strong>Organizer:</strong> ${event.teamName}
                            </h5>
                            <p style="font-size: 12px; margin: 5px 0; color: #555;">
                                <strong>Date:</strong> ${event.date}
                            </p>
                            <p style="font-size: 12px; margin: 5px 0; color: #555;">
                                <strong>Time:</strong> ${event.fromTime} - ${event.toTime}
                            </p>
                            <p style="font-size: 12px; margin: 5px 0; color: #555;">
                                <strong>Urgent Blood Type:</strong> ${event.bloodgroup}
                            </p>
                        </div>
                    `,
                });

                marker.addListener('click', () => {
                    infoWindow.open({ anchor: marker, map });
                });

                setMarkers(prev => [...prev, marker]);
            } else {
                console.error('Invalid event location:', event.location);
            }
        });
    }, [map, events, filteredEvents, search, selectedProvince, selectedDistrict]);*/

    return (
        <div className="mainUser">
            <Alert />
            <UserNav />
            <UserMainNav />
            <div className="userEvent-card">
                <div className="userEvent-main">
                   {/* <div className="usercard-map">
                        <div className="usercard-header">
                            <h1 className="usermap-title">Donation Events</h1>
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
                                <option value="">--Select Province--</option>
                                {provinces.map(province => (
                                    <option key={province} value={province}>{province}</option>
                                ))}
                            </select>
                            <select
                                value={selectedDistrict}
                                onChange={handleDistrictChange}
                                className="usermap-select"
                                disabled={!availableDistricts.length}
                            >
                                <option value="">--Select District--</option>
                                {availableDistricts.map(district => (
                                    <option key={district} value={district}>{district}</option>
                                ))}
                            </select>
                        </div>
                        <div ref={mapRef} style={{ width: '100%', height: '390px', borderRadius: '15px' }} />
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default UserEvent;
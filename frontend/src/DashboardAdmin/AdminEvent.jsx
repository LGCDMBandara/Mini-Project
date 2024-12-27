import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import AdminNav from '../Component/AdminNav';
import AdminMainNav from '../Component/AdminMainNav';
import './adminEvent.css';

const provinces = [
    "Western Province", "Central Province", "Southern Province", "Northern Province", "Eastern Province", 
    "North Western Province", "North Central Province", "Uva Province", "Sabaragamuwa Province"
];

const districtsByProvince = {
    "Western Province": ["Colombo District", "Gampaha District", "Kalutara District"],
    "Central Province": ["Kandy District", "Matale District", "NuwaraEliya District"],
    "Southern Province": ["Galle District", "Matara District", "Hambanthota District"],
    "Northern Province": ["Jaffna District", "Kilinochchi District", "Mannar District", "Vavuniya District", "Mullaitivu District"],
    "Eastern Province": ["Trincomalee District", "Batticaloa District", "Ampara District"],
    "North Western Province": ["Kurunegala District", "Puttalam District"],
    "North Central Province": ["Anuradhapura District", "Polonnaruwa District"],
    "Uva Province": ["Badulla District", "Monaragala District"],
    "Sabaragamuwa Province": ["Ratnapura District", "Kegalle District"]
};

const AdminEvent = () => {
    const [formData, setFormData] = useState({
        teamName: '',
        telno: '',
        fromTime: '',
        toTime: '',
        district: '',
        province: '',
        location: '',
        date: ''
    });

    const [eventList, setEventList] = useState([]);
    const [availableDistricts, setAvailableDistricts] = useState([]);
    const [markerPosition, setMarkerPosition] = useState(null);
    const autocompleteRef = useRef(null);
    const libraries = ["places"];
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === 'province') {
            setAvailableDistricts(districtsByProvince[value] || []);
            setFormData({ ...formData, province: value, district: '' });
        }
    };

    const handleMapClick = (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        setMarkerPosition({ lat, lng });
        setFormData({ ...formData, location: `${lat},${lng}` });
    };

    const handlePlaceSelected = () => {
        if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();
            if (place.geometry) {
                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();
                setMarkerPosition({ lat, lng });
                setFormData({ ...formData, location: `${lat}, ${lng}` });
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (!formData.location) {
          alert('Please select a location on the map or from the autocomplete.');
          return;
        }
      
        try {
          const response = await fetch('http://localhost:5000/api/events/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
      
          if (!response.ok) {
            const errorData = await response.text(); // Capture the raw response
            console.error('Error from server:', errorData);
            alert(`Error: ${response.statusText}`);
            return;
          }
      
          const data = await response.json();
          setEventList([...eventList, data.event]);
          setFormData({
            teamName: '',
            fromTime: '',
            toTime: '',
            location: '',
            date: '',
            province: '',
            district: '',
            telno: '',
          });
          setMarkerPosition(null);
        } catch (error) {
          console.error('Error adding event:', error);
        }
      };
      

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/events/fetch');
                const data = await response.json();
                if (response.ok) {
                    setEventList(data.events);
                }
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="MainAdmin">
            <AdminNav />
            <AdminMainNav />

            <div className="event-card">
                <div className="event-main">
                    <form className='event-form' onSubmit={handleSubmit}>
                        <div className="eventform-group">
                            <label>Organizing Team Name</label>
                            <input
                                type="text"
                                name="teamName"
                                value={formData.teamName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="eventform-group">
                            <label>Date</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="eventform-group">
                            <label>From Time</label>
                            <input
                                type="time"
                                name="fromTime"
                                value={formData.fromTime}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="eventform-group">
                            <label>To Time</label>
                            <input
                                type="time"
                                name="toTime"
                                value={formData.toTime}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="eventform-group">
                            <label>Province</label>
                            <select
                                name="province"
                                value={formData.province}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Province</option>
                                {provinces.map((province, index) => (
                                    <option key={index} value={province}>{province}</option>
                                ))}
                            </select>
                        </div>
                        <div className="eventform-group">
                            <label>District</label>
                            <select
                                name="district"
                                value={formData.district}
                                onChange={handleChange}
                                required
                                disabled={!formData.province}
                            >
                                <option value="">Select District</option>
                                {availableDistricts.map((district, index) => (
                                    <option key={index} value={district}>{district}</option>
                                ))}
                            </select>
                        </div>
                        <div className="eventform-group">
                            <LoadScript googleMapsApiKey="AIzaSyCYbMOYMi3pH2Bz4cOPDWArQTbeIZVjTV4" libraries={libraries}>
                                <label>Location (Search Your Place Here...)</label>
                                <Autocomplete
                                    onLoad={autocomplete => (autocompleteRef.current = autocomplete)}
                                    onPlaceChanged={handlePlaceSelected}
                                >
                                    <input className='location'
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        required
                                    />
                                </Autocomplete>
                                <GoogleMap
                                    id="map"
                                    mapContainerStyle={{ height: '400px', width: '202%', marginTop: '20px', borderRadius: '15px' }}
                                    center={{ lat: 7.8731, lng: 80.7718 }} 
                                    zoom={7}
                                    onClick={handleMapClick}
                                >
                                    {markerPosition && <Marker position={markerPosition} />}
                                </GoogleMap>
                            </LoadScript>
                        </div>
                        <div className="eventform-group">
                            <label>Contact Number</label>
                            <input
                                type="text"
                                name="telno"
                                value={formData.telno}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button className='event-button' type="submit">Add Event</button>
                    </form>

                    <div className="event-list">
                        <h2>Event List</h2>
                        <table className='event-table'>
                            <thead className='event-thead'>
                                <tr>
                                    <th>Organizing Name</th>
                                    <th>Date</th>
                                    <th>From Time</th>
                                    <th>To Time</th>
                                    <th>Contact Number</th>
                                    <th>Location</th>
                                    <th>District</th>
                                    <th>Province</th>
                                </tr>
                            </thead>
                            <tbody>
                                {eventList.map((event, index) => (
                                    <tr key={index}>
                                        <td>{event.teamName}</td>
                                        <td>{event.date}</td>
                                        <td>{event.fromTime}</td>
                                        <td>{event.toTime}</td>
                                        <td>{event.telno}</td>
                                        <td>{event.location}</td>
                                        <td>{event.district}</td>
                                        <td>{event.province}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminEvent;

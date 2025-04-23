import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import AdminNav from '../Component/AdminNav';
import AdminMainNav from '../Component/AdminMainNav';
import './adminEvent.css';
import { toast, ToastContainer } from 'react-toastify';

const libraries = ['places'];
const GOOGLE_MAPS_API_KEY = 'AIzaSyAsfuQQDAhqljnQkU-FIABl15DWBSHGvnw';

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
  'Northern Province': [
    'Jaffna District',
    'Kilinochchi District',
    'Mannar District',
    'Vavuniya District',
    'Mullaitivu District',
  ],
  'Eastern Province': ['Trincomalee District', 'Batticaloa District', 'Ampara District'],
  'North Western Province': ['Kurunegala District', 'Puttalam District'],
  'North Central Province': ['Anuradhapura District', 'Polonnaruwa District'],
  'Uva Province': ['Badulla District', 'Monaragala District'],
  'Sabaragamuwa Province': ['Ratnapura District', 'Kegalle District'],
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
    date: '',
    bloodgroup: '',
  });

  const [eventList, setEventList] = useState([]);
  const [availableDistricts, setAvailableDistricts] = useState([]);
  const [markerPosition, setMarkerPosition] = useState(null);
  const autocompleteRef = useRef(null);

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
        setFormData({ ...formData, location: `${lat},${lng}` });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.telno.length !== 10) {
      toast.warning('Phone number must be exactly 10 digits!');
      return;
    }

    if (!formData.location) {
      toast.warning('Please select a location on the map or from the autocomplete.');
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
        const errorData = await response.text();
        console.error('Error from server:', errorData);
        toast.error(`Error: ${response.statusText}`);
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
        bloodgroup: '',
      });
      setMarkerPosition(null);
      toast.success('Event Added Successfully');
    } catch (error) {
      console.error('Error adding event:', error);
      toast.error('Failed to add event');
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events/fetch');
        if (!response.ok) throw new Error(`Failed to fetch events: ${response.status}`);
        const data = await response.json();
        setEventList(data.events || []);
      } catch (error) {
        console.error('Error fetching events:', error);
        setEventList([]);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="MainAdmin">
      <ToastContainer />
      <AdminNav />
      <AdminMainNav />
      <div className="event-card">
        <div className="event-main">
          <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={libraries}>
            <form className="event-form" onSubmit={handleSubmit}>
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
                <label>Urgent Blood Group</label>
                <select
                  name="bloodgroup"
                  value={formData.bloodgroup}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Blood Group</option>
                  <option value="All">All of Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
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
                    <option key={index} value={province}>
                      {province}
                    </option>
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
                    <option key={index} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
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
              <div className="eventform-group">
                <label>Location</label>
                <Autocomplete
                  onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                  onPlaceChanged={handlePlaceSelected}
                >
                  <input
                    className="location"
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </Autocomplete>
                <GoogleMap
                  id="map"
                  mapContainerStyle={{
                    height: '400px',
                    width: '202%',
                    marginTop: '20px',
                    borderRadius: '15px',
                  }}
                  center={{ lat: 7.8731, lng: 80.7718 }}
                  zoom={7}
                  onClick={handleMapClick}
                >
                  {markerPosition && <Marker position={markerPosition} />}
                </GoogleMap>
              </div>
              <button className="event-button" type="submit">
                Add Event
              </button>
            </form>
            <div className="event-list">
              <h2>Event List</h2>
              <table className="event-table">
                <thead className="event-thead">
                  <tr>
                    <th>Organizing Name</th>
                    <th>Date</th>
                    <th>From Time</th>
                    <th>To Time</th>
                    <th>Contact Number</th>
                    <th>Blood Group</th>
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
                      <td>{event.bloodgroup}</td>
                      <td>{event.location}</td>
                      <td>{event.district}</td>
                      <td>{event.province}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </LoadScript>
        </div>
      </div>
    </div>
  );
};

export default AdminEvent;
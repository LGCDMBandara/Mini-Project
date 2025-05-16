import React, { useEffect, useState } from 'react';
import './userprofile.css';
import UserNav from '../Component/UserNav';
import UserMainNav from '../Component/UserMainNav';
import { FaRegEdit } from 'react-icons/fa';
import img from '../Image/Profile.jpg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    fname: '',
    lname: '',
    tnumber: '',
    nic: '',
    province: '',
    district: '',
    city: '',
    pcode: '',
    address: '',
    gender: '',
    occupation: '',
    dob: '',
    weight: '',
    bloodgroup: '',
    donate: '',
    lastDonationDate: '',
    healthInfo: [],
    diseaseInfo: [],
    medications: [],
    surgeryHistory: [],
    profilePicture: '',
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [availableDistricts, setAvailableDistricts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.warn('UserProfile: No token found in localStorage');
          toast.error('User is not authenticated. Redirecting to login.');
          setTimeout(() => navigate('/login'), 2000);
          return;
        }

        console.log('UserProfile: Fetching user data with token:', token);
        const response = await axios.get('http://localhost:5000/api/users/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('UserProfile: User data response:', response.data);
        if (response.status === 200) {
          const userData = response.data.user;

          setAvailableDistricts(districtsByProvince[userData.province] || []);

          setFormData({
            name: userData.name || '',
            email: userData.email || '',
            fname: userData.fname || '',
            lname: userData.lname || '',
            tnumber: userData.tnumber || '',
            province: userData.province || '',
            district: userData.district || '',
            city: userData.city || '',
            pcode: userData.pcode || '',
            address: userData.address || '',
            gender: userData.gender || '',
            occupation: userData.occupation || '',
            nic: userData.nic || '',
            dob: userData.dob ? userData.dob.split('T')[0] : '',
            weight: userData.weight || '',
            bloodgroup: userData.bloodgroup || '',
            donate: userData.donate || '',
            lastDonationDate: userData.lastDonationDate ? userData.lastDonationDate.split('T')[0] : '',
            healthInfo: userData.healthInfo || [],
            diseaseInfo: userData.diseaseInfo || [],
            medications: userData.medications || [],
            surgeryHistory: userData.surgeryHistory || [],
            profilePicture: userData.profilePicture
              ? `http://localhost:5000/${userData.profilePicture}?t=${Date.now()}`
              : img,
          });
        }
      } catch (error) {
        console.error('UserProfile: Error fetching user data:', error);
        console.log('UserProfile: Error response:', error.response?.data);
        toast.error('Failed to load user data.');
        if (error.response?.status === 401) {
          console.warn('UserProfile: Unauthorized. Clearing token.');
          localStorage.removeItem('token');
          toast.error('Session expired. Please log in again.');
          setTimeout(() => navigate('/login'), 2000);
        }
      }
    };

    fetchUserData();
  }, [navigate]);

  const provinces = [
    'Western Province (බස්නාහිර පළාත)',
    'Central Province (මධ්‍යම පළාත)',
    'Southern Province (දකුණු පළාත)',
    'Northern Province (උතුරු පළාත)',
    'Eastern Province (නැගෙනහිර පළාත)',
    'North Western Province (වයඹ පළාත)',
    'North Central Province (උතුරු මැද පළාත)',
    'Uva Province (ඌව පළාත)',
    'Sabaragamuwa Province (සබරගමුව පළාත)',
  ];

  const districtsByProvince = {
    'Western Province (බස්නාහිර පළාත)': [
      'Colombo District (කොළඹ දිස්ත්‍රික්කය)',
      'Gampaha District (ගම්පහ දිස්ත්‍රික්කය)',
      'Kalutara District (කළුතර දිස්ත්‍රික්කය)',
    ],
    'Central Province (මධ්‍යම පළාත)': [
      'Kandy District (මහනුවර දිස්ත්‍රික්කය)',
      'Matale District (මාතලේ දිස්ත්‍රික්කය)',
      'Nuwara Eliya District (නුවරඑළිය දිස්ත්‍රික්කය)',
    ],
    'Southern Province (දකුණු පළාත)': [
      'Galle District (ගාල්ල දිස්ත්‍රික්කය)',
      'Matara District (මාතර දිස්ත්‍රික්කය)',
      'Hambantota District (හම්බන්තොට දිස්ත්‍රික්කය)',
    ],
    'Northern Province (උතුරු පළාත)': [
      'Jaffna District (යාපනය දිස්ත්‍රික්කය)',
      'Kilinochchi District (කිලිනොච්චි දිස්ත්‍රික්කය)',
      'Mannar District (මන්නාරම දිස්ත්‍රික්කය)',
      'Vavuniya District (වවුනියා දිස්ත්‍රික්කය)',
      'Mullaitivu District (මුලතිවු දිස්ත්‍රික්කය)',
    ],
    'Eastern Province (නැගෙනහිර පළාත)': [
      'Trincomalee District (ත්‍රිකුණාමලය දිස්ත්‍රික්කය)',
      'Batticaloa District (මඩකලපුව දිස්ත්‍රික්කය)',
      'Ampara District (අම්පාර දිස්ත්‍රික්කය)',
    ],
    'North Western Province (වයඹ පළාත)': [
      'Kurunegala District (කුරුණෑගල දිස්ත්‍රික්කය)',
      'Puttalam District (පුත්තලම දිස්ත්‍රික්කය)',
    ],
    'North Central Province (උතුරු මැද පළාත)': [
      'Anuradhapura District (අනුරාධපුර දිස්ත්‍රික්කය)',
      'Polonnaruwa District (පොළොන්නරුව දිස්ත්‍රික්කය)',
    ],
    'Uva Province (ඌව පළාත)': [
      'Badulla District (බදුල්ල දිස්ත්‍රික්කය)',
      'Monaragala District (මොනරාගල දිස්ත්‍රික්කය)',
    ],
    'Sabaragamuwa Province (සබරගමුව පළාත)': [
      'Ratnapura District (රත්නපුර දිස්ත්‍රික්කය)',
      'Kegalle District (කෑගල්ල දිස්ත්‍රික්කය)',
    ],
  };

  const healthOptions = [
    'Tattooing (පච්ච කෙටීම්)',
    'Ear piercing (කන් විදීම්)',
    'Dental extraction (දත් ඉවත් කිරීම්)',
    'No (කිසිවක් නැත)',
  ];

  const diseaseOptions = [
    'Heart Disease (හෘද රෝග)',
    'Cancer/Malignant Disease (පිළිකා/මාරාන්තික රෝග)',
    'Diabetes (දියවැඩියාව)',
    'Hepatitis B/C (හෙපටයිටිස් බී/සී)',
    'Sexually Transmitted Diseases (ලිංගික රෝග)',
    'Typhoid - last one year (ටයිෆොයිඩ් - පසුගිය වසර තුළ)',
    'Lung Disease (පෙනහළු රෝගය)',
    'Tuberculosis (ක්ෂය රෝගය)',
    'Allergic Disease (අසාත්මික රෝගය)',
    'Kidney Disease (වකුගඩු රෝගය)',
    'Epilepsy (අපස්මාරය)',
    'Abnormal Bleeding Tendency (අසාමාන්‍ය රුධිර වහන ප්‍රවණතාව)',
    'Jaundice - last one year (සෙංගමාලය - පසුගිය වසර තුළ)',
    'Malaria - last six months (මැලේරියාව - පසුගිය මාස හය තුළ)',
    'Fainting spells (ක්ලාන්ත මන්ත්‍ර)',
    'No Disease (ඉහත රෝගයක් නැත)',
  ];

  const medicationOptions = [
    'Antibiotics (ප්‍රතිජීවක ඖෂධ)',
    'Steroids (ස්ටෙරොයිඩ්)',
    'Aspirin (ඇස්පිරින්)',
    'Vaccinations (එන්නත්)',
    'Alcohol (මත්පැන්)',
    'Dog bite Rabies vaccine - last one year (බල්ලන් සපා කෑමෙන් ජලභීතිකා එන්නත - පසුගිය වසර තුළ)',
    'Not Taken (ලබාගෙන නොමැත)',
  ];

  const surgeryOptions = [
    'Major (වැඩි වශයෙන්)',
    'Minor (අඩු වශයෙන්)',
    'Blood Transfusion (රුධිර පාරාවිලනය)',
    'No (නැත)',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'province') {
      setAvailableDistricts(districtsByProvince[value] || []);
      setFormData((prevState) => ({ ...prevState, province: value, district: '' }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    setFormData((prevState) => {
      const updatedField = checked
        ? [...prevState[field], value]
        : prevState[field].filter((item) => item !== value);
      return { ...prevState, [field]: updatedField };
    });
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedImage(URL.createObjectURL(file));
    setLoading(true);

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('User is not authenticated. Redirecting to login.');
      setTimeout(() => navigate('/login'), 2000);
      setLoading(false);
      return;
    }

    try {
      const imageFormData = new FormData();
      imageFormData.append('profilePicture', file);

      console.log('UserProfile: Uploading image...');
      const response = await axios.post('http://localhost:5000/api/users/update-profile', imageFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('UserProfile: Update profile response:', response.data);
      const updatedUser = response.data.user;
      setFormData((prevState) => ({
        ...prevState,
        profilePicture: updatedUser.profilePicture
          ? `http://localhost:5000/${updatedUser.profilePicture}?t=${Date.now()}`
          : prevState.profilePicture,
      }));
      toast.success('Profile picture updated successfully!');
    } catch (error) {
      console.error('UserProfile: Error uploading image:', error.response || error.message);
      toast.error('Failed to update profile picture.');
      if (error.response?.status === 401) {
        console.warn('UserProfile: Unauthorized. Clearing token.');
        localStorage.removeItem('token');
        toast.error('Session expired. Please log in again.');
        setTimeout(() => navigate('/login'), 2000);
      }
      setSelectedImage(null); 
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const token = localStorage.getItem('token');
  if (!token) {
    toast.error('User is not authenticated. Redirecting to login.');
    setTimeout(() => navigate('/login'), 2000);
    setLoading(false);
    return;
  }

  try {
    const cleanedFormData = {
      ...formData,
      province: formData.province.split(' (')[0], 
      district: formData.district.split(' (')[0], 
    };

    const formDataToSend = new FormData();
    Object.keys(cleanedFormData).forEach((key) => {
      if (key !== 'profilePicture') {
        if (Array.isArray(cleanedFormData[key])) {
          cleanedFormData[key].forEach((item) => formDataToSend.append(key, item));
        } else {
          formDataToSend.append(key, cleanedFormData[key]);
        }
      }
    });

    console.log('UserProfile: Submitting form data:');
    formDataToSend.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    const response = await axios.post('http://localhost:5000/api/users/update-profile', formDataToSend, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('UserProfile: Update response:', response.data);
    toast.success('User profile updated successfully!', { position: 'top-right' });
  } catch (error) {
    console.error('UserProfile: Error updating profile:', error);
    console.log('UserProfile: Error response:', error.response?.data);
    toast.error(`Failed to update profile: ${error.message}`, { position: 'top-right' });
    if (error.response?.status === 401) {
      console.warn('UserProfile: Unauthorized. Clearing token.');
      localStorage.removeItem('token');
      toast.error('Session expired. Please log in again.');
      setTimeout(() => navigate('/login'), 2000);
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="mainUser">
      <UserNav />
      <UserMainNav />
      <ToastContainer />

      <div className="profile-card">
        <div className="profile-main">
          <div className="profile-container">
            <div className="profile">
              <form onSubmit={handleSubmit}>
                <div className="profile-picture-container">
                  <div className="profile-picture">
                    {selectedImage ? (
                      <img src={selectedImage} alt="Profile" />
                    ) : (
                      <img src={formData.profilePicture || img} alt="Profile" />
                    )}
                    <label htmlFor="file-input" className="upload-icon">
                      <i className="fa fa-upload">
                        <FaRegEdit />
                      </i>
                    </label>
                    <input
                      id="file-input"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="image-upload-input"
                      name="profilePicture"
                    />
                  </div>
                </div>
                <b style={{ color: 'rgba(75, 192, 192, 1)', fontSize: '22px' }}>
                  Fill in the account details using English only (ඉංග්‍රීසි පමණක් භාවිතා කරමින් ගිණුම් විස්තර පුරවන්න)
                </b>
                <div className="profile-form-card">
                  <div className="profile-form-container">
                    <div className="profile-form-group">
                      <label>Username (පරිශීලක නාමය)</label>
                      <input type="text" name="name" className="input-field" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="profile-form-group">
                      <label>Email (විද්‍යුත් ලිපිනය)</label>
                      <input
                        type="email"
                        name="email"
                        className="input-field"
                        value={formData.email}
                        onChange={handleChange}
                        disabled
                      />
                    </div>
                    <div className="profile-form-group">
                      <label>First Name (මුල් නම)</label>
                      <input type="text" name="fname" className="input-field" value={formData.fname} onChange={handleChange} />
                    </div>
                    <div className="profile-form-group">
                      <label>Last Name (අවසන් නම)</label>
                      <input type="text" name="lname" className="input-field" value={formData.lname} onChange={handleChange} />
                    </div>
                    <div className="profile-form-group">
                      <label>Telephone Number (දුරකථන අංකය)</label>
                      <input type="text" name="tnumber" className="input-field" value={formData.tnumber} onChange={handleChange} />
                    </div>
                    <div className="profile-form-group">
                      <label>NIC (ජාතික හැඳුනුම්පත් අංකය)</label>
                      <input type="text" name="nic" className="input-field" value={formData.nic} onChange={handleChange} />
                    </div>
                    <div className="profile-form-group">
                      <label>Province (පළාත)</label>
                      <select name="province" className="input-field" value={formData.province} onChange={handleChange}>
                        <option value="">--Select Province (පළාත තෝරන්න)--</option>
                        {provinces.map((province) => (
                          <option key={province} value={province}>
                            {province}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="profile-form-group">
                      <label>District (දිස්ත්‍රික්කය)</label>
                      <select name="district" className="input-field" value={formData.district} onChange={handleChange}>
                        <option value="">--Select District (දිස්ත්‍රික්කය තෝරන්න)--</option>
                        {availableDistricts.map((district) => (
                          <option key={district} value={district}>
                            {district}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="profile-form-group">
                      <label>City (නගරය)</label>
                      <input type="text" name="city" className="input-field" value={formData.city} onChange={handleChange} />
                    </div>
                    <div className="profile-form-group">
                      <label>Postal Code (තැපැල් අංකය)</label>
                      <input type="text" name="pcode" className="input-field" value={formData.pcode} onChange={handleChange} />
                    </div>
                    <div className="profile-form-group">
                      <label>Address (ලිපිනය)</label>
                      <input type="text" name="address" className="input-field" value={formData.address} onChange={handleChange} />
                    </div>
                    <div className="profile-form-group">
                      <label>Gender (ලිංගභේදය)</label>
                      <select name="gender" className="input-field" value={formData.gender} onChange={handleChange}>
                        <option value="">--Select Gender (ලිංගභේදය තෝරන්න)--</option>
                        <option value="Male">Male (පිරිමි)</option>
                        <option value="Female">Female (ගැහැණු)</option>
                      </select>
                    </div>
                    <div className="profile-form-group">
                      <label>Civil Status (සිවිල් තත්ත්වය)</label>
                      <select name="occupation" className="input-field" value={formData.occupation} onChange={handleChange}>
                        <option value="">--Select Status (සිවිල් තත්ත්වය තෝරන්න)--</option>
                        <option value="Single">Single (අවිවාහක)</option>
                        <option value="Married">Married (විවාහක)</option>
                      </select>
                    </div>
                    <div className="profile-form-group">
                      <label>Date of Birth (උපන්දිනය)</label>
                      <input type="date" name="dob" className="input-field" value={formData.dob} onChange={handleChange} />
                    </div>
                    <div className="profile-form-group">
                      <label>Weight - Kg (බර - කිලෝග්‍රෑම්)</label>
                      <input
                        type="number"
                        name="weight"
                        className="input-field"
                        value={formData.weight}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="profile-form-group">
                      <label>Blood Group (රුධිර වර්ගය)</label>
                      <select name="bloodgroup" className="input-field" value={formData.bloodgroup} onChange={handleChange}>
                        <option value="">--Select Blood Group (රුධිර වර්ගය තෝරන්න)--</option>
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
                    <div className="profile-form-group">
                      <label>Donated Blood Previously? (රුධිරය පරිත්‍යාග කර තිබේද?)</label>
                      <select name="donate" className="input-field" value={formData.donate} onChange={handleChange}>
                        <option value="">--Select One (තෝරන්න)--</option>
                        <option value="Yes">Yes (ඔව්)</option>
                        <option value="No">No (නෑ)</option>
                      </select>
                    </div>
                    <div className="profile-form-group">
                      <label>Last Time Donated Blood (අවසන් වරට රුධිරය පරිත්‍යාග කළ දිනය)</label>
                      <input
                        type="date"
                        name="lastDonationDate"
                        className="input-field"
                        value={formData.lastDonationDate}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <hr />

                <div className="form-section">
                  <h3 className="section-title">
                    In the last six months have you had any of the following? (පසුගිය මාස හය තුළ ඔබට පහත සඳහන් කිසිවක් සිදුවී තිබේද?)
                  </h3>
                  <div className="checkbox-group">
                    {healthOptions.map((option) => (
                      <label className="checkbox-label" key={option}>
                        <input
                          type="checkbox"
                          value={option}
                          checked={formData.healthInfo.includes(option)}
                          onChange={(e) => handleCheckboxChange(e, 'healthInfo')}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-section">
                  <h3 className="section-title">
                    Do you suffer from or have suffered from any of the following diseases? (ඒවායින් පීඩා විඳිමින් සිටිනවාද?)
                  </h3>
                  <div className="checkbox-grid">
                    {diseaseOptions.map((option) => (
                      <label className="checkbox-label" key={option}>
                        <input
                          type="checkbox"
                          value={option}
                          checked={formData.diseaseInfo.includes(option)}
                          onChange={(e) => handleCheckboxChange(e, 'diseaseInfo')}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-section">
                  <h3 className="section-title">
                    Are you taking or have you taken any of these in the past 72 hours? (පසුගිය පැය 72 තුළ ගත්තාද?)
                  </h3>
                  <div className="checkbox-group">
                    {medicationOptions.map((option) => (
                      <label className="checkbox-label" key={option}>
                        <input
                          type="checkbox"
                          value={option}
                          checked={formData.medications.includes(option)}
                          onChange={(e) => handleCheckboxChange(e, 'medications')}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-section">
                  <h3 className="section-title">
                    Is there any history of surgery or blood transfusion in the past six months? (පසුගිය මාස හය තුළ ශල්‍යකර්මයක් හෝ රුධිර මාරු
                    කිරීමක් සිදු කර තිබේද?)
                  </h3>
                  <div className="checkbox-group">
                    {surgeryOptions.map((option) => (
                      <label className="checkbox-label" key={option}>
                        <input
                          type="checkbox"
                          value={option}
                          checked={formData.surgeryHistory.includes(option)}
                          onChange={(e) => handleCheckboxChange(e, 'surgeryHistory')}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
                <hr />
                <div className="form-submit-section">
                  <button type="submit" className="form-submit-button" disabled={loading}>
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
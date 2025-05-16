import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './Pages/Index';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Change from './Pages/Change';
import Contact from './Pages/Contact';
import UserDashboard from './DashboardUser/UserDashboard';
import AdminDashboard from './DashboardAdmin/AdminDashboard';
import AdminProfile from './DashboardAdmin/AdminProfile';
import AdminMail from './DashboardAdmin/AdminMail';
import AdminBlood from './DashboardAdmin/AdminBlood';
import AdminEvent from './DashboardAdmin/AdminEvent';
import AdminAnalytic from './DashboardAdmin/AdminAnalaytic';
import AdminReport from './DashboardAdmin/AdminReport';
import AdminLogout from './DashboardAdmin/AdminLogout';
import UserProfile from './DashboardUser/UserProfile';
import UserBlood from './DashboardUser/UserBlood';
import UserEvent from './DashboardUser/UserEvent';
import UserHealth from './DashboardUser/UserHealth';
import UserContact from './DashboardUser/UserContact';
import PrivateRoute from './Component/PrivateRoute';
import UserLogout from './DashboardUser/UserLogout';
import ProfileDetail from './DashboardAdmin/ProfileDetail';
import BloodDetails from './DashboardAdmin/BloodDetails';
import AddAdmin from './DashboardAdmin/AddAdmin';
import ViewAdmin from './DashboardAdmin/ViewAdmin';
import AdminAddNav from './Component/AdminAddNav';
import BaseDashboard from './DashboardBaseBloodBank/BaseDashboard';
import HospitalDashboard from './DashboardHospital/HospitalDashboard';
import HospitalRequest from './DashboardHospital/HospitalRequest';
import ViewBloodRequest from './DashboardBaseBloodBank/ViewBloodRequest';
import BaseBloodManagement from './DashboardBaseBloodBank/BaseBloodManagement';
import ViewAdminDash from './DashboardAdmin/ViewAdminDash';
import ViewBloodDash from './DashboardHospital/ViewBloodDash';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/change" element={<Change />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin Dashboard (Protected Routes) */}
        <Route path="/admindashboard" element={<PrivateRoute element={<AdminDashboard />} />} />
        <Route path="/adminprofile" element={<PrivateRoute element={<AdminProfile />} />} />
        <Route path="/adminmail" element={<PrivateRoute element={<AdminMail />} />} />
        <Route path="/adminblood" element={<PrivateRoute element={<AdminBlood />} />} />
        <Route path="/adminevent" element={<PrivateRoute element={<AdminEvent />} />} />
        <Route path="/adminanalytic" element={<PrivateRoute element={<AdminAnalytic />} />} /> 
        <Route path="/adminreport" element={<PrivateRoute element={<AdminReport />} />} />
        <Route path="/adminlogout" element={<PrivateRoute element={<AdminLogout />} />} />
        <Route path="/profiledetail/:id" element={<PrivateRoute element={<ProfileDetail />} />} />
        <Route path="/blooddetail/:id" element={<PrivateRoute element={<BloodDetails />} />} />
        <Route path="/addadmin" element={<PrivateRoute element={<AddAdmin />} />} />
        <Route path="/viewadmin" element={<PrivateRoute element={<ViewAdmin />} />} />
        <Route path="/adminaddnav" element={<PrivateRoute element={<AdminAddNav />} />} />
        <Route path="/viewadmindashboard/:id" element={<PrivateRoute element={<ViewAdminDash />} />} />

        {/* User Dashboard (Protected Routes) */}
        <Route path="/userdashboard" element={<PrivateRoute element={<UserDashboard />} />} />
        <Route path="/userprofile" element={<PrivateRoute element={<UserProfile />} />} />
        <Route path="/userblood" element={<PrivateRoute element={<UserBlood />} />} />
        <Route path="/userevent" element={<PrivateRoute element={<UserEvent />} />} />
        <Route path="/userhealth" element={<PrivateRoute element={<UserHealth />} />} />
        <Route path="/usercontact" element={<PrivateRoute element={<UserContact />} />} />
        <Route path="/userlogout" element={<PrivateRoute element={<UserLogout />} />} />

        {/* Base Admin in Blood Banks */}
        <Route path="/basedashboard/:id" element={<PrivateRoute element={<BaseDashboard />} />} />
        <Route path="/viewbloodrequest/:id" element={<PrivateRoute element={<ViewBloodRequest />} />} />
        <Route path="/basebloodmanagement/:id" element={<PrivateRoute element={<BaseBloodManagement />} />} />

        {/* Hospitals */}
        <Route path="/hospitaldashboard" element={<PrivateRoute element={<HospitalDashboard />} />} />
        <Route path="/hospitalrequest" element={<PrivateRoute element={<HospitalRequest />} />} />
        <Route path="/viewblooddashboard/:id" element={<PrivateRoute element={<ViewBloodDash />} />} />
      </Routes>
    </Router>
  );
}

export default App;
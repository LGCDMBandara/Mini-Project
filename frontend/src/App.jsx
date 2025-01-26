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
import AdminAnalaytic from './DashboardAdmin/AdminAnalaytic';
import AdminReport from './DashboardAdmin/AdminReport';
import AdminLogout from './DashboardAdmin/AdminLogout';
import UserProfile from './DashboardUser/UserProfile';
import UserBlood from './DashboardUser/UserBlood';
import UserHistory from './DashboardUser/UserHistory';
import UserEvent from './DashboardUser/UserEvent';
import UserHealth from './DashboardUser/UserHealth';
import UserContact from './DashboardUser/UserContact';
import PrivateRoute from './Component/PrivateRoute';
import UserLogout from './DashboardUser/UserLogout';
import ProfileDetail from './DashboardAdmin/ProfileDetail';

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
                <Route path="/adminProfile" element={<PrivateRoute element={<AdminProfile />} />} />
                <Route path="/adminMail" element={<PrivateRoute element={<AdminMail />} />} />
                <Route path="/adminBlood" element={<PrivateRoute element={<AdminBlood />} />} />
                <Route path="/adminEvent" element={<PrivateRoute element={<AdminEvent />} />} />
                <Route path="/adminAnalaytic" element={<PrivateRoute element={<AdminAnalaytic />} />} />
                <Route path="/adminReport" element={<PrivateRoute element={<AdminReport />} />} />
                <Route path="/adminLogout" element={<PrivateRoute element={<AdminLogout />} />} />
                <Route path="/profiledetail/:id" element={<PrivateRoute element={<ProfileDetail />} />} />

                {/* User Dashboard (Protected Routes) */}
                <Route path="/userdashboard" element={<PrivateRoute element={<UserDashboard />} />} />
                <Route path="/userProfile" element={<PrivateRoute element={<UserProfile />} />} />
                <Route path="/userBlood" element={<PrivateRoute element={<UserBlood />} />} />
                <Route path="/userHistory" element={<PrivateRoute element={<UserHistory />} />} />
                <Route path="/userEvent" element={<PrivateRoute element={<UserEvent />} />} />
                <Route path="/userHealth" element={<PrivateRoute element={<UserHealth />} />} />
                <Route path="/userContact" element={<PrivateRoute element={<UserContact />} />} />
                <Route path="/userLogout" element={<PrivateRoute element={<UserLogout />} />} />
            </Routes>
        </Router>
    );
}

export default App;

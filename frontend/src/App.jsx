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
import UserProfile from './DashboardUser/userProfile';
import UserBlood from './DashboardUser/UserBlood';
import UserHistory from './DashboardUser/UserHistory';
import UserEvent from './DashboardUser/UserEvent';
import UserHealth from './DashboardUser/UserHealth';
import UserContact from './DashboardUser/UserContact';

function App() {
    return (
        <Router>
            <Routes>

                {/* Pages */}

                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path='/change' element={<Change />} />
                <Route path='/contact' element={<Contact />} />
                
                {/* Admin Dashboard */}

                <Route path='/admindashboard' element={<AdminDashboard />} />
                <Route path='/adminProfile' element={<AdminProfile />} />
                <Route path='/adminMail' element={<AdminMail />} />
                <Route path='/adminBlood' element={<AdminBlood />} />
                <Route path='/adminEvent' element={<AdminEvent />} />
                <Route path='/adminAnalaytic' element={<AdminAnalaytic />} />
                <Route path='/adminReport' element={<AdminReport />} />

                {/* User Dashboard */}

                <Route path="/userdashboard" element={<UserDashboard />} />
                <Route path='/userProfile' element={<UserProfile />} />
                <Route path='/userBlood' element={<UserBlood />} />
                <Route path='/userHistory' element={<UserHistory />} />
                <Route path='/userEvent' element={<UserEvent />} />
                <Route path='/userHealth' element={<UserHealth />} />
                <Route path='userContact' element={<UserContact />} />

            </Routes>
        </Router>
    );
}

export default App;

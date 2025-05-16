import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminAddNav = () => {
    return (
        <div>
            <nav className="user-nav">
                <ul>
                    <li>
                        <NavLink
                            to="/addadmin"
                            className={({ isActive }) => (isActive ? 'active' : '')}
                        >
                            Add Sub Admins
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/adminprofile" 
                            className={({ isActive }) => (isActive ? 'active' : '')}
                        >
                            View User Profiles
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/viewadmin"
                            className={({ isActive }) => (isActive ? 'active' : '')}
                        >
                            View Base Blood Hospitals
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <hr />
        </div>
    );
};

export default AdminAddNav;
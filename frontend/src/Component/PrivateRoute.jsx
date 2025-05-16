import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.warn('PrivateRoute: No token found, redirecting to /login', {
      path: window.location.pathname,
    });
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const isAuthenticated = !!decoded.id;
    const userRole = decoded.role ? decoded.role.toLowerCase() : '';

    if (!isAuthenticated) {
      console.warn('PrivateRoute: Invalid token (no id), redirecting to /login');
      localStorage.removeItem('token');
      return <Navigate to="/login" replace />;
    }

    if (!userRole) {
      console.warn('PrivateRoute: No role in token, redirecting to /login');
      localStorage.removeItem('token');
      return <Navigate to="/login" replace />;
    }

    const roleRoutes = {
      user: [
        '/userdashboard',
        '/userprofile',
        '/userblood',
        '/userevent',
        '/userhealth',
        '/usercontact',
        '/userlogout',
      ],
      admin: [
        '/admindashboard',
        '/adminprofile',
        '/adminmail',
        '/adminblood',
        '/adminevent',
        '/adminanalytic',
        '/adminreport',
        '/adminlogout',
        '/profiledetail',
        '/blooddetail',
        '/addadmin',
        '/viewadmin',
        '/adminaddnav',
        '/viewadmindashboard',
      ],
      hospital: [
        '/hospitaldashboard',
        '/hospitalrequest',
        '/viewblooddashboard',
        '/adminlogout',
      ],
      bloodbank: [
        '/basedashboard',
        '/viewbloodrequest',
        '/basebloodmanagement',
        '/adminlogout',
      ],
    };

    const currentPath = window.location.pathname;
    const allowedRoutes = roleRoutes[userRole] || [];

    // Check if the current path matches any allowed route or its base path (for dynamic routes)
    const isRouteAllowed = allowedRoutes.some((route) => {
      if (route.includes(':')) {
        // Handle dynamic routes (e.g., '/profiledetail/:id')
        const baseRoute = route.split('/:')[0];
        return currentPath.startsWith(baseRoute);
      }
      // Exact match or starts with route (to handle sub-paths)
      return currentPath === route || currentPath.startsWith(`${route}/`);
    });

    if (!isRouteAllowed) {
      console.warn('PrivateRoute: Role not allowed for path', {
        userRole,
        currentPath,
        allowedRoutes,
      });
      return <Navigate to={`/${userRole}dashboard`} replace />;
    }

    console.info('PrivateRoute: Access granted', { userRole, currentPath });
    return element;
  } catch (error) {
    console.error('PrivateRoute: Error decoding token:', error);
    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
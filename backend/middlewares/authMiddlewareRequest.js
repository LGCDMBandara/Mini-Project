const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Admin = require('../models/adminSchema.js');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await Admin.findById(decoded.id).select('-password');
            if (!req.user) {
                console.error('User not found for ID:', decoded.id);
                res.status(401);
                throw new Error('Not authorized, user not found');
            }
            next();
        } catch (error) {
            console.error('Token verification failed:', error.message);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        console.error('No token provided in headers');
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            console.error('User role not authorized:', req.user?.role);
            res.status(403);
            throw new Error('User does not have permission to perform this action');
        }
        next();
    };
};

module.exports = { protect, restrictTo };
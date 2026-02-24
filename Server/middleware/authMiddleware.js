const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const protect = async (req, res, next) => {
    try {
        let token;

        // Check if Authorization header exists
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer ')
        ) {
            // Extract token
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                message: 'Not authorized, no token'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find admin by decoded ID
        const admin = await Admin.findById(decoded.id).select('-password');

        if (!admin) {
            return res.status(401).json({
                message: 'Not authorized, admin not found'
            });
        }

        // Attach admin to request
        req.admin = admin;

        next();

    } catch (error) {
        console.error('JWT ERROR:', error.message);

        return res.status(401).json({
            message: 'Not authorized, token failed'
        });
    }
};

module.exports = { protect };
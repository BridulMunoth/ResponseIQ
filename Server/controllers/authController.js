const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register admin
// @route   POST /api/auth/register
// @access  Public (Should be protected or removed in production)
const registerAdmin = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400);
            throw new Error(errors.array()[0].msg);
        }

        const { email, password } = req.body;

        const adminExists = await Admin.findOne({ email });

        if (adminExists) {
            res.status(400);
            throw new Error('Admin already exists');
        }

        const admin = await Admin.create({
            email,
            password
        });

        if (admin) {
            res.status(201).json({
                _id: admin.id,
                email: admin.email,
                token: generateToken(admin._id)
            });
        } else {
            res.status(400);
            throw new Error('Invalid admin data');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Authenticate an admin
// @route   POST /api/auth/login
// @access  Public
const loginAdmin = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400);
            throw new Error(errors.array()[0].msg);
        }

        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });

        if (admin && (await admin.matchPassword(password))) {
            res.json({
                _id: admin.id,
                email: admin.email,
                token: generateToken(admin._id)
            });
        } else {
            res.status(401);
            throw new Error('Invalid email or password');
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerAdmin,
    loginAdmin
};

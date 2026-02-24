const Customer = require('../models/Customer');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register customer
// @route   POST /api/customer/register
// @access  Public
const registerCustomer = async (req, res, next) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            res.status(400);
            throw new Error('Please provide name, email and password');
        }

        const exists = await Customer.findOne({ email });
        if (exists) {
            res.status(400);
            throw new Error('An account with this email already exists');
        }

        const customer = await Customer.create({ fullName, email, password });

        if (customer) {
            res.status(201).json({
                _id: customer.id,
                fullName: customer.fullName,
                email: customer.email,
                token: generateToken(customer._id),
            });
        } else {
            res.status(400);
            throw new Error('Invalid customer data');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Login customer
// @route   POST /api/customer/login
// @access  Public
const loginCustomer = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400);
            throw new Error('Please provide email and password');
        }

        const customer = await Customer.findOne({ email });

        if (customer && (await customer.matchPassword(password))) {
            res.json({
                _id: customer.id,
                fullName: customer.fullName,
                email: customer.email,
                token: generateToken(customer._id),
            });
        } else {
            res.status(401);
            throw new Error('Invalid email or password');
        }
    } catch (error) {
        next(error);
    }
};

module.exports = { registerCustomer, loginCustomer };

const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin } = require('../controllers/authController');
const { body } = require('express-validator');

// Validation rules
const registerValidation = [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
];

const loginValidation = [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists()
];

router.post('/register', registerValidation, registerAdmin);
router.post('/login', loginValidation, loginAdmin);

module.exports = router;

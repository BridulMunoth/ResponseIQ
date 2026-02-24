const express = require('express');
const router = express.Router();
const { submitSurvey, getSurveys, deleteSurvey } = require('../controllers/surveyController');
const { protect } = require('../middleware/authMiddleware');
const { body } = require('express-validator');

const surveyValidation = [
    // Section 1
    body('name', 'Name is required').not().isEmpty(),
    body('age', 'Valid age is required').isInt({ min: 1 }),
    body('gender', 'Gender is required').not().isEmpty(),
    body('occupationType', 'Occupation is required').not().isEmpty(),

    // Core Survey
    body('orderMethod', 'Order method is required').not().isEmpty(),
    body('stockFrequency', 'Stock frequency is required').not().isEmpty(),
    body('operationalFactor', 'Operational factor is required').not().isEmpty(),
    body('vehicleType', 'Vehicle type is required').not().isEmpty(),
    body('associationDuration', 'Association duration is required').not().isEmpty(),
    body('invoiceAccuracy', 'Invoice accuracy field is required').not().isEmpty(),
    body('reverseLogisticsSmooth', 'Reverse logistics field is required').not().isEmpty(),
    body('appEaseOfUse', 'App ease of use field is required').not().isEmpty(),

    // Ratings
    body('productFreshnessRating').isInt({ min: 1, max: 5 }),
    body('professionalismRating').isInt({ min: 1, max: 5 }),
    body('packagingQualityRating').isInt({ min: 1, max: 5 }),

    // Satisfaction
    body('deliveryLeadTimeSatisfaction').not().isEmpty(),
    body('stockAvailabilitySatisfaction').not().isEmpty(),
    body('overallSatisfaction').not().isEmpty()
];

router.route('/')
    .post(surveyValidation, submitSurvey)
    .get(protect, getSurveys);

router.route('/:id')
    .delete(protect, deleteSurvey);

module.exports = router;

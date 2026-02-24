const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getOrderMethodAnalytics,
    getStockFrequencyAnalytics,
    getOperationalFactorAnalytics,
    getGenderDistributionAnalytics,
    getAverageRatings,
    getSatisfactionSummary,
    getSummary
} = require('../controllers/analyticsController');

router.get('/summary', protect, getSummary);
router.get('/order-method', protect, getOrderMethodAnalytics);
router.get('/stock-frequency', protect, getStockFrequencyAnalytics);
router.get('/operational-factor', protect, getOperationalFactorAnalytics);
router.get('/gender-distribution', protect, getGenderDistributionAnalytics);
router.get('/average-ratings', protect, getAverageRatings);
router.get('/satisfaction-summary', protect, getSatisfactionSummary);

module.exports = router;

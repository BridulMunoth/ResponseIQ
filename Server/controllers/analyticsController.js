const Survey = require('../models/Survey');

// Helper to format aggregation results as { labels, values }
const formatAggregation = (data) => ({
    labels: data.map(item => item._id),
    values: data.map(item => item.count)
});

// @desc    Get order method distribution
// @route   GET /api/analytics/order-method
// @access  Private
const getOrderMethodAnalytics = async (req, res, next) => {
    try {
        const data = await Survey.aggregate([
            { $group: { _id: '$orderMethod', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);
        res.json(formatAggregation(data));
    } catch (error) {
        next(error);
    }
};

// @desc    Get stock frequency distribution
// @route   GET /api/analytics/stock-frequency
// @access  Private
const getStockFrequencyAnalytics = async (req, res, next) => {
    try {
        const data = await Survey.aggregate([
            { $group: { _id: '$stockFrequency', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);
        res.json(formatAggregation(data));
    } catch (error) {
        next(error);
    }
};

// @desc    Get operational factor distribution
// @route   GET /api/analytics/operational-factor
// @access  Private
const getOperationalFactorAnalytics = async (req, res, next) => {
    try {
        const data = await Survey.aggregate([
            { $group: { _id: '$operationalFactor', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);
        res.json(formatAggregation(data));
    } catch (error) {
        next(error);
    }
};

// @desc    Get gender distribution
// @route   GET /api/analytics/gender-distribution
// @access  Private
const getGenderDistributionAnalytics = async (req, res, next) => {
    try {
        const data = await Survey.aggregate([
            { $group: { _id: '$gender', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);
        res.json(formatAggregation(data));
    } catch (error) {
        next(error);
    }
};

// @desc    Get average ratings
// @route   GET /api/analytics/average-ratings
// @access  Private
const getAverageRatings = async (req, res, next) => {
    try {
        const data = await Survey.aggregate([
            {
                $group: {
                    _id: null,
                    productFreshnessRating: { $avg: '$productFreshnessRating' },
                    professionalismRating: { $avg: '$professionalismRating' },
                    packagingQualityRating: { $avg: '$packagingQualityRating' }
                }
            }
        ]);

        if (!data.length) {
            return res.json({
                productFreshnessRating: 0,
                professionalismRating: 0,
                packagingQualityRating: 0
            });
        }

        const result = data[0];
        res.json({
            productFreshnessRating: parseFloat(result.productFreshnessRating.toFixed(2)),
            professionalismRating: parseFloat(result.professionalismRating.toFixed(2)),
            packagingQualityRating: parseFloat(result.packagingQualityRating.toFixed(2))
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get satisfaction summary
// @route   GET /api/analytics/satisfaction-summary
// @access  Private
const getSatisfactionSummary = async (req, res, next) => {
    try {
        const data = await Survey.aggregate([
            { $group: { _id: '$overallSatisfaction', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);
        res.json(formatAggregation(data));
    } catch (error) {
        next(error);
    }
};

// @desc    Get summary totals
// @route   GET /api/analytics/summary
// @access  Private
const getSummary = async (req, res, next) => {
    try {
        const total = await Survey.countDocuments();
        const satisfiedCount = await Survey.countDocuments({ overallSatisfaction: 'Highly Satisfied' });
        const recentMonth = await Survey.countDocuments({
            createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        });

        res.json({
            totalResponses: total,
            highlySatisfied: satisfiedCount,
            satisfactionRate: total > 0 ? parseFloat(((satisfiedCount / total) * 100).toFixed(1)) : 0,
            recentMonth
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getOrderMethodAnalytics,
    getStockFrequencyAnalytics,
    getOperationalFactorAnalytics,
    getGenderDistributionAnalytics,
    getAverageRatings,
    getSatisfactionSummary,
    getSummary
};

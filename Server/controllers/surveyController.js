const Survey = require('../models/Survey');
const { validationResult } = require('express-validator');

// @desc    Submit a new survey
// @route   POST /api/survey
// @access  Public
const submitSurvey = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400);
            throw new Error(errors.array()[0].msg);
        }

        const {
            name,
            age,
            gender,
            occupationType,
            orderMethod,
            stockFrequency,
            operationalFactor,
            vehicleType,
            associationDuration,
            invoiceAccuracy,
            reverseLogisticsSmooth,
            appEaseOfUse,
            productFreshnessRating,
            professionalismRating,
            packagingQualityRating,
            deliveryLeadTimeSatisfaction,
            stockAvailabilitySatisfaction,
            overallSatisfaction,
            suggestion
        } = req.body;

        const survey = await Survey.create({
            name,
            age,
            gender,
            occupationType,
            orderMethod,
            stockFrequency,
            operationalFactor,
            vehicleType,
            associationDuration,
            invoiceAccuracy,
            reverseLogisticsSmooth,
            appEaseOfUse,
            productFreshnessRating,
            professionalismRating,
            packagingQualityRating,
            deliveryLeadTimeSatisfaction,
            stockAvailabilitySatisfaction,
            overallSatisfaction,
            suggestion
        });

        res.status(201).json({
            success: true,
            data: survey
        });

    } catch (error) {
        next(error);
    }
};

// @desc    Get all surveys
// @route   GET /api/survey
// @access  Private
const getSurveys = async (req, res, next) => {
    try {
        const surveys = await Survey.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: surveys.length,
            data: surveys
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete survey
// @route   DELETE /api/survey/:id
// @access  Private
const deleteSurvey = async (req, res, next) => {
    try {
        const survey = await Survey.findById(req.params.id);

        if (!survey) {
            res.status(404);
            throw new Error('Survey not found');
        }

        await survey.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    submitSurvey,
    getSurveys,
    deleteSurvey
};

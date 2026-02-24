const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
    // Section 1: Basic Details
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    age: {
        type: Number,
        required: [true, 'Age is required']
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: [true, 'Gender is required']
    },
    occupationType: {
        type: String,
        enum: ['Kirana Store', 'Supermarket', 'Wholesaler', 'General Merchant'],
        required: [true, 'Occupation is required']
    },

    // Section 2: Core Survey
    orderMethod: {
        type: String,
        enum: ['Mobile App', 'Phone Call', 'Salesperson Visit'],
        required: true
    },
    stockFrequency: {
        type: String,
        enum: ['Daily', 'Twice a week', 'Weekly'],
        required: true
    },
    operationalFactor: {
        type: String,
        enum: ['Delivery Speed', 'Product Freshness (FIFO)', 'Accurate Billing'],
        required: true
    },
    vehicleType: {
        type: String,
        enum: ['Small Electric Van', 'Tata Ace / Tempo', 'Large Truck'],
        required: true
    },
    associationDuration: {
        type: String,
        enum: ['0-6 Months', '6-12 Months', 'More than 1 Year'],
        required: true
    },
    invoiceAccuracy: {
        type: String,
        enum: ['Yes', 'No'],
        required: true
    },
    reverseLogisticsSmooth: {
        type: String,
        enum: ['Yes', 'No'],
        required: true
    },
    appEaseOfUse: {
        type: String,
        enum: ['Yes', 'No'],
        required: true
    },

    // Ratings (1-5)
    productFreshnessRating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    professionalismRating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    packagingQualityRating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },

    deliveryLeadTimeSatisfaction: {
        type: String,
        enum: ['Highly Satisfied', 'Satisfied', 'Not Satisfied'],
        required: true
    },
    stockAvailabilitySatisfaction: {
        type: String,
        enum: ['Highly Satisfied', 'Satisfied', 'Not Satisfied'],
        required: true
    },
    overallSatisfaction: {
        type: String,
        enum: ['Highly Satisfied', 'Satisfied', 'Not Satisfied'],
        required: true
    },

    suggestion: {
        type: String
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Survey', surveySchema);
require('dotenv').config();
const mongoose = require('mongoose');
const Survey = require('./models/Survey');
const connectDB = require('./config/db');

connectDB();

const randomFromArray = (arr) =>
  arr[Math.floor(Math.random() * arr.length)];

const generateSurvey = () => ({
  name: `User_${Math.floor(Math.random() * 1000)}`,
  age: Math.floor(Math.random() * 40) + 20,
  gender: randomFromArray(['Male', 'Female']),
  occupationType: randomFromArray([
    'Kirana Store',
    'Supermarket',
    'Wholesaler',
    'General Merchant'
  ]),
  orderMethod: randomFromArray([
    'Mobile App',
    'Phone Call',
    'Salesperson Visit'
  ]),
  stockFrequency: randomFromArray([
    'Daily',
    'Twice a week',
    'Weekly'
  ]),
  operationalFactor: randomFromArray([
    'Delivery Speed',
    'Product Freshness (FIFO)',
    'Accurate Billing'
  ]),
  vehicleType: randomFromArray([
    'Small Electric Van',
    'Tata Ace / Tempo',
    'Large Truck'
  ]),
  associationDuration: randomFromArray([
    '0-6 Months',
    '6-12 Months',
    'More than 1 Year'
  ]),
  invoiceAccuracy: randomFromArray(['Yes', 'No']),
  reverseLogisticsSmooth: randomFromArray(['Yes', 'No']),
  appEaseOfUse: randomFromArray(['Yes', 'No']),
  productFreshnessRating: Math.floor(Math.random() * 5) + 1,
  professionalismRating: Math.floor(Math.random() * 5) + 1,
  packagingQualityRating: Math.floor(Math.random() * 5) + 1,
  deliveryLeadTimeSatisfaction: randomFromArray([
    'Highly Satisfied',
    'Satisfied',
    'Not Satisfied'
  ]),
  stockAvailabilitySatisfaction: randomFromArray([
    'Highly Satisfied',
    'Satisfied',
    'Not Satisfied'
  ]),
  overallSatisfaction: randomFromArray([
    'Highly Satisfied',
    'Satisfied',
    'Not Satisfied'
  ]),
  suggestion: 'No major suggestions.'
});

const seedData = async () => {
  try {
    console.log('Deleting old surveys...');
    await Survey.deleteMany();

    console.log('Generating 100 survey responses...');
    const surveys = Array.from({ length: 100 }, generateSurvey);

    await Survey.insertMany(surveys);

    console.log('✅ 100 survey responses inserted successfully!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
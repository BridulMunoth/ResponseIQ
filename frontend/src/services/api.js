import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Attach JWT token to every request
api.interceptors.request.use(
    (config) => {
        const adminToken = localStorage.getItem('adminToken');
        const customerToken = localStorage.getItem('customerToken');
        const token = adminToken || customerToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Handle 401 globally — only redirect admins
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && localStorage.getItem('adminToken')) {
            localStorage.removeItem('adminToken');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Admin Auth
export const loginAdmin = (data) => api.post('/auth/login', data);

// Customer Auth
export const loginCustomer = (data) => api.post('/customer/login', data);
export const registerCustomer = (data) => api.post('/customer/register', data);

// Surveys
export const getSurveys = () => api.get('/survey');
export const deleteSurvey = (id) => api.delete(`/survey/${id}`);

// Analytics
export const getAnalyticsSummary = () => api.get('/analytics/summary');
export const getOrderMethodAnalytics = () => api.get('/analytics/order-method');
export const getStockFrequencyAnalytics = () => api.get('/analytics/stock-frequency');
export const getOperationalFactorAnalytics = () => api.get('/analytics/operational-factor');
export const getGenderDistributionAnalytics = () => api.get('/analytics/gender-distribution');
export const getAverageRatings = () => api.get('/analytics/average-ratings');
export const getSatisfactionSummary = () => api.get('/analytics/satisfaction-summary');

export default api;

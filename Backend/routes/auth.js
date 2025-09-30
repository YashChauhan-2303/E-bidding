const express = require('express');
const { register, login, getMe, refreshToken, logout, checkEmail, clearTestUsers } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/refresh', refreshToken);
router.post('/logout', logout);
router.get('/check-email/:email', checkEmail);
router.delete('/clear-test-users', clearTestUsers); // For development only

module.exports = router;
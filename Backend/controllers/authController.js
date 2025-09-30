const User = require('../models/User');
const { generateToken, generateRefreshToken, verifyToken } = require('../utils/authUtils');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    console.log('Registration request body:', req.body);
    const { email, password, fullName, role } = req.body;

    // Validation
    if (!email || !password || !fullName) {
      console.log('Missing required fields:', { email: !!email, password: !!password, fullName: !!fullName });
      return res.status(400).json({ 
        success: false,
        message: 'Please provide email, password, and full name' 
      });
    }

    if (password.length < 6) {
      console.log('Password too short:', password.length);
      return res.status(400).json({ 
        success: false,
        message: 'Password must be at least 6 characters' 
      });
    }

    // Check if user exists
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      console.log('User already exists:', email);
      return res.status(400).json({ 
        success: false,
        message: 'User already exists with this email' 
      });
    }

    // Create user
    console.log('Creating user with data:', {
      email: email.toLowerCase(),
      fullName,
      role: role || 'buyer',
      passwordLength: password.length
    });
    
    const user = await User.create({
      email: email.toLowerCase(),
      password,
      fullName,
      role: role || 'buyer'
    });

    console.log('User created successfully:', user._id);

    // Generate tokens
    const accessToken = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Set refresh token as httpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(201).json({
      success: true,
      token: accessToken,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role
      },
      message: 'User registered successfully'
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle MongoDB validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ 
        success: false,
        message: 'Validation error',
        errors: messages
      });
    }
    
    // Handle duplicate key error (email already exists)
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false,
        message: 'User already exists with this email'
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: 'Server error during registration',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Please provide email and password' 
      });
    }

    // Check for user with password included
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid email or password' 
      });
    }

    // Check if password matches
    const isPasswordMatch = await user.matchPassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid email or password' 
      });
    }

    // Generate tokens
    const accessToken = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Set refresh token as httpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({
      success: true,
      token: accessToken,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role
      },
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during login',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Refresh access token
// @route   POST /api/auth/refresh
// @access  Public (but requires refresh token)
const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({ 
        success: false,
        message: 'Refresh token not found' 
      });
    }

    // Verify refresh token
    const decoded = verifyToken(refreshToken, true);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    // Generate new access token
    const newAccessToken = generateToken(user._id);

    res.json({
      success: true,
      token: newAccessToken,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(401).json({ 
      success: false,
      message: 'Invalid refresh token' 
    });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Public
const logout = (req, res) => {
  res.cookie('refreshToken', '', {
    httpOnly: true,
    expires: new Date(0)
  });

  res.json({
    success: true,
    message: 'Logged out successfully'
  });
};

// @desc    Check if email exists
// @route   GET /api/auth/check-email/:email
// @access  Public
const checkEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email: email.toLowerCase() });
    
    res.json({
      success: true,
      exists: !!user,
      email: email.toLowerCase()
    });
  } catch (error) {
    console.error('Check email error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
};

// @desc    Clear test users (development only)
// @route   DELETE /api/auth/clear-test-users
// @access  Public (should be protected in production)
const clearTestUsers = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'production') {
      return res.status(403).json({
        success: false,
        message: 'Not allowed in production'
      });
    }
    
    // Delete test users (emails containing 'test' or specific test emails)
    const result = await User.deleteMany({
      $or: [
        { email: /test/i },
        { email: 'yashalt23@gmail.com' }
      ]
    });
    
    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} test users`
    });
  } catch (error) {
    console.error('Clear test users error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
  refreshToken,
  logout,
  checkEmail,
  clearTestUsers
};
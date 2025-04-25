import User from '../models/User.js';
import { JWT_SECRET, JWT_EXPIRE } from '../config/constants.js';

import jwt from 'jsonwebtoken';

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRE }
  );
};

// @desc    Register user
// @route   POST /api/auth/signup
// @access  Public
export const register = async (req, res, next) => {
  try {
    const { username, email, password, age, gender, favoriteGenres } = req.body;

    // Create user
    const user = await User.create({
      username,
      email,
      password,
      age,
      gender,
      favoriteGenres,
    });

    // Create token
    const token = generateToken(user);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    logger.error('Registration error:', err);
    next(err);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email and password',
      });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
      });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
      });
    }

    // Create token
    const token = generateToken(user);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err)
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    console.log(err)
 
  }
};

// controllers/authController.js
export const verifyToken = async (req, res) => {
  try {
    // If we get here, the token is already verified by middleware
    res.status(200).json({ 
      success: true,
      user: {
        id: req.user.id,
        email: req.user.email,
        username: user.username,
        // include other user fields you need
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during verification' });
  }
};
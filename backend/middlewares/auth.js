import  jwt from 'jsonwebtoken';
import  User from '../models/User';
import  { JWT_SECRET } from '../config/constants';
import  logger from '../utils/logger';

// Protect routes
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route',
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    logger.error('JWT verification error:', err);
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route',
    });
  }
};

// Grant access to specific roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `User role ${req.user.role} is not authorized to access this route`,
      });
    }
    next();
  };
};
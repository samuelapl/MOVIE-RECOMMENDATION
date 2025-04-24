import { check, validationResult } from 'express-validator';

// Validation for registration
export const validateRegister = [
  check('username', 'Username is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  check('age', 'Age is required').isInt({ min: 13, max: 120 }),
  check('gender', 'Gender is required').not().isEmpty(),
  check('favoriteGenres', 'Please select at least 3 genres').isArray({ min: 3 }),
];

// Validation for login
export const validateLogin = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
];

// Middleware to handle validation results
export const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};

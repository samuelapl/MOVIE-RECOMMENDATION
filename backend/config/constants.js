module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || 'myjwt',
    JWT_EXPIRE: '7d',
    MIN_PASSWORD_LENGTH: 6,
    MIN_GENRES_SELECTION: 3,
  };
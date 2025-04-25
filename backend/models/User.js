import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { MIN_GENRES_SELECTION } from '../config/constants.js';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: [13, 'You must be at least 13 years old'],
      max: [120, 'Please enter a valid age'],
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: ['male', 'female', 'other'],
    },
    favoriteGenres: {
      type: [String],
      required: [true, 'Please select at least 3 favorite genres'],
      validate: {
        validator: function (v) {
          return v.length >= MIN_GENRES_SELECTION;
        },
        message: `Please select at least ${MIN_GENRES_SELECTION} genres`,
      },
    },
    favorites: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
      }],
      default: []
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual role property (e.g., 'admin' or 'user')
UserSchema.virtual('role').get(function () {
  return this.isAdmin ? 'admin' : 'user';
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', UserSchema);
export default User;

import mongoose, { Schema } from 'mongoose';
import { validateEmail, validatePassword } from '../validators.js';

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'This field is required!'],
    lowercase: true,
    trim: true,
    validate: [value => validateEmail(value), 'Invalid email address!'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'This field is required!'],
    validate: [value => validatePassword(value), 'Too weak password!'],
  },
});

const User = mongoose.model('User', userSchema); 

export default User;

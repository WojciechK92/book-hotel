import mongoose, { Schema } from 'mongoose';
import { validateEmail, validatePassword, checkArray } from '../validators.js';
import bcrypt from 'bcrypt';

export const userSchema = new Schema({
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
  trips: {
    type: Array,
    validate: checkArray,
  },
});

userSchema.pre('save', async function(next) {
  const salt = bcrypt.genSaltSync(10); 
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;

  next();
});

userSchema.post('save', function(err, data, next) {
  if (err.code === 11000) {
    err.errors = { email: { message: 'This email is already taken!' } };
  };

  next();
});

userSchema.methods = {
  comparePassword(password) {
    return bcrypt.compareSync(password, this.password); 
  },
};

const User = mongoose.model('User', userSchema); 

export default User;

import mongoose, { Schema } from 'mongoose';
import { validateLetters, validateDate } from '../validators.js';

const validateLettersExpression = [validateLetters, 'Only alphabet characters and numbers (0-10) are available!'];
const requiredExpression = [true, 'This field is required!'];
const minLengthExpression = [3, 'Minimum amount of characters: 3'];
const maxLengthExpression = [30, 'Maximum amount of characters: 30'];

const tripSchema = new Schema({
  country: {
    type: String,
    required: requiredExpression,
    lowercase: true,
    trim: true,
    minLength: minLengthExpression,
    maxLength: maxLengthExpression,
    validate: validateLettersExpression, 
  },
  region: {
    type: String,
    required: requiredExpression, 
    lowercase: true,
    trim: true,
    minLength: minLengthExpression, 
    maxLength: maxLengthExpression,
    validate: validateLettersExpression,

  },
  city: {
    type: String,
    required: requiredExpression, 
    lowercase: true,
    trim: true,
    minLength: minLengthExpression, 
    maxLength: maxLengthExpression,
    validate: validateLettersExpression,
  },
  hotelName: {
    type: String,
    required: requiredExpression, 
    lowercase: true,
    trim: true,
    minLength: minLengthExpression, 
    maxLength: maxLengthExpression,
    validate: validateLettersExpression,
  },
  hotelStandard: {
    type: String,
    required: requiredExpression, 
    validate: validateLettersExpression,
  },
  start: {
    type: Date,
    required: requiredExpression, 
  },
  end: {
    type: Date,
    required: requiredExpression, 
  },
  from: {
    type: String,
    required: requiredExpression, 
    lowercase: true,
    trim: true,
    minLength: minLengthExpression, 
    maxLength: maxLengthExpression,
    validate: validateLettersExpression,
  },
  food: {
    type: String,
    required: requiredExpression, 
    validate: validateLettersExpression,
  },
  transport: {
    type: String,
    required: requiredExpression, 
    lowercase: true,
    trim: true,
    minLength: minLengthExpression, 
    maxLength: maxLengthExpression,
    validate: validateLettersExpression,
  },
  popular: {
    type: String,
    required: requiredExpression, 
    lowercase: true,
    trim: true,
    minLength: minLengthExpression, 
    maxLength: maxLengthExpression,
    validate: validateLettersExpression,
  },
  places: {
    type: Number,
    required: requiredExpression, 
    min: [0, 'Minimum: 0'],
    max: [1000, 'Maximum: 1 000'],
  },
  price: {
    type: Number,
    required: requiredExpression, 
    min: [0, 'Minimum: 0'],
    max: [20000, 'Maximum: 20 000'],
  },
  rating: {
    type: Number,
  },
  admin: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Admin',
  },
  image: {
    type: String,
    required: true,
  },
});

const Trip = mongoose.model('Trip', tripSchema);

export default Trip;
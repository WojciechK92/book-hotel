import mongoose, { Schema } from 'mongoose';
import { validateLetters, validateDate } from '../validators.js';

const validateLettersExpression = [validateLetters, 'Only alphabet characters and numbers (0-10) are available!'];
const requiredExpression = [true, 'This field is required!'];
const minLengthExpression = [3, 'Minimum amount of characters: 3!'];

const tripSchema = new Schema({
  country: {
    type: String,
    required: requiredExpression,
    lowercase: true,
    trim: true,
    minLength: minLengthExpression,
    validate: validateLettersExpression, 
  },
  region: {
    type: String,
    required: requiredExpression, 
    lowercase: true,
    trim: true,
    minLength: minLengthExpression, 
    validate: validateLettersExpression,

  },
  city: {
    type: String,
    required: requiredExpression, 
    lowercase: true,
    trim: true,
    minLength: minLengthExpression, 
    validate: validateLettersExpression,
  },
  hotelName: {
    type: String,
    required: requiredExpression, 
    lowercase: true,
    trim: true,
    minLength: minLengthExpression, 
    validate: validateLettersExpression,
  },
  hotelStandard: {
    type: String,
    required: requiredExpression, 
    validate: validateLettersExpression,
  },
  start: {
    type: String,
    required: requiredExpression, 
    validate: [validateDate, 'Wrong date!'],
  },
  end: {
    type: String,
    required: requiredExpression, 
    validate: [validateDate, 'Wrong date!'],
  },
  from: {
    type: String,
    required: requiredExpression, 
    lowercase: true,
    trim: true,
    minLength: minLengthExpression, 
    validate: validateLettersExpression,
  },
  food: {
    type: String,
    required: requiredExpression, 
    lowercase: true,
    trim: true,
    validate: validateLettersExpression,
  },
  transport: {
    type: String,
    required: requiredExpression, 
    lowercase: true,
    trim: true,
    minLength: minLengthExpression, 
    validate: validateLettersExpression,
  },
  popular: {
    type: String,
    required: requiredExpression, 
    lowercase: true,
    trim: true,
    minLength: minLengthExpression, 
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
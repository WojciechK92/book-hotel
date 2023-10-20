import mongoose, { Schema } from 'mongoose';
import { validateLetters } from '../validators.js';

const validateLettersExpression = [validateLetters, 'Only alphabet characters and numbers (0-10) are available!'];
const requiredExpression = [true, 'This field is required!'];
const minLengthExpression = [3, 'Minimum amount of characters: 3'];
const maxLengthExpression = [30, 'Maximum amount of characters: 30'];
const getter = (date) => {
  let newDate = new Date(date);
  let year = newDate.getFullYear();
  let month = ('0' + (newDate.getMonth() + 1)).slice(-2);
  let day = ('0' + newDate.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

const today = new Date();
const twoYears = new Date().setFullYear(today.getFullYear() + 2);

const tripSchema = new Schema({
  country: {
    type: String,
    required: requiredExpression,
    trim: true,
    minLength: minLengthExpression,
    maxLength: maxLengthExpression,
    validate: validateLettersExpression, 
  },
  region: {
    type: String,
    required: requiredExpression, 
    trim: true,
    minLength: minLengthExpression, 
    maxLength: maxLengthExpression,
    validate: validateLettersExpression,

  },
  city: {
    type: String,
    required: requiredExpression, 
    trim: true,
    minLength: minLengthExpression, 
    maxLength: maxLengthExpression,
    validate: validateLettersExpression,
  },
  hotelName: {
    type: String,
    required: requiredExpression, 
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
    min: [today, 'The correct time period starts tomorrow and ends in 2 years'],
    max: [twoYears, 'The correct time period starts tomorrow and ends in 2 years'],
    get: getter,
  },
  end: {
    type: Date,
    required: requiredExpression, 
    min: [today, 'The correct time period starts tomorrow and ends in 2 years'],
    max: [twoYears, 'The correct time period starts tomorrow and ends in 2 years'],
    get: getter,
  },
  days: {
    type: Number,
  },
  from: {
    type: String,
    required: requiredExpression, 
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
    trim: true,
    minLength: minLengthExpression, 
    maxLength: maxLengthExpression,
    validate: validateLettersExpression,
  },
  popular: {
    type: String,
    required: requiredExpression, 
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
  },
});

tripSchema.set('toObject', { getters: true });
tripSchema.set('toJSON', { getters: true });

const Trip = mongoose.model('Trip', tripSchema);

export default Trip;
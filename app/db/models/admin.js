import mongoose from 'mongoose';
import { userSchema } from './user.js';

const Admin = mongoose.model('Admin', userSchema);

export default Admin;
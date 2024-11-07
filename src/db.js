import mongoose from 'mongoose'
import {configObject} from './config/config.js'
const { MONGO_URI } = configObject;

try {
  await mongoose.connect(MONGO_URI);
  console.log(`Backend connected to MongoDB`);
} catch (error) {
  console.log(`Couldn't connect to MongoDB, (${error.message})`);
}
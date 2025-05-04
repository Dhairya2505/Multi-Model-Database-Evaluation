import mongoose from "mongoose";
import { config } from "dotenv";
config();

export async function mongo_client() {
    await mongoose.connect(process.env.MONGO_URI as string)
      .then(() => console.log('Connected to MongoDB'))
      .catch(err => console.error('Connection error:', err));
}
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './database/db.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from "cookie-parser";
import cors from "cors"

dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true 
}));


app.use(express.json());
app.use(cookieParser());



connectDB();


app.use('/api/auth', authRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './database/db.js';
import {Doctor} from "./models/Doctor.js"
import {Hospital} from './models/Hospital.js';
import {Patient} from './models/Patient.js';



import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();


app.use(express.json());


connectDB();

app.use('/api/auth', authRoutes);
app.get('/api/patients', async (req, res) => {
  const patients = await Patient.find();
  res.json(patients);
});

app.get('/api/doctors', async (req, res) => {
  const doctors = await Doctor.find().populate('hospitalId');
  res.json(doctors);
});

app.get('/api/hospitals', async (req, res) => {
  const hospitals = await Hospital.find();
  res.json(hospitals);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';

const app = express();

dotenv.config();
connectDB();


app.use(express.json());
app.use(cors());


app.use('/auth', authRoutes);


app.get('/', (req, res) => {
    res.send({message:"Welcome homepage Raj"})
})


const PORT = process.env.PORT || 3000

app.listen(PORT , (req, res) => {
console.log(`Server Running on port ${PORT}`)
})
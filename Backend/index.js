import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import protectedRoutes from './routes/protectedRoutes.js'
dotenv.config({ silent: process.env.NODE_ENV === 'production' });
const app = express();
const port = 5000;

app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:3000', // Update with your frontend origin
    credentials: true,
};
app.use(cors(corsOptions));
app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

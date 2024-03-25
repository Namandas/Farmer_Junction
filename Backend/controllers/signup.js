import express from 'express';
import db from '../config/database.js';
import bcrypt from 'bcrypt';
const router = express.Router(); 

router.use(express.json());

router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const { firstName, lastName, email, createPassword, phoneNumber,city,district,state,country } = req.body;
        const password = await bcrypt.hash(createPassword,13);
        const query = `
            INSERT INTO users (firstname, lastname, email, password, phonenumber, city, district, state, country)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `;
        await db.query(query, [firstName, lastName, email, password, phoneNumber, city, district, state, country]);
        
        console.log('Form data inserted successfully.');
        res.send('Form data received and inserted successfully.');
    } catch (error) {
        console.error('Error inserting form data:', error);
        res.sendStatus(500);
    }
});

export default router;


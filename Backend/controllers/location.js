import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../config/database.js';
const router = express.Router();
router.get('/', async(req,res)=>{
    try{
    const token = req.headers.authorization?.split(' ')[1];
    const decodedToken = jwt.decode(token, { complete: true });
    const email = decodedToken.payload.email;
    const user = await db.query('SELECT city FROM users WHERE email = $1',[email]); 
    const city = user.rows[0].city;
    console.log(city);
    res.json(city);
    }catch(err){
        res.sendStatus(400);
    }
});
export default router;
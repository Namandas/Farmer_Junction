import express from 'express';
import db from '../config/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router(); 


router.post('/',async(req,res)=>{
    try{
        const {email, password} = req.body;
        const response = await db.query("SELECT * FROM users WHERE email = $1",[email]);
        const user = response.rows[0];
        if (!user) {
             return res.status(401).json({ message: 'Invalid username or password' });;
        }
        //password matching
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
           return res.status(401).json({ message: 'Invalid username or password' });;
        }
        console.log(req.body)
        // Generate JWT token
        const token =  jwt.sign({email}, process.env.SECRET_KEY, { expiresIn: '30min' });
    
        return res.status(200).json({ message: token });
    }
    catch(err){
        console.log(err.message);
        return res.sendStatus(500);
    }
    
})

export default router;
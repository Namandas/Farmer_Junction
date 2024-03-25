import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../config/database.js';
const router = express.Router();
router.get('/',async (req,res)=>{
    try{
        const token = req.headers.authorization?.split(' ')[1];
        const decodedToken = jwt.decode(token, { complete: true });
        const email = decodedToken.payload.email;
        const response = await db.query('SELECT * FROM users WHERE email = $1',[email]);
        delete response.rows[0].userid;
        delete response.rows[0].password;
        res.send(response.rows[0]);
    }catch(err){
        res.sendStatus(400);
    }
   
})
export default router;
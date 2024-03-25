import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../config/database.js';
const router = express.Router();
router.get('/',async(req,res)=>{
    const token = req.headers.authorization?.split(' ')[1];
    const decodedToken = jwt.decode(token, { complete: true });
    const email = decodedToken.payload.email;
    const user = await db.query('SELECT userid FROM users WHERE email = $1',[email]); 
    const userid = user.rows[0].userid;
    const query = 'select companyname from company where farmerid in(select farmerid from farmer where userid = $1)'
    const response = await db.query(query,[email]);
    console.log(response.rows)
})
export default router;
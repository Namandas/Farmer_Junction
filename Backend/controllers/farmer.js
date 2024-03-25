import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../config/database.js';
import axios from 'axios';
const router = express.Router();
router.post('/', async(req,res)=>{
    try{
        const token = req.headers.authorization?.split(' ')[1];
    const decodedToken = jwt.decode(token, { complete: true });
    const email = decodedToken.payload.email;
    const {farmName,totalLandArea,cropsGrown,quantityCropsGrown} = req.body;
    const user = await db.query('SELECT userid FROM users WHERE email = $1',[email]); 
    const userid = user.rows[0].userid;
    await db.query('INSERT INTO farmer (userid,farmname,totallandArea,cropsgrown,cropquantity) VALUES($1,$2,$3,$4,$5)',[userid,farmName,totalLandArea,cropsGrown,quantityCropsGrown])
    
    //fetch farmer id
    const query = 'SELECT farmerid from Farmer WHERE userid IN(SELECT userid FROM users WHERE email = $1)';
    const response = await db.query(query,[email]);
    const farmerid = response.rows[0].farmerid;
    console.log(farmerid);
    //assignment of batch
    const d = await axios.post(`https://delphine18-recommender-system.hf.space`,{
        query : farmerid
    });
    console.log(d.data.ans);
}catch(err){
    console.log(err.message);
        res.sendStatus(400)
    }
    
})
export default router;
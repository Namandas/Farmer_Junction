import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../config/database.js';
import axios from 'axios';
const router = express.Router();
router.get('/',async(req,res)=>{
    try{
       
        const token = req.headers.authorization?.split(' ')[1];
    const decodedToken = jwt.decode(token, { complete: true });
    const email = decodedToken.payload.email;
    const query = 'SELECT * FROM soilanalysis WHERE farmerid IN(SELECT farmerid from farmer WHERE userid IN(SELECT userid FROM users where email = $1))'
    const response = await db.query(query,[email]);
    const d = response.rows[0];
    delete response.rows[0].analysisid;
    delete response.rows[0].farmerid;
    delete response.rows[0].analysisdate;
    delete response.rows[0].recommendations;
    //console.log(response.rows[0]);
    const x = response.rows[0];
    const array = [];
    array.push(x.nitrogenlevel,x.phosphoruslevel,x.potassiumlevel,x.temperature,x.humidity,x.phlevel,x.rainfall);
    const cropName = await axios.post('https://delphine18-crop-recc.hf.space',{
        data : array
    });
    const cropname = cropName.data;
    console.log(cropname)
    const cropdata = await axios.post('https://delphine18-scraper-api.hf.space',{
        commodity : cropname
    });
   

    const cropData = cropdata.data;
    const send = {
        soil : d,
        cropData : cropData,
    }
   res.json(send);

    }catch(err){
        res.sendStatus(400);
    }
    
})
export default router;
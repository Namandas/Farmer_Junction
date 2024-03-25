import express from 'express';
import axios from 'axios';
import multer from 'multer'
import FormData from 'form-data';
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
router.post('/',upload.single('image'),async(req,res)=>{
    try{
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
          }
      
          // Access buffer from req.file
          const buffer = req.file.buffer;
          const blob = new Blob([buffer], { type: 'image/jpeg' });
            const apiUrl = 'https://delphine18-disease-classification.hf.space/';
            const formData = new FormData();
            formData.append('image', buffer, {
                filename: 'image.jpg',
                contentType: 'image/jpeg',
            });
    
            const response = await axios.post(apiUrl, formData, {
                headers: {
                    ...formData.getHeaders(), // Include necessary headers for FormData
                },
            });
            console.log(response.data);
            res.json(response.data);
    }catch(err){
       res.sendStatus(400);
    }
    // Render the result in another EJS template
})
export default router;
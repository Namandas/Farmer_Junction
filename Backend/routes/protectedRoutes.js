import express from 'express';
import dashboard from '../controllers/dashboard.js';
import authenticateUser from '../controllers/authenticate.js';
import profile from '../controllers/profile.js';
import verify from '../controllers/verify.js';
import image from '../controllers/imageUpload.js';
import cropname from '../controllers/cropname.js';
import farmer from '../controllers/farmer.js';
import location from '../controllers/location.js'
import batch from '../controllers/batch.js'
const router = express.Router();
router.use('/dashboard',authenticateUser,dashboard);
router.use('/profile',authenticateUser,profile);
router.use('/verify',authenticateUser,verify);
router.use('/image',authenticateUser,image);
router.use('/cropname',authenticateUser,cropname);
router.use('/farmer',authenticateUser,farmer);
router.use('/location',authenticateUser,location);
router.use('/batch',authenticateUser,batch);
export default router;
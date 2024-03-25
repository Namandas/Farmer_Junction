import express from 'express';
import signup from '../controllers/signup.js'
import  login from '../controllers/login.js';
import logout from '../controllers/logout.js'
import authenticateUser from '../controllers/authenticate.js';
import otp from '../controllers/otp.js';
const router = express.Router();

router.use('/signup', signup);
router.use('/login',login);
router.use('/logout',authenticateUser, logout);
router.use('/otp',otp);

export default router;
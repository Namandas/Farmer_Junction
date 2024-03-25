import express from 'express';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const router = express.Router();

function generateOTP() {
    return crypto.randomBytes(3).toString('hex').toUpperCase();
}

function sendOTPEmail(email, otp) {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "namandas605@gmail.com",
          pass: "hahdskfonnmaefse",
        },
    });

    const mailOptions = {
        from: 'Agriculturehub@gmail.com',
        to: email,
        subject: 'OTP Verification',
        text: `Your OTP for signup is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

router.post('/', async (req, res) => {
    try {
        const email = req.body.email;
        console.log(email)
        const otp = generateOTP();
        console.log(otp);
        sendOTPEmail(email, otp);
        res.json(otp);
    } catch (err) {
        console.log({ error: err.message });
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;

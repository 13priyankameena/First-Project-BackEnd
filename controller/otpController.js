import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//It’s like a temporary database in memory where we’ll store OTPs for different users.

let opStore = {};

//create transporter for email

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,         // or 587
    secure: true,      // true for 465, false for 587
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    // tls: {
    //     rejectUnauthorized: false, // allow self-signed certs
    // },
})

//send OTP

export const sendOTP = async (req, res) => {

    try {
        const { username } = req.body;
        console.log(req.body);
        if (!username) {
            return res.status(400).json({ success: false, message: "Username required" });
        }

        //Generate 6-digit OTP
        console.log("FOR GEnerating OTP recieved username", username);

        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
            digits: true,
            lowerCaseAlphabets: false,
        });

        //store otp for particular user

        opStore[username] = otp;

console.log(opStore[username]);
        // Send OTP via Gmail

        const info = await transporter.sendMail({

            from: `"Priyanka" <${process.env.EMAIL_USER}>`,    //sender Email
            to: "13priyankameena13@gmail.com",
            subject: "Your OTP Code",  // email subject
            text: `Hello Priyanka, your OTP is: ${otp}`,  // Plain text (for fallback)
            html: `<b>Hello Priyanka,</b><br><p>Your OTP is: <strong>${otp}</strong></p>`, // HTML body

        });

        console.log("OTP sent successfully to:", info.envelope.to);

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully!",
            sentTo: info.envelope.to,
            username,
        });
    }
    catch (error) {

        console.error("Error sending OTP:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to send OTP"
        });
    }

};


//verify OTP

export const verifyOTP = async (req, res) => {
    try {
        const { username, otp } = req.body;

        if (!username || !otp) {
            return res.status(400).json({ sucess: false, message: "Username and OTP required" });
        }

        // check if OTP exists for this user
        if (opStore[username] !== otp) {
            return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
        }
        //OTP matched -> remove from store

        delete opStore[username];

        //Generate JWT token


        const token = jwt.sign(
            { username },
            process.env.JWT_SECRET
        );
        console.log("Generated Token : ", token);


        return res.status(200).json({
            success: true,
            message: "OTP verified successfully Login successful",
            token,
        });


    } catch (error) {

        console.error("Error verified OTP", error);
        return res.status(500).json({ success: false, message: "OTP verification failed" });

    }
};
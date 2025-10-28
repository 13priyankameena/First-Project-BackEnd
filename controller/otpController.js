import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Resend } from 'resend';
import { login } from "../models/chartSchema.js";

dotenv.config();

//It’s like a temporary database in memory where we’ll store OTPs for different users.

let opStore = {};

// const resend = new Resend(process.env.RESEND_API_KEY);


//create transporter for email

const transporter = nodemailer.createTransport({
   service:"gmail",
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
        console.log("otp controller recieve req.body", username);

        if (!username) {
            return res.status(400).json({ success: false, message: "Username required" });
        }

        const user = await login.findOne({ username });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const email = user.email;
        console.log("email recieved for this user", email);

        //Generate 6-digit OTP
        console.log("FOR GEnerating OTP recieved username", username);

        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
            digits: true,
            lowerCaseAlphabets: false,
        });

        //store otp for particular user

        opStore[email] = otp;    //Saves OTP in memory like { "user@gmail.com": "458920" }

        console.log("opStore[email]", opStore[email]);


        // Send OTP via Gmail

        const info = await transporter.sendMail({

            from: `"Priyanka" <${process.env.EMAIL_USER}>`,    //sender Email
            to: email,
            subject: "Your OTP Code",  // email subject
            text: `Hello Priyanka, your OTP is: ${otp}`,  // Plain text (for fallback)
            html: `<b>Hello,</b><br><p>Your OTP is: <strong>${otp}</strong></p>`, // HTML body

        });

        console.log("OTP sent successfully to:", info.envelope.to);



        // // Send OTP via Resend
        // const info = await resend.emails.send({
        //     from: "Priyanka App <onboarding@resend.dev>",  // default Resend email or your verified domain
        //     to: email,
        //     subject: "Your OTP Code",
        //     text: `Hello ${username}, your OTP is: ${otp}`,
        //     html: `<b>Hello ${username},</b><br><p>Your OTP is: <strong>${otp}</strong></p>`,
        // });

        console.log("OTP sent successfully:", info);

        return res.status(200).json({
            success: true,
            message: `OTP sent to ${email}`,
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

        const user = await login.findOne({ username });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const email = user.email;
        console.log("email recieved for this user", email);



        // check if OTP exists for this user
        if (opStore[email] !== otp) {
            return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
        }
        //OTP matched -> remove from store

        delete opStore[email];

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
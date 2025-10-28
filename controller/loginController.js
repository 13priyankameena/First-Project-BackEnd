import { login } from "../models/chartSchema.js";

import { sendOTP } from "./otpController.js";


const getuserLogin = async (req, res) => {
  try {
    const { username, password} = req.body;
    console.log("Received:", req.body);

    // username + password check

    const user = await login.findOne({ username, password });
    console.log("User found:", user);

    if (user) {

      // Call sendOTP function 

      req.body.username = username; // required by sendOTP
       req.body.email = user.email;

      return await sendOTP(req, res);

      // Generate JWT token


      // const token = jwt.sign(
      //     {
      //       ID:user._id, username:user.username},
      //     process.env.JWT_SECRET
      //   );
      //   console.log(token);


      // res.status(200).json({ success: true, message: "Login successful"});


    } else {
      res.status(401).json({ success: false, message: "Invalid username or password" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const createLoginRecord = async (req, res) => {

  try {

    const { username, password, email } = req.body;

    // check if username already exist

    const existingUser = await login.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "username already exist" });
    }

    //create new user

    const data = new login({ username, password, email });
    if (data) {
      await data.save();
      console.log("New record Created", data);
      res.status(201).json({ success: true, message: "user registered successfully", user: data })
    }

  } catch (error) {
    console.log("Error in createLoginRecord:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export { getuserLogin, createLoginRecord };






import { login } from "../models/chartSchema.js";
import jwt from "jsonwebtoken";


const getuserLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
console.log("Received:", req.body);
    // username + password check
    const user = await login.findOne({ username, password });

    
const allUsers = await login.find({});
console.log("All Users in DB:", allUsers);


      
    


console.log("User found:", user);
    if (user) {


// Generate JWT token


  const token = jwt.sign(
      {
        ID:user._id, username:user.username},
      process.env.JWT_SECRET
    );
    console.log(token);


//     // Set token in cookie

//     res.cookie("token", token, {
//       httpOnly: true,   // cookie not accessible by JS
//       secure: false,    // change to true if using HTTPS
//       maxAge: 60 * 60 * 1000 // 1 hour
//     });


      res.status(200).json({ success: true, message: "Login successful",token});

    
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

      const{username,password}= req.body;

      // check if username already exist

      const existingUser = await login.findOne({username});
      if (existingUser){
        return res.status(400).json({success:false, message: "username already exist"});
      }

//create new user

  const data = new login({username,password});
        if (data) {
            await data.save();
            console.log("New record Created",data);
            res.status(201).json({success:true, message:"user registered successfully", user : data})
        }
      
    } catch (error) {
        console.log("Error in createLoginRecord:", error.message);
        res.status(500).json({success:false, message: "Server error"});
    }
};


export {getuserLogin,createLoginRecord};






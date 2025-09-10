import { login } from "../models/chartSchema.js";



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
      res.status(200).json({ success: true, message: "Login successful" });

      
    } else {
      res.status(401).json({ success: false, message: "Invalid username or password" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export {getuserLogin };


// const getUserName = async (req,res) =>{
//     try {
//         const data = await login.find({});
//         res.send(data);
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// export {getUserName};
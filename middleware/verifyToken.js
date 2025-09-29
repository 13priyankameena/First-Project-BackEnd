import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {

   const authHeader = req.headers["authorization"];

   if (!authHeader) {
      return res.status(401).json({ message: "No token provided " });
   }
   const token = authHeader.split(" ")[1];   //here Output: ["Bearer", "eyJhbGciOi..."]and index 1 selected which is token
   if (!token) {
      return res.status(401).json({ message: " Token Missing" });
   }

   try {

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded; // save user info for next routes
      console.log(req.user);
      next();
   } catch (error) {
      return res.status(403).json({ message: "Invalid or expired token" });
   }
}
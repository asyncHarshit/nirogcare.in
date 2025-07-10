
import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded; 

    
    next(); 
  } catch (err) {
    console.error("JWT Error:", err);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

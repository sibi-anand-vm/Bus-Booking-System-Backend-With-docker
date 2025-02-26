const jwt = require("jsonwebtoken");


const auth = (req, res, next) => {
  
  let token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).send("No token provided");
  }

  try {
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next(); 
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};


const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admin role required." });
  }
  next(); 
};

module.exports = { auth, isAdmin };
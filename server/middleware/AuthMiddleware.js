import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// dotenv.config();
// const secret = process.env.JWTKEY;
// const authMiddleWare = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     console.log(token)
//     if (token) {
//       const decoded = jwt.verify(token, secret);
//       console.log(decoded)
//       req.body._id = decoded?.id;
//     }
//     next();
//   } catch (error) {
//     console.log(error);
//   }
// };

// export default authMiddleWare;

dotenv.config();
const secret = process.env.JWTKEY;
const authMiddleWare = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const token = authorizationHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, secret);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    req.body._id = decoded.id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default authMiddleWare;

import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token provided" });
  }

  // Format: "Bearer tokenString"
  const token = header.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ msg: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // We sign: { id: user._id }
    req.userId = decoded.id;

    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
}
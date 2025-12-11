import jwt from "jsonwebtoken";

export default function auth(req, res, next){
  const headers = req.headedrs.authorization;

  if(!headers){
    return res.status(401).json({ msg: "No token provided" });
  }

  // bearer tokenString
  const token = headers.splitr(" ")[1];

  if(!token){
    return res.status(401).json( { msg: "Token Missing"});
  }

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;// stores userId
    next();// continue to routehandler
  }
  catch(err){
    return res.status(401).json( {msg: "Invalid Token"} );
  }

    


};
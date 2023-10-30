import jwt from "jsonwebtoken";

export const checkToken = (req, res, next) => {
  // get token from header
  const token = req.header("token");
  // check if not token
  if (!token) {
    return res.status(401).send("No token, authorization denied");
  }
  // verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).send("Token is not valid");
  }
};

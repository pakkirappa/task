import jwt from "jsonwebtoken";

function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send("Access denied");
  }
  jwt.verify(token, process.env.SECRET_KEY || "secret", (err, user) => {
    if (err) {
      return res.status(403).send("Invalid token");
    }
    req.user = user;
    next();
  });
}

export { checkToken };

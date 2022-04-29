import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];

    jwt.verify(bearerToken, JWT_SECRET, function (err, encoded) {
      if (err) {
        console.log("Secret error");
        console.dir(err);
        res.sendStatus(403);
      } else {
        console.log("Decoded");
        req.encoded = encoded;
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
};

export { verifyToken };

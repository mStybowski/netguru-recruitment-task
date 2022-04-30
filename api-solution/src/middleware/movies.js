import jwt from "jsonwebtoken";
import { query } from "../db/index.js";

const { JWT_SECRET } = process.env;

const verifyPermission = async (req, res, next) => {
  const { role, userId } = req.encoded;

  if (role === "premium") {
    next();
  } else if (role === "basic") {
    const { rowCount } = await query(
      "SELECT id FROM movies WHERE userId=$1 AND created_at >= date_trunc('month', CURRENT_DATE);",
      [userId]
    );
    if (rowCount < 5) {
      next();
    } else {
      res
        .status(200)
        .send(`You need premium account to add more than 5 movies per month.`);
    }
  } else {
    res.status(403).send(`Unauthorized`);
  }
};

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
    res.status(403).send(`Unauthorized`);
  }
};

export { verifyToken, verifyPermission };

import jwt from 'jsonwebtoken';
import { query } from '../db/index.js';
import { respondWithJSON } from '../lib/index.js';

const { JWT_SECRET } = process.env;

const verifyPermission = async (req, res, next) => {
  const { role, userId } = req.encoded;

  if (role === 'premium') {
    next();
  } else if (role === 'basic') {
    const { rowCount } = await query("SELECT id FROM movies WHERE userId=$1 AND created_at >= date_trunc('month', CURRENT_DATE);", [userId]);
    rowCount < 5 ? next() : respondWithJSON(res, 200, `You need premium account to add more than 5 movies per month.`);
  } else {
    respondWithJSON(res, 403, `Unauthorized`);
  }
};

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];

    jwt.verify(bearerToken, JWT_SECRET, function (err, encoded) {
      if (err) {
        console.log('Secret error');
        respondWithJSON(res, 403, `Secret error`);
      } else {
        console.log('Encoded');
        req.encoded = encoded;
        next();
      }
    });
  } else {
    respondWithJSON(res, 403, `Unauthorized`);
  }
};

export { verifyToken, verifyPermission };

// import { jsonwebtoken as jwt } from "jsonwebtoken";
// import { sign, verify } from "jsonwebtoken";
import jwt from 'jsonwebtoken';
const expire = "24h";
export function signToken(token) {
 jwt.sign(token, process.env.JWT_SECRTE, { expiresIn: expire }, (err, decode) => {
    if (err) throw err;
  });
}

export function verifyToken(token) {
  jwt.verify(token, process.env.JWT_SECRTE, (err, decoded) => {
    if (err) throw err;
  });
}

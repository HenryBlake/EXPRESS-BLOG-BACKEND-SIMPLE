// import { jsonwentoken as jwt } from "jsonwebtoken";
import { sign, verify } from "jsonwebtoken";
const expire = "24h";
export function signToken(token) {
  sign(token, process.env.JWT_SECRTE, { expiresIn: expire }, (err, decode) => {
    if (err) throw err;
  });
}

export function verifyToken(token) {
  verify(token, process.env.JWT_SECRTE, (err, decoded) => {
    if (err) throw err;
  });
}

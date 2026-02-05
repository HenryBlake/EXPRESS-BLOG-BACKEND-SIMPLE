/*This is the jwt module
Two functions pared with the sign and verify of JWT.
When you use the function make sure the token was passed in.
The token flowed this structure:
{
    id:uuid
    username:username
}
Model of token can be found at models folder.
The JWT_SECRTE, however, comes from env file. You should set them up by yourself and NEVER share with others.
*/

import jwt, {decode} from 'jsonwebtoken';
//The time can be modified for your convenience.
const expire = "24h";
export  function signToken(token) {
    jwt.sign(token, process.env.JWT_SECRTE, { expiresIn: expire }, (err, decode) => {
    if (err) throw err;
    });
}

export  function verifyToken(token) {
    jwt.verify(token, process.env.JWT_SECRTE, (err, decoded) => {
    if (err) throw err;
  });
}

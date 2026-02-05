import {selectIdByUsername,selectHashPassword} from "../service/userQuery.js";
import {comparePassAndHash} from "../service/hashService.js";
import jwt from "jsonwebtoken";
import {signToken,verifyToken} from "../service/jwtAuth.js";
import dotenv from "dotenv";
dotenv.config();
export  function jwtAuthentication(req,res,next) {
    // const {username,password} = req.body;
    const header = req.headers.authorization;
    if(!header){
        return res.status(401).json({"error":"No token provided."});
    }
    const raw=header.split(' ')[1]

    jwt.verify(raw,process.env.JWT_SECRTE,(err,decoded) => {
        if(err){
            next(err)
        }
        req.user=decoded;
        next()
    });
    // verifyToken(raw)
    // console.log("JWT authentication called")
    // next()
}
export  function jwtSignup(req,res,next){
    let {id,username}=req.body;
    let token=new TokenModel(id,username);
    // signToken(token);
    // next()
    jwt.sign(token,process.env.JWT_SECRTE,(err,decoded) => {
        if(err){
            next(err)
        }
        req.user=decoded;
        next()
    });
}
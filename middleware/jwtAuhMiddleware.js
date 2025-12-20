import * as qDB from"../service/queryDB.js"
import {comparePassAndHash} from "../service/hashService.js";
import * as jwt from"../service/jwtAuth.js"
export function jwtAuthentication(req,res,next) {
    const {username,password} = req.body;
    let userId;
    const header = req.headers.authorization;
    if(!header){
        return res.status(401).json({"error":"No token provided."});
    }
    const isUserExists=qDB.checkUsername(username);
    if(!isUserExists){
        return res.status(404).json({"error":"User not found"});
    }
    try{
        const hashPassword=qDB.getHashPasswordByName(username);
        const passwordChecked=  comparePassAndHash(password,hashPassword);
    }catch (error){
        next(error)
    }

    try{
        userId=qDB.getIdByName(username)
    }catch (error){
        next(error)
    }
    const userToken={
        userid:userId,
        username: username,
    }
    jwt.signToken(userToken, (err,token)=>{
        if(err) next(err)

        console.log("token signed",token)
    })
    jwt.verifyToken(userToken,(err,token)=>{
        if (err) next(err)
        console.log("token verified",token)
    })
}
// import * as dbQuery from "../service/queryDB.js";
import {getUserById,insertNewUserToDB,updatePassword,updateUserName} from "../service/userQuery.js";
import {contentToHash} from "../service/hashService.js";
import {signToken,verifyToken} from "../service/jwtAuth.js";

export function getUsernameById(req, res, next) {
   let userId= req.param.id
   try{
      const userResult=getUserById(userId)
      res.json(userResult)
   }catch (err){
      next(err)
   }
}
//Create new user
export function createNewUser(req,res,next){
   let newUser=req.body;
   const hashPassword=contentToHash(newUser.password)
   let user=new User(newUser.id,
       newUser.username,
       hashPassword,
       newUser.role)
   try{
      insertNewUserToDB(user.userinfo)
      res.json({"message":"User created successfully.",
      "user":newUser});
   }catch (err){
      next(err)
   }
}
//To change the username.
export function changeUsername(req,res,next){
   let [id,newName]=req.body;
   try{
     let result= updateUserName(id,newName)
      res.json(result)
   }catch (err){
      next(err)
   }
}
//To change password
export function changePassword(req,res,next){
   let [id,newPassword]=req.body;
   try{
      let result=updatePassword(id,newPassword)
      res.json(result)
   }catch (err){
      next(err)
   }
}
// import * as dbQuery from "../service/queryDB.js";
import {
   insertNewUserToDB,
   updatePassword,
   updateUserName,
   updateRole,
   selectUsernameById, selectHashPassword
} from "../service/userQuery.js";
import {contentToHash,comparePassAndHash} from "../service/hashService.js";
import {getUUID} from "../service/uuidService.js";
import {signToken,verifyToken} from "../service/jwtAuth.js";

//Register
export async function userRegister(req, res,next) {
   const {username, password} = req.body;

   let newId=getUUID().toString();
   if(!newId){
      throw new Error("Failed to generate id");
   }
   let hashedPassword= await  contentToHash(password);
   let newUser={
      id:newId,
      username:username,
      password:hashedPassword,
      role:"user"
   }
   try{
      insertNewUserToDB(newUser);
      res.status(200).send({message:"User registered successfully"});
   }catch (err){
      next(err);
   }
}

//Log in
//JWT will be created and verified in this section.
//TODO:Finish this function.
export function userLogin(req, res,next){
   let {username, password} = req.body;
   let isExists;
   let passwordIsMatch;
   let hashedPassword;
   let token={}

   if(isExists!==true){
      res.status(400).send({"error":"No username exist"});
   }
   try{
      hashedPassword= selectHashPassword(username);
      if(!hashedPassword){
         new Error("Passwords don't match");
      }
      passwordIsMatch=comparePassAndHash(password,hashedPassword);
   }catch(err){
      next(err);
   }
   if(passwordIsMatch===true){
      token={
         username:username,
         password:hashedPassword
      }
   }

   signToken(token);
   verifyToken(token)

}

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
      updateUserName(id,newName)
      res.json({message:"Username changed successfully.",code:200})
   }catch (err){
      next(err)
   }
}
//To change password
export function changePassword(req,res,next){
   let [id,newPassword]=req.body;
   try{
      updatePassword(id,newPassword)
      res.json({message:"Password changed successfully.",code:200})
   }catch (err){
      next(err)
   }
}

//To change the role
//Pass the username and new role of dedicate user.
export function changeRole(req,res,next){
   let [username,role]=req.body;
   try{
      updateRole(username,role)
      res.json({"message":"User role changed successfully.",})
   }catch (err){
      next(err)
   }
}

//TEST function area
export function getUsernameByIdTest(req,res,next){
   let id=req.query.id
   if(!id){
      res.json({"message":"Input id to get the username"})
   }

   try{
      const result=selectUsernameById(id)
      if(result){
         res.json(result)
      }
   }catch (err){
      next(err);
   }
}
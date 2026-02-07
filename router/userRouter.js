import express from 'express';
import {
    changePassword,
    changeUsername,
    userRegister
} from "../controller/userController.js";
import {jwtAuthentication} from "../middleware/jwtAuhMiddleware.js";

const router = express.Router();

// router.use(jwtAuthentication)
//Create new user
router.post("/create-new-user",userRegister,(err,next)=>{
    if(err){
        err.code=500;
        next(err);
    }
})

//Update password
router.put("/update-password",changePassword,(err,next)=>{
    if(err){
    err.code=500;
    next(err);
}})
//Update username
router.put("/update_username",changeUsername,(err,next)=>{
    if(err){
    err.code=500;
    next(err);
}})


export default router;
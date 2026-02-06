import {selectPostById} from "../service/postQuery.js";
export  default function (req,res,next){
    let {postId,authorId}=req.query
    let user=req.user;

    if(postId){
        let result;
        try{
            const raw=selectPostById(postId)
            result=raw.authorID
        }catch (err){
            next(err);
        }
        if(result && result===user.id){
            next()
        }else{
            res.status(401).send({error:"Unauthorized"});
        }
    }


}
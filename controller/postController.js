// import { postAuthorById } from "../service/queryDB.js";
import ErrorModel from "../model/ErrorModel.js";
// import {addNewPost} from "../service/postQuery.js";
import {readPostByAuthorId,updatePost,newPostToDB,deleteByAuthorId,deleteByPostId} from "../service/postQuery.js";

//Get the post
export function getPostByAuthorId(req, res, next) {
  const authorId = req.params.id;
  // console.log(authorId);
  try {
    //Convert id to number otherwise it will return nothing.
    const postResult = readPostByAuthorId(Number(authorId));
    // console.log(postAuthorById(Number(authorId)));
    res.json(postResult);
  } catch (error) {
    next(error);
  }
}


//Post new post
export function postNewPost(req, res, next) {
  const post =req.body;
  console.log(post);
  if (!post) {
    return res.status(400).send({error: "Post not found"});
  }
  try{
    newPostToDB(post);
    res.json({message: "Post added"});
  }catch(err){
    next(err);
  }
}

export function updatePost(req, res, next) {
  const body = req.body;
  const id=req.body.id
  if (!body) {
    return res.status(400).send({error: "Post not found"});
  }
  try{
    updatePost(id,body)
    res.json({message: "Post updated"});
  }catch(err){
    next(err);
  }
}
//Delete by post id
export function deletePostByPostId(req, res, next) {
  const id =req.params.id;
  try{
    deleteByPostId(id)
    res.json({message: "Post deleted"});
  }catch(err){
    next(err);
  }
}
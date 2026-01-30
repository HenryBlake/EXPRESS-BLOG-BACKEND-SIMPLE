import {
  selectPostByAuthorId,
  updatePost,
  newPostToDB,
  deleteByAuthorId,
  deleteByPostId,
  selectPostById, orderPostBy, orderPostByAndSelectById, orderPostByAndSelectByAuthorId
} from "../service/postQuery.js";
import {getUUID} from "../service/uuidService.js";
import {raw} from "express";

//Get the post
export function getPosts(req, res, next) {
  let {id,authorId,sort}=req.query;

  if(id && authorId){
      res.json({message:"You can only pick one parameter from id and authorId",
      type:'error',
      })
  }
  //Each one represents one function.
  if(id){

    if(sort){
      try{
        let result =orderPostByAndSelectById(sort,id)
        res.json(result)
      }catch(err){
        next(err);
      }
    }

    try{
      let result=selectPostById(id.toString())
      res.json(result)
    }catch(err){
      next(err);
    }
  }
  if(authorId){

    if(sort){
      try{
        let result=orderPostByAndSelectByAuthorId(sort,authorId)
        res.json(result)
      }catch(err){
        next(err);
      }
    }

    try{
      let result=selectPostByAuthorId(authorId)
      res.json(result)
    }catch(err){
      next(err);
    }
  }

}


//Post new post
export function postNewPost(req, res, next) {
  let rawPost =req.body;
  let post={
    id:getUUID(),
    title:rawPost.title,
    content:rawPost.content,
    views:0,
    likes:0,
    authorID: rawPost.authorID,
    createDate:''
  }

  // post.createDate= Date.now().toString();
  // console.log({"controller":post});
  if (!post) {
    return res.status(400).send({error: "Post not found"});
  }
  try{
    newPostToDB(rawPost.authorID,post);
    res.json({message: "Post added"});
  }catch(err){
    next(err);
  }
}

export function updatePostContent(req, res, next) {
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
import {
  selectPostByAuthorId,
  updatePost,
  newPostToDB,
  deleteByAuthorId,
  deleteByPostId,
  selectPostById, orderPostByAndSelectById, orderPostByAndSelectByAuthorId
} from "../service/postQuery.js";
import {getUUID} from "../service/uuidService.js";
import {raw} from "express";
import jwt from "jsonwebtoken";

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

//TODO:Make sure the rest functions can use query and pass the authentication.
//Post new post
export function postNewPost(req, res, next) {
  let rawPost =req.body;
  // let header=req.headers.authorization
  // let raw=header.split(' ')[1]
  //
  // let localId=jwt.decode(raw).id;
  let localId=req.user.id;
  let post={
    id:getUUID(),
    title:rawPost.title,
    content:rawPost.content,
    views:0,
    likes:0,
    authorID: localId,
    createDate:''
  }

  // post.createDate= Date.now().toString();
  // console.log({"controller":post});
  if (!post) {
    return res.status(400).send({error: "Post not found"});
  }
  try{
    newPostToDB(localId,post);
    res.json({message: "Post added"});
  }catch(err){
    next(err);
  }
}

export function updatePostContent(req, res, next) {
  const body = req.body;
  const id=req.body.id
  const authorId=req.user.id;
  let authorIdServer;
  if (!body) {
    return res.status(400).send({error: "No post provided"});
  }
  //Verify it is your post not somebody else's.
  try{
    const raw=selectPostById(id.toString())
    authorIdServer=raw.authorID.toString()
  }catch(err){
    next(err);
  }
  if(authorIdServer!==authorId){
    return res.status(400).json({error: "Unmatched authorId"});
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
  let postId=req.query.id
  let userId = req.user.id;
  if(!postId){
    res.json(({
      title:"How to delete this post?",
      content:"Use query parameters to input the post you want to delete",
      type:"guide"
    }))
  }


  try{
    deleteByPostId(postId)
    res.json({message: "Post deleted"});
  }catch(err){
    next(err);
  }
}
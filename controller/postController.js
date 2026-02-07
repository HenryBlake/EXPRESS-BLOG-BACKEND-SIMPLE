import {
  selectPostByAuthorId,
  updatePost,
  newPostToDB,
  deleteByPostId,
  selectPostById, orderPostByAndSelectByAuthorId, orderPostsBy, selectAuthorIdFromPost
} from "../service/postQuery.js";
import {getUUID} from "../service/uuidService.js";

//Get the post
export function getPosts(req, res, next) {
  let {postId,authorId,sort}=req.query;

  if(postId && authorId){
      res.json({message:"You can only pick one parameter from id and authorId",
      type:'error',
      })
  }
  //Each one represents one function.
  if(postId){

    if(sort){
      res.json({message:"You can use sort when you do query with post id",})
    }

    try{
      let result=selectPostById(postId.toString())
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
      let result=selectPostByAuthorId(authorId.toString())
      res.json(result)
    }catch(err){
      next(err);
    }
  }

  if(sort && !authorId || !postId){
    try{
      let result=orderPostsBy(sort)
      res.json(result)
    }catch (err){
      next(err);
    }
  }

}

//Post new post
export function postNewPost(req, res, next) {
  let rawPost =req.body;
  //Get current user and their ID.
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
  let postId=req.query.postId

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
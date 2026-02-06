export function queryTest(req, res,next) {
  let postId=req.query
  if(postId){
      res.status(200).send(postId)
  }


}
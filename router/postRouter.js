// import { Router } from "express";
import express from "express";
import { postNewPost, deletePostByPostId, getPosts} from "../controller/postController.js";

const router = express.Router();
router.get("/", (req, res) => {
  res.status(200).json({ message: "Here is post endpoint." });
});
router.get("/posts", getPosts, (err, next) => {
  if (err) {
    err.status = 404;
    next(err);
  }
});
//Post router
router.post("/post-new-post",postNewPost, (err,next) => {
  if (err) {
    err.status = 404;
    next(err);
  }
})
//Delete post by post id
router.delete("/delete-post",deletePostByPostId, (err,next) => {
  if (err) {
    err.status = 404;
    next(err);
  }
})
export default router;

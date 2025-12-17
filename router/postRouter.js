// import { Router } from "express";
import express from "express";
import { getPostByAuthorId } from "../controller/postController.js";
const router = express.Router();
router.get("/", (req, res) => {
  res.status(200).json({ message: "Here is post endpoint." });
});
router.get("/:id", getPostByAuthorId, (err, next) => {
  if (err) {
    err.status = 404;
    next(err);
  }
});

export default router;

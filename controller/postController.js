import { postAuthorById } from "../service/queryDB.js";
import ErrorModel from "../model/ErrorModel.js";
export function getPostByAuthorId(req, res, next) {
  const authorId = req.params.id;
  // console.log(authorId);
  try {
    //Convert id to number otherwise it will return nothing.
    const postResult = postAuthorById(Number(authorId));
    // console.log(postAuthorById(Number(authorId)));
    res.json(postResult);
  } catch (error) {
    next(error);
  }
}

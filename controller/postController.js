import { postAuthorById } from "../service/queryDB.js";
import ErrorModel from "../model/ErrorModel.js";
export function getPostByAuthorId(req, res, next) {
  const authorId = req.params.id;
  // console.log(authorId);
  try {
    //Convert id to number otherwise it will reuturn nothing.
    return res.json(postAuthorById(Number(authorId)));
  } catch (err) {
    next(err);
  }
}

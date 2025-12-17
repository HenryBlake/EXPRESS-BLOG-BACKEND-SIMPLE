// const fdb = import("../model/fakeDB.json", {
//   with: {
//     type: "json",
//   },
// });
import fdb from "../model/fakeDB.json" with { type: "json" };
import { contentToHash as hashPassword } from "../service/hashService.js";

//Internal functions

//Get the password by username. WARNNING:Use as internale function.
function getPasswordByName(username) {
  return fdb.users.find((u) => u.username === username).password;
}

//Exported functions

//Check username
export function checkUsername(username) {
  const result = username
    ? fdb.users.find((user) => user.username === username)
    : new Error("User is not exists");

  return result;
}

//Return hash password
export async function getHashPasswordByName(username) {
  const hash = await hashPassword(getHashPasswordByName(username));
  if (!hash) return new Error("Fail to get hash password!");

  return hash;
}
//Get the user bio by their ID.
export function bioById(id) {
  const result = id
    ? fdb.bios.find((bio) => bio.userID === id)
    : new Error("User id required!");

  return result;
}

//Get Post by user author ID
export function postAuthorById(id) {
  // const post = db.posts.find((p) => p.authorID === id).content;
  // const post = fdb.posts.find((p) => p.authorID === id);
  const post = fdb.posts.find((p) => p.authorID === id);
  if (!post) return new Error("Can't find post");
  return post;
}

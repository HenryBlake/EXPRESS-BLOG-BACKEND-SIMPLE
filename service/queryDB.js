import fdb from "../model/fakeDB.json" with {type: "json"};
import {contentToHash as hashPassword} from "../service/hashService.js";

//Internal functions

//Get the password by username. WARNING:Use as internal function.
function getPasswordByName(username) {
  try {
    return fdb.users.find((u) => u.username === username).password;
  } catch (error) {
    throw error;
  }
}

//Exported functions

//Check username
export function checkUsername(username) {
  const result = fdb.users.find((user) => user.username === username);
  if (!result) throw new Error("Can't find user.");
  return result;
}
//Check user ID
export function checkUserId(userid){
  const result = fdb.users.find((u) => u.id === userid);
  if (!result) throw new Error("Can't find user.");
  return result;
}

//Return hash password
export async function getHashPasswordByName(username) {
  return await hashPassword(getHashPasswordByName(username));
}

//Get the user bio by their ID.
export function bioById(id) {
  //   const result = id
  //     ? fdb.bios.find((bio) => bio.userID === id)
  //     : new Error("User id required!");

  //   return result;
  const result = fdb.bios.find((b) => b.id === id);
  if (!result)
    throw new Error("Can't find a bio due to wrong id or non-exists.");

  return result;
}

//Get Post by user author ID
export function postAuthorById(id) {
  const post = fdb.posts.find((p) => p.authorID === id);
  if (!post) throw new Error("Can't find post");
  return post;
}

export function getIdByName(username) {
  return fdb.users.find((u) => u.username === username).id;
}

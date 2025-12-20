import {hash as _hash,compare as _compare} from "bcrypt";
const saltRound = 10;

//The function to hash everything you need to hash.
export async function contentToHash(content) {
  const hash = await _hash(content, saltRound);
  if (!hash) throw new Error("Failed to hash content");
  return hash;
}
export async function comparePassAndHash(password,hash) {
  try{
    return await _compare(password, hash);
  }catch (error){
    throw error
  }
}
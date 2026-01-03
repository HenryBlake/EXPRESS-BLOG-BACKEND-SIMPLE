import getDB  from "./sqliteDB.js"
const db = getDB();

//Get the post by author ID
export function readPostByAuthorId(authorId){
  const raw= db.prepare(`SELECT * FROM posts WHERE author_id ==${authorId}`);
  return raw.all();
}

export function readPostById(id) {
    const raw = db.prepare(`SELECT * FROM posts WHERE id = ${id}`);
    return raw.all();
}
export function updatePost(postId, postBody){
    db.exec(`UPDATE posts SET content=${postBody.content} WHERE id = ${postId}`);
}
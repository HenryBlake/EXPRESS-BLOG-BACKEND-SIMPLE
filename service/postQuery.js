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

//Update the post
export function updatePost(postId, postBody){
    db.exec(`UPDATE posts SET content=${postBody.content} WHERE id = ${postId}`);
}

//Add new post
export function newPostToDB(authorId, postBody){
    db.exec(`INSERT INTO posts (
        "id","title","content","views","likes","author_id","create_date"
    ) VALUES (
        ${postBody.id},${postBody.content},${postBody.views},${postBody.likes},${postBody.likes},${postBody.authorID},${postBody.createDate}          
    )`)
}

//Delete by author id
export function deleteByAuthorId(id){
    db.exec(`DELETE FROM posts WHERE author_id=${id}`);
}
//Delete by post id
export function deleteByPostId(post_id){
    db.exec(`DELETE FROM posts WHERE id = ${post_id}`);
}
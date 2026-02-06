import getDB  from "./sqliteDB.js"
const db = getDB();

//Get the post by author ID
export function selectPostByAuthorId(authorId){
    const raw=db.prepare('SELECT * FROM posts WHERE authorID= ?');
    return raw.all(authorId)
}

export function selectPostById(id) {
    const raw=db.prepare('SELECT * FROM posts WHERE id = ?');
    return raw.get(id);
}

export function selectAuthorIdFromPost(postId) {
    const raw=db.prepare('SELECT authorID FROM posts WHERE id= ?');
    return raw.get(postId)
}

export function orderPostByAndSelectByAuthorId(sort,authorId){
    const raw=db.prepare('SELECT * FROM posts WHERE authorID=? ORDER BY ? LIMIT 20 ASC');
    return raw.all(authorId,sort);
}
export function orderPostsBy(sort){
    const raw=db.prepare('SELECT * FROM posts ORDER BY ? LIMIT 20 DESC ');
    return raw.all(sort);
}
//Update the post
export function updatePost(postId, postBody){
    // db.exec(`UPDATE posts SET content=${postBody.content} WHERE id = ${postId}`);
    let raw=db.prepare('UPDATE posts SET content=? WHERE id = ?');
    raw.run(postBody, postId);
}

//Add new post
export function newPostToDB(authorId, postBody){
    const stmt = db.prepare(`
    INSERT INTO posts (id, title, content, views, likes, authorID, createDate)
    VALUES (?, ?, ?, ?, ?, ?, ?)
`);

    stmt.run(
        postBody.id,
        postBody.title,
        postBody.content,
        postBody.views,
        postBody.likes,
        postBody.authorID,
        postBody.createDate || new Date().toISOString()
    );

}

//Delete by author id
export function deleteByAuthorId(authorId){
    let raw =db.prepare(`DELETE FROM posts WHERE authorID= ?`);
    raw.run(authorId);

}
//Delete by post id
export function deleteByPostId(post_id){
    // db.exec(`DELETE FROM posts WHERE id = ${post_id}`);
    let raw=db.prepare(`DELETE FROM posts WHERE id = ?`);
    raw.run(post_id);
}
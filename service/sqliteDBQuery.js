//Import sqlite
import * as sqlite from "node:sqlite";
const dbPath="../src/blog_db.db"
let db=new sqlite.DatabaseSync(dbPath,(err)=>{
    if(err){
        throw err;
    }
})
// db.open();
const stmt=db.prepare("SELECT * FROM posts");
const result=stmt.all()
console.log( stmt)
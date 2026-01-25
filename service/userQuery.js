/*
In this module, every method should be named in the Sqlite statements style.
For example:
    In Sqlite: SELECT username FROM users WHERE id=?
    In the module: selectUsernameById(id){}
This is to avoid name confusion in controllers.
 */
import getDB from "./sqliteDB.js";

//Get database.
const db=getDB()

//GET methods.

//Get the username by UUID.
export function selectUsernameById(id){
    const raw=db.prepare('SELECT username FROM users WHERE id=?');
    return raw.get(id)
}
//This function will get the user's password for credential. DO NOT call for other purpose.
export function selectHashPassword(id){
    let raw=db.prepare('SELECT password FROM users WHERE id=?');
    return raw.get(id)
}
//Update User information

//Update the user's name.
export function updateUserName(userId,newUsername){
    // db.exec(`UPDATE users SET username=${newUsername} WHERE id=${userId}`)
    // return {"message":"Username updated successfully.","new username":newUsername};
    let raw=db.prepare('UPDATE users SET username=? WHERE id=?');
    raw.all(newUsername,userId)
}

//Update the password of user.
export function updatePassword(userId,newPassword){
    // db.exec(`UPDATE users SET password=${newPassword} WHERE id=${userId}`)
    // return {"message":"Password updated successfully.","new password":newPassword};
    let raw=db.prepare('UPDATE users SET password= ? WHERE id= ?')
    raw.all(newPassword,userId)
}

//Update the role of the user
export function updateRole(id,newRole){
    const raw= db.prepare("UPDATE users SET role=? WHERE id=?")
    const result=raw.all(newRole,id)
}

//Insert new user into db
export function insertNewUserToDB(newUser){
    const raw= db.prepare('INSERT INTO users VALUES (?,?,?,?)')
    raw.run(newUser.id.toString(),newUser.username,newUser.password.toString(),newUser.role.toString());
}
//TEST function area

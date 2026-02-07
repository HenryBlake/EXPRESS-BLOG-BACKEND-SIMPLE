# Simple Blog Back-end API  
A back-end project built with Express.js.Provide RESTful API style query.  
Features include:  
- CRUD for both posts and users.
- JWT authentication and authorization.
- Sqlite database access.

> Note: the update feature for posts and users are unfinished. I will update at some time.
___
## The current state of project
* it is __Almost__ finished.
* I still, will add some new features in the future.
___
## I have to say...
This is my first back-end project.I have been studied in Software Development for over 6 years(4 years of University in China and 2 years of college in Canada)  
I never wrote something like this in ALMOST complete status. It really made me feel proud of myself.  
But, unfortunately, I have a full-time job to do at this time, and it's not IT related job. I'm using most of my off time every day to construct it from 0.
I know it was never perfect and I don't know if this project could really being helpful to my professional career, yet I still made it.  
I don't know if anybody is watching, but I have to let this project go and explore something new.
If I have time , I would like rebuild it in the future some when.
Good day and night.
___
## Before you start
* Make sure you have __Node.js__ installed.
* Learn some basic concepts of *back-end* and *Express.js*.
* the `.env` file has not included so add new one manually.  
>About `.env` file:   
> It contains the secret of JWT. You should use you secret.  
> `JWT_SECRET=?` use this format and put your secret in.
> I would recommend some generators.
 
___
## How to use it?
1. Clone the whole project into your local computer or any computer you want to make it server.
2. Go to the folder has __app.js__ and open the terminal.Type in `node app.js`
3. The project should be running on port **3101**

### Posts
`/posts/`is for the posts
#### Start point
* `/posts`

#### Query posts
* `/query-post`  
it supports some URL queries, such as:  
> `localhost.com/posts/query-post?id=0`  
>  
Now keep in mind in the real situations we use UUID to present id. It means id is not just a number but a long string.  
Or,  
you can do the query base on the author's id, like this:  
>`localhost.com/posts/query-post?authorId=0`
>  
Again, the author id here is also used UUID.  

NOTE:You only use one parameter to do the query. Otherwise, it returns a message like this:
>{   
> message:"You can only pick one parameter from id and authorId",  
> type:'error',   
> }

Use `sort` to order for posts.
> `localhost.com/posts/query-post?sort=?`  

The parameters can be `views` or `likes` and the order will be ascended.  
It will return 20 records if possible by default, and you can't change how many you get at once for now.

You can find the data structure of Post in model folder.

### Users
`/users` 
* `/create-new-user` to create a new user
* `/update-username` to change the username
* `/update-password` to change the password

Same structure can be found in same place.
___
## See something, say something.
Not that serious but if you found any bug or something else. Just tell me in any way you like.

## Finally, we are here
Feel free to use this project in any conditions. If you feel it helps please give me a star.

## One little thing
If you want to offer me a job, contact the e-mail at my profile page.
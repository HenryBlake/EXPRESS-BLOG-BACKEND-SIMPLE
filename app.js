import express, { json } from "express";
import {jwtAuthentication} from "./middleware/jwtAuhMiddleware.js";
const app = express();
const port = 3101;


import { errhandlerGeneral } from "./middleware/generlErrorHandler.js";
import * as postRouter from "./router/postRouter.js";
import * as userRouter from "./router/userRouter.js";


//Make sure it could handle JSON format in right way.
app.use(json());

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});


//Using JWT middleware to make sure only authorized people can use features below.
app.use(jwtAuthentication,(err,next)=>{
  if(err){
    err.code=500
  }
  next(err)
})

//Here are the all routers.
app.use("/users",userRouter.default)
app.use("/posts", postRouter.default);



//Error handler
app.use(errhandlerGeneral);

//Start server on this port.
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

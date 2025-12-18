import express, { json } from "express";
const app = express();
const port = 3101;
// import errhandlerGeneral from "./middleware/generlErrorHandler.js";
import { errhandlerGeneral } from "./middleware/generlErrorHandler.js";
import { getTestError } from "./controller/testErrController.js";
import * as postRouter from "./router/postRouter.js";
//Make sure it could handle json format in right way.
app.use(json());

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});
// app.use("/newTE", getTestError);

//Test error happend
// app.get("/testerr", (req, res) => {
//   res.status(404);
//   throw new Error("this is a test error. Do not be panic.");
// });
app.use("/post", postRouter.default);
//Error handler
// app.use(errHandler.simpleErrOutput);
app.use(errhandlerGeneral);
//Start server on this port.
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

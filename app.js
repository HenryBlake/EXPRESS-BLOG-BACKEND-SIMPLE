const express = require("express");
const app = express();
const port = 3101;
//Make sure it could handle json format in right way.
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});
//Start server on this port.
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const os = require("os");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello " + req.ip + " from " + os.hostname());
});

app.listen(3000, () => {
  console.log("app listening");
});

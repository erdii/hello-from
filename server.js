const os = require("os");
const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send({
    message: `Hello from ${os.hostname()}`,
    hostname: os.hostname(),
    ip: req.ip,
    ts: Date.now(),
  });
});

app.listen(3000, () => {
  console.log("app listening");
});

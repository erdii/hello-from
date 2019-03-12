const os = require("os");
const express = require("express");
const morgan = require("morgan");

const app = express();

app.set("trust proxy", true);
app.set("x-powerered-by", false);

app.use(morgan("combined"));

app.get("/", (req, res) => {
  const data = {
    ts: Date.now(),
    ip: req.ip,
    hostname: os.hostname(),
    headers: req.headers,
  };

  console.log(data);
  res.send(data);
});

app.listen(3000, () => {
  console.log("app listening");
});

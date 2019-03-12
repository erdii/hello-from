const os = require("os");
const express = require("express");

const app = express();

app.set("trust proxy", true);
app.set("x-powerered-by", false);

app.get("/", (req, res) => {
  const data = JSON.stringify({
    ts: Date.now(),
    ip: req.ip,
    hostname: os.hostname(),
    headers: req.headers,
  });

  console.log(data);
  res.type("json").send(data);
});

app.listen(3000, () => {
  console.log("app listening");
});

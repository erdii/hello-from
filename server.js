const os = require("os");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("trust proxy", true);
app.set("x-powerered-by", false);

app.use(bodyParser.text({
  type: "*/*"
}));

app.use((req, res) => {
  const data = JSON.stringify({
    ts: Date.now(),
    method: req.method,
    path: req.path,
    ip: req.ip,
    hostname: os.hostname(),
    headers: req.headers,
    body: req.body,
  });

  console.log(data);
  res.type("json").send(data);
});

app.listen(3000, () => {
  console.log("app listening on port 3000");
});

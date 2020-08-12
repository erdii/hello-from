const os = require("os");
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const fs = require("fs");

const config = {
  port: parseInt(process.env.PORT || "3000"),
  tlsEnabled: !!process.env.TLS_ENABLED,
  tlsCertFile: process.env.TLS_CERT_FILE,
  tlsKeyFile: process.env.TLS_KEY_FILE,
};

const app = express();

app.set("trust proxy", true);
app.set("x-powerered-by", false);

app.use(bodyParser.json());
app.use(bodyParser.text());

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

console.log(config);

if (config.tlsEnabled) {
  https.createServer({
    key: fs.readFileSync(config.tlsKeyFile),
    cert: fs.readFileSync(config.tlsCertFile),
  }, app).listen(config.port, () => {
    console.log(`https server listening on port ${config.port}`);
  });
} else {
  app.listen(config.port, () => {
    console.log(`http server listening on port ${config.port}`);
  });
}


var express = require("express");
var app = express();
var os = require("os");
var bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

var routes = require("./routes/example1Routes");
routes(app);

var port = process.env.PORT || 7000,
  host = os.platform() === "win32" ? "127.0.0.1" : "0.0.0.0";

console.log("App listening to http://" + host + ":" + port);
app.listen(port, host);

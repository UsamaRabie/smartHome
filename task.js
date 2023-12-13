const express = require("./node_modules/express");
const morgan = require("./node_modules/morgan");
const app = express();
const path = require("path");

const hostname = "localhost";
const port = 3000;

const about = "/about.html";
const processes = "/processes.html";
const control = "/control.html"

app.use(morgan("dev"));

app.use(express.static(__dirname + "/public"));
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use("/node_modules", express.static(__dirname + "/node_modules"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get(about, (req, res) => {
  res.sendFile(path.join(__dirname, "./public" + about));
});

app.get(processes, (req, res) => {
  res.sendFile(path.join(__dirname, "./public" + processes));
});



app.post(control, (req, res) => {
  res.sendFile(path.join(__dirname, "./public" + control));
});

app.listen(port, () => {
  console.log(`Express working on: http://${hostname}:${port}`);
});
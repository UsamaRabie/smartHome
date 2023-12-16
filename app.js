const express = require("./node_modules/express");
const morgan = require("./node_modules/morgan");
const path = require("path");
const app = express();

const hostname = "localhost";
const port = 3000;

const about = "./public/about.html";
const processes = "./public/process.html";
const contact = "./public/about.html";

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const dboper = require("./operations");
const url = "mongodb://127.0.0.1:27017/";
const dbname = "lab";

var interval;

MongoClient.connect(url, (err, client) => {
  assert.equal(err, null);
  console.log("Connected successfully to server.");
  const db = client.db(dbname);
  var doc = {
    name: "AdaptiveIllumntion",
    description: "MIMOSystem",
    status: "off",
  };
  dboper.findDocuments(db, "processes", (docs) => {
    if (docs.length > 0) {
      console.log("Found Document:", docs[0]);
    } else {
      dboper.insertDocument(db, doc, "processes", (result) => {
        console.log("Insert Document:\n", result.insertedCount);
        dboper.findDocuments(db, "processes", (docs) => {
          console.log("Found Documents:\n", docs);
        });
      });
    }
  });
});

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

app.get(contact, (req, res) => {
  res.sendFile(path.join(__dirname, "./public" + contact));
});

app.post("/on", (req, res) => {
  console.log("on")
  MongoClient.connect(url, (err, client) => {
    assert.equal(err, null);
    console.log("Connected correctly to server.");
    const db = client.db(dbname);

    dboper.updateDocument(
      db,
      { name: "AdaptiveIllumntion" },
      { status: "on" },
      "processes",
      (result) => {
        dboper.findDocuments(db, "processes", (docs) => {
          console.log("Updated Document:", docs[0]);
          // Galileo
          //   interval = setInterval(() => {
          //     var s1 = IR_Sesnor_1.read();
          //     var s2 = IR_Sesnor_2.read();
          //     if (s1 && !s2) {
          //       led1.write(1);
          //       led2.write(0);
          //       console.log("Room 1");
          //     } else if (s2 && !s1) {
          //       led1.write(0);
          //       led2.write(1);
          //       console.log("Room 2");
          //     }
          //   }, 100);
        });
      }
    );
  });
});

app.post("/off", (req, res) => {
  console.log("off");
  MongoClient.connect(url, (err, client) => {
    assert.equal(err, null);
    console.log("Connected correctly to server.");
    const db = client.db(dbname);

    dboper.updateDocument(
      db,
      { name: "AdaptiveIllumntion" },
      { status: "off" },
      "processes",
      (result) => {
        dboper.findDocuments(db, "processes", (docs) => {
          console.log("Updated Document:", docs[0]);
          // Galileo
          // clearInterval(interval);
          // led1.write(0);
          // led2.write(0);
        });
      }
    );
  });
});

app.listen(port, () => {
  console.log(`Express working on: http://${hostname}:${port}`);
});

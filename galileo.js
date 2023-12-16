const express = require("./node_modules/express");
const morgan = require("./node_modules/morgan");
const path = require("path");
const{ connectToDatabase, insertState } = require('./data_base');
//const { open_SERVO, close_SERVO } = require('./public/motor');


const app = express();

const machine_ip = "";
const hostname = machine_ip || "0.0.0.0";
console.log(hostname);
const port = 3000;


app.use(morgan("dev"));


app.post('/open', (req, res) => {
    //open_SERVO();
    insertState(db, 1);
    console.log('DOOR opened from mobile\n');
    res.json({ message: 'DOOR opened' });
});

app.post('/close', (req, res) => {
    //close_SERVO();
    insertState(db, 0);
    console.log('DOOR closed from mobile\n');
    res.json({ message: 'DOOR closed' });
});





app.listen(80, "0.0.0.0", () => {
    console.log('Express working on http://${hostname}/  \n');
  });
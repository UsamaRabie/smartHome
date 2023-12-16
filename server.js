// code for server to connect to database
/*
const express = require("./node_modules/express");
const { State } = require('./data_base');
const { open_SERVO, close_SERVO } = require('./public/motor');


const app = express();
const port = 3000;
const hostname = 'localhost';


app.use(express.json());







app.post('/open', (req, res) => {
    open_SERVO();

    const state = new State({ value: 1 });
    state.save((err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('state saved');
        }
    });
    res.send('DOOR opened');
    } );

app.post('/close', (req, res) => {
    close_SERVO();

    const state = new State({ value: 0 });
    state.save((err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('state saved');
        }
    });
    res.send('DOOR closed');
    } );

 app.listen(port, () => {
            console.log(`Server running on http://${hostname}:${port}/`);
      });*/

const express = require("./node_modules/express");
const morgan = require("./node_modules/morgan");
const path = require("path");
const bodyParser = require('./node_modules/body-parser'); // Import body-parser middleware
const{ connectToDatabase, insertState } = require('./data_base');
//const { open_SERVO, close_SERVO } = require('./public/motor');
const app = express();
const port = 3000;
const hostname = 'localhost';

const about ="/about.html";
const process = "/process.html";
const control = "/control.html";
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use("/node_modules", express.static(__dirname + "/node_modules"));

connectToDatabase().then((db) => {

    app.post('/open', (req, res) => {
        //open_SERVO();
        insertState(db, 1);
        console.log('DOOR opened\n');
        res.json({ message: 'DOOR opened' });
    });

    app.post('/close', (req, res) => {
        //close_SERVO();
        insertState(db, 0);
        console.log('DOOR closed\n');
        res.json({ message: 'DOOR closed' });
    });

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '/public/index.html'));
    });

    app.get(about, (req, res) => {
        res.sendFile(path.join(__dirname,'./public', about));
    });

    app.get(process, (req, res) => {
        res.sendFile(path.join(__dirname,'./public', process));
    });

    app.get(control, (req, res) => {
        res.sendFile(path.join(__dirname,'./public', control));
    });


    app.listen(port,() => {
        console.log(`Server running on http://${hostname}:${port}/   \n`);
    });
} );
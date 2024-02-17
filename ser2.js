const http = require("http");
const fs = require("fs");
const path = require("path");
const mraa = require("mraa");


console.log("MRAA Version: " + mraa.getVersion());

const machine_ip = "192.168.1.9";
const hostname = machine_ip;
console.log(hostname);
const port = 1337;


var servo_motor_pin = new mraa.Pwm(3);
var led_pin = new mraa.Gpio(5);

led_pin.dir(mraa.DIR_OUT);
led_pin.write(0);

servo_motor_pin.period_us(20000);
servo_motor_pin.pulsewidth_us(1000);
servo_motor_pin.enable(true);



function close_SERVO()
{
  servo_motor_pin.pulsewidth_us(1000);
  led_pin.write(0);
  console.log('closed\n');
}

function open_SERVO()
{
  servo_motor_pin.pulsewidth_us(1500);
  led_pin.write(1);
  console.log('Open Door\n');
}

var server = http.createServer((req, res) => {
  if (req.method === 'POST'){
    if (req.url === '/open'){
      open_SERVO();
    } 
    else if (req.url === '/close') {
      close_SERVO();
    }
  } else if (req.method === 'GET') {
    var fileUrl;

    if (req.url == 'control.html') fileUrl = 'control.html';
    var filePath = path.resolve('control.html');
    fs.exists(filePath, (exists) => {
      if (!exists) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end("<html>Error</html>");
        return;
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream(filePath).pipe(res);
      }
    })
  }
});

server.listen("1337", hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`)
})
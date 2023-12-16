
var mraa = require("mraa");

console.log('MRAA VERSION:'+mraa.getVersion());

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
  console.log('open\n');
}

module.exports = {open_SERVO, close_SERVO};
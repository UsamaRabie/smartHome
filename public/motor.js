var mraa = require('mraa');
var readline = require('readline');
console.log('MRAA VERSION:'+mraa.getVersion());

var servo_motor_pin = new mraa.Pwm(3);
var led_pin = new mraa.Gpio(5);

led_pin.dir(mraa.DIR_OUT);
led_pin.write(0);

servo_motor_pin.period_us(20000);
servo_motor_pin.pulsewidth_us(1000);
servo_motor_pin.enable(true);



var r1=readline.createInterface(
  {
    input:process.stdin,
    output:process.stdout
  });


function set_SERVO()
{
  r1.question('enter 0:close 1:open',function(answer)
  {
    if(answer==='0')
    {
      servo_motor_pin.pulsewidth_us(1000);
      led_pin.write(0);
      console.log('closed\n');
      set_SERVO();
    }
    else if(answer==='1')
    {

      servo_motor_pin.pulsewidth_us(1500);
      led_pin.write(1);
      console.log('open\n');
      set_SERVO();
    }
    else if(answer=='exit')
    {
      console.log('exit\n');
      readline.close();
      servo_motor_pin.enable(false);
      process.exit();
    }
    else
    {
      console.log('invalid ,:enter 0:close 1:open\n');
      set_SERVO();
    }
  });
}
set_SERVO();
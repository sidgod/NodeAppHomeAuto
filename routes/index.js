
/*
 * GET home page.
 */

var pinmap = {};
var gpio = require('rpi-gpio');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.helloworld = function(req, res) {
  res.render('helloworld', { title: 'Hello, World!'})
};

exports.getcontrol = function(req, res) {
  res.render('getcontrol', {title: 'Home Control'})
};

exports.homecontrol = function(req, res) {
  var pin = req.body.pin;
  var state = req.body.state == "on";
  console.log("Pin no = " + pin + ", Turn on ? " + state);
  gpio.setup(pin, gpio.DIR_OUT, write(pin, state));
  pinmap[pin] = state == true ? 'on' : 'off';
  res.location('/display');
  res.redirect('/display');
};

exports.display = function(req, res) {
    for (var m in pinmap){
        console.log(m + " = " + pinmap[m]);
    }
    res.render('display', {title: 'Home Control Status', pinstate: pinmap})
};

function write(pin, state) {
    gpio.write(pin, state, function(err) {
        if (err) throw err;
        console.log('Written ' + state + ' to pin no ' + pin);
    });
}
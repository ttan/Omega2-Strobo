var relayExp = require("/usr/bin/node-relay-exp");

relayExp.init(7);

function sleep(time, callback) {
    var stop = new Date().getTime();
    while (new Date().getTime() < stop + time) {

    }
    callback();
}

var bpm = process.argv[2]
var l = (60 / bpm) - 0.05

while (true) {
    relayExp.setChannel(7, 0, 1)
    sleep(50, function() {
        // executes after one second, and blocks the thread
        relayExp.setChannel(7, 0, 0)
        sleep(l * 1000, function() {
            //do nothing
        })
    });
}
var childProcess = require('child_process');
var request = require('request');
const express = require('express')
const app = express()
var flag = true
global.pid = ""
var relayExp = require("/usr/bin/node-relay-exp");

relayExp.init(7);

function turnOff() {
    relayExp.setChannel(7, 0, 0)
    return
}


function runScript(scriptPath, bpm, callback) {

    // keep track of whether callback has been invoked to prevent multiple invocations
    var invoked = false;

    var process = childProcess.fork(scriptPath, bpm);

    // listen for errors as they may prevent the exit event from firing
    process.on('error', function(err) {
        if (invoked) return;
        invoked = true;
        callback(err);
    });

    // execute the callback once the process has finished running
    process.on('exit', function(code) {
        if (invoked) return;
        invoked = true;
        var err = code === 0 ? null : new Error('exit code ' + code);
        callback(err);
    });

}

//Provide stati content from public dir
app.use(express.static('public'))

app.get('/', function(req, res) {
    res.render('/index.html');
})

app.get('/bpm/:artist/:song', function(req, res) {
    var artista = req.params.artist
    var canzone = req.params.song
    var api_key = 'API_KEY' // REPLACE THIS
    var url = "https://api.getsongbpm.com/search/?api_key="+api_key+"&type=both&lookup=song:" + canzone + " artist:" + artista

    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var resp = JSON.parse(body)
            if (!resp.search.error) {
                var bpm = resp.search[0].tempo // Print the google web page.
                res.send(bpm);
            } else {
                res.send('not found');
            }

        }
    })
})


app.get('/stop/', function(req, res) {
    console.log(global.pid)
    process.kill(pid)
    turnOff()
    res.send('Stopped!')
})

app.get('/blink/:bpm', function(req, res) {
    res.send("start blinking")
    var bpm = req.params.bpm
    var args = [bpm]

    // keep track of whether callback has been invoked to prevent multiple invocations
    var invoked = false;

    var process = childProcess.fork('./child.js', args);
    console.log(process.pid)
    global.pid = process.pid
        // listen for errors as they may prevent the exit event from firing
    process.on('error', function(err) {
        if (invoked) return;
        invoked = true;
        callback(err);
    });

    // execute the callback once the process has finished running
    process.on('exit', function(code) {
        if (invoked) return;
        invoked = true;
        var err = code === 0 ? null : new Error('exit code ' + code);
    });

})

app.listen(8080, function() {
    console.log('Example app listening on port 8080!')
})
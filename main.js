
const fs = require('fs');

var start = Date.now();
process.on("exit", function () {
    var diff = Date.now() - start;
    console.log("Time taken: %ds", diff / 1000);
    fs.writeFileSync('./exetime', diff, 'utf-8', function (err) {});
});


var workprocesser = require('./master.js');
workprocesser.run();
#!/usr/bin/env node
"use strict";
var path = require("path");
var fs = require('fs');

require("../lib/traceur-runner.js");

var originalFilename = process.argv[2];
var filename = originalFilename;

var originalScriptPath = path.resolve(process.cwd(), filename);
var scriptPath = originalScriptPath;

var contents = fs.readFileSync(originalScriptPath).toString('utf8');

if(contents.slice(0, 2) == "#!") {
    contents = contents.split('\n');
    contents.splice(0, 1);
    contents = contents.join('\n');
    
    filename = filename + ".traceur.runner.temp.js";
    scriptPath = path.resolve(process.cwd(), filename);

    fs.writeFileSync(scriptPath, contents);

    require('child_process').spawn('node', ['-e', "setTimeout(function(){require('fs').unlink('" + scriptPath + "')}, 1000);"], {
        detached: true
    });

    process.argv = process.argv.slice(1);
    require(scriptPath);
} else {
    // Make the args look like ["<...>traceur-runner", "<...>the file", ... args passed]
    // This simulates how when you do `node file.js arg1 arg2` you get ["<...>node", "file.js", "arg1", "arg2"]
    // i.e. it makes traceur-runner a better substitute for node.
    process.argv = process.argv.slice(1);

    require(filename);
}

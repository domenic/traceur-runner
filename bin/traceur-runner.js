#!/usr/bin/env node
"use strict";
var path = require("path");

require("../lib/traceur-runner.js");

var filename = path.resolve(process.cwd(), process.argv[2]);

// Make the args look like ["<...>traceur-runner", "<...>the file", ... args passed]
// This simulates how when you do `node file.js arg1 arg2` you get ["<...>node", "file.js", "arg1", "arg2"]
// i.e. it makes traceur-runner a better substitute for node.
process.argv = process.argv.slice(1);

require(filename);

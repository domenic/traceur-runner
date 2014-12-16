#!/usr/bin/env node
"use strict";
var path = require("path");
var glob = require("glob");

require("../lib/traceur-runner.js");

process.argv.slice(2).forEach(function (filename) {
    glob.sync(path.resolve(process.cwd(), filename)).forEach(require);
});

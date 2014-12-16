"use strict";
var path = require("path");

require("../lib/traceur-runner.js");
require(path.resolve(process.cwd(), process.argv[2]));

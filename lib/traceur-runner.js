"use strict";
var traceur = require("traceur");
var path = require("path");
var fs = require("fs");

require("traceur-source-maps").install(traceur);

traceur.require.makeDefault(function (filename) {
    var segments = filename.split(/(?:\/|\\)/);
    var nodeModulesIndex = segments.lastIndexOf("node_modules");
    if (nodeModulesIndex === -1) {
        return true;
    }

    var packagePath = segments.slice(0, nodeModulesIndex + 2).join(path.sep) + path.sep + "package.json";
    var packageContents = fs.readFileSync(packagePath, { encoding: "utf-8" });
    var packageJSON = JSON.parse(packageContents);

    return !!packageJSON["traceur-runner"];
});

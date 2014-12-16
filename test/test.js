"use strict";
var path = require("path");
var childProcess = require("child-process-promise");
var assert = require("assert");

specify("With no dependencies", function () {
    return execAndTest("no-deps");
});

specify("With local dependencies", function () {
    return execAndTest("local-deps");
});

specify("With package dependencies", function () {
    return execAndTest("package-deps");
});

var binFile = path.resolve(__dirname, "..", require("../package.json").bin);
function execAndTest(testCaseName) {
    var testFile = path.resolve(__dirname, "cases", testCaseName + ".js");
    return childProcess.exec(process.execPath + " " + binFile + " " + testFile).then(function (res) {
        assert.strictEqual(String(res.stdout), "ok\n", "test " + testCaseName + " should output the string \"ok\\n\"");
        assert.strictEqual(String(res.stderr), "", "test " + testCaseName + " should not output to stderr");
    });
}

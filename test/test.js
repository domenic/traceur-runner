"use strict";
var path = require("path");
var childProcess = require("child-process-promise");
var assert = require("assert");

specify("With no dependencies", function () {
    return execAndTestOK("no-deps");
});

specify("With local dependencies", function () {
    return execAndTestOK("local-deps");
});

specify("With package dependencies", function () {
    return execAndTestOK("package-deps");
});

specify("With a global specifier", function () {
    return execAndTestOK("*-deps", 3);
});

specify("When throwing an error, should use source maps", function () {
    return execAndTest("throws-an-error", function (stdout) {
        assert(stdout.indexOf("throws-an-error.js:6:25") !== -1,
            "Must contain the correct error line/column in the stack trace. Got:\n\n" + stdout);
    });
});

var binFile = path.resolve(__dirname, "..", require("../package.json").bin);
function execAndTest(testCaseName, outputTest) {
    // Use relative paths to the CWD, to test that paths relative to the CWD work.
    var testFile = path.relative(process.cwd(), path.resolve(__dirname, "cases", testCaseName + ".js"));
    return childProcess.execFile(process.execPath, [binFile, testFile]).then(function (res) {
        outputTest(String(res.stdout));
        assert.strictEqual(String(res.stderr), "", "test " + testCaseName + " should not output to stderr");
    });
}

function execAndTestOK(testCaseName, numberOfTimes) {
    if (numberOfTimes === undefined) {
        numberOfTimes = 1;
    }
    var desiredText = (new Array(numberOfTimes + 1)).join("ok\n");

    return execAndTest(testCaseName, function (stdout) {
        assert.strictEqual(stdout, desiredText, "test " + testCaseName + " should output the string \"" + desiredText
            + "\"");
    });
}

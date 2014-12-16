# Run JavaScript.next code in Node, seamlessly

**Traceur Runner** allows you to run code authored for [Traceur](https://www.npmjs.com/package/traceur) seamlessly in Node.js. It does so by compiling the code on the fly using [Traceur's mechanism for overriding `require`](https://github.com/google/traceur-compiler/wiki/Using-Traceur-with-Node.js), but with some additional smarts.

In particular, Traceur Runner will avoid compiling any dependent packages (i.e. those found in `node_modules`), *unless* those packages are marked with `"traceur-runner": true` in their `package.json`. This way, you can seamlessly consume most packages without Traceur trying to transpile them, while still getting Traceur compilation for those of your dependencies that are targeted at Traceur themselves.

Additionally, whenever you use Traceur Runner, you will automatically get all error stacks rewritten to have the correct line and column numbers, via the excellent [traceur-source-maps](https://www.npmjs.com/package/traceur-source-maps) package!

## Usage

You can use `traceur-runner` as a binary, pointing it at some code that needs transpiling:

```
$ traceur-runner my-script.js
```

You can also use globs:

```
$ traceur-runner test/*.js
```

Or you can use it programmatically: if you do

```js
require("traceur-runner");
```

in your source file, any further `require`s will be transpiled as appropriate.

## Traceur Dependency

Traceur Runner [peer-depends](https://blog.domenic.me/peer-dependencies/) on Traceur, allowing you to use it with whatever version of Traceur you are already using in your project. This means you should add `traceur` as a dependency in your `package.json`, if you haven't already.

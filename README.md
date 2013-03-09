
# turn

minimal modules for a hypothetical es6 with lua's return, inspired by [substack/mmmify](https://github.com/substack/mmmify) and motivated by [@shtylman](https://github.com/shtylman).

[![build status](https://secure.travis-ci.org/juliangruber/turn.png)](http://travis-ci.org/juliangruber/turn)

## syntax

Use `import PATH` to load a module from the string `PATH`. `import` is a keyword
like `typeof` that just returns an ordinary value.

Use `return VALUE` in the top level scope to export functionality and jump
out of the current context.

## example

``` js
// main.js

var foo = import './foo.js'
console.log(foo(5));
```

``` js
// foo.js

var bar = import './bar.js'
return function (n) { return bar(n) * 10 };
```

``` js
// bar.js

return function (n) { return n + 3 };
```

build it with browserify:

```
$ browserify -t turn main.js > bundle.js
```

then run it with node (or a browser):

```
$ node bundle.js
80
```

POW.

## methods

``` js
var turn = require('turn')
```

This module is a
[browserify transform](github.com/substack/node-browserify#btransformtr)
but you don't need to use browserify necessarily to use it.

### turn()

Return a through-stream desugaring the `import` keyword and top level `return`
into `require()` and `module.exports=...` that can be parsed by node and browserify.

## install

With [npm](https://npmjs.org) do:

```
npm install turn
```

# license

MIT


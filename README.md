# glif-interfaces #

a growing list of TypeScript interfaces for Glifs intended to be used in AI agents

## Overview ##

(t.b.w)

## Installation ##

`glif-interfaces` may be used as an ECMAScript module (ESM), a CommonJS or AMD module or from a global variable.

You may either install the package into your build environment using [NPM](https://docs.npmjs.com/) with the command

```
npm install glif-interfaces
```

or load the plain script file directly

```html
<script type="module" src="https://rozek.github.io/glif-interfaces/dist/glif-interfaces.esm.js"></script>
```

## Access ##

How to access the package depends on the type of module you prefer

* ESM (or Svelte): `import { GlifRunner } from 'glif-interfaces'`
* CommonJS: `const GlifInterfaces = require('glif-interfaces')`
* AMD: `require(['glif-interfaces'], (GlifInterfaces) => {...})`

Alternatively, you may access the global variable `GlifRunner` directly.

## Usage within Svelte ###

For Svelte, it is recommended to import the package in a module context. From then on, its exports may be used as usual:

```html
<script context="module">
  import { GlifRunner,LanguageOfText } from 'GlifInterfaces'
</script>

<script>
  GlifRunner.APIToken = '...'
  ;(async () => {
    console.log(await LanguageOfText('Hello, World!))
  })()
</script>
```

You may experiment with that code [in the Svelte REPL]()

## API Reference ##

(t.b.w)

## Build Instructions ##

You may easily build this package yourself.

Just install [NPM](https://docs.npmjs.com/) according to the instructions for your platform and follow these steps:

1. either clone this repository using [git](https://git-scm.com/) or [download a ZIP archive](https://github.com/rozek/glif-interfaces/archive/refs/heads/main.zip) with its contents to your disk and unpack it there 
2. open a shell and navigate to the root directory of this repository
3. run `npm install` in order to install the complete build environment
4. execute `npm run build` to create a new build

You may also look into the author's [build-configuration-study](https://github.com/rozek/build-configuration-study) for a general description of his build environment.

## License ##

[MIT License](LICENSE.md)

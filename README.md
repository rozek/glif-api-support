# glif-interfaces #

a growing list of TypeScript interfaces for Glifs intended to be used in AI agents

> Nota bene: these "interfaces" often contain additional functionality that goes beyond what the underlying Glif does. Typical example: many "interfaces" detect the language of the original request - and if that is not english, they first translate the request into english, then run the underlying Glif and finally translate the answer back into the original language (if that translation makes sense).

## Overview ##

(t.b.w)

### Limitations ###

In order to remain cheap enough for my students, the LLMs used here are relatively small and may not produce output of the same quality as larger models from Open AI and other global players. In addition, context lengths and token generation limits of Glif models seem to be smaller than those of "professional" LLMs.

Nevertheless, these components show what is possible and how it may be achieved - perfect for personal experiments and application prototypes. And if you need to enhance the blocks provided by the original `glif-interfaces`: you are free to fork your own variant and prepare your own Glifs with your own LLMs or LLMs of other provider with your own account at any time, otherwise keeping your application the same.

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

* ESM (or Svelte): `import { GlifRunner,LanguageOfText } from 'glif-interfaces'`
* CommonJS: `const GlifInterfaces = require('glif-interfaces')`
* AMD: `require(['glif-interfaces'], (GlifInterfaces) => {...})`

Alternatively, you may access the global variable `GlifRunner` directly.

## Usage within Svelte ###

For Svelte, it is recommended to import the package in a module context. From then on, its exports may be used as usual:

```html
<script context="module">
  import { GlifRunner,LanguageOfText,TranslationOfTextInto } from 'glif-interfaces'
</script>

<script>
  GlifRunner.APIToken = '...'
  ;(async () => {
    console.log(await LanguageOfText('Hello, World!'))
    console.log(await TranslationOfTextInto('Hello, World!','german'))
  })()
</script>
```

You may experiment with that code [in the Svelte REPL](https://svelte.dev/playground/350baed45fb249b58dedba2fd184d9e9?version=5.20.2)

## Examples ##

`glif-interfaces` contains numerous building blocks for AI agents, here are some examples (please note, that these examples may seem primitive - otherwise they would become too long - but do not underestimate what you may do with these blocks in a real application with real-world inputs)

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

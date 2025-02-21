# glif-interfaces #

a growing list of TypeScript interfaces for Glifs intended to be used in AI agents

> Nota bene: these "interfaces" often contain additional functionality that goes beyond what the underlying Glif does. Typical example: many "interfaces" detect the language of the original request - and if that is not english, they first translate the request into english, then run the underlying Glif and finally translate the answer back into the original language (if that translation makes sense).

> if you like, directly jump to some [Usage Examples](#examples)

## Overview ##

(t.b.w)

### Limitations ###

In order to remain cheap enough for my students, the LLMs used here are relatively small and may not produce output of the same quality as larger models from Open AI and other global players. In addition, context lengths and token generation limits of Glif models seem to be smaller than those of "professional" LLMs.

Nevertheless, these components show what is possible and how it may be achieved - perfect for personal experiments and application prototypes. And if you need to enhance the blocks provided by the original `glif-interfaces`: you are free to fork your own variant and prepare your own Glifs with your own LLMs or LLMs of other providers using your own account at any time, otherwise keeping the original application the same.

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

`glif-interfaces` contains numerous building blocks for AI agents, here are some examples (please note, that these examples may seem primitive - otherwise they would become too long - but do not underestimate what you may be able to do with these blocks in a real application with real-world inputs)

### Language Detection and Translation ###

Here is how to detect the language of a given text and how to translate it into a different language (try yourself using the [Svelte REPL](https://svelte.dev/playground/350baed45fb249b58dedba2fd184d9e9?version=5.20.2))

```javascript
  import {
    GlifRunner,
    LanguageOfText,TranslationOfTextInto
  } from "glif-interfaces"

;(async () => {
  GlifRunner.APIToken = '...'

  console.log(await LanguageOfText('Hello, World!'))
  console.log(await TranslationOfTextInto('Hello, World!','german'))
})()
```

The following languages are supported (these are the languages, the most common LLMs have been trained with. Your mileage may vary depending on LLM and language - "german" seems to work pretty well):

* arabic
* bengali
* bulgarian
* chinese
* danish
* german
* english
* estonian
* finnish
* french
* greek
* hebrew
* hindi
* italian
* korean
* croatian
* dutch
* portuguese
* spanish
* czech
* hungarian

If you want to experiment with that feature: here is the [underlying Glif](https://glif.app/@rozek/glifs/cm7dj2je40003yilbq4y0hl4h)

### Specification Review and Update ###

This example shows how to evaluate a given specification and how to update it by applying a list of changes. Please note, that while the original input is in german, the Glif "interface" (not the underlying Glif!) first translates it into english, then runs the Glif and finally translates the output back into german - because LLMs can handle english much better than any other language (try yourself using the [Svelte REPL](https://svelte.dev/playground/8f03810f210c4bd394625abf455340f6?version=5.20.2)).

> if you don't understand the german input: the first example (and its [Glif](https://glif.app/@rozek/glifs/cm7dj2je40003yilbq4y0hl4h)) give you a possibility to translate it into your favourite language

```javascript
  import {
    GlifRunner,
    ReviewOfSpecification, SpecificationUpdatedUsing,
  } from "glif-interfaces"

;(async () => {
  GlifRunner.APIToken = '...'

  console.log(await ReviewOfSpecification(
    'verlangt wird ein Pseudo-Number Generator in TypeScript, der in ' +
    'einer Browser-Umgebung funktioniert'
  ))
  console.log(await SpecificationUpdatedUsing(
    'verlangt wird ein Pseudo-Number Generator in TypeScript, der in ' +
    'einer Browser-Umgebung funktioniert',
    'Nutze einen "Linearen Kongruenzgenerator" (LCG). Vervollständige die ' +
    'Spezifikation so, daß eine sinnvoll einsetzbare Funktion entsteht'
  ))
})()
```

(more to come)

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

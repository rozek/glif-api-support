# glif-interfaces #

a growing list of TypeScript interfaces for Glifs intended to be used in AI agents

> Nota bene: these "interfaces" often contain additional functionality that goes beyond what the underlying Glif does. Typical example: many "interfaces" detect the language of the original request - and if that is not english, they first translate the request into english, then run the underlying Glif and finally translate the answer back into the original language (if that translation makes sense).

> **Important: in order to run Glifs via their API, you will have to [sign up for a Glif account](https://glif.app/signin) and [request your personal API Token](https://glif.app/settings/api-tokens)**

<span style="color:red">**Warning: due to a nasty bug in Glif, backticks cannot be entered into the prompt input fields of "Text Generation" blocks, thus damaging my prompts - as a consequence, the code and my examples may not work as expected!**</span>

> if you like, directly jump to some [interactive Usage Examples](#examples)

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
    'Verwende einen "Linearen Kongruenzgenerator" (LCG). Vervollständige die ' +
    'Spezifikation so, daß eine einfache und sinnvoll einsetzbare Funktion ' +
    'entsteht. Wähle insbesondere vernünftige Konstanten für den LCG'
  ))
})()
```

You may repeatedly review and enhance your specification until either you or the AI seems confident enough that the specification may be implemented.

### Code Generation ###

Given a specification, some additional requirements (such as a certain code style or the libraries to be used) and an already existing implementation (if any) can be used to generate (or update) the corresponding JavaScript or TypeScript code (try yourself using the [Svelte REPL](https://svelte.dev/playground/b38c9e2b43be499f9273a99ac548388f?version=5.20.2)).

> if you don't understand the german input: the first example (and its [Glif](https://glif.app/@rozek/glifs/cm7dj2je40003yilbq4y0hl4h)) give you a possibility to translate it into your favourite language

```javascript
import {
  GlifRunner,
  LanguageOfText, TranslationOfTextInto,
  JavaScriptImplementationOf,
} from "glif-interfaces"

;(async () => {
  GlifRunner.APIToken = '...'

  console.log(await JavaScriptImplementationOf(
`
Ein Pseudo-Zufallszahlengenerator in JavaScript wird benötigt, der in einer Browserumgebung funktioniert. Der Generator sollte einen "Linear Congruential Generator" (LCG) mit den folgenden Konstanten verwenden:

Modulus (m): 2^32
Multiplikator (a): 1664525
Inkrement (c): 1013904223
Startwert (x0): 12345

Die Funktion sollte einen optionalen Startwert-Parameter akzeptieren und eine Sequenz von Pseudozufallszahlen zurückgeben.
`, 'Vermeide Semikolons soweit möglich. Der fertige Code sollte ohne Dependencies auskommen und sofort einsetzbar sein', ''
  ))
})()
```

TypeScript code generation works in a similar way (see the related example in the [Svelte REPL](https://svelte.dev/playground/114dbfd990264edc8dc4ee6e9d844720?version=5.20.2))

### Code Review ###

Given a JavaScript or TypeScript code snippet, this example analyzes it and identifies actuel or potential problems (try yourself using the [Svelte REPL](https://svelte.dev/playground/f1eb2e4bf5744a2ea12b365b7c153077?version=5.20.2)).

```javascript
import {
  GlifRunner,
  ReviewOfJavaScript,
} from "glif-interfaces"

;(async () => {
  GlifRunner.APIToken = '...'

  console.log(await ReviewOfJavaScript(
`
function lcg(x0 = 12345) {
  const m = 2 ** 32
  const a = 1664525
  const c = 1013904223

  return function() {
    x0 = (a * x0 + c) % m
    return x0
  }
}
`, 'ignoriere fehlende Kommentare', 'de'
  ))
})()
```

> if you don't understand the german input: the first example (and its [Glif](https://glif.app/@rozek/glifs/cm7dj2je40003yilbq4y0hl4h)) give you a possibility to translate it into your favourite language

The TypeScript code review works in a similar way (see the related example in the [Svelte REPL](https://svelte.dev/playground/d56ed6e62cfc49b2a8de478c8768f315?version=5.20.2))

### Code Fixing ###

Given some code and an error message, this example tries to find the underlying problem and fix it (try yourself using the [Svelte REPL](https://svelte.dev/playground/c2ae27963600407db0c243c336d76b69?version=5.20.2)).

```javascript
import {
  GlifRunner,
  CodeWithFixForError,
} from "glif-interfaces"

;(async () => {
  GlifRunner.APIToken = '...'

  console.log(await CodeWithFixForError(
`
function lcg(x0 = 12345) {
  const m = 2 ** 32
  const a = 1664525
  const c = 1013904223

  return function() {
    x0 = (a * x0 + c) % m
    #return x0
  }
}
`, 'Syntax Error'
  ))
})()
```

### Test Case Generation ###

This example generates the (unit) test cases for a given code (try yourself using the [Svelte REPL](https://svelte.dev/playground/5b5a673127504a3da251b934fd7490f2?version=5.20.2)).

```javascript
import {
  GlifRunner,
  TestCasesForCode,
} from "glif-interfaces"

;(async () => {
  GlifRunner.APIToken = '...'

  console.log(await TestCasesForCode(
`
function lcg(x0 = 12345) {
  const m = 2 ** 32
  const a = 1664525
  const c = 1013904223

  return function() {
    x0 = (a * x0 + c) % m
    return x0
  }
}
`, '', 'de'
  ))
})()
```

> if you don't understand the german output: the first example (and its [Glif](https://glif.app/@rozek/glifs/cm7dj2je40003yilbq4y0hl4h)) give you a possibility to translate it into your favourite language

### Test Generation ###

Given an existing code and some test cases, this example implementes the listed (unit) tests (try yourself using the [Svelte REPL](https://svelte.dev/playground/1404ea40fd2841a781f5bffef4271136?version=5.20.2)).

```javascript
import {
  GlifRunner,
  TestsForJavaScript,
} from "glif-interfaces"

;(async () => {
  GlifRunner.APIToken = '...'

  console.log(await TestsForJavaScript(
`
function lcg(x0 = 12345) {
  const m = 2 ** 32
  const a = 1664525
  const c = 1013904223

  return function() {
    x0 = (a * x0 + c) % m
    return x0
  }
}
`,`
Testfälle:

1. **Initialisierung**
   - Überprüfen, dass die \`lcg\`-Funktion ohne Argumente aufgerufen werden kann und eine gültige Funktion zurückgibt.
   - Überprüfen, dass die \`lcg\`-Funktion mit einem anfänglichen Startwert \`x0\` aufgerufen werden kann und eine gültige Funktion zurückgibt.

2. **Zufallszahlenerzeugung**
   - Überprüfen, dass die von \`lcg\` zurückgegebene Funktion eine Sequenz von Pseudozufallszahlen erzeugt.
   - Überprüfen, dass die Sequenz der Pseudozufallszahlen deterministisch ist, d.h. dass die gleiche Sequenz erzeugt wird, wenn der gleiche Startwert \`x0\` verwendet wird.
   - Überprüfen, dass die erzeugten Pseudozufallszahlen im erwarteten Bereich liegen (0 bis \`m - 1\`, wobei \`m = 2^32\`).

3. **Modulo-Operation**
   - Überprüfen, dass die Modulo-Operation \`% m\` korrekt auf das Ergebnis der linearen kongruenten Formel angewendet wird.

4. **Lineare kongruente Formel**
   - Überprüfen, dass die lineare kongruente Formel \`(a * x0 + c) % m\` korrekt implementiert ist.
   - Überprüfen, dass die Werte von \`a\`, \`c\` und \`m\` korrekt sind.

5. **Randfall**
   - Überprüfen, dass die \`lcg\`-Funktion den Fall behandelt, in dem der anfängliche Startwert \`x0\` nicht angegeben wird (d.h. den Standardwert \`12345\` verwendet).
   - Überprüfen, dass die \`lcg\`-Funktion den Fall behandelt, in dem der anfängliche Startwert \`x0\` sehr groß oder sehr klein ist.
`, '', ''
  ))
})()
```

> if you don't understand the german input: the first example (and its [Glif](https://glif.app/@rozek/glifs/cm7dj2je40003yilbq4y0hl4h)) give you a possibility to translate it into your favourite language

The TypeScript test generation works in a similar way (see the related example in the [Svelte REPL](https://svelte.dev/playground/c7947be105084dc7a333098f08b9c8c7?version=5.20.2))

### Synopsis Generation ###

This example generates a short synopsis for a given code (try yourself using the [Svelte REPL](https://svelte.dev/playground/a0ee7664fe304ea9947300bf0997d3f2?version=5.20.2)).

```javascript
import {
  GlifRunner,
  SynopsisForCode,
} from "glif-interfaces"

;(async () => {
  GlifRunner.APIToken = '...'

  console.log(await SynopsisForCode(
`
function lcg(x0 = 12345) {
  const m = 2 ** 32
  const a = 1664525
  const c = 1013904223

  return function() {
    x0 = (a * x0 + c) % m
    return x0
  }
}
`, 'german'
  ))
})()
```

> if you don't understand the german output: the first example (and its [Glif](https://glif.app/@rozek/glifs/cm7dj2je40003yilbq4y0hl4h)) give you a possibility to translate it into your favourite language

### Documentation Generation ###

This example generates the technical documentation for a given code (try yourself using the [Svelte REPL](https://svelte.dev/playground/f828499208614b2d9ecc4e5ba6505636?version=5.20.2)).

```javascript
import {
  GlifRunner,
  DocumentationForCode,
} from "glif-interfaces"

;(async () => {
  GlifRunner.APIToken = '...'

  console.log(await DocumentationForCode(
`
function lcg(x0 = 12345) {
  const m = 2 ** 32
  const a = 1664525
  const c = 1013904223

  return function() {
    x0 = (a * x0 + c) % m
    return x0
  }
}
`, '', 'german'
  ))
})()
```

> if you don't understand the german output: the first example (and its [Glif](https://glif.app/@rozek/glifs/cm7dj2je40003yilbq4y0hl4h)) give you a possibility to translate it into your favourite language

### Document from Notes ###

The following example takes a list of notes and converts them into a complete text (try yourself using the [Svelte REPL](https://svelte.dev/playground/fae245689fd94397b21e75f0aefcdce6?version=5.20.2)).

```javascript
import {
  GlifRunner,
  DocumentFromNotes,
} from "glif-interfaces"

;(async () => {
  GlifRunner.APIToken = '...'

  console.log(await DocumentFromNotes(
`
Zur Funktionsweise eines Linearer Kongruenzgenerators (LCG)

- **Formel**: $$ X_{n+1} = (aX_n + b) \mod m $$
- **Parameter**:
  - $$ m $$: Modulus
  - $$ a $$: Multiplikator
  - $$ b $$: Inkrement
  - $$ X_0 $$: Startwert
- **Funktionsweise**:
  - Modulare Arithmetik
  - Pseudozufallszahlen
  - Periodische Sequenz
- **Anforderungen für maximale Periode**:
  - $$ b $$ teilerfremd zu $$ m $$
  - $$ a-1 $$ teilt jeden Primfaktor von $$ m $$
  - $$ a-1 $$ teilt $$ 4 $$, wenn $$ m $$ durch $$ 4 $$ teilbar ist
- **Typen**:
  - Multiplikativ ($$ b = 0 $$)
  - Gemischt ($$ b \neq 0 $$)
`, '', 'german'
  ))
})()
```

> if you don't understand the german input: the first example (and its [Glif](https://glif.app/@rozek/glifs/cm7dj2je40003yilbq4y0hl4h)) give you a possibility to translate it into your favourite language



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

/*******************************************************************************
*                                                                              *
*                                GlifInterfaces                                *
*                                                                              *
*******************************************************************************/

  import {
    expectText,
  } from "javascript-interface-library"

  import { GlifRunner } from "glifrunner"
  export { GlifRunner }           // re-export GlifRunner to simplify agent code

/**** make some existing types indexable ****/

  interface Indexable { [Key:string]:any }

/**** fencable - escapes "»" and "«" ****/

  export function fencable (Text:string):string {
    expectText('text to be made "fencable"',Text)
    return Text.replace(/»/g,'\\\\xBB').replace(/«/g,'\\\\xAB')
  }

/**** fenced - "fences" a text between "»»»" and "«««" ****/

  export function fenced (Text:string):string {
    expectText('text to be "fenced"',Text)
    return `»»»\n${fencable(Text)}\n«««`
  }

/**** unfenced - reverts text fencing ****/

  export function unfenced (Text:string):string {
    expectText('text to be "unfenced"',Text)
    return Text.replace(/^.*?»»»/,'').replace(/«««.*$/,'')
      .replace(/\\\\xBB/gi,'»').replace(/\\\\xAB/gi,'«') // unescape "»" and "«"
      .replace(/^\s*\n/,'')                        // remove leading empty lines
      .replace(/\n\s*$/,'\n')                     // remove trailing empty lines
  }

/**** LanguageOfText - detects the language a given text is written in ****/

  export const LanguageCodes = [
    'ar','bn','bg','zh','da','de','en','et','fi','fr','el','iw','hi','it',
    'ko','hr','nl','pt','es','cs','hu','unknown'
  ]
  export type LanguageCode = typeof LanguageCodes[number]

  const LanguageCodeSet = new Set(LanguageCodes)

  export async function LanguageOfText (Text:string):Promise<LanguageCode> {
    expectText('text to be analyzed',Text)

    const fencedText   = fenced(Text)
    const Response     = await GlifRunner.run(
      'cm7d23nop0000ona1b5b1cotg',[fencedText]
    ) as Indexable
    const LanguageCode = unfenced(Response.output as string).trim()
    return (LanguageCodeSet.has(LanguageCode) ? LanguageCode : 'unknown')
  }



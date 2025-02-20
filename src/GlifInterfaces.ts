/*******************************************************************************
*                                                                              *
*                                GlifInterfaces                                *
*                                                                              *
*******************************************************************************/

  import {
    throwError,
    ValueIsOneOf,
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

  export const Languages = [
    'arabic', 'bengali', 'bulgarian', 'chinese', 'danish', 'german', 'english',
    'estonian', 'finnish', 'french', 'greek', 'hebrew', 'hindi', 'italian',
    'korean', 'croatian', 'dutch', 'portuguese', 'spanish', 'czech', 'hungarian'
  ]
  export type Language = typeof Languages[number]

  const LanguageSet = Object.assign(Object.create(null),{
    'ar': 'arabic',    'bn': 'bengali',    'bg': 'bulgarian',
    'zh': 'chinese',   'da': 'danish',     'de': 'german',
    'en': 'english',   'et': 'estonian',   'fi': 'finnish',
    'fr': 'french',    'el': 'greek',      'iw': 'hebrew',
    'hi': 'hindi',     'it': 'italian',    'ko': 'korean',
    'hr': 'croatian',  'nl': 'dutch',      'pt': 'portuguese',
    'es': 'spanish',   'cs': 'czech',      'hu': 'hungarian',
    'unknown': 'unknown'
  })

  export async function LanguageOfText (Text:string):Promise<LanguageCode> {
    expectText('text to be analyzed',Text)

    const fencableText = fencable(Text)
    const Response     = await GlifRunner.run(
      'cm7d23nop0000ona1b5b1cotg',[fencableText]
    ) as Indexable
    const LanguageCode = unfenced(Response.output as string).trim()
    return (LanguageCode in LanguageSet ? LanguageCode : 'unknown')
  }

/**** TranslationOfTextInto - translates a given text into a supported language ****/

  export async function TranslationOfTextInto (
    Text:string, TargetLanguage:Language|LanguageCode
  ):Promise<string> {
    expectText('text to be translated',Text)

    switch (true) {
      case (TargetLanguage ==  null):
        throwError('MissingArgument: no "TargetLanguage" given')
      case (TargetLanguage === 'unknown'):
        return Text
      case ValueIsOneOf(TargetLanguage,LanguageCodes):
        TargetLanguage = LanguageSet[TargetLanguage]
      case ValueIsOneOf(TargetLanguage,Languages):
        break
      default:
        throwError('InvalidArgument:invalid "TargetLanguage" given')
    }

    const fencableText = fencable(Text)
    const Response     = await GlifRunner.run(
      'cm7dj2je40003yilbq4y0hl4h',[fencableText,TargetLanguage]
    ) as Indexable
    return unfenced(Response.output as string)
  }



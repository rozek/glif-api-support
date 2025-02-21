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

/**** ReviewOfSpecification - analyzes a given specification ****/

  export async function ReviewOfSpecification (
    Specification:string
  ):Promise<string> {
    expectText('specification to be reviewed',Specification)

    const SpecificationLanguage = await LanguageOfText(Specification)
    if ((SpecificationLanguage !== 'en') && (SpecificationLanguage !== 'unknown')) {
      const englishSpecification = await TranslationOfTextInto(Specification,'english')
      const Review = await ReviewOf(englishSpecification)
      return await TranslationOfTextInto(Review,SpecificationLanguage)
    } else {
      return await ReviewOf(Specification)
    }
  }

  async function ReviewOf (Text:string):Promise<string> {
    const fencableText = fencable(Text)
    const Response     = await GlifRunner.run(
      'cm7dkodqs000cd4qgh3rmq1fd',[fencableText]
    ) as Indexable
    return unfenced(Response.output as string)
  }

/**** SpecificationUpdatedUsing - modifies a given specification ****/

  export async function SpecificationUpdatedUsing (
    Specification:string, Instructions:string
  ):Promise<string> {
    expectText('specification to be updated',Specification)
    expectText        ('update instructions',Instructions)

    const InstructionLanguage = await LanguageOfText(Instructions)
    if ((InstructionLanguage !== 'en') && (InstructionLanguage !== 'unknown')) {
      Instructions = await TranslationOfTextInto(Instructions,'english')
    }

    const SpecificationLanguage = await LanguageOfText(Specification)
    if ((SpecificationLanguage !== 'en') && (SpecificationLanguage !== 'unknown')) {
      const englishSpecification = await TranslationOfTextInto(Specification,'english')
      const Update = await UpdateOf(englishSpecification,Instructions)
      return await TranslationOfTextInto(Update,SpecificationLanguage)
    } else {
      return await UpdateOf(Specification,Instructions)
    }
  }

  async function UpdateOf (Text:string,Instructions:string):Promise<string> {
    const fencableText         = fencable(Text)
    const fencableInstructions = fencable(Instructions)

    const Response = await GlifRunner.run(
      'cm7e8tjlr000v5br0zmv8v6b8',[fencableText,fencableInstructions]
    ) as Indexable
    return unfenced(Response.output as string)
  }

/**** JavaScriptImplementationOf - generates code for a given specification ****/

  export async function JavaScriptImplementationOf (
    Specification:string, Requirements:string = '', existingCode:string = ''
  ):Promise<string> {
    expectText          ('specification',Specification)
    expectText('additional requirements',Requirements)
    expectText          ('existing code',existingCode)

    const SpecificationLanguage = await LanguageOfText(Specification)
    if ((SpecificationLanguage !== 'en') && (SpecificationLanguage !== 'unknown')) {
      Specification = await TranslationOfTextInto(Specification,'english')
    }

    if (Requirements.trim() !== '') {
      const RequirementsLanguage = await LanguageOfText(Requirements)
      if ((RequirementsLanguage !== 'en') && (RequirementsLanguage !== 'unknown')) {
        Requirements = await TranslationOfTextInto(Requirements,'english')
      }
    }

    const fencableSpecification = fencable(Specification)
    const fencableRequirements  = fencable(Requirements)
    const fencableCode          = fencable(existingCode)

    const Response = await GlifRunner.run(
      'cm7ees8qw000110gd454cddv6',[
        fencableSpecification,fencableRequirements,fencableCode
      ]
    ) as Indexable
    return unfenced(Response.output as string)
  }

/**** TypeScriptImplementationOf - generates code for a given specification ****/

  export async function TypeScriptImplementationOf (
    Specification:string, Requirements:string = '', existingCode:string = ''
  ):Promise<string> {
    expectText          ('specification',Specification)
    expectText('additional requirements',Requirements)
    expectText          ('existing code',existingCode)

    const SpecificationLanguage = await LanguageOfText(Specification)
    if ((SpecificationLanguage !== 'en') && (SpecificationLanguage !== 'unknown')) {
      Specification = await TranslationOfTextInto(Specification,'english')
    }

    if (Requirements.trim() !== '') {
      const RequirementsLanguage = await LanguageOfText(Requirements)
      if ((RequirementsLanguage !== 'en') && (RequirementsLanguage !== 'unknown')) {
        Requirements = await TranslationOfTextInto(Requirements,'english')
      }
    }

    const fencableSpecification = fencable(Specification)
    const fencableRequirements  = fencable(Requirements)
    const fencableCode          = fencable(existingCode)

    const Response = await GlifRunner.run(
      'cm7eiami8000zrs3de9432y8n',[
        fencableSpecification,fencableRequirements,fencableCode
      ]
    ) as Indexable
    return unfenced(Response.output as string)
  }

/**** ReviewOfJavaScript - reviews code and suggests improvements ****/

  export async function ReviewOfJavaScript (
    Code:string, Constraints:string = '', OutputLanguage:string = 'en'
  ):Promise<string> {
    expectText                   ('code to be reviewed',Code)
    expectText('additional requirements for the review',Constraints)

    switch (true) {
      case (OutputLanguage ==  null):
      case (OutputLanguage === 'unknown'):
        OutputLanguage = 'en'
        break
      case ValueIsOneOf(OutputLanguage,LanguageCodes):
        OutputLanguage = LanguageSet[OutputLanguage]
      case ValueIsOneOf(OutputLanguage,Languages):
        break
      default:
        throwError('InvalidArgument:invalid "OutputLanguage" given')
    }

    const ConstraintsLanguage = await LanguageOfText(Constraints)
    if ((ConstraintsLanguage !== 'en') && (ConstraintsLanguage !== 'unknown')) {
      Constraints = await TranslationOfTextInto(Constraints,'english')
    }

    const fencableCode        = fencable(Code)
    const fencableConstraints = fencable(Constraints)

    const Response = await GlifRunner.run(
      'cm7elpqsn0001r9m2arsv69k6',[fencableCode,fencableConstraints]
    ) as Indexable

    if (OutputLanguage === 'en') {
      return unfenced(Response.output as string)
    } else {
      return TranslationOfTextInto(
        unfenced(Response.output as string), OutputLanguage
      )
    }
  }

/**** ReviewOfTypeScript - reviews code and suggests improvements ****/

  export async function ReviewOfTypeScript (
    Code:string, Constraints:string = '', OutputLanguage:string = 'en'
  ):Promise<string> {
    expectText                   ('code to be reviewed',Code)
    expectText('additional requirements for the review',Constraints)

    switch (true) {
      case (OutputLanguage ==  null):
      case (OutputLanguage === 'unknown'):
        OutputLanguage = 'en'
        break
      case ValueIsOneOf(OutputLanguage,LanguageCodes):
        OutputLanguage = LanguageSet[OutputLanguage]
      case ValueIsOneOf(OutputLanguage,Languages):
        break
      default:
        throwError('InvalidArgument:invalid "OutputLanguage" given')
    }

    const ConstraintsLanguage = await LanguageOfText(Constraints)
    if ((ConstraintsLanguage !== 'en') && (ConstraintsLanguage !== 'unknown')) {
      Constraints = await TranslationOfTextInto(Constraints,'english')
    }

    const fencableCode        = fencable(Code)
    const fencableConstraints = fencable(Constraints)

    const Response = await GlifRunner.run(
      'cm7et7g2u0000kdocnho1ej6u',[fencableCode,fencableConstraints]
    ) as Indexable

    if (OutputLanguage === 'en') {
      return unfenced(Response.output as string)
    } else {
      return TranslationOfTextInto(
        unfenced(Response.output as string), OutputLanguage
      )
    }
  }



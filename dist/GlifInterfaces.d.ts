/*******************************************************************************
*                                                                              *
*                                GlifInterfaces                                *
*                                                                              *
*******************************************************************************/
import { GlifRunner } from "glifrunner";
export { GlifRunner };
/**** fencable - escapes "»" and "«" ****/
export declare function fencable(Text: string): string;
/**** fenced - "fences" a text between "»»»" and "«««" ****/
export declare function fenced(Text: string): string;
/**** unfenced - reverts text fencing ****/
export declare function unfenced(Text: string): string;
/**** LanguageOfText - detects the language a given text is written in ****/
export declare const LanguageCodes: string[];
export type LanguageCode = typeof LanguageCodes[number];
export declare const Languages: string[];
export type Language = typeof Languages[number];
export declare function LanguageOfText(Text: string): Promise<LanguageCode>;
/**** TranslationOfTextInto - translates a given text into a supported language ****/
export declare function TranslationOfTextInto(Text: string, TargetLanguage: Language | LanguageCode): Promise<string>;
/**** ReviewOfSpecification - analyzes a given specification ****/
export declare function ReviewOfSpecification(Specification: string): Promise<string>;
/**** SpecificationUpdatedUsing - modifies a given specification ****/
export declare function SpecificationUpdatedUsing(Specification: string, Instructions: string): Promise<string>;
/**** JavaScriptImplementationOf - generates code for a given specification ****/
export declare function JavaScriptImplementationOf(Specification: string, Requirements?: string, existingCode?: string): Promise<string>;

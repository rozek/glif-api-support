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
/**** TypeScriptImplementationOf - generates code for a given specification ****/
export declare function TypeScriptImplementationOf(Specification: string, Requirements?: string, existingCode?: string): Promise<string>;
/**** ReviewOfJavaScript - reviews code and suggests improvements ****/
export declare function ReviewOfJavaScript(Code: string, Constraints?: string, OutputLanguage?: string): Promise<string>;
/**** ReviewOfTypeScript - reviews code and suggests improvements ****/
export declare function ReviewOfTypeScript(Code: string, Constraints?: string, OutputLanguage?: string): Promise<string>;
/**** CodeWithFixForError - fixes a given error in some code ****/
export declare function CodeWithFixForError(Code: string, ErrorMessage: string): Promise<string>;
/**** TestCasesForCode - generates a list of test cases for some code ****/
export declare function TestCasesForCode(Code: string, existingTestCases?: string, OutputLanguage?: string): Promise<string>;
/**** TestsForJavaScript - generates a list of tests for some code ****/
export declare function TestsForJavaScript(Code: string, TestCases: string, Requirements?: string, existingTests?: string): Promise<string>;
/**** TestsForTypeScript - generates a list of tests for some code ****/
export declare function TestsForTypeScript(Code: string, TestCases: string, Requirements?: string, existingTests?: string): Promise<string>;
/**** SynopsisForCode - generates a synopsis for some code ****/
export declare function SynopsisForCode(Code: string, OutputLanguage?: string): Promise<string>;
/**** DocumentationForCode - generates the documentation for some code ****/
export declare function DocumentationForCode(Code: string, existingDocumentation?: string, OutputLanguage?: string): Promise<string>;
/**** DocumentFromNotes - generates well-formulated text from given notes ****/
export declare function DocumentFromNotes(Notes: string, existingDocument?: string, OutputLanguage?: string): Promise<string>;

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
export declare function LanguageOfText(Text: string): Promise<LanguageCode>;

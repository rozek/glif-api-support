import { expectText, throwError, ValueIsOneOf } from 'javascript-interface-library';
import { GlifRunner } from 'glifrunner';
export { GlifRunner } from 'glifrunner';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/*******************************************************************************
*                                                                              *
*                                GlifInterfaces                                *
*                                                                              *
*******************************************************************************/
/**** fencable - escapes "»" and "«" ****/
function fencable(Text) {
    expectText('text to be made "fencable"', Text);
    return Text.replace(/»/g, '\\\\xBB').replace(/«/g, '\\\\xAB');
}
/**** fenced - "fences" a text between "»»»" and "«««" ****/
function fenced(Text) {
    expectText('text to be "fenced"', Text);
    return "\u00BB\u00BB\u00BB\n".concat(fencable(Text), "\n\u00AB\u00AB\u00AB");
}
/**** unfenced - reverts text fencing ****/
function unfenced(Text) {
    expectText('text to be "unfenced"', Text);
    return Text.replace(/^.*?»»»/, '').replace(/«««.*$/, '')
        .replace(/\\\\xBB/gi, '»').replace(/\\\\xAB/gi, '«') // unescape "»" and "«"
        .replace(/^\s*\n/, '') // remove leading empty lines
        .replace(/\n\s*$/, '\n'); // remove trailing empty lines
}
/**** LanguageOfText - detects the language a given text is written in ****/
var LanguageCodes = [
    'ar', 'bn', 'bg', 'zh', 'da', 'de', 'en', 'et', 'fi', 'fr', 'el', 'iw', 'hi', 'it',
    'ko', 'hr', 'nl', 'pt', 'es', 'cs', 'hu', 'unknown'
];
var Languages = [
    'arabic', 'bengali', 'bulgarian', 'chinese', 'danish', 'german', 'english',
    'estonian', 'finnish', 'french', 'greek', 'hebrew', 'hindi', 'italian',
    'korean', 'croatian', 'dutch', 'portuguese', 'spanish', 'czech', 'hungarian'
];
var LanguageSet = Object.assign(Object.create(null), {
    'ar': 'arabic', 'bn': 'bengali', 'bg': 'bulgarian',
    'zh': 'chinese', 'da': 'danish', 'de': 'german',
    'en': 'english', 'et': 'estonian', 'fi': 'finnish',
    'fr': 'french', 'el': 'greek', 'iw': 'hebrew',
    'hi': 'hindi', 'it': 'italian', 'ko': 'korean',
    'hr': 'croatian', 'nl': 'dutch', 'pt': 'portuguese',
    'es': 'spanish', 'cs': 'czech', 'hu': 'hungarian',
    'unknown': 'unknown'
});
function LanguageOfText(Text) {
    return __awaiter(this, void 0, void 0, function () {
        var fencableText, Response, LanguageCode;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expectText('text to be analyzed', Text);
                    fencableText = fencable(Text);
                    return [4 /*yield*/, GlifRunner.run('cm7d23nop0000ona1b5b1cotg', [fencableText])];
                case 1:
                    Response = _a.sent();
                    LanguageCode = unfenced(Response.output).trim();
                    return [2 /*return*/, (LanguageCode in LanguageSet ? LanguageCode : 'unknown')];
            }
        });
    });
}
/**** TranslationOfTextInto - translates a given text into a supported language ****/
function TranslationOfTextInto(Text, TargetLanguage) {
    return __awaiter(this, void 0, void 0, function () {
        var fencableText, Response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expectText('text to be translated', Text);
                    switch (true) {
                        case (TargetLanguage == null):
                            throwError('MissingArgument: no "TargetLanguage" given');
                        case (TargetLanguage === 'unknown'):
                            return [2 /*return*/, Text];
                        case ValueIsOneOf(TargetLanguage, LanguageCodes):
                            TargetLanguage = LanguageSet[TargetLanguage];
                        case ValueIsOneOf(TargetLanguage, Languages):
                            break;
                        default:
                            throwError('InvalidArgument:invalid "TargetLanguage" given');
                    }
                    fencableText = fencable(Text);
                    return [4 /*yield*/, GlifRunner.run('cm7dj2je40003yilbq4y0hl4h', [fencableText, TargetLanguage])];
                case 1:
                    Response = _a.sent();
                    return [2 /*return*/, unfenced(Response.output)];
            }
        });
    });
}
/**** ReviewOfSpecification - analyzes a given specification ****/
function ReviewOfSpecification(Specification) {
    return __awaiter(this, void 0, void 0, function () {
        var SpecificationLanguage, englishSpecification, Review;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expectText('specification to be reviewed', Specification);
                    return [4 /*yield*/, LanguageOfText(Specification)];
                case 1:
                    SpecificationLanguage = _a.sent();
                    if (!((SpecificationLanguage !== 'en') && (SpecificationLanguage !== 'unknown'))) return [3 /*break*/, 5];
                    return [4 /*yield*/, TranslationOfTextInto(Specification, 'english')];
                case 2:
                    englishSpecification = _a.sent();
                    return [4 /*yield*/, ReviewOf(englishSpecification)];
                case 3:
                    Review = _a.sent();
                    return [4 /*yield*/, TranslationOfTextInto(Review, SpecificationLanguage)];
                case 4: return [2 /*return*/, _a.sent()];
                case 5: return [4 /*yield*/, ReviewOf(Specification)];
                case 6: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function ReviewOf(Text) {
    return __awaiter(this, void 0, void 0, function () {
        var fencableText, Response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fencableText = fencable(Text);
                    return [4 /*yield*/, GlifRunner.run('cm7dkodqs000cd4qgh3rmq1fd', [fencableText])];
                case 1:
                    Response = _a.sent();
                    return [2 /*return*/, unfenced(Response.output)];
            }
        });
    });
}
/**** SpecificationUpdatedUsing - modifies a given specification ****/
function SpecificationUpdatedUsing(Specification, Instructions) {
    return __awaiter(this, void 0, void 0, function () {
        var InstructionLanguage, SpecificationLanguage, englishSpecification, Update;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expectText('specification to be updated', Specification);
                    expectText('update instructions', Instructions);
                    return [4 /*yield*/, LanguageOfText(Instructions)];
                case 1:
                    InstructionLanguage = _a.sent();
                    if (!((InstructionLanguage !== 'en') && (InstructionLanguage !== 'unknown'))) return [3 /*break*/, 3];
                    return [4 /*yield*/, TranslationOfTextInto(Instructions, 'english')];
                case 2:
                    Instructions = _a.sent();
                    _a.label = 3;
                case 3: return [4 /*yield*/, LanguageOfText(Specification)];
                case 4:
                    SpecificationLanguage = _a.sent();
                    if (!((SpecificationLanguage !== 'en') && (SpecificationLanguage !== 'unknown'))) return [3 /*break*/, 8];
                    return [4 /*yield*/, TranslationOfTextInto(Specification, 'english')];
                case 5:
                    englishSpecification = _a.sent();
                    return [4 /*yield*/, UpdateOf(englishSpecification, Instructions)];
                case 6:
                    Update = _a.sent();
                    return [4 /*yield*/, TranslationOfTextInto(Update, SpecificationLanguage)];
                case 7: return [2 /*return*/, _a.sent()];
                case 8: return [4 /*yield*/, UpdateOf(Specification, Instructions)];
                case 9: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function UpdateOf(Text, Instructions) {
    return __awaiter(this, void 0, void 0, function () {
        var fencableText, fencableInstructions, Response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fencableText = fencable(Text);
                    fencableInstructions = fencable(Instructions);
                    return [4 /*yield*/, GlifRunner.run('cm7e8tjlr000v5br0zmv8v6b8', [fencableText, fencableInstructions])];
                case 1:
                    Response = _a.sent();
                    return [2 /*return*/, unfenced(Response.output)];
            }
        });
    });
}
/**** JavaScriptImplementationOf - generates code for a given specification ****/
function JavaScriptImplementationOf(Specification, Requirements, existingCode) {
    if (Requirements === void 0) { Requirements = ''; }
    if (existingCode === void 0) { existingCode = ''; }
    return __awaiter(this, void 0, void 0, function () {
        var SpecificationLanguage, RequirementsLanguage, fencableSpecification, fencableRequirements, fencableCode, Response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expectText('specification', Specification);
                    expectText('additional requirements', Requirements);
                    expectText('existing code', existingCode);
                    return [4 /*yield*/, LanguageOfText(Specification)];
                case 1:
                    SpecificationLanguage = _a.sent();
                    if (!((SpecificationLanguage !== 'en') && (SpecificationLanguage !== 'unknown'))) return [3 /*break*/, 3];
                    return [4 /*yield*/, TranslationOfTextInto(Specification, 'english')];
                case 2:
                    Specification = _a.sent();
                    _a.label = 3;
                case 3:
                    if (!(Requirements.trim() !== '')) return [3 /*break*/, 6];
                    return [4 /*yield*/, LanguageOfText(Requirements)];
                case 4:
                    RequirementsLanguage = _a.sent();
                    if (!((RequirementsLanguage !== 'en') && (RequirementsLanguage !== 'unknown'))) return [3 /*break*/, 6];
                    return [4 /*yield*/, TranslationOfTextInto(Requirements, 'english')];
                case 5:
                    Requirements = _a.sent();
                    _a.label = 6;
                case 6:
                    fencableSpecification = fencable(Specification);
                    fencableRequirements = fencable(Requirements);
                    fencableCode = fencable(existingCode);
                    return [4 /*yield*/, GlifRunner.run('cm7ees8qw000110gd454cddv6', [
                            fencableSpecification, fencableRequirements, fencableCode
                        ])];
                case 7:
                    Response = _a.sent();
                    return [2 /*return*/, unfenced(Response.output)];
            }
        });
    });
}
/**** TypeScriptImplementationOf - generates code for a given specification ****/
function TypeScriptImplementationOf(Specification, Requirements, existingCode) {
    if (Requirements === void 0) { Requirements = ''; }
    if (existingCode === void 0) { existingCode = ''; }
    return __awaiter(this, void 0, void 0, function () {
        var SpecificationLanguage, RequirementsLanguage, fencableSpecification, fencableRequirements, fencableCode, Response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expectText('specification', Specification);
                    expectText('additional requirements', Requirements);
                    expectText('existing code', existingCode);
                    return [4 /*yield*/, LanguageOfText(Specification)];
                case 1:
                    SpecificationLanguage = _a.sent();
                    if (!((SpecificationLanguage !== 'en') && (SpecificationLanguage !== 'unknown'))) return [3 /*break*/, 3];
                    return [4 /*yield*/, TranslationOfTextInto(Specification, 'english')];
                case 2:
                    Specification = _a.sent();
                    _a.label = 3;
                case 3:
                    if (!(Requirements.trim() !== '')) return [3 /*break*/, 6];
                    return [4 /*yield*/, LanguageOfText(Requirements)];
                case 4:
                    RequirementsLanguage = _a.sent();
                    if (!((RequirementsLanguage !== 'en') && (RequirementsLanguage !== 'unknown'))) return [3 /*break*/, 6];
                    return [4 /*yield*/, TranslationOfTextInto(Requirements, 'english')];
                case 5:
                    Requirements = _a.sent();
                    _a.label = 6;
                case 6:
                    fencableSpecification = fencable(Specification);
                    fencableRequirements = fencable(Requirements);
                    fencableCode = fencable(existingCode);
                    return [4 /*yield*/, GlifRunner.run('cm7eiami8000zrs3de9432y8n', [
                            fencableSpecification, fencableRequirements, fencableCode
                        ])];
                case 7:
                    Response = _a.sent();
                    return [2 /*return*/, unfenced(Response.output)];
            }
        });
    });
}
/**** ReviewOfJavaScript - reviews code and suggests improvements ****/
function ReviewOfJavaScript(Code, Constraints, OutputLanguage) {
    if (Constraints === void 0) { Constraints = ''; }
    if (OutputLanguage === void 0) { OutputLanguage = 'en'; }
    return __awaiter(this, void 0, void 0, function () {
        var ConstraintsLanguage, fencableCode, fencableConstraints, Response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expectText('code to be reviewed', Code);
                    expectText('additional requirements for the review', Constraints);
                    switch (true) {
                        case (OutputLanguage == null):
                        case (OutputLanguage === 'unknown'):
                            OutputLanguage = 'en';
                            break;
                        case ValueIsOneOf(OutputLanguage, LanguageCodes):
                            OutputLanguage = LanguageSet[OutputLanguage];
                        case ValueIsOneOf(OutputLanguage, Languages):
                            break;
                        default:
                            throwError('InvalidArgument:invalid "OutputLanguage" given');
                    }
                    return [4 /*yield*/, LanguageOfText(Constraints)];
                case 1:
                    ConstraintsLanguage = _a.sent();
                    if (!((ConstraintsLanguage !== 'en') && (ConstraintsLanguage !== 'unknown'))) return [3 /*break*/, 3];
                    return [4 /*yield*/, TranslationOfTextInto(Constraints, 'english')];
                case 2:
                    Constraints = _a.sent();
                    _a.label = 3;
                case 3:
                    fencableCode = fencable(Code);
                    fencableConstraints = fencable(Constraints);
                    return [4 /*yield*/, GlifRunner.run('cm7elpqsn0001r9m2arsv69k6', [fencableCode, fencableConstraints])];
                case 4:
                    Response = _a.sent();
                    if (OutputLanguage === 'en') {
                        return [2 /*return*/, unfenced(Response.output)];
                    }
                    else {
                        return [2 /*return*/, TranslationOfTextInto(unfenced(Response.output), OutputLanguage)];
                    }
            }
        });
    });
}
/**** ReviewOfTypeScript - reviews code and suggests improvements ****/
function ReviewOfTypeScript(Code, Constraints, OutputLanguage) {
    if (Constraints === void 0) { Constraints = ''; }
    if (OutputLanguage === void 0) { OutputLanguage = 'en'; }
    return __awaiter(this, void 0, void 0, function () {
        var ConstraintsLanguage, fencableCode, fencableConstraints, Response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expectText('code to be reviewed', Code);
                    expectText('additional requirements for the review', Constraints);
                    switch (true) {
                        case (OutputLanguage == null):
                        case (OutputLanguage === 'unknown'):
                            OutputLanguage = 'en';
                            break;
                        case ValueIsOneOf(OutputLanguage, LanguageCodes):
                            OutputLanguage = LanguageSet[OutputLanguage];
                        case ValueIsOneOf(OutputLanguage, Languages):
                            break;
                        default:
                            throwError('InvalidArgument:invalid "OutputLanguage" given');
                    }
                    return [4 /*yield*/, LanguageOfText(Constraints)];
                case 1:
                    ConstraintsLanguage = _a.sent();
                    if (!((ConstraintsLanguage !== 'en') && (ConstraintsLanguage !== 'unknown'))) return [3 /*break*/, 3];
                    return [4 /*yield*/, TranslationOfTextInto(Constraints, 'english')];
                case 2:
                    Constraints = _a.sent();
                    _a.label = 3;
                case 3:
                    fencableCode = fencable(Code);
                    fencableConstraints = fencable(Constraints);
                    return [4 /*yield*/, GlifRunner.run('cm7et7g2u0000kdocnho1ej6u', [fencableCode, fencableConstraints])];
                case 4:
                    Response = _a.sent();
                    if (OutputLanguage === 'en') {
                        return [2 /*return*/, unfenced(Response.output)];
                    }
                    else {
                        return [2 /*return*/, TranslationOfTextInto(unfenced(Response.output), OutputLanguage)];
                    }
            }
        });
    });
}

export { JavaScriptImplementationOf, LanguageCodes, LanguageOfText, Languages, ReviewOfJavaScript, ReviewOfSpecification, ReviewOfTypeScript, SpecificationUpdatedUsing, TranslationOfTextInto, TypeScriptImplementationOf, fencable, fenced, unfenced };
//# sourceMappingURL=GlifInterfaces.esm.js.map

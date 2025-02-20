import { expectText } from 'javascript-interface-library';
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
function LanguageOfText(Text) {
    return __awaiter(this, void 0, void 0, function () {
        var fencedText, Response, LanguageCode;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expectText('text to be analyzed', Text);
                    fencedText = fenced(Text);
                    return [4 /*yield*/, GlifRunner.run('cm7d23nop0000ona1b5b1cotg', [fencedText])];
                case 1:
                    Response = _a.sent();
                    LanguageCode = unfenced(Response.output);
                    return [2 /*return*/, (LanguageCodes.indexOf(LanguageCode) >= 0 ? LanguageCode : 'unknown')];
            }
        });
    });
}

export { LanguageCodes, LanguageOfText, fencable, fenced, unfenced };
//# sourceMappingURL=GlifInterfaces.esm.js.map

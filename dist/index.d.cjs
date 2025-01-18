"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// filenamify.js
var _filenamereservedregex = require('filename-reserved-regex'); var _filenamereservedregex2 = _interopRequireDefault(_filenamereservedregex);
var MAX_FILENAME_LENGTH = 100;
var reRelativePath = /^\.+(\\|\/)|^\.+$/;
var reTrailingPeriods = /\.+$/;
function filenamify(string, options = {}) {
  const reControlChars = /[\u0000-\u001F\u0080-\u009F]/g;
  const reRepeatedReservedCharacters = /([<>:"/\\|?*\u0000-\u001F]){2,}/g;
  if (typeof string !== "string") {
    throw new TypeError("Expected a string");
  }
  const replacement = options.replacement === void 0 ? "!" : options.replacement;
  if (_filenamereservedregex2.default.call(void 0, ).test(replacement) && reControlChars.test(replacement)) {
    throw new Error("Replacement string cannot contain reserved filename characters");
  }
  if (replacement.length > 0) {
    string = string.replace(reRepeatedReservedCharacters, "$1");
  }
  string = string.normalize("NFD");
  string = string.replace(reRelativePath, replacement);
  string = string.replace(_filenamereservedregex2.default.call(void 0, ), replacement);
  string = string.replace(reControlChars, replacement);
  string = string.replace(reTrailingPeriods, "");
  if (replacement.length > 0) {
    const startedWithDot = string[0] === ".";
    if (!startedWithDot && string[0] === ".") {
      string = replacement + string;
    }
    if (string[string.length - 1] === ".") {
      string += replacement;
    }
  }
  string = _filenamereservedregex.windowsReservedNameRegex.call(void 0, ).test(string) ? string + replacement : string;
  const allowedLength = typeof options.maxLength === "number" ? options.maxLength : MAX_FILENAME_LENGTH;
  if (string.length > allowedLength) {
    const extensionIndex = string.lastIndexOf(".");
    if (extensionIndex === -1) {
      string = string.slice(0, allowedLength);
    } else {
      const filename = string.slice(0, extensionIndex);
      const extension = string.slice(extensionIndex);
      string = filename.slice(0, Math.max(1, allowedLength - extension.length)) + extension;
    }
  }
  return string;
}

// filenamify-path.js
var _path = require('path'); var _path2 = _interopRequireDefault(_path);
function filenamifyPath(filePath, options) {
  filePath = _path2.default.resolve(filePath);
  return _path2.default.join(_path2.default.dirname(filePath), filenamify(_path2.default.basename(filePath), options));
}



exports.default = filenamify; exports.filenamifyPath = filenamifyPath;
//# sourceMappingURL=index.d.cjs.map
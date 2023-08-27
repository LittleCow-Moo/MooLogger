"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogLevel = exports.MooLogger = void 0;
var chalk = require("chalk");
var moment = require("moment");
var fs = require("node:fs");
var util = require("is-what");
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["DISABLED"] = 0] = "DISABLED";
    LogLevel[LogLevel["FATAL"] = 1] = "FATAL";
    LogLevel[LogLevel["ERROR"] = 2] = "ERROR";
    LogLevel[LogLevel["WARN"] = 3] = "WARN";
    LogLevel[LogLevel["INFO"] = 4] = "INFO";
    LogLevel[LogLevel["DEBUG"] = 5] = "DEBUG";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
var MooLogger = /** @class */ (function () {
    /**
     * Represents MooLogger, a simple and beautiful logger.
     * @param {Number} config.logLevel
     */
    function MooLogger(config) {
        var _a = config || {}, logLevel = _a.logLevel, logFolder = _a.logFolder, logFile = _a.logFile, timestamp = _a.timestamp, lang = _a.lang;
        if (!logLevel && logLevel !== 0)
            logLevel = 4;
        if (!timestamp)
            timestamp = true;
        var defaultLang = {
            debug: "DEBUG",
            info: "INFO",
            warn: "WARN",
            error: "ERROR",
            fatal: "FATAL",
        };
        lang = __assign(__assign({}, defaultLang), (lang || {}));
        if (!fs.existsSync(logFolder)) {
            fs.mkdirSync(logFolder, { recursive: true });
        }
        if (logFolder)
            this.logFile = fs.createWriteStream("".concat(logFolder, "/").concat(moment().unix(), ".log"), {
                flags: "a",
            });
        else if (logFile)
            this.logFile = fs.createWriteStream(logFile, {
                flags: "a"
            });
        this.config = { logLevel: logLevel, logFolder: logFolder, logFile: logFile, timestamp: timestamp, lang: lang };
    }
    /**
     * Get colored timestamp of now time.
     * @private
     */
    MooLogger.prototype.getTimestamp = function () {
        return this.config.timestamp
            ? chalk.cyanBright(this.getPureTimestamp())
            : "";
    };
    /**
     * Get text-only timestamp of now time.
     * @private
     */
    MooLogger.prototype.getPureTimestamp = function () {
        return this.config.timestamp
            ? moment().format("YYYY/MM/DD HH:mm:ss ")
            : "";
    };
    /**
     * Prints a debug message.
     * @param {any[]} data Data to write into logger.
     */
    MooLogger.prototype.debug = function () {
        var _a;
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        data.unshift(this.getTimestamp() + chalk.bgGreenBright(" ".concat(this.config.lang.debug, " ")));
        if (this.config.logLevel >= 5)
            console.debug.apply(console, data);
        data.shift();
        (_a = this.logFile) === null || _a === void 0 ? void 0 : _a.write("[".concat(this.getPureTimestamp()).concat(this.config.lang.debug, "] ").concat(String(data), "\n"));
    };
    /**
     * Prints an info message.
     * @param {any[]} data Data to write into logger.
     */
    MooLogger.prototype.info = function () {
        var _a;
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        data.unshift(this.getTimestamp() + chalk.bgBlueBright(" ".concat(this.config.lang.info, " ")));
        if (this.config.logLevel >= 4)
            console.info.apply(console, data);
        data.shift();
        (_a = this.logFile) === null || _a === void 0 ? void 0 : _a.write("[".concat(this.getPureTimestamp()).concat(this.config.lang.info, "] ").concat(String(data), "\n"));
    };
    /**
     * Prints a warning message.
     * @param {any[]} data Data to write into logger.
     */
    MooLogger.prototype.warn = function () {
        var _a;
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        data.unshift(this.getTimestamp() + chalk.bgYellowBright(" ".concat(this.config.lang.warn, " ")));
        if (this.config.logLevel >= 3)
            console.warn.apply(console, data);
        data.shift();
        (_a = this.logFile) === null || _a === void 0 ? void 0 : _a.write("[".concat(this.getPureTimestamp()).concat(this.config.lang.warn, "] ").concat(String(data), "\n"));
    };
    /**
     * Prints an error message.
     * @param {any[]} data Data to write into logger.
     * If the Error object is put at first, it will be logged as a stack trace string.
     */
    MooLogger.prototype.error = function () {
        var _a;
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        data.unshift(this.getTimestamp() + chalk.bgRedBright(" ".concat(this.config.lang.error, " ")));
        var original;
        if (util.isError(data[1])) {
            original = data[1];
            data[1] = data[1].stack
                .replaceAll("at", chalk.bold.gray("at"))
                .replaceAll("(", "(\x1B[33m")
                .replaceAll(")", "\x1B[39m)");
        }
        if (this.config.logLevel >= 2)
            console.error.apply(console, data);
        data.shift();
        if (util.isError(original)) {
            data[0] = original;
        }
        (_a = this.logFile) === null || _a === void 0 ? void 0 : _a.write("[".concat(this.getPureTimestamp()).concat(this.config.lang.error, "] ").concat(util.isError(data[0]) ? data[0].stack : String(data), "\n"));
    };
    /**
     * Prints an fatal error message.
     * @param {any[]} data Data to write into logger.
     * If the Error object is put at first, it will be logged as a stack trace string.
     */
    MooLogger.prototype.fatal = function () {
        var _a;
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        data.unshift(this.getTimestamp() + chalk.bgRed(" ".concat(this.config.lang.fatal, " ")));
        var original;
        if (util.isError(data[1])) {
            original = data[1];
            data[1] = data[1].stack
                .replaceAll("at", chalk.bold.gray("at"))
                .replaceAll("(", "(\x1B[33m")
                .replaceAll(")", "\x1B[39m)");
        }
        if (this.config.logLevel >= 2)
            console.error.apply(console, data);
        data.shift();
        if (util.isError(original)) {
            data[0] = original;
        }
        (_a = this.logFile) === null || _a === void 0 ? void 0 : _a.write("[".concat(this.getPureTimestamp()).concat(this.config.lang.fatal, "] ").concat(util.isError(data[0]) ? data[0].stack : String(data), "\n"));
    };
    return MooLogger;
}());
exports.MooLogger = MooLogger;

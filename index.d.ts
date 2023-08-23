/// <reference types="node" />
export = MooLogger;
declare class MooLogger {
    /**
     * This is the constructor of the MooLogger class.
     * @param {Number} config.logLevel
     * @param {String} config.logFolder
     * @param {Boolean} config.timestamp
     * @param {JSONObject} config.lang
     */
    constructor(config?: {
        logLevel: number;
        logFolder: string;
        timestamp: boolean;
        lang: {
            debug: string;
            info: string;
            warn: string;
            error: string;
            fatal: string;
        };
    });
    config: {
        logLevel: number;
        logFolder: string;
        timestamp: boolean;
        lang: {
            debug: string;
            info: string;
            warn: string;
            error: string;
            fatal: string;
        };
    };
    logFile: fs.WriteStream;
    /**
     * Get colored timestamp of now time.
     * @private
     */
    private getTimestamp;
    /**
     * Get text-only timestamp of now time.
     * @private
     */
    private getPureTimestamp;
    /**
     * Prints a debug message.
     * @param {any} data Data to write into logger.
     */
    debug(...data: any): void;
    /**
     * Prints an info message.
     * @param {any} data Data to write into logger.
     */
    info(...data: any): void;
    /**
     * Prints a warning message.
     * @param {any} data Data to write into logger.
     */
    warn(...data: any): void;
    /**
     * Prints an error message.
     * @param {any} data Data to write into logger.
     * I suggest putting Error object at the first parameter so it will be logged as a stack trace string.
     */
    error(...data: any): void;
    /**
     * Prints an fatal error message.
     * @param {any} data Data to write into logger.
     * I suggest putting Error object at the first parameter so it will be logged as a stack trace string.
     */
    fatal(...data: any): void;
}
import fs = require("node:fs");
//# sourceMappingURL=index.d.ts.map
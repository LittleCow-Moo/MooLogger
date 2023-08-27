/// <reference types="node" />
import { WriteStream } from "fs";
declare enum LogLevel {
    DISABLED = 0,
    FATAL = 1,
    ERROR = 2,
    WARN = 3,
    INFO = 4,
    DEBUG = 5
}
interface LangConfig {
    debug: string;
    info: string;
    warn: string;
    error: string;
    fatal: string;
}
interface ConfigBase {
    logLevel?: number;
    timestamp?: boolean;
    lang?: LangConfig;
}
interface ConfigWithFolder extends ConfigBase {
    logFolder?: string;
    logFile?: never;
}
interface ConfigWithFile extends ConfigBase {
    logFolder?: never;
    logFile?: string;
}
type Config = ConfigWithFolder | ConfigWithFile;
interface ConstructedConfig {
    logLevel: number;
    logFolder?: string;
    logFile?: string;
    timestamp: boolean;
    lang: LangConfig;
}
declare class MooLogger {
    config: ConstructedConfig;
    logFile?: WriteStream;
    /**
     * Represents MooLogger, a simple and beautiful logger.
     * @param {Number} config.logLevel
     */
    constructor(config?: Config);
    /**
     * Get colored timestamp of now time.
     * @private
     */
    getTimestamp(): string;
    /**
     * Get text-only timestamp of now time.
     * @private
     */
    getPureTimestamp(): string;
    /**
     * Prints a debug message.
     * @param {any[]} data Data to write into logger.
     */
    debug(...data: any[]): void;
    /**
     * Prints an info message.
     * @param {any[]} data Data to write into logger.
     */
    info(...data: any[]): void;
    /**
     * Prints a warning message.
     * @param {any[]} data Data to write into logger.
     */
    warn(...data: any[]): void;
    /**
     * Prints an error message.
     * @param {any[]} data Data to write into logger.
     * If the Error object is put at first, it will be logged as a stack trace string.
     */
    error(...data: any[]): void;
    /**
     * Prints an fatal error message.
     * @param {any[]} data Data to write into logger.
     * If the Error object is put at first, it will be logged as a stack trace string.
     */
    fatal(...data: any[]): void;
}
export { MooLogger, LogLevel };
export type { Config, LangConfig };
//# sourceMappingURL=index.d.ts.map
import { WriteStream } from "fs";

const chalk = require("chalk")
const moment = require("moment")
const fs = require("node:fs");
const util = require("is-what");

enum LogLevel {
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

class MooLogger {
  config: ConstructedConfig;
  logFile?: WriteStream;

  /**
   * Represents MooLogger, a simple and beautiful logger.
   * @param {Number} config.logLevel
   */
  constructor(config?: Config) {
    let { logLevel, logFolder, logFile, timestamp, lang } = config || {};

    if (!logLevel && logLevel !== 0)
      logLevel = 4

    if (!timestamp)
      timestamp = true
    
    const defaultLang = {
      debug: "DEBUG",
      info: "INFO",
      warn: "WARN",
      error: "ERROR",
      fatal: "FATAL",
    }
    lang = { ...defaultLang, ...(lang || {}) }
    
    if (!fs.existsSync(logFolder)) {
      fs.mkdirSync(logFolder, { recursive: true })
    }

    if (logFolder)
      this.logFile = fs.createWriteStream(
        `${logFolder}/${moment().unix()}.log`,
        {
          flags: "a",
        }
      )
    else if (logFile)
      this.logFile = fs.createWriteStream(logFile, {
        flags: "a"
      })

    this.config = { logLevel, logFolder, logFile, timestamp, lang }
  }

  /**
   * Get colored timestamp of now time.
   * @private
   */
  getTimestamp(): string {
    return this.config.timestamp
      ? chalk.cyanBright(this.getPureTimestamp())
      : ""
  }

  /**
   * Get text-only timestamp of now time.
   * @private
   */
  getPureTimestamp(): string {
    return this.config.timestamp
      ? moment().format("YYYY/MM/DD HH:mm:ss ")
      : ""
  }

  /**
   * Prints a debug message.
   * @param {any[]} data Data to write into logger.
   */
  debug(...data: any[]) {
    data.unshift(this.getTimestamp() + chalk.bgGreenBright(` ${this.config.lang.debug} `))
    if (this.config.logLevel >= 5)
      console.debug(...data)
  
    data.shift()
    this.logFile?.write(`[${this.getPureTimestamp()}${this.config.lang.debug}] ${String(data)}\n`)
  }

  /**
   * Prints an info message.
   * @param {any[]} data Data to write into logger.
   */
  info(...data: any[]) {
    data.unshift(this.getTimestamp() + chalk.bgBlueBright(` ${this.config.lang.info} `))
    if (this.config.logLevel >= 4)
      console.info(...data)

    data.shift()
    this.logFile?.write(`[${this.getPureTimestamp()}${this.config.lang.info}] ${String(data)}\n`)
  }

  /**
   * Prints a warning message.
   * @param {any[]} data Data to write into logger.
   */
  warn(...data: any[]) {
    data.unshift(this.getTimestamp() + chalk.bgYellowBright(` ${this.config.lang.warn} `))
    if (this.config.logLevel >= 3)
      console.warn(...data)

    data.shift()
    this.logFile?.write(`[${this.getPureTimestamp()}${this.config.lang.warn}] ${String(data)}\n`)
  }

  /**
   * Prints an error message.
   * @param {any[]} data Data to write into logger.
   * If the Error object is put at first, it will be logged as a stack trace string.
   */
  error(...data: any[]) {
    data.unshift(this.getTimestamp() + chalk.bgRedBright(` ${this.config.lang.error} `))
    let original;
  
    if (util.isError(data[1])) {
      original = data[1]
      data[1] = data[1].stack
        .replaceAll("at", chalk.bold.gray("at"))
        .replaceAll("(", "(\x1B[33m")
        .replaceAll(")", "\x1B[39m)")
    }
  
    if (this.config.logLevel >= 2)
      console.error(...data)

    data.shift()

    if (util.isError(original)) {
      data[0] = original
    }

    this.logFile?.write(
      `[${this.getPureTimestamp()}${this.config.lang.error}] ${
        util.isError(data[0]) ? data[0].stack : String(data)
      }\n`
    )
  }

  /**
   * Prints an fatal error message.
   * @param {any[]} data Data to write into logger.
   * If the Error object is put at first, it will be logged as a stack trace string.
   */
  fatal(...data: any[]) {
    data.unshift(this.getTimestamp() + chalk.bgRed(` ${this.config.lang.fatal} `))
    let original;

    if (util.isError(data[1])) {
      original = data[1]
      data[1] = data[1].stack
        .replaceAll("at", chalk.bold.gray("at"))
        .replaceAll("(", "(\x1B[33m")
        .replaceAll(")", "\x1B[39m)")
    }
    if (this.config.logLevel >= 2)
      console.error(...data)

    data.shift()
    if (util.isError(original)) {
      data[0] = original
    }

    this.logFile?.write(
      `[${this.getPureTimestamp()}${this.config.lang.fatal}] ${
        util.isError(data[0]) ? data[0].stack : String(data)
      }\n`
    )
  }
}

export { MooLogger, LogLevel };
export type { Config, LangConfig };
const chalk = require("chalk")
const moment = require("moment")
const fs = require("node:fs")
const util = require("is-what")
class MooLogger {
  /**
   * This is the constructor of the MooLogger class.
   * @param {Number} config.logLevel
   * @param {String} config.logFolder
   * @param {Boolean} config.timestamp
   */
  constructor(
    config = {
      logLevel: 4,
      logFolder: "logs",
      timestamp: true,
    }
  ) {
    this.config = config
    if (this.config.logLevel == null) config.logLevel = 4
    if (this.config.logFolder == null) config.logFolder = "logs"
    if (this.config.timestamp == null) config.timestamp = true
    if (!fs.existsSync(this.config.logFolder)) {
      fs.mkdirSync(this.config.logFolder, { recursive: true })
    }
    this.logFile = fs.createWriteStream(
      `${this.config.logFolder}/${moment().unix()}.log`,
      {
        flags: "a",
      }
    )
  }
  /**
   * Get colored timestamp of now time.
   * @private
   */
  getTimestamp() {
    return this.config.timestamp == true
      ? chalk.cyanBright(this.getPureTimestamp())
      : ""
  }
  /**
   * Get text-only timestamp of now time.
   * @private
   */
  getPureTimestamp() {
    return this.config.timestamp == true
      ? moment().format("YYYY/MM/DD HH:mm:ss ")
      : ""
  }
  /**
   * Prints a debug message.
   * @param {any} data Data to write into logger.
   */
  debug(...data) {
    data.unshift(this.getTimestamp() + chalk.bgGreenBright(" DEBUG "))
    if (this.config.logLevel >= 5) console.debug(...data)
    data.shift()
    this.logFile.write(`[${this.getPureTimestamp()}DEBUG] ${String(data)}\n`)
  }
  /**
   * Prints an info message.
   * @param {any} data Data to write into logger.
   */
  info(...data) {
    data.unshift(this.getTimestamp() + chalk.bgBlueBright(" INFO "))
    if (this.config.logLevel >= 4) console.info(...data)
    data.shift()
    this.logFile.write(`[${this.getPureTimestamp()}INFO] ${String(data)}\n`)
  }
  /**
   * Prints a warning message.
   * @param {any} data Data to write into logger.
   */
  warn(...data) {
    data.unshift(this.getTimestamp() + chalk.bgYellowBright(" WARN "))
    if (this.config.logLevel >= 3) console.warn(...data)
    data.shift()
    this.logFile.write(`[${this.getPureTimestamp()}WARN] ${String(data)}\n`)
  }
  /**
   * Prints an error message.
   * @param {any} data Data to write into logger.
   * I suggest putting Error object at the first parameter so it will be logged as a stack trace string.
   */
  error(...data) {
    data.unshift(this.getTimestamp() + chalk.bgRedBright(" ERROR "))
    var original
    if (util.isError(data[1])) {
      original = data[1]
      data[1] = data[1].stack
        .replaceAll("at", chalk.bold.gray("at"))
        .replaceAll("(", "(\x1B[33m")
        .replaceAll(")", "\x1B[39m)")
    }
    if (this.config.logLevel >= 2) console.error(...data)
    data.shift()
    if (util.isError(original)) {
      data[0] = original
    }
    this.logFile.write(
      `[${this.getPureTimestamp()}ERROR] ${
        util.isError(data[0]) ? data[0].stack : String(data)
      }\n`
    )
  }
  /**
   * Prints an fatal error message.
   * @param {any} data Data to write into logger.
   * I suggest putting Error object at the first parameter so it will be logged as a stack trace string.
   */
  fatal(...data) {
    data.unshift(this.getTimestamp() + chalk.bgRed(" FATAL "))
    var original
    if (util.isError(data[1])) {
      original = data[1]
      data[1] = data[1].stack
        .replaceAll("at", chalk.bold.gray("at"))
        .replaceAll("(", "(\x1B[33m")
        .replaceAll(")", "\x1B[39m)")
    }
    if (this.config.logLevel >= 2) console.error(...data)
    data.shift()
    if (util.isError(original)) {
      data[0] = original
    }
    this.logFile.write(
      `[${this.getPureTimestamp()}FATAL] ${
        util.isError(data[0]) ? data[0].stack : String(data)
      }\n`
    )
  }
}
module.exports = MooLogger

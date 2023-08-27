# MooLogger

![Version](https://img.shields.io/github/package-json/v/LittleCow-moo/MooLogger?logo=github&style=for-the-badge)
![License](https://img.shields.io/github/license/LittleCow-moo/MooLogger?style=for-the-badge&logo=github)
![PRs](https://img.shields.io/github/issues-pr-raw/LittleCow-moo/MooLogger?logo=github&style=for-the-badge)
[![Prettier](https://img.shields.io/badge/Code_Style-Prettier-ff69b4.svg?style=for-the-badge)](https://github.com/prettier/prettier)

A simple, beautiful, and easy-to-use logger!

# Getting Started

It's pretty straightforward:

```js
const { MooLogger } = require("moologger")

const logger = new MooLogger()
logger.info("Hello world!")
```

Configuration can be done in the constructor:

```js
new MooLogger({
  logLevel: 4,
  /*
      0: disabled,
      1: fatal,
      2: error,
      3: warn,
      4: info,
      5: debug,
      default: 4
    */
  logFolder: "path/to/folder", // The directory where the logger stores logs
  timestamp: true, // Display timestamp? (true by default)
  lang: {
    debug: "DEBUG",
    info: "INFO",
    warn: "WARN",
    error: "ERROR",
    fatal: "FATAL",
  }, // You can customize badge strings like this
})
```

# Available functions

```js
logger.debug(...data)
logger.info(...data)
logger.warn(...data)
logger.error(...data)
logger.fatal(...data)
```

It just works:tm:, like the built-in `console`.

# Examples

The most simple usage you can possibly think of:

```js
const logger = new MooLogger()

// info & debug
logger.info("Important", "data")
logger.debug("$ Pay Taxes $")

// warn
logger.warn(
  "`--global`, `--local` are deprecated.",
  {
    reason: "I'm telling you anyway."
  }
)

// error & fatal
const error = new Error("I don't know what happened")
logger.error(error, "This error was not my fault!")

try {
  (function shake() {shake()})()
} catch (earthquakeError) {
  logger.fatal(earthquakeError, "EARTHQUAKE DETECTED! STOPPING PROGRAM...")
}
```

Setting the log level — you can think of it as "filtering" levels.

```js
const { LogLevel } = require("moologger")

const logger = new MooLogger({
  /*
    {
      DISABLED: 0,
      FATAL: 1,
      ERROR: 2,
      WARN: 3,
      INFO: 4,
      DEBUG: 5
    }
  */

  logLevel: LogLevel.WARN
  // levels below WARN (INFO, DEBUG) won't be logged
})

logger.warn("Hello!") // logged
logger.fatal("ANOTHER EARTHQUAKE!") // logged
logger.info("Paid taxes") // not logged
```

You can set the badge text that corresponds to the log level.

If a field is not set, it'll be replaced with the default one.

```js
const lang = {
  /* It's just like i18n */
  debug: "Bug Killer",
  info: "πληροφορίες",
  warn: "uyarı",
  error: "ข้อผิดพลาด",
  fatal: "致命的な誤り"
}
```

A log folder (directory), as the name implies, it stores logs from MooLogger. Log files are named as the current timestamp.

If not set, MooLogger will disable this feature.

```js
new MooLogger({
  logFolder: "path/to/dir"
})
```

If you prefer logging into one fixed (singular) file, you can use `logFile` instead.

Same as `logFolder`, if not set, MooLogger will disable this feature.

```js
new MooLogger({
  logFile: "my.log"
})
```

Note that DO NOT set `logFolder` and `logFile` at the same time, you have to choose between them. Life is so cruel!

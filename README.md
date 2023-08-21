# MooLogger

![Version](https://img.shields.io/github/package-json/v/LittleCow-moo/MooLogger?logo=github&style=for-the-badge)
![License](https://img.shields.io/github/license/LittleCow-moo/MooLogger?style=for-the-badge&logo=github)
![PRs](https://img.shields.io/github/issues-pr-raw/LittleCow-moo/MooLogger?logo=github&style=for-the-badge)
[![Prettier](https://img.shields.io/badge/Code_Style-Prettier-ff69b4.svg?style=for-the-badge)](https://github.com/prettier/prettier)

A simple, beautiful, and easy-to-use logger!

# Getting Started

It's pretty straightforward:

```js
const MooLogger = require("moologger")
const logger = new MooLogger()
logger.info("Hello world!")
```

Some things can be configured in the constructor:

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
  logFolder: "path/to/folder", // The folder path where logger will store logs, default: logs
  timestamp: true, // Should it display timestamp? default: true
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

It works just like the built-in `console` object!

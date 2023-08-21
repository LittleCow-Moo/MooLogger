# MooLogger

![Version](https://img.shields.io/github/package-json/v/LittleCow-moo/MooLogger?logo=github&style=for-the-badge) ![License](https://img.shields.io/github/license/LittleCow-moo/MooLogger?style=for-the-badge&logo=github) ![PRs](https://img.shields.io/github/issues-pr-raw/LittleCow-moo/MooLogger?logo=github&style=for-the-badge) [![Prettier](https://img.shields.io/badge/Code_Style-Prettier-ff69b4.svg?style=for-the-badge)](https://github.com/prettier/prettier)

A simple, beautiful and easy to use logger!

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
      default: true
    */
  logFolder: "path/to/folder", // default: logs
  timestamp: true, // default: true
})
```

# Available functions

`logger.debug(...data)`
`logger.info(...data)`
`logger.warn(...data)`
`logger.error(...data)`
`logger.fatal(...data)`
It works just like built-in `console` object!

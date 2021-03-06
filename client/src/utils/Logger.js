// The different levels logs can be printed in
const LOG_LEVEL = {
    INFO: "INFO",
    DEBUG: "DEBUG",
    WARN: "WARN",
    ERROR: "ERROR",
};

// The different log levels for the console
const CONSOLE_LOG = {
    INFO: console.log,
    DEBUG: console.log,
    WARN: console.warn,
    ERROR: console.error,
};

// The different log levels the user can set - used to prevent e.g. DEBUG statements printing in INFO mode
const SETTABLE_LOG_LEVELS = [LOG_LEVEL.INFO, LOG_LEVEL.DEBUG];

// Whether the environment is in produciton or not
const IS_PRODUCTION = process.env.NODE_ENV === "production";

// The current log level of the system
let logLevel = LOG_LEVEL.DEBUG;

/** USAGE INFO
 *  ----------
 * 1. Import:
 *      > import Logger from "./log/Logger";
 *
 * 2. Set log level:
 *      > Logger.setLogLevel(<lvl>);
 *
 * 3. Get log level:
 *      > Logger.getLogLevel();
 *
 * 4. Logging:
 *      > Logger.info(<msg>);
 *          Use this for general messages about the system
 *      > Logger.debug(<msg>);
 *          Use this for more detailed messages that might be needed for debugging
 *      > Logger.warn(<msg>);
 *          Use this for warnings
 *      > Logger.error(<msg>);
 *          Use this for errors, e.g. after catching an error. Although, ideally caught errors should be handled gracefully
 *
 */
const Logger = {
    /**
     * Sets the log level. The log level should only be set once at the start of the program, e.g. in index.js.
     *
     * @param {string} lvl Should be either 'INFO' or 'DEBUG'
     */
    setLogLevel: (lvl) => {
        logLevel = SETTABLE_LOG_LEVELS.includes(lvl) ? lvl : invalidLogLevel(lvl);
        Logger.info(`Log level set to: ${logLevel}`);
    },

    getLogLevel: () => {
        return logLevel;
    },

    info: (msg) => {
        log(msg, LOG_LEVEL.INFO);
    },

    debug: (msg) => {
        logLevel === LOG_LEVEL.DEBUG && log(msg, LOG_LEVEL.DEBUG);
    },

    warn: (msg) => {
        log(msg, LOG_LEVEL.WARN);
    },

    error: (msg) => {
        log(msg, LOG_LEVEL.ERROR);
    },
};

const invalidLogLevel = (lvl) => {
    Logger.info(`Invalid log level: ${lvl} - it should be one of ${SETTABLE_LOG_LEVELS.join(", ")}`);

    // Set the log level to the most detailed one
    return LOG_LEVEL.DEBUG;
};

const log = (msg, lvl) => {
    // Format the date nicely
    const now = "[" + new Date().toISOString() + "]";

    // Format the log level nicely
    const lvlFormatted = "[" + (lvl.length === 4 ? " " : "") + lvl + "] ";

    // Log the message
    !IS_PRODUCTION && CONSOLE_LOG[lvl](now + lvlFormatted + msg);
};

export default Logger;

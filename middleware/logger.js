const fs = require('fs');
const path = require('path');

const LOGS_DIR = path.join(__dirname, '..', 'logs');

// Ensure logs directory exists
if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR, { recursive: true });
}

// Get current log file path
function getLogFilePath() {
    const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    return path.join(LOGS_DIR, `access-${date}.log`);
}

// Format log entry
function formatLogEntry(req, res, duration) {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl || req.url;
    const status = res.statusCode;
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';
    const user = req.session?.username || 'anonymous';
    
    return {
        timestamp,
        method,
        url,
        status,
        duration: `${duration}ms`,
        ip,
        user,
        userAgent
    };
}

// Console color codes
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    cyan: '\x1b[36m',
    gray: '\x1b[90m'
};

// Get status color
function getStatusColor(status) {
    if (status >= 500) return colors.red;
    if (status >= 400) return colors.yellow;
    if (status >= 300) return colors.cyan;
    return colors.green;
}

// Logger middleware
function logger(req, res, next) {
    const startTime = Date.now();
    
    // Capture the response finish event
    res.on('finish', () => {
        const duration = Date.now() - startTime;
        const logEntry = formatLogEntry(req, res, duration);
        
        // Console output (colorized)
        const statusColor = getStatusColor(res.statusCode);
        const methodPad = req.method.padEnd(7);
        const statusPad = String(res.statusCode).padStart(3);
        
        console.log(
            `${colors.gray}[${logEntry.timestamp}]${colors.reset} ` +
            `${colors.cyan}${methodPad}${colors.reset} ` +
            `${logEntry.url.padEnd(40)} ` +
            `${statusColor}${statusPad}${colors.reset} ` +
            `${colors.gray}${duration}ms${colors.reset} ` +
            `${colors.gray}(${logEntry.user})${colors.reset}`
        );
        
        // Write to file
        const logLine = JSON.stringify(logEntry) + '\n';
        fs.appendFile(getLogFilePath(), logLine, (err) => {
            if (err) console.error('Failed to write log:', err);
        });
    });
    
    next();
}

// Export additional logging functions
logger.info = (message, meta = {}) => {
    const entry = {
        timestamp: new Date().toISOString(),
        level: 'INFO',
        message,
        ...meta
    };
    console.log(`${colors.green}[INFO]${colors.reset} ${message}`);
    fs.appendFile(getLogFilePath(), JSON.stringify(entry) + '\n', () => {});
};

logger.warn = (message, meta = {}) => {
    const entry = {
        timestamp: new Date().toISOString(),
        level: 'WARN',
        message,
        ...meta
    };
    console.log(`${colors.yellow}[WARN]${colors.reset} ${message}`);
    fs.appendFile(getLogFilePath(), JSON.stringify(entry) + '\n', () => {});
};

logger.error = (message, meta = {}) => {
    const entry = {
        timestamp: new Date().toISOString(),
        level: 'ERROR',
        message,
        ...meta
    };
    console.log(`${colors.red}[ERROR]${colors.reset} ${message}`);
    fs.appendFile(getLogFilePath(), JSON.stringify(entry) + '\n', () => {});
};

module.exports = logger;

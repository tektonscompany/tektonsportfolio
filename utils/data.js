const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const CONTENT_FILE = path.join(DATA_DIR, 'content.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readJSON(file) {
    try {
        return JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch (err) {
        console.error(`Error reading ${file}:`, err.message);
        throw err;
    }
}

function writeJSON(file, data) {
    try {
        fs.writeFileSync(file, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error(`Error writing ${file}:`, err.message);
        throw err;
    }
}

module.exports = {
    readJSON,
    writeJSON,
    CONTENT_FILE,
    USERS_FILE,
    DATA_DIR
};

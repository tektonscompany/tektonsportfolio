const bcrypt = require('bcryptjs');
const { readJSON, writeJSON, USERS_FILE } = require('./data');

// Auth middleware
function requireAuth(req, res, next) {
    if (req.session && req.session.authenticated) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}

// Initialize admin password on first run
async function initializeAdmin() {
    try {
        const users = readJSON(USERS_FILE);
        
        // Check if password is already hashed
        if (users.admin.password.startsWith('$2a$') || users.admin.password.startsWith('$2b$')) {
            console.log('Admin account ready.');
            return;
        }
        
        // Hash the default password
        users.admin.password = await bcrypt.hash('admin123', 10);
        writeJSON(USERS_FILE, users);
        console.log('Admin password initialized. Default: admin / admin123');
    } catch (err) {
        console.error('Failed to initialize admin:', err.message);
        
        // Create default users file if it doesn't exist
        const defaultUsers = {
            admin: {
                username: 'admin',
                password: await bcrypt.hash('admin123', 10)
            }
        };
        writeJSON(USERS_FILE, defaultUsers);
        console.log('Created default admin account: admin / admin123');
    }
}

module.exports = {
    requireAuth,
    initializeAdmin
};

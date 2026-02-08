const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { readJSON, writeJSON, USERS_FILE } = require('../utils/data');
const logger = require('../middleware/logger');

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const users = readJSON(USERS_FILE);
        
        if (users.admin.username === username) {
            const valid = await bcrypt.compare(password, users.admin.password);
            if (valid) {
                req.session.authenticated = true;
                req.session.username = username;
                logger.info(`User logged in: ${username}`, { ip: req.ip });
                return res.json({ success: true });
            }
        }
        
        logger.warn(`Failed login attempt for: ${username}`, { ip: req.ip });
        res.status(401).json({ error: 'Invalid credentials' });
    } catch (err) {
        logger.error('Login error', { error: err.message });
        res.status(500).json({ error: 'Server error' });
    }
});

// Logout
router.post('/logout', (req, res) => {
    const username = req.session.username;
    req.session.destroy((err) => {
        if (err) {
            logger.error('Logout error', { error: err.message });
            return res.status(500).json({ error: 'Logout failed' });
        }
        logger.info(`User logged out: ${username}`);
        res.json({ success: true });
    });
});

// Check auth status
router.get('/status', (req, res) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
    res.json({ 
        authenticated: !!req.session.authenticated,
        username: req.session.username || null,
        ip: ip.replace('::ffff:', '') // Clean IPv4-mapped IPv6
    });
});

// Change password
router.post('/change-password', async (req, res) => {
    if (!req.session.authenticated) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const { currentPassword, newPassword } = req.body;
    
    try {
        const users = readJSON(USERS_FILE);
        
        const valid = await bcrypt.compare(currentPassword, users.admin.password);
        if (!valid) {
            logger.warn('Password change failed - wrong current password', { user: req.session.username });
            return res.status(401).json({ error: 'Current password is incorrect' });
        }
        
        users.admin.password = await bcrypt.hash(newPassword, 10);
        writeJSON(USERS_FILE, users);
        
        logger.info('Password changed successfully', { user: req.session.username });
        res.json({ success: true, message: 'Password changed successfully' });
    } catch (err) {
        logger.error('Password change error', { error: err.message });
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;

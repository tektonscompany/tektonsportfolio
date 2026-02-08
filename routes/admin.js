const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { requireAuth } = require('../utils/auth');
const logger = require('../middleware/logger');

const LOGS_DIR = path.join(__dirname, '..', 'logs');

// Get logs list (protected)
router.get('/logs', requireAuth, (req, res) => {
    try {
        if (!fs.existsSync(LOGS_DIR)) {
            return res.json({ logs: [] });
        }
        
        const files = fs.readdirSync(LOGS_DIR)
            .filter(f => f.endsWith('.log'))
            .sort()
            .reverse();
        
        res.json({ logs: files });
    } catch (err) {
        logger.error('Failed to list logs', { error: err.message });
        res.status(500).json({ error: 'Failed to list logs' });
    }
});

// Get specific log file (protected)
router.get('/logs/:filename', requireAuth, (req, res) => {
    try {
        const filename = req.params.filename;
        
        // Security check - prevent directory traversal
        if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
            return res.status(400).json({ error: 'Invalid filename' });
        }
        
        const filepath = path.join(LOGS_DIR, filename);
        
        if (!fs.existsSync(filepath)) {
            return res.status(404).json({ error: 'Log file not found' });
        }
        
        const content = fs.readFileSync(filepath, 'utf8');
        const lines = content.trim().split('\n').filter(Boolean);
        
        // Parse JSON lines
        const entries = lines.map(line => {
            try {
                return JSON.parse(line);
            } catch {
                return { raw: line };
            }
        });
        
        // Support pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 100;
        const start = (page - 1) * limit;
        const end = start + limit;
        
        res.json({
            filename,
            total: entries.length,
            page,
            limit,
            entries: entries.slice(start, end).reverse() // Most recent first
        });
    } catch (err) {
        logger.error('Failed to read log', { error: err.message });
        res.status(500).json({ error: 'Failed to read log' });
    }
});

// Get recent logs (protected) - last N entries from today
router.get('/logs-recent', requireAuth, (req, res) => {
    try {
        const date = new Date().toISOString().split('T')[0];
        const filename = `access-${date}.log`;
        const filepath = path.join(LOGS_DIR, filename);
        
        if (!fs.existsSync(filepath)) {
            return res.json({ entries: [] });
        }
        
        const content = fs.readFileSync(filepath, 'utf8');
        const lines = content.trim().split('\n').filter(Boolean);
        
        const limit = parseInt(req.query.limit) || 50;
        const entries = lines.slice(-limit).map(line => {
            try {
                return JSON.parse(line);
            } catch {
                return { raw: line };
            }
        }).reverse();
        
        res.json({ entries });
    } catch (err) {
        logger.error('Failed to read recent logs', { error: err.message });
        res.status(500).json({ error: 'Failed to read logs' });
    }
});

// Clear old logs (protected) - keep last N days
router.delete('/logs/cleanup', requireAuth, (req, res) => {
    try {
        const daysToKeep = parseInt(req.query.days) || 30;
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
        
        if (!fs.existsSync(LOGS_DIR)) {
            return res.json({ deleted: 0 });
        }
        
        const files = fs.readdirSync(LOGS_DIR).filter(f => f.endsWith('.log'));
        let deleted = 0;
        
        files.forEach(file => {
            // Extract date from filename (access-YYYY-MM-DD.log)
            const match = file.match(/access-(\d{4}-\d{2}-\d{2})\.log/);
            if (match) {
                const fileDate = new Date(match[1]);
                if (fileDate < cutoffDate) {
                    fs.unlinkSync(path.join(LOGS_DIR, file));
                    deleted++;
                }
            }
        });
        
        logger.info(`Cleaned up ${deleted} old log files`, { user: req.session.username });
        res.json({ success: true, deleted });
    } catch (err) {
        logger.error('Failed to cleanup logs', { error: err.message });
        res.status(500).json({ error: 'Failed to cleanup logs' });
    }
});

module.exports = router;

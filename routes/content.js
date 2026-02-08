const express = require('express');
const router = express.Router();
const { readJSON, writeJSON, CONTENT_FILE } = require('../utils/data');
const { requireAuth } = require('../utils/auth');
const logger = require('../middleware/logger');

// Get all content (public)
router.get('/', (req, res) => {
    try {
        const content = readJSON(CONTENT_FILE);
        res.json(content);
    } catch (err) {
        logger.error('Failed to read content', { error: err.message });
        res.status(500).json({ error: 'Failed to load content' });
    }
});

// Get specific section (public)
router.get('/:section', (req, res) => {
    try {
        const content = readJSON(CONTENT_FILE);
        const section = content[req.params.section];
        
        if (section === undefined) {
            return res.status(404).json({ error: 'Section not found' });
        }
        
        res.json(section);
    } catch (err) {
        logger.error('Failed to read section', { section: req.params.section, error: err.message });
        res.status(500).json({ error: 'Failed to load content' });
    }
});

// Update all content (protected)
router.put('/', requireAuth, (req, res) => {
    try {
        writeJSON(CONTENT_FILE, req.body);
        logger.info('Content updated (full)', { user: req.session.username });
        res.json({ success: true, message: 'Content updated successfully' });
    } catch (err) {
        logger.error('Failed to save content', { error: err.message });
        res.status(500).json({ error: 'Failed to save content' });
    }
});

// Update specific section (protected)
router.patch('/:section', requireAuth, (req, res) => {
    try {
        const content = readJSON(CONTENT_FILE);
        content[req.params.section] = req.body;
        writeJSON(CONTENT_FILE, content);
        
        logger.info(`Section updated: ${req.params.section}`, { user: req.session.username });
        res.json({ success: true, message: `${req.params.section} updated successfully` });
    } catch (err) {
        logger.error('Failed to update section', { section: req.params.section, error: err.message });
        res.status(500).json({ error: 'Failed to save content' });
    }
});

// Delete a section item (protected) - for ventures, arsenal, metrics
router.delete('/:section/:index', requireAuth, (req, res) => {
    try {
        const content = readJSON(CONTENT_FILE);
        const section = content[req.params.section];
        
        if (!Array.isArray(section)) {
            return res.status(400).json({ error: 'Section is not an array' });
        }
        
        const index = parseInt(req.params.index);
        if (isNaN(index) || index < 0 || index >= section.length) {
            return res.status(400).json({ error: 'Invalid index' });
        }
        
        section.splice(index, 1);
        writeJSON(CONTENT_FILE, content);
        
        logger.info(`Deleted item from ${req.params.section}[${index}]`, { user: req.session.username });
        res.json({ success: true, message: 'Item deleted successfully' });
    } catch (err) {
        logger.error('Failed to delete item', { error: err.message });
        res.status(500).json({ error: 'Failed to delete item' });
    }
});

// Add item to section (protected) - for ventures, arsenal, metrics
router.post('/:section', requireAuth, (req, res) => {
    try {
        const content = readJSON(CONTENT_FILE);
        
        if (!content[req.params.section]) {
            content[req.params.section] = [];
        }
        
        if (!Array.isArray(content[req.params.section])) {
            return res.status(400).json({ error: 'Section is not an array' });
        }
        
        content[req.params.section].push(req.body);
        writeJSON(CONTENT_FILE, content);
        
        logger.info(`Added item to ${req.params.section}`, { user: req.session.username });
        res.json({ success: true, message: 'Item added successfully' });
    } catch (err) {
        logger.error('Failed to add item', { error: err.message });
        res.status(500).json({ error: 'Failed to add item' });
    }
});

module.exports = router;

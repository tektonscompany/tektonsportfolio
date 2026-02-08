const express = require('express');
const session = require('express-session');
const path = require('path');
const logger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger); // Custom logging middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: process.env.SESSION_SECRET || 'tektons-secret-key-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

// Routes
const authRoutes = require('./routes/auth');
const contentRoutes = require('./routes/content');
const adminRoutes = require('./routes/admin');

app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api', adminRoutes);

// Serve main pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Initialize and start server
const { initializeAdmin } = require('./utils/auth');

initializeAdmin().then(() => {
    app.listen(PORT, () => {
        console.log(`
╔══════════════════════════════════════════════════════════╗
║                    TEKTŌNS PORTFOLIO                     ║
╠══════════════════════════════════════════════════════════╣
║  Website:  http://localhost:${PORT}                         ║
║  Admin:    http://localhost:${PORT}/admin.html              ║
║                                                          ║
║  Default Login:                                          ║
║    Username: admin                                       ║
║    Password: admin123                                    ║
║                                                          ║
║  Logging enabled - logs saved to /logs folder            ║
╚══════════════════════════════════════════════════════════╝
        `);
    });
});

module.exports = app;

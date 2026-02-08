/**
 * TEKTŌNS Portfolio - Dynamic Content Loader
 * Loads content from the CMS API and updates the page
 */

(async function() {
    try {
        const res = await fetch('/api/content');
        if (!res.ok) return; // Fail silently for static hosting
        
        const data = await res.json();
        
        // Determine current page
        const page = window.location.pathname.split('/').pop() || 'index.html';
        
        // Update common elements
        updateElement('.footer-tagline', data.site?.tagline);
        
        switch(page) {
            case 'index.html':
            case '':
                updateHomePage(data);
                break;
            case 'ecosystem.html':
                updateEcosystemPage(data);
                break;
            case 'arsenal.html':
                updateArsenalPage(data);
                break;
            case 'invest.html':
                updateInvestPage(data);
                break;
        }
    } catch (err) {
        // Silently fail - content will show static HTML
        console.log('CMS not available, using static content');
    }
})();

function updateElement(selector, content) {
    const el = document.querySelector(selector);
    if (el && content) el.innerHTML = content;
}

function updateHomePage(data) {
    // Hero section
    if (data.hero) {
        updateElement('.hero-badge', data.hero.badge);
        const titleLines = document.querySelectorAll('.title-line');
        if (titleLines[0]) titleLines[0].innerHTML = data.hero.title_line1;
        if (titleLines[1]) titleLines[1].innerHTML = data.hero.title_line2;
        updateElement('.hero-subtitle', data.hero.subtitle);
        updateElement('.hero-description', data.hero.description);
    }
    
    // About section
    if (data.about) {
        const aboutLabel = document.querySelector('.about .section-label');
        if (aboutLabel) aboutLabel.innerHTML = data.about.section_label;
        
        const aboutTitle = document.querySelector('.about .section-title');
        if (aboutTitle) aboutTitle.innerHTML = data.about.title;
        
        const aboutText = document.querySelector('.about-text');
        if (aboutText && data.about.paragraphs) {
            aboutText.innerHTML = data.about.paragraphs.map(p => `<p>${p}</p>`).join('');
        }
        
        updateElement('.sig-text', data.about.signature);
    }
}

function updateEcosystemPage(data) {
    if (!data.ventures) return;
    
    const stageOrder = ['planning', 'design', 'implementation', 'finished'];
    const stageLabels = { planning: 'Planning', design: 'Design', implementation: 'Implementation', finished: 'Finished' };
    
    data.ventures.forEach(venture => {
        const card = document.querySelector(`[data-venture="${venture.id}"]`);
        if (!card) return;
        
        // Scope all queries within the specific card
        const tag = card.querySelector('.card-tag');
        if (tag) tag.innerHTML = venture.tag;
        
        const title = card.querySelector('.card-title');
        if (title) title.innerHTML = venture.name;
        
        const tagline = card.querySelector('.card-tagline');
        if (tagline) tagline.innerHTML = `"${venture.tagline}"`;
        
        const desc = card.querySelector('.card-description');
        if (desc) desc.innerHTML = venture.description;
        
        // Update progress bar if stage is set
        if (venture.stage) {
            const progressEl = card.querySelector('.venture-progress');
            if (progressEl) {
                const stage = venture.stage.toLowerCase();
                const stageIndex = stageOrder.indexOf(stage);
                
                // Update stage label
                const stageLabel = progressEl.querySelector('.progress-stage');
                if (stageLabel) {
                    stageLabel.className = `progress-stage ${stage}`;
                    stageLabel.textContent = stageLabels[stage] || stage;
                }
                
                // Update progress fill
                const progressFill = progressEl.querySelector('.progress-fill');
                if (progressFill) {
                    progressFill.className = `progress-fill ${stage}`;
                }
                
                // Update stage dots
                const stageDots = progressEl.querySelectorAll('.stage-dot');
                const stageNames = progressEl.querySelectorAll('.stage-name');
                
                stageDots.forEach((dot, i) => {
                    dot.classList.remove('active', 'completed');
                    if (i < stageIndex) dot.classList.add('completed');
                    else if (i === stageIndex) dot.classList.add('active');
                });
                
                stageNames.forEach((name, i) => {
                    name.classList.remove('active', 'completed');
                    if (i < stageIndex) name.classList.add('completed');
                    else if (i === stageIndex) name.classList.add('active');
                });
            }
        }
    });
}

function updateArsenalPage(data) {
    if (!data.arsenal) return;
    
    const cards = document.querySelectorAll('.arsenal-card');
    data.arsenal.forEach((item, i) => {
        if (!cards[i]) return;
        
        const category = cards[i].querySelector('.arsenal-category');
        if (category) category.innerHTML = item.category;
        
        const name = cards[i].querySelector('.arsenal-name');
        if (name) name.innerHTML = item.name;
        
        const context = cards[i].querySelector('.arsenal-context');
        if (context) context.innerHTML = item.context;
    });
}

function updateInvestPage(data) {
    // Metrics
    if (data.metrics) {
        const metricCards = document.querySelectorAll('.metric-card');
        data.metrics.forEach((metric, i) => {
            if (!metricCards[i]) return;
            
            const value = metricCards[i].querySelector('.metric-value');
            if (value) {
                value.setAttribute('data-target', metric.value);
                if (metric.prefix) value.setAttribute('data-prefix', metric.prefix);
                if (metric.suffix) value.setAttribute('data-suffix', metric.suffix);
            }
            
            const label = metricCards[i].querySelector('.metric-label');
            if (label) label.innerHTML = metric.label;
        });
        
        // Re-trigger counter animation
        if (typeof initMetricCounters === 'function') {
            initMetricCounters();
        }
    }
    
    // Thesis
    if (data.thesis) {
        const thesisContent = document.querySelector('.thesis-content p');
        if (thesisContent) thesisContent.innerHTML = data.thesis;
    }
    
    // Contact
    if (data.contact) {
        const emailBtn = document.querySelector('a[href^="mailto:"]');
        if (emailBtn && data.contact.email) {
            emailBtn.href = `mailto:${data.contact.email}`;
            const emailSpan = emailBtn.querySelector('span');
            if (emailSpan) emailSpan.innerHTML = data.contact.email;
        }
        
        const linkedinBtn = document.querySelector('.contact-ctas a:nth-child(2)');
        if (linkedinBtn && data.contact.linkedin) {
            linkedinBtn.href = data.contact.linkedin;
        }
        
        const calendarBtn = document.querySelector('.contact-ctas a:nth-child(3)');
        if (calendarBtn && data.contact.calendar) {
            calendarBtn.href = data.contact.calendar;
        }
        
        const location = document.querySelector('.contact-note p');
        if (location && data.contact.location) {
            location.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${data.contact.location}`;
        }
    }
}

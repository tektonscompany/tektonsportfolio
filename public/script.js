/**
 * TEKTŌNS Portfolio - Interactive Scripts
 * Neo-Industrial Tech Aesthetic
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavigation();
    initSmoothScroll();
    initFadeAnimations();
    initMetricCounters();
    initParallax();
    initCardInteractions();
});

/**
 * Navigation Toggle (Mobile)
 */
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
    
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.8)';
            }
        });
    }
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Fade-in Animations on Scroll
 */
function initFadeAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add fade-in class to elements
    const animateElements = document.querySelectorAll(
        '.section-header, .bento-card, .arsenal-card, .metric-card, .about-content, .about-visual, .thesis-card, .methodology, .explanation-card'
    );
    
    animateElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.classList.add(`stagger-${(index % 6) + 1}`);
        observer.observe(el);
    });
}

/**
 * Metric Counter Animation
 */
function initMetricCounters() {
    const counters = document.querySelectorAll('.metric-value');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const prefix = element.dataset.prefix || '';
    const suffix = element.dataset.suffix || '';
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = target / steps;
    
    let current = 0;
    let step = 0;
    
    const timer = setInterval(() => {
        step++;
        current = Math.min(Math.round(increment * step), target);
        element.textContent = prefix + current + (suffix ? ' ' + suffix : '');
        
        if (step >= steps) {
            clearInterval(timer);
            element.textContent = prefix + target + (suffix ? ' ' + suffix : '');
        }
    }, stepDuration);
}

/**
 * Parallax Effects
 */
function initParallax() {
    const parallaxElements = document.querySelectorAll('.grid-lines, .data-streams, .topo-lines');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        parallaxElements.forEach(el => {
            const speed = 0.2;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

/**
 * Card Hover Interactions
 */
function initCardInteractions() {
    const cards = document.querySelectorAll('.bento-card, .arsenal-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Update glow position
            const glow = card.querySelector('.card-glow');
            if (glow) {
                glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(201, 162, 39, 0.15) 0%, transparent 70%)`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const glow = card.querySelector('.card-glow');
            if (glow) {
                glow.style.background = 'radial-gradient(circle at 50% 0%, rgba(201, 162, 39, 0.1) 0%, transparent 70%)';
            }
        });
    });
    
    // Node tooltip interactions
    const nodes = document.querySelectorAll('.node');
    nodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
            const label = node.dataset.label;
            if (label) {
                node.setAttribute('title', label);
            }
        });
    });
}

/**
 * Dynamic Year Update
 */
function updateYear() {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
}

/**
 * Typing Effect for Hero (Optional Enhancement)
 */
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const texts = ['Systems Architect', 'Venture Builder', 'Full-Stack Engineer', 'Financial Strategist'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

/**
 * Intersection Observer for Section Highlighting
 */
function initSectionHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

/**
 * Console Easter Egg
 */
console.log(`
%c◆ TEKTŌNS LTD
%cThe Accountant Who Codes

Building West Africa's AI Conglomerate
One Intelligence Core. Infinite Vectors.

Interested in investing? Contact: founder@tektons.io
`, 
'color: #C9A227; font-size: 24px; font-weight: bold;',
'color: #00FFD1; font-size: 14px;'
);

/**
 * Performance: Debounce scroll events
 */
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(() => {
    // Any scroll-dependent functions can be called here
}, 10));

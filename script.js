// ===== DATA: Projects (Enhanced) =====
const projectsData = {
    'lead-qualification': {
        title: 'Real Estate Lead AI',
        description: 'A fully autonomous HubSpot automation engine that scores, segments, and routes leads in real-time, replacing manual qualification teams.',
        tags: ['HubSpot', 'Zapier', 'WhatsApp API'],
        stats: [
            { label: 'Response Time', value: '-80%' },
            { label: 'Pipeline Value', value: '₦850M' },
            { label: 'Lead Accuracy', value: '95%' },
            { label: 'Viewings', value: '+40%' }
        ],
        overview: 'Real estate agents were wasting 4+ hours daily manually qualifying leads from forms. I built a smart scoring system with automatic WhatsApp notifications and agent assignment based on property value and location.',
        features: [
            'Real-time lead scoring algorithm based on budget and timeline',
            'Automatic WhatsApp notification (under 3 mins)',
            'Round-robin agent assignment for hot leads',
            'Nurture sequences for cold leads'
        ],
        media: [
            { type: 'image', src: 'Image/Projects/Lead Qualification/dashboard.webp', caption: 'Lead Scoring Dashboard' },
            { type: 'image', src: 'Image/Projects/Lead Qualification/workflow.webp', caption: 'Automation Workflow' }
        ]
    },
    'certificate-system': {
        title: 'Auto-Certificate Engine',
        description: 'No-code system generating and delivering 500+ personalized PDF certificates in minutes using Google Workspace and Make.com.',
        tags: ['Make.com', 'Google Slides', 'Gmail API'],
        stats: [
            { label: 'Time Saved', value: '98%' },
            { label: 'Throughput', value: '500/hr' },
            { label: 'Error Rate', value: '0%' },
            { label: 'Setup Time', value: '5min' }
        ],
        overview: 'Manually creating certificates took 4+ hours per batch. This solution automated the entire process: triggering from a spreadsheet, generating the PDF from a slide template, and emailing it with a custom message.',
        features: [
            'Batch processing for unlimited participants',
            'Dynamic text replacement in Google Slides',
            'Automatic PDF conversion and email attachment',
            'Delivery status tracking in Sheets'
        ],
        media: [
            { type: 'image', src: 'Image/Projects/Certificate/Template.webp', caption: 'Dynamic Template Design' }
        ]
    },
    'email-support': {
        title: 'AI Support Agent',
        description: 'MindStudio-powered AI agent that reads, understands, and drafts responses to customer support tickets with human-like accuracy.',
        tags: ['MindStudio', 'OpenAI', 'Gmail'],
        stats: [
            { label: 'Automation', value: '60%' },
            { label: 'Avg Response', value: '2min' },
            { label: 'Availability', value: '24/7' },
            { label: 'CSAT', value: '4.8/5' }
        ],
        overview: 'E-commerce support was overwhelmed. This agent connects to the inbox, analyzes intent, checks the knowledge base, and either drafts a response for approval or replies directly to common queries.',
        features: [
            'Intent classification (Refund, Status, FAQ)',
            'Sentiment analysis for escalation',
            'Context-aware response generation',
            'Learning loop from human corrections'
        ],
        media: [
            { type: 'image', src: 'Image/Projects/Email Support/workflow.webp', caption: 'Logic Flow' },
            { type: 'image', src: 'Image/Projects/Email Support/Agent response.webp', caption: 'AI Generated Response' }
        ]
    },
    'social-media': {
        title: 'Social Content Engine',
        description: 'End-to-end social media automation from ideation to publishing using AI and Airtable.',
        tags: ['ChatGPT', 'Airtable', 'Buffer'],
        stats: [
            { label: 'Time Saved', value: '70%' },
            { label: 'Output', value: '50 posts' },
            { label: 'Engagement', value: '3x' }
        ],
        overview: 'Content creation is a bottleneck. This system takes a topic, generates captions/hashtags via GPT-4, creates image prompts, creates the record in Airtable for approval, and schedules it.',
        features: [
            'AI Topic research & caption writing',
            'Approval workflow in Airtable',
            'Multi-platform formatting',
            'Automated Scheduling'
        ],
        media: [
            { type: 'image', src: 'Image/Projects/Social media content/Scheduling output.webp', caption: 'Content Calendar' }
        ]
    },
    'email-labeling': {
        title: 'Smart Inbox Router',
        description: 'n8n workflow using AI to classify and route high-volume incoming messages.',
        tags: ['n8n', 'Webhooks', 'NLP'],
        stats: [
            { label: 'Manual Work', value: '0%' },
            { label: 'Accuracy', value: '95%' },
            { label: 'Speed', value: 'Instant' }
        ],
        overview: 'Classifying hundreds of emails manually is wasteful. This n8n workflow intercepts messages, sends them to an LLM for categorization (Sales, Support, Spam), and routes them to the correct department.',
        features: [
            'Custom AI classification rules',
            'Slack notifications for high-priority leads',
            'Spam filtering',
            'Weekly reporting'
        ],
        media: [
            { type: 'image', src: 'Image/Projects/Email label assistant/Labeling sample.webp', caption: 'Classification Dashboard' },
            { type: 'image', src: 'Image/Projects/Email label assistant/workflow.webp', caption: 'n8n Workflow' }
        ]
    }
};

// ===== CORE FUNCTIONS =====

document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initSmoothScroll();
    initNavbar();
    initModal();
    initAnimations();
    updateYear();
});

// 1. Custom Magnetic Cursor
function initCursor() {
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');
    
    // Only on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    window.addEventListener("mousemove", (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows instantly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline follows with lag (done via CSS transition)
        cursorOutline.style.left = `${posX}px`;
        cursorOutline.style.top = `${posY}px`;
        
        // Interactive elements hover state
        const target = e.target;
        if (target.matches('a, button, .project-card, input, textarea')) {
            document.body.classList.add('hovering');
        } else {
            document.body.classList.remove('hovering');
        }
    });
}

// 2. Navbar & Mobile Menu
function initNavbar() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Mobile Toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Animate hamburger
        navToggle.classList.toggle('open');
    });

    // Close on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// 3. Mind-Blowing Modal Logic
function initModal() {
    const modal = document.getElementById('projectModal');
    const closeBtn = document.getElementById('modalClose');
    const contentWrapper = document.querySelector('.modal-content-wrapper');
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            const data = projectsData[projectId];
            if (data) {
                renderModalContent(data);
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Stop background scroll
            }
        });
    });

    // Close functions
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal-scroll-container')) {
            closeModal();
        }
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });

    function renderModalContent(data) {
        // Generate Stats HTML
        const statsHtml = data.stats.map(stat => `
            <div class="modal-stat-card">
                <span class="modal-stat-value">${stat.value}</span>
                <span class="modal-stat-label">${stat.label}</span>
            </div>
        `).join('');

        // Generate Media HTML (Handle Images)
        const mediaHtml = data.media.map(item => `
            <div class="modal-media-item">
                <img src="${item.src}" alt="${item.caption}" onerror="this.src='https://via.placeholder.com/800x600/101015/00f2ea?text=Visual+Loading...'">
            </div>
        `).join('');

        // Generate Features List
        const featuresHtml = data.features.map(feat => `<li>${feat}</li>`).join('');

        // Combine into Split Layout
        contentWrapper.innerHTML = `
            <div class="modal-grid">
                <div class="modal-visual-col">
                    ${mediaHtml}
                </div>
                <div class="modal-content-col">
                    <div class="modal-tags">
                        ${data.tags.map(tag => `<span style="background:rgba(255,255,255,0.1); padding:5px 10px; border-radius:15px; font-size:0.8rem;">${tag}</span>`).join('')}
                    </div>
                    <h2 class="modal-title">${data.title}</h2>
                    <p class="modal-desc">${data.description}</p>
                    
                    <div class="modal-stat-grid">
                        ${statsHtml}
                    </div>

                    <h3 class="modal-section-title">The Challenge & Solution</h3>
                    <p class="modal-desc">${data.overview}</p>

                    <h3 class="modal-section-title">Key Automations</h3>
                    <ul class="workflow-list">
                        ${featuresHtml}
                    </ul>

                    <div style="margin-top: 50px; text-align: center;">
                         <a href="#contact" onclick="document.getElementById('projectModal').classList.remove('active'); document.body.style.overflow='';" class="btn btn-primary">
                            Need something like this?
                         </a>
                    </div>
                </div>
            </div>
        `;
    }
}

// 4. Smooth Scroll for Anchors
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                // Offset for fixed navbar
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
}

// 5. Scroll Animations (Intersection Observer)
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const elements = document.querySelectorAll('.project-card, .bento-item, .section-header');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });
}

// 6. Update Year
function updateYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}
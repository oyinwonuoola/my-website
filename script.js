// ===== DOM Elements =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle?.querySelector('i');
const backToTopBtn = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const navbar = document.querySelector('.navbar');
const currentYear = document.getElementById('currentYear');

// ===== UTILITY: Throttle function for performance =====
function throttle(func, wait) {
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

// ===== Theme Management =====
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    if (themeIcon) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// ===== Mobile Navigation Toggle =====
function toggleMobileMenu() {
    navToggle?.classList.toggle('active');
    navMenu?.classList.toggle('active');
    document.body.style.overflow = navMenu?.classList.contains('active') ? 'hidden' : '';
}

// ===== Smooth Scrolling =====
function initSmoothScrolling() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            if (targetId.startsWith('#')) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navMenu?.classList.contains('active')) {
                    navToggle?.classList.remove('active');
                    navMenu?.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    updateActiveNavLink(targetId);
                }
            }
        });
    });
}

// ===== Active Nav Link Update =====
function updateActiveNavLink(targetId) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// ===== Scroll-based Effects =====
function initScrollEffects() {
    const handleScroll = throttle(() => {
        const scrollY = window.scrollY;
        
        // Navbar scroll effect
        if (scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
        
        // Back to top button visibility
        if (scrollY > 300) {
            backToTopBtn?.classList.add('visible');
        } else {
            backToTopBtn?.classList.remove('visible');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavOnScroll();
        
        // Update scroll progress
        updateScrollProgress();
    }, 100);
    
    window.addEventListener('scroll', handleScroll);
    
    // Back to top button
    backToTopBtn?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== Update Active Nav on Scroll =====
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            updateActiveNavLink(`#${sectionId}`);
        }
    });
}

// ===== Scroll Progress Indicator =====
function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    let progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 4px;
            background: linear-gradient(to right, var(--accent-red), var(--accent-orange));
            z-index: 1001;
            width: 0%;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
    }
    
    progressBar.style.width = scrolled + '%';
}

// ===== Parallax Scrolling Effect (disabled on mobile) =====
function initParallax() {
    if (window.innerWidth <= 768) return;
    
    const parallaxElements = document.querySelectorAll('.node, .stat-card');
    
    const handleParallax = throttle(() => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = element.dataset.rate || 0.5;
            const offset = scrolled * rate;
            
            if (element.classList.contains('node')) {
                element.style.transform = `translateY(${offset * 0.2}px)`;
            } else if (element.classList.contains('stat-card')) {
                element.style.transform = `translateY(${offset * 0.1}px)`;
            }
        });
    }, 100);
    
    window.addEventListener('scroll', handleParallax);
}

// ===== Form Handling (Real Email Integration) =====
function initContactForm() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalHTML = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Form will submit to FormSubmit.co
        // No preventDefault needed - let it submit naturally
        
        // Optional: Show success message after redirect
        setTimeout(() => {
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// ===== Animation on Scroll =====
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements to animate
    const elementsToAnimate = document.querySelectorAll('.project-card, .tool-item, .process-step, .stat-card');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===== Initialize Current Year =====
function initCurrentYear() {
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
}

// ===== Mouse Move Effect (Desktop only) =====
function initMouseMoveEffect() {
    if (window.innerWidth <= 768) return;
    
    const homeSection = document.querySelector('.home-section');
    if (!homeSection) return;
    
    homeSection.addEventListener('mousemove', throttle((e) => {
        const { clientX, clientY } = e;
        const { width, height, top, left } = homeSection.getBoundingClientRect();
        
        const xPos = (clientX - left) / width - 0.5;
        const yPos = (clientY - top) / height - 0.5;
        
        const nodes = document.querySelectorAll('.node');
        nodes.forEach((node, index) => {
            const multiplier = (index + 1) * 0.5;
            node.style.transform = `translate(${xPos * 20 * multiplier}px, ${yPos * 20 * multiplier}px)`;
        });
    }, 50));
}

// ===== Profile Picture Animation =====
function initProfilePictureAnimation() {
    const profilePicture = document.querySelector('.profile-picture');
    if (!profilePicture) return;
    
    // Add click effect
    profilePicture.addEventListener('click', () => {
        profilePicture.style.transform = 'scale(0.95)';
        setTimeout(() => {
            profilePicture.style.transform = '';
        }, 200);
    });
    
    // Add hover effect to experience items
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach(item => {
        const icon = item.querySelector('i');
        if (!icon) return;
        
        item.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2) rotate(5deg)';
            icon.style.color = 'var(--accent-orange)';
        });
        
        item.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1)';
            icon.style.color = 'var(--accent-red)';
        });
    });
}

// ===== Mobile Responsiveness Fixes =====
function initMobileFixes() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isMobile || isTouchDevice) {
        document.documentElement.classList.add('is-mobile');
        
        // Fix for iOS 100vh issue
        const setVH = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        
        setVH();
        window.addEventListener('resize', throttle(setVH, 200));
        
        // Disable intensive animations on mobile
        const nodes = document.querySelectorAll('.node');
        nodes.forEach(node => {
            node.style.animationDuration = '5s';
        });
    }
    
    // Prevent horizontal scrolling
    document.body.style.overflowX = 'hidden';
}

// ===== PROJECT LIGHTBOX SYSTEM =====
const projectsData = {
    'lead-qualification': {
        id: 'lead-qualification',
        title: 'Real Estate Lead Intelligence System',
        description: 'An intelligent HubSpot automation that scores, segments, and routes leads automatically based on budget, timeline, and property preferences.',
        problem: 'Real estate agents wasting hours manually qualifying leads from forms.',
        solution: 'Built a smart scoring system with automatic WhatsApp notifications and agent assignment.',
        stats: [
            { value: '80%', label: 'Faster Response Time' },
            { value: '40%', label: 'More Viewings Booked' },
            { value: '₦850M', label: 'Revenue Pipeline Created' },
            { value: '95%', label: 'Lead Accuracy' }
        ],
        techStack: [
            { name: 'HubSpot CRM', icon: 'fas fa-chart-line' },
            { name: 'Zapier', icon: 'fas fa-bolt' },
            { name: 'WhatsApp API', icon: 'fab fa-whatsapp' },
            { name: 'Slack/Teams', icon: 'fas fa-comments' }
        ],
        workflow: [
            { step: 1, title: 'Lead Submission', description: 'Client submits form with property preferences and budget' },
            { step: 2, title: 'Intelligent Scoring', description: 'System scores lead based on urgency, budget, and location' },
            { step: 3, title: 'Automated Assignment', description: 'Hot leads assigned to specialized agents instantly' },
            { step: 4, title: 'WhatsApp Notification', description: 'Personalized message sent within 3 minutes' },
            { step: 5, title: 'Follow-up Sequences', description: 'Automated follow-ups based on lead engagement' }
        ],
        media: [
        {
            type: 'image',
            src: 'Image/Projects/Lead Qualification/dashboard.webp',
            alt: 'Lead Scoring Dashboard',
            caption: 'Intelligent lead scoring interface'
        },
        {
            type: 'image',
            src: 'Image/Projects/Lead Qualification/workflow.webp',
            alt: 'Automation Workflow',
            caption: 'Visual workflow automation'
        },
        {
            type: 'image',
            src: 'Image/Projects/Lead Qualification/thumb.webp',
            alt: 'Lead Assignment',
            caption: 'Leads assignment to teams'
        }
        ],
        result: 'Transformed chaotic lead management into a seamless, automated system that responds in minutes instead of hours.',
        features: [
            'Real-time lead scoring algorithm',
            'Automatic WhatsApp notifications',
            'Agent assignment based on specialization',
            'Follow-up sequences for cold leads',
            'Real-time dashboard with analytics'
        ]
    },
    'certificate-system': {
        id: 'certificate-system',
        title: 'Automated Certificate Generation & Email System',
        description: 'A no-code system that automatically generates personalized certificates and sends customized emails to bootcamp participants.',
        problem: 'Manually creating and sending certificates taking 4+ hours per batch.',
        solution: 'Automated certificate generation with personalized emails in 5 minutes.',
        stats: [
            { value: '98%', label: 'Time Saved' },
            { value: '500+', label: 'Certificates/Hour' },
            { value: '100%', label: 'Accuracy Rate' },
            { value: '0', label: 'Manual Errors' }
        ],
        techStack: [
            { name: 'Google Sheets', icon: 'fab fa-google' },
            { name: 'Make.com', icon: 'fas fa-puzzle-piece' },
            { name: 'Google Slides', icon: 'fas fa-file-powerpoint' },
            { name: 'Gmail API', icon: 'fas fa-envelope' }
        ],
        workflow: [
            { step: 1, title: 'Data Input', description: 'Participant data imported from Google Sheets' },
            { step: 2, title: 'Template Processing', description: 'Personalized certificates generated using Slides templates' },
            { step: 3, title: 'PDF Conversion', description: 'Certificates automatically converted to PDF format' },
            { step: 4, title: 'Batch Processing', description: 'System processes hundreds of certificates simultaneously' },
            { step: 5, title: 'Delivery & Tracking', description: 'Certificates emailed with delivery confirmation' }
        ],
         media: [
        { 
            type: 'image', 
            src: 'Image/Projects/Certificate/Template.webp',
            alt: 'Certificate Template',
            caption: 'Custom certificate template design'
        },
        { 
            type: 'video',
            title: 'System Demo',
            description: 'Watch the automated process in action',
            url: 'https://youtu.be/4QiwEi9deIQ'
        }
        ],
        result: 'Reduced certificate processing time from 4 hours to 5 minutes with 100% accuracy.',
        features: [
            'Batch processing for unlimited certificates',
            'Customizable email templates',
            'Delivery tracking and analytics',
            'Error handling and retry logic',
            'Real-time progress monitoring'
        ]
    },
    'email-support': {
        id: 'email-support',
        title: 'AI Email Support & FAQ Agent',
        description: 'MindStudio-powered AI agent that automatically handles customer support emails with intelligent responses.',
        problem: 'E-commerce businesses overwhelmed with repetitive support emails.',
        solution: 'AI agent that understands context and provides accurate, helpful responses.',
        stats: [
            { value: '60%', label: 'Requests Automated' },
            { value: '2min', label: 'Average Response Time' },
            { value: '92%', label: 'Accuracy Rate' },
            { value: '24/7', label: 'Availability' }
        ],
        techStack: [
            { name: 'MindStudio', icon: 'fas fa-brain' },
            { name: 'OpenAI GPT', icon: 'fas fa-robot' },
            { name: 'Gmail API', icon: 'fas fa-envelope' },
            { name: 'Zapier', icon: 'fas fa-bolt' }
        ],
        workflow: [
            { step: 1, title: 'Email Reception', description: 'System monitors support inbox for new emails' },
            { step: 2, title: 'AI Analysis', description: 'AI analyzes email content and intent' },
            { step: 3, title: 'Response Generation', description: 'Personalized response created based on context' },
            { step: 4, title: 'Human Escalation', description: 'Complex issues flagged for human agents' },
            { step: 5, title: 'Learning & Improvement', description: 'System learns from corrections to improve' }
        ],
         media: [
        { 
            type: 'image', 
            src: 'Image/Projects/Email Support/workflow.webp',
            alt: 'Workflow Diagram',
            caption: 'Email processing workflow'
        },
        { 
            type: 'image', 
            src: 'Image/Projects/Email Support/Email query.webp',
            alt: 'Email Query',
            caption: 'Customer send a question'
        },
        { 
            type: 'image', 
            src: 'Image/Projects/Email Support/Zapier triggers mindstudio.webp',
            alt: 'Zap integration',
            caption: 'Zapier trigger workflow'
        },
        { 
            type: 'image', 
            src: 'Image/Projects/Email Support/Agent response.webp',
            alt: 'Email to Agent',
            caption: 'Zapier email to to fro'
        },
        { 
            type: 'image', 
            src: 'Image/Projects/Email Support/Draft response.webp',
            alt: 'Agent Draft',
            caption: 'Agent intelligence reponse'
        }
        ],
        result: 'Automated 60% of support requests, freeing up human agents for complex issues.',
        features: [
            'Natural language understanding',
            'Brand voice consistency',
            'Multi-language support',
            'Sentiment analysis',
            'Continuous learning'
        ]
    },
    'social-media': {
        id: 'social-media',
        title: 'Social Media Content Generator Agent',
        description: 'AI-powered system that creates, schedules, and publishes social media content across multiple platforms.',
        problem: 'Social media managers spending hours creating content manually.',
        solution: 'End-to-end automation from ideation to publishing.',
        stats: [
            { value: '70%', label: 'Time Reduction' },
            { value: '50+', label: 'Posts/Month' },
            { value: '3x', label: 'Engagement Increase' },
            { value: '4', label: 'Platforms Supported' }
        ],
        techStack: [
            { name: 'ChatGPT API', icon: 'fas fa-comment' },
            { name: 'MindStudio', icon: 'fas fa-brain' },
            { name: 'Airtable', icon: 'fas fa-table' },
            { name: 'Buffer API', icon: 'fas fa-share-alt' }
        ],
        workflow: [
            { step: 1, title: 'Content Ideation', description: 'AI generates post ideas based on brand guidelines' },
            { step: 2, title: 'Caption Creation', description: 'Engaging captions and hashtags generated' },
            { step: 3, title: 'Approval Workflow', description: 'Content queued for human approval' },
            { step: 4, title: 'Multi-Platform Formatting', description: 'Content adapted for each social platform' },
            { step: 5, title: 'Automated Scheduling', description: 'Posts scheduled for optimal engagement times' }
        ],
         media: [
        { 
            type: 'image', 
            src: 'Image/Projects/Social media content/Scheduling output.webp',
            alt: 'Content Calendar',
            caption: 'Automated content calendar'
        },
        { 
            type: 'video',
            title: 'Content Creation Demo',
            description: 'See the AI in action',
            url: 'https://youtu.be/rM_fyIEr2Kg'
        }
        ],
        result: 'Reduced content preparation time by 70% while increasing engagement.',
        features: [
            'AI-generated content ideas',
            'Platform-specific formatting',
            'Optimal scheduling algorithm',
            'Performance analytics',
            'Content recycling system'
        ]
    },
    'email-labeling': {
        id: 'email-labeling',
        title: 'AI Message Labeling Assistant',
        description: 'n8n workflow that automatically categorizes incoming messages into categories like Inquiry, Complaint, or Pricing.',
        problem: 'Businesses manually sorting hundreds of daily messages.',
        solution: 'AI-powered classification with custom rule-based routing.',
        stats: [
            { value: '100%', label: 'Manual Sorting Eliminated' },
            { value: '95%', label: 'Classification Accuracy' },
            { value: 'Instant', label: 'Processing Time' },
            { value: '10+', label: 'Categories Supported' }
        ],
        techStack: [
            { name: 'n8n', icon: 'fas fa-code-branch' },
            { name: 'OpenAI', icon: 'fas fa-robot' },
            { name: 'Google Workspace', icon: 'fab fa-google' },
            { name: 'Webhook Triggers', icon: 'fas fa-plug' }
        ],
        workflow: [
            { step: 1, title: 'Message Capture', description: 'System captures incoming emails/messages' },
            { step: 2, title: 'AI Classification', description: 'AI analyzes and categorizes message content' },
            { step: 3, title: 'Rule-based Routing', description: 'Messages routed based on category and priority' },
            { step: 4, title: 'Automated Responses', description: 'Quick replies sent for common inquiries' },
            { step: 5, title: 'Analytics & Reporting', description: 'Dashboard shows message trends and volumes' }
        ],
         media: [
        { 
            type: 'image', 
            src: 'Image/Projects/Email label assistant/Labeling sample.webp',
            alt: 'Message Dashboard',
            caption: 'Real-time message classification dashboard'
        },
        { 
            type: 'image', 
            src: 'Image/Projects/Email label assistant/workflow.webp',
            alt: 'Workflow Nodes',
            caption: 'n8n workflow with AI integration'
        }
        ],
        result: 'Eliminated manual message sorting with high-accuracy AI labeling.',
        features: [
            'Custom category definitions',
            'Multi-language support',
            'Priority-based routing',
            'Sentiment analysis',
            'Real-time analytics'
        ]
    }
};

function initProjectLightbox() {
    const modal = document.getElementById('projectModal');
    const overlay = document.getElementById('modalOverlay');
    const closeBtn = document.getElementById('modalClose');
    const modalContent = document.querySelector('.modal-content');
    const prevBtn = document.getElementById('prevProject');
    const nextBtn = document.getElementById('nextProject');
    const currentProjectEl = document.getElementById('currentProject');
    const totalProjectsEl = document.getElementById('totalProjects');
    const loadingSpinner = document.getElementById('loadingSpinner');
    
    if (!modal) return;
    
    let currentProjectId = null;
    const projectIds = Object.keys(projectsData);
    const totalProjects = projectIds.length;
    
    totalProjectsEl.textContent = totalProjects;
    
    // Add click events to all "View Details" buttons
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = button.getAttribute('data-project');
            openProjectModal(projectId);
        });
    });
    
    // Navigation event listeners
    overlay?.addEventListener('click', closeModal);
    closeBtn?.addEventListener('click', closeModal);
    prevBtn?.addEventListener('click', showPrevProject);
    nextBtn?.addEventListener('click', showNextProject);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') showPrevProject();
        if (e.key === 'ArrowRight') showNextProject();
    });
    
    function openProjectModal(projectId) {
        currentProjectId = projectId;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        loadingSpinner?.classList.add('active');
        
        setTimeout(() => {
            loadProjectContent(projectId);
            loadingSpinner?.classList.remove('active');
        }, 300);
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        setTimeout(() => {
            modalContent.innerHTML = '';
        }, 300);
    }
    
    function loadProjectContent(projectId) {
        const project = projectsData[projectId];
        if (!project) return;
        
        const currentIndex = projectIds.indexOf(projectId) + 1;
        currentProjectEl.textContent = currentIndex;
        
        prevBtn.disabled = currentIndex === 1;
        nextBtn.disabled = currentIndex === totalProjects;
        
        modalContent.innerHTML = generateProjectHTML(project);
        modalContent.scrollTop = 0;
    }
    
    function showPrevProject() {
        const currentIndex = projectIds.indexOf(currentProjectId);
        if (currentIndex > 0) {
            openProjectModal(projectIds[currentIndex - 1]);
        }
    }
    
    function showNextProject() {
        const currentIndex = projectIds.indexOf(currentProjectId);
        if (currentIndex < totalProjects - 1) {
            openProjectModal(projectIds[currentIndex + 1]);
        }
    }
    
   function generateProjectHTML(project) {
    return `
        <div class="project-detail-header">
            <h2>${project.title}</h2>
            <p class="description">${project.description}</p>
            
            <div class="project-stats-grid">
                ${project.stats.map(stat => `
                    <div class="stat-card-large">
                        <span class="value">${stat.value}</span>
                        <span class="label">${stat.label}</span>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="solution-section">
            <h3><i class="fas fa-lightbulb"></i> The Challenge & Solution</h3>
            <p><strong>The Problem:</strong> ${project.problem}</p>
            <p><strong>My Solution:</strong> ${project.solution}</p>
        </div>
        
        <div class="tech-stack">
            <h3><i class="fas fa-tools"></i> Technology Stack</h3>
            <div class="tech-stack-grid">
                ${project.techStack.map(tech => `
                    <div class="tech-item">
                        <i class="${tech.icon}"></i>
                        <span>${tech.name}</span>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="workflow-visual">
            <h3><i class="fas fa-project-diagram"></i> How It Works</h3>
            <div class="workflow-steps">
                ${project.workflow.map(step => `
                    <div class="workflow-step">
                        <div class="step-number">${step.step}</div>
                        <div class="step-content">
                            <h4>${step.title}</h4>
                            <p>${step.description}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        ${project.media && project.media.length > 0 ? `
        <div class="media-gallery">
            <h3><i class="fas fa-images"></i> Project Visuals & Demos</h3>
            <div class="media-grid">
                ${project.media.map((item, index) => {
                    if (item.type === 'image') {
                        return `
                            <div class="media-item" data-index="${index}">
                                <img 
                                    src="${item.src}" 
                                    alt="${item.alt}"
                                    loading="lazy"
                                    onerror="this.parentElement.innerHTML='<div style=\'padding:40px;text-align:center;color:#999;\'><i class=\'fas fa-image fa-3x\'></i><p>Image loading...</p></div>'"
                                >
                                <div class="media-caption">
                                    <p>${item.caption}</p>
                                </div>
                            </div>
                        `;
                    } else if (item.type === 'video') {
                     // Check if URL exists, otherwise use #
                             const videoUrl = item.url ? item.url : '#';
                              const clickAction = item.url ? `window.open('${item.url}', '_blank')` : `alert('Video link coming soon!')`;
    
                        return `
                             <div class="media-item video" data-index="${index}">
                             <div class="video-container" 
                             style="position: relative; background: linear-gradient(135deg, var(--primary-dark), var(--primary-medium)); min-height: 250px; display: flex; align-items: center; justify-content: center; color: white; cursor: pointer;" 
                             onclick="${clickAction}">
                
                             <div class="video-placeholder" style="text-align: center;">
                             <i class="fas fa-play-circle" style="font-size: 4rem; margin-bottom: 15px; opacity: 0.9;"></i>
                              <h4 style="margin-bottom: 10px; font-size: 1.2rem;">${item.title}</h4>
                              <p style="opacity: 0.8; font-size: 0.9rem;">${item.description}</p>
                    
                             <div class="play-button" style="margin-top: 20px; display: inline-flex; align-items: center; gap: 10px; padding: 12px 25px; background: rgba(255,255,255,0.2); border-radius: 50px; font-weight: 600;">
                             <i class="fas fa-external-link-alt"></i> ${item.url ? 'Watch Demo' : 'Coming Soon'}
                             </div>
                         </div>
                     </div>
                  </div>
                     `;
                    }
                }).join('')}
            </div>
        </div>
        ` : ''}
        
        <div class="results-highlight">
            <h3>Key Result Achieved</h3>
            <p>${project.result}</p>
        </div>
        
        <div class="features-list">
            <h3><i class="fas fa-star"></i> Key Features</h3>
            <ul>
                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>
        
        <div class="project-cta" style="text-align: center; margin-top: 40px; padding: 30px; background: linear-gradient(135deg, rgba(42,0,78,0.05), rgba(198,35,0,0.05)); border-radius: 15px;">
            <h3 style="margin-bottom: 15px; color: var(--primary-dark);">Want Similar Results?</h3>
            <p style="font-size: 1.1rem; margin-bottom: 25px; max-width: 600px; margin-left: auto; margin-right: auto;">Let's discuss how automation can transform your business processes and save you 20+ hours per week.</p>
            <a href="#contact" class="btn btn-primary" onclick="document.getElementById('projectModal').classList.remove('active'); document.body.style.overflow = '';" style="padding: 15px 40px; font-size: 1.1rem;">
                <i class="fas fa-calendar-check"></i> Schedule Free Consultation
            </a>
        </div>
    `;
}
    
    // Make closeModal available globally
    window.closeProjectModal = closeModal;
}

// ===== Initialize Everything =====
function init() {
    try {
        // Initialize theme
        initTheme();
        
        // Event listeners
        navToggle?.addEventListener('click', toggleMobileMenu);
        themeToggle?.addEventListener('click', toggleTheme);
        
        // Initialize components
        initSmoothScrolling();
        initScrollEffects();
        initParallax();
        initContactForm();
        initScrollAnimations();
        initCurrentYear();
        initMouseMoveEffect();
        initProfilePictureAnimation();
        initMobileFixes();
        initProjectLightbox();
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navToggle && navMenu && 
                !navToggle.contains(e.target) && 
                !navMenu.contains(e.target) && 
                navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Initialize active nav link on page load
        setTimeout(() => {
            updateActiveNavOnScroll();
        }, 100);
        
        console.log('✅ Portfolio initialized successfully!');
    } catch (error) {
        console.error('❌ Initialization error:', error);
    }
}

// ===== Start the application =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ===== Performance optimization: Remove animations on slow devices =====
if ('connection' in navigator && navigator.connection.effectiveType === '2g') {
    document.documentElement.classList.add('reduce-motion');
}
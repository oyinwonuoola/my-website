// ===== DOM Elements =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');
const backToTopBtn = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const navbar = document.querySelector('.navbar');
const currentYear = document.getElementById('currentYear');

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
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ===== Mobile Navigation Toggle =====
function toggleMobileMenu() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// ===== Smooth Scrolling =====
function initSmoothScrolling() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
            
            // Get target section
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
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
    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        // Navbar scroll effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Back to top button visibility
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavOnScroll();
    });
    
    // Back to top button
    backToTopBtn.addEventListener('click', () => {
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

// ===== Parallax Scrolling Effect =====
function initParallax() {
    const parallaxElements = document.querySelectorAll('.node, .stat-card, .project-card');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = element.dataset.rate || 0.5;
            const offset = scrolled * rate;
            
            // Apply different effects based on element type
            if (element.classList.contains('node')) {
                element.style.transform = `translateY(${offset * 0.2}px)`;
            } else if (element.classList.contains('stat-card')) {
                element.style.transform = `translateY(${offset * 0.1}px)`;
            }
        });
    });
}

// ===== Form Handling =====
function initContactForm() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Simulate form submission
        simulateFormSubmission(formData);
    });
}

function simulateFormSubmission(formData) {
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Success message
        alert(`Thank you, ${formData.name}! Your message has been sent successfully. I'll get back to you soon.`);
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
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
            }
        });
    }, observerOptions);
    
    // Observe elements to animate
    const elementsToAnimate = document.querySelectorAll('.project-card, .tool-item, .expertise-item, .process-step, .stat-card');
    elementsToAnimate.forEach(el => observer.observe(el));
}

// ===== Initialize Current Year =====
function initCurrentYear() {
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
}

// ===== Mouse Move Effect =====
function initMouseMoveEffect() {
    const homeSection = document.querySelector('.home-section');
    
    if (!homeSection) return;
    
    homeSection.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { width, height, top, left } = homeSection.getBoundingClientRect();
        
        const xPos = (clientX - left) / width - 0.5;
        const yPos = (clientY - top) / height - 0.5;
        
        const nodes = document.querySelectorAll('.node');
        nodes.forEach((node, index) => {
            const multiplier = (index + 1) * 0.5;
            node.style.transform = `translate(${xPos * 20 * multiplier}px, ${yPos * 20 * multiplier}px)`;
        });
    });
}

// ===== PROFILE PICTURE ANIMATION (NEW FUNCTION) =====
function initProfilePictureAnimation() {
    const profilePicture = document.querySelector('.profile-picture');
    const placeholderIcons = document.querySelectorAll('.profile-image-placeholder i');
    
    if (!profilePicture) return;
    
    // Add click effect to profile picture
    profilePicture.addEventListener('click', () => {
        profilePicture.style.transform = 'scale(0.95)';
        setTimeout(() => {
            profilePicture.style.transform = '';
        }, 200);
    });
    
    // Add random movement to icons
    placeholderIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Add hover effect to experience items
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('i');
            icon.style.transform = 'scale(1.2)';
            icon.style.color = 'var(--accent-orange)';
        });
        
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('i');
            icon.style.transform = 'scale(1)';
            icon.style.color = 'var(--accent-red)';
        });
    });
}

// ===== Initialize Everything =====
function init() {
    // Initialize theme
    initTheme();
    
    // Event listeners
    navToggle.addEventListener('click', toggleMobileMenu);
    themeToggle.addEventListener('click', toggleTheme);
    
    // Initialize components
    initSmoothScrolling();
    initScrollEffects();
    initParallax();
    initContactForm();
    initScrollAnimations();
    initCurrentYear();
    initMouseMoveEffect();
    
    // NEW LINE: Initialize profile picture animations
    initProfilePictureAnimation();
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Initialize active nav link on page load
    setTimeout(() => {
        updateActiveNavOnScroll();
    }, 100);
}

// ===== Start the application =====
document.addEventListener('DOMContentLoaded', init);

// ===== Advanced Scroll Effects =====
let lastScrollTop = 0;
const scrollThreshold = 100;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
    
    // Hide/show navbar based on scroll direction
    if (Math.abs(scrollTop - lastScrollTop) > scrollThreshold) {
        if (scrollDirection === 'down' && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    }
    
    // Progress indicator (optional)
    updateScrollProgress();
});

// ===== Scroll Progress Indicator =====
function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // Create or update progress bar
    let progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.position = 'fixed';
        progressBar.style.top = '0';
        progressBar.style.left = '0';
        progressBar.style.height = '4px';
        progressBar.style.background = 'linear-gradient(to right, var(--accent-red), var(--accent-orange))';
        progressBar.style.zIndex = '1001';
        progressBar.style.width = '0%';
        document.body.appendChild(progressBar);
    }
    
    progressBar.style.width = scrolled + '%';
}

// ===== Scroll-triggered Animations =====
function checkScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to specific elements
    const animateElements = document.querySelectorAll('.project-card, .tool-item, .process-step');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });
    
    // Check animations on scroll
    window.addEventListener('scroll', checkScrollAnimations);
    checkScrollAnimations(); // Check on load
});
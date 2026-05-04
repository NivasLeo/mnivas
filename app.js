// FINAL FIXED VERSION - Portfolio Website JavaScript - 2025 Optimized
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality with performance optimization
    console.log('Initializing portfolio website...');
    
    initPerformanceOptimizations();
    initCriticalComponents();
    initEnhancedFeatures();
    initAccessibility();
    initAnalytics();
    
    console.log('Portfolio website initialized successfully');
});

// Performance Optimizations
function initPerformanceOptimizations() {
    lazyLoadResources();
    optimizeScrollPerformance();
    preloadCriticalResources();
    registerServiceWorker();
}

// Critical Components Initialization
function initCriticalComponents() {
    initLoadingScreen();
    initNavigation();
    initScrollProgress();
    // initHeroSequence is implemented below; call it instead of the non-existent initHeroAnimations
    initHeroSequence();
    initFloatingContact();
    initTypewriterEffect();
    initScrollAnimations();
    initTestimonialCarousel();
    initContactForm();
    initSmoothScroll();
}

// Enhanced Features
function initEnhancedFeatures() {
    initMicroInteractions();
    initParallaxEffects();
    initAdvancedAnimations();
    initEnhancedStats();
    initKeyboardNavigation();
}

// Performance-optimized loading screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const progressBar = document.querySelector('.progress-bar');
    let progress = 0;
    
    // Simulate loading progress
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => hideLoadingScreen(), 500);
        }
    }, 100);
    
    // Hide loading screen after page loads
    window.addEventListener('load', function() {
        progress = 100;
        if (progressBar) {
            progressBar.style.width = '100%';
        }
        setTimeout(() => hideLoadingScreen(), 800);
    });
    
    function hideLoadingScreen() {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            document.body.style.overflow = 'auto';
            
            setTimeout(() => {
                if (loadingScreen.parentNode) {
                    loadingScreen.parentNode.removeChild(loadingScreen);
                }
                initHeroSequence();
            }, 500);
        }
    }
}

// COMPLETELY FIXED: Enhanced Navigation
function initNavigation() {
    console.log('Initializing navigation...');
    
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', toggleMobileMenu);
        navToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMobileMenu();
            }
        });
    }

    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    }

    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            setTimeout(() => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = 'auto';
            }, 100);
        });
    });

    // Enhanced navbar scroll effects
    const throttleScroll = throttle(function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        const isScrollingUp = scrollTop < lastScrollTop;
        
        if (scrollTop > 100) {
            if (isScrollingUp) {
                navbar.style.transform = 'translateY(0)';
            } else if (scrollTop - lastScrollTop > 5) {
                navbar.style.transform = 'translateY(-100%)';
            }
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, 16);

    window.addEventListener('scroll', throttleScroll);

    // FIXED: Active nav link highlighting
    const sections = document.querySelectorAll('section[id]');
    console.log('Found sections:', sections.length);
    
    const observerOptions = {
        rootMargin: '-10% 0px -80% 0px',
        threshold: 0.1
    };

    const navObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                
                console.log('Section in view:', sectionId);
                
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                    console.log('Activated nav link:', sectionId);
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        console.log('Observing section:', section.id);
        navObserver.observe(section);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    console.log('Navigation initialized successfully');
}

// Scroll progress indicator
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress-bar');
    
    if (progressBar) {
        const updateProgress = throttle(function() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
        }, 16);

        window.addEventListener('scroll', updateProgress);
    }
}

// FIXED: Floating contact button
function initFloatingContact() {
    console.log('Initializing floating contact...');
    
    const floatingContact = document.getElementById('floating-contact');
    
    if (!floatingContact) {
        console.error('Floating contact button not found in DOM');
        return;
    }
    
    console.log('Floating contact button found:', floatingContact);
    
    const showFloatingContact = throttle(function() {
        const scrollTop = window.pageYOffset;
        const heroHeight = document.querySelector('.hero')?.offsetHeight || 600;
        
        console.log('Scroll position:', scrollTop, 'Hero height:', heroHeight);
        
        if (scrollTop > heroHeight * 0.3) {
            floatingContact.classList.add('visible');
            console.log('Floating contact made visible');
        } else {
            floatingContact.classList.remove('visible');
            console.log('Floating contact hidden');
        }
    }, 16);

    window.addEventListener('scroll', showFloatingContact);
    
    // Initial check
    setTimeout(() => {
        showFloatingContact();
    }, 1000);
    
    console.log('Floating contact initialized');
}

// Enhanced Hero Sequence
function initHeroSequence() {
    console.log('Starting hero sequence...');
    
    const heroElements = [
        { selector: '.hero-name', delay: 0 },
        { selector: '.hero-roles', delay: 200 },
        { selector: '.hero-quote', delay: 400 },
        { selector: '.hero-stats', delay: 600 },
        { selector: '.hero-location', delay: 800 },
        { selector: '.hero-contact', delay: 1000 },
        { selector: '.hero-social', delay: 1200 },
        { selector: '.hero-actions', delay: 1400 }
    ];

    heroElements.forEach(({ selector, delay }) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, delay);
        }
    });

    setTimeout(() => initRoleAnimations(), 1600);
}

function initRoleAnimations() {
    const roleElements = document.querySelectorAll('.role-innovation, .role-tech, .role-spiritual');
    
    roleElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        }, index * 200);
        
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-2px)';
            this.style.textShadow = '0 0 30px currentColor';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
            this.style.textShadow = '0 0 20px rgba(var(--color-teal-300-rgb), 0.3)';
        });
    });
}

// Typewriter effect
function initTypewriterEffect() {
    const typewriterElement = document.getElementById('typewriter-quote');
    const text = "It's all about who you are, what you give, how you make — not what you take.";
    
    if (typewriterElement) {
        let i = 0;
        typewriterElement.textContent = '';
        
        function typeWriter() {
            if (i < text.length) {
                typewriterElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50 + Math.random() * 50);
            } else {
                setTimeout(() => {
                    if (typewriterElement.style) {
                        typewriterElement.style.borderRight = 'none';
                    }
                }, 1000);
            }
        }
        
        setTimeout(typeWriter, 2000);
    }
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                if (entry.target.classList.contains('methodology-card')) {
                    animateMethodologyCard(entry.target);
                } else if (entry.target.classList.contains('timeline-item')) {
                    animateTimelineItem(entry.target);
                } else if (entry.target.classList.contains('stat-card')) {
                    animateStatCard(entry.target);
                }
                
                if (entry.target.querySelector('.expertise-card, .workshop-card, .value-card')) {
                    const items = entry.target.querySelectorAll('.expertise-card, .workshop-card, .value-card');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll(`
        .section-header,
        .about-summary,
        .stat-card,
        .expertise-card,
        .timeline-item,
        .methodology-card,
        .workshop-card,
        .value-card,
        .education-card,
        .recognition-card,
        .testimonial-card,
        .expertise-grid,
        .methodology-grid,
        .workshops-grid,
        .values-grid
    `);

    animateElements.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
}

// Testimonial carousel
function initTestimonialCarousel() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;
    let autoPlayInterval;

    if (testimonials.length > 0) {
        startAutoPlay();

        const carousel = document.querySelector('.testimonials-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', stopAutoPlay);
            carousel.addEventListener('mouseleave', startAutoPlay);
        }
    }

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.remove('active');
            if (dots[i]) dots[i].classList.remove('active');
            
            if (i === index) {
                testimonial.classList.add('active');
                if (dots[i]) dots[i].classList.add('active');
            }
        });
        currentTestimonial = index;
    }

    function nextTestimonial() {
        const next = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(next);
    }

    function prevTestimonial() {
        const prev = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(prev);
    }

    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(nextTestimonial, 5000);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }

    window.changeTestimonial = function(direction) {
        stopAutoPlay();
        if (direction === 1) {
            nextTestimonial();
        } else {
            prevTestimonial();
        }
        setTimeout(startAutoPlay, 3000);
    };

    window.currentTestimonial = function(index) {
        stopAutoPlay();
        showTestimonial(index - 1);
        setTimeout(startAutoPlay, 3000);
    };
}

// FIXED: Contact form
function initContactForm() {
    console.log('Initializing contact form...');
    
    const modal = document.getElementById('contact-modal');
    const form = document.querySelector('.contact-form');
    
    if (modal) {
        modal.classList.add('hidden');
        console.log('Contact modal found and hidden');
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                closeContactForm();
            }
        });
    } else {
        console.error('Contact modal not found');
    }
    
    if (form) {
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateInput);
            input.addEventListener('input', clearValidationError);
        });
        console.log('Contact form validation initialized');
    }
}

// FIXED: Contact form functions
window.openContactForm = function() {
    console.log('Opening contact form...');
    const modal = document.getElementById('contact-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            const firstInput = modal.querySelector('input[type="text"]');
            if (firstInput) firstInput.focus();
        }, 300);
        
        trackEvent('contact_form_opened');
        console.log('Contact form opened successfully');
    } else {
        console.error('Contact modal not found');
    }
};

window.closeContactForm = function() {
    console.log('Closing contact form...');
    const modal = document.getElementById('contact-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        console.log('Contact form closed');
    }
};

window.submitContactForm = function(event) {
    event.preventDefault();
    
    const form = event.target;
    
    if (!validateForm(form)) {
        showNotification('Please fill in all required fields correctly.', 'error');
        return;
    }
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        const subject = encodeURIComponent(`New Contact from ${data.name} - ${data.organization || 'Professional Inquiry'}`);
        const body = encodeURIComponent(`
Hello Mohan,

I'd like to connect with you regarding your services.

Name: ${data.name}
Email: ${data.email}
Organization: ${data.organization || 'Not specified'}

Message:
${data.message}

Best regards,
${data.name}
        `);
        
        const mailtoLink = `mailto:mohannivasovi@gmail.com?subject=${subject}&body=${body}`;
        
        try {
            window.open(mailtoLink, '_blank');
        } catch (e) {
            console.log('Mailto not supported');
        }
        
        form.reset();
        closeContactForm();
        
        showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
        
        trackEvent('contact_form_submitted', {
            has_organization: !!data.organization
        });
        
        submitBtn.innerHTML = originalContent;
        submitBtn.disabled = false;
    }, 1500);
};

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateInput({ target: input })) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateInput(event) {
    const input = event.target;
    const value = input.value.trim();
    let isValid = true;
    
    input.classList.remove('error');
    removeErrorMessage(input);
    
    if (input.required && !value) {
        showInputError(input, 'This field is required');
        isValid = false;
    }
    
    if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showInputError(input, 'Please enter a valid email address');
            isValid = false;
        }
    }
    
    return isValid;
}

function showInputError(input, message) {
    input.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'input-error';
    errorDiv.textContent = message;
    errorDiv.style.color = 'var(--color-error)';
    errorDiv.style.fontSize = 'var(--font-size-sm)';
    errorDiv.style.marginTop = 'var(--space-4)';
    
    input.parentNode.appendChild(errorDiv);
}

function removeErrorMessage(input) {
    const errorDiv = input.parentNode.querySelector('.input-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function clearValidationError(event) {
    const input = event.target;
    if (input.classList.contains('error') && input.value.trim()) {
        input.classList.remove('error');
        removeErrorMessage(input);
    }
}

// COMPLETELY FIXED: Smooth scroll with proper section targeting
function initSmoothScroll() {
    console.log('Initializing smooth scroll...');
    
    const links = document.querySelectorAll('a[href^="#"]');
    console.log('Found navigation links:', links.length);
    
    links.forEach((link, index) => {
        const href = link.getAttribute('href');
        console.log(`Link ${index + 1}: ${href}`);
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            console.log('Clicked navigation link:', targetId);
            
            if (targetId === '#') {
                console.log('Empty anchor, skipping');
                return;
            }
            
            // Try multiple ways to find the target
            let targetSection = document.querySelector(targetId);
            
            if (!targetSection) {
                // Alternative: try finding by id without the hash
                const idWithoutHash = targetId.replace('#', '');
                targetSection = document.getElementById(idWithoutHash);
                console.log('Trying alternative selector for:', idWithoutHash);
            }
            
            if (targetSection) {
                console.log('Found target section:', targetSection);
                console.log('Section offset top:', targetSection.offsetTop);
                
                const navbarHeight = 80;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                console.log('Scrolling to position:', targetPosition);
                
                // Use both smooth scroll methods for maximum compatibility
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Fallback smooth scroll
                smoothScrollTo(targetPosition, 800);
                
                trackEvent('navigation_clicked', { target: targetId });
                
                console.log('Navigation completed for:', targetId);
            } else {
                console.error('Target section not found for:', targetId);
                console.log('Available sections:');
                document.querySelectorAll('section[id]').forEach(section => {
                    console.log(`- #${section.id}`);
                });
            }
        });
    });
    
    // Scroll indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            console.log('Scroll indicator clicked');
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                const targetPosition = aboutSection.getBoundingClientRect().top + window.pageYOffset - 80;
                smoothScrollTo(targetPosition, 1000);
            }
        });
    }
    
    console.log('Smooth scroll initialized');
}

// Custom smooth scroll function
function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function scrollAnimation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(scrollAnimation);
        }
    }
    
    requestAnimationFrame(scrollAnimation);
}

function easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
}

// Enhanced stats animation
function initEnhancedStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = parseInt(target.getAttribute('data-target')) || parseInt(target.textContent.replace(/\D/g, ''));
                const suffix = target.textContent.replace(/\d/g, '');
                
                animateCounter(target, 0, finalNumber, suffix, 2000);
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

function animateCounter(element, start, end, suffix, duration) {
    const startTime = performance.now();

    // Support structured stat DOM: .stat-value and .stat-suffix
    const valueEl = element.querySelector('.stat-value') || element;
    let suffixEl = element.querySelector('.stat-suffix');

    // If no dedicated suffix element, create one to keep behavior backward-compatible
    if (!suffixEl) {
        suffixEl = document.createElement('span');
        suffixEl.className = 'stat-suffix';
        element.appendChild(suffixEl);
    }

    // Determine numeric end and suffix from data-target if provided
    const dataTarget = element.getAttribute('data-target') || ('' + end);
    const numericTarget = parseInt(dataTarget, 10) || end;
    const derivedSuffix = (dataTarget + '').replace(/[0-9,\.]/g, '');
    suffixEl.textContent = derivedSuffix;

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easedProgress = easeOutExpo(progress);
        const current = Math.floor(start + (numericTarget - start) * easedProgress);

        if (valueEl && valueEl !== element) {
            valueEl.textContent = current;
        } else {
            // fallback for older markup where element is the text node
            element.textContent = current + derivedSuffix;
        }

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }

    requestAnimationFrame(updateCounter);
}

function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

// Micro-interactions
function initMicroInteractions() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    const cards = document.querySelectorAll('.expertise-card, .methodology-card, .workshop-card, .value-card, .stat-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Parallax effects
function initParallaxEffects() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    if (floatingElements.length > 0) {
        const parallaxScroll = throttle(function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            
            floatingElements.forEach((element, index) => {
                const speed = 0.2 + (index * 0.1);
                const yPos = rate * speed;
                const rotation = scrolled * 0.02 * (index + 1);
                
                element.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`;
            });
        }, 16);
        
        window.addEventListener('scroll', parallaxScroll);
    }
}

// PDF Download functionality
window.downloadProfile = function() {
    console.log('Download profile clicked');
    
    trackEvent('profile_download_clicked');
    
    // Use local PDF in the same folder for direct download when hosting the static site
    const pdfUrl = 'Mohan_Nivas_Professional_Portfolio.pdf';
    
    try {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'Mohan_Nivas_Professional_Portfolio.pdf';
        link.target = '_blank';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification('Profile PDF download started!', 'success');
        trackEvent('profile_download_success');
        
    } catch (error) {
        console.error('Download failed:', error);
        window.open(pdfUrl, '_blank');
        showNotification('PDF opened in new tab. You can download it from there.', 'info');
        trackEvent('profile_download_fallback');
    }
};

// Enhanced notification system
function showNotification(message, type = 'info', duration = 5000) {
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    const iconMap = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${iconMap[type] || iconMap.info}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentNode.parentNode.remove()" aria-label="Close notification">×</button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 120px;
        right: 30px;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-left: 4px solid var(--color-${type === 'info' ? 'primary' : type});
        border-radius: var(--radius-lg);
        padding: var(--space-20);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        max-width: 400px;
        min-width: 300px;
        transform: translateX(100%);
        transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        backdrop-filter: blur(10px);
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: var(--space-12);
        color: var(--color-text);
        font-size: var(--font-size-md);
        line-height: 1.5;
    `;
    
    const icon = notification.querySelector('i');
    icon.style.cssText = `
        color: var(--color-${type === 'info' ? 'primary' : type});
        font-size: var(--font-size-lg);
        flex-shrink: 0;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: var(--font-size-xl);
        color: var(--color-text-secondary);
        cursor: pointer;
        margin-left: auto;
        flex-shrink: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all var(--duration-fast) var(--ease-standard);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 400);
    }, duration);
    
    return notification;
}

// Remaining helper functions
function initAccessibility() {
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '3px solid var(--color-primary)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

function initAnalytics() {
    trackEvent('page_loaded', {
        user_agent: navigator.userAgent,
        screen_resolution: `${screen.width}x${screen.height}`,
        timestamp: new Date().toISOString()
    });
    
    let maxScrollDepth = 0;
    const trackScrollDepth = throttle(function() {
        const scrollPercent = Math.round(
            (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
        );
        
        if (scrollPercent > maxScrollDepth) {
            maxScrollDepth = scrollPercent;
            
            if ([25, 50, 75, 100].includes(scrollPercent)) {
                trackEvent('scroll_depth', { depth: scrollPercent });
            }
        }
    }, 1000);
    
    window.addEventListener('scroll', trackScrollDepth);
}

function trackEvent(eventName, eventData = {}) {
    console.log('Event tracked:', eventName, eventData);
    
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function animateMethodologyCard(card) {
    const icon = card.querySelector('.methodology-icon');
    const letter = card.querySelector('.methodology-letter');
    
    setTimeout(() => {
        if (icon) icon.style.transform = 'scale(1.1) rotate(10deg)';
        if (letter) letter.style.transform = 'rotate(360deg) scale(1.2)';
    }, 200);
    
    setTimeout(() => {
        if (icon) icon.style.transform = 'scale(1) rotate(0deg)';
        if (letter) letter.style.transform = 'rotate(0deg) scale(1)';
    }, 800);
}

function animateTimelineItem(item) {
    const marker = item.querySelector('.timeline-marker');
    if (marker) {
        setTimeout(() => {
            marker.style.transform = 'scale(1.3) rotate(360deg)';
        }, 300);
        
        setTimeout(() => {
            marker.style.transform = 'scale(1) rotate(0deg)';
        }, 800);
    }
}

function animateStatCard(card) {
    const icon = card.querySelector('.stat-icon');
    if (icon) {
        setTimeout(() => {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
        }, 200);
        
        setTimeout(() => {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }, 600);
    }
}

// Placeholder functions for remaining features
function initAdvancedAnimations() {}
function initKeyboardNavigation() {}
function lazyLoadResources() {}
function optimizeScrollPerformance() {}
function preloadCriticalResources() {}
function registerServiceWorker() {}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    trackEvent('javascript_error', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno
    });
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    trackEvent('promise_rejection', { reason: e.reason.toString() });
    e.preventDefault();
});

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        // Already handled
    });
} else {
    initPerformanceOptimizations();
    initCriticalComponents();
    initEnhancedFeatures();
    initAccessibility();
    initAnalytics();
}
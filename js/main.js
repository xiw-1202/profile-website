// Navigation Menu Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Prevent default action
        e.preventDefault();
        
        // Get the section index from the data attribute
        const sectionIndex = parseInt(link.querySelector('a').getAttribute('data-index'));
        
        // Close mobile menu
        nav.classList.remove('active');
        burger.classList.remove('toggle');
        
        navLinks.forEach(link => {
            link.style.animation = '';
        });
        
        // Scroll to the section
        scrollToSection(sectionIndex);
    });
});

// Header Scroll Effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
    }
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the form data to a server
        // For now, we'll just log it to the console
        console.log('Form submitted:', { name, email, message });
        
        // Display success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Current Year for Copyright
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.querySelector('.copyright-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// Preloader
window.addEventListener('load', () => {
    // Hide preloader when all content is loaded
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('hidden');
        
        // Remove preloader from DOM after animation completes
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
    
    // Remove loading class
    document.body.classList.remove('js-loading');
});

// Full Page Scrolling and Section Reveal
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const mainContainer = document.querySelector('main');
    
    // Global state
    let currentSectionIndex = 0;
    let isScrolling = false;
    const sectionCount = sections.length;
    
    // Set initial classes for sections
    sections.forEach((section, index) => {
        // Add hidden class to all sections except the first one
        if (index === 0) {
            section.classList.add('section--visible');
        } else {
            section.classList.add('section--hidden');
        }
    });
    
    // Create navigation dots for sections
    function createNavigationDots() {
        const nav = document.createElement('div');
        nav.className = 'section-navigation';
        
        sections.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = 'nav-dot';
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                scrollToSection(index);
            });
            
            nav.appendChild(dot);
        });
        
        document.body.appendChild(nav);
    }
    
    // Update navigation dots
    function updateNavigationDots() {
        const dots = document.querySelectorAll('.nav-dot');
        if (dots.length === 0) return;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSectionIndex);
        });
    }
    
    // Scroll to specific section
    function scrollToSection(index) {
        if (index < 0 || index >= sectionCount || isScrolling) return;
        
        isScrolling = true;
        currentSectionIndex = index;
        
        // Update navigation dots
        updateNavigationDots();
        
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('section--visible');
            section.classList.add('section--hidden');
        });
        
        // Show target section
        setTimeout(() => {
            sections[index].classList.remove('section--hidden');
            sections[index].classList.add('section--visible');
            sections[index].scrollIntoView({ behavior: 'smooth' });
            
            // Animate elements within the section
            const elementsInSection = sections[index].querySelectorAll('.timeline-item, .skill-item, .education-item, .contact-item');
            elementsInSection.forEach((el, i) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, i * 100 + 300); // Staggered delay
            });
            
            setTimeout(() => {
                isScrolling = false;
            }, 1000);
        }, 300);
    }
    
    // Handle mouse wheel events
    function handleWheel(e) {
        e.preventDefault();
        
        if (isScrolling) return;
        
        // Determine scroll direction
        const direction = e.deltaY > 0 ? 1 : -1;
        const targetIndex = currentSectionIndex + direction;
        
        if (targetIndex >= 0 && targetIndex < sectionCount) {
            scrollToSection(targetIndex);
        }
    }
    
    // Handle keyboard navigation
    function handleKeydown(e) {
        if (isScrolling) return;
        
        let targetIndex = currentSectionIndex;
        
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            targetIndex++;
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            targetIndex--;
        } else if (e.key === 'Home') {
            targetIndex = 0;
        } else if (e.key === 'End') {
            targetIndex = sectionCount - 1;
        } else {
            return; // Not a navigation key
        }
        
        if (targetIndex >= 0 && targetIndex < sectionCount) {
            scrollToSection(targetIndex);
        }
    }
    
    // Initialize the scrolling behavior
    function initFullPageScroll() {
        // Prevent default scroll behavior on main container
        mainContainer.addEventListener('wheel', handleWheel, { passive: false });
        
        // Add keyboard navigation
        document.addEventListener('keydown', handleKeydown);
        
        // Create and display navigation dots
        createNavigationDots();
        
        // Update all section links behavior
        const sectionLinks = document.querySelectorAll('.section-link');
        sectionLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetIndex = parseInt(link.getAttribute('data-index'));
                scrollToSection(targetIndex);
            });
        });
        
        // Add touch support for mobile
        let touchStartY = 0;
        let touchEndY = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', (e) => {
            touchEndY = e.changedTouches[0].clientY;
            
            const diff = touchStartY - touchEndY;
            
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                    // Swipe up, go to next section
                    if (currentSectionIndex < sectionCount - 1) {
                        scrollToSection(currentSectionIndex + 1);
                    }
                } else {
                    // Swipe down, go to previous section
                    if (currentSectionIndex > 0) {
                        scrollToSection(currentSectionIndex - 1);
                    }
                }
            }
        });
    }
    
    // Initialize fullpage scroll
    initFullPageScroll();
    
    // Optional: Add animation to individual elements within sections
    const revealElements = document.querySelectorAll('.timeline-item, .skill-item, .education-item, .contact-item');
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Observer to animate elements when section becomes visible
    const observeSectionForElements = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            if (mutation.attributeName === 'class') {
                const section = mutation.target;
                if (section.classList.contains('section--visible')) {
                    const elementsInSection = section.querySelectorAll('.timeline-item, .skill-item, .education-item, .contact-item');
                    
                    elementsInSection.forEach((el, index) => {
                        setTimeout(() => {
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    });
    
    // Observe class changes on each section
    sections.forEach(section => {
        observeSectionForElements.observe(section, { attributes: true });
    });
});
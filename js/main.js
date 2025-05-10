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
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('toggle');
        
        navLinks.forEach(link => {
            link.style.animation = '';
        });
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

// Scroll Reveal Animation
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

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    
    // Add the hidden class to all sections initially
    sections.forEach(section => {
        section.classList.add('section--hidden');
    });
    
    // This slight delay ensures the initial hiding happens before the page is fully loaded
    // to prevent a flash of unstyled content
    setTimeout(() => {
        const revealSection = function(entries, observer) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                
                // When section becomes visible in the viewport
                entry.target.classList.add('section--visible');
                
                // Once the animation is done, we can stop observing this section
                observer.unobserve(entry.target);
            });
        };
        
        const sectionObserver = new IntersectionObserver(revealSection, {
            root: null,
            threshold: 0.15,  // When 15% of the section is visible
            rootMargin: '-50px'  // A small negative margin makes sections reveal a bit later
        });
        
        // Start observing each section
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }, 100);
    
    // Optional: Add animation to individual elements within sections
    const revealElements = document.querySelectorAll('.timeline-item, .skill-item, .education-item, .contact-item');
    
    const elementObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            // Add a staggered delay based on the element's index
            const delay = Array.from(revealElements).indexOf(entry.target) * 100;
            
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, delay);
            
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.1,
        rootMargin: '-20px'
    });
    
    // Style all elements initially
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        elementObserver.observe(el);
    });
});
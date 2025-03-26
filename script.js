// Navigation dots highlighting
document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation and interactions
    initializeNavigation();
    
    // Ensure we start at the intro section if no specific anchor is provided
    ensureCorrectStartingSection();
});

function ensureCorrectStartingSection() {
    // If no specific hash or if it's just "#" without a specific section
    if (!window.location.hash || window.location.hash === '#') {
        // Scroll to intro section
        const introSection = document.getElementById('intro');
        if (introSection) {
            introSection.scrollIntoView({ behavior: 'smooth' });
            
            // Update the URL to reflect we're at the intro section
            history.replaceState(null, null, '#intro');
            
            // Highlight the first nav dot
            const firstDot = document.querySelector('.nav-dot[data-slide="intro"]');
            if (firstDot) {
                document.querySelectorAll('.nav-dot').forEach(dot => dot.classList.remove('active'));
                firstDot.classList.add('active');
            }
        }
    }
}

function initializeNavigation() {
    const sections = document.querySelectorAll('.slide');
    const navDots = document.querySelectorAll('.nav-dot');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-slide') === current) {
                dot.classList.add('active');
            }
        });
    });
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Modal functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
    document.body.style.overflow = "auto"; // Re-enable scrolling
}

// Close modal when clicking outside content
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
        document.body.style.overflow = "auto"; // Re-enable scrolling
    }
};

// Add "active" class to current navigation item
function setActiveNavItem() {
    const navItems = document.querySelectorAll('header nav a');
    const path = window.location.hash || '#intro';
    
    navItems.forEach(item => {
        if (item.getAttribute('href') === path) {
            item.classList.add('text-blue-600');
        } else {
            item.classList.remove('text-blue-600');
        }
    });
}

// Call on page load and when hash changes
setActiveNavItem();
window.addEventListener('hashchange', setActiveNavItem);

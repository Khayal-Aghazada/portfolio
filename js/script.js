// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const links = document.querySelectorAll('a');
const buttons = document.querySelectorAll('button');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 80);
});

// Add hover effect on links and buttons
const hoverElements = [...links, ...buttons];
hoverElements.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
        cursorFollower.classList.add('cursor-hover');
    });
    
    link.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
        cursorFollower.classList.remove('cursor-hover');
    });
});

// Header Scroll Effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
});

// Project Category Navigation
const projectCategories = document.querySelectorAll('.category');

projectCategories.forEach(category => {
    category.addEventListener('click', () => {
        const categoryType = category.getAttribute('data-category');
        
        switch(categoryType) {
            case 'cv':
                window.location.href = 'projects-cv.html';
                break;
            case 'web':
                window.location.href = 'projects-web.html';
                break;
            case 'misc':
                window.location.href = 'projects-misc.html';
                break;
            default:
                window.location.href = 'projects-all.html';
        }
    });
});

// Skill bar animation
const skillBars = document.querySelectorAll('.skill-level');
const skillSection = document.querySelector('.skills');

// Function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Trigger skill bar animation when scrolled into view
function checkSkillsPosition() {
    if (skillSection && isInViewport(skillSection)) {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
        
        // Remove event listener after animation is triggered once
        window.removeEventListener('scroll', checkSkillsPosition);
    }
}

// Add scroll event listener for skill bars animation
if (skillSection) {
    window.addEventListener('scroll', checkSkillsPosition);
    // Check position on page load
    window.addEventListener('load', checkSkillsPosition);
}

// Form submission - using FormSubmit service
const contactForm = document.querySelector('#contactForm');
const formStatus = document.querySelector('#formStatus');

// Check for success message in URL (after form submission redirect)
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('message') && urlParams.get('message') === 'success') {
        formStatus.innerHTML = `
            <div class="form-success">
                <i class="fas fa-check-circle"></i>
                <p>Thank you for your message! I'll get back to you soon.</p>
            </div>
        `;
        
        // Remove the query parameter from URL without reloading the page
        const newUrl = window.location.pathname + window.location.hash;
        window.history.replaceState({}, document.title, newUrl);
    }
});

// Add hidden fields to the form when the page loads
if (contactForm) {
    // Create and append hidden fields for FormSubmit configuration
    const createHiddenField = (name, value) => {
        const field = document.createElement('input');
        field.type = 'hidden';
        field.name = name;
        field.value = value;
        contactForm.appendChild(field);
    };
    
    // Add FormSubmit configuration fields
    createHiddenField('_next', window.location.href + '?message=success');
    createHiddenField('_captcha', 'false');
    createHiddenField('_template', 'table');
    createHiddenField('_subject', 'New Portfolio Contact Message');
} 
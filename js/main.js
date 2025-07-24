// Main JavaScript file for EF Tours website
// Handles navigation, testimonials, gallery, and general interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initTestimonials();
    initGallery();
    initFilters();
    initScrollAnimations();
    initFAQ();
    initSmoothScroll();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a nav link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Update active nav link based on current page
    updateActiveNavLink();

    // Handle scroll for header background
    handleHeaderScroll();
}

function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = '#ffffff';
            header.style.backdropFilter = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Testimonials slider functionality
function initTestimonials() {
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    if (testimonialItems.length === 0) return;

    let currentTestimonial = 0;
    const totalTestimonials = testimonialItems.length;

    // Auto-rotate testimonials every 6 seconds
    setInterval(() => {
        nextTestimonial();
    }, 6000);
}

function showTestimonial(index) {
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    if (testimonialItems.length === 0) return;

    testimonialItems.forEach(item => item.classList.remove('active'));
    
    if (index >= testimonialItems.length) index = 0;
    if (index < 0) index = testimonialItems.length - 1;
    
    testimonialItems[index].classList.add('active');
    return index;
}

function nextTestimonial() {
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    if (testimonialItems.length === 0) return;

    const currentActive = document.querySelector('.testimonial-item.active');
    let currentIndex = 0;
    
    if (currentActive) {
        currentIndex = Array.from(testimonialItems).indexOf(currentActive);
    }
    
    const nextIndex = (currentIndex + 1) % testimonialItems.length;
    showTestimonial(nextIndex);
}

function previousTestimonial() {
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    if (testimonialItems.length === 0) return;

    const currentActive = document.querySelector('.testimonial-item.active');
    let currentIndex = 0;
    
    if (currentActive) {
        currentIndex = Array.from(testimonialItems).indexOf(currentActive);
    }
    
    const prevIndex = currentIndex === 0 ? testimonialItems.length - 1 : currentIndex - 1;
    showTestimonial(prevIndex);
}

// Gallery functionality
function initGallery() {
    initLightbox();
}

// Gallery data for lightbox
const galleryImages = [
    {
        src: "https://pixabay.com/get/ga8c0255a4d119fc31ac70de62600edd5025d231262f8fc758f0062bc32d1638b188ff9862f9945e9c11b6dcfc85bc577c3e17852b67ea072816c4aa2e4fc76ed_1280.jpg",
        title: "Students on Adventure",
        description: "Excited students beginning their educational journey"
    },
    {
        src: "https://pixabay.com/get/gfb031b646dd9da6f6db7d11ad4fd7ac4dd8aaa5e3f8e69c62b3f2b41cdf52c504d6afcf48c4f44dc61937290f1fd36cd2a2245a03e49dd48eda33a27a10ca857_1280.jpg",
        title: "Interactive Learning",
        description: "Students engaged in hands-on educational activities"
    },
    {
        src: "https://pixabay.com/get/gc1faa601343ceffcefb1e148508919e5a5d37af495b753c32c20bb36532445c8eb139efdaa0f657b5d2c705db618a6c7884add60782315a6f538758658707d9c_1280.jpg",
        title: "Technology Workshop",
        description: "Exploring cutting-edge technology and innovation"
    },
    {
        src: "https://pixabay.com/get/gcf7ab82a77cbf7f116f58e312445ef55807c6a90efd170753b94c88f0fe38dbf63292054c701ee742d7fc3e7b65d2a9e2e457e2c09f78150e62077e72b70fdfe_1280.jpg",
        title: "Cultural Exchange",
        description: "Students experiencing diverse cultures and traditions"
    },
    {
        src: "https://pixabay.com/get/g01deb56e3b30f9f54b102cd0766b4e0d0800dbaafd2716d5d18ed9865f100bb806ce8d89eb68d42ceb2179db39718ec3677eb002b5db15c9f072ef7c518ce5b2_1280.jpg",
        title: "Collaborative Learning",
        description: "Students sharing ideas and insights together"
    },
    {
        src: "https://pixabay.com/get/gfa69bced4c19402b7e90abfd6d5895a55d1c1060b90f8c8a4b9983e40040ac1f3cfe7e3280e8780c3d560a55dcf2b3e24b28e07d7af118960ca51b26f8e3b9b0_1280.jpg",
        title: "Journey Begins",
        description: "The excitement of starting an educational adventure"
    },
    {
        src: "https://pixabay.com/get/g1518a6443181525b572c48b0871ad2323cb566f565b7db28f56e814d10a62c9f7230ccb6ad3888e119b36a106cd68dd1168f9440ee9a65bbfb797351072d273e_1280.jpg",
        title: "Statue of Liberty",
        description: "Iconic symbol of freedom and democracy"
    },
    {
        src: "https://pixabay.com/get/g85655d0a7db373039a6c43e587eb7715766b9ed9872dba18a02f1f3cf2a02639e931814bad2337cca075f30c65592ede45a3cb6552915d81fd17336c65823b97_1280.jpg",
        title: "NASA Space Center",
        description: "Exploring the frontiers of space exploration"
    },
    {
        src: "https://pixabay.com/get/g6822a24cca5b137fae0de6cab6155a350ffb25e83f2761264a64acb87755f46cc5602e88119803d431e631677ba86eb6854bee5a5f41b9f8862ec303c54535bd_1280.jpg",
        title: "US Capitol Building",
        description: "Heart of American democracy and governance"
    },
    {
        src: "https://pixabay.com/get/g4f6167ad9c23a789f00019696aefdbb8460cb479cc5f4f44ac49958c7f9f2f8abbed5880a280e47fad31d8fc584689b5f79999e97aa685b59ee084607dc24682_1280.jpg",
        title: "Washington Monument",
        description: "Tribute to America's founding father"
    },
    {
        src: "https://pixabay.com/get/gc48ca0014b4183740ccc6daf8775f3e1649ec3e388f37899e0f632cacb77307f29740a30d10c5c2224c0a17c16d9bfd4b0bf60d4b62cf895003a52c6aaf9bb14_1280.jpg",
        title: "Collaborative Study",
        description: "Students working together on educational projects"
    },
    {
        src: "https://pixabay.com/get/g9aadc14ce4ec0a7a5c25c85e10425c1d0e4bdddcbbf2f736ce2a488e4ce8bd99239c601cc010f5fabe128e74a6c144b9587b9c9b1bd18c9880e69b1b48c1db19_1280.jpg",
        title: "Educational Workshop",
        description: "Hands-on learning and skill development"
    },
    {
        src: "https://pixabay.com/get/gf8317cffa031d756f0c1c9e1fc5b64e51fc438a2ca011cbfb54d8e6fea98661b31d0a8bb611d6ff35147974911d96038ab06b454faec748bbad88d30ed458289_1280.jpg",
        title: "Team Building",
        description: "Building friendships and teamwork skills"
    },
    {
        src: "https://pixabay.com/get/g5b2abc7a7e2e80fe88638154b44013d9f926534de8510ae5f42f65c7af808fdd9520785a24fa9f138ed1e26bda0e38dba6222c60e061b159cd5759ccab9504b0_1280.jpg",
        title: "Cultural Learning",
        description: "Immersing in local cultures and traditions"
    },
    {
        src: "https://pixabay.com/get/g78cf0b85b51288faab46c3605b086a16e6a986a5c98621eaccfcc4957b67bc6f10fc3ffb8e22417e57760c4d1035562d6196c78a55be2ee9e2b55cca6b1adee2_1280.jpg",
        title: "European Heritage",
        description: "Exploring centuries of art and architecture"
    },
    {
        src: "https://pixabay.com/get/g10437dde8b37169cd92e26e91dc8a5d7cd063f26e8732e031971de13846c41d6d58434395149c590c61c728737f751e5d21f87dd0128171f3e7da3c01954c9dd_1280.jpg",
        title: "Asian Spirituality",
        description: "Discovering ancient wisdom and philosophy"
    },
    {
        src: "https://pixabay.com/get/gfc5475b84328bd12d0b482cc04d98d0989c23c14f0db86dc299f9a05d024ecb606693c798206894d2a6a6b2a8225afd12689951053088cd78260d0c25ade1d77_1280.jpg",
        title: "Cultural Immersion",
        description: "Experiencing the diversity of Asian cultures"
    },
    {
        src: "https://pixabay.com/get/gc0b925da3fa3c71726a68f41f4612baceb50eecea92c251b51fa87c928df4856904b7433f3ca169b2ceca53ef51aa065b2a53ec75db75e70f65e8c8814400217_1280.jpg",
        title: "Global Exploration",
        description: "Connecting with the world through education"
    },
    {
        src: "https://pixabay.com/get/gbabc698ad7ce7d15b19561936195ed6493552d096504f85ccfd92e8473195cdc7fba17f63a6f179fb9edae21f737bbd550f69987b9b2867e365120cbfeb27932_1280.jpg",
        title: "Adventure Learning",
        description: "Education through adventure and exploration"
    },
    {
        src: "https://pixabay.com/get/ge488965565ef2ac38e7805d2b0ca0038f72014215951bebf532952a34dd5033fd7dc325d871d6972945e4322ca65908aa6bf0898948a57ccc83411c25ca98ec9_1280.jpg",
        title: "Natural Wonders",
        description: "Learning from nature's magnificent creations"
    }
];

let currentLightboxIndex = 0;

function initLightbox() {
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightboxModal) {
        lightboxModal.addEventListener('click', function(e) {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightboxModal && lightboxModal.style.display === 'flex') {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
                case 'ArrowLeft':
                    previousImage();
                    break;
            }
        }
    });
}

function openLightbox(index) {
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');
    
    if (!lightboxModal || !galleryImages[index]) return;
    
    currentLightboxIndex = index;
    const image = galleryImages[index];
    
    lightboxImage.src = image.src;
    lightboxImage.alt = image.title;
    lightboxTitle.textContent = image.title;
    lightboxDescription.textContent = image.description;
    
    lightboxModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightboxModal = document.getElementById('lightboxModal');
    if (lightboxModal) {
        lightboxModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function nextImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % galleryImages.length;
    updateLightboxImage();
}

function previousImage() {
    currentLightboxIndex = currentLightboxIndex === 0 ? galleryImages.length - 1 : currentLightboxIndex - 1;
    updateLightboxImage();
}

function updateLightboxImage() {
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');
    
    if (!lightboxImage || !galleryImages[currentLightboxIndex]) return;
    
    const image = galleryImages[currentLightboxIndex];
    
    lightboxImage.src = image.src;
    lightboxImage.alt = image.title;
    lightboxTitle.textContent = image.title;
    lightboxDescription.textContent = image.description;
}

// Filter functionality for tours and gallery pages
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            filterItems(filter);
        });
    });
}

function filterItems(category) {
    const tourCards = document.querySelectorAll('.tour-card');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Filter tour cards if they exist
    tourCards.forEach(card => {
        const cardCategories = card.getAttribute('data-category') || '';
        
        if (category === 'all' || cardCategories.includes(category)) {
            card.style.display = 'block';
            card.classList.add('fade-in-up');
        } else {
            card.style.display = 'none';
        }
    });
    
    // Filter gallery items if they exist
    galleryItems.forEach(item => {
        const itemCategories = item.getAttribute('data-category') || '';
        
        if (category === 'all' || itemCategories.includes(category)) {
            item.style.display = 'block';
            item.classList.add('fade-in-up');
        } else {
            item.style.display = 'none';
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-item, .destination-card, .tour-card, .testimonial-item, .team-member, .achievement-item');
    animatedElements.forEach(el => observer.observe(el));
}

// FAQ functionality
function initFAQ() {
    // FAQ items are handled by the toggleFAQ function called from HTML
}

function toggleFAQ(element) {
    const faqItem = element.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Tour details functionality (placeholder for future implementation)
function openTourDetails(tourId) {
    // This would typically open a modal or navigate to a detailed tour page
    console.log('Opening tour details for:', tourId);
    
    // For now, just show an alert
    alert('Tour details will be available soon. Please contact us for more information about this tour package.');
}

// Quote request functionality (placeholder for future implementation)
function requestQuote(tourId) {
    // This would typically open a quote request form or navigate to contact page
    console.log('Requesting quote for:', tourId);
    
    // For now, navigate to contact page with tour parameter
    window.location.href = `contact.html?tour=${tourId}`;
}

// Utility function to get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Initialize tour parameter from URL if present
function initTourParameter() {
    const tourParam = getUrlParameter('tour');
    if (tourParam && window.location.pathname.includes('contact.html')) {
        const destinationSelect = document.getElementById('destination');
        const messageTextarea = document.getElementById('message');
        
        if (destinationSelect && messageTextarea) {
            // Pre-fill form based on tour parameter
            let destinationValue = '';
            let messagePrefix = '';
            
            switch(tourParam) {
                case 'usa-stem':
                case 'usa-eastcoast':
                    destinationValue = 'usa';
                    messagePrefix = 'I am interested in the USA educational tour. ';
                    break;
                case 'europe-culture':
                    destinationValue = 'europe';
                    messagePrefix = 'I am interested in the European cultural tour. ';
                    break;
                case 'asia-innovation':
                    destinationValue = 'asia';
                    messagePrefix = 'I am interested in the Asian innovation tour. ';
                    break;
                default:
                    messagePrefix = `I am interested in the ${tourParam} tour. `;
            }
            
            if (destinationValue) {
                destinationSelect.value = destinationValue;
            }
            
            messageTextarea.value = messagePrefix + messageTextarea.placeholder;
        }
    }
}

// Initialize tour parameter on page load
document.addEventListener('DOMContentLoaded', function() {
    initTourParameter();
});

// Loading state management
function showLoading(button) {
    if (button) {
        button.classList.add('loading');
        button.disabled = true;
        const originalText = button.textContent;
        button.textContent = 'Loading...';
        button.setAttribute('data-original-text', originalText);
    }
}

function hideLoading(button) {
    if (button) {
        button.classList.remove('loading');
        button.disabled = false;
        const originalText = button.getAttribute('data-original-text');
        if (originalText) {
            button.textContent = originalText;
            button.removeAttribute('data-original-text');
        }
    }
}

// Error handling
function showError(message, element) {
    if (element) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        element.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
}

// Success message display
function showSuccess(message, element) {
    if (element) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        successDiv.style.color = 'var(--accent-green)';
        successDiv.style.padding = '1rem';
        successDiv.style.marginTop = '1rem';
        successDiv.style.borderRadius = 'var(--border-radius)';
        successDiv.style.backgroundColor = 'var(--light-green)';
        element.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
}

// Analytics tracking (placeholder for future implementation)
function trackEvent(category, action, label) {
    // This would integrate with Google Analytics or other tracking services
    console.log('Tracking event:', { category, action, label });
}

// Performance monitoring
function measurePerformance() {
    if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log('Page load time:', loadTime + 'ms');
    }
}

// Initialize performance monitoring
window.addEventListener('load', measurePerformance);

// Export functions for global access
window.openTourDetails = openTourDetails;
window.requestQuote = requestQuote;
window.toggleFAQ = toggleFAQ;
window.openLightbox = openLightbox;
window.nextImage = nextImage;
window.previousImage = previousImage;
window.nextTestimonial = nextTestimonial;
window.previousTestimonial = previousTestimonial;
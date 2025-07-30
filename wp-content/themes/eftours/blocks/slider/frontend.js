document.addEventListener('DOMContentLoaded', function() {
    const sliders = document.querySelectorAll('.wp-block-image-slider');
    
    sliders.forEach(function(slider) {
        const slides = slider.querySelectorAll('.slide');
        const prevBtn = slider.querySelector('.slider-prev');
        const nextBtn = slider.querySelector('.slider-next');
        const dots = slider.querySelectorAll('.dot');
        const container = slider.querySelector('.slider-container');
        
        // Get settings from data attributes
        const autoplay = slider.dataset.autoplay === 'true';
        const autoplaySpeed = parseInt(slider.dataset.autoplaySpeed) || 4000;
        const sliderHeight = parseInt(slider.dataset.sliderHeight) || 400;
        const maxHeight = parseInt(slider.dataset.maxHeight) || 540;
        const objectPosition = slider.dataset.objectPosition || 'top';
        const tabletHeight = parseInt(slider.dataset.tabletHeight) || 300;
        const mobileHeight = parseInt(slider.dataset.mobileHeight) || 250;
        
        // Apply dynamic styles
        function applyDynamicStyles() {
            const screenWidth = window.innerWidth;
            let currentHeight = sliderHeight;
            
            // Responsive height logic
            if (screenWidth <= 480) {
                currentHeight = mobileHeight;
            } else if (screenWidth <= 768) {
                currentHeight = tabletHeight;
            }
            
            // Apply height with max-height constraint
            const finalHeight = Math.min(currentHeight, maxHeight);
            container.style.height = `${finalHeight}px`;
            container.style.maxHeight = `${maxHeight}px`;
            
            // Apply object-position to all images
            slides.forEach(slide => {
                const img = slide.querySelector('img');
                if (img) {
                    img.style.objectPosition = objectPosition;
                }
            });
        }
        
        // Apply styles on load and resize
        applyDynamicStyles();
        window.addEventListener('resize', applyDynamicStyles);
        
        let currentSlide = 0;
        let autoplayInterval;
        
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active', 'previous');
                if (i === index) {
                    slide.classList.add('active');
                } else if (i === currentSlide) {
                    slide.classList.add('previous');
                }
            });
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
            currentSlide = index;
        }
        
        function nextSlide() {
            const next = (currentSlide + 1) % slides.length;
            showSlide(next);
        }
        
        function prevSlide() {
            const prev = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prev);
        }
        
        // Event listeners
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });
        
        // Autoplay
        function startAutoplay() {
            if (autoplay && slides.length > 1) {
                autoplayInterval = setInterval(nextSlide, autoplaySpeed);
            }
        }
        
        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }
        
        // Pause on hover
        slider.addEventListener('mouseenter', stopAutoplay);
        slider.addEventListener('mouseleave', startAutoplay);
        
        // Keyboard navigation
        slider.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });
        
        // Initialize
        startAutoplay();
    });
});

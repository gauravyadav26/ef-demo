document.addEventListener('DOMContentLoaded', function () {
    const tabContainers = document.querySelectorAll('.wp-block-theme-tabs');

    tabContainers.forEach(container => {
        const tabButtons = container.querySelectorAll('.tab-button');
        const tabPanels = container.querySelectorAll('.tab-panel, .tab-content');

        tabButtons.forEach((button, index) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                // Remove active class from all buttons and panels
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanels.forEach(panel => panel.classList.remove('active'));

                // Add active class to clicked button and corresponding panel
                button.classList.add('active');
                if (tabPanels[index]) {
                    tabPanels[index].classList.add('active');
                }

                // Trigger custom event for other scripts
                container.dispatchEvent(new CustomEvent('tabChanged', {
                    detail: { activeIndex: index }
                }));
            });
        });

        // Keyboard navigation
        container.addEventListener('keydown', (e) => {
            const activeButton = container.querySelector('.tab-button.active');
            const activeIndex = Array.from(tabButtons).indexOf(activeButton);

            let newIndex = activeIndex;

            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    newIndex = activeIndex > 0 ? activeIndex - 1 : tabButtons.length - 1;
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    newIndex = activeIndex < tabButtons.length - 1 ? activeIndex + 1 : 0;
                    break;
                case 'Home':
                    e.preventDefault();
                    newIndex = 0;
                    break;
                case 'End':
                    e.preventDefault();
                    newIndex = tabButtons.length - 1;
                    break;
            }

            if (newIndex !== activeIndex) {
                tabButtons[newIndex].click();
                tabButtons[newIndex].focus();
            }
        });

        // Set proper ARIA attributes
        tabButtons.forEach((button, index) => {
            button.setAttribute('role', 'tab');
            button.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
            button.setAttribute('aria-controls', `tab-panel-${index}`);
            button.setAttribute('id', `tab-${index}`);
            button.setAttribute('tabindex', index === 0 ? '0' : '-1');
        });

        tabPanels.forEach((panel, index) => {
            panel.setAttribute('role', 'tabpanel');
            panel.setAttribute('aria-labelledby', `tab-${index}`);
            panel.setAttribute('id', `tab-panel-${index}`);
            panel.setAttribute('tabindex', '0');
        });

        container.setAttribute('role', 'tablist');
        
        // Initialize first tab as active on page load
        if (tabButtons.length > 0 && tabPanels.length > 0) {
            // Ensure first tab button is active
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabButtons[0].classList.add('active');
            
            // Ensure first tab panel is active
            tabPanels.forEach(panel => panel.classList.remove('active'));
            if (tabPanels[0]) {
                tabPanels[0].classList.add('active');
            }
            
            // Set proper ARIA attributes for initial state
            tabButtons.forEach((button, index) => {
                button.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
                button.setAttribute('tabindex', index === 0 ? '0' : '-1');
            });
        }
    });
});
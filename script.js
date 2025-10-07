    document.addEventListener('DOMContentLoaded', function() {

            // --- Mobile Navigation Toggle ---
            const menuToggle = document.getElementById('menu-toggle');
            const navbar = document.getElementById('navbar');

            if (menuToggle && navbar) {
                // Accessibility: ARIA attributes
                menuToggle.setAttribute('aria-label', 'Open navigation menu');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.setAttribute('aria-controls', 'navbar');

                // Toggle menu
                menuToggle.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const isActive = navbar.classList.toggle('active');
                    menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
                });

                // Close menu when a nav link is clicked
                navbar.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', () => {
                        if (navbar.classList.contains('active')) {
                            navbar.classList.remove('active');
                            menuToggle.setAttribute('aria-expanded', 'false');
                        }
                    });
                });

                // Close menu when clicking outside
                document.addEventListener('click', (e) => {
                    if (navbar.classList.contains('active') && !navbar.contains(e.target) && e.target !== menuToggle) {
                        navbar.classList.remove('active');
                        menuToggle.setAttribute('aria-expanded', 'false');
                    }
                });

                // Close menu on ESC key
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && navbar.classList.contains('active')) {
                        navbar.classList.remove('active');
                        menuToggle.setAttribute('aria-expanded', 'false');
                    }
                });
            }

            // --- Active Nav Link Highlighting on Scroll ---
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('#navbar a');

            const navOptions = {
                root: null, // viewport
                threshold: 0.5, // 50% of section visible
                rootMargin: "-80px 0px 0px 0px" // Adjust for fixed header height
            };

            const navObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const correspondingLink = document.querySelector(`#navbar a[href="#${entry.target.id}"]`);
                        navLinks.forEach(link => link.classList.remove('active'));
                        if (correspondingLink) {
                            correspondingLink.classList.add('active');
                        }
                    }
                });
            }, navOptions);

            sections.forEach(section => {
                if(section.id) { // Only observe sections that have an ID
                     navObserver.observe(section);
                }
            });

            // --- Scroll Animation for Support Section ---
            const supportItems = document.querySelectorAll('.support-item');

            const supportObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        // Apply a delay based on the item's index
                        entry.target.style.transitionDelay = `${index * 150}ms`;
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target); // Stop observing once visible
                    }
                });
            }, {
                threshold: 0.1, // Trigger when 10% of the item is visible
                rootMargin: '0px 0px -50px 0px' // Start animation a bit before it's fully in view
            });

            supportItems.forEach(item => {
                supportObserver.observe(item);
            });

            // --- Scroll Animation for Album Section ---
            const albumItems = document.querySelectorAll('.album-item');

            const albumObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        // Apply a delay based on the item's index
                        entry.target.style.transitionDelay = `${index * 150}ms`;
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target); // Stop observing once visible
                    }
                });
            }, {
                threshold: 0.1, // Trigger when 10% of the item is visible
                rootMargin: '0px 0px -50px 0px' // Start animation a bit before it's fully in view
            });

            albumItems.forEach(item => {
                albumObserver.observe(item);
            });
    // End of DOMContentLoaded
});
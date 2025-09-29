        document.addEventListener('DOMContentLoaded', function() {

            // --- Mobile Navigation Toggle ---
            const menuToggle = document.getElementById('menu-toggle');
            const navbar = document.getElementById('navbar');

            if (menuToggle && navbar) {
                 menuToggle.addEventListener('click', () => {
                    navbar.classList.toggle('active');
                 });
                 // Close menu when a link is clicked (optional)
                 navbar.querySelectorAll('a').forEach(link => {
                     link.addEventListener('click', () => {
                         if (navbar.classList.contains('active')) {
                            navbar.classList.remove('active');
                         }
                     });
                 });
            }

            // --- Active Nav Link Highlighting on Scroll ---
            const sections = document.querySelectorAll('section'); // Select all sections
            const navLinks = document.querySelectorAll('#navbar a.nav-link');

            const options = {
                root: null, // viewport
                threshold: 0.5, // 50% of section visible
                rootMargin: "-80px 0px 0px 0px" // Adjust for fixed header height
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        navLinks.forEach(link => {
                            link.classList.remove('active');
                            // Check if the link's href matches the intersecting section's id
                            if (link.getAttribute('href') === `#${entry.target.id}`) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
            }, options);

            // Observe all section elements found
            sections.forEach(section => {
                if(section.id) { // Only observe sections that have an ID (relevant for nav)
                     observer.observe(section);
                }
            });

        });
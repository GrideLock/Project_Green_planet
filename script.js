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

            // --- Signup Form Submission ---
            const signupForm = document.getElementById('signupForm');
            if (signupForm) {
                signupForm.addEventListener('submit', async function(e) {
                    e.preventDefault();
                    const username = document.getElementById('signup-username').value;
                    const email = document.getElementById('signup-email').value;
                    const password = document.getElementById('signup-password').value;
                    const messageDiv = document.getElementById('signup-message');
                    messageDiv.textContent = '';
                    try {
                        const res = await fetch('http://localhost:3000/signup', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ username, email, password })
                        });
                        const data = await res.json();
                        if (res.ok) {
                            messageDiv.style.color = 'green';
                            messageDiv.textContent = data.message;
                            signupForm.reset();
                        } else {
                            messageDiv.style.color = 'red';
                            messageDiv.textContent = data.message || 'Sign up failed.';
                        }
                    } catch (err) {
                        messageDiv.style.color = 'red';
                        messageDiv.textContent = 'Error connecting to server.';
                    }
                });
            }

            // --- Login Form Submission & User State Management ---
            const loginForm = document.getElementById('loginForm');
            const navLogin = document.getElementById('nav-login');
            const navSignup = document.getElementById('nav-signup');
            const navUser = document.getElementById('nav-user');
            const signupSection = document.getElementById('signup');
            const loginSection = document.getElementById('login');

            function showUserNav(username) {
                if (navLogin) navLogin.style.display = 'none';
                if (navSignup) navSignup.style.display = 'none';
                if (signupSection) signupSection.style.display = 'none';
                if (loginSection) loginSection.style.display = 'none';

                if (navUser) {
                    navUser.style.display = 'flex'; // Use flex for alignment
                    navUser.innerHTML = `
                        <span><i class='bx bx-user'></i> ${username}</span>
                        <button id="logoutBtn" class="btn">Log Out</button>
                    `;

                    const logoutBtn = document.getElementById('logoutBtn');
                    if (logoutBtn) {
                        logoutBtn.addEventListener('click', () => {
                            localStorage.removeItem('username');
                            window.location.reload(); // Reload to reset state
                        });
                    }
                }
            }

            function showGuestNav() {
                if (navLogin) navLogin.style.display = '';
                if (navSignup) navSignup.style.display = '';
                if (navUser) navUser.style.display = 'none';
                if (signupSection) signupSection.style.display = '';
                if (loginSection) loginSection.style.display = '';
            }

            const storedUser = localStorage.getItem('username');
            if (storedUser) {
                showUserNav(storedUser);
            } else {
                showGuestNav();
            }

            if (loginForm) {
                loginForm.addEventListener('submit', async function(e) {
                    e.preventDefault();
                    const email = document.getElementById('login-email').value;
                    const password = document.getElementById('login-password').value;
                    const messageDiv = document.getElementById('login-message');
                    messageDiv.textContent = '';
                    try {
                        const res = await fetch('http://localhost:3000/login', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email, password })
                        });
                        const data = await res.json();
                        if (res.ok) {
                            messageDiv.style.color = 'green';
                            messageDiv.textContent = data.message;
                            localStorage.setItem('username', data.username);

                            setTimeout(() => {
                                showUserNav(data.username);
                                loginForm.reset();
                                window.location.hash = '#home';
                            }, 1000);

                        } else {
                            messageDiv.style.color = 'red';
                            messageDiv.textContent = data.message || 'Login failed.';
                        }
                    } catch (err) {
                        messageDiv.style.color = 'red';
                        messageDiv.textContent = 'Error connecting to server.';
                    }
                });
            }
    // End of DOMContentLoaded
});
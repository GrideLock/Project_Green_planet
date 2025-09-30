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

            // --- Login Form Submission ---
            const loginForm = document.getElementById('loginForm');
            const navLogin = document.getElementById('nav-login');
            const navSignup = document.getElementById('nav-signup');
            const navUser = document.getElementById('nav-user');

            function showUserNav(username) {
                if (navLogin) navLogin.style.display = 'none';
                if (navSignup) navSignup.style.display = 'none';
                if (navUser) {
                    navUser.style.display = '';
                    navUser.innerHTML = `<span style=\"color:var(--main-color);font-weight:bold;\"><i class='bx bx-user'></i> ${username}</span> <button id=\"logoutBtn\" class=\"btn\" style=\"margin-left:10px;\">Log Out</button>`;
                    // Hide signup and login sections
                    const signupSection = document.getElementById('signup');
                    if (signupSection) signupSection.style.display = 'none';
                    const loginSection = document.getElementById('login');
                    if (loginSection) loginSection.style.display = 'none';
                    // Add logout event
                    setTimeout(() => {
                        const logoutBtn = document.getElementById('logoutBtn');
                        if (logoutBtn) {
                            logoutBtn.onclick = function() {
                                localStorage.removeItem('username');
                                if (navLogin) navLogin.style.display = '';
                                if (navSignup) navSignup.style.display = '';
                                if (navUser) navUser.style.display = 'none';
                                // Show signup and login sections again
                                const signupSection = document.getElementById('signup');
                                if (signupSection) signupSection.style.display = '';
                                const loginSection = document.getElementById('login');
                                if (loginSection) loginSection.style.display = '';
                                // Optionally, scroll to home
                                window.location.hash = '#home';
                            };
                        }
                    }, 100);
                }
            }

            // On page load, check if user is logged in
            const storedUser = localStorage.getItem('username');
            if (storedUser) {
                showUserNav(storedUser);
            } else {
                // Show signup and login sections if not logged in
                const signupSection = document.getElementById('signup');
                if (signupSection) signupSection.style.display = '';
                const loginSection = document.getElementById('login');
                if (loginSection) loginSection.style.display = '';
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
                            showUserNav(data.username);
                            loginForm.reset();
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
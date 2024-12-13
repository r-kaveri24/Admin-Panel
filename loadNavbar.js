document.addEventListener('DOMContentLoaded', function() {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (navbarPlaceholder) {
        fetch('navbar.html')
            .then(response => response.text())
            .then(data => {
                navbarPlaceholder.innerHTML = data;

                const dropdown = document.getElementById('dropdown');
                if (dropdown) {
                    dropdown.addEventListener('click', function() {
                        const clicked = document.getElementById("drop-menu");
                        clicked.style.display = (clicked.style.display === "block") ? "none" : "block";
                    });
                }

                // Function to set active class based on current URL and update upper navbar h1
                const setActiveLink = () => {
                    const currentPage = window.location.pathname.split('/').pop(); // Get the current file name
                    const navLinks = document.querySelectorAll('.left-navbar a');
                    let activeLinkText = "Hero Section"; // Default value for upper navbar h1

                    navLinks.forEach(link => {
                        const linkPath = link.getAttribute('href').split('/').pop(); // Get the href file name
                        const linkH2 = link.querySelector('h2');

                        if (linkH2) {
                            if (linkPath === currentPage) { // Check if current page file name matches href file name
                                linkH2.classList.add('active');
                                activeLinkText = linkH2.textContent.trim(); // Set active link text for upper navbar h1
                            } else {
                                linkH2.classList.remove('active');
                            }
                        }
                    });

                    // Update h1 in the upper navbar
                    const upperNavbarH1 = document.querySelector('.uppper-navbar h1');
                    if (upperNavbarH1) {
                        upperNavbarH1.textContent = activeLinkText;
                    }
                };

                // Set active class and update h1 on page load
                setActiveLink();

                // Add event listeners to update active class and h1 on click
                const navLinks = document.querySelectorAll('.left-navbar a');
                navLinks.forEach(function(navLink) {
                    navLink.addEventListener('click', function() {
                        setActiveLink();
                    });
                });
            })
            .catch(error => console.error('Error loading navbar:', error));
    }
});

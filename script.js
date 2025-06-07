document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');

    // Function to show a specific section
    function showSection(sectionId) {
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
    }

    // Function to update active nav link
    function updateNavLink(activeLinkId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        document.getElementById(activeLinkId).classList.add('active');
    }

    // Handle initial load and hash in URL
    const initialHash = window.location.hash.substring(1); // Remove '#'
    if (initialHash && document.getElementById(initialHash)) {
        showSection(initialHash);
        updateNavLink(initialHash + '-link');
    } else {
        // Default to Beranda if no valid hash
        showSection('beranda');
        updateNavLink('beranda-link');
    }

    // Add click event listeners to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor behavior
            const sectionId = this.getAttribute('href').substring(1); // Get section ID from href
            showSection(sectionId);
            updateNavLink(this.id);
            window.history.pushState(null, '', `#${sectionId}`); // Update URL hash
        });
    });
});
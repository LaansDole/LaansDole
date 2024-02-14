// Add click event listeners to the links
document.querySelectorAll('a.md-nav__link').forEach(function (element) {
    element.addEventListener('click', function (e) {
        e.preventDefault();
        // Store the href in localStorage before navigating
        localStorage.setItem('nextHref', element.href);
        window.location.href = element.href;
    });
});

// On page load, check if we should reload
window.addEventListener('DOMContentLoaded', function () {
    let nextHref = localStorage.getItem('nextHref');
    if (nextHref && nextHref === window.location.href) {
        localStorage.removeItem('nextHref'); // Clear the nextHref so we don't get stuck in a reload loop
        window.location.href = window.location.href + '#loaded';
        window.location.reload();
    }
});

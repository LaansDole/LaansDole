window.addEventListener('resize', function () {
    let mq = window.matchMedia('(max-width: 600px)');
    let hostnameElement = document.getElementById('hostname');

    if (mq.matches) {
        // If the screen width is less than or equal to 600px
        hostnameElement.textContent = 'laansdole';
    } else {
        // If the screen width is greater than 600px
        hostnameElement.textContent = 'laansdole.github.io';
    }
});

// Call the function at run time
window.dispatchEvent(new Event('resize'));
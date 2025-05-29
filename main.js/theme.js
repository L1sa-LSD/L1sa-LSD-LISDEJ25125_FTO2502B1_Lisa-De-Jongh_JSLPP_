
// Get saved theme preference from localStorage
let darkmode = localStorage.getItem('darkmode');

// Get the checkbox input element (not the slider span)
const themeSwitch = document.querySelector('.switch input[type="checkbox"]');

// Function to enable dark mode
const enableDarkMode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active');
    themeSwitch.checked = true; // Sync checkbox state
};

// Function to disable dark mode
const disableDarkMode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode', 'null');
    themeSwitch.checked = false; // Sync checkbox state
};

// Apply saved theme on page load
if (darkmode === 'active') {
    enableDarkMode();
} else {
    disableDarkMode();
}

// Add event listener to the checkbox for theme switching
themeSwitch.addEventListener('change', () => {
    // Toggle theme based on checkbox state
    if (themeSwitch.checked) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});
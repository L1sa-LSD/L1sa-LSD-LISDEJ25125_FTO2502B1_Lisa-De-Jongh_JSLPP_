
// Get saved theme preference from localStorage
let darkmode = localStorage.getItem('darkmode');

// Get the checkbox input elements by their unique IDs
const mainThemeSwitch = document.querySelector('#theme-switch'); // Main sidebar switch
const mobileThemeSwitch = document.querySelector('#mobile-theme-switch'); // Mobile modal switch

// Function to enable dark mode
const enableDarkMode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active');
    // Sync checkbox states if they exist
    if (mainThemeSwitch) mainThemeSwitch.checked = true;
    if (mobileThemeSwitch) mobileThemeSwitch.checked = true;
};

// Function to disable dark mode
const disableDarkMode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode', 'null');
    // Sync checkbox states if they exist
    if (mainThemeSwitch) mainThemeSwitch.checked = false;
    if (mobileThemeSwitch) mobileThemeSwitch.checked = false;
};

// Apply saved theme on page load
if (darkmode === 'active') {
    enableDarkMode();
} else {
    disableDarkMode();
}

// Shared handler for theme switch changes
const handleThemeSwitchChange = (event) => {
    if (event.target.checked) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
};

// Add event listener to the main theme switch
if (mainThemeSwitch) {
    mainThemeSwitch.addEventListener('change', handleThemeSwitchChange);
}

// Add event listener to the mobile theme switch
if (mobileThemeSwitch) {
    mobileThemeSwitch.addEventListener('change', handleThemeSwitchChange);
}
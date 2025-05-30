
document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("side-bar-div");
    const hideBtn = document.querySelector(".hide-sidebar-btn");
    const showBtn = document.getElementById("showSidebarBtn");

    // Original hide functionality
    hideBtn.addEventListener("click", () => {
        sidebar.classList.add("hidden");
        document.body.classList.add("sidebar-hidden");
        showBtn.style.display = "block";
    });

    // Original show functionality  
    showBtn.addEventListener("click", () => {
        sidebar.classList.remove("hidden");
        document.body.classList.remove("sidebar-hidden");
        showBtn.style.display = "none";
    });
   document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("side-bar-div");
    const hideBtn = document.querySelector(".hide-sidebar-btn");
    const showBtn = document.getElementsByClassName("logo-mobile");

    // Original hide functionality
    hideBtn.addEventListener("click", () => {
        sidebar.classList.add("hidden");
        document.body.classList.add("sidebar-hidden");
        showBtn.style.display = "block";
    });

    // Original show functionality  
    showBtn.addEventListener("click", () => {
        sidebar.classList.remove("hidden");
        document.body.classList.remove("sidebar-hidden");
        showBtn.style.display = "none";
    });

})
})



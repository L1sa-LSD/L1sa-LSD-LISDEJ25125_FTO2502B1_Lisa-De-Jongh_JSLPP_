
document.addEventListener("DOMContentLoaded", () => {
        
   const sidebar = document.getElementById("side-bar-div");
   const hideBtn = document.querySelector(".hide-sidebar-btn");
   const showBtn = document.getElementById("showSidebarBtn");

     hideBtn.addEventListener("click", () => {

     sidebar.classList.add("hidden");
     document.body.classList.add("sidebar-hidden");
     showBtn.style.display = "block";
    });

   showBtn.addEventListener("click", () => {

   sidebar.classList.remove("hidden");
   document.body.classList.remove("sidebar-hidden");
   showBtn.style.display = "none";
      });
});

document.addEventListener("DOMContentLoaded", () => {
      
   const sidebar = document.getElementById("side-bar-div");
   const hideBtn = document.querySelector(".hide-sidebar-btn");
   const imageShowBtn = document.getElementsByClassName("logo-mobile");

    hideBtn.addEventListener("click", () => {

     sidebar.classList.add("hidden");
     document.body.classList.add("sidebar-hidden");
     showBtn.style.display = "block";
      });

     imageShowBtn.addEventListener("click", () => { 
      
      sidebar.classList.remove("hidden");
      document.body.classList.remove("sidebar-hidden");
      imageShowBtn.style.display = "none";

     })


 



});
window.onload = function () {
  const activePages = window.location.pathname;
  const homeNav = document.querySelectorAll(".home-nav");
  const navLinks = document.querySelectorAll(".navbar a").forEach((link) => {
    if (link.href == '/') {
      homeNav.classList.add("active");
    } else (link.href.includes(`${activePages}`)) {
      link.classList.add("active");
    } 
  });
  const menu_btn = document.querySelector(".hamburger");
  const mobile_menu = document.querySelector(".mobile-nav");
  menu_btn.addEventListener("click", function () {
    menu_btn.classList.toggle("is-active");
    mobile_menu.classList.toggle("is-active");
  });
};

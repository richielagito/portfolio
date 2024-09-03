window.onload = function () {
  const activePages = window.location.pathname;
  const navLinks = document.querySelectorAll(".navbar a").forEach((link) => {
    if (link.href.includes(`${activePages}`)) {
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

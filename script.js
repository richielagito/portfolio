window.onload = function () {
  const navLinks = document.querySelectorAll(".navbar a");

  navLinks.forEach(navLinkEl => {
    navLinkEl.addEventListener('click', () => {
      document.querySelector('.active')?.classList.remove('active');
      navLinkEl.classList.add('active');
    });
  });
  
  const menu_btn = document.querySelector(".hamburger");
  const mobile_menu = document.querySelector(".mobile-nav");
  menu_btn.addEventListener("click", function () {
    menu_btn.classList.toggle("is-active");
    mobile_menu.classList.toggle("is-active");
  });
};

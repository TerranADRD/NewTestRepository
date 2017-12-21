var closeMenuButton = document.querySelector(".nav--main-menu  .main-nav__button");
var nav = document.querySelector("nav.nav--main-menu");

nav.classList.remove("nav--main-menu--nojs");

closeMenuButton.addEventListener("click", function() {
  if (nav.classList.contains("nav--main-menu--closed")) {
    nav.classList.remove("nav--main-menu--closed");
    nav.classList.add("nav--main-menu--open");
  } else {
    nav.classList.remove("nav--main-menu--open");
    nav.classList.add("nav--main-menu--closed");
  }

});


closeMenuButton.click();
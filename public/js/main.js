//! Navbar toggle

const navBar = document.getElementById("main__nav");
const menuToggle = () => {
  const toggleMenu = document.querySelector(".toggle");
  const menu = document.querySelector(".navbar__collapsed");
  toggleMenu.classList.toggle("active");
  menu.classList.toggle("open");
};

//! Navbar scroll

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navBar.classList.add("scrolled");
  } else {
    navBar.classList.remove("scrolled");
  }
});

//! Review form

const preview = document.querySelector(".preview");
const trigger = document.querySelector(".reviewBtn");
const form = document.querySelector(".reviewForm");

trigger.addEventListener("click", function () {
  preview.classList.add("open");
  form.classList.add("open");
});

preview.addEventListener("click", function (e) {
  if (e.target.classList.contains("preview")) {
    preview.classList.remove("open");
    form.classList.remove("open");
  }
});

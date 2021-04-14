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

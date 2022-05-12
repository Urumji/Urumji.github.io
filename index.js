"use strict";

/*collapse navbar */
const toggleButton = document.querySelector(".toggle-button");
const navBlock = document.querySelector(".nav-block");

toggleButton.addEventListener("click", () => {
  if (navBlock.classList.contains("active")) {
    setTimeout(function () {
      navBlock.classList.remove("active");
    }, 0);
    navBlock.classList.remove("visible");
  } else {
    setTimeout(function () {
      navBlock.classList.add("visible");
    }, 230);
    setTimeout(function () {
      navBlock.classList.add("active");
    }, 0);
  }
});

/*scroll parts */

const courses = [...document.querySelectorAll(".section")];
const btnThemes = [...document.querySelectorAll(".nav-item")];
const navBar = document.querySelector("nav");

console.log(navBar.getBoundingClientRect().height);
console.log(btnThemes);
console.log(courses);

btnThemes.forEach((theme) =>
  theme.addEventListener("click", function (e) {
    console.log(e);
    const yOffset = navBar.getBoundingClientRect().height;
    const scrolled = courses[e.target.dataset.scroll];
    const datasScrolled =
      scrolled.getBoundingClientRect().top + window.pageYOffset - yOffset;
    /*courses[e.target.dataset.scroll].scrollIntoView({ behavior: "smooth" });*/
    window.scrollTo({ top: datasScrolled, behavior: "smooth" });
  })
);

/*slider*/

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider-btn-left");
  const btnRight = document.querySelector(".slider-btn-right");
  const polylineLeft = document.querySelector(
    ".slider-btn-left .polyline1-left"
  );
  const polylineRight = document.querySelector(
    ".slider-btn-right .polyline1-right"
  );
  const svgLeft = document.querySelector(".slider-btn-left svg");
  const svgRight = document.querySelector(".slider-btn-right svg");

  polylineRight.classList.add("stroke-green");
  svgRight.classList.add("background-black");
  polylineLeft.classList.add("stroke-black");

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;

      polylineRight.classList.remove("stroke-black");
      polylineRight.classList.add("stroke-green");
      svgRight.classList.add("background-black");
      svgLeft.classList.remove("background-black");
      polylineLeft.classList.add("stroke-black");
    } else if (curSlide === maxSlide - 2) {
      polylineRight.classList.add("stroke-black");
      svgRight.classList.remove("background-black");
      polylineLeft.classList.remove("stroke-black");

      curSlide = maxSlide - 1;
    } else {
      curSlide++;
      polylineLeft.classList.remove("stroke-black");
      polylineLeft.classList.add("stroke-green");
      svgLeft.classList.add("background-black");
    }
    goToSlide(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
      svgLeft.classList.add("background-black");
      polylineLeft.classList.add("stroke-green");
      polylineLeft.classList.remove("stroke-black");
      polylineRight.classList.remove("stroke-green");
      svgRight.classList.remove("background-black");
      polylineRight.classList.add("stroke-black");
    } else if (curSlide === 1) {
      svgLeft.classList.remove("background-black");
      polylineLeft.classList.remove("stroke-green");
      polylineLeft.classList.add("stroke-black");
      curSlide--;
    } else if (curSlide === maxSlide - 1) {
      svgRight.classList.add("background-black");
      polylineRight.classList.add("stroke-green");
      polylineRight.classList.remove("stroke-black");
      curSlide--;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
  };

  const init = function () {
    goToSlide(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });
};
slider();

/* Placeholders*/

const inputs = [...document.querySelectorAll(".inputs")];
const labels = [...document.querySelectorAll(".input-label")];

console.log(inputs, labels);

labels.forEach((label) => label.classList.add("unfocused"));

inputs.forEach((input) =>
  input.addEventListener("click", function (e) {
    console.log(e);
    console.log(e.target.value);
    console.log(labels[e.target.dataset.input]);
    labels[e.target.dataset.input].classList.remove("unfocused");
    labels[e.target.dataset.input].classList.add("focused");
    labels[e.target.dataset.input].classList.add("focused-color");
  })
);
inputs.forEach((input) =>
  input.addEventListener("focusout", function (e) {
    if (e.target.value === "") {
      labels[e.target.dataset.input].classList.remove("focused");
      labels[e.target.dataset.input].classList.add("unfocused");
    }
    labels[e.target.dataset.input].classList.remove("focused-color");
  })
);

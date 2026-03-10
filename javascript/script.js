(function () {

function qs(sel, el = document) { return el.querySelector(sel); }
function qsa(sel, el = document) { return Array.from(el.querySelectorAll(sel)); }


// ===== MOBILE MENU =====

const toggle = qs(".nav-toggle");
const mobile = qs(".nav-mobile");

if (toggle && mobile) {

toggle.addEventListener("click", () => {

mobile.classList.toggle("open");

});

}


// ===== DESATIVA SLIDER NO MOBILE =====

if (window.innerWidth <= 768) {

const slider = qs(".hero-slider");

if (slider) {

const slides = qsa(".slides article", slider);
const arrows = qsa(".slider-arrow", slider);
const dots = qs(".slider-dots", slider);

// mostra apenas o primeiro slide
slides.forEach((slide, i) => {
slide.classList.remove("is-active");
if (i === 0) {
slide.style.display = "block";
slide.classList.add("is-active");
} else {
slide.style.display = "none";
}
});

// remove setas
arrows.forEach(a => a.style.display = "none");

// remove dots
if (dots) dots.style.display = "none";

}

return;

}


// ===== SLIDER DESKTOP =====

function initSlider(root) {

const slidesWrap = qs(".slides", root);
if (!slidesWrap) return;

const slides = qsa(":scope > .slides > article", root);
if (!slides.length) return;

const prevBtn = qs(".slider-arrow.prev", root) || qs(".slider-arrow.prev1", root);
const nextBtn = qs(".slider-arrow.next", root) || qs(".slider-arrow.next1", root);
const dotsWrap = qs(".slider-dots", root);

let index = 0;

let dots = [];

if (dotsWrap) {

dotsWrap.innerHTML = "";

dots = slides.map((_, i) => {

const b = document.createElement("button");

if (i === 0) b.classList.add("is-active");

b.addEventListener("click", () => goTo(i));

dotsWrap.appendChild(b);

return b;

});

}

function render() {

slides.forEach((s, i) => s.classList.toggle("is-active", i === index));

if (dots.length) {
dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
}

}

function goTo(i) {

index = (i + slides.length) % slides.length;

render();

}

function next() {

goTo(index + 1);

}

function prev() {

goTo(index - 1);

}

if (nextBtn) nextBtn.addEventListener("click", next);
if (prevBtn) prevBtn.addEventListener("click", prev);

setInterval(next, 5000);

render();

}

qsa("[data-slider]").forEach(initSlider);

})();
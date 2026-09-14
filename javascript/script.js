/* =========================================================
   FRUTOS DE GOIÁS SOROCABA
   JAVASCRIPT — NOVA VERSÃO
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     MENU MOBILE
  ======================================================= */

  const navToggle = document.querySelector(".nav-toggle");
  const mobileNav = document.querySelector(".mobile-nav");

  if (navToggle && mobileNav) {

    navToggle.addEventListener("click", () => {
      mobileNav.classList.toggle("open");

      const opened = mobileNav.classList.contains("open");

      navToggle.setAttribute(
        "aria-expanded",
        opened ? "true" : "false"
      );
    });


    const mobileLinks = mobileNav.querySelectorAll("a");

    mobileLinks.forEach(link => {

      link.addEventListener("click", () => {
        mobileNav.classList.remove("open");

        navToggle.setAttribute(
          "aria-expanded",
          "false"
        );
      });

    });

  }


  /* =======================================================
     SLIDER PRINCIPAL
  ======================================================= */

  const slider = document.querySelector("[data-slider]");

  if (slider) {

    const slides = Array.from(
      slider.querySelectorAll(".hero-slide")
    );

    const nextButton = slider.querySelector(
      ".slider-arrow--next"
    );

    const prevButton = slider.querySelector(
      ".slider-arrow--prev"
    );

    const dotsContainer = slider.querySelector(
      ".slider-dots"
    );

    let currentSlide = 0;
    let autoplay;


    /* -----------------------------------------------
       CRIA DOTS
    ------------------------------------------------ */

    slides.forEach((slide, index) => {

      const dot = document.createElement("button");

      dot.type = "button";
      dot.className = "slider-dot";

      dot.setAttribute(
        "aria-label",
        `Ir para slide ${index + 1}`
      );

      dot.addEventListener("click", () => {
        goToSlide(index);
        restartAutoplay();
      });

      dotsContainer.appendChild(dot);

    });


    const dots = Array.from(
      dotsContainer.querySelectorAll(".slider-dot")
    );


    /* -----------------------------------------------
       MOSTRA SLIDE
    ------------------------------------------------ */

    function renderSlide(index) {

      slides.forEach((slide, i) => {
        slide.classList.toggle(
          "active",
          i === index
        );
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle(
          "active",
          i === index
        );
      });

    }


    /* -----------------------------------------------
       IR PARA SLIDE
    ------------------------------------------------ */

    function goToSlide(index) {

      if (index < 0) {
        index = slides.length - 1;
      }

      if (index >= slides.length) {
        index = 0;
      }

      currentSlide = index;

      renderSlide(currentSlide);

    }


    /* -----------------------------------------------
       PRÓXIMO
    ------------------------------------------------ */

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }


    /* -----------------------------------------------
       ANTERIOR
    ------------------------------------------------ */

    function previousSlide() {
      goToSlide(currentSlide - 1);
    }


    /* -----------------------------------------------
       EVENTOS
    ------------------------------------------------ */

    if (nextButton) {

      nextButton.addEventListener("click", () => {

        nextSlide();
        restartAutoplay();

      });

    }


    if (prevButton) {

      prevButton.addEventListener("click", () => {

        previousSlide();
        restartAutoplay();

      });

    }


    /* -----------------------------------------------
       AUTOPLAY
    ------------------------------------------------ */

    function startAutoplay() {

      autoplay = setInterval(() => {

        nextSlide();

      }, 6500);

    }


    function restartAutoplay() {

      clearInterval(autoplay);

      startAutoplay();

    }


    /* -----------------------------------------------
       PAUSA AO PASSAR O MOUSE
    ------------------------------------------------ */

    slider.addEventListener("mouseenter", () => {
      clearInterval(autoplay);
    });


    slider.addEventListener("mouseleave", () => {
      startAutoplay();
    });


    /* -----------------------------------------------
       TOUCH / SWIPE
    ------------------------------------------------ */

    let touchStartX = 0;
    let touchEndX = 0;


    slider.addEventListener(
      "touchstart",
      event => {

        touchStartX =
          event.changedTouches[0].screenX;

      },
      { passive: true }
    );


    slider.addEventListener(
      "touchend",
      event => {

        touchEndX =
          event.changedTouches[0].screenX;

        handleSwipe();

      },
      { passive: true }
    );


    function handleSwipe() {

      const difference =
        touchStartX - touchEndX;

      if (Math.abs(difference) < 50) {
        return;
      }

      if (difference > 0) {
        nextSlide();
      } else {
        previousSlide();
      }

      restartAutoplay();

    }


    /* -----------------------------------------------
       INICIA
    ------------------------------------------------ */

    renderSlide(0);
    startAutoplay();

  }


  /* =======================================================
     FECHA MENU AO CLICAR FORA
  ======================================================= */

  document.addEventListener("click", event => {

    if (!mobileNav || !navToggle) {
      return;
    }

    const clickedInsideMenu =
      mobileNav.contains(event.target);

    const clickedToggle =
      navToggle.contains(event.target);

    if (
      mobileNav.classList.contains("open") &&
      !clickedInsideMenu &&
      !clickedToggle
    ) {

      mobileNav.classList.remove("open");

      navToggle.setAttribute(
        "aria-expanded",
        "false"
      );

    }

  });


  /* =======================================================
     ANIMAÇÃO SUAVE DOS ELEMENTOS AO ENTRAR NA TELA
  ======================================================= */

  const animatedElements = document.querySelectorAll(
    ".product-card, .about-feature, .store-content, .store-image"
  );


  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform =
              "translateY(0)";

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12
      }
    );


    animatedElements.forEach(element => {

      element.style.opacity = "0";
      element.style.transform =
        "translateY(20px)";
      element.style.transition =
        "opacity .7s ease, transform .7s ease";

      observer.observe(element);

    });

  }


});


/* =========================================================
   GOOGLE ADS — CLIQUE NO DELIVERY
========================================================= */

function trackDeliveryClick() {

  if (typeof gtag !== "function") {
    return;
  }

  gtag("event", "conversion", {
    "send_to": "AW-18291833181"
  });

}
document.addEventListener("DOMContentLoaded", function () {

    const menuButton = document.querySelector(".produtos-menu-button");
    const mobileMenu = document.querySelector(".produtos-mobile-menu");


    if (menuButton && mobileMenu) {

        menuButton.addEventListener("click", function () {

            const isOpen = mobileMenu.classList.toggle("open");

            menuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });


        const mobileLinks = mobileMenu.querySelectorAll("a");

        mobileLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                mobileMenu.classList.remove("open");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /*
     * Fecha o menu caso o usuário clique fora dele.
     */

    document.addEventListener("click", function (event) {

        if (!menuButton || !mobileMenu) {
            return;
        }


        const clickedInsideMenu =
            mobileMenu.contains(event.target);

        const clickedButton =
            menuButton.contains(event.target);


        if (
            !clickedInsideMenu &&
            !clickedButton
        ) {

            mobileMenu.classList.remove("open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });


    /*
     * Pequena animação de entrada dos cards.
     */

    const cards = document.querySelectorAll(
        ".diferencial-card, .categoria-card"
    );


    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries, obs) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        obs.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


        cards.forEach(function (card) {

            card.classList.add("animate-card");

            observer.observe(card);

        });

    }

});
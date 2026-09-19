document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MENU MOBILE
    ========================================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen = menuToggle.classList.toggle("active");

            mainNav.classList.toggle("active", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Chiudi il menu" : "Apri il menu"
            );
        });


        // Chiude il menu quando si clicca un link
        mainNav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                menuToggle.classList.remove("active");
                mainNav.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Apri il menu"
                );

            });

        });


        // Chiude il menu con ESC
        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {

                menuToggle.classList.remove("active");
                mainNav.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Apri il menu"
                );

            }

        });

    }


    /* =========================================
       HEADER: CAMBIO QUANDO SI SCORRE
    ========================================= */

    const header = document.querySelector(".site-header");

    if (header) {

        const updateHeader = () => {

            if (window.scrollY > 40) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }

        };

        window.addEventListener("scroll", updateHeader);
        updateHeader();

    }


    /* =========================================
       ANIMAZIONI DI ENTRATA
    ========================================= */

    const revealElements = document.querySelectorAll(
        ".section-content, " +
        ".service-card, " +
        ".technology-item, " +
        ".tool-item, " +
        ".working-card, " +
        ".project-card, " +
        ".faq-item"
    );


    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("is-visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


        revealElements.forEach(element => {

            element.classList.add("reveal");

            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("is-visible");
        });

    }


    /* =========================================
       FAQ
    ========================================= */

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        item.addEventListener("toggle", () => {

            if (!item.open) return;

            faqItems.forEach(otherItem => {

                if (otherItem !== item) {
                    otherItem.removeAttribute("open");
                }

            });

        });

    });


    /* =========================================
       LINEE DELLA HERO
    ========================================= */

    const hero = document.querySelector(".hero");
    const heroLines = document.querySelector(".hero-lines");

    if (hero && heroLines) {

        hero.addEventListener("mousemove", event => {

            const rect = hero.getBoundingClientRect();

            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;

            const moveX = (x - 0.5) * 14;
            const moveY = (y - 0.5) * 10;

            heroLines.style.transform =
                `translate(${moveX}px, ${moveY}px)`;

        });


        hero.addEventListener("mouseleave", () => {

            heroLines.style.transform =
                "translate(0, 0)";

        });

    }


    /* =========================================
       ANIMAZIONE LEGGERA DELLE LINEE
    ========================================= */

    const lineElements = document.querySelectorAll(
        ".hero-lines .line"
    );

    lineElements.forEach((line, index) => {

        line.style.animationDelay =
            `${index * 0.12}s`;

    });


    /* =========================================
       ANNO FOOTER
    ========================================= */

    const currentYear = document.getElementById("current-year");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

});
document.addEventListener("DOMContentLoaded", () => {


  /* =========================================================
     MENU MOBILE
  ========================================================= */

  const menuToggle =
    document.querySelector(".menu-toggle");

  const mainNavigation =
    document.querySelector(".main-nav");

  if (menuToggle && mainNavigation) {

    menuToggle.addEventListener("click", () => {

      const isOpen =
        menuToggle.getAttribute("aria-expanded") === "true";

      menuToggle.setAttribute(
        "aria-expanded",
        String(!isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Apri il menu" : "Chiudi il menu"
      );

      mainNavigation.classList.toggle(
        "is-open",
        !isOpen
      );

    });


    /* Chiudi il menu cliccando su una voce */

    mainNavigation.querySelectorAll("a").forEach((link) => {

      link.addEventListener("click", () => {

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.setAttribute(
          "aria-label",
          "Apri il menu"
        );

        mainNavigation.classList.remove(
          "is-open"
        );

      });

    });

  }


  /* =========================================================
     IL PERCORSO — SEGNALIBRI
  ========================================================= */

  const storyTabs =
    document.querySelectorAll(".story-tab");

  const storyPanels =
    document.querySelectorAll(".story-panel");

  if (storyTabs.length && storyPanels.length) {

    function activateStoryTab(
      tab,
      moveFocus = false
    ) {

      const targetId =
        tab.dataset.panel;

      const targetPanel =
        document.getElementById(targetId);

      if (!targetPanel) {

        console.warn(
          `Pannello non trovato: ${targetId}`
        );

        return;

      }


      /* Aggiorna i tab */

      storyTabs.forEach((currentTab) => {

        const isActive =
          currentTab === tab;

        currentTab.classList.toggle(
          "is-active",
          isActive
        );

        currentTab.setAttribute(
          "aria-selected",
          isActive ? "true" : "false"
        );

        currentTab.setAttribute(
          "tabindex",
          isActive ? "0" : "-1"
        );

      });


      /* Mostra solo il pannello selezionato */

      storyPanels.forEach((panel) => {

        const isActive =
          panel === targetPanel;

        panel.hidden =
          !isActive;

        panel.classList.toggle(
          "is-active",
          isActive
        );

      });


      /* Accessibilità */

      if (moveFocus) {
        tab.focus();
      }

    }


    /* =====================================================
       CLICK SUI TAB
    ===================================================== */

    storyTabs.forEach((tab) => {

      tab.addEventListener("click", () => {

        activateStoryTab(tab);

      });

    });


    /* =====================================================
       NAVIGAZIONE DA TASTIERA
    ===================================================== */

    storyTabs.forEach((tab, index) => {

      tab.addEventListener("keydown", (event) => {

        let newIndex = null;


        if (event.key === "ArrowRight") {

          newIndex =
            (index + 1) %
            storyTabs.length;

        }


        if (event.key === "ArrowLeft") {

          newIndex =
            (index - 1 + storyTabs.length) %
            storyTabs.length;

        }


        if (event.key === "Home") {

          newIndex = 0;

        }


        if (event.key === "End") {

          newIndex =
            storyTabs.length - 1;

        }


        if (newIndex !== null) {

          event.preventDefault();

          activateStoryTab(
            storyTabs[newIndex],
            true
          );

        }

      });

    });


    /* =====================================================
       STATO INIZIALE
    ===================================================== */

    const initialTab =
      document.querySelector(
        ".story-tab.is-active"
      ) ||
      storyTabs[0];

    activateStoryTab(initialTab);

  }


  /* =========================================================
     ANNO FOOTER
  ========================================================= */

  const currentYear =
    document.getElementById("current-year");

  if (currentYear) {

    currentYear.textContent =
      new Date().getFullYear();

  }


  /* =========================================================
     FORM CONTATTI — WEB3FORMS
  ========================================================= */

  const contactForm =
    document.querySelector(".contact-form");

  if (contactForm) {

    contactForm.addEventListener(
      "submit",
      async (event) => {

        event.preventDefault();


        const submitButton =
          contactForm.querySelector(
            ".contact-submit"
          );


        /* Evita doppi invii */

        if (submitButton.disabled) {
          return;
        }


        const originalButtonText =
          submitButton.innerHTML;


        /* Stato invio */

        submitButton.disabled =
          true;

        submitButton.innerHTML =
          'Invio in corso <span aria-hidden="true">…</span>';


        try {

          const formData =
            new FormData(contactForm);


          const response =
            await fetch(
              contactForm.action,
              {
                method: "POST",
                body: formData,
                headers: {
                  Accept: "application/json"
                }
              }
            );


          const result =
            await response.json();


          if (result.success) {

            /* Svuota il form */

            contactForm.reset();


            /* Messaggio di successo */

            let successMessage =
              contactForm.querySelector(
                ".contact-form-message"
              );


            if (!successMessage) {

              successMessage =
                document.createElement("p");

              successMessage.className =
                "contact-form-message";

              submitButton.insertAdjacentElement(
                "afterend",
                successMessage
              );

            }


            successMessage.textContent =
              "Richiesta inviata. Grazie, ti risponderò appena possibile.";

            successMessage.classList.add(
              "is-success"
            );


            /* Ripristina pulsante */

            submitButton.disabled =
              false;

            submitButton.innerHTML =
              originalButtonText;

          } else {

            throw new Error(
              "Invio non riuscito"
            );

          }

        } catch (error) {

          console.error(
            "Errore nell'invio del modulo:",
            error
          );


          let errorMessage =
            contactForm.querySelector(
              ".contact-form-message"
            );


          if (!errorMessage) {

            errorMessage =
              document.createElement("p");

            errorMessage.className =
              "contact-form-message";

            submitButton.insertAdjacentElement(
              "afterend",
              errorMessage
            );

          }


          errorMessage.textContent =
            "Non è stato possibile inviare la richiesta. Riprova tra poco.";

          errorMessage.classList.add(
            "is-error"
          );


          submitButton.disabled =
            false;

          submitButton.innerHTML =
            originalButtonText;

        }

      }
    );

  }

  /* =========================================================
     ANIMAZIONE LINEE CONTATTI
  ========================================================= */

  const contactSection =
    document.querySelector(".contact-section");

  const contactLines =
    document.querySelector(".contact-lines");

  if (contactSection && contactLines) {

    let contactAnimationStarted = false;

    function checkContactLines() {

      if (contactAnimationStarted) {
        return;
      }

      const rect =
        contactLines.getBoundingClientRect();

      /*
        Avvia l'animazione quando le linee
        stanno per entrare nella parte visibile
        dello schermo.
      */

      const triggerPoint =
        window.innerHeight * 0.85;

      if (rect.top < triggerPoint) {

        contactSection.classList.add(
          "is-visible"
        );

        contactAnimationStarted = true;

        window.removeEventListener(
          "scroll",
          checkContactLines
        );

      }

    }


    window.addEventListener(
      "scroll",
      checkContactLines,
      { passive: true }
    );


    /* Controllo iniziale */

    checkContactLines();

  }
});
document.addEventListener("DOMContentLoaded", () => {

/* =========================================================
MENU MOBILE
========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const mainNavigation = document.querySelector(".main-nav");

if (menuToggle && mainNavigation) {

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    mainNavigation.classList.toggle("is-open", !isOpen);
  });

  mainNavigation.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      mainNavigation.classList.remove("is-open");
    });

  });

}


/* =========================================================
IL PERCORSO — SEGNALIBRI
========================================================= */

const storyTabs = document.querySelectorAll(".story-tab");
const storyPanels = document.querySelectorAll(".story-panel");

if (storyTabs.length && storyPanels.length) {

  function activateStoryTab(tab, moveFocus = false) {

    const targetId = tab.dataset.panel;
    const targetPanel = document.getElementById(targetId);

    if (!targetPanel) {
      console.warn(`Pannello non trovato: ${targetId}`);
      return;
    }


    /* Aggiorna i tab */

    storyTabs.forEach((currentTab) => {

      const isActive = currentTab === tab;

      currentTab.classList.toggle("is-active", isActive);

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

      const isActive = panel === targetPanel;

      panel.hidden = !isActive;
      panel.classList.toggle("is-active", isActive);

    });


    /* =====================================================
    SCROLL AUTOMATICO DEI TAB SU MOBILE
    ===================================================== */

    if (
      window.innerWidth <= 768 &&
      storyTabs.length > 1
    ) {

      tab.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest"
      });

    }


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
        newIndex = (index + 1) % storyTabs.length;
      }


      if (event.key === "ArrowLeft") {
        newIndex =
          (index - 1 + storyTabs.length) % storyTabs.length;
      }


      if (event.key === "Home") {
        newIndex = 0;
      }


      if (event.key === "End") {
        newIndex = storyTabs.length - 1;
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
    document.querySelector(".story-tab.is-active") ||
    storyTabs[0];

  activateStoryTab(initialTab);

}


/* =========================================================
ANNO FOOTER
========================================================= */

const currentYear = document.getElementById("current-year");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

});
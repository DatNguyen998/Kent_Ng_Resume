'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// lock/unlock background scroll while any modal is open
const setBodyScrollLock = function () {
  const anyOpen = document.querySelector(".modal-container.active");
  document.body.classList.toggle("modal-open", !!anyOpen);
}

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
  setBodyScrollLock();
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
if (overlay) overlay.addEventListener("click", testimonialsModalFunc);



// -----------------------------------------------------------------------------
// PROJECT DETAIL MODAL (reuses the shared modal styles)
// -----------------------------------------------------------------------------
const projectCards = document.querySelectorAll("[data-project-item]");
const projectModalContainer = document.querySelector("[data-project-modal-container]");
const projectModalCloseBtn = document.querySelector("[data-project-modal-close-btn]");
const projectOverlay = document.querySelector("[data-project-overlay]");

const projectModalImg = document.querySelector("[data-project-modal-img]");
const projectModalTitle = document.querySelector("[data-project-modal-title]");
const projectModalCategory = document.querySelector("[data-project-modal-category]");
const projectModalText = document.querySelector("[data-project-modal-text]");
const projectModalTech = document.querySelector("[data-project-modal-tech]");
const projectModalLink = document.querySelector("[data-project-modal-link]");

const projectModalFunc = function () {
  if (!projectModalContainer) return;
  projectModalContainer.classList.toggle("active");
  projectOverlay.classList.toggle("active");
  setBodyScrollLock();
}

for (let i = 0; i < projectCards.length; i++) {
  const trigger = projectCards[i].querySelector("[data-project-open]") || projectCards[i];

  trigger.addEventListener("click", function (event) {
    // don't follow the card link – open the detail modal instead
    event.preventDefault();

    const data = projectCards[i].dataset;
    const img = projectCards[i].querySelector("img");

    if (img && projectModalImg) {
      projectModalImg.src = img.src;
      projectModalImg.alt = img.alt;
    }
    if (projectModalTitle) projectModalTitle.textContent = data.projectTitle || "";
    if (projectModalCategory) projectModalCategory.textContent = data.projectCategory || "";
    if (projectModalText) projectModalText.textContent = data.projectDesc || "";

    // tech chips
    if (projectModalTech) {
      projectModalTech.innerHTML = "";
      (data.projectTech || "").split(",").forEach(function (t) {
        const label = t.trim();
        if (!label) return;
        const chip = document.createElement("span");
        chip.className = "project-tech-chip";
        chip.textContent = label;
        projectModalTech.appendChild(chip);
      });
    }

    // outbound link (hidden when there's nothing meaningful to link to)
    if (projectModalLink) {
      const url = data.projectLink;
      if (url && url !== "#") {
        projectModalLink.href = url;
        projectModalLink.style.display = "";
      } else {
        projectModalLink.style.display = "none";
      }
    }

    projectModalFunc();
  });
}

if (projectModalCloseBtn) projectModalCloseBtn.addEventListener("click", projectModalFunc);
if (projectOverlay) projectOverlay.addEventListener("click", projectModalFunc);

// close whichever modal is open when Escape is pressed
document.addEventListener("keydown", function (event) {
  if (event.key !== "Escape") return;
  if (modalContainer && modalContainer.classList.contains("active")) testimonialsModalFunc();
  if (projectModalContainer && projectModalContainer.classList.contains("active")) projectModalFunc();
});



// -----------------------------------------------------------------------------
// PORTFOLIO FILTER
// -----------------------------------------------------------------------------

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");

// the tags shown on large screens (top row) and the dropdown items
// are all [data-select-item]; one handler drives both UIs.
const filterTags = document.querySelectorAll("[data-select-item]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// highlight the currently selected tag across every filter UI
const setActiveTag = function (value) {
  for (let i = 0; i < filterTags.length; i++) {
    filterTags[i].classList.toggle("active", filterTags[i].dataset.value === value);
  }
}

// add event to all filter items (top tags + dropdown)
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    // use the explicit data-value key, NOT the visible label
    const selectedValue = this.dataset.value;

    if (selectValue) selectValue.innerText = this.innerText;
    if (select && select.classList.contains("active")) elementToggleFunc(select);

    filterFunc(selectedValue);
    setActiveTag(selectedValue);

  });
}



// -----------------------------------------------------------------------------
// PAGE NAVIGATION
// -----------------------------------------------------------------------------
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    const target = this.innerHTML.toLowerCase();

    // toggle pages
    for (let j = 0; j < pages.length; j++) {
      pages[j].classList.toggle("active", pages[j].dataset.page === target);
    }

    // toggle nav links independently of page order
    for (let j = 0; j < navigationLinks.length; j++) {
      navigationLinks[j].classList.toggle("active", navigationLinks[j] === this);
    }

    window.scrollTo(0, 0);

    // re-run reveal / skill animations for the freshly shown page
    revealOnView();

  });
}



// -----------------------------------------------------------------------------
// SCROLL REVEAL + SKILL BAR ANIMATIONS
// -----------------------------------------------------------------------------
const revealItems = document.querySelectorAll(".reveal");
const skillFills = document.querySelectorAll(".skill-progress-fill");

// remember each fill's target width, then reset to 0 so it can animate in
skillFills.forEach(function (fill) {
  fill.dataset.targetWidth = fill.style.width || "0%";
  fill.style.width = "0%";
});

const animateSkill = function (fill) {
  fill.style.width = fill.dataset.targetWidth || "0%";
}

let observer = null;
if ("IntersectionObserver" in window) {
  observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add("reveal--visible");
      if (el.classList.contains("skill-progress-fill")) animateSkill(el);
      obs.unobserve(el);
    });
  }, { threshold: 0.15 });

  revealItems.forEach(function (el) { observer.observe(el); });
  skillFills.forEach(function (el) { observer.observe(el); });
}

// Pages are shown/hidden via tabs, so elements inside a hidden tab never
// intersect. When a tab opens, reveal anything already in view immediately.
function revealOnView() {
  const trigger = function (el) {
    if (el.offsetParent === null) return; // still hidden
    el.classList.add("reveal--visible");
    if (el.classList.contains("skill-progress-fill")) animateSkill(el);
    if (observer) observer.unobserve(el);
  };
  revealItems.forEach(trigger);
  skillFills.forEach(trigger);
}

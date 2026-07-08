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



// -----------------------------------------------------------------------------
// SHARED MODAL — one modal drives both references and project details
// -----------------------------------------------------------------------------
const modalContainer = document.querySelector("[data-modal-container]");
const overlay = document.querySelector("[data-overlay]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");

const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalCategory = document.querySelector("[data-modal-category]");
const modalText = document.querySelector("[data-modal-text]");
const modalTech = document.querySelector("[data-modal-tech]");
const modalLink = document.querySelector("[data-modal-link]");

const show = function (el, visible) { if (el) el.style.display = visible ? "" : "none"; };

const closeModal = function () {
  if (!modalContainer) return;
  modalContainer.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("modal-open");
};

// cfg: { img, imgAlt, title, category, html, tech: [], link }
const openModal = function (cfg) {
  if (!modalContainer) return;

  if (modalImg) { modalImg.src = cfg.img || ""; modalImg.alt = cfg.imgAlt || ""; }
  if (modalTitle) modalTitle.textContent = cfg.title || "";

  if (modalCategory) { modalCategory.textContent = cfg.category || ""; show(modalCategory, !!cfg.category); }
  if (modalText) modalText.innerHTML = cfg.html || "";

  if (modalTech) {
    modalTech.innerHTML = "";
    const tech = (cfg.tech || []).map(function (t) { return t.trim(); }).filter(Boolean);
    tech.forEach(function (label) {
      const chip = document.createElement("span");
      chip.className = "project-tech-chip";
      chip.textContent = label;
      modalTech.appendChild(chip);
    });
    show(modalTech, tech.length > 0);
  }

  if (modalLink) {
    const hasLink = cfg.link && cfg.link !== "#";
    if (hasLink) modalLink.href = cfg.link;
    show(modalLink, hasLink);
  }

  modalContainer.classList.add("active");
  overlay.classList.add("active");
  document.body.classList.add("modal-open");
};

if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
if (overlay) overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") closeModal();
});

// references / testimonials cards
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    const avatar = this.querySelector("[data-testimonials-avatar]");
    openModal({
      img: avatar ? avatar.src : "",
      imgAlt: avatar ? avatar.alt : "",
      title: this.querySelector("[data-testimonials-title]").textContent,
      html: this.querySelector("[data-testimonials-text]").innerHTML,
    });
  });
}

// portfolio project cards
const projectCards = document.querySelectorAll("[data-project-item]");
for (let i = 0; i < projectCards.length; i++) {
  const trigger = projectCards[i].querySelector("[data-project-open]") || projectCards[i];

  trigger.addEventListener("click", function (event) {
    // don't follow the card link – open the detail modal instead
    event.preventDefault();

    const d = projectCards[i].dataset;
    const img = projectCards[i].querySelector("img");
    openModal({
      img: img ? img.src : "",
      imgAlt: img ? img.alt : "",
      title: d.projectTitle,
      category: d.projectCategory,
      html: d.projectDesc,
      tech: (d.projectTech || "").split(","),
      link: d.projectLink,
    });
  });
}



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
} else {
  // no IntersectionObserver: never leave content hidden — show it all at once
  revealItems.forEach(function (el) { el.classList.add("reveal--visible"); });
  skillFills.forEach(animateSkill);
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

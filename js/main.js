const works = [
  { title: "Recent", count: 16, group: "portfolio" },
  { title: "Work", count: 12, group: "portfolio" },
  { title: "Work II", count: 15, group: "portfolio" },
  { title: "Work III", count: 10, group: "portfolio" },
  { title: "Work IV", count: 14, group: "portfolio" },
  { title: "26 States", count: 18, group: "portfolio" },
  { title: "Portrait Studies - 2026", count: 8, group: "projects" },
  { title: "Street Light - 2025", count: 11, group: "projects" },
  { title: "Archive Notes - 2024", count: 9, group: "projects" },
  { title: "Commissioned Work - 2024", count: 15, group: "projects" },
  { title: "Personal Work - 2023", count: 7, group: "projects" }
];

const slides = [
  { title: "Recent", image: "images/work-portrait.svg", alt: "Portrait Studies" },
  { title: "Recent", image: "images/work-street.svg", alt: "Street Light" },
  { title: "Recent", image: "images/work-archive.svg", alt: "Archive Notes" },
  { title: "Recent", image: "images/work-commission.svg", alt: "Commissioned Work" },
  { title: "Recent", image: "images/work-portrait.svg", alt: "Portrait Studies" },
  { title: "Recent", image: "images/work-street.svg", alt: "Street Light" },
  { title: "Recent", image: "images/work-archive.svg", alt: "Archive Notes" },
  { title: "Recent", image: "images/work-commission.svg", alt: "Commissioned Work" },
  { title: "Recent", image: "images/work-portrait.svg", alt: "Portrait Studies" },
  { title: "Recent", image: "images/work-street.svg", alt: "Street Light" },
  { title: "Recent", image: "images/work-archive.svg", alt: "Archive Notes" },
  { title: "Recent", image: "images/work-commission.svg", alt: "Commissioned Work" },
  { title: "Recent", image: "images/work-portrait.svg", alt: "Portrait Studies" },
  { title: "Recent", image: "images/work-street.svg", alt: "Street Light" },
  { title: "Recent", image: "images/work-archive.svg", alt: "Archive Notes" },
  { title: "Recent", image: "images/work-commission.svg", alt: "Commissioned Work" }
];

let activeIndex = 0;

const body = document.body;
const activeImage = document.querySelector("#active-image");
const activeCaption = document.querySelector("#active-caption");
const thumbsGhost = document.querySelector("#thumbs-ghost");
const thumbsTitle = document.querySelector("#thumbs-title");
const workIndex = document.querySelector("#work-index");
const thumbsGrid = document.querySelector("#thumbs-grid");
const panel = document.querySelector(".index-panel");
const thumbsOverlay = document.querySelector(".thumbs-overlay");
const modalOverlay = document.querySelector(".modal-overlay");

function padNumber(number) {
  return String(number).padStart(2, "0");
}

function captionFor(index) {
  const slide = slides[index];
  return `${slide.title} - ${index + 1}/${slides.length}`;
}

function renderSlide(index) {
  activeIndex = (index + slides.length) % slides.length;
  const slide = slides[activeIndex];

  activeImage.src = slide.image;
  activeImage.alt = slide.alt;
  activeCaption.textContent = captionFor(activeIndex);
  thumbsGhost.src = slide.image;
  thumbsTitle.textContent = slide.title;

  document.querySelectorAll("[data-thumb]").forEach((button) => {
    button.classList.toggle("is-active", Number(button.dataset.thumb) === activeIndex);
  });

  window.history.replaceState(null, "", `#recent-${padNumber(activeIndex + 1)}`);
}

function renderWorkIndex() {
  let previousGroup = "";
  const fragment = document.createDocumentFragment();

  works.forEach((work, index) => {
    if (previousGroup && previousGroup !== work.group) {
      const spacer = document.createElement("li");
      spacer.className = "work-index__spacer";
      spacer.setAttribute("aria-hidden", "true");
      fragment.append(spacer);
    }

    const item = document.createElement("li");
    const button = document.createElement("button");
    const label = document.createElement("span");
    const count = document.createElement("span");

    label.textContent = work.title;
    count.textContent = work.count;
    button.type = "button";
    button.append(label, count);
    button.classList.toggle("is-active", index === 0);
    button.addEventListener("click", () => {
      closePanel();
      renderSlide(0);
    });

    item.append(button);
    fragment.append(item);
    previousGroup = work.group;
  });

  workIndex.append(fragment);
}

function renderThumbs() {
  const fragment = document.createDocumentFragment();

  slides.forEach((slide, index) => {
    const button = document.createElement("button");
    const image = document.createElement("img");

    button.type = "button";
    button.dataset.thumb = index;
    button.setAttribute("aria-label", `${slide.title} ${index + 1}`);
    image.src = slide.image;
    image.alt = "";
    button.append(image);
    button.addEventListener("click", () => {
      renderSlide(index);
      closeThumbs();
    });
    fragment.append(button);
  });

  thumbsGrid.append(fragment);
}

function openPanel() {
  closeThumbs();
  body.classList.add("is-panel-open");
  body.classList.add("is-modal-open");
  panel.setAttribute("aria-hidden", "false");
}

function closePanel() {
  body.classList.remove("is-panel-open");
  if (!body.classList.contains("is-thumbs-open")) body.classList.remove("is-modal-open");
  panel.setAttribute("aria-hidden", "true");
}

function openThumbs() {
  closePanel();
  body.classList.add("is-thumbs-open");
  body.classList.add("is-modal-open");
  thumbsOverlay.setAttribute("aria-hidden", "false");
}

function closeThumbs() {
  body.classList.remove("is-thumbs-open");
  if (!body.classList.contains("is-panel-open")) body.classList.remove("is-modal-open");
  thumbsOverlay.setAttribute("aria-hidden", "true");
}

function setPanelTab(tab) {
  document.querySelectorAll("[data-panel-tab]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.panelTab === tab);
  });

  document.querySelectorAll("[data-panel-section]").forEach((section) => {
    section.classList.toggle("is-active", section.dataset.panelSection === tab);
  });
}

document.querySelectorAll("[data-direction]").forEach((button) => {
  button.addEventListener("click", () => {
    renderSlide(activeIndex + (button.dataset.direction === "next" ? 1 : -1));
  });
});

document.querySelector("[data-open-panel]").addEventListener("click", openPanel);
document.querySelector("[data-close-panel]").addEventListener("click", closePanel);
document.querySelector("[data-open-thumbs]").addEventListener("click", openThumbs);
document.querySelector("[data-close-thumbs]").addEventListener("click", closeThumbs);
modalOverlay.addEventListener("click", () => {
  closePanel();
  closeThumbs();
});

document.querySelectorAll("[data-panel-tab]").forEach((button) => {
  button.addEventListener("click", () => setPanelTab(button.dataset.panelTab));
});

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") renderSlide(activeIndex + 1);
  if (event.key === "ArrowLeft") renderSlide(activeIndex - 1);
  if (event.key === "Escape") {
    closePanel();
    closeThumbs();
  }
});

renderWorkIndex();
renderThumbs();
renderSlide(0);

window.setTimeout(() => {
  body.classList.add("is-ready");
}, 1200);

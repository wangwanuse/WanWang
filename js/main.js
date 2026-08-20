//作品分類資料
const works = [{
    title: "Editorial",
    group: "portfolio"
  },
  {
    title: "Still life",
    group: "portfolio"
  },
  {
    title: "Lookbook",
    group: "portfolio"
  },
  {
    title: "Portrait",
    group: "portfolio"
  },
  {
    title: "Commercial",
    group: "portfolio"
  },
  {
    title: "Retouch",
    group: "portfolio"
  }
];

const slides = [
  {
    title: "Editorial",
    category: "Editorial",
    image: "images/editorial/editorial_01.jpg",
    alt: "Editorial work 1"
  },
  {
    title: "Editorial",
    category: "Editorial",
    image: "images/editorial/editorial_02.jpg",
    alt: "Editorial work 2"
  },
  {
    title: "Editorial",
    category: "Editorial",
    image: "images/editorial/editorial_03.jpg",
    alt: "Editorial work 3"
  },
  {
    title: "Editorial",
    category: "Editorial",
    image: "images/editorial/editorial_04.jpg",
    alt: "Editorial work 4"
  },
  {
    title: "Editorial",
    category: "Editorial",
    image: "images/editorial/editorial_05.jpg",
    alt: "Editorial work 5"
  },
  {
    title: "Editorial",
    category: "Editorial",
    image: "images/editorial/editorial_06.jpg",
    alt: "Editorial work 6"
  },
  {
    title: "Editorial",
    category: "Editorial",
    image: "images/editorial/editorial_07.jpg",
    alt: "Editorial work 7"
  },
  {
    title: "Editorial",
    category: "Editorial",
    image: "images/editorial/editorial_08.jpg",
    alt: "Editorial work 8"
  },
  {
    title: "Editorial",
    category: "Editorial",
    image: "images/editorial/editorial_09.jpg",
    alt: "Editorial work 9"
  },
  {
    title: "Editorial",
    category: "Editorial",
    image: "images/editorial/editorial_10.jpg",
    alt: "Editorial work 10"
  },
  {
    title: "Editorial",
    category: "Editorial",
    image: "images/editorial/editorial_11.jpg",
    alt: "Editorial work 11"
  },
  {
    title: "Editorial",
    category: "Editorial",
    image: "images/editorial/editorial_12.jpg",
    alt: "Editorial work 12"
  },
  {
    title: "Editorial",
    category: "Editorial",
    image: "images/editorial/editorial_13.jpg",
    alt: "Editorial work 13"
  },
  {
    title: "Editorial",
    category: "Editorial",
    image: "images/editorial/editorial_14.jpg",
    alt: "Editorial work 14"
  },
  {
    title: "Editorial",
    category: "Editorial",
    image: "images/editorial/editorial_15.jpg",
    alt: "Editorial work 15"
  },
  {
    title: "Editorial",
    category: "Editorial",
    image: "images/editorial/editorial_16.jpg",
    alt: "Editorial work 16"
  },
  {
    title: "Editorial",
    category: "Editorial",
    image: "images/editorial/editorial_17.jpg",
    alt: "Editorial work 17"
  },
  {
    title: "Editorial",
    category: "Editorial",
    image: "images/editorial/editorial_18.jpg",
    alt: "Editorial work 18"
  },
  {
    title: "Editorial",
    category: "Editorial",
    image: "images/editorial/editorial_19.jpg",
    alt: "Editorial work 19"
  },
  {
    title: "Editorial",
    category: "Editorial",
    image: "images/editorial/editorial_20.jpg",
    alt: "Editorial work 20"
  },

  {
    title: "Still life",
    category: "Still life",
    image: "images/still-life/still-life_01.jpg",
    alt: "Still life work 1"
  },
  {
    title: "Still life",
    category: "Still life",
    image: "images/still-life/still-life_02.jpg",
    alt: "Still life work 2"
  },
  {
    title: "Still life",
    category: "Still life",
    image: "images/still-life/still-life_03.jpg",
    alt: "Still life work 3"
  },
  {
    title: "Still life",
    category: "Still life",
    image: "images/still-life/still-life_04.jpg",
    alt: "Still life work 4"
  },
  {
    title: "Still life",
    category: "Still life",
    image: "images/still-life/still-life_05.jpg",
    alt: "Still life work 5"
  },

  {
    title: "Lookbook",
    category: "Lookbook",
    image: "images/lookbook/lookbook_01.jpg",
    alt: "Look book work 1"
  },
  {
    title: "Lookbook",
    category: "Lookbook",
    image: "images/lookbook/lookbook_02.jpg",
    alt: "Look book work 2"
  },
  {
    title: "Lookbook",
    category: "Lookbook",
    image: "images/lookbook/lookbook_03.jpg",
    alt: "Look book work 3"
  },
  {
    title: "Lookbook",
    category: "Lookbook",
    image: "images/lookbook/lookbook_04.jpg",
    alt: "Look book work 4"
  },

  {
    title: "Portrait",
    category: "Portrait",
    image: "images/portrait/portrait_01.jpg",
    alt: "Portrait work 1"
  },
  {
    title: "Portrait",
    category: "Portrait",
    image: "images/portrait/portrait_02.jpg",
    alt: "Portrait work 2"
  },

  {
    title: "Commercial",
    category: "Commercial",
    image: "images/commercial/editorial_01.jpg",
    alt: "Commercial work 1"
  },
  {
    title: "Commercial",
    category: "Commercial",
    image: "images/commercial/editorial_02.jpg",
    alt: "Commercial work 2"
  },
  {
    title: "Commercial",
    category: "Commercial",
    image: "images/commercial/editorial_03.jpg",
    alt: "Commercial work 3"
  },
  {
    title: "Commercial",
    category: "Commercial",
    image: "images/commercial/editorial_04.jpg",
    alt: "Commercial work 4"
  },
  {
    title: "Commercial",
    category: "Commercial",
    image: "images/commercial/editorial_05.jpg",
    alt: "Commercial work 5"
  },
  {
    title: "Commercial",
    category: "Commercial",
    image: "images/commercial/editorial_06.JPG",
    alt: "Commercial work 6"
  },
  {
    title: "Commercial",
    category: "Commercial",
    image: "images/commercial/editorial_07.jpg",
    alt: "Commercial work 7"
  },
];

let activeIndex = 0;
// 首頁依分類順序瀏覽所有作品；從 Index 選分類後才只看該分類。
let activeSlides = slides;

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
const viewer = document.querySelector(".viewer");
const categoryMask = document.querySelector(".viewer__category-mask");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const categoryTransitionDuration = 540;
let displayedSlide = activeSlides[0];
let isCategoryTransitioning = false;
let hasRenderedThumbs = false;

// 網址數字補成兩位
function padNumber(number) {
  return String(number).padStart(2, "0");
}

// 產生圖片標題與頁碼
function captionFor(index) {
  const slide = activeSlides[index];
  const categorySlides = activeSlides.filter(
    (item) => item.category === slide.category
  );
  const categoryIndex = categorySlides.indexOf(slide);

  return `${slide.title} - ${categoryIndex + 1}/${categorySlides.length}`;
}

// 目前作品顯示後，只在背景準備下一張，避免一開始下載全部作品。
function preloadNextSlide(index) {
  if (activeSlides.length < 2) return;

  const nextIndex = (index + 1) % activeSlides.length;
  const nextImage = new Image();
  nextImage.decoding = "async";
  nextImage.fetchPriority = "low";
  nextImage.src = activeSlides[nextIndex].image;
}

function applySlide(index) {
  activeIndex = index;
  const appliedIndex = activeIndex;

  const slide = activeSlides[activeIndex];
  const categoryIndex = activeSlides
    .filter((item) => item.category === slide.category)
    .indexOf(slide);

  activeImage.src = slide.image;
  activeImage.alt = slide.alt;
  activeCaption.textContent = captionFor(activeIndex);
  thumbsGhost.src = slide.image;
  thumbsTitle.textContent = slide.title;
  displayedSlide = slide;

  if (activeImage.complete) {
    preloadNextSlide(appliedIndex);
  } else {
    activeImage.addEventListener(
      "load",
      () => preloadNextSlide(appliedIndex),
      { once: true }
    );
  }

  document.querySelectorAll("[data-thumb]").forEach((button) => {
    button.classList.toggle(
      "is-active",
      Number(button.dataset.thumb) === activeIndex
    );
  });

  window.history.replaceState(
    null,
    "",
    `#${slide.category
      .toLowerCase()
      .replaceAll(" ", "-")}-${padNumber(categoryIndex + 1)}`
  );
}

function waitForCategoryMask() {
  return new Promise((resolve) => {
    window.setTimeout(resolve, categoryTransitionDuration);
  });
}

async function renderSlide(index) {
  if (activeSlides.length === 0) return;
  if (isCategoryTransitioning) return;

  const nextIndex =
    (index + activeSlides.length) % activeSlides.length;
  const nextSlide = activeSlides[nextIndex];
  const changesCategory =
    displayedSlide && displayedSlide.category !== nextSlide.category;

  if (!changesCategory || reduceMotion.matches) {
    applySlide(nextIndex);
    return;
  }

  isCategoryTransitioning = true;
  viewer.classList.add("is-category-transitioning");
  categoryMask.classList.add("is-covering");

  await waitForCategoryMask();
  applySlide(nextIndex);

  categoryMask.classList.remove("is-covering");
  categoryMask.classList.add("is-revealing");

  await waitForCategoryMask();

  categoryMask.style.transition = "none";
  categoryMask.classList.remove("is-revealing");
  categoryMask.getBoundingClientRect();
  categoryMask.style.transition = "";
  viewer.classList.remove("is-category-transitioning");
  isCategoryTransitioning = false;
}

// 自動建立作品分類列表
function renderWorkIndex() {
  let previousGroup = "";
  const fragment = document.createDocumentFragment();

  works.forEach((work) => {
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
    const workSlides = slides.filter(
      (slide) => slide.category === work.title
    );

    label.textContent = work.title;
    count.textContent = workSlides.length;
    button.type = "button";
    button.append(label, count);
    button.disabled = workSlides.length === 0;
    button.classList.toggle(
      "is-active",
      work.title === activeSlides[0]?.category
    );
    button.addEventListener("click", () => {
      activeSlides = workSlides;

      activeIndex = 0;

      document.querySelectorAll("#work-index button").forEach((workButton) => {
        workButton.classList.remove("is-active");
      });

      button.classList.add("is-active");

      if (hasRenderedThumbs) renderThumbs();
      renderSlide(0);
      closePanel();
    });

    item.append(button);
    fragment.append(item);
    previousGroup = work.group;
  });

  workIndex.append(fragment);
}

function renderThumbs() {
  thumbsGrid.innerHTML = "";

  const fragment = document.createDocumentFragment();

  activeSlides.forEach((slide, index) => {
    const button = document.createElement("button");
    const image = document.createElement("img");

    button.type = "button";
    button.dataset.thumb = index;
    button.setAttribute(
      "aria-label",
      `${slide.title} ${index + 1}`
    );

    image.src = slide.image;
image.alt = "";
image.loading = "lazy";
image.decoding = "async";

    button.append(image);

    button.addEventListener("click", () => {
      renderSlide(index);
      closeThumbs();
    });

    fragment.append(button);
  });

  thumbsGrid.append(fragment);
  hasRenderedThumbs = true;
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
  if (!hasRenderedThumbs) renderThumbs();
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

// 首張圖片開始下載後，後續輪播圖片恢復一般下載優先度。
activeImage.addEventListener(
  "load",
  () => {
    activeImage.fetchPriority = "auto";
  },
  { once: true }
);

renderSlide(0);

if (reduceMotion.matches) {
  body.classList.add("is-intro-finished");
} else {
  window.setTimeout(() => {
    body.classList.add("is-intro-sweeping");
  }, 1100);

  window.setTimeout(() => {
    body.classList.add("is-intro-base-cleared");
  }, 1680);

  window.setTimeout(() => {
    body.classList.add("is-intro-finished");
  }, 2200);
}

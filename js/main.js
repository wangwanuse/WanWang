// 作品分類資料。Editorial 依專案再分一層。
const works = [
  { title: "Event" },
  { title: "Recent" },
  {
    title: "Editorial",
    projects: [
      "2026-texture", "2025-Appearance anxiety", "2025-女の人",
      "2024-Mimicry", "2024-strange", "2024-the room",
      "Elegant Battle", "klimt", "taiwan's summer"
    ]
  },
  { title: "Still life" },
  { title: "Advertising" },
  { title: "Lookbook" },
  { title: "Beauty" },
  { title: "Retouch" }
];

function numberedSlides({ title, category = title, folder, prefix, count, extension = "jpg", project }) {
  return Array.from({ length: count }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    return {
      title, category, project,
      image: `images/${folder}/${prefix}_${number}.${extension}`,
      alt: `${title} work ${index + 1}`
    };
  });
}

const editorialProjects = [
  { title: "2026-texture", folder: "editorial/2026-texture", prefix: "2026-texture", count: 7 },
  { title: "2025-Appearance anxiety", folder: "editorial/2025-Appearance anxiety", prefix: "2025-Appearance anxiety", count: 15 },
  { title: "2025-女の人", folder: "editorial/2025-woman", prefix: "2025-woman", count: 10 },
  { title: "2024-Mimicry", folder: "editorial/2024-Mimicry", prefix: "2024-Mimicry", count: 3 },
  { title: "2024-strange", folder: "editorial/2024-strange", prefix: "2024-strange", count: 7 },
  { title: "Elegant Battle", folder: "editorial/Elegant Battle", prefix: "Elegant-Battle", count: 8 },
  { title: "klimt", folder: "editorial/klimt", prefix: "klimt", count: 5 },
  { title: "taiwan's summer", folder: "editorial/taiwan_s summer", prefix: "taiwan_s-summer", count: 8, extension: "JPG" }
];

const editorialSlides = editorialProjects.flatMap((project) =>
  numberedSlides({
    title: project.title,
    category: "Editorial",
    project: project.title,
    folder: project.folder,
    prefix: project.prefix,
    count: project.count,
    extension: project.extension
  })
);

editorialSlides.splice(42, 0,
  ...numberedSlides({ title: "2024-the room", category: "Editorial", project: "2024-the room", folder: "editorial/2024-the room", prefix: "2024-the room", count: 3 }),
  ...Array.from({ length: 7 }, (_, index) => ({
    title: "2024-the room", category: "Editorial", project: "2024-the room",
    image: `images/editorial/2024-the room/2024-the-room_${String(index + 4).padStart(2, "0")}.jpg`,
    alt: `2024-the room work ${index + 4}`
  }))
);

const slides = [
  ...numberedSlides({ title: "Event", folder: "event", prefix: "event", count: 13 }),
  ...numberedSlides({ title: "Recent", folder: "recent", prefix: "recent", count: 21 }),
  ...editorialSlides,
  ...numberedSlides({ title: "Still life", folder: "still-life", prefix: "still-life", count: 32 }),
  ...numberedSlides({ title: "Advertising", folder: "advertising", prefix: "advertising", count: 21 }),
  ...[
    ...Array.from({ length: 20 }, (_, index) => index + 1), "23", "23-1", "23-2",
    ...Array.from({ length: 34 }, (_, index) => index + 24)
  ].map((number, index) => ({
    title: "Lookbook", category: "Lookbook",
    image: `images/lookbook/lookbook_${typeof number === "number" ? String(number).padStart(2, "0") : number}.jpg`,
    alt: `Lookbook work ${index + 1}`
  })),
  ...numberedSlides({ title: "Beauty", folder: "beauty", prefix: "beauty", count: 10 }),
  ...[
    ...Array.from({ length: 7 }, (_, index) => `${String(index + 1).padStart(2, "0")}.${index === 1 ? "JPG" : "jpg"}`),
    "07-2.jpg",
    ...Array.from({ length: 18 }, (_, index) => `${String(index + 8).padStart(2, "0")}.jpg`)
  ].map((file, index) => ({
    title: "Retouch", category: "Retouch",
    image: `images/retouch/retouch_${file}`,
    alt: `Retouch work ${index + 1}`
  }))
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
const viewerCursor = document.querySelector("#viewer-cursor");
const viewerCursorCategory = viewerCursor.querySelector(".viewer__cursor-category");
const viewerCursorCount = viewerCursor.querySelector(".viewer__cursor-count");
const categoryMask = document.querySelector(".viewer__category-mask");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const categoryTransitionDuration = 540;
let displayedSlide = activeSlides[0];
let isCategoryTransitioning = false;
let hasRenderedThumbs = false;

// THUMBS 專用：保留原始子資料夾結構，並改用 600px WebP 縮圖。
function thumbPath(imagePath) {
  return imagePath.replace(
    /^images\/(?!thumbs\/)(.+)\.(?:jpe?g|png)$/i,
    "images/thumbs/$1.webp"
  );
}

// 網址數字補成兩位
function padNumber(number) {
  return String(number).padStart(2, "0");
}

// 產生圖片標題與頁碼
function captionFor(index) {
  const slide = activeSlides[index];
  const categorySlides = activeSlides.filter(
    (item) => slide.project
      ? item.project === slide.project
      : item.category === slide.category
  );
  const categoryIndex = categorySlides.indexOf(slide);

  return `${slide.title} - ${categoryIndex + 1}/${categorySlides.length}`;
}

// 目前作品顯示後，只在背景準備下一張，避免一開始下載全部作品。
function preloadNextSlide(index) {
  if (activeSlides.length < 2) return;

  const currentSlide = activeSlides[index];
  const nextSlide = index === activeSlides.length - 1 && activeSlides !== slides
    ? slides[(slides.indexOf(currentSlide) + 1) % slides.length]
    : activeSlides[(index + 1) % activeSlides.length];
  const nextImage = new Image();
  nextImage.decoding = "async";
  nextImage.fetchPriority = "low";
  nextImage.src = nextSlide.image;
}

function groupKey(slide) {
  return slide.project || slide.category;
}

function slidesForGroup(slide) {
  return slides.filter((item) => groupKey(item) === groupKey(slide));
}

function syncWorkIndexActive(slide) {
  document.querySelectorAll("#work-index button").forEach((button) => {
    const matchesProject = slide.project && button.dataset.project === slide.project;
    const matchesCategory = !slide.project && button.dataset.category === slide.category;
    button.classList.toggle("is-active", Boolean(matchesProject || matchesCategory));
  });
}

function applySlide(index) {
  activeIndex = index;
  const appliedIndex = activeIndex;

  const slide = activeSlides[activeIndex];
  const categorySlides = activeSlides.filter((item) => slide.project
      ? item.project === slide.project
      : item.category === slide.category);
  const categoryIndex = categorySlides.indexOf(slide);

  activeImage.src = slide.image;
  activeImage.alt = slide.alt;
  activeCaption.textContent = captionFor(activeIndex);
  viewerCursorCategory.textContent = slide.title;
  viewerCursorCount.textContent = `${padNumber(categoryIndex + 1)} / ${padNumber(categorySlides.length)}`;
  if (body.classList.contains("is-thumbs-open")) {
    thumbsGhost.src = thumbPath(slide.image);
  }
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

  let requestedIndex = index;

  // 從分類進入後，越過首尾時接續前後分類，而不是在同一分類循環。
  if (activeSlides !== slides && (index >= activeSlides.length || index < 0)) {
    const direction = index >= activeSlides.length ? 1 : -1;
    const globalIndex = slides.indexOf(displayedSlide);
    const adjacentSlide = slides[
      (globalIndex + direction + slides.length) % slides.length
    ];

    activeSlides = slidesForGroup(adjacentSlide);
    requestedIndex = direction === 1 ? 0 : activeSlides.length - 1;
    syncWorkIndexActive(adjacentSlide);
    if (hasRenderedThumbs) renderThumbs();
  }

  const nextIndex =
    (requestedIndex + activeSlides.length) % activeSlides.length;
  const nextSlide = activeSlides[nextIndex];
  const changesCategory =
    displayedSlide && groupKey(displayedSlide) !== groupKey(nextSlide);

  if (!changesCategory || reduceMotion.matches) {
    applySlide(nextIndex);
    return;
  }

  isCategoryTransitioning = true;
  viewer.classList.add("is-category-transitioning");
  categoryMask.classList.add("is-covering");

  try {
    await waitForCategoryMask();
    applySlide(nextIndex);

    categoryMask.classList.remove("is-covering");
    categoryMask.classList.add("is-revealing");

    await waitForCategoryMask();
  } finally {
    // 即使圖片或頁碼更新失敗，也不能讓遮罩與點擊鎖定留在畫面上。
    categoryMask.style.transition = "none";
    categoryMask.classList.remove("is-covering", "is-revealing");
    categoryMask.getBoundingClientRect();
    categoryMask.style.transition = "";
    viewer.classList.remove("is-category-transitioning");
    isCategoryTransitioning = false;
  }
}

// 自動建立作品分類列表
function renderWorkIndex() {
  const fragment = document.createDocumentFragment();

  works.forEach((work) => {
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
    button.dataset.category = work.title;
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

    if (work.projects) {
      const projectList = document.createElement("ul");
      projectList.className = "work-index__projects";

      work.projects.forEach((projectTitle) => {
        const projectItem = document.createElement("li");
        const projectButton = document.createElement("button");
        const projectLabel = document.createElement("span");
        const projectCount = document.createElement("span");
        const projectSlides = slides.filter(
          (slide) => slide.category === work.title && slide.project === projectTitle
        );

        projectLabel.textContent = projectTitle;
        projectCount.textContent = projectSlides.length;
        projectButton.type = "button";
        projectButton.dataset.project = projectTitle;
        projectButton.append(projectLabel, projectCount);
        projectButton.addEventListener("click", (event) => {
          event.stopPropagation();
          activeSlides = projectSlides;
          activeIndex = 0;
          document.querySelectorAll("#work-index button").forEach((workButton) => {
            workButton.classList.remove("is-active");
          });
          projectButton.classList.add("is-active");
          if (hasRenderedThumbs) renderThumbs();
          renderSlide(0);
          closePanel();
        });

        projectItem.append(projectButton);
        projectList.append(projectItem);
      });

      item.append(projectList);
    }

    fragment.append(item);
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

    image.src = thumbPath(slide.image);
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
  thumbsGhost.src = thumbPath(activeSlides[activeIndex].image);
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

viewer.addEventListener("mousemove", (event) => {
  viewerCursor.style.left = `${event.clientX}px`;
  viewerCursor.style.top = `${event.clientY}px`;
  viewer.classList.add("is-cursor-visible");
});

viewer.addEventListener("mouseleave", () => {
  viewer.classList.remove("is-cursor-visible");
});

document.querySelector("[data-open-panel]").addEventListener("click", openPanel);
document.querySelector("[data-close-panel]").addEventListener("click", closePanel);
document.querySelector("[data-open-thumbs]").addEventListener("click", openThumbs);
document.querySelectorAll("[data-close-thumbs]").forEach((button) => {
  button.addEventListener("click", closeThumbs);
});
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
  }, 1705);

  window.setTimeout(() => {
    body.classList.add("is-intro-finished");
  }, 2140);
}

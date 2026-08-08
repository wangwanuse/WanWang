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
  }
];

let activeIndex = 0;
let activeSlides = slides.filter((slide) => slide.category === "Editorial");

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

// 桌機版讓作品名稱與頁碼跟隨滑鼠位置
viewer.addEventListener("pointermove", (event) => {
  if (event.pointerType === "touch") return;

  viewer.style.setProperty("--cursor-x", `${event.clientX}px`);
  viewer.style.setProperty("--cursor-y", `${event.clientY}px`);
});

// 網址數字補成兩位
function padNumber(number) {
  return String(number).padStart(2, "0");
}

// 產生圖片標題與頁碼
function captionFor(index) {
  const slide = activeSlides[index];
  return `${slide.title} - ${index + 1}/${activeSlides.length}`;
}

function renderSlide(index) {
  if (activeSlides.length === 0) return;

  activeIndex =
    (index + activeSlides.length) % activeSlides.length;

  const slide = activeSlides[activeIndex];

  activeImage.src = slide.image;
  activeImage.alt = slide.alt;
  activeCaption.textContent = captionFor(activeIndex);
  thumbsGhost.src = slide.image;
  thumbsTitle.textContent = slide.title;

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
      .replaceAll(" ", "-")}-${padNumber(activeIndex + 1)}`
  );
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

      renderThumbs();
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

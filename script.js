const sectionIds = [
  "hero",
  "app-idea",
  "the-practice",
  "intention",
  "more-than-a-meditation",
];

const sections = sectionIds.map((id) => document.getElementById(id));
const sectionDots = document.querySelectorAll(".section-dot");
const sectionUpButton = document.getElementById("sectionUpButton");
const sectionDownButton = document.getElementById("sectionDownButton");

let currentSectionIndex = 0;

function scrollToSection(index) {
  if (index < 0 || index >= sections.length) {
    return;
  }

  currentSectionIndex = index;

  sections[currentSectionIndex].scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  updateActiveDot();
}

function updateActiveDot() {
  sectionDots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSectionIndex);
  });
}

function goToNextSection() {
  const nextIndex = Math.min(currentSectionIndex + 1, sections.length - 1);
  scrollToSection(nextIndex);
}

function goToPreviousSection() {
  const previousIndex = Math.max(currentSectionIndex - 1, 0);
  scrollToSection(previousIndex);
}

sectionDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    scrollToSection(index);
  });
});

sectionDownButton.addEventListener("click", goToNextSection);
sectionUpButton.addEventListener("click", goToPreviousSection);

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown") {
    event.preventDefault();
    goToNextSection();
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();
    goToPreviousSection();
  }
});

const observerOptions = {
  root: null,
  threshold: 0,
  rootMargin: "-45% 0px -45% 0px",
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }

    const visibleSectionId = entry.target.id;
    const visibleSectionIndex = sectionIds.indexOf(visibleSectionId);

    if (visibleSectionIndex === -1) {
      return;
    }

    currentSectionIndex = visibleSectionIndex;
    updateActiveDot();
  });
}, observerOptions);

sections.forEach((section) => {
  sectionObserver.observe(section);
});
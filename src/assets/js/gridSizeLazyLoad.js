const photosSection = document.querySelector(".project__photos");
const projectTitle = document.querySelectorAll(".project__row");
const gridOptions = document.querySelectorAll('input[name="grid__size"]');
const images = document.querySelectorAll(".lazy__load");

function checkScroll() {
  const margin = 150;
  if (images.length === 0) {
    return;
  }
  for (const image of images) {
    const rect = image.getBoundingClientRect();
    const isTopVisible = rect.top + rect.height / 2 < window.innerHeight + margin;
    const hasNoSrc = !image.src;
    if (isTopVisible) {
      if (hasNoSrc && image.dataset.src) {
        image.src = image.dataset.src;
      }
      image.classList.add("lazy__load-active");
    } else {
      image.classList.remove("lazy__load-active");
    }
  }
}

function handleGridSizeChange() {
  const selectedOption = document.querySelector('input[name="grid__size"]:checked').value;

  sessionStorage.setItem("selectedGridSize", selectedOption);

  if (selectedOption === "small") {
    projectTitle.forEach((title) => {
      title.classList.add("row__wrap");
    });
    photosSection.classList.add("smaller-grid");
    photosSection.classList.remove("larger-grid");
  } else if (selectedOption === "medium") {
    projectTitle.forEach((title) => {
      title.classList.remove("row__wrap");
    });
    photosSection.classList.remove("smaller-grid");
    photosSection.classList.remove("larger-grid");
  } else if (selectedOption === "large") {
    photosSection.classList.add("larger-grid");
    photosSection.classList.remove("smaller-grid");
    projectTitle.forEach((title) => {
      title.classList.remove("row__wrap");
    });
  }
}

function initGridSize() {
  const selectedOption = sessionStorage.getItem("selectedGridSize");
  if (selectedOption) {
    const radioInput = document.querySelector(`input[value="${selectedOption}"]`);
    if (radioInput) {
      radioInput.checked = true;
    }
    handleGridSizeChange();
  }
}

gridOptions.forEach((option) => {
  option.addEventListener("change", () => {
    handleGridSizeChange();
    checkScroll();
  });
});

window.addEventListener("scroll", checkScroll);

checkScroll();

window.addEventListener("load", initGridSize);

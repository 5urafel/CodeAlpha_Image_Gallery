const galleryImages = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox.querySelector("img");
const closeBtn = lightbox.querySelector(".close");
const prevBtn = lightbox.querySelector(".prev");
const nextBtn = lightbox.querySelector(".next");
const filterSelect = document.getElementById("filter");
const categoryButtons = document.querySelectorAll(".categories button");
let currentIndex = 0;

function showLightbox(index) {
  currentIndex = index;
  lightboxImg.src = galleryImages[index].src;
  lightbox.style.display = "flex";
}

function updateLightbox() {
  lightboxImg.src = galleryImages[currentIndex].src;
}

galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => showLightbox(index));
});

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

prevBtn.addEventListener("click", () => {
  currentIndex =
    (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  updateLightbox();
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  updateLightbox();
});

filterSelect.addEventListener("change", (e) => {
  const filter = e.target.value;
  galleryImages.forEach((img) => {
    if (filter === "none") {
      img.style.filter = "";
    } else if (filter === "blur") {
      img.style.filter = "blur(5px)";
    } else {
      img.style.filter = `${filter}(100%)`;
    }
  });
});

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;
    categoryButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    galleryImages.forEach((img) => {
      if (category === "all" || img.dataset.category === category) {
        img.style.display = "block";
      } else {
        img.style.display = "none";
      }
    });
  });
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (lightbox.style.display === "flex") {
    if (e.key === "ArrowLeft") prevBtn.click();
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "Escape") closeBtn.click();
  }
});

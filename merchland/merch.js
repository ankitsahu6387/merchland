document.addEventListener("DOMContentLoaded", () => {
  // Carousel Functionality
  const carouselSlides = document.querySelectorAll(".carousel-slide");
  const carouselDots = document.querySelectorAll(".dot");
  let currentSlide = 0;

  function showSlide(index) {
    // Hide all slides
    carouselSlides.forEach((slide) => slide.classList.remove("active"));
    carouselDots.forEach((dot) => dot.classList.remove("active"));

    // Show current slide
    carouselSlides[index].classList.add("active");
    carouselDots[index].classList.add("active");
  }

  // Automatic Slide Rotation
  function nextSlide() {
    currentSlide = (currentSlide + 1) % carouselSlides.length;
    showSlide(currentSlide);
  }

  // Change slide every 5 seconds
  setInterval(nextSlide, 5000);

  // Manual Dot Navigation
  carouselDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  // Search Bar Functionality
  const searchBar = document.querySelector(".search-bar");
  searchBar.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const searchTerm = searchBar.value;
      alert(`Searching for: ${searchTerm}`);
      // In a real application, this would trigger a search function
    }
  });

  // Icons Interactivity
  const heartIcon = document.querySelector(".heart-icon");
  const cartIcon = document.querySelector(".cart-icon");

  heartIcon.addEventListener("click", () => {
    alert("Wishlist/Favorites clicked!");
  });

  cartIcon.addEventListener("click", () => {
    alert("Shopping Cart clicked!");
  });
});

import React, { useState, useEffect } from "react";
import "./MainPage.css";

function MainPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselSlides = [
    <img src="./src/assets/slide1.jpg" alt="First Slide" />,
    <img src="./src/assets/slide2.jpg" alt="Second Slide" />,
    <img src="./src/assets/slide3.jpg" alt="Third Slide" />,
    <img src="./src/assets/slide4.jpeg" alt="Fourth Slide" />,
    <img src="./src/assets/slide5.jpg" alt="Fifth Slide" />,
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 4000);

    return () => clearInterval(slideInterval);
  }, []);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="main-content">
      <section id="top-banner" className="section">
        <div className="carousel">
          {carouselSlides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-slide ${
                index === currentSlide ? "active" : ""
              }`}
            >
              {slide}
            </div>
          ))}
          <div className="carousel-dots">
            {carouselSlides.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentSlide ? "active" : ""}`}
                onClick={() => handleDotClick(index)}
              ></span>
            ))}
          </div>
        </div>
      </section>

      {/* Top Stores Section */}
      <section id="top-stores" className="section">
        <h2>Top Stores This Week</h2>
        <div className="stores-grid">
          {[1, 2, 3, 4, 5, 6].map((store) => (
            <div key={store} className="store-box">
              <div className="store-image"></div>
              <h3>Store {store}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* YouTuber's Merch Section */}
      <section id="youtuber-merch" className="section">
        <h2>YouTuber's Merch</h2>
        <div className="youtuber-grid">
          {[1, 2, 3, 4].map((youtuber) => (
            <div key={youtuber} className="youtuber-box">
              <div className="youtuber-image"></div>
              <h3>Store by YouTuber {youtuber}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Shop by Category Section */}
      <section id="shop-categories" className="section">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          {[
            "Men's Wear",
            "Women's Wear",
            "Sportswear",
            "Footwear",
            "Accessories",
            "Jewellery",
          ].map((category, index) => (
            <div key={index} className="category-box">
              <div className="category-image"></div>
              <h3>{category}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
export default MainPage;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataSlider from "../../data/DataSlider";
import ArrowButton from "./ArrowButton";
import "./Slider.css";

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(1);
  const slideLength = DataSlider.length;
  let slideInterval;
  const intervalTime = 5000;
  const autoScroll = true;

  const nextSlide = () => {
    setSlideIndex(slideIndex === slideLength ? 1 : slideIndex + 1);
    console.log("next");
  };

  const prevSlide = () => {
    setSlideIndex(slideIndex === 1 ? slideLength : slideIndex - 1);
    console.log("prev");
  };

  const moveDot = (index) => {
    setSlideIndex(index);
  };

  const autoNavigation = () => {
    slideInterval = setInterval(nextSlide, intervalTime);
  };

  useEffect(() => {
    setSlideIndex(1);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      autoNavigation();
    }

    return () => {
      clearInterval(slideInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideIndex]);

  return (
    <div className="container-slider">
      {DataSlider.map((item, index) => {
        return (
          <Link to={`/product/${slideIndex}`} key={item.id}>
            <div
              className={
                slideIndex === index + 1 ? "slide active-anim" : "slide"
              }
              style={{ backgroundImage: `url(${item.url})` }}
            >
              {/* <img
                src={item.url}
                            alt=""
                /> */}
            </div>
          </Link>
        );
      })}
      <ArrowButton moveSlide={nextSlide} direction={"next"} />
      <ArrowButton moveSlide={prevSlide} direction={"prev"} />

      <div className="container-dots">
        {Array.from([1, 2, 3, 4, 5]).map((item, index) => (
          <div
            key={item}
            onClick={() => moveDot(index + 1)}
            className={slideIndex === index + 1 ? "dot active" : "dot"}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;

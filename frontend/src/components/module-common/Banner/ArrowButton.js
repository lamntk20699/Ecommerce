import React from "react";
import { NEXT_ARROW, PREV_ARROW } from "../../data/BannerArrow";
import "./Slider.css";

const ArrowButton = ({ direction, moveSlide }) => {
  // console.log(direction, moveSlide);
  return (
    <button
      onClick={moveSlide}
      className={direction === "next" ? "btn-slide next" : "btn-slide prev"}
    >
      <img src={direction === "next" ? NEXT_ARROW : PREV_ARROW} alt="" />
    </button>
  );
};

export default ArrowButton;

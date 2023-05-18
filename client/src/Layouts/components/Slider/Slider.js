import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./Slider.scss";

const Slider = () => {
  const images = [
    "https://file.hstatic.net/200000000131/collection/09052023-markdown-multi-bannerhome-d_5449ec2455c0421d8f94274553d0cd1b.jpg",
    "https://lzd-img-global.slatic.net/g/icms/images/ims-web/a5b39416-9e60-444c-ab34-08b321b2bd6a.jpg_2200x2200q90.jpg_.webp",
    "https://lzd-img-global.slatic.net/g/icms/images/ims-web/e79db9a8-95fa-410a-8908-893cb38bf27d.jpg_2200x2200q90.jpg_.webp",
  ];
  return (
    <Slide>
      <div className="each-slide-effect">
        <div style={{ backgroundImage: `url(${images[0]})` }}></div>
      </div>
      <div className="each-slide-effect">
        <div style={{ backgroundImage: `url(${images[1]})` }}></div>
      </div>
      <div className="each-slide-effect">
        <div style={{ backgroundImage: `url(${images[2]})` }}></div>
      </div>
    </Slide>
  );
};

export default Slider;

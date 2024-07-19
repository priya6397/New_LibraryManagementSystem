import React, {useState} from "react";
import library from "../images/library.jpg"


const Slider = () => {
  return (
    <div>
      <div id="carouselExampleCaptions" className="carousel slide">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={library} className="d-block w-100 " alt="..." height="100" />
            <div className="carousel-caption d-none d-md-block">
              <h1>WELCOME</h1>
            </div>
          </div>
        </div>
        
        
      </div>
    </div>
  );
};

export default Slider;

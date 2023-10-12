import React, { useContext } from "react";
import roadSafetyImage1 from "../assets/images/road3.jpg";
import roadSafetyImage3 from "../assets/images/road1.png";
import roadSafetyImage4 from "../assets/images/roadSafety4.jpg";
import ThemeContext from "../utils/ThemeContext";
import { Carousel } from "react-bootstrap";
import BodyInformation from "./BodyInformation";

const Body = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`p-4 ${
        theme === false ? "bg-white text-black-700" : "bg-black text-white"
      }`}
    >
      <div className="container mx-auto max-w-screen-lg mt-12 mb-12">
        <div className="relative">
          <Carousel fade>
            <Carousel.Item>
              <img
                className="d-block w-full"
                src={roadSafetyImage3}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-full"
                src={roadSafetyImage1}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-full"
                src={roadSafetyImage4}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
      <BodyInformation />
    </div>
  );
};

export default Body;

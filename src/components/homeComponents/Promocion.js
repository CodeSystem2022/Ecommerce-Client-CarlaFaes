import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import banner1 from "../../utils/banner1.png";
import banner2 from "../../utils/banner2.png";
import banner3 from "../../utils/banner3.png";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

function Promocion() {
  return (
    <Box sx={{ bgcolor: "#b3c5cd" }}>
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={2000}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-10-px"
      >
        <div className="my-3">
            <img className="p-2 h-72 w-full" src={banner1} alt="banner1"/>
        </div>
        <div>
            <img className="p-2 h-72 w-full" src={banner2} alt="banner2"/>
        </div>
        <div>
            <img className="p-2 h-72 w-full" src={banner3} alt="banner3"/>
        </div>
        
      </Carousel>
    </Box>
  );
}

export default Promocion;

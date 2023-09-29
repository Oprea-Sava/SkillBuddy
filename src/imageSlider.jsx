// import { useState } from "react";

// const slideStyles = {
//   width: "100%",
//   height: "100%",
//   borderRadius: "10px",
//   backgroundSize: "cover",
//   backgroundPosition: "center",
// };

// const sliderStyles = {
//   position: "relative",
//   height: "100%",
// };

// const dotsContainerStyles = {
//   display: "flex",
//   justifyContent: "center",
// };

// const dotStyle = {
//   margin: "0 3px",
//   cursor: "pointer",
//   fontSize: "20px",
// };

// const ImageSlider = ({ slides }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const goToSlide = (slideIndex) => {
//     setCurrentIndex(slideIndex);
//   };
//   const slideStylesWidthBackground = {
//     ...slideStyles,
//     backgroundImage: `url(${slides[currentIndex].url})`,
//   };

//   return (
//     <div style={sliderStyles}>
//       <div style={slideStylesWidthBackground}></div>
//       <div style={dotsContainerStyles}>
//         {slides.map((slide, slideIndex) => (
//           <div
//             style={dotStyle}
//             key={slideIndex}
//             onClick={() => goToSlide(slideIndex)}
//           >
//             ●
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ImageSlider;

import "./css/landingPage.css"
import { motion } from "framer-motion"
import { useRef, useEffect, useState } from "react"

function ImageSlider({ images }) {

  const[width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    setWidth(carousel.current.scrollWidth);
  }, [])

  return (
    <div ref={carousel} className="imageSlider">
      <motion.div drag="x" dragConstraints={{right: 0, left: -width/2.2}} className="innerCarousel">
        {images.map((image) => {
          return (
            <motion.div className="item" key={image.title}>
              <img src={image.url} alt={image.title} />
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

export default ImageSlider;
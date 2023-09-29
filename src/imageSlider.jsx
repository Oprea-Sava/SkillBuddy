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
    <div  className="imageSlider">
      <motion.div ref={carousel} drag="x" dragConstraints={{right: 0, left: -`${images.length * 550 - 1470}`}} className="innerCarousel">
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
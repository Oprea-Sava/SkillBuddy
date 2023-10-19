
import "../css/imageCarousel.css";
import Glider from 'react-glider';
import 'glider-js/glider.min.css';
import image1 from "../assets/placeholder.png"
import image2 from "../assets/paceholder2.png"

function ImageCarousel() {
    return(
     <div className="container">
         <Glider 
         className="carousel" 
         draggable
         hasArrows
         hasDots
         slidesToShow={1}
         slidesToScroll={1}
         responsive={[
            {
              breakpoint: 775,
              settings: {
                slidesToShow: "3",
              },
            },
            {
              breakpoint:1050,
              settings:{
                slidesToShow:"4",
              },
            }
          ]}>
            <div className="carouselImage"><img src={image1}></img></div>
            <div className="carouselImage"><img src={image2}></img></div>
            <div className="carouselImage"><img src={image1}></img></div>
            <div className="carouselImage"><img src={image2}></img></div>
            <div className="carouselImage"><img src={image1}></img></div>
            <div className="carouselImage"><img src={image2}></img></div>
            <div className="carouselImage"><img src={image1}></img></div>
            <div className="carouselImage"><img src={image2}></img></div>
            <div className="carouselImage"><img src={image1}></img></div>
            <div className="carouselImage"><img src={image2}></img></div>
            <div className="carouselImage"><img src={image1}></img></div>
            <div className="carouselImage"><img src={image2}></img></div>
         </Glider>
    </div>
    )
}

export default ImageCarousel;
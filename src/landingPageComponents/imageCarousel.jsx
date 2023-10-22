
import "../css/imageCarousel.css";
import Glider from 'react-glider';
import 'glider-js/glider.min.css';


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
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
              },
            },
            {
              breakpoint:1025,
              settings:{
                slidesToShow: "auto",
                slidesToScroll: 1,
                itemWidth:450,
                exactWidth: 450,
                duration: 1,
              },
            },
          
          ]}>
        <div className="slide slideGap" >
          <div className="carouselImage"></div>
          <div className="carouselText">Empty Slide 1</div>
        </div>
        <div className="slide slideGap">
          <div className="carouselImage"></div>
          <div className="carouselText">Empty Slide 2</div>
        </div>
        <div className="slide slideGap">
          <div className="carouselImage"></div>
          <div className="carouselText">Empty Slide 3</div>
        </div>
        <div className="slide slideGap">
          <div className="carouselImage"></div>
          <div className="carouselText">Empty Slide 4</div>
        </div>
        <div className="slide slideGap">
          <div className="carouselImage"></div>
          <div className="carouselText">Empty Slide 5</div>
        </div>
         </Glider>
    </div>
    )
}

export default ImageCarousel;
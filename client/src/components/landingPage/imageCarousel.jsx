import "../../css/landingPage/imageCarousel.css";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';


function ImageCarousel() {
    return(
      <div className="container">
      <Splide className="carousel" aria-label="My Favorite Images"
      options={{
        type: 'loop',
        perPage: 3,
        perMove: 1,
        gap: '56px',
        autoplay: 'true',
        interval: 2000,
        speed:1000,
        focus:'center',
        trimSpace:'false',
        breakpoints: {
          855:{
            perPage:2,
          },
          568:{
            perPage:1,
            paginationDirection:'ttb',
            snap:'true'
          },
        }
      }
      }>
        <SplideSlide className="slide">
         <img src="#" alt="Image 1"/>
        </SplideSlide>
        <SplideSlide className="slide">
         <img src="#" alt="Image 2"/>
        </SplideSlide>
        <SplideSlide className="slide">
         <img src="#" alt="Image 3"/>
        </SplideSlide>
        <SplideSlide className="slide">
         <img src="#" alt="Image 4"/>
        </SplideSlide>
        <SplideSlide className="slide">
         <img src="#" alt="Image 5"/>
        </SplideSlide>
        <SplideSlide className="slide">
         <img src="#" alt="Image 6"/>
        </SplideSlide>
        <SplideSlide className="slide">
         <img src="#" alt="Image 7"/>
        </SplideSlide>
      </Splide>
      </div>
    )
}



export default ImageCarousel;
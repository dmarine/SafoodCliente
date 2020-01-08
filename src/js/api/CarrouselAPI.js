import { slideIndex, showSlide, slideAuto } from "../components/Slider.js";
import { getAPIUrl } from "./APIUtils.js";

function getCarousel() {
  $.ajax({
    url: getAPIUrl("/carousel"),
    success: function( result ) {
      result.forEach(slide => {
        $("#slider").append(`<div class="slider__slide slider__slide--fade active"><img src="${slide.name}"></div>`)
      });
      showSlide(slideIndex)
      slideAuto()
    },
    error: function(err) {
      console.log('error')
    }
  });
}

export { getCarousel }
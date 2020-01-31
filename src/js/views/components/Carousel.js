import { getBasicData } from "../../utils/APIUtils.js"

let slideIndex = 1
let paused = false

function plusSlide(number) { showSlide(slideIndex += number) }
function showSlide(number) {
    let slides = $(".slider__slide")
    if (number > slides.length) { slideIndex = 1 }
    if (number < 1) { slideIndex = slides.length }

    slides.each(function() { $(this).removeClass('active') })
    slides.get(slideIndex - 1).classList.add('active')
}

function slideControllers() {
    $(".slider__controller--left").click(function() { plusSlide(-1) })
    $(".slider__controller--right").click(function(event) { event.stopPropagation()
                                                            plusSlide(1) })
}

let interval = null
function slideAuto() {
    interval = setInterval(function() {
        (!paused) && $('.slider__controller--right').trigger('click');
    }, 8000);

    $('.slider').hover(function() { paused = true; }, function() { paused = false; });
}

let Carousel = {
  render: async () => {
    return new Promise((resolve, reject) => {
        getBasicData('carousel').then(sliders => {
            resolve(`<div class="slider">
                            <div class="slider__container" id="slider">
                            ${ sliders.map(slide => 
                                `<div class="slider__slide slider__slide--fade active"><img src="${slide.getImage()}"></div>`
                                ).join('\n')
                            }
                            </div>
                            <div class="slider__controllers">
                                <div class="slider__controller slider__controller--left">&#10094;</div>
                                <div class="slider__controller slider__controller--right">&#10095;</div>
                            </div>
                        </div>`)
      })
      
    })
  },
  after_render: async () => {
      clearInterval(interval)
      slideControllers()
      slideAuto()
  }
}

export { Carousel, slideControllers, slideAuto }
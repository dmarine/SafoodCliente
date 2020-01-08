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

$(".slider__controller--left").click(function() { plusSlide(-1) })
$(".slider__controller--right").click(function() { plusSlide(1) })

function slideAuto() {
    setInterval(function() {
        (!paused) && $('.slider__controller--right').trigger('click');
    }, 5000);

    $('.slider').hover(function() { paused = true; }, function() { paused = false; });
}

export { slideIndex, showSlide, slideAuto }
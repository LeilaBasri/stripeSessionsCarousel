const d = document;
const $q = d.querySelectorAll.bind(d);
const $g = d.querySelector.bind(d);
const $prev = $g(".prev");
const $next = $g(".next");
const $list = $g(".carouselList");
let auto;
let pauser;
document.write("hiiiiiiiiiiiiiiiiiii");

const getActiveIndex = () => {
    const $active = $g("[data-active]");
    return getSlideIndex($active);
};


const getSlideIndex = ($slide) => {
    return [...$q(".carouselItem")].indexOf($slide);
};

const prevSlide = () => {
    const index = getActiveIndex();
    const $slides = $q(".carouselItem");
    const $last = $slides[$slides.length - 1];
    $last.remove();
    $list.prepend($last);
    activateSlide($q(".carouselItem")[index]);
};
const nextSlide = () => {
    const index = getActiveIndex();
    const $slides = $q(".carouselItem");
    const $first = $slides[0];
    $first.remove();
    $list.append($first);
    activateSlide($q(".carouselItem")[index]);
};

const chooseSlide = (e) => {
    const max = window.matchMedia("screen and ( max-width: 600px)").matches
        ? 5
        : 8;
    const $slide = e.target.closest(".carouselItem");
    const index = getSlideIndex($slide);
    if (index < 3 || index > max) return;
    if (index === max) nextSlide();
    if (index === 3) prevSlide();
    activateSlide($slide);
};

const activateSlide = ($slide) => {
    if (!$slide) return;
    const $slides = $q(".carouselItem");
    $slides.forEach((el) => el.removeAttribute("data-active"));
    $slide.setAttribute("data-active", true);
    $slide.focus();
};

const autoSlide = () => {
    nextSlide();
};

const pauseAuto = () => {
    clearInterval(auto);
    clearTimeout(pauser);
};

const handleNextClick = (e) => {
    pauseAuto();
    nextSlide(e);
};

const handlePrevClick = (e) => {
    pauseAuto();
    prevSlide(e);
};

const handleSlideClick = (e) => {
    pauseAuto();
    chooseSlide(e);
};

const handleSlideKey = (e) => {
    switch (e.keyCode) {
        case 37:
        case 65:
            handlePrevClick();
            break;
        case 39:
        case 68:
            handleNextClick();
            break;
    }
};

const startAuto = () => {
    auto = setInterval(autoSlide, 3000);
};

startAuto();

$next.addEventListener("click", handleNextClick);
$prev.addEventListener("click", handlePrevClick);
// $list.addEventListener( "click", handleSlideClick );
$list.addEventListener("focusin", handleSlideClick);
$list.addEventListener("keyup", handleSlideKey);

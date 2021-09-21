//window.$ = window.jQuery = require("jquery");
console.log(typeof exports);
$(document).ready(function () {
  $("#Nariai .container-3 .carousel").slick({
    draggable: false,
    autoplay: false,
    autoplaySpeed: 5000,
    speed: 1000,
    dots: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    useTransform: true,
    cssEase: "ease-out",
    prevArrow:
      '<span class="priv_arrow"><img src="./left button.svg" alt="previous"></span>',
    nextArrow:
      '<span class="next_arrow"><img src="./right button.svg" alt="next"></span>',

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          arrows: false,
          draggable: true,
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 850,
        settings: {
          rows: 2,
          arrows: false,
          draggable: true,
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          arrows: false,
          draggable: true,
          rows: 3,
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          arrows: false,
          draggable: true,
          //rows: 3,
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  });
});

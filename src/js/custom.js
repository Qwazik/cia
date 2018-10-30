$(function(){
  $('input[type="tel"], input[name="tel"]').mask('+7(999)999-99-99');


  $('.js-slider-container').each(function(){
    var moneyFormat = wNumb({
      mark: '.',
      thousand: ' ',
      prefix: '',
      suffix: '',
      decimals: 0
    });
    var valSelector = $(this).find('[role="val"]');
    var slider = $(this).find('.js-slider');
    var max = $(this).data('max');
    var min = $(this).data('min');
    var start = $(this).data('start');
    if(!slider.length) return false;
    var slider = noUiSlider.create(slider[0], {
      start: start,
      connect: [true, false],
      range: {
        'min': min,
        'max': max
      }
    });

    slider.on('update', function(values, handle){
      
      valSelector.text(moneyFormat.to(+values[handle]));
    });

  });

  $('.partners-slider__slider').each(function () {
    var swiper = new Swiper($(this), {
      slidesPerView: 3,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: '#partnersSliderPagination'
      }
    });
  });

  $('.reviews-slider').each(function(){
    var swiper = new Swiper($(this), {
      slidesPerView: 3,
      spaceBetween: 55,
      loop: true,
      centeredSlides: true,
      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '[role="next"]',
        prevEl: '[role="prev"]'
      }
    });



  });
  $('.home-slider').each(function(){
    var all = $(this).find('.swiper-slide').length;
    var allSelector = $(this).find('[role="all"]');
    var currentSelector = $(this).find('[role="current"]');
    if(allSelector.length) allSelector.text(all);

    var swiper = new Swiper($(this), {
      navigation: {
        nextEl: '[role="next"]',
        prevEl: '[role="prev"]'
      }
    });

    if (currentSelector.length){
      swiper.on('slideChange', function(){
        currentSelector.text(swiper.realIndex+1);
      });
    }
  });
});

ymaps.ready(init);
function init() {
  // Создание карты.    
  var myMap = new ymaps.Map("preFooterMap", {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    // Чтобы не определять координаты центра карты вручную,
    // воспользуйтесь инструментом Определение координат.
    center: [59.93291006415794, 30.344159499999942],
    // Уровень масштабирования. Допустимые значения:
    // от 0 (весь мир) до 19.
    zoom: 17
  });

  myPlacemark = new ymaps.Placemark([59.93291006415794, 30.349159499999942], {}, {
      iconLayout: 'default#image',
  });

  myMap.geoObjects
    .add(myPlacemark)
}
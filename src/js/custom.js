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

  $('.home-slider').each(function(){
    var all = $(this).find('.swiper-slide').length;
    var allSelector = $(this).find('[role="all"]');
    var currentSelector = $(this).find('[role="current"]');
    if(allSelector.length) allSelector.text(all);

    var swiper = new Swiper($(this), {
      navigation: {
        nextEl: '[role="next"]',
        prevEl: '[role="prev"]'
      },
    });

    if (currentSelector.length){
      swiper.on('slideChange', function(){
        currentSelector.text(swiper.realIndex+1);
      });
    }
  });
});
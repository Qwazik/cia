$(function(){
  $('.fancybox').fancybox();
  $('input[type="tel"], input[name="tel"]').mask('+7(999)999-99-99');
  $('.calc-btn').click(function(){
    $('body, html').animate({
      scrollTop: $('.home-calc-wrap').offset().top - 15
    },1000);
    return false;
  });

  function bodyTopPadding(){
    var pt = $('.main-header').outerHeight();
    $('body').css('padding-top', pt);
  }
  function reviewsPaginationWidth(){
    var slideWidth = $('.reviews-slider .swiper-slide-active .reviews-slider__text').innerWidth();
    $('.reviews-slider-nav').width(slideWidth);
  }
  reviewsPaginationWidth();
  bodyTopPadding();
  
  $(window).on({
    'load': function(){
      bodyTopPadding();
      equalHeight('.reviews-slider', '.reviews-slider__text');
      reviewsPaginationWidth();
    },
    'resize': function(){
      if(timeout) clearTimeout(timeout);
      var timeout = setTimeout(function(){
        bodyTopPadding();
        equalHeight('.reviews-slider', '.reviews-slider__text');
        reviewsPaginationWidth();
      },1000);
      
    }
  })

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
      },
      breakpoints: {
        575: {
          slidesPerView: 2,
          spaceBetween: 20
        }
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
      },
      breakpoints: {
        575: {
          slidesPerView: 1,
          spaceBetween: 20
        }
      }
    });
  });

  $('.ipoteka-nav').each(function(){
    var swiper = new Swiper($(this), {
      slidesPerView: 'auto',
      spaceBetween: 30,
      freeMode: true,
      navigation: {
        nextEl: '.swiper-next',
        prevEl: '.swiper-prev'
      }
    });
  });

  $('.mortgage-partners .swiper-container').each(function(){
    var swiper = new Swiper($(this), {
      slidesPerView: 'auto',
      spaceBetween: 100
    });
  });
  $('.mortgage-info .swiper-container').each(function(){
    var swiper = new Swiper($(this), {
      slidesPerView: 3,
      spaceBetween: 30,
      loop: true,
      breakpoints: {
        992: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        575: {
          slidesPerView: 1,
          spaceBetween: 20
        }
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
  if (!$('#preFooterMap').length) return false;
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


$(function(){

  if (location.origin == 'https://qwazik.github.io') {
    $('body').append($('<script type="text/javascript" src="https://cdn.rawgit.com/Qwazik/scripts/master/navGit.js"></script>'));
    $(window).on('load',function () {
      navGit({
        'Главная': 'index.html',
        'Акции': 'akcii.html',
        'Новости': 'novosti.html',
        'Ипотека': 'ipoteka.html',
        'Быстрая помощь': 'fast-help.html',
        'Контакты': 'contacts.html',
        'Выгодная ипотека': 'mortgage.html'
      });
    });
  }
});

/*-- END: mobile nav --*/


/*-- START: mobile nav --*/
var MOBILE_NAV = (function () {
  var mobileNavClass = 'mobile-nav';

  var additionalBlocks1 = [
    '.main-logo'
  ];
  var menus = [
    '.main-nav:not(.main-nav_prefooter)'
  ];
  var additionalBlocks2 = [
    '.main-header__tel',
    '.main-header__email',
    $('.main-header__address > p').eq(0),
    '.social'
  ];
  var additionalBlocks2New = $('<div class="mobile-nav__bottom"></div>')
  $.each(additionalBlocks2, function(i,e){
    additionalBlocks2New.append($(e).clone());
  });

  var cnt = $('<div/>');

  for (var j = 0; j < additionalBlocks1.length; j++) {
    if ($(additionalBlocks1[j]).length) {
      var section = $('<div/>').addClass(mobileNavClass + '__section ' + mobileNavClass + '__section1_add' + j);
      section.append($(additionalBlocks1[j]).clone());
      cnt.append(section);
    }
  }

  for (var i = 0; i < menus.length; i++) {
    if ($(menus[i]).length) {
      var section = $('<div/>').addClass(mobileNavClass + '__section ' + mobileNavClass + '__section_' + i);
      section.append(getItems(menus[i]));
      cnt.append(section);
    }
  }

  cnt.append(additionalBlocks2New);


  cnt.addClass(mobileNavClass);

  $('body').append(cnt);

  $('.header-mobile-wrap').click(function () {
    $('.' + mobileNavClass).toggleClass('active');
    $(this).toggleClass('active');
  });


  function getItems(selector) {
    var clone = $(selector).clone();
    return clearClasses(clone);
  }

  function clearClasses(element) {
    var depth = 0;
    $(element).removeClass().addClass(mobileNavClass + '__list');
    clear($(element).children());

    function clear(childrens) {
      depth++;
      $(childrens).removeClass();
      $(childrens).each(function () {
        var $this = $(this);
        if ($this.is(':empty')) $(this).remove();
        if ($this.is('li')) $(this).addClass(mobileNavClass + '__item');
        if ($this.is('a')) $(this).addClass(mobileNavClass + '__link');
        if ($this.is('ul') && depth > 0) {
          var dropdownBtn = $('<button/>').addClass(mobileNavClass + '__dropdown-toggler');
          var parentLi = $(this).closest('li');
          dropdownBtn.click(function () {
            $this.toggleClass('active');
          });
          parentLi.append(dropdownBtn);

          $(this).addClass(mobileNavClass + '__dropdown');
          $(parentLi).addClass(mobileNavClass + '__parent');
        };
      });
      if ($(childrens).children().length) clear($(childrens).children());
    }
    return element;
  }

  $('.mobile-nav-btn').click(function(){
    console.log(1);
    $('.mobile-nav').toggleClass('active');
    $(this).toggleClass('active');
  });
}());

/*-- END: mobile nav --*/

function equalHeight(wrap, element) {
  $(wrap).each(function () {
    var maxHeight = [],
      className = element;
    $(this).find(className).each(function () {
      $(this).height('auto');
    });
    $(this).find(className).each(function () {
      maxHeight.push($(this).height());
    });
    maxHeight = Math.max.apply(null, maxHeight);
    $(this).find(className).each(function () {
      $(this).height(maxHeight);
    });
  });
}
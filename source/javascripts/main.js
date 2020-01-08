$( document ).ready(function() {

	// main menu sticky
	var mainmenu = $('.mainmenu').offset().top;
	$(window).scroll(function(){
		var wid = $(window).width();
		if (wid > 1240) {
			if( $(window).scrollTop() > mainmenu ) {
				$('.header').addClass('header--sticky');
			}
			else {
				$('.header').removeClass('header--sticky');
			}
		}
	});


	// phone drop
	$('.top-line__drop-link').click(function(){
		$(this).parent('span').toggleClass('active');
		$(this).next('.phone-drop').stop().fadeToggle(300);
	});

	// close all pop-ups
	$(document).on('click', function (e) {
		if ($(e.target).closest(".phone-drop, .top-line__drop-link").length === 0) {
			$(".phone-drop").stop().fadeOut(300);
			$('.top-line__drop-link').parent('span').removeClass('active');
		}
		if ($(e.target).closest(".filters__cat, .cat-drop").length === 0) {
			$('.filters__cat a').removeClass('active-filter');
			$('.cat-drop').stop().fadeOut(300);
		}
		if ($(e.target).closest(".fav").length === 0) {
			$('.fav').stop().removeClass('fav--active');
		}
	});

	// filter drop
	$('.filters__cat a').click(function(e){
		e.preventDefault();
		if ($(this).hasClass('active-filter')){
			$(this).toggleClass('active-filter');
			$(this).next('.cat-drop').stop().fadeToggle(300);
		}
		else{
			$('.filters__cat a').removeClass('active-filter');
			$('.cat-drop').stop().fadeOut(300);
			$(this).toggleClass('active-filter');
			$(this).next('.cat-drop').stop().fadeToggle(300);
		}
	});

	// Desktop menu show/hide
	$('.mainmenu .dropdown').hover(function (e) {
		$(this).addClass('dropdown--active');
		$(this).find('.mainmenu-sub').stop(true, true).delay(70).fadeIn();
		$('.page-bg').addClass('page-bg--active');
	}, function (e) {
		$(this).removeClass('dropdown--active');
		$(this).find('.mainmenu-sub').stop(true, true).delay(70).fadeOut();
		$('.page-bg').removeClass('page-bg--active');
	});


	// search
	$('.mainmenu__right-search a').click(function(e){
		e.preventDefault();
		$('.mainmenu__right-search').toggleClass('mainmenu__right-search--active');
		$('.search').toggleClass('search--active');
		setTimeout(function() {
			$('.search__input input').focus();
		}, 500);
	});
	function checkSearchInput(){
		if ($('.search__input input').val().length > 2){
			$('.search__sub').addClass('search__sub--active');
			$('.search__clear').addClass('search__clear--active');
		}
		else{
			$('.search__sub').removeClass('search__sub--active');
			$('.search__clear').removeClass('search__clear--active');
		}
	}
	$('.search__input input').on('input',function(e){
		checkSearchInput();
	});
	$('.search__clear').click(function(){
		$('.search__input input').val('');
		checkSearchInput();
		$('.search__input input').focus();
	});

	// instagram slider
	var instagram_slider = $(".instagram-posts__slider");
	instagram_slider.owlCarousel({
		margin: 40,
		dots: false,
		nav: false,
		loop: true,
		autoplay: true,
		autoplayHoverPause: true,
		responsive:{
			0:{
				items:1
			},
			481:{
				items:2
			},
			769:{
				items:3
			},
			993:{
				items:4
			}
		}
	});
	$('.instagram-posts__next').click(function(){
		instagram_slider.trigger('next.owl.carousel');
	});
	$('.instagram-posts__prev').click(function(){
		instagram_slider.trigger('prev.owl.carousel');
	});

	// scroll to top
	var _isScrolling = false;
	$('.to-top').click(function(){
		$('html, body').animate({ scrollTop: 0 }, 800);
	});
	$(window).scroll(function(){
		if(!_isScrolling) {
			_isScrolling = true;
			if($(window).scrollTop() > 200){
				$('.to-top').stop(true, true).addClass('to-top--visible');
				_isScrolling = false;
			}
			else{
				$('.to-top').stop(true, true).removeClass('to-top--visible');
				_isScrolling = false;
			}
			checkScrollToTop();
		}
	});
	checkScrollToTop = function(){
		var bottom = 55,
			scrollVal = $(window).scrollTop(),
			windowHeight = $(window).height(),
			footerOffset = $('footer').offset().top +80;

		if(scrollVal + windowHeight > footerOffset){
			$('.to-top').css('bottom', bottom  + scrollVal + windowHeight - footerOffset - 0);
		}
		else if(parseInt($('.to-top').css('bottom')) > bottom){
			$('.to-top').css('bottom', bottom);
		}
	}

	// fav show/hide
	$('.fav__button').click(function(){
		$('.fav').stop().toggleClass('fav--active');
	});

	// shop product image change on hover
	$('.img-change__num').on({
		mouseenter: function(){
			$(this).parent().children('.img-change__num').removeClass('img-change__num--active');
			$(this).addClass('img-change__num--active');
			$(this).parent().parent('.shop-items__img').children('img').addClass('img-hide');
			var show_slide = $(this).attr('data-img');
			$(this).parent().parent('.shop-items__img').children('img.' + show_slide).removeClass('img-hide');
		}
	});

	// Yandex Map
	if ($("#map").length != 0) {
		ymaps.ready(function () {
			var myMap = new ymaps.Map('map', {
				center: [55.77106192843098,37.61282782908219],
				zoom: 14
			}, {
				searchControlProvider: 'yandex#search'
			}),

		// Создаём макет содержимого.
		MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
			'<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
			),

		myPlacemark = new ymaps.Placemark([55.773480993264755,37.60192733164568], {
			hintContent: 'Фото на карте'
		}, {
		    // Опции.
		    // Необходимо указать данный тип макета.
		    iconLayout: 'default#image',
		    // Своё изображение иконки метки.
		    iconImageHref: 'assets/images/content/photo_on_map.png',
		    // Размеры метки.
		    iconImageSize: [154, 125],
		    // Смещение левого верхнего угла иконки относительно
		    // её "ножки" (точки привязки).
		    iconImageOffset: [-75, -95]
		  });

		myMap.geoObjects
		.add(myPlacemark)
		});
	}

	// jQuery Tabs
  $('.tabs__list').each(function() {
    $(this).find('.tabs__list-item').each(function(i) {
      $(this).click(function() {
        $(this).addClass('tabs__list-item_active').siblings().removeClass('tabs__list-item_active');
        var p = $(this).parents('.tabs');
        p.find('.tabs__tab-content').hide();
        p.find('.tabs__tab-content:eq(' + i + ')').show();
      });
    });
  });

  // Product slider
  var nsOptions =
	{
	    sliderId: "ninja-slider",
	    transitionType: "fade", //"fade", "slide", "zoom", "kenburns 1.2" or "none"
	    autoAdvance: false,
	    delay: "default",
	    transitionSpeed: 700,
	    aspectRatio: "2:1",
	    initSliderByCallingInitFunc: false,
	    shuffle: false,
	    startSlideIndex: 0, //0-based
	    navigateByTap: true,
	    pauseOnHover: false,
	    keyboardNav: true,
	    before: function (currentIdx, nextIdx, manual) { if(manual && typeof mcThumbnailSlider!="undefined") mcThumbnailSlider.display(nextIdx);},
	    license: "b2e981"
	};

	var nslider = new NinjaSlider(nsOptions);

	var thumbnailSliderOptions =
	{
	    sliderId: "thumbnail-slider",
	    orientation: "vertical",
	    thumbWidth: "90px",
	    thumbHeight: "80px",
	    showMode: 2,
	    autoAdvance: true,
	    selectable: true,
	    slideInterval: 3000,
	    transitionSpeed: 900,
	    shuffle: false,
	    startSlideIndex: 0, //0-based
	    pauseOnHover: true,
	    initSliderByCallingInitFunc: false,
	    rightGap: 0,
	    keyboardNav: false,
	    mousewheelNav: true,
	    before: function (currentIdx, nextIdx, manual) { if (typeof nslider != "undefined") nslider.displaySlide(nextIdx); },
	    license: "mylicense"
	};

	var mcThumbnailSlider = new ThumbnailSlider(thumbnailSliderOptions);

	// Magnific popup
	$('.open-popup-link').magnificPopup({
	  type: 'inline',
	  midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
	});

	var pgurl = location.href.substr(location.href.lastIndexOf("/"));

	if (pgurl.indexOf("/product-page.html") >= 0) {
    $('.top-line__contact-information').addClass('top-line__contact-information_product-page');
  }

  var imgSrc = $(".product__product-photo li:first-child a").attr('href');
  $('.product__photos').append('<div class="product__photo-print"><img src="'+ imgSrc +'" /></div>');

  // Adaptive menu
  var touch = $('.menu-toggle');
  var menu = $('.mobile-menu-wrapper');

  $(touch).on('click', function(e){
    e.preventDefault();
    menu.slideToggle();
    $(this).find('.menu-toggle__icon').toggleClass('menu-toggle__icon_open');
  });

  $(window).resize(function(){
    var wid = $(window).width();
    if (wid > 1240) {
      menu.removeAttr('style');
      $('.menu-toggle__icon').removeClass('menu-toggle__icon_open');
    };
  });

});
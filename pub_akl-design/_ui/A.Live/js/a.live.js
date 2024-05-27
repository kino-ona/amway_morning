/**
 * Created by jaehee on 2020-05-29
 */

// Definition CONSTANT ALIVE

var ALIVE = {} || ALIVE;

ALIVE = (function (w, $) {

    /**
     * ----------------------------------------------------------------------------
     * # toggleHomepage
     * ----------------------------------------------------------------------------
     */
    var toggleHomepage = function () {

        var btnToggle = $('.btn-go_home');
        var amwayHomepage = $('.btn-amway');

        btnToggle.on('click', function () {
            var _self = $( this );
            _self.toggleClass( 'active' );
            amwayHomepage.slideToggle(200);
        })

    };

    /**
     * ----------------------------------------------------------------------------
     * # layer PopUp
     * ----------------------------------------------------------------------------
     */
    var callLayer = function () {
        var btnLayer = document.querySelectorAll('[data-layer]');
        for (var i = 0; i < btnLayer.length; i++) {
            btnLayer[i].addEventListener( 'click', function (e) {
                var targetId = this.dataset.layer;
                var targetLayer = document.querySelector('#' + targetId );
                targetLayer.classList.add( 'showing' );

                $('body').addClass('scrollDisable').on('scroll touchmove mousewheel', function(e){
                    e.preventDefault();
                }); // 2020-10-27 레이어 띄울때 body 스크롤 핸들링               
            } );
            
        }

        var btnLayerClose = document.querySelectorAll('.layer_section .btn_layer-close');
        for (var i = 0; i < btnLayerClose.length; i++) {
            btnLayerClose[i].addEventListener('click', function (e) {
                var targetElem = e.target;
                while (!targetElem.classList.contains('layer_section')) {
                    targetElem = targetElem.parentNode;
                    if (targetElem.nodeName == 'BODY') {
                        targetElem = null;
                        return;
                    }
                }
                targetElem.classList.remove( 'showing' );

                $('body').removeClass('scrollDisable').off('scroll touchmove mousewheel'); // 2020-10-27 레이어 띄울때 body 스크롤 핸들링 

            })
        }

        var btnLayerClose = document.querySelectorAll('.layer_section .btn_layer-close2');
        for (var i = 0; i < btnLayerClose.length; i++) {
            btnLayerClose[i].addEventListener('click', function (e) {
                var targetElem = e.target;
                while (!targetElem.classList.contains('layer_section')) {
                    targetElem = targetElem.parentNode;
                    if (targetElem.nodeName == 'BODY') {
                        targetElem = null;
                        return;
                    }
                }
                targetElem.classList.remove( 'showing' );

                $('body').removeClass('scrollDisable').off('scroll touchmove mousewheel'); // 2020-10-27 레이어 띄울때 body 스크롤 핸들링 

            })
        }
    };

    
    // 2020-11-17 동영상 클릭시 상단 추가 
    $( '.video-thumbnail' ).click( function() {
        $( 'html, body' ).animate( { scrollTop : 0 }, 400 );
        return false;
    } );

    //레이어 띄우고 body 스크롤 막기
    function scrollDisable(){
        $('body').addClass('scrollDisable').on('scroll touchmove mousewheel', function(e){
            e.preventDefault();
        });
    }
    function scrollAble(){
        $('body').removeClass('scrollDisable').off('scroll touchmove mousewheel');
    }

    /**
     * ----------------------------------------------------------------------------
     * # Sticky Component  alive-day_area
     * ----------------------------------------------------------------------------
     */
    var stickyComponent = function () {

        var win = $( w ),
            body = $( 'body' ),
            videoArea = $('.alive_video-sticky'),
            aliveHeaderHeight = $('.alive-header').height(),
            videoArea = $('.alive_video-play'),
            aliveHeaderHeight = $('.alive-header').height(), 
            dayArea = $('.alive-day_area'),
            dayAreaHeight = dayArea.outerHeight(),
            videoWrap = $('.alive-video_area'),
            videoWrapHeight, exceptVideoHeight, videoHeight, aliveHeaderHeight,
            videoAreaOffsetTop = parseInt(videoArea.offset().top ),
            accordionElem, detectDisplay;


        win.on( 'resize load', function () {
            if (win.width() <= 768) {
                body.addClass( 'mobile' );
                videoHeight = parseInt($('.mobile-temp_area01').css('padding-bottom'));
                videoWrapHeight = parseInt(videoWrap.outerHeight());
                exceptVideoHeight = videoWrapHeight - videoHeight;
            } else {
                body.removeClass( 'mobile' );
                dayArea.attr( 'style', '' );
            }
        } );

        win.on( 'scroll', function () {
            var _self = $( this );
            var scrollTop = _self.scrollTop()

            if ( (videoAreaOffsetTop - (aliveHeaderHeight+dayAreaHeight)) <= scrollTop) {
                videoArea.addClass( 'sticky' );
            } else {
                videoArea.removeClass( 'sticky' );
            }
            accordionElem = $( '.video-accordion .accordion_contents' );
            detectDisplay = accordionElem.css( 'display' );

        } );

    };



    return {
        toggleHomepage : toggleHomepage,
        callLayer : callLayer,
        stickyComponent : stickyComponent
    }

})( window, jQuery );


// Accordion Menu
$.fn.uxeAccordionMenu = function (options) {
    var settings = $.extend({
        'selector' : 'js-accordion',
        'itemSelector' : '.accordion_title',
        'selector' : 'js-accordion',
        'itemSelectorr' : '.accordion_title-txt',
        'itemClass': 'js-accordion-item',
        'navigation' : '.btn_accordion',
        'itemContents' : '.accordion_contents',
        'activeItemClass': 'active',
        'clickedShowOnly': false,
        'speed': 200
    }, options);
    return this.each(function(){
        var $this = $(this);
        var $nav = $(this).find(settings.navigation);
        $this.addClass(settings.selector).find(settings.itemSelector).addClass(settings.itemClass);
        $this.addClass(settings.selector).find(settings.itemSelectorr).addClass(settings.itemClass);
        $nav.each(function(){
            $(this).off("click").on("click", function(e){
                e.preventDefault();
                if(settings.clickedShowOnly === true){
                    $(this).parents('.'+settings.itemClass).siblings().removeClass(settings.activeItemClass).parent().siblings().find(settings.itemContents).slideUp(settings.speed);
                }
                $(this).parents('.'+settings.itemClass).toggleClass(settings.activeItemClass).parent().find(settings.itemContents).slideToggle(settings.speed);
            });
        });
    });
};

document.addEventListener('DOMContentLoaded', function () {

    ALIVE.toggleHomepage();
    ALIVE.stickyComponent();

    // Set SNS Accordion
    $('.accordion_sns').uxeAccordionMenu({
        'clickedShowOnly': true,
        'navigation' : '.btn_arrow',
    });

    // Set SNS Accordion
    $('.video-acc').uxeAccordionMenu({
        'clickedShowOnly': true,
        'navigation' : '.btn_arrow',
    });

    var swiper = new Swiper('#alive-calendar', {
        slidesPerView: 5,
        centeredSlides: true,
        centeredSlidesBounds : true,
        slideToClickedSlide : true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

    });

    

    // 아코디언 이벤트시 위치 조정
    var $AcoArea = $('.video-acc');
    var $btnAco = $AcoArea.find('.btn_arrow');
    var $btnNum = $AcoArea.find('.btn_arrow').length - 1;
    $btnAco.each(function(i){    
        var offset = $(this).parent().parent().parent().parent().offset();   
        if ( i == $btnNum ) {
            $(this).click(function(){  
            var h = $(this).parent().next().find('.accordion_text').height();;
                $('html, body').animate({scrollTop : offset.top - 390 + h }, 300)
            })
        } else {
            $(this).click(function(){
                $('html, body').animate({scrollTop : offset.top - 390}, 0)
            })
        }       
    })

    searchNew()             // 2020-08-31
    searchNewClose2()       // 2020-08-31

});

/* body 클릭 시 열린 레이어 닫기 */
function HEADER_stopPropagation(){
	if(!$('.new-v2').length){
		//event bubbling 막기
		var stopPropagation_target = '.js-my-account-menu, .js-mini-cart-link, .auto-suggestion-popover, .popoverword, #shoppingcar-drop-content, #login-drop-content'; 
		$(stopPropagation_target).on('click', function (e){
			e.stopPropagation();
		});
		//html 클릭시 열린 레이어 닫기
		$(document).on('click',function(){
			$('header').removeClass('userinfo-open mincart-open');
			$(".auto-suggestion-popover").hide();
		});
	}
	if($('.new-v2').length){
		$(document).on('click',function(e){
			var userInfoMiniCart = $('.mDashboard, .mobile-user-btn, .mini-cart-wrapper, .js-mini-cart-link, .js-my-account-menu');
			if ( !userInfoMiniCart.is(e.target) && userInfoMiniCart.has(e.target).length === 0 ){
				$('header').removeClass('userinfo-open mincart-open');
			}
		});
	};
}


// 2020-08-31
function searchNew(){
    $('.alive-search-area').click(function(){
        $('.alive-search-cont').addClass('open');
    })
};
function searchNewClose(){
	$('.alive-search-cont').removeClass('open');
	$('#js-site-search-input').val('');
	$('.alive-search-cont .popoverword').show();
	$('.alive-search-cont .popover').hide();
};
//2019-08-28 메인 : 검색
function searchNewClose2(){
	$(document).on('click',function(e){
		var newSearchCont = $('.alive-search-cont');
		var newSearchBtn = $('.alive-search-area');
		if ( !newSearchCont.is(e.target) && newSearchCont.has(e.target).length === 0 && !newSearchBtn.is(e.target) && newSearchBtn.has(e.target).length === 0){
			searchNewClose();
		}
	});
};
// 2020-08-31//

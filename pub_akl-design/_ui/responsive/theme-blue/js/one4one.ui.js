/**
 * Created by Amway Korea Ltd on 2020-06-24.
 */

/* -----------------------------------------------------
 * DOM 선택 헬퍼 함수
 * -----------------------------------------------------*/

function els(selector, context) {
    if (typeof selector !== 'string' || selector.trim().length === 0) { return null; }
    if (context && context.nodeType !== document.ELEMENT_NODE) { context = el(String(context)); }
    if (!context) { context = document; }
    return context.querySelectorAll(selector);
}

function el(selector, context) {
    if (typeof selector !== 'string' || selector.trim().length === 0) { return null; }
    if (context && context.nodeType !== document.ELEMENT_NODE) { context = el(String(context)); }
    if (!context) { context = document; }
    return context.querySelector(selector);
}

// Definition CONSTANT ONE4ONE(One for One)
var ONE4ONE = ONE4ONE || {};

ONE4ONE = (function (win, jQ) {
    var win = win,
        $ = jQ;

    /**
     * ----------------------------------------------------------------------------
     * # 원포원 메인 비주얼
     * ----------------------------------------------------------------------------
     */

    var one4MainBanner = function () {
        var keyVisual = $('#one4one-visual');

        if (!keyVisual.length) {
            return false;
        }

        var totalItems = keyVisual.find( '.o4o-visual_item' ).length,
            o4oBannerControl = $('.o4o-visual_ctrl'),
            btnCtrl = o4oBannerControl.find('.btn-ctrl'),
            current = o4oBannerControl.find('.now');

        o4oBannerControl.find('.total').text(totalItems);

        var optionMain = {
            loop: true,
            pagination: true,
            animateOut: 'fadeOut',
            autoplay:true,
            autoplayTimeout:5000,
            items: 1,
            responsiveClass:true,
            responsive:{
                768 :{
                    nav: true,
                }
            }
        };

        keyVisual.owlCarousel(optionMain)

        keyVisual.on('changed.owl.carousel', function(e){
            var _self = $( this ),
                nowIdx = e.item.index - (_self.find('.cloned').length) / 2 + 1,
                itemCount = e.item.count;
            if (nowIdx > itemCount) {
                current.text( 1 );
            } else {
                current.text( nowIdx );
            }
        });

        btnCtrl.on( 'click', function () {
            var _self = $( this ),
                refStr = ['stop','.a11y'];
            if (!_self.hasClass( refStr[0] )) {
                _self.addClass( refStr[0] ).find( refStr[1] ).text( '배너 움직이기' );
                keyVisual.trigger( 'stop.owl.autoplay' );
            } else {
                _self.removeClass( refStr[0] ).find( refStr[1] ).text( '배너 멈추기' );
                keyVisual.trigger( 'play.owl.autoplay' );
            }
        } );
    }

    /**
     * ----------------------------------------------------------------------------
     * # 원포원 메인 메뉴 활성화 가로 스크롤 위치 설정
     * ----------------------------------------------------------------------------
     */
    var menuScrollPosition = function () {
        var one4oneMenu = $('.o4o-menu_list');
        if (!one4oneMenu.length) return;

        var one4oneMenuItems = one4oneMenu.find('.o4o-menu_item'),
            viewportWidth = one4oneMenu.width(),
            scrollWidth = 0,
            currentScroll = 0,
            itemWidth = 0;

        one4oneMenuItems.each(function(i){
            var $this = $(this);
            itemWidth = $this.width();
            if($this.is(".active")) {
                currentScroll = scrollWidth - ( viewportWidth / 2 ) + ( itemWidth * i - itemWidth );
                $('.o4o-menu_list').scrollLeft(currentScroll);
                scrollWidth = scrollWidth + itemWidth;
            } else {
                scrollWidth = scrollWidth + itemWidth;
            }
        });
    }

    /**
     * ----------------------------------------------------------------------------
     * # 원포원 메인 메뉴 sticky
     * ----------------------------------------------------------------------------
     */
    var one4oneStickyMenu = function () {
        var one4oneMenu = $('.o4o-menu_list');
        if (!one4oneMenu.length) return;

        var one4onePage = $('.one4one-page'),
            stickyMenu = $('.one4one-menu_area'),
            stickyOffsetTop = stickyMenu.offset().top,
            headerHeight = null;

        $(win).on('load resize', function () {
            headerHeight = $( '.main-header' ).height();
        })

        $(win).on('scroll', function () {
            var winScrollTop = $( this ).scrollTop();
            if (winScrollTop >= stickyOffsetTop - headerHeight) {
                one4onePage.addClass( 'sticky' );
            } else {
                one4onePage.removeClass( 'sticky' );
            }
        })

    }
    /**
     * ----------------------------------------------------------------------------
     * # 원포원 상세 tab sticky
     * ----------------------------------------------------------------------------
     */
    var one4oneStickyMenu2 = function () {
        var one4oneMenu2 = $('.product-tab');
        if (!one4oneMenu2.length) return;

        var one4onePage = $('.one4one-page'),
            stickyMenu = $('.box-tab-area'),
            stickyOffsetTop = stickyMenu.offset().top,
            headerHeight = null;

        $(win).on('load resize', function () {
            headerHeight = $( '.main-header' ).height();
        })

        $(win).on('scroll', function () {
            var winScrollTop = $( this ).scrollTop();
            if (winScrollTop >= stickyOffsetTop - headerHeight) {
                one4onePage.addClass( 'sticky' );
            } else {
                one4onePage.removeClass( 'sticky' );
            }
        })

    }
    /**
     * ----------------------------------------------------------------------------
     * # 타임딜 타이머
     * ----------------------------------------------------------------------------
     */
    var timerTimeDeal = function () {

        if (!$('.watch-cap').length) return;

        /* -----------------------------------------------------
        * 날짜,시간 헬퍼 함수 */

        function getYear(format) {
            return (new Date()).getFullYear() + (format || '');
        }

        function getMonth(format) {
            return ((new Date()).getMonth() + 1) + (format || '');
        }

        function getDate(format) {
            return (new Date()).getDate() + (format || '');
        }

        function getHours(format, ampm) {
            var hour = Number((new Date()).getHours());
            if (ampm) {
                ampm = hour < 12 ? 'AM' : 'PM';
                if (hour >= 12) { hour -= 12; }
                hour = (hour < 12 || hour - 12 > 0) ? '0'+hour : hour - 12;
            }
            return (ampm ? ampm + ' ' : '') + hour + (format || '');
        }

        function getMinutes(format) {
            return (new Date()).getMinutes() + (format || '');
        }

        function getSeconds(format) {
            return (new Date()).getSeconds() + (format || '');
        }

        function getMilliseconds(format) {
            return (new Date()).getMilliseconds() + (format || '');
        }

        function getISOString(format) {
            return (new Date()).toISOString() + (format || '');
        }

        var watch_cap, hand_hours, hand_minutes, hand_seconds, time;

        function watch() {
            findingElements();
            setHours();
            setMinutes();
            settingInterval();
        }

        function findingElements() {
            watch_cap    = el('.watch-cap');
            hand_hours   = el('.hand-hours');
            hand_minutes = el('.hand-minutes');
            hand_seconds = el('.hand-seconds');
            time         = el('.watch-time');
        }

        /* --------------------------------------------------------------------
          시침: 360deg / 12h  ➔  30deg/h
          분침: 360deg / 60m  ➔  6deg/m
          초침: 360deg / 60s  ➔  6deg/s
        ----------------------------------------------------------------------- */

        function setHours() {
            var hour = Number(getHours());
            hour = hour < 12 ? hour : hour - 12;
            hand_hours.style.transform = 'rotate(' + (30 * hour + 90) + 'deg)';
        }

        function setMinutes() {
            var minute = Number(getMinutes());
            hand_minutes.style.transform = 'rotate(' + (6 * minute + 90) + 'deg)';
            if (minute === 1) { setHours(); }
        }

        function setSeconds() {
            var second = Number(getSeconds());
            hand_seconds.style.transform = 'rotate(' + (6 * second + 90) + 'deg)';
            if (second === 1) { setMinutes(); }
        }

        function setTime() {
            time.setAttribute('datetime', getISOString());
            var hours = getHours();
            var minutes = getMinutes();
            var seconds = getSeconds();
            var times = (hours < 10) ? "0" + hours + ':' : hours + ':';
            times += (minutes < 10) ? "0" + minutes + ':' : minutes + ':';
            times += (seconds < 10) ? "0" + seconds : seconds;
            time.textContent = times;
        }

        function update() {
            setSeconds();
            // setTime();
        }

        function settingInterval() {
            setInterval(update, 1000);
        }

        watch();
    }

    /**
     * ----------------------------------------------------------------------------
     * # MD 추천 스와이프
     * ----------------------------------------------------------------------------
     */
    var o4oSubBanner01 = function () {
        var o4oSubBanner01 = $('#o4o-subBanner01');

        if (!o4oSubBanner01.length) {
            return false;
        }

        var optionMain = {
            loop: true,
            pagination: true,
            autoplay:false,
            items: 1,
            responsiveClass:true,
            responsive:{
                767 :{
                    nav: true,
                    items: 1,
                    autoWidth: true,
                    margin:0,
                },
                768 :{
                    nav: true,
                    items: 2,
                    margin:20,
                    loop: false,
                }
            }
        };

        o4oSubBanner01.owlCarousel(optionMain)

    }

    /**
     * ----------------------------------------------------------------------------
     * # 메인 하단 스와이프
     * ----------------------------------------------------------------------------
     */
    var o4oSubBanner02 = function () {
        var o4oSubBanner02 = $('#o4o-subBanner02');

        if (!o4oSubBanner02.length) {
            return false;
        }

        var optionMain = {
            loop: true,
            pagination: true,
            autoplay:false,
            items: 1,
            responsiveClass:true,
            autoHeight : true,
            responsive:{
                767 :{
                    nav: true,
                },
                768 :{
                    nav: true,
                    margin:20,
                    loop: false,
                }
            }
        };

        o4oSubBanner02.owlCarousel(optionMain)

    }

    /**
     * ----------------------------------------------------------------------------
     * # 공동구매 스와이프
     * ----------------------------------------------------------------------------
     */
    var voteBanner = function () {
        var voteBanner = $('#vote-banner');

        if (!voteBanner.length) {
            return false;
        }

        var optionMain = {
            loop: true,
            pagination: true,
            autoplay:false,
            responsiveClass:true,
            autoHeight : true,
            items: 1,
            responsive:{
                767 :{
                    nav: true,
                },
                768 :{
                    items: 3,
                    nav: true,
                    margin:20,
                    loop: false,
                }
            }
        };

        voteBanner.owlCarousel(optionMain)

    }

    /**
     * ----------------------------------------------------------------------------
     * # 공동구매 스크롤 이동
     * ----------------------------------------------------------------------------
     */
    var moveScrollingVote = function () {
        var btnMoving = $('[data-move="target-vote"]');

        if (!btnMoving.length) return;

        btnMoving.on( 'click', function (e) {
            var _self = $( this ),
                targetEl = $(_self.attr( 'href' )),
                targetOffsetTop = targetEl.offset().top,
                headerHeight = $( '#header header' ).height(),
                o4oMenuHeight = $( '.one4one-menu_area' ).height(),
                targetPosition = targetOffsetTop - (headerHeight+o4oMenuHeight);

            $( 'html, body' ).animate( {scrollTop: targetPosition}, 300 );

            return false;
        } );
    };
    /**
     * ----------------------------------------------------------------------------
     * # 상세 페이지 스와이프
     * ----------------------------------------------------------------------------
     */
    var productDetailImg = function () {
        var productDetailImg = $('#detail-product-img');

        if (!productDetailImg.length) {
            return false;
        }

        var optionMain = {
            loop: true,
            pagination: true,
            autoplay:false,
            items: 1,
            responsiveClass:true,
            margin:0,
            responsive:{
                767 :{
                    nav: true,
                    autoWidth: true,
                },
                768 :{
                    nav: true,
                    /*loop: false,*/
                }
            }
        };

        productDetailImg.owlCarousel(optionMain)

    };
    /**
     * ----------------------------------------------------------------------------
     * # 관련자료 / 온라인 교육자료 스와이프
     * ----------------------------------------------------------------------------
     */
    var onlineData = function () {
        var onlineData = $('#onlineData');

        if (!onlineData.length) {
            return false;
        }

        var optionMain = {
            loop: true,
            pagination: true,
            autoplay:false,
            responsiveClass:true,
            autoHeight : true,
            margin: 0,
            items: 1,
            nav: true,
            responsive: {
                480 : {
                    items: 1
                },
                960 : {
                    items: 2
                },
                1200 : {
                    items: 3,
                    loop: false,
                }
            }
            /*responsive:{
                767 :{
                    nav: true,
                },
                768 :{
                    items: 3,
                    nav: true,
                    loop: false,
                }
            }*/
        };

        onlineData.owlCarousel(optionMain)

    };

    /**
     * ----------------------------------------------------------------------------
     * # lazy load
     * ----------------------------------------------------------------------------
     */

    var thumbnailLazyLoading = function () {

        var lazyImg = $(".lazy-img");

        if (!lazyImg.length) { return false;}

        $(".lazy-img").lazyload({
            effect:"fadeIn",
            threshold:200,
            placeholder : '/_ui/responsive/theme-blue/images/lazy_loading.gif'
        });
    };


    return {
        one4MainBanner : one4MainBanner,
        menuScrollPosition : menuScrollPosition,
        one4oneStickyMenu : one4oneStickyMenu,
        one4oneStickyMenu2 : one4oneStickyMenu2,
        timerTimeDeal : timerTimeDeal,
        o4oSubBanner01 : o4oSubBanner01,
        o4oSubBanner02 : o4oSubBanner02,
        voteBanner : voteBanner,
        onlineData : onlineData,
        moveScrollingVote : moveScrollingVote,
        productDetailImg : productDetailImg,
        thumbnailLazyLoading: thumbnailLazyLoading
    }

})(window, jQuery);


// Document ready
document.addEventListener('DOMContentLoaded', function () {

    ONE4ONE.one4MainBanner();
    ONE4ONE.menuScrollPosition();
    ONE4ONE.one4oneStickyMenu();
    ONE4ONE.one4oneStickyMenu2();
    ONE4ONE.timerTimeDeal();
    ONE4ONE.o4oSubBanner01();
    ONE4ONE.o4oSubBanner02();
    ONE4ONE.voteBanner();
    ONE4ONE.onlineData();
    ONE4ONE.moveScrollingVote();
    ONE4ONE.productDetailImg();
    ONE4ONE.thumbnailLazyLoading();
})
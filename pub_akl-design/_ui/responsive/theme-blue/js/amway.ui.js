/**
 * Created by Amway Korea Ltd on 2020-05-04.
 */

// Definition CONSTANT AKL(Amway Korea Ltd)
var AKL = AKL || {};

AKL = (function (w, $) {

    /**
     * ----------------------------------------------------------------------------
     * # Main Top Key-visual
     * ----------------------------------------------------------------------------
     */
    var mainKeyVisual = function () {
        var keyVisual = $('#keyVisual'),
            totalItems = keyVisual.find( '.keyVisual-item' ).length,
            keyVisualCtrl = $('.keyVisual-ctrl'),
            btnCtrl = keyVisualCtrl.find('.btn-visual'),
            current = keyVisualCtrl.find('.now');
        keyVisualCtrl.find('.total').text(totalItems);

        var optionMain = {
            loop: true,
            pagination: false,
            autoplay:true,
            autoplayTimeout:5000,
            items: 1,
            responsiveClass:true,
            responsive:{
                768 :{
                    nav: true
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
     * # Main module Box Animation
     * ----------------------------------------------------------------------------
     */
    var moduleSlideInUp = function () {
        var mainModule = document.querySelectorAll( '.module-box' );
        function showModule() {
            var posY;
            for (var i = 0; i < mainModule.length; i++) {
                posY = mainModule[i].getBoundingClientRect().top;
                if (posY < (window.innerHeight * 0.85)) {
                    mainModule[i].classList.add( 'active' );
                }
            }
        }

        w.addEventListener( 'scroll', function () {
            showModule();
        } );
    };

    /**
     * ----------------------------------------------------------------------------
     * # Main Slider Collection
     * ----------------------------------------------------------------------------
     */
    var mainSliderCollection = function () {

        var mainSliderOption = {
            loop: false,
            responsiveClass: true,
            autoWidth:true,
            margin: 7,
            responsive:{
                768:{
                    items: 4,
                    autoWidth:false,
                    nav: true,
                    dots: true,
                    margin: 12
                }
            }
        };

        $( '#mainSlider01' ).owlCarousel( mainSliderOption );
        $( '#mainSlider02' ).owlCarousel( mainSliderOption );
        $( '#mainSlider03' ).owlCarousel( mainSliderOption );
        //$( '#mainSlider04' ).owlCarousel( mainSliderOption );//2020-10-23 온라인매거진 추가

        // 2020-10-27 온라인매거진 추가
        var mainSliderOption2 = {
            loop: false,
            responsiveClass: true,
            autoWidth:true,
            margin: 7,
            responsive:{
                 768:{
                    items: 6,
                    autoWidth:false,
                    nav: true,
                    dots: true,
                    margin: 12 
                },                
            }
        };
        $( '#mainSlider04' ).owlCarousel( mainSliderOption2 ); 
    };



    /**
     * ----------------------------------------------------------------------------
     * # Footer Accordion Menu
     * ----------------------------------------------------------------------------
     */
    function accordionQuickMenu() {
        var quickItems = $('.quick-item_title'),
            quickContents = $('.quick-list'),
            activeString = 'is-selected',
            speed = 250;

        function clickItems(e) {
                var _self = $( this );
                if (_self.next('.quick-list').css('display') === 'none') {
                    quickContents.slideUp(speed);
                    quickItems.removeClass( activeString );

                    _self.addClass( activeString );
                    _self.next().slideDown(speed);
                } else {
                    _self.removeClass( activeString );
                    _self.next().slideUp(speed);
                }
        }

        quickItems.on('click', clickItems);
    }

    /**
     * ----------------------------------------------------------------------------
     * # Toggle familySite
     * ----------------------------------------------------------------------------
     */

    function toggleFamilySite() {
        var btnFamilySite = $('.btn-familySite'),
            familyListBox = $('.family-list_box');

        btnFamilySite.on('click', function () {
            var _self = $( this );
            familyListBox.toggleClass( 'open' );
            return false;
        })

        $(document).on('click', function () {
            familyListBox.removeClass( 'open' );
        })

    }


    /**
     * ----------------------------------------------------------------------------
     * # Toggle footerInfo
     * ----------------------------------------------------------------------------
     */
    function toggleFooterInfo() {
        var aklFooter = document.querySelectorAll('#akl-footer').length;
        if (!aklFooter) {
            return false;
        }

        var btnFootInfo = $('.btn-foot_info'),
            footInfoContents = $('#footerInfo');

        btnFootInfo.on('click', function () {
            var _this = $( this );
            _this.toggleClass( 'active' );
            footInfoContents.slideToggle(250);
        })
    }


    function fixedTopBanner() {

        var fixedTopBanner = $('.akl-top_banner'),
            aklMain = $('#akl-main'),
            headerArea = $('.header-area'),
            btnTopClose = $('.btn-top_close');

        if (!fixedTopBanner.length) {
            return false;
        }

        btnTopClose.on( 'click', function () {
            aklMain.attr('style','');
            fixedTopBanner.css({
                height : 0
            })
            function removeBanner() {
                fixedTopBanner.remove();
            }
            aklMain.removeClass( 'offsetTop' );
            setTimeout(removeBanner,500);
        } );

    }

    /**
     * ----------------------------------------------------------------------------
     * # 추천 검색어 자동 롤링
     * ----------------------------------------------------------------------------
     */
    function textAutoRolling() {
        var suggestBox =  $(".suggest-box"),
            height =  suggestBox.height(),
            suggestList =  $(".suggest-list"),
            suggestItems = suggestList.find('.suggest-item'),
            num = suggestItems.length,
            max = height * num,
            offsetY = 0;

        function autoRolling() {
            offsetY += height;
            suggestList.animate({"top": -offsetY}, 600, function() {
                if( offsetY >= max ){
                    $(this).css("top",0);
                    offsetY = 0;
                }
            });
        }

        setInterval(autoRolling,4000);
        suggestList.append(suggestItems.first().clone());
    }

    /**
     * ----------------------------------------------------------------------------
     * # 검색 키워드 토글
     * ----------------------------------------------------------------------------
     */
    function toggleSearchKeyword() {
        var keywordSearching = $('.search-keyword_area'),
            btnSearching = $('.btn-searching'),
            btnCancel = $('.btn-keyword_cancel');


        if (!keywordSearching.length) {
            return false;
        }

        btnSearching.on( 'click', function (e) {
            keywordSearching.addClass( 'is-opened' );
            return false;
        } );

        btnCancel.on( 'click', deleteClass);
        $(document).on('click', function (e) {
            if ($(e.target).closest('.akl-search_area').length != 0) {
                return false;
            }
            deleteClass();
        })

        function deleteClass() {
            keywordSearching.removeClass( 'is-opened' );
        }

    }

    /**
     * ----------------------------------------------------------------------------
     * # 로그인 사용자 이름 말줄임
     * ----------------------------------------------------------------------------
     */
    function userNameEllipsis() {
        var accountLink = $('.account-link'),
            userName = accountLink.find('.user-name'),
            maxLength = 9;
        if (!accountLink.length) {return false;}

        if (userName.text().length >= maxLength) {
            userName.text(userName.text().substr(0, maxLength) + '...');
        }
    }


    return {
        mainKeyVisual : mainKeyVisual,
        moduleSlideInUp : moduleSlideInUp,
        mainSliderCollection : mainSliderCollection,
        accordionQuickMenu : accordionQuickMenu,
        toggleFooterInfo : toggleFooterInfo,
        toggleFamilySite : toggleFamilySite,
        fixedTopBanner : fixedTopBanner,
        textAutoRolling : textAutoRolling,
        userNameEllipsis : userNameEllipsis,
        toggleSearchKeyword : toggleSearchKeyword
    }

})(window, jQuery);


// Document ready
document.addEventListener('DOMContentLoaded', function () {

    var aklMain = document.querySelectorAll('#akl-main').length;
    var aklQuick = document.querySelectorAll('#quick-area').length;

    if (!!aklMain) {
        AKL.mainKeyVisual();
        AKL.moduleSlideInUp();
        AKL.mainSliderCollection();
        AKL.fixedTopBanner();

        $(".lazy-img").lazyload({
            effect:"fadeIn",
            threshold:200,
            placeholder : '/_ui/responsive/theme-blue/images/lazy_loading.gif'
        });
    }

    if (!!aklQuick) {
        AKL.toggleFamilySite();
    }

    AKL.toggleFooterInfo();
    AKL.textAutoRolling();
    AKL.userNameEllipsis();
    AKL.toggleSearchKeyword();

    function checkMobile() {
        var filter = "win16|win32|win64|mac|macintel";

        if (navigator.platform) {
            if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
                if (!!aklQuick) {
                    AKL.accordionQuickMenu();
                }
            }
        }

    }
    checkMobile();

})

document.addEventListener('load', function () {

})
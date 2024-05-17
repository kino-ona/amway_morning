// 토스트 팝업
$.fn.uxToast = function (options) {
	var settings = $.extend({
		toastPopup : '.toastPopup',
		msg : '',
		delay : '3000'
	}, options);

	var $mainTop = parseInt($('main').css('margin-top'))
	var $toastPopup = $(settings.toastPopup)
	var $toastBtn = $(this)

	var offsetCalc = function() {
		if($(window).width() > 768) {

			var btn = $.extend($toastBtn.offset(),{w: $toastBtn.width(),h:$toastBtn.height()});
			var positionLeft = $toastBtn.offset().left - ($toastPopup.width() / 2) + ($toastBtn.outerWidth() / 2);
			$toastPopup.css({
				top : (btn.top -$mainTop - $toastPopup.height())+'px',
				left : positionLeft
			});
		} else {
			var floating = $('.box_mobile-floating');
			var positionBottom = floating.outerHeight(true) || 0;

			$toastPopup.css({
				bottom: positionBottom + 13,
			})
		}
	}

	if(settings.msg) {
		if($toastPopup.find('.msg-box .msg.extra').length == 0) {
			$toastPopup.find('.msg-box').append("<div class='msg extra'>"+settings.msg+"</div>");
		} else {
			$toastPopup.find('.msg-box .msg.extra').text(settings.msg)
		}
	} else {
		$toastPopup.find('.msg-box .msg.extra').remove();
	}


	offsetCalc();
	$toastPopup.show();

	var timer =  setTimeout(function(){
		$toastPopup.hide();
		$toastPopup.removeAttr('style');
		},settings.delay)

	$toastPopup.find('.btn_close').off().on('click',function(){
		$toastPopup.hide()
		clearTimeout(timer);
	})


	$(window).off('resize',offsetCalc).on('resize', offsetCalc )
	return this;
};

// designed Drop Box
$.fn.uxeSelectBox = function (options) {
	var settings = $.extend({
		'selector' : 'js-selectbox',
		'btnElement' : '.select_item-selected',
		'btnSelector' : 'js-select-btn',
		'dropdownElement' : 'ul.select_list',
		'dropdownSelector' : 'js-select-dropdown',
		'speed' : 0,
		'selectableMenuElement' : 'li.select_list-item .select_item',
		'isSubmit' : false,
		'isSubmitValueAttribute' : 'id',
		'txtSwap':true,
		'swapTxtToTag':false,
		'cloneTagSelector': null
	}, options);
	return this.each(function(){
		var $this = $(this);
		var $dropdown = $this.find(settings.dropdownElement);
		var $btn = $this.find(settings.btnElement);
		var $btntxtfield = $btn.find('.js-data');
		$this.addClass(settings.selector);
		$dropdown.addClass(settings.dropdownSelector);
		$btn.addClass(settings.btnSelector);
		$btn.off("click").on("click", function(e){
			e.preventDefault();
			$this.toggleClass('active');
		});
		var $optionmenu = $dropdown.find(settings.selectableMenuElement);
		$optionmenu.each(function(){
			$(this).off("click").on("click", function(e){
				e.preventDefault();
				var txt = $(this).text(),
					ipval = $(this).attr(settings.isSubmitValueAttribute),
					$ip = $this.find('input[type="text"]');
				if($dropdown.hasClass('list_minishop')){
					$btntxtfield.html($(this).children().clone()).addClass('option_selected');
				}
				else if(settings.txtSwap === true){
					if(settings.swapTxtToTag === true){
						var tags;
						(settings.cloneTagSelector!==null)?tags=$(this).find(settings.cloneTagSelector).html():tags=$(this).html();
						$btntxtfield.html(tags).addClass('uxe-selected');
					}else{$btntxtfield.text(txt).addClass('uxe-selected');}
				};
				if(settings.isSubmit === true){
					$hiddenIp = $this.find('input[type="hidden"]');
					$hiddenIp.val(ipval);
				}
				$optionmenu.parent().removeClass('selected');
				$(this).parent().addClass('selected');
				$this.addClass('selected').toggleClass('active');
			})
		});
	});
};

// Accordion Menu
$.fn.uxeAccordionMenu = function (options) {
	var settings = $.extend({
		'selector' : 'js-accordion',
		'itemSelector' : '.accordion_title',
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

//스크롤 시, 특정 이하 단에서 fixed
$.fn.uxePositionFix = function (options) {
	var settings = $.extend({
		'selector' : 'js-uxeposfix',
		'limitSelector': '.cart_product-area',
		'limitPlus': null,
		'fixClass': 'fixed',
		'ctrlTop': 0,
		'offsetValue': 0,
		'wrapHeightNeccessary' : false,
		'useBottomLimit' : false,
		'bottomLimitSelector' : '#footer',
		'scondBottomLimitSelector' : null
	},options);
	return this.each(function(){
		var $this = $(this);
		$this.addClass(settings.selector);
		var offsetTop = $this.offset().top;
		var sTop;
		var ctrlTop = settings.ctrlTop;
		var $limitObj = $(settings.limitSelector);
		if(settings.useBottomLimit === true ){
			var $bottomlimitObj = $(settings.bottomLimitSelector);
		}
		var minusTop = 0;
		var fixedCtrl =  function(){
			var sTop = $(document).scrollTop();
			var limit = $limitObj.offset().top + (settings.offsetValue) - settings.ctrlTop;
			if(settings.useBottomLimit === true) var bottomlimit = $bottomlimitObj.offset().top;
			if(settings.scondBottomLimitSelector !== null ){
				var secondbottomlimit = $(settings.scondBottomLimitSelector).offset().top;
			}

			if( settings.useBottomLimit === true && $(window).height()  > bottomlimit - limit || (settings.scondBottomLimitSelector !== null && $(window).height() > secondbottomlimit - limit)){
				$this.removeClass(settings.fixClass);
				minusTop = 0;
				if(ctrlTop !== 0){
					$this.css('top','');
				}
			}

			else if(settings.useBottomLimit === true && sTop > (bottomlimit-$(window).height()) && bottomlimit - limit > $(window).height()){
				var minustop = bottomlimit - sTop + settings.ctrlTop-$(window).height() - 105; //20220128 수정
				$this.css('top', minustop).addClass(settings.fixClass);
				//$this.removeClass(settings.fixClass);
			}
			else if(sTop < limit && ($this.hasClass('on') == false) ){
				$this.removeClass(settings.fixClass);
				minusTop = 0;
				if(ctrlTop !== 0){
					$this.css('top','');
				}else{$this.removeAttr('style');}

			}
			else if (sTop >= limit){
				//$this.addClass(settings.fixClass);
				$this.addClass(settings.fixClass).css('top',settings.ctrlTop);
			} else{}
		};

		fixedCtrl();
		$(window).scroll(function(e){
			fixedCtrl();
		});
	});
};

//Tab
$.fn.uxeTabs = function (options) {
	var settings = $.extend({
		'selector' : 'js-tabs',
		'menuSelector': '.list-item--tab',
		'menuBtnSelector' : '.list-item--btn',
		'mainTargetAttribute' : 'name',
		'activeTabMenuClass': 'is-selected',
		'tabsContentSlector' : '.list-item--btn',
		'activeTabContentClass' : 'active',
		'speed': 0,
		'autoFirstActivate': false,
		'firstActiveIndex':0,
		'useSubTarget' : false,
		'useSubTargetAttribute' : 'data-subtarget',
		'subtargetClass' : 'is-selected',
		'navClickScrollToTabsTop' :false
	}, options);
	return this.each(function(){
		var $this = $(this);
		var $navs = $this.find(settings.menuSelector);
		var tabsScrollTop = $this.offset().top;
		$this.addClass(settings.selector);
		if(settings.autoFirstActivate === true){
			var fisrtMenuElement = $this.find(settings.menuSelector).eq(settings.firstActiveIndex);
			var fisrtHash = fisrtMenuElement.find('.list-item--btn').attr(settings.mainTargetAttribute);
			fisrtMenuElement.addClass(settings.activeTabMenuClass).siblings().removeClass(settings.activeTabMenuClass);
			$this.find(fisrtHash).addClass(settings.activeTabContentClass);
			if(settings.useSubTarget===true){
				var $firstsubTarget = $(fisrtMenuElement.find('.list-item--btn').attr(settings.useSubTargetAttribute));
				$firstsubTarget.addClass(settings.subtargetClass);
			}
		};
		$navs.find(settings.menuBtnSelector).click(function(e){
			e.preventDefault();
			var hash = $(this).attr(settings.mainTargetAttribute);
			var $tabContent = $this.find(settings.tabsContentSlector);

			$navs.removeClass(settings.activeTabMenuClass);
			$tabContent.removeClass(settings.activeTabContentClass);
			$(this).parents(settings.menuSelector).addClass(settings.activeTabMenuClass);
			$(hash).addClass(settings.activeTabContentClass);
			$('.box__item-wrap').removeClass('active');

			if(settings.useSubTarget===true){
				var $subTarget = $($(this).attr(settings.useSubTargetAttribute));
				$this.find($subTarget).addClass(settings.subtargetClass);
			}
			//if(settings.navClickScrollToTabsTop===true)$(document).scrollTop($this.offset().top);

		});
	});
};

// product type
function ProductType(){
	var selector = $('.box_product');
	var listSelector = $('#ListType');
	var imageSelector = $('#ImageType');
	var mobileSelector = $('#mobileType');
	var btnBasic = $('.list_view-option .btn_square-d');
	var btnIcon = $('.sp_button');
	
	$(listSelector).on('click', function(){
		$(btnBasic).removeClass('active');
		$(this).addClass('active');
		$(selector).removeClass('product_image-type box_no-type').addClass('product_list-type');
		$(mobileSelector).find(btnIcon).addClass('sp_button-list').removeClass('sp_button-image');
		History.replaceState({}, document.title, urlPath() + getQueryString("listType=list"));
		$("#currentListType").val('list');
	});
	$(imageSelector).on('click', function(){
		$(btnBasic).removeClass('active');
		$(this).addClass('active');
		$(selector).removeClass('product_list-type').addClass('product_image-type box_no-type');
		$(mobileSelector).find(btnIcon).addClass('sp_button-image').removeClass('sp_button-list');
		History.replaceState({}, document.title, urlPath() + getQueryString("listType=image"));
		$("#currentListType").val('image');
	});
	$(mobileSelector).on('click', function(){
		$(this).find(btnIcon).toggleClass('sp_button-list').toggleClass('sp_button-image');
		$(selector).toggleClass('product_list-type').toggleClass('product_image-type box_no-type');
		$(listSelector).toggleClass('active');
		$(imageSelector).toggleClass('active');
		var listType = $(listSelector).hasClass('active') ? 'list' : 'image';
		History.replaceState({}, document.title, urlPath() + getQueryString("listType="+listType));
		$("#currentListType").val(listType);
	});
	
	if( $("#currentListType").val() == "image" ) {
		if( ACC.config.isMobile == "true" ) {
			$(imageSelector).trigger("click");
		} else {
			$(mobileSelector).trigger("click");
		}
	}

	function urlPath() {
		var fullUrl = location.href;
		return location.search ? fullUrl.substring(0, fullUrl.indexOf(location.search)) : fullUrl;
	}
	function getQueryString(param) {
		var queryString = location.search.replace(/.?listType=[a-zA-Z0-9]*/g,"");
		var prefix = queryString ? "&" : "?";
		return queryString + prefix + param;
	}
}

// one4one product type
function ProductTypeB(){
	var selector = $('.ono4one_product_list');
	var viewSelector = $('#viewType');
	var btnIcon = $('.sp_button');

	$(viewSelector).on('click', function(){
		$(this).find(btnIcon).toggleClass('sp_plp-a').toggleClass('sp_plp-b');
		$(selector).toggleClass('list-type').toggleClass('card-type');
	});

	// 2020-03-17 Prevent Scroll, Close Dim
	$('.btn_image.filter-open').on('click', function(e) {
		e.preventDefault();
		$('.box_filter').addClass('open');
		var scrollTo = $(document).scrollTop();
		$( 'body' ).css({
			'overflow': 'hidden',
			'position': 'fixed',
			'top' : -scrollTo
		});
	});
	$('.btn_filter-close, .filter_dim').on('click', function() {
		$('.box_filter').removeClass('open');
		var scrollValue = parseInt($('body').css('top')) * -1;

		$( 'body' ).css({
			'overflow': '',
			'position': '',
			'top' : ''
		});
		window.scrollTo(0, scrollValue);
	});
}
function layerCloseA(){
	var selector = $('.tooltip-layer.instantly-payment .box-info-close');
	var viewLayer = $('.tooltip-layer.instantly-payment');

	$(selector).on('click', function(){
		$(viewLayer).removeClass('is-showing');
	});
}

// tollTipLayer
var tollTipLayer = function () {
	var btnTooltip = document.querySelectorAll('[data-tooltip]');
	var targetLayer = null;
	for (var i = 0; i < btnTooltip.length; i++) {
		btnTooltip[i].addEventListener( 'click', function (e) {
			e.stopPropagation();
			var targetId = this.dataset.tooltip;
			targetLayer = document.querySelector('#' + targetId );
			targetLayer.classList.toggle( 'is-showing' );

		} );
	}

	document.body.addEventListener('click', function (evt) {
		var noRedirect = '.tooltip-layer, .tooltip-cont, .tooltip-txt';
		if (!evt.target.matches(noRedirect)) {
			if (targetLayer == null) return;
			targetLayer.classList.remove( 'is-showing' );
		}
	} )

};

// SOP Sticky
var sopStickyMenu = function () {
	var stickyMenu = $('.box_product-fixed')
	if (!stickyMenu.length) return;
	var onlyClick = false,
		//stickyOffsetTop = stickyMenu.offset().top,
		stickyOffsetTop =  $('.box_product-fixed_wrap').offset().top,
		headerHeight = $( '.main-header' ).height();

	$(window).on('scroll load resize', function () {	
		//console.log(onlyClick);		
		if ( onlyClick === true ) { return }		
		var winScrollTop = $( this ).scrollTop(),
			headerHeight = $( '.main-header' ).height();
		if (winScrollTop >= stickyOffsetTop - headerHeight) {
			//console.log(winScrollTop + ',' + stickyOffsetTop + ',' +  headerHeight )
			stickyMenu.addClass( 'fixed' );
		} else {
			stickyMenu.removeClass( 'fixed' );
		}

		var h = headerHeight + $('.box_product-fixed_wrap').height();
		$('.box_product-list button').each(function () {
			var currLink = $(this);
			var refElement = $('#'+currLink.attr("data-link"));
			if ( refElement.offset().top - h <= winScrollTop  && refElement.offset().top + refElement.height() - headerHeight > winScrollTop ) {
				currLink.addClass("active");
				currLink.siblings().removeClass("active");
				currLink.parents('.box_product-fixed').addClass( 'fixed' );
			}
			else{
				currLink.removeClass("active");
			}
		});		
	})
	
	//sopSearchTopCheck();

	$(window).on('resize scroll', function () {	
		var ws = $(window).width();
		if (ws <= 768) {
			if ($('main').is('.up')) {
				$('.box_product-fixed.fixed').css('top', '54px')
			} else {
				$('.box_product-fixed.fixed').css('top', '86px')
			}
		} else {
			$('.box_product-fixed.fixed').css('top', '134px')
		} 
	} );

	// 탭메뉴 sticky 영역 버튼 클릭시
	$('.btn-sop-pack').click(function(){
		onlyClick = true;
		stickyMenu.addClass( 'fixed' );

		var seq = $(this).attr("data-link"),
			offset = $("#" + seq).offset(),
			h = $('.main-header').height() + $('.box_product-fixed_wrap').height() - 1;

		$(this).addClass("active");
		$(this).siblings().removeClass("active");
		$('html, body').stop().animate({scrollTop : offset.top - h}, 300, function(){
			onlyClick = false;
		});
	})
};

// sop2차 제품추가 관련
// swiper 상위 버전 
var AP = AP || {};
var AP = function () {
	// 카테영역	
	var allBox = $('#layer-addProduct').find('.layer-area_container'),
		targetMenu = $('.target-menu'),
		depthArea = $('.menu'),
		depth1Menu = $('.menu-link'),
		depth2Area = $('.depth-menu-area'),
		// 검색영역
		searchMenu = $('.btn_prd_search'),    
		// 필터영역
		filterMenu = $('.btn_prd_filter, .btn_filter-close'),          
		filterArea = $('.prd_search_filter_box .filter-box'),  
		// 정보영역  
		depth2Open = false; 		
	
	var menuHandler = function(){
		targetMenu.on('click', function(){              
			depthArea.toggle();     
			if ( depth2Open === true ) {
				//AP.menuReset();;  
				allBox.addClass('is-depth2-opened') 
			}  else {
				allBox.toggleClass('is-depth1-opened') 
			}              
		});   		
		depth1Menu.on('click', function(){             
			var targetText = $(this).text();
			// targetMenu.find('.target-txt').text(targetText);
			targetMenu.find('.target-txt').text(); // 2020-11-20 
			var num =  $(this).index('.menu-link'); 
			if(num == 0){
				depth2Area.hide();
				$('.depth-menu-area:nth-child(1)').show(); //20220127
				targetMenu.find('.target-txt').text('카테고리 선택');					// 2020-11-19 add best30 클릭 시 
				allBox.removeClass('is-depth1-opened').addClass('is-depth2-opened'); //20220127
				allBox.find('.layer-area_content').css('height', 'calc(100% - 110px - 152px)');
				depthArea.toggle();  
				status.depth2Open = false;    
				return;
			} 
			depth1Menu.each(function(i){
				if (i == num){ 	
					depth2Area.hide();
					depth2Area.eq(i).show();
					// 2020-10-19 메뉴 적을때 움직임 추가
					var aLinkResult = 0;
					console.log($('.menu_tail .swiper-container:eq(' + (i-1) + ')').find('.swiper-wrapper a').length);
					$('.menu_tail .swiper-container:eq(' + (i-1) + ')').find('.swiper-wrapper a').each(function(i){
						aLinkResult = aLinkResult + $(this).width() + 26;  // 2020-11-09 여백을 못가져와서 26 추가
						//aLinkResult = aLinkResult + $(this).width();
					});
					console.log(aLinkResult + ', ' + $('.layer-area_container').width());
					if ( aLinkResult < $('.layer-area_container').width() ) { 
						$('.menu_tail').find('.swiper-container')[i-1].swiper.params.centeredSlides = false;
						$('.menu_tail').find('.swiper-container')[i-1].swiper.params.centeredSlidesBounds = false;
						$('.menu_tail').find('.swiper-container')[i-1].swiper.params.slideToClickedSlide = false;
					} else {
						$('.menu_tail').find('.swiper-container')[i-1].swiper.params.centeredSlides = true;
						$('.menu_tail').find('.swiper-container')[i-1].swiper.params.centeredSlidesBounds = true;
						$('.menu_tail').find('.swiper-container')[i-1].swiper.params.slideToClickedSlide = true;
					}
					//$('.menu_tail').find('.swiper-container')[i-1].swiper.slideTo(1);  
					$('.menu_tail').find('.swiper-container')[i-1].swiper.update();   
					depthArea.hide();
					allBox.find('.layer-area_content').removeClass('space');
					allBox.find('.layer-area_content').css('height', 'calc(100% - 110px - 152px)');

				} else if (i == 2){ //20220127
					console.log(i + 'r');
					depth2Area.hide();
					allBox.find('.layer-prd_search_top').css('height', 'auto');
					allBox.find('.layer-area_content').css('height', 'calc(100% - 110px - 105px)');
				}
			})
			depth2Open = true;                
			allBox.removeClass('is-depth1-opened').addClass('is-depth2-opened');
		});  
		$('.swiper-slide').on('click', function(){             
			$(this).siblings().removeClass('is-selected');
			$(this).addClass('is-selected');
		});  

		// 카트 제품목록 레이어팝업
		var $btnCart = $('.btn-cart');
		var $layerBottom = $('.layer-area_bottom');
		var $layerBottomDim = $('.layer-area_bottom_dim');
		// 2020-10-19 카트 제품목록 딥처리 관련
		function btnCartHandler(){
			$layerBottom.removeClass('is-opened'); 
			$layerBottomDim.removeClass('showing'); 
			$btnCart.removeClass('active'); 
		}
		$('.btn-modal_close').click(function(){
			btnCartHandler();
		})
		$btnCart.on('click', function () {
			//if ( $('html').hasClass('ieEdge') || $('html').hasClass('ieBrowser') ) {return} // 2020-10-29 ie 미실행, 카탈로그것 실행
			var _self = $( this );
			if (!_self.is('.active')) {
				_self.addClass( 'active' );
				$layerBottom.addClass( 'is-opened' );	
				$layerBottomDim.addClass('showing');			
			} else {
				_self.removeClass( 'active' );
				$layerBottom.removeClass( 'is-opened' );
				$layerBottomDim.removeClass('showing');
			}
			//$layerBottomDim.toggleClass('showing');
		})	
	};

	// 뎁스2
	var menuSwipe = function(){
		var menuSwipeOption = {
			//slidesPerView: 5,
			slidesPerView: 'auto',
			centeredSlides: true,
			centeredSlidesBounds : true,
			slideToClickedSlide : true,
			initialSlide : 0,
			on: {
				init: function () {
				},
				resize : function(){

				}
			},
		}; 			
		var menuSwiper = new Swiper('.swiper-container', menuSwipeOption);
	};
 
	// 필터
	var filterHandler = function(){
		filterMenu.on('click', function() {
			filterArea.toggleClass('open');
		});
		$('.btn_filter-select, .btn_filter-close').on('click', function() {
			filterArea.removeClass('open');
		});
		// 2020-10-28 첫번째 가격 checkbox 단일 선택 제어 
		$('.panel').first().find('label').click(function(){
			var index = $(this).index('.panel:first-child label');
			$('.panel').first().find('label').each(function(i){
				if (i == index ){
					$(this).prev('input').prop('checked');
				} else {
					$(this).prev('input').prop('checked',false);						
				}
			})
		});
		// 2020-10-28 첫번째 패널 외 checkbox 단일 선택 필요시 oneCheck 클래스 추가
		$('.panel.oneCheck label').click(function(){
			var index = $(this).index('.panel.oneCheck label');
			$('.panel.oneCheck').find('label').each(function(i){
				if (i == index ){
					$(this).prev('input').prop('checked');
				} else {
					$(this).prev('input').prop('checked',false);						
				}
			})
		})
	};
	
	// 검색
	var searchHandler = function(){
		searchMenu.on('click', function(){			
			allBox.toggleClass('is-search-opened');
			$('.list_view-option .btn_prd_search').toggle();
			$('.prd_search_form_box .input-group .inp_item_quick_sch').focus();		/* 2020-11-06 focus */ 
		});
		// 연관검색어
		function showItemSuggestion() {
			var itemQuickSch = $('.prd_search_form_box');
			var inpSchWord = itemQuickSch.find('.inp_item_quick_sch');
			var layerSchItemList = itemQuickSch.find('.item-suggestion-popover');
			inpSchWord.bind({
				'focus' : function(e){
					layerSchItemList.show();
				},
				'blur' : function(e){
					layerSchItemList.hide();
				}
			});
		}
		//showItemSuggestion();  //2020-10-19 주석처리(개발요청)
	}	
	
	var init = function() {		
		menuHandler();
		menuSwipe();
		filterHandler();
		searchHandler();
	}
	init();	

	// 확인용(삭제예정)
	var result = function(elem){
		if(!elem){ return }
		allBox.removeClass('is-search-opened, is-depth2-opened').addClass('is-search-result');
		$('.btn_prd_search').hide();
		if ( elem === 1 ) {
			$('.result_1, .product_list-type.catalogue').show();
			$('.result_2, .result_3, .search_result_nodata_area').hide();
		} else if ( elem === 2 ) {
			$('.result , .search_result_nodata_area').hide();
			$('.result_2 , .product_list-type.catalogue').show();
		} else if  ( elem === 3 ) {
			$('.result , .product_list-type.catalogue').hide();
			$('.result_3 , .search_result_nodata_area').show();
		} 	
	};

	return {
		result : result,
	}
} 

// swiper 하위 버전 4.x  (테스트중)
var AP2 = AP2 || {};
var AP2 = function () {
	// 카테영역	
	var allBox = $('.layer-area_container'),
		targetMenu = $('.target-menu'),
		depthArea = $('.menu'),
		depth1Menu = $('.menu-link'),
		depth2Area = $('.depth-menu-area'),
		// 검색영역
		searchMenu = $('.btn_prd_search'),    
		// 필터영역
		filterMenu = $('.btn_prd_filter, .btn_filter-close'),          
		filterArea = $('.prd_search_filter_box .filter-box'),  
		// 정보영역  
		depth2Open = false; 		
	
	var menuHandler = function(){
		targetMenu.on('click', function(){              
			depthArea.toggle();     
			if ( depth2Open === true ) {
				//AP.menuReset();;  
				allBox.addClass('is-depth2-opened') 
			}  else {
				allBox.toggleClass('is-depth1-opened') 
			}              
		});   		
		depth1Menu.on('click', function(){             
			var targetText = $(this).text();
			// targetMenu.find('.target-txt').text(targetText);
			targetMenu.find('.target-txt').text(); // 2020-11-20 
			var num =  $(this).index('.menu-link'); 
			if(num == 0){
				depth2Area.hide();
				targetMenu.find('.target-txt').text('카테고리 선택');					// 2020-11-19 add best30 클릭 시 
				allBox.removeClass('is-depth1-opened').removeClass('is-depth2-opened');
				depthArea.toggle();  
				status.depth2Open = false;    
				return;
			}
			depth1Menu.each(function(i){
				if (i == num){ 	
					depth2Area.hide();
					depth2Area.eq(i-1).show();
					// 2020-10-19 메뉴 적을때 움직임 추가
					var aLinkResult = 0;
					$('.menu_tail .swiper-container:eq(' + (i-1) + ')').find('.swiper-wrapper a').each(function(i){
						//aLinkResult = aLinkResult + $(this).width() + 26;
						aLinkResult = aLinkResult + $(this).width();
					});
					console.log(aLinkResult + ', ' + $('.layer-area_container').width());
					/* if ( aLinkResult < $('.layer-area_container').width() ) { 
						$('.menu_tail').find('.swiper-container')[i-1].swiper.params.centeredSlides = false;
						$('.menu_tail').find('.swiper-container')[i-1].swiper.params.centeredSlidesBounds = false;
						$('.menu_tail').find('.swiper-container')[i-1].swiper.params.slideToClickedSlide = false;
					} else {
						$('.menu_tail').find('.swiper-container')[i-1].swiper.params.centeredSlides = true;
						$('.menu_tail').find('.swiper-container')[i-1].swiper.params.centeredSlidesBounds = true;
						$('.menu_tail').find('.swiper-container')[i-1].swiper.params.slideToClickedSlide = true;
					} */
					//$('.menu_tail').find('.swiper-container')[i-1].swiper.slideTo(1);  
					$('.menu_tail').find('.swiper-container')[i-1].swiper.update();   
					depthArea.hide();
				} 
			})
			depth2Open = true;                             
			allBox.removeClass('is-depth1-opened').addClass('is-depth2-opened');
		});  
		$('.swiper-slide').on('click', function(){             
			$(this).siblings().removeClass('is-selected');
			$(this).addClass('is-selected');
		});  
		/* $('.btn-cart').on('click', function () {
			$('.layer-area_bottom_dim').toggleClass('showing');
			//$('.layer-area_bottom').toggleClass('is-opened');
		}); */
		// 카트 제품목록 레이어팝업
		var $btnCart = $('.btn-cart');
		var $layerBottom = $('.layer-area_bottom');
		var $layerBottomDim = $('.layer-area_bottom_dim');
		// 2020-10-19 카트 제품목록 딥처리 관련
		function btnCartHandler(){
			$layerBottom.removeClass('is-opened'); 
			$layerBottomDim.removeClass('showing'); 
			$btnCart.removeClass('active'); 
		}
		$('.btn-modal_close').click(function(){
			btnCartHandler();
		})
		$btnCart.on('click', function () {
			//if ( $('html').hasClass('ieEdge') || $('html').hasClass('ieBrowser') ) {return}
			var _self = $( this );
			if (!_self.is('.active')) {
				_self.addClass( 'active' );
				$layerBottom.addClass( 'is-opened' );	
				$layerBottomDim.addClass('showing');			
			} else {
				_self.removeClass( 'active' );
				$layerBottom.removeClass( 'is-opened' );
				$layerBottomDim.removeClass('showing');
			}
			//$layerBottomDim.toggleClass('showing');
		})	
	};

	// 뎁스2
	var menuSwipe = function(){
		var menuSwipeOption = {
			//slidesPerView: 5,
			slidesPerView: 'auto',
			centeredSlides: false,
			slideToClickedSlide : true,
			initialSlide : 0,
			on: {
				init: function () {
				},
				resize : function(){
					
				}
			},
		}; 			
		var menuSwiper = new Swiper('.swiper-container', menuSwipeOption);
	};
 
	// 필터
	var filterHandler = function(){
		filterMenu.on('click', function() {
			filterArea.toggleClass('open');
		});
		$('.btn_filter-select, .btn_filter-close').on('click', function() {
			filterArea.removeClass('open');
		});
		// 2020-10-28 첫번째 가격 checkbox 단일 선택 제어 
		$('.panel').first().find('label').click(function(){
			var index = $(this).index('.panel:first-child label');
			$('.panel').first().find('label').each(function(i){
				if (i == index ){
					$(this).prev('input').prop('checked');
				} else {
					$(this).prev('input').prop('checked',false);						
				}
			})
		});
		// 2020-10-28 첫번째 패널 외 checkbox 단일 선택 필요시 oneCheck 클래스 추가
		$('.panel.oneCheck label').click(function(){
			var index = $(this).index('.panel.oneCheck label');
			$('.panel.oneCheck').find('label').each(function(i){
				if (i == index ){
					$(this).prev('input').prop('checked');
				} else {
					$(this).prev('input').prop('checked',false);						
				}
			})
		})
	};
	
	// 검색
	var searchHandler = function(){
		searchMenu.on('click', function(){			
			allBox.toggleClass('is-search-opened');
			$('.list_view-option .btn_prd_search').toggle();
			$('.prd_search_form_box .input-group .inp_item_quick_sch').focus();		/* 2020-11-06 focus */ 
		});
		// 연관검색어
		function showItemSuggestion() {
			var itemQuickSch = $('.prd_search_form_box');
			var inpSchWord = itemQuickSch.find('.inp_item_quick_sch');
			var layerSchItemList = itemQuickSch.find('.item-suggestion-popover');
			inpSchWord.bind({
				'focus' : function(e){
					layerSchItemList.show();
				},
				'blur' : function(e){
					layerSchItemList.hide();
				}
			});
		}
		//showItemSuggestion();  //2020-10-19 주석처리(개발요청)
	}	
	
	var init = function() {		
		menuHandler();
		menuSwipe();
		filterHandler();
		searchHandler();
	}
	init();	

	// 확인용(삭제예정)
	var result = function(elem){
		if(!elem){ return }
		allBox.removeClass('is-search-opened, is-depth2-opened').addClass('is-search-result');
		$('.btn_prd_search').hide();
		if ( elem === 1 ) {
			$('.result_1, .product_list-type.catalogue').show();
			$('.result_2, .result_3, .search_result_nodata_area').hide();
		} else if ( elem === 2 ) {
			$('.result , .search_result_nodata_area').hide();
			$('.result_2 , .product_list-type.catalogue').show();
		} else if  ( elem === 3 ) {
			$('.result , .product_list-type.catalogue').hide();
			$('.result_3 , .search_result_nodata_area').show();
		} 	
	};

	return {
		result : result,
	}
} 


// 주문/결제
var payments = payments || {};
var payments = function () {
	var tabArea = $('.tabs_block_wrap'),
		tabMenu = tabArea.find('.tab-toggle');	
		payMenu = $('#target_payment .payTaba');	
	
	var tabHandler = function(){
		tabMenu.on('click', function(e){            
			e.preventDefault();
			$(this).parent().addClass('active');
			$(this).parent().siblings().removeClass('active');
			var tabID = $(this).attr('href'),
				tabContent = $(this).parents('.order-items-toggle').find('.tab-content');
				tabContent.addClass('collapse');
					tabContent2 = $(this).parents('.layer-area_container').find('.tab-content');
					tabContent2.addClass('collapse');
				$(tabID).removeClass('collapse');
		})
	}

	var payHandler = function(){
		payMenu.on('click', function(e){            
			e.preventDefault();
			$(this).addClass('on');
			$(this).siblings().removeClass('on');
			var tabContent = $(this).attr('data-tab');
			$('.pay_cont').hide();
			$('.pay_cont.target_'+tabContent).show();
		})
	}

	var radioTabHandler = function(){
		$('.tab-area input:radio').on('click', function(){
			var elem = $(this).attr('id');
			$(this).prop("checked", true).attr('checked', 'checked');
			$(this).parents('.pay_cont').find('.tab-cont-st2').hide();
			$(this).parents('.pay_cont').find('#'+elem+'_cont').show();

			if ( $(this).parent().parent('.tab-area').hasClass('tab_control0') ) {
				$(this).parents('.tab_control0').find('.tab-cont-st0').hide();	
			} else {
				$(this).parents('.tab_control').find('.tab-cont-st2').hide();
			}
			$('#'+elem+'_cont').show();
		});
	}

	var toggleHandler = function(){
		payMenu.on('click', function(e){            
			e.preventDefault();
			$(this).addClass('on');
			$(this).siblings().removeClass('on');
			var tabContent = $(this).attr('data-tab');
			$('.pay_cont').hide();
			$('.pay_cont.target_'+tabContent).show();
		})
	}

	var abcHandler = function(){
		$('.abc_step li span').each(function(i){  
			$(this).click(function(e){
				e.preventDefault();
				$(this).parent().addClass('on');
				$(this).parent().siblings().removeClass('on');
				$('.step_detail_cont').hide();
				$('.step_detail_cont0'+(i+1)).show();
			})
			
		})
	}

	var init = function() {		
		tabHandler();
		payHandler();
		toggleHandler();
		radioTabHandler();
		abcHandler();
	}
	init();	
	
}

// Product Detail Sticky
var productStickyMenu = function () {
	var stickyMenu = $('.product-tab');
	var stickyTarget = $('.one4one-page');
	if (!stickyMenu.length) return;
	var onlyClick = false;

	var stickyOffsetTop = stickyMenu.offset().top,
		headerHeight = $( '.main-header' ).height();

	$(window).on('scroll load resize', function () {
		if ( productStickyMenu.onlyClick === true ) { return }
		var winScrollTop = $( this ).scrollTop(),
			headerHeight = $( '.main-header' ).height();
		if (winScrollTop >= stickyOffsetTop - headerHeight) {
			stickyTarget.addClass( 'sticky' );
		} else {
			stickyTarget.removeClass( 'sticky' );
		}

		var h = headerHeight + $('.box-tab-area').height();
		$('.product-tab .tab-item').each(function () {
			var currLink = $(this);
			var refElement = $('#'+currLink.find('.link-tap').attr("data-link"));
			if ( refElement.offset().top - h <= winScrollTop  && refElement.offset().top + refElement.height() > winScrollTop ) {
				currLink.find('.link-tap').addClass("active");
				currLink.siblings().find('.link-tap').removeClass("active");
			}
			else{
				currLink.removeClass("active");
			}
		});
	})

	// 탭메뉴 sticky 영역 버튼 클릭시
	$('.tab-item').click(function(){
		productStickyMenu.onlyClick = true;
		var seq = $(this).find('.link-tap').attr("data-link"),
			offset = $("#" + seq).offset(),
			h = $('.main-header').height() + $('.box-tab-area').height() - 1;

		$(this).find('.link-tap').addClass("active");
		$(this).siblings().find('.link-tap').removeClass("active");
		$('html, body').animate({scrollTop : offset.top - h}, 0);
		setTimeout(function() {
			productStickyMenu.onlyClick = false;
		}, 400);
	})
};

$(function () {
	// Drop Box
	// $('.box_select').not('.disable,.linked').uxeSelectBox({
	// 	'isSubmit' : true,
	// 	'isSubmitValueAttribute' :'data-value'
	// });

	$(document).on('click', '.select_item-selected', function() {
		$('.box_select').not('.disable,.linked').uxeSelectBox({
			'isSubmit' : true,
			'isSubmitValueAttribute' :'data-value'
		});
	});

	// Drop Box click시 타레이어 닫힘
	$(document).on('click','.js-selectbox',function(){
		var $this = $(this);
		$('.js-selectbox').not(this).each(function(){
			$(this).removeClass('active');
		});
	});

	// Set Accordion
	$('.box_accordion').uxeAccordionMenu({
		'clickedShowOnly': true
	});

	// NEW PLP : 모바일하단메뉴 플로팅
	$(document).off('click','.btn_floating');
	$(document).on("click", ".btn_floating", function(e) {
		var $this = $(e.currentTarget);
		$this.toggleClass('active');

		if(!$(this).hasClass('active')) {
			$('.akl .renewal_floating-type ~ #footer .scrollTopWrapper').css('bottom','130px');
			$('.akl .renewal_floating-type ~ .box-chatbot').css('bottom','70px');
		} else {
			$('.akl .renewal_floating-type ~ #footer .scrollTopWrapper').css('bottom','175px');
			$('.akl .renewal_floating-type ~ .box-chatbot').css('bottom','115px');
		}
	});

	// 플로팅타입 - top버튼 위치 조정
	var $plpV2 = $('.renewal-fonts');
	if ( $plpV2.is('.renewal_floating-type')) {
		$('.renewal_floating-type').parent().addClass('renewal_floating-type');
	}
	if ($plpV2.is('.renewal_floating-type2')) {
		$('.renewal_floating-type2').parent().addClass('renewal_floating-type2');
	}

	// 제품 상세 아코디언 이벤트시 위치 조정
	var $AcoArea = $('.list-information');
	var $btnAco = $AcoArea.find('.btn_accordion');
	$btnAco.on('click', function () {
		if(!$(this).parent().parent().hasClass('active')) {

		} else {
			var offset = $(this).offset(),
				headerHeight = $( '.main-header' ).height(),
			    tabHeight = $('.box-tab-area').height();

			$('html, body').animate({scrollTop : offset.top - headerHeight - tabHeight}, 0);
		}

	});

	// 제품 상세 더보기
	var $detailMore = $('.product-detail-area .btn_more-a');
	$detailMore.on('click', function () {
		$('.product-detail-area').addClass('mobile-more');
		$(this).addClass('none')
	});

	// 제품 정보 더보기
	var $detailInfoMore = $('.product-etc-info .etc-info-more');
	$detailInfoMore.on('click', function () {
		$('.box-etc-info').addClass('open');
		$(this).addClass('none')
	});

	// 20220525 상품페이지 아코디언 관련 스크립트 추가
	function accordionProduct() {
		$('#productPageAccordion').on('shown.bs.collapse', '.panel-default', function(event) {
			event.preventDefault();
			var offset = $(this).offset();
			$('html, body').animate({scrollTop:offset.top - 150}, 1000);
		});
	};

	accordionProduct();


	// 카탈로그 레이어팝업
	var $cartArea = $('.cart-area');
	var $btnCart = $cartArea.find('.btn-cart');
	var $layerTop = $('.layer-area_top');
	var $layerBottom = $('.layer-area_bottom');
	var $btnProduct = $layerTop.find('.btn-product');
	var $cateText = $btnProduct.find( '.cate-txt' );
	var $categoryList = $layerTop.find('.category-list');
	var $categoryItme = $layerTop.find('.category-item');


	
	$btnCart.on('click', function () {
		if ( $('#layer-addProduct').length >= 1 ) { return }  // 2020-11-03 제품추가팝업 호출시 
		var _self = $( this );
		if (!_self.is('.active')) {
			_self.addClass( 'active' );
			$layerBottom.addClass( 'is-opened' );
			//$('.layer-area_bottom_dim').addClass( 'showing ');  // 2020-10-29 제품추가에 사용시
		} else {
			_self.removeClass( 'active' );
			$layerBottom.removeClass( 'is-opened' );
			//$('.layer-area_bottom_dim').removeClass( 'showing '); // 2020-10-29 제품추가에 사용시
		}
		$categoryList.removeClass( 'showing' );
		$btnProduct.removeClass('active');
	})

	$btnProduct.on('click', function () {
		var _self = $(this);
		_self.toggleClass('active');
		$categoryList.toggleClass( 'showing' );

		if ($layerBottom.is('.is-opened')) {
			$layerBottom.removeClass( 'is-opened' );
			$btnCart.removeClass( 'active' );
		}
	})

	$categoryItme.on('click', function () {
		var _self = $( this );
		var selectedText = _self.find( '.category-link' ).text();
		$categoryItme.removeClass( 'active' );
		_self.addClass( 'active' );
		$cateText.empty().text(selectedText);
		$categoryList.removeClass( 'showing' );
	})

	var entryPointLayer = $('.entry-point_layer');
	entryPointLayer.on('click', function () {
		var _self = $(this);
		_self.fadeOut();
	})

});
var AMWAY = (function () {
	var callLayer = function () {
		var btnLayer = document.querySelectorAll('[data-layer]');
		for (var i = 0; i < btnLayer.length; i++) {
			btnLayer[i].addEventListener( 'click', function (e) {
				var targetId = this.dataset.layer;
				var targetLayer = document.querySelector('#' + targetId );
				targetLayer.classList.add( 'showing' );

				if ($(targetLayer).is('.layer-area, #cartLayer')) {
					$( 'html, body' ).addClass( 'scroll-off' );
				}
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

			})
		}

		var btnLayerClose2 = document.querySelectorAll('.layer_section .btn-modal_close');
		for (var i = 0; i < btnLayerClose2.length; i++) {
			btnLayerClose2[i].addEventListener('click', function (e) {
				var targetElem = e.target;
				while (!targetElem.classList.contains('layer_section')) {
					targetElem = targetElem.parentNode;
					if (targetElem.nodeName == 'BODY') {
						targetElem = null;
						return;
					}
				}
				targetElem.classList.remove( 'showing' );
				$( 'html, body' ).removeClass( 'scroll-off' );
			})
		}

		var btnLayerClose3 = document.querySelectorAll('.layer-area .btn-modal_close');
		for (var i = 0; i < btnLayerClose3.length; i++) {
			console.log('ok')
			btnLayerClose3[i].addEventListener('click', function (e) {
				var targetElem = e.target;
				while (!targetElem.classList.contains('layer-area')) {
					targetElem = targetElem.parentNode;
					if (targetElem.nodeName == 'BODY') {
						targetElem = null;
						return;
					}
				}
				targetElem.classList.remove( 'showing' );
				$( 'html, body' ).removeClass( 'scroll-off' );
			})
		}

		var btnLayerClose4 = document.querySelectorAll('.layer-area .btn_back');
		for (var i = 0; i < btnLayerClose4.length; i++) {
			btnLayerClose4[i].addEventListener('click', function (e) {
				var targetElem = e.target;
				while (!targetElem.classList.contains('layer-area')) {
					targetElem = targetElem.parentNode;
					if (targetElem.nodeName == 'BODY') {
						targetElem = null;
						return;
					}
				}
				targetElem.classList.remove( 'showing' );
				$( 'html, body' ).removeClass( 'scroll-off' );
			})
		}
	};

	function floatingCtrl() {
		$( '.renewal-fonts input[type="text"], .renewal-fonts input[type="tel"]' )
			.not('.renewal-fonts input[readonly], .box_spinor-mobile .form_input').on( 'focus blur', function (e) {
			var mobileFloating = $('.box_mobile-floating');

			if (e.type === 'focus') {
				mobileFloating.addClass('hidden');
			} else if (e.type === 'blur') {
				mobileFloating.removeClass('hidden');
			}
		} );
	}

	// 카탈로그 스와이프 #1
	var catalogueCarousel01 = function () {
		var catalogue = $('#catalogue');
		var catalogueContent = $('.catalogue-content');

		var optionMain = {
			loop: true,
			pagination: false,
			autoplay:false,
			autoplayTimeout:5000,
			items: 1,
			autoHeight: true,
			responsiveClass:true,
			responsive:{
				768 :{
					nav: true
				}
			}
		};
		catalogue.owlCarousel(optionMain);
		catalogue.on('changed.owl.carousel', function(event) {
			var offsetTop = catalogueContent.offset().top - 25;
			window.scrollTo(0, offsetTop);
			$('.search-btn-container').addClass('up');
		})
	};

	var catalogueCarousel02 = function () {
		var catalogue = $('#catalogue');

		var optionMain = {
			loop: false,
			pagination: false,
			autoplay:false,
			autoplayTimeout:5000,
			autoHeight:true,
			items: 1,
			responsiveClass:true,
			touchDrag:true,
			nav : true
		};
		catalogue.owlCarousel(optionMain);
		catalogue.on('changed.owl.carousel', function(event) {
			var catalogueDots = catalogue.find('.owl-dots');
			var firstDot = catalogueDots.find('.owl-dot:first-child');
			if (event.page.index + 1 === event.page.count) {
				firstDot.show();
			} else {
				firstDot.hide()
			}
			var offsetTop = catalogue.offset().top - 80;
			window.scrollTo(0, offsetTop)

		})
	};



	window.addEventListener( 'DOMContentLoaded', function () {
		floatingCtrl();
	} );

	return {
		callLayer : callLayer,
		catalogueCarousel01 : catalogueCarousel01,
		catalogueCarousel02 : catalogueCarousel02,
	}

	/* sopSearchTopCheck(); */
})();

// 2020-09-15 기본 알럿 팝업창 내 세로 스크롤 기능
function alertScroll(){
	var msgboxH = $('.jMsgbox-shortcut').height();	
	if(msgboxH > 230){		
		$('.jMsgbox-shortcut').addClass('scroll');
	}else{
		$('.jMsgbox-shortcut').removeClass('scroll');
	}	
};

// 검색결과 고정
function initSticky() {
	var _obj = {
		wrapper: '.sticky-tab, .sticky-wrap',
		header: '.main-header',
		scrollTop: {},
		headerHeight: 0,
		stickyElements: [],
		elem: '.sticky-element',
	}
	function initPosition(el, idx) {
		var $container = $(el);
		var $header = $(_obj.header);

		_obj.scrollTop[idx] = $container.offset().top - $container.outerHeight(true);
		_obj.headerHeight = $header.height();
		if (_obj.stickyElements.length >= idx + 1) {
			return;
		} else {
			_obj.stickyElements.push($container.height());
		}
	}

	$(window).on('resize', function() {
		initPosition();
	});

	$(_obj.wrapper).each(function(idx, el) {
		$(document).on('scroll', function(e) {
			var position = $(window).scrollTop();
			var $wrapper = $(el);
			var $elem = $wrapper.find(_obj.elem);

			initPosition(el, idx);

			if (position >= _obj.scrollTop[idx]) {
				$elem.css({
					position: 'fixed',
					left: 0,
					top: idx >= 1 ? _obj.stickyElements[idx -1] + _obj.headerHeight : _obj.headerHeight,
					marginTop: 0,
					zIndex: 9000 + idx,
					background: '#fff'
				}).addClass('fixed');
				$wrapper.css({
					height: $elem.height(),
				})
			} else {
				$elem.removeAttr('style').removeClass('fixed');
				$wrapper.removeAttr('style');
			}
		});
	})
}

// 장바구니 스크롤 그라데이션
function triggerClass(elem, type, className) {
	if (type === 'add') {
		elem.addClass(className)
	} else {
		elem.removeClass(className)
	}
}

function scrollGradient() {
	$('.result-list .box_product.product_list-type, .sh_result-area .box_product.product_list-type').on('scroll', function(e) {
		var container = e.target;
		var containerHeight = container.scrollHeight;
		var ground = $(container);
		var position = $(container).scrollTop();

		var containerParent = ground.closest('.result-list').length ? ground.closest('.result-list') : ground.closest('.sh_result-area');

		containerHeight <= (position + ground.height() + 20) ?
		triggerClass(containerParent, 'remove', 'over-3')
			: triggerClass(containerParent, 'add', 'over-3');
	});
}

scrollGradient();

$(function() {
	//2021-02-15 주문/결제 페이지 아코디언 활성화시 class add
	function accodionIsOpen(){
		var newAccodionAnc = $('.new-payment.gift_order.renew .accodion_box_tit > a');
		if(newAccodionAnc.length) {
			newAccodionAnc.each(function(){
				if($(this).attr('aria-expanded') === "true") {
					$(this).closest('.accodion_box_tit').addClass('is-active')
					$(this).closest('.accodion_box').removeClass('accodion-close')
				}else{
					$(this).closest('.accodion_box_tit').removeClass('is-active') /* 20220627 A-pay확산 */
					$(this).closest('.accodion_box').removeClass('accodion-close')
				}
			})
			newAccodionAnc.on('click',function(e){
				setTimeout(function(){
					var target = $(e.currentTarget);
					if(target.attr('aria-expanded') === "true"){
						target.closest('.accodion_box_tit').addClass('is-active');
						target.closest('.accodion_box').removeClass('accodion-close')
					}else if(target.attr('aria-expanded') === "false"){
						target.closest('.accodion_box_tit').removeClass('is-active');/* 20220627 A-pay확산 */
						target.closest('.accodion_box').addClass('accodion-close')
					}
				}, 300);

			})
		}
	}

	accodionIsOpen();

	// 20220425 마이쇼핑 수취인 아코디언
	function accodionIsOpenMyShopping(){
		var newAccodionAnc = $('.order_receiver.accodion_box .accodion_box_tit > a');
		if(newAccodionAnc.length) {
			newAccodionAnc.each(function(){
				if($(this).attr('aria-expanded') === "true") {
					$(this).closest('.accodion_box_tit').addClass('is-active')
					$(this).closest('.accodion_box').removeClass('accodion-close')
				}else{
					$(this).closest('.accodion_box').removeClass('accodion-close')
					$(this).closest('.accodion_box_tit').addClass('is-active');
				}
			})
			newAccodionAnc.on('click',function(e){
				setTimeout(function(){
					var target = $(e.currentTarget);
					if(target.attr('aria-expanded') === "true"){
						target.closest('.accodion_box_tit').addClass('is-active');
						target.closest('.accodion_box').removeClass('accodion-close')
					}else if(target.attr('aria-expanded') === "false"){
						target.closest('.accodion_box_tit').addClass('is-active');
						target.closest('.accodion_box').addClass('accodion-close')
					}
				}, 300);

			})
		}
	}

	accodionIsOpenMyShopping();

	// 팝업내 툴팁(외국인)
	function getPosition(elem) {
		return elem.getBoundingClientRect();
	}

	// 팝업내 툴팁(외국인)
	$(document).on('click', '.layer-area .btn-tooltip', function(e) {
		e.stopPropagation();
		var $button = $(e.target);
		var $container = $button.closest('.layer-tooltip');
		var $wrapper = $container.parent();
		var $panel = $container.find('.layer-tooltip__panel');
		var $caret = $panel.find('.tooltip-caret');
		var buttonPosition = getPosition($button[0]);
		var wrapperPosition = getPosition($wrapper[0]);

		$panel.css({
			top: ($panel.outerHeight(true) + 9) * -1,
			width: $wrapper.outerWidth(),
		});
		$caret.css({
			left: buttonPosition.left - wrapperPosition.left
		});
		if ($container.hasClass('open')) {
			$container.removeClass('open');
		} else {
			$container.addClass('open');
		}
		$(document).on('click', function(evt) {
			$container.removeClass('open');
		});
	});

	// ($('.sticky-tab').length) && (initSticky());

	// 상품준비 중 툴팁
	$(document).on('click', '.delivery-detail .close-tooltip', function(e) {
		e.preventDefault();

		$(e.target).closest('.delivery-detail').hide();
	});
});

$(document).ready(function(){
	($('.sticky-tab, .sticky-wrap').length) && (initSticky());
});


var accordion = (function() {
	var options = {
		wrap: '',
		header: '.accordion__header',
		anchor: '.accordion__anchor',
		body: '.accordion__body',
	}

	return {
		close: function(wrap) {
			console.log(wrap)
			wrap.find(options.body).slideUp(300);
			wrap.removeClass('open')
		},
		open: function(wrap) {
			wrap.find(options.body).slideDown(300);
			wrap.addClass('open')
		},
		init: function(elem) {
			var root = this;

			options.wrap = elem;

			$(options.wrap).each(function(i, el) {
				var opt = options;
				if (!$(el).hasClass('open')) {
					root.close($(el));
				}
				$(el).on('click', options.anchor, function(e) {
					var flag = $(el).hasClass('open')
					var anchor = $(e.target);
					var wrap = anchor.closest(opt.wrap);

					if (flag) {
						root.close(wrap);
					} else {
						root.open(wrap);
					}
				});
			});
		},
	}
})();


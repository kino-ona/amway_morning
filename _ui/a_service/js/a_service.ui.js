// input 입력시 다음 input 으로 자동이동 하는 함수
$.fn.autofocus = function () {
	var $inputs = $(this)

	return this.each(function(idx){
		$(this).on('keyup',function(e){
			var val = $(this).val();
			if(parseInt($(this).attr('maxLength')) == val.length) {
				if(idx+1 < $inputs.length) {
					$inputs[idx+1].focus()
				}
			}
		})
	});
}


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
	var $el = $(this)
	var $prev;
	var settings = $.extend({
		'selector' : 'js-accordion',
		'itemSelector' : '.accordion_title',
		'itemClass': 'js-accordion-item',
		'navigation' : '.btn_accordion',
		'itemContents' : '.accordion_contents-b',
		'activeItemClass': 'active',
		'clickedShowOnly': false,
		'speed': 200
	}, options);
	return $el.each(function(){
		var $this = $(this);
		var $nav = $(this).find(settings.navigation);
		$this.addClass(settings.selector).find(settings.itemSelector).addClass(settings.itemClass);
		$nav.each(function(){
			$(this).off("click").on("click", function(e){
				e.preventDefault();
				if(settings.clickedShowOnly === true && $prev !== this){
					 $el.find('> .'+settings.itemClass).removeClass(settings.activeItemClass)
					 .parent().find('> '+settings.itemContents).slideUp(settings.speed);

					// $(this).parents('.'+settings.itemClass).siblings().removeClass(settings.activeItemClass).parent().siblings().find(settings.itemContents).slideUp(settings.speed);
				}
				$(this).parents('.'+settings.itemClass).toggleClass(settings.activeItemClass).parent().find(settings.itemContents).slideToggle(settings.speed);
				$prev = this
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
				var minustop = bottomlimit - sTop + settings.ctrlTop-$(window).height() - 55;
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

// 풋터 토글
function toggleFooterInfo() {
	var aklFooter = document.querySelectorAll('.a-service-footer').length;
	if (!aklFooter) {
		return false;
	}

	var btnFootInfo = $('.btn-foot_info'),
		footInfoContents = $('#footerInfo');

	btnFootInfo.on('click', function () {
		var _this = $( this );
		_this.toggleClass( 'active' );
		footInfoContents.toggleClass('open');
	})
}

/* 푸터 > 위로이동 */
function onScroll_TOP(){
	var $topBox = $('#ScrollTopArea');

	function appendObject(){
		if ( $topBox.length ){return;}

		$footer.append( scrollDIV );
		pageScrollTOP(); //새로고침 시, scrolltop !=0  버튼 노출
	}

	function pageScrollTOP(){
		var $scrollTop = $(window).scrollTop();
		var $scrollBox = $('.scrollTopWrapper');

		if($scrollTop > 0){
			$scrollBox.stop().fadeIn('fast');
		} else {
			$scrollBox.stop().fadeOut();
		}
	}

	//위로이동 버튼 append
	setTimeout(function(){ appendObject(); }, 600);

	//버튼 클릭 시
	$(document).on('click', '#ScrollTopArea > .toTop', function(){
		$('html,body').animate({ scrollTop:0 }, 400);
	});

	//스크롤 시
	window.onscroll = function(){ pageScrollTOP(); };
}

// 2020-11-26 모바일 함량계산 버튼 클릭 시 스크롤 페이지 하단 이동
function onScroll_Bottom(){
	var scrollHeight = $(document).height();
	$(document).on('click', '#go-bottom', function(){
		$('html,body').animate({ scrollTop:scrollHeight }, 800);
	});
}


/* 장바구니,주문결제 툴팁 */
function promotionTooltip(){
	if(!$('.tooltip-btn').length){return;}

	$('.tooltip-btn').each(function(){
		var _this = $(this);

		//다른 툴팁 찾기
		var parentsRow = _this.parents('.product-list-item');
		var $parentsSiblings = parentsRow.siblings('.product-list-item').find('.promotion-tip-alert');
		//this
		var $promotionTip = _this.parents('.promotion').find('.promotion-tip-alert');
		var $tip_closeBtn = $promotionTip.find('.tip-close');

		_this.on('click',function(){
			//열린 툴팁 닫기
			$parentsSiblings.hide();

			if($promotionTip.is(':hidden')){
				$promotionTip.show();
			} else if($promotionTip.is(':visible')){
				$promotionTip.hide();
			}
		});

		$tip_closeBtn.on('click',function(){
			$promotionTip.hide();
		});
	});
}

$(function () {
	// 툴팁 닫기
	$('.promotion').click(function(e){
		e.stopPropagation();
	});
	$('html').click(function() {
		$('.promotion-tip-alert').hide();
	});


	// Drop Box
	$('.box_select').not('.disable,.linked').uxeSelectBox({
		'isSubmit' : true,
		'isSubmitValueAttribute' :'data-value'
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
		'clickedShowOnly': true,
		'navigation' : '.btn_accordion',
		'itemContents' : '.accordion_contents',
	});

	// 풋터
	toggleFooterInfo();

	//푸터 > 위로이동
	onScroll_TOP();
});

var AMWAY = (function () {
	var callLayer = function () {
		var btnLayer = document.querySelectorAll('[data-layer]');
		for (var i = 0; i < btnLayer.length; i++) {
			btnLayer[i].addEventListener( 'click', function (e) {
				var targetId = this.dataset.layer;
				var targetLayer = document.querySelector('#' + targetId );
				targetLayer.classList.add( 'showing' );
				console.log( $(targetLayer) );

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
	};

	return {
		callLayer : callLayer,
	}
})();

$(function(){
	//주문 배송메시지
	deliveryMSG();

	/* 주문 배송메시지 */
	function deliveryMSG(){
		var $deliveryMSG_box = $('.delivery-msg, .delivery-msg02');
		if(!$deliveryMSG_box.length){return;}

		$deliveryMSG_box.each(function(){
			var $inputBox = $(this).find('input[type=text].m-message');
			var $msgList = $(this).find('.delivery-msg-list');
			var $msgText = $msgList.find('button')

			$inputBox.on('click',function(){
				$msgList.show();
				$msgText.on('click',function(){
					var targetText = $(this).text();
					$inputBox.val(targetText);
					$msgList.hide();
				});
			});

			$('body').click(function(e) {
				if( $msgList.is(':visible')){
					if(! $deliveryMSG_box.has(e.target).length) {
						$msgList.hide();
					}

					var $etcEl = $deliveryMSG_box.find('.byte-txt, .message-shop');
					if ( $etcEl.has(e.target).length){
						$msgList.hide();
					}
				}
			});
		});
	}
});


// SOP Sticky
var sopStickyMenu = function () {
	var stickyMenu = $('.category_btn')
	if (!stickyMenu.length) return;
	var onlyClick = false,
		//stickyOffsetTop = stickyMenu.offset().top,
		stickyOffsetTop =  $('.options').offset().top,
		headerHeight = $( '.page_title' ).height();

	$(window).on('scroll load resize', function () {
		//console.log(onlyClick);
		if ( onlyClick === true ) { return }
		var winScrollTop = $( this ).scrollTop(),
			headerHeight = $( '.page_title' ).height();
		if (winScrollTop >= stickyOffsetTop - headerHeight) {
			//console.log(winScrollTop + ',' + stickyOffsetTop + ',' +  headerHeight )
			stickyMenu.addClass( 'fixed' );
		} else {
			stickyMenu.removeClass( 'fixed' );
		}

		var h = headerHeight + $('.page_title').height();
		$('.category_btn button').each(function () {
			var currLink = $(this);
			var refElement = $('#'+currLink.attr("data-link"));
			if ( refElement.offset().top - h <= winScrollTop  && refElement.offset().top + refElement.height() - headerHeight > winScrollTop ) {
				currLink.addClass("active");
				currLink.siblings().removeClass("active");
				currLink.parents('.category_btn').addClass( 'fixed' );
			}
			else{
				currLink.removeClass("active");
			}
		});
	})

	//sopSearchTopCheck();

	/* $(window).on('resize scroll', function () {
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
	} ); */

	// 탭메뉴 sticky 영역 버튼 클릭시
	$('.data_link').click(function(){
		onlyClick = true;
		stickyMenu.addClass( 'fixed' );

		var seq = $(this).attr("data-link"),
			offset = $("#" + seq).offset(),
			h = $('.page_title').height() + $('.category_btn').height() - 1;

		$(this).addClass("active");
		$(this).siblings().removeClass("active");
		$('html, body').stop().animate({scrollTop : offset.top - h}, 300, function(){
			onlyClick = false;
		});
	})
};

// Main Sticky
var Stickybtn = function () {
	var stickyMenu = $('.box_mobile-floating')
	if (!stickyMenu.length) return;
	var onlyClick = false,
		//stickyOffsetTop = stickyMenu.offset().top,
		stickyOffsetTop =  $('#main_content').offset().top,
		headerHeight = $( '.mypack_vis_wrap' ).height();

	$(window).on('scroll load resize', function () {
		//console.log(onlyClick);
		if ( onlyClick === true ) { return }
		var winScrollTop = $( this ).scrollTop(),
			headerHeight = $( '.mypack_vis_wrap' ).height();
		if (winScrollTop >= stickyOffsetTop - headerHeight) {
			//console.log(winScrollTop + ',' + stickyOffsetTop + ',' +  headerHeight )
			stickyMenu.addClass( 'fixed' );
		} else {
			stickyMenu.removeClass( 'fixed' );
		}
	})
};

function toolTips_open(){
	var _winWidth= $(window).width();
	var _btnToolTip = $('.toolTip-wrapper').find('.btn-tooltip');
	var _btnTooltipClose = $('.toolTip-wrapper').find('.btn-tooltip-close');

	_btnToolTip.each(function(){
		$(this).off('click').on('click',function(e){
			e.preventDefault();

			//컨텐츠 노출
			var _tipContent = $(this).parent().find('.tooltip-content');
			if( _tipContent.is(':hidden')){
				$(this).parent().addClass('open'); //화살표
				_tipContent.show();
			}
			else if( _tipContent.is(':visible')){
				$(this).parent().removeClass('open'); //화살표
				_tipContent.hide();
			}
		});
	});

	//닫기 버튼
	_btnTooltipClose.off('click').on('click',function(e){
		e.preventDefault();

		var tooltipWrapper = $(this).parents('.toolTip-wrapper');
		var tooltipContent = tooltipWrapper.find('.tooltip-content');
		tooltipWrapper.removeClass('open'); //화살표
		tooltipContent.hide();
	});

	//body 클릭 시 툴팁닫기
	$('.toolTip-wrapper').click(function(e){
		e.stopPropagation();
	});
	$('html').click(function() {
		$('.toolTip-wrapper').removeClass('open');
		$('.tooltip-content').hide();
	});
};

toolTips_open();
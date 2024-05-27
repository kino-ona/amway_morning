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
			var limit = $limitObj.offset().top - settings.ctrlTop;
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

$(function () {
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
		'clickedShowOnly': true
	});

	// 플로팅타입 - top버튼 위치 조정
	var $plpV2 = $('.renewal-fonts');
	if ( $plpV2.is('.renewal_floating-type')) {
		$('.renewal_floating-type').parent().addClass('renewal_floating-type');
	}
	if ($plpV2.is('.renewal_floating-type2')) {
		$('.renewal_floating-type2').parent().addClass('renewal_floating-type2');
	}

});
var AMWAY = (function () {
	var callLayer = function () {
		var btnLayer = document.querySelectorAll('[data-layer]');
		for (var i = 0; i < btnLayer.length; i++) {
			btnLayer[i].addEventListener( 'click', function (e) {
				var targetId = this.dataset.layer;
				var targetLayer = document.querySelector('#' + targetId );
				targetLayer.classList.add( 'showing' );
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

	window.addEventListener( 'DOMContentLoaded', function () {
		floatingCtrl();
	} );

	return {
		callLayer : callLayer,
	}
})();



/* akl 사용안함 : 2018.03.20
function orderSummary() {
	var win = $(window);
	win.scroll(function(){
		var confirmH = $('.cartTitile').height() + $('.checkout-steps').height() + 62;
		var winH = $('.shipping-delivery').height() + 120;
		var winW = $(window).width();
		var conW = ($('.container').width() / 2) + 12;
		//alert($('.cartTitile').height());
		var order = $(".shipping-delivery-summary");
		var orderH = $(".shipping-delivery-summary").height();
		var orderHtop = winH - 590;
		var posTop = orderHtop - 40;
		var shop = $(".shopping-cart-total-wrapper");
		var sc=$(document);
		if (winW > 768) {
			if( sc.scrollTop() > confirmH && sc.scrollTop() < orderHtop ){
				order.addClass('fix');
				order.css({"position":"fixed", "top": "70px", "right": "50%", "margin-right":"-" + conW + "px" });
			} else if( sc.scrollTop() >= orderHtop) {
				order.removeClass('fix');
				order.css({"position":"absolute", "top":posTop + "px", "right": 0, "margin-right": "auto"});
			} else {
				order.removeClass('fix');
				order.css({"position":"relative", "top": "auto", "right": "auto", "margin-right": "auto"});
			}
		} else {

		}

	});
}

function registerABO() {
	var win=$(window);
	win.scroll(function(){
		var winW = $(window).width();
		var winH = $('.float-reg-side-info').height() + 186;
		var sc=$(document);
		var confirmH=$('.breadcrumb-section').height()+$('product-list-page-title').height()+$('.abo-checkout-steps').height() + 200;
		var maxHeight= confirmH + $('.new-ibo-reg').height() -500;
		var order=$('.float-reg-side-info');
		if (winW > 768) {
			if( sc.scrollTop() > confirmH && sc.scrollTop() < maxHeight){
				order.addClass('fixed');
				order.css({"position":"fixed", "top": "136px", "right": "auto", "margin-right": "auto"});
			}else if(sc.scrollTop() < confirmH){
				order.css({"position":"relative", "top": "auto", "right": "auto", "margin-right": "auto"});
			}else{
				order.removeClass('fixed');
				order.css({"position":"relative", "top": "auto", "right": "auto", "margin-right": "auto"});
			}
		}
	})
}
*/

$(function(){
	$("#topbanner").load("/_ui/responsive/html/new_topbanner.html");
	$("#header").load("/_ui/responsive/html/header.html");
	$("#footer").load("/_ui/responsive/html/new_footer.html");
	$("#quick").load("/_ui/responsive/html/quicklink.html");

	

	// $("#header_finger01").load("/_ui/responsive/html/header_finger01.html");
	// $("#header_finger02").load("/_ui/responsive/html/header_finger02.html");
	// $("#header_none").load("/_ui/responsive/html/header_none.html");
	// $("#header_login").load("/_ui/responsive/html/header_login.html");
	//2019-08-19 메인 : 개편 분기 처리
	
	// if($('.new-v2').length){
	// 	if($('.logout-v2').length){//로그아웃 화면 확인용
	// 		$("#header").load("/_ui/responsive/html/new_header_logout.html");
	// 	}else{
	// 		$("#header").load("/_ui/responsive/html/header.html");
	// 	}
	// }else{
	// 	$("#header").load("/_ui/responsive/html/header.html");
	// }
	// if($('.new-v2').length){
	// 	$("#footer").load("/_ui/responsive/html/new_footer.html");
	// }else{
	// 	$("#footer").load("/_ui/responsive/html/footer.html");
	// }
	// if($('.new-v2').length){
	// 	if($('.logout-v2').length){//로그아웃 화면 확인용
	// 		$("#quick").load("/_ui/responsive/html/new_quicklink_logout.html");
	// 	}else{
	// 		$("#quick").load("/_ui/responsive/html/new_quicklink.html");
	// 	}
	// }else{
	// 	$("#quick").load("/_ui/responsive/html/quicklink.html");
	// }
	// if($('.new-v2').length){
	// 	$("#topbanner").load("/_ui/responsive/html/new_topbanner.html");
	// }else{
	// 	$("#topbanner").load("/_ui/responsive/html/topbanner.html");
	// }

	//제품상세 - 위시리스트 레이어
	$(".js-add-list-shopping-button,.addToLIST").click(function(e){
		var tag = $(this).siblings('.dropdown-menu');
		var flag=true;
		if(!$(this).parent(".plp-add-to-shopping-list ").hasClass("open")){
			e.stopPropagation();
			$(".plp-add-to-shopping-list ").removeClass("open");
			$(this).parent(".plp-add-to-shopping-list ").addClass("open");
			$(tag).show();
			$(".plp-add-to-ditto").removeClass("open");
		}else{
			$(this).parent(".plp-add-to-shopping-list ").removeClass("open");
			$(tag).hide();
		}
		$(document).bind("click",function(e){
			var target = $(e.target);
			if(target.closest(tag).length == 0 && flag == true){
				$(tag).parent(".plp-add-to-shopping-list ").removeClass("open");
				$(tag).hide();
				flag = false;
			}
		});
	});

	//제품상세 - 정기주문에 추가 레이어
	$(".product-list__item-link-ditto").click(function(e){
		var tag = $(this).siblings('.dropdown-menu');
		var flag=true;
		if(!$(this).parent(".plp-add-to-ditto ").hasClass("open")){
			e.stopPropagation();
			$(".plp-add-to-ditto").removeClass("open");
			$(this).parent(".plp-add-to-ditto").addClass("open");
			$(tag).show();
			$(".plp-add-to-shopping-list ").removeClass("open");
		}else{
			$(this).parent(".plp-add-to-ditto").removeClass("open");
			$(tag).hide();
		}
		$(document).bind("click",function(e){
			var target = $(e.target);
			if(target.closest(tag).length == 0 && flag == true){
				$(tag).parent(".plp-add-to-ditto ").removeClass("open");
				$(tag).hide();
				flag = false;
			}
		});
	});


	/** ---------------------------------
	 *  배송지 정보
	 *  ---------------------------------
	 */
	// DOM 생성 완료 시 화면 숨김 (파라미터로 전달되는 id는 제외)
	hideExclude("changeM");

	var sopAddress = $('.sop-delivery-adress').find('#changeTextArea');
	if(sopAddress.length){
		hideExclude();
	}

	// radio change 이벤트
	$("input[name=abnAdress]").change(function() {
		var radioValue = $(this).val();
		if (radioValue == "M") {
			hideExclude("changeM");
		} else if (radioValue == "I") {
			hideExclude("changeI");
		} else if (radioValue == "H") {
			hideExclude("changeH");
		}
	});

	//주문/배송 : 체크 되어 있는지 확인
	var checkCnt = $("input[name=abnAdress]:checked");
	if (checkCnt.length === 0) {
		// default radio 체크 (첫 번째)
		$("input[name=abnAdress]").eq(0).prop("checked", true).attr('checked', 'checked');
	}

	//SOP 배송지선택
	if(sopAddress.length && checkCnt.length === 0){
		$("input[name=abnAdress]").eq(0).prop("checked", false).attr('checked',false);
	}

	// text area 숨김
	function hideExclude(excludeId) {
		$("#changeTextArea").children().each(function() {
			$(this).hide();
		});
		// 파라미터로 넘겨 받은 id 요소는 show
		$("#" + excludeId).show();
	}

	//SOP 프로필 수정하기 : akl_common.js 에서 이동 (개발삭제 요청)
	SOP_editProfile();
	function SOP_editProfile(){
		$('#edit-profile').on('click',function(e){
			e.preventDefault();
			var $orderInfo = $(this).parent('.sop-order-info');
			var $editBox = $(this).parents().find('.edit-block');
			var $editBoxClose = $editBox.find('.close-edit');

			if($editBox.is(':hidden')){
				$editBox.slideDown('fast');
			} else if ($editBox.is(':visible')){
				$editBox.hide();
			}
			$editBoxClose.on('click',function(){
				$editBox.hide();
			});
		});
	}

	//온라인 매거진 SNS : 2018.09.05( akl_common.js 에서 이동/개발이관)
	magazinSNS();
	function magazinSNS(){
		$('.mz-item .btn-ico.sns').click(function() {
			$(this).parents('.bod-view-sns ').find('.url_pop').hide();
			if(!$(this).next('.bod-view-sns').hasClass('on')){
				$('.bod-view-sns').removeClass('on');
				$(this).next('.bod-view-sns').addClass('on')
			}else{
				$(this).next('.bod-view-sns').removeClass('on');
			}
		});
		$('html').click(function(e) {
			if(!$(e.target).is('.bod-view-sns, .bod-view-sns *, .btn-ico.sns')){
				$('.bod-view-sns').removeClass('on');
				$(this).parents('.bod-view-sns ').find('.url_pop').hide();
			}
		});
	}


	/** ---------------------------------
	 *  주문/결제 공통사용
	 *  ---------------------------------
	 */
	//akl 주소찾기 팝업
	$('#U61000_lp1').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.U61000_lp1_pop');
	});

	//akl 배송지 목록(단일) 팝업
	$('.G10600_lp3').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.G10600_lp3_pop');
	});

	//akl 배송지 목록(복수) 팝업
	$('.G10600_lp4').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.G10600_lp4_pop');
	});

	//akl AP안내 팝업
	$('.G10600_lp8').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.G10600_lp8_pop');
	});

	//akl AP안내 Tab
	$('ul.ap-tabs').each(function(){
		var $active, $content, $links = $(this).find('a');
		$active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
		$active.addClass('active');

		$content = $($active[0].hash);
		$links.not($active).each(function () {
			$(this.hash).hide();
		});

		$(this).on('click', 'a', function(e){
			$active.removeClass('active');
			$content.hide();
			$active = $(this);
			$content = $(this.hash);
			$active.addClass('active');
			$content.show();
			e.preventDefault();
		});
	});

	//akl 쿠폰선택 팝업
	$('#G10600_lp7').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.G10600_lp7_pop');
	});

	//akl 사업자등록증 관리 팝업
	// $('.G10600_lp5').click(function(event) {
	// 	event.preventDefault();
	// 	layerPopOver(this,'.G10600_lp5_pop');
	// });

	//akl 사업자등록증 상세보기
	$('.G10600_lp6').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.G10600_lp6_pop');
	});

	//akl 카드사 혜택보기
	$('.G10600_lp2').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.G10600_lp2_pop');
	});

	//akl 주문불가 제품 알림
	$('.G10600_lp1').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.G10600_lp1_pop');
	});

	//$(".select2-hidden-accessible").select2();
	$("input[type=text].form_datetime").datepicker({format: 'yyyy-mm-dd',autoclose: true});

	//프로모션 관련 2018.05.16 추가
	$('.remove-item-btn').click(function(){
		$(".delete-list-box,.overlay").show();
	});

	$('.view-cart').click(function(){
		$(".delete-list-box,.overlay").hide();
		$('.delete-example,.delete-example-gift').hide();
	});

	$('#G10000_lp9').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.G10000_lp9_pop');
	});

	$('#G10500_lp3').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.G10500_lp3_pop');
	});

	//2018.05.24 재고현황팝업 추가
	$('#G10300_lp2').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.G10300_lp2_pop');
	});

	/* ----- 배송방법 선택 (수정 2018.04.03) ----- */
	//배달주문
	$('#shippingDelivery-type01').on('click', function(){
		$(this).prop("checked", true).attr('checked', 'checked');
		$('#collapseOne').removeClass('collapse');
		$('#collapseTwo').addClass('collapse');
	});

	//픽업주문
	$('#shippingDelivery-type02').on('click', function(){
		$(this).prop("checked", true).attr('checked', 'checked');
		$('#collapseOne').addClass('collapse');
		$('#collapseTwo').removeClass('collapse');
	});
	//배송방법 선택
	var radioDelivery = $('#shippingdiv').find('.amwa-radio');
	$(radioDelivery).each(function(){
		$(this).click(function(){

			var $panel = $(this).parent('.panel');
			if( $(this).prop("checked", false) ){
				$(this).prop("checked", true).attr('checked', 'checked');
				$panel.find('.panel-collapse').removeClass('collapse');
				$panel.siblings().find('.panel-collapse').addClass('collapse');
			}
		})
	});

	var radioPay = $('#selectPay').find('.amwa-radio');
	$(radioPay).each(function(){
		$(this).click(function(){

			var $panel = $(this).parent('.panel');
			if( $(this).prop("checked", false) ){
				$(this).prop("checked", true).attr('checked', 'checked');
				$panel.find('.shipping-delivery-radio-body.panel-collapse').removeClass('collapse');
				$panel.siblings().find('.shipping-delivery-radio-body.panel-collapse').addClass('collapse');
			}
		})
	});

	/* ----- 결제방법 선택 ----- */
	//개인카드
	$('#individual').click(function(){
		if( $(this).prop("checked", false) ){
			$(this).prop("checked", true).attr('checked', 'checked');
			$('#bubincard').addClass('collapse');
			$('#gaeincard').removeClass('collapse');
		}
	});
	//법인카드
	$('#corporation').click(function(){
		if( $(this).prop("checked", false) ){
			$(this).prop("checked", true).attr('checked', 'checked');
			$('#gaeincard').addClass('collapse');
			$('#bubincard').removeClass('collapse');
		}
	});

	/* ----- 배송지 선택 단일/복수 (2018.04.03)  ----- */
	var $shippingAddress = $('.order-payment');
	var $toggleBTN = $shippingAddress.find('.tabs-toggles .tab-toggle');
	$toggleBTN.each(function(){
		$(this).on('click',function(e){
			e.preventDefault();

			//버튼활성화
			var _li = $(this).parent();
			_li.addClass('active').siblings().removeClass('active');

			//탭활성화
			var tabID = $(this).attr('href');
			var tabContent = $(this).parents().find('.tabs-content-blocks .content-block');
			tabContent.removeClass('active');

			$(this).parents('.order-payment').find('.tabs-content-blocks .content-block').removeClass('active');
			$(this).parents('.order-payment').find(tabID).addClass('active');
		});
	});

	/* ----- A Cliks Money sub tab (2020.09.11)  ----- */
	var $shippingAddress = $('.order-payment');
	var $toggleBTN = $shippingAddress.find('.tabs-toggles2 .tab-toggle');
	$toggleBTN.each(function(){
		$(this).on('click',function(e){
			e.preventDefault();

			//버튼활성화
			var _li = $(this).parent();
			_li.addClass('active').siblings().removeClass('active');

			//탭활성화
			var tabID = $(this).attr('href');
			var tabContent = $(this).parents().find('.tabs-content-blocks .content-block');
			tabContent.removeClass('active');

			$(this).parents('.order-payment').find('.tabs-content-blocks .content-block').removeClass('active');
			$(this).parents('.order-payment').find(tabID).addClass('active');
		});
	});


});



//중개판매관리 2018.03.30
$(function() {

	//$(".select2-hidden-accessible").select2();
	//$(".form_datetime").datepicker({format: 'yyyy-dd-mm',autoclose: true});

	$("#addToLIST").click(function(){
		$(".add-to-shopping-list-container").removeClass('open');
	});

	$(".cart-detail__dropdown-menu").on("click",function(e){
	e.stopPropagation();
	});

	$('.btn-add-wish').click(function(event) {
		event.preventDefault();
		layerPopOver('this','.wishListAdd');
	});

	$('#U70410_lp2').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.U70410_lp2_pop');
	});

	/* ID 중복사용으로 사용안함 : 2018.04.25
	$('#productSuggestListTabs').owlCarousel({
		loop: true,
		nav: true,
		dots: false,
		margin: 0,
		items: 1,
		responsiveClass: true,
		responsive: {
			480 : {
				items: 1
			},
			768 : {
				items: 2
			},
			960 : {
				items: 3
			},
			1200 : {
				items: 4
			}
		}
	});*/

	// 190110_리스트개선_빠른검색_수정(이미지형 - 스크립트 수정) - 해당 스크립트 옵션 변경 부탁 드립니다.
	$('[id^=productSuggestListTabs]').owlCarousel({
		loop: false,
		nav: true,
		dots: false,
		margin: 0,
		items: 2,
		responsiveClass: true,
		responsive: {
			480 : {
				items: 2
			},
			768 : {
				items: 3
			},
			960 : {
				items: 3
			},
			1200 : {
				items: 5
			}
		}
	});
	// 190110_리스트개선_빠른검색_수정(이미지형 - 스크립트 수정) - 해당 스크립트 옵션 변경 부탁 드립니다.

	// 2013.09.13 회원가입 완료 암웨이 대표 브랜드
	$(function() {
		$('#recentlyViewedListTabnew').owlCarousel({
			loop: false,
			nav: true,
			dots: false,
			margin: 0,
			items: 1,
			responsiveClass: true,
			responsive: {
				480 : {
					items: 2
				},
				630 : {
					items: 3
				},
				768 : {
					items: 4
				},
				960 : {
					items: 5
				},
				1200 : {
					items: 6
				}
			}
		});
	})

	$('#Cart_Search').click(function(e){
		e.preventDefault();
		$(".shoping-cart-search").show();

		$(".btnClosed").click(function(e) {
			e.preventDefault();
			$(this).parents('.panel-body').find('.shoping-cart-search').hide();
			//$(".shoping-cart-search").hide();
		});
	});


	$('#U70410_lp1').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.U70410_lp1_pop');
	});

	$('#U70410_lp2').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.U70410_lp2_pop');
	});

});


//중개판매관리 add to shopping list event
$(function() {

	$('#U70410_lp2').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.U70410_lp2_pop');
	});

	$('.btn-add-wish').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.wishListAdd');
	});

	$('#U70410_lp1').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.U70410_lp1_pop');
	});

});


//구매권한 양도/양수 2018.04.05
$(function(){

	$('.G10000_lp3').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.G10000_lp3_pop');
	});

	$('#U70611_lp1').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.U70611_lp1_pop');
	});

	$('#U70610_lp1').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.U70610_lp1_pop');
	});

	$('#U70610_lp2').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.U70610_lp2_pop');
	});

	$('.U70610_lp').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.U70610_lp_pop');
	});
	$('.U70610_2p').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.U70610_2p_pop');
	});

});

//공지사항 2018.04.17
$(function() {
	/* 사용안함 : 2018.07.03 (akl_common.js 로 이동)
	$(".js-order-history-filters").click(function(){
		$(".js-search-form-wrapper").addClass('hidden-sm hidden-xs');
		if($(".js-filter-form-wrapper").hasClass('hidden-sm hidden-xs')){
			$(".js-filter-form-wrapper").removeClass('hidden-sm hidden-xs');
		}else{
			$(".js-filter-form-wrapper").addClass('hidden-sm hidden-xs');
		}
	});

	$(".js-order-history-search").click(function(){
		$(".js-filter-form-wrapper").addClass('hidden-sm hidden-xs');
		if($(".js-search-form-wrapper").hasClass('hidden-sm hidden-xs')){
			$(".js-search-form-wrapper").removeClass('hidden-sm hidden-xs');
		}else{
			$(".js-search-form-wrapper").addClass('hidden-sm hidden-xs');
		}
	});*/

	//new-announcement-pop
	$('.ditto-schedule-table tbody tr').click(function(event) {
		event.preventDefault();
		$(".message-center-pop2,.overlay").show();
	});
	$(".message-center-pop2 #cboxClose").click(function() {
		$(".message-center-pop2,.overlay").hide();
	});


	//mob get ".tabs-toggles" max-width
	/*
	function tabwidth(){
		var maxWidth=$(window).width()+4;
		$(".tabs-toggles").css('max-width',maxWidth)
	}
	tabwidth();
	$(window).resize(function(){
		tabwidth()
	});*/

	$('.url-copy>a').on('click',function(){
		var urlPOP = $(this).next('.url_pop');
		var urlLyClose = $(this).parents('.url-copy').find('.cart-popup-close');

		if (urlPOP.is(':hidden')){
			$(this).next('.url_pop').show();
		} else if (urlPOP.is(':visible')){
			$(this).next('.url_pop').hide();
		}

		urlLyClose.on('click',function(){
			urlPOP.hide();
		});

		$('.url-copy').on('click', function(e){
			e.stopPropagation();
		});

		$('html').on('click',function(){
			urlPOP.hide();
		});
	});
});

//나의 주문내역
$(function(){
	//mob filter
	$(".filter-facet-button").click(function(e){
		e.preventDefault();
		if(!$(".pagination-wrapper .product__facet").hasClass("active")){
			$(".order-conts .filter-facet-button").addClass("active");
			$(".order-conts .pagination-wrapper .product__facet").addClass("active");
		}else{
			$(".order-conts .pagination-wrapper .product__facet").removeClass("active");
			$(".order-conts .filter-facet-button").removeClass("active");
		}
	});

	$(".js-order-history-search2").click(function(){
		$(".js-filter-form-wrapper").addClass('hidden-sm hidden-xs');
		if($(".js-search-form-wrapper").hasClass('hidden-sm hidden-xs')){
			$(".js-search-form-wrapper").removeClass('hidden-sm hidden-xs');
		}else{
			$(".js-search-form-wrapper").addClass('hidden-sm hidden-xs');
		}
	});

});

//비즈니스
$(function() {

	$('#G20203b_lp1').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.G20203b_lp1_pop');
	});

	$('#G20203b_lp2').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.G20203b_lp2_pop');
	});

	$('#G20205_lp1').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.G20205_lp1_pop');
	});

	$('#G20205_lp2').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.G20205_lp2_pop');
	});

	$('#G20206_lp').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.G20206_lp_pop');
	});

	$('#G20207_lp').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.G20207_lp_pop');
	});

	$('#G20208_lp').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.G20208_lp_pop');
	});
	$('#G20314_lp').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.G20314_lp_pop');
	});
	$('#G20421_lp1').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.G20421_lp1_pop');
	});
	$('#G20421_lp2').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.G20421_lp2_pop');
	});
	$('#G20422_lp1').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.G20422_lp1_pop');
	});
	$('#G20401_lp').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.G20401_lp_pop');
	});
	$('#G20325_lp').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.G20325_lp_pop');
	});
	$('#G20200_lp2').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.G20200_lp2_pop');
	});
	$('#G20200_lp3').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.G20200_lp3_pop');
	});
	$('#G20720_016_lp').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.G20720_016_lp_pop');
	});

});

//Personal Q
$(function() {
	$('.G20203b_lp1').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.G20203b_lp1_pop');
	});
});

//고객센터
$(function() {
	$('#F50000_lp').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.F50000_lp_pop');
	});
});

//서비스 센터
$(function() {
	$('#F30200_lp').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.F30200_lp_pop');
	});
});

//간편가입
$(function() {
	$('#UrlLink_Recruitment').click(function(event) {
		event.preventDefault();
		layerPopOver('','.U60100_lp1_pop');
	});
});

/* 비즈니스 ABO탈퇴 : 2018.12.03 해당 페이지에서 onclick 으로 변경
$(function() {
	$('#G20710_004_lp').click(function(event) {
		event.preventDefault();
		layerPopOver('','.G20710_004_lp_pop');
	});
});
*/

//반품내역
$(function() {
	$('.U70201_lp1').click(function(event) {
		event.preventDefault();
		layerPopOver('','.U70201_lp1_pop');
	});
});

//컴플라이언스 센터
$(document).on('click','#F80200_lp' , function() {
	event.preventDefault();
	layerPopOver('','.F80200_lp_pop');
});

//SOP
$(function(){
	//레이어 띄우기
	$('#addNewPayment').on('click',function(){
		layerPopOver(this,'#pop-payment');
	});

	$('#addNewAddress').on('click',function(){
		layerPopOver(this,'#pop-address');
	});

	$('.del-profile').on('click',function(){
		layerPopOver(this,'#del-profile');
	});

	$('#btnEditSave').on('click',function(){
		layerPopOver(this,'#save-change');
	});

	$('#btnEditCancel').on('click',function(){
		layerPopOver(this,'#cancel-change');

	});

	$('.btn-sop-prdt-cancel').click(function(){
		layerPopOver(this,'#sop-prdt-cancel');
	});

	//레이어
	$('.G10300_lp1_btn').click(function(event) {
		event.preventDefault();
		layerPopOver('this','.G10300_lp1_pop');
	});
})

/* akl_common.js 이동 - 2018.07.04
//온라인 매거진
$(function() {
	$('.mz-item .btn-ico.sns').click(function() {
		$(this).parents('.bod-view-sns ').find('.url_pop').hide();
		if(!$(this).next('.bod-view-sns').hasClass('on')){
			$('.bod-view-sns').removeClass('on');
			$(this).next('.bod-view-sns').addClass('on')
		}else{
			$(this).next('.bod-view-sns').removeClass('on');
		}
	});
	$('html').click(function(e) {
		if(!$(e.target).is('.bod-view-sns, .bod-view-sns *, .btn-ico.sns')){
			$('.bod-view-sns').removeClass('on');
			$('.url_pop').hide();
			$(this).parents('.bod-view-sns ').find('.url_pop').hide();
		}
	});
});*/


/* akl_common.js 이동 - 2018.07.04
//뉴핀 성취자
$(function() {
	$('.newpin a').click(function() {
		if (this.hash !== "") {
		event.preventDefault();

		var hash = this.hash;
		var headHei = $('.general-header').height();
		var trgt = $(hash).offset().top;

		$('html').animate({scrollTop: trgt - headHei}, 400);
		}
	});
});
*/
//회원탈퇴
$(function() {
	$('.G10600_lp8').click(function(event) {
		event.preventDefault();
		layerPopOver('','.G10600_lp8_pop');
	});
});

//사업자등록 여부 확인
$(function() {
	$('.checkibo').click(function(event){
		event.preventDefault();
		layerPopOver(this,'.checkibo_pop');
	});
});

//ABO TAX
$(function() {
	$('.G20601_lp1').click(function(event){
		event.preventDefault();
		layerPopOver(this,'.G20601_lp1_pop');
	});
	$('.G20601_lp2').click(function(event){
		event.preventDefault();
		layerPopOver(this,'.G20601_lp2_pop');
	});
});

//간편선물
$(function() {
	$('.U70101_lp17').click(function(event){
		event.preventDefault();
		layerPopOver(this,'.U70101_lp17_pop');
	});
	$('.U70101_lp18').click(function(event){
		event.preventDefault();
		layerPopOver(this,'.U70101_lp18_pop');
	});
});




/* ----- 코어 제공 js ----- */
$(function(){
	'use strict';

	$(window).resize(handleToggling);
	function handleToggling() {
		if (window.innerWidth < 768) {

			$('.quick-links-js-header').addClass('collapsed');
			$('.quick-links-js-header').attr('data-toggle', 'collapse');
			$("ul[id^='quick-links-collapse']").removeClass('in');
			$("ul[id^='quick-links-collapse']").addClass('padding-left-20');
		} else {

			$('.quick-links-js-header').removeAttr('data-toggle');
			$("ul[id^='quick-links-collapse']").addClass('in');
			$("ul[id^='quick-links-collapse']").removeClass('padding-left-20');
		}
	}

	handleToggling();

	$(".cartlist .cartlist-header").click(function(){
		if($("#cartlistContent").is(':hidden')) {
			$("#cartlistContent").slideDown(300);
		} else {
			$("#cartlistContent").slideUp(300);
		}

	});

	$(".cartlist-view").click(function(){
		$(this).hasClass("view-open") ? $(this).removeClass("view-open") : $(this).addClass("view-open");
	})
});

(function () {
	var SPEED = 'slow';
	function showSearchResults() {
		var $this = $(this);
		var $searchResult = $('.contacts-auto-suggestion');
		if ($this.val().length >= 3) {
			$searchResult.show();
		} else {
			$searchResult.hide();
		}
	}

	function closeSearchResults() {
		var $searchResult = $('.contacts-auto-suggestion').hide();
	}

	function contactsEvents() {
		$('#contacts-search').on('keyup', showSearchResults);
		$('#contacts-search').on('blur', closeSearchResults);
	}

	function init() {
		contactsEvents();
	}
	init();
})();

$(function(){
	//my account jump to event
	$(".js-jump-to-selection-btn").click(function(e){
		e.preventDefault();
		var value =$(".js-jump-to-selection").val();
		if (value == '/my-account') {
			window.location.href = "my-account.html";
		} else if (value == '/my-account/business-information') {
			window.location.href = "business-information.html";
		} else if (value == '/my-account/bonus-payment') {
			window.location.href = "Bonus-Payment-Preference.html";
		} else if(value == '/my-account/orders'){
			window.location.href = "Order-History-Personal-Orders-expanded.html";
		}else if(value == '/my-account/billing-shipping'){
			window.location.href = "billing-shipping-add-new-payment-method.html";
		}else if(value == '/my-account/bonus-payment'){
			window.location.href = "Bonus-Payment-Preference.html";
		} else if(value == '/my-account/auto-renewal'){
			window.location.href = "auto-renewal.html";
		}else if(value == '/my-account/update-profile'){
			window.location.href = "Edit-Profile.html";
		}else if(value == '/my-account/contract-renewal'){
			window.location.href = "contract-renewal.html";
		}else if(value == '/my-account/contracts'){
			window.location.href = "contracts.html";
		} else if(value == '/my-account/terms-and-conditions-management'){
			window.location.href = "terms-and-conditions-management.html";
		}else if(value == '/my-account/coupon-management'){
			window.location.href = "coupon-management.html";
		} else if(value == '/my-account/point-management'){
			window.location.href = "point-management.html";
		} else if(value == '/my-account/billing-shipping/credit-card-management'){
			window.location.href = "credit-and-debit-card-management-non-payment-gateway.html";
		}else if(value == '/my-account/billing-shipping/bank-account'){
			window.location.href = "bank-account-management.html";
		}else if(value == '/my-account/profile-management'){
			window.location.href = "profile-management.html";
		}
	});


	//business center jump to event
	$(".prw-jump-to-button").click(function(e){
		e.preventDefault();
		var value =$(".form-control.no-uppercase-form-control").val();
		if (value == '/my-business-center') {
			window.location.href = "dashboard.html";
		}else if(value == '/my-business-center/action-reports-overview'){
			window.location.href = "action-reports-overview.html";
		}else if(value == '/my-business-center/LOS-TreeView'){
			window.location.href = "los-treeview.html";
		}else if(value == '/my-business-center/customer-sales-history'){
			window.location.href = "customer-sales-history.html";
		}else if(value == '/my-business-center/key-indicators'){
			window.location.href = "kpi-tracking.html";
		}else if(value == '/my-business-center/pv-inquiry'){
			window.location.href = "pv-inquiry.html";
		}else if(value == '/my-business-center/PV/BV-Transfer'){
			window.location.href = "pvbv-transfer.html";
		}else if(value == '/my-business-center/create-receipt'){
			window.location.href = "create-a-receipt-1.html";
		}else if(value == '/my-business-center/my-business-income'){
			window.location.href = "my-business-income.html";
		}else if(value == '/my-business-center/message-center'){
			window.location.href = "message-center.html";
		}
	});
	$(".upTips").click(function(e){
		e.preventDefault();
		var flag = $(this).prev(".toolTips").is(":hidden");
		if(flag) {
			$(".toolTips").fadeOut();
			$(this).prev(".toolTips").fadeIn();
		} else {
			$(this).prev(".toolTips").fadeOut();
		}
	});
});

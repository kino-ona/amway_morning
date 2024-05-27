$(function(){
	//브랜드 각 메인 여백조정
	var brandHOME = $('.aklbBrandHome');
	if( brandHOME.length){
		$('body').find('#contents.brand').addClass('pad0');
	}

	//브랜드 상단 SNS - 모바일에서 위치조정
	brandTopSNS();
	$(window).resize(function(){
		brandTopSNS();
	});

	//연혁
	timelineFunc();

	//미디어갤러리
	mediaGalleryGETscript();
	setTimeout(function(){
		mediaGallery();
	},600);


	//아티스트리 홈 : B20200
	bannerList_artistry();

	//뉴트리라이트 홈 : B20101
	bannerList_nutrilite();

	//엣모스피어 드라이브 홈 : B20601
	bannerList_atmosphere();

	//배스바디 홈 : B20901
	bannerList_bathbody();

	//암웨이 퀸 홈 : B20501
	bannerList_queen();

	//원포원 : B20801
	bannerList_oneforone();

	//연혁
	$('#history-list').owlCarousel({
		loop: true,
		nav: true,
		dots: false,
		margin: 0,
		items: 1,
		responsiveClass: true,
		responsive: {
			480 : {
				items: 2
			},
			768 : {
				items: 4
			},
			960 : {
				items: 5
			},
			1200 : {
				items: 7
			}
		}
	});

	//암웨이소개(암웨이 대표 브랜드) : B10000
	$('#recentlyViewedListTab').owlCarousel({
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

	//팀뉴트리라이트 : B20129, B20132, B20133, B20136, B20137, B20139, B20141
	$('#layBoxPdtItem03').owlCarousel({
		loop: false,
		nav: true,
		dots: false,
		margin: 0,
		items: 1,
		responsiveClass: true,
		responsive: {
			768 : {
				items: 2
			},
			1200 : {
				items: 3
			}
		}
	});

	//팀뉴트리라이트 : B20126, B20127, B20128, B20130, B20135, B20140, B20143, B20144
	$('#layBoxPdtItem04').owlCarousel({
		loop: false,
		nav: true,
		dots: false,
		margin: 0,
		items: 1,
		responsiveClass: true,
		responsive: {
			768 : {
				items: 2
			},
			1200 : {
				items: 4
			}
		}
	});

	//팀뉴트리라이트 : B20125, B20131, B20134, B20138, B20142, B20145
	$('#layBoxPdtItem05').owlCarousel({
		loop: false,
		nav: true,
		dots: false,
		margin: 0,
		items: 1,
		responsiveClass: true,
		responsive: {
			768 : {
				items: 2
			},
			1200 : {
				items: 5
			}
		}
	});

	//아티스트리 캠페인 : B20206
	$('#bizMovie').owlCarousel({
		loop: false,
		nav: true,
		dots: false,
		margin: 0,
		items: 1,
		responsiveClass: true,
		responsive: {
			480 : {
				items: 1
			},
			960 : {
				items: 3
			},
			1200 : {
				items: 4
			}
		}
	});

	//NQ검사하기 : B20172
	$('.nq-pop-wrap input[type=radio]').on('click',function(){
		if ($('.nq-group-box').is(':hidden') && $(this).hasClass('ra-veiw-btn'))
		{
			$('.nq-group-box').show();
		}else{
			$('.nq-group-box').hide();
		}
	});

	//암웨이 본사 및 계열사 : B10207
	var $mapItem = $('[class*="global-comp-"] .btn-tooltip');
	$mapItem.click(function(){
		$(this).parent().siblings('.toolTip-wrapper').find('.btn-tooltip-close').trigger('click');
	});

	//암웨이 본사 및 계열사 : B10601
	$('#bizMovie02').owlCarousel({
		loop: false,
		nav: true,
		dots: false,
		margin: 0,
		items: 1,
		responsiveClass: true,
		responsive: {
			480 : {
				items: 1
			},
			768: {
				items: 3
			},
			1200 : {
				items: 4
			}
		}
	});

	//XS 에너지 제품소개 : B20309
	$('#xs-visual').owlCarousel({
		loop: false,
		nav: true,
		dots: true,
		margin: 0,
		items: 1
	});

	/* XS 에너지 제품소개 : B20306 */
	static_multiCarousel();

});

/* 브랜드 상단 SNS - 모바일에서 위치조정 */
function brandTopSNS(){
	var $brandHeading = $('.top-title-wrapper');
	if(!$brandHeading.length){return;}

	var windowWidth = $(window).width();
	var $brandSns = $('.brand .bod-view-sns , .sns-container .bod-view-sns');
	var $brandBoardSNS = $('.brand-board .bod-view-body').find('.bod-view-sns'); //브랜드 게시판
	var titHeight = $brandHeading.outerHeight();

	function titSpaceCal(){
		$brandSns.css({
			'opacity':'1',
			'top':titHeight
		});
		//브랜드 게시판에서 top:0
		if($brandBoardSNS.length){
			$brandSns.css({
				'opacity':'1',
				'top':0
			});
		}
	}

	if(windowWidth < 769){
		$brandSns.css('opacity','0');
		setTimeout(function(){ titSpaceCal(); }, 400);
	}
	else{
		setTimeout(function(){ $brandSns.css('top',''); }, 400);
	}
}

/* 연혁 */
function timelineFunc(){
	$('.timelineWrap').owlCarousel({
		loop: false,
		nav: true,
		dots: true,
		margin: 0,
		items: 1,
		responsive: {
			768 : {
				items: 1
			},
			1200 : {
				items: 1
			}
		}
	});

	if($('.timeline .scrollbar-inner').length){
		setTimeout(function(){
			$('.scrollbar-inner').scrollbar(); //스크롤바 플러그인 실행
		}, 800)

	}
}

/* 연혁 눈금 수정 후 : 2018.12.04
function timelineFunc(){
	var _timeLine = $('.timelineWrap');
	_timeLine.owlCarousel({
		loop: false,
		nav: true,
		dots: true,
		margin: 0,
		items: 1,
		responsive: {
			 768 : { items: 1 },
			1200 : { items: 1 }
		}
	});

	var $Dots = _timeLine.find('.owl-dots > button');

	//한국암웨이 연혁 : B10106.html
	if ( _timeLine.parents('.brand-contents.history').length){
		$Dots.eq(0).html('<span class="year2012">2012</span>');
		$Dots.eq(1).html('<span class="year2013">2013</span>');
		$Dots.eq(2).html('<span class="year2014">2014</span>');
		$Dots.eq(3).html('<span class="year2015">2015</span>');
		$Dots.eq(4).html('<span class="year2016">2016</span>');
		$Dots.eq(5).html('<span class="year2017">2017</span>');
		$Dots.eq(6).html('<span class="year2018">2018</span>');
	}

	//아티스트리 연혁 : B20205.html
	if ( _timeLine.parents('.brand-contents.artistry').length){
		$Dots.eq(0).html('<span class="artistry1950">1950</span>');
		$Dots.eq(1).html('<span class="artistry1960">1960</span>');
		$Dots.eq(2).html('<span class="artistry1970">1970</span>');
		$Dots.eq(3).html('<span class="artistry1980">1980</span>');
		$Dots.eq(4).html('<span class="artistry1990">1990</span>');
		$Dots.eq(5).html('<span class="artistry2000">2000</span>');
		$Dots.eq(6).html('<span class="artistry2010">2010</span>');
	}

	if($('.timeline .scrollbar-inner').length){
		setTimeout(function(){
			$('.scrollbar-inner').scrollbar(); //스크롤바 플러그인 실행
		}, 800)
	}
} */

/* 미디어갤러리 */
function mediaGalleryGETscript(){
	var $GalleryList =  $('.media-borad-list-video ul');
	if(!$GalleryList.length){ return; }

	//비디오 아닌경우 찾아 class추가
	tagGallery();

	//플러그인 호출
	$.getScript( '/_ui/responsive/common/js/masonry.pkgd.min.js', function(){
		console.log('미디어갤러리 플러그인 로드 완료');
	});
}

function tagGallery(){
	var $thumbsLIST =  $('.media-borad-list-video ul > li');
	$thumbsLIST.each(function(){
		var tagNode = $(this).find('.tag.gallery');
		tagNode.parents('li').addClass('typeGallery');
	});
}

function mediaGallery(){
	var $GalleryList =  $('.media-borad-list-video ul');
	if(!$GalleryList.length){ return; }

	$('.media-borad-list-video ul').masonry({
		columnWidth: '.grid-item',
		transitionDuration:0,
		percentPosition: true
	});

	$('.media-borad-list-gallery ul').masonry({
		columnWidth: '.grid-item',
		transitionDuration:0,
		percentPosition: true
	});

	var i = 0;
	$(document).on('click', '.media-more-btn button', function(e) {
		var $winSize = $(window).outerWidth();
		i++;
		e.preventDefault();
		var startNum = 10 * i;
		var endNum = startNum + 10;

		$(this).parent().parent().children().slice(startNum, endNum).css("display", "block");

		setTimeout(function(){ $('.media-borad-list-video ul').masonry() }, 0);

		if(!$(this).parent().prev().is(':hidden')){
			$(this).hide();
		}
	});
}

/* 아티스트리 홈 : B20200 */
function bannerList_artistry(){
	var artistryBnr = $('.artistry #banner_list');
	if(!artistryBnr.length){return;}

	$('.artistry #banner_list').owlCarousel({
		loop: false,
		nav: false,
		dots: true,
		margin: 0,
		items: 1
	});

	var bannerId = $('.artistry #banner_list');
	var $dotItembar = bannerId.find('.owl-dots');
	var $dotItems = bannerId.find('.owl-dots > button');


	$dotItems.eq(0).html('<span>아티스트리 소개</span>');
	$dotItems.eq(1).html('<span>아티스트리 스튜디오</span>');

	var mTop = $dotItembar.height()/2;
	$dotItembar.css('margin-top',-mTop);
}

/* 뉴트리라이트 홈 : B20101 */
function bannerList_nutrilite(){
	var nutriliteBnr = $('.nutrilite #banner_list');
	if(!nutriliteBnr.length){return;}

	$('.nutrilite #banner_list').owlCarousel({
		loop: false,
		nav: false,
		dots: true,
		//autoplay: true,
		//autoplayTimeout:5000,
		margin: 0,
		items: 1
	});

	var bannerId = $('.nutrilite #banner_list');
	var $dotItembar = bannerId.find('.owl-dots');
	var $dotItems = bannerId.find('.owl-dots > button');

	$dotItems.eq(0).html('<span>뉴트리라이트 브랜드 스토리</span>');
	$dotItems.eq(1).html('<span>뉴트리라이트 보태니컬 프로세스 9 캠페인</span>');
	$dotItems.eq(2).html('<span>뉴트리라이트 농장</span>');

	var mTop = $dotItembar.height()/2;
	$dotItembar.css('margin-top',-mTop);
}

/* 엣모스피어 드라이브 홈 : B20601 - 상단 nav - true에서 false로 변경 */
function bannerList_atmosphere(){
	var atmosphereBnr = $('.atmosphere #banner_list');
	if(!atmosphereBnr.length){return;}

	$('.atmosphere #banner_list').owlCarousel({
		loop: false,
		nav: false,
		dots: true,
		margin: 0,
		items: 1
	});

	var bannerId = $('.atmosphere #banner_list');
	var $dotItembar = bannerId.find('.owl-dots');
	var $dotItems = bannerId.find('.owl-dots > button');

	$dotItems.eq(0).html('<span>좋은 공기가 좋은 차의 기준</span>');
	$dotItems.eq(1).html('<span>아이에게 더 중요한 AIR</span>');
	$dotItems.eq(2).html('<span>에어백만큼 중요한 AIR</span>');

	var mTop = $dotItembar.height()/2;
	$dotItembar.css('margin-top',-mTop);

	$('.atmosphere #banner_list2').owlCarousel({
		loop: false,
		nav: true,
		dots: false,
		margin: 0,
		items: 1
	});
}

/* 배스바디 홈 : B20901 */
function bannerList_bathbody(){
	var bathbodyBnr = $('.bathbody #banner_list')
	if(!bathbodyBnr.length){return;}

	$('.bathbody #banner_list').owlCarousel({
		loop: false,
		nav: false,
		dots: true,
		//autoplay: true,
		//autoplayTimeout:5000,
		margin: 0,
		items: 1
	});

	var bannerId = $('.bathbody #banner_list');
	var $dotItembar = bannerId.find('.owl-dots');
	var $dotItems = bannerId.find('.owl-dots > button');


	$dotItems.eq(0).html('<span>글리스터 구강 청결 시스템</span>');
	$dotItems.eq(1).html('<span>새티니크 헤어케어,<br>그 이상의 아름다움</span>');
	$dotItems.eq(2).html('<span>G&H 바디 케어</span>');

	var mTop = $dotItembar.height()/2;
	$dotItembar.css('margin-top',-mTop);
}

/* 암웨이 퀸 홈 : B20501 */
function bannerList_queen(){
	var queenBnr = $('.queen #banner_list');
	if(!queenBnr.length){return;}

	$('.queen #banner_list').owlCarousel({
		loop: false,
		nav: false,
		dots: true,
		//autoplay: true,
		//autoplayTimeout:5000,
		margin: 0,
		items: 1
	});

	var bannerId = $('.queen #banner_list');
	var $dotItembar = bannerId.find('.owl-dots');
	var $dotItems = bannerId.find('.owl-dots > button');

	$dotItems.eq(0).html('<span>My Cooking Story</span>');
	$dotItems.eq(1).html('<span>암웨이 퀸의 5가지 <br>[지키는 기술]</span>');
	$dotItems.eq(2).html('<span>암웨이 퀸 쿠킹스토리</span>');

	var mTop = $dotItembar.height()/2;
	$dotItembar.css('margin-top',-mTop);
}

/* 원포원 : B20801 */
function bannerList_oneforone(){
	var oneforoneBnr = $('.oneforone #banner_list2');
	if(!oneforoneBnr.length){return;}

	$('.oneforone #banner_list2').owlCarousel({
		loop: false,
		nav: false,
		dots: true,
		margin: 0,
		items: 1
	});

	var bannerId = $('.oneforone #banner_list2');
	var $dotItembar = bannerId.find('.owl-dots');
	var $dotItems = bannerId.find('.owl-dots > button');
}

/** -----------------------------------
 *  XS 에너지 제품소개 : B20306
 *  linking multiple owl 플러그인 사용
 * -----------------------------------
 */
function static_multiCarousel(){
	if (!$('.multiCarousel').length){return;}

	var sync1 = $("#topCarousel_xs");
	var sync2 = $("#subCarousel_xs");

	var slidesPerPage = 1; //globaly define number of elements per page
	var syncedSecondary = true;

	sync1.owlCarousel({
		items : 1,
		slideSpeed : 2000,
		nav: true,
		autoplay: false,
		dots: true,
		loop: false,
		responsiveRefreshRate : 200
	}).on('changed.owl.carousel', syncPosition);

	sync2.on('initialized.owl.carousel', function(){
		sync2.find(".owl-item").eq(0).addClass("current");
	}).owlCarousel({
		items : 1,
		dots: false,
		loop: false,
		nav: false,
		touchDrag: false,
		mouseDrag: false,
		smartSpeed: 200,
		slideSpeed : 500,
		slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
		responsiveRefreshRate : 100
	}).on('changed.owl.carousel', syncPosition2);


	function syncPosition(el) {
		var current = el.item.index;
		sync2.find(".owl-item").removeClass("current").eq(current).addClass("current");

		var onscreen = sync2.find('.owl-item.active').length - 1;
		var start    = sync2.find('.owl-item.active').first().index();
		var end      = sync2.find('.owl-item.active').last().index();

		if (current > end)   { sync2.data('owl.carousel').to(current, 100, true); }
		if (current < start) { sync2.data('owl.carousel').to(current - onscreen, 100, true); }
	}

	function syncPosition2(el) {
		if(syncedSecondary){  var number = el.item.index;
		  sync1.data('owl.carousel').to(number, 100, true);
		}
	}
}

/** ------------------------------------------
 *  레이어팝업
 *  - 브랜드 layerPopOver() 실행만 모음
 * -------------------------------------------
 */
$(function(){
	/**
	 * 레이어팝업
	 * 뉴트리라이트 과학 : B20114
	 */
	$('#B20114_lp01').click(function(event) {//뉴트리라이트 과학 팝업
		event.preventDefault();
		layerPopOver(this,'.B20114_lp01');
	});
	$('#B20114_lp02').click(function(event) {//항상 최고의 품질을 보증하는 뉴트리라이트 팝업
		event.preventDefault();
		layerPopOver(this,'.B20114_lp02');
	});
	$('#B20114_lp03').click(function(event) {//최상의 제품을 위해 노력하는 뉴트리라이트 팝업
		event.preventDefault();
		layerPopOver(this,'.B20114_lp03');
	});
	$('#B20114_lp04').click(function(event) {//매달 15,000가지가 넘는 제품 테스트 시행 팝업
		event.preventDefault();
		layerPopOver(this,'.B20114_lp04');
	});
	$('#B20114_lp05').click(function(event) {//뉴트리라이트가 수행하는 제품 분석방법 팝업
		event.preventDefault();
		layerPopOver(this,'.B20114_lp05');
	});

	/**
	 * 레이어팝업
	 * 식물 영양소 캠페인 : B20118
	 */
	$('#B20118_lp01').click(function(event) {//빨간색(RED) 팝업
		event.preventDefault();
		layerPopOver(this,'.B20118_lp01');
	});
	$('#B20118_lp02').click(function(event) {//오렌지색(YELLOW/ORANGE) 팝업
		event.preventDefault();
		layerPopOver(this,'.B20118_lp02');
	});
	$('#B20118_lp03').click(function(event) {//초록색(GREEN) 팝업
		event.preventDefault();
		layerPopOver(this,'.B20118_lp03');
	});
	$('#B20118_lp04').click(function(event) {//보라색(PURPLE) 팝업
		event.preventDefault();
		layerPopOver(this,'.B20118_lp04');
	});
	$('#B20118_lp05').click(function(event) {//하얀색(White) 팝업
		event.preventDefault();
		layerPopOver(this,'.B20118_lp05');
	});

	/**
	 * 레이어팝업
	 * 뉴트리라이트 건강지킴이 : B20160
	 */
	$('#B20160_lp01').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20160_lp01');
	});
	$('#B20160_lp_p01').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20160_lp_p01');
	});
	$('#B20160_lp02').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20160_lp02');
	});
	$('#B20160_lp03').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20160_lp03');
	});
	$('#B20160_lp04').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20160_lp04');
	});

	/**
	 * 레이어팝업
	 * 뉴트리라이트 건강지킴이(NQ검사하기) : B20172
	 */
	$('.B20172_lp2').on('click',function(){
		layerPopOver(this,'.B20172_lp2_pop');
	});

	/**
	 * 레이어팝업
	 * 암웨이 본사 및 계열사  : B10601
	 */
	$('.B10601_lp1').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B10601_lp1_pop');
	});
	$('.B10601_lp2').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B10601_lp2_pop');
	});
	$('.B10601_lp3').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B10601_lp3_pop');
	});
	$('.B10601_lp4').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B10601_lp4_pop');
	});
	$('.B10601_lp5').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B10601_lp5_pop');
	});
	$('.B10601_lp6').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B10601_lp6_pop');
	});
	$('.B10601_lp').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B10601_lp_pop');
	});

	/**
	 * 레이어팝업
	 * 암웨이 미디어 갤러리 : B10910
	 */
	$('.B10910_lp1').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B10910_lp1_pop');
	});
	$('.B10910_lp2').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B10910_lp2_pop');
	});
	$('.B10910_lp3').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B10910_lp3_pop');
	});
	$('.B10910_lp4').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B10910_lp4_pop');
	});
	$('.B10910_lp5').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B10910_lp5_pop');
	});
	$('.B10910_lp6').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B10910_lp6_pop');
	});
	$('.B10910_lp7').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B10910_lp7_pop');
	});
	$('.B10910_lp8').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B10910_lp8_pop');
	});
	$('.B10910_lp9').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B10910_lp9_pop');
	});
	$('.B10910_lp10').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B10910_lp10_pop');
	});
	$('.B10910_lp11').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B10910_lp11_pop');
	});
	$('.B10910_lp12').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B10910_lp12_pop');
	});
	$('.B10910_lp13').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B10910_lp13_pop');
	});

	/**
	 * 레이어팝업
	 * 뉴트리키즈 놀이터 : B20163
	 */
	$('.B20163_lp1').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20163_lp1_pop');
	});
	$('.B20163_lp2').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20163_lp2_pop');
	});

	/**
	 * 레이어팝업
	 * 뉴트리라이트 미디어 갤러리 : B20164
	 */
	$('.B20164_lp1').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20164_lp1_pop');
	});
	$('.B20164_lp2').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20164_lp2_pop');
	});
	$('.B20164_lp3').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20164_lp3_pop');
	});
	$('.B20164_lp4').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20164_lp4_pop');
	});

	/**
	 * 레이어팝업
	 * 뉴트리라이트 미디어 갤러리 : B20166
	 */
	$('.B20166_lp1').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20166_lp1_pop');
	});
	$('.B20166_lp2').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20166_lp2_pop');
	});
	$('.B20166_lp3').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20166_lp3_pop');
	});
	$('.B20166_lp4').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20166_lp4_pop');
	});
	$('.B20166_lp5').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20166_lp5_pop');
	});
	$('.B20166_lp6').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20166_lp6_pop');
	});
	$('.B20166_lp7').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20166_lp7_pop');
	});
	$('.B20166_lp8').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20166_lp8_pop');
	});
	$('.B20166_lp9').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20166_lp9_pop');
	});

	/**
	 * 레이어팝업
	 * 뉴트리라이트 미디어 갤러리 : B20191
	 */
	$('.B20191_lp1').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20191_lp1_pop');
	});
	$('.B20191_lp2').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20191_lp2_pop');
	});
	$('.B20191_lp3').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20191_lp3_pop');
	});

	/**
	 * 레이어팝업
	 * 뉴트리라이트 미디어 갤러리 : B20192
	 */
	$('.B20192_lp1').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20192_lp1_pop');
	});
	$('.B20192_lp2').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20192_lp2_pop');
	});

	/**
	 * 레이어팝업
	 * 뉴트리라이트 미디어 갤러리 : B20193
	 */
	$('.B20193_lp1').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20193_lp1_pop');
	});
	$('.B20193_lp2').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20193_lp2_pop');
	});
	$('.B20193_lp3').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20193_lp3_pop');
	});
	$('.B20193_lp4').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20193_lp4_pop');
	});
	$('.B20193_lp5').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20193_lp5_pop');
	});
	$('.B20193_lp6').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20193_lp6_pop');
	});
	$('.B20193_lp7').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20193_lp7_pop');
	});

	/**
	 * 레이어팝업
	 * 뉴트리라이트 미디어 갤러리 : B20194
	 */
	$('.B20194_lp1').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20194_lp1_pop');
	});
	$('.B20194_lp2').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20194_lp2_pop');
	});

	/**
	 * 레이어팝업
	 * 뉴트리라이트 미디어 갤러리 : B20195
	 */
	$('.B20195_lp1').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20195_lp1_pop');
	});
	$('.B20195_lp2').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20195_lp2_pop');
	});
	$('.B20195_lp3').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20195_lp3_pop');
	});
	$('.B20195_lp4').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20195_lp4_pop');
	});

	/**
	 * 레이어팝업
	 * 뉴트리라이트 미디어 갤러리 : B20196
	 */
	$('.B20196_lp1').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20196_lp1_pop');
	});

	$('.B20196_lp2').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20196_lp2_pop');
	});
	$('.B20196_lp3').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20196_lp3_pop');
	});

	/**
	 * 레이어팝업
	 * 뉴트리라이트 미디어 갤러리 : B20197
	 */
	$('.B20197_lp1').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20197_lp1_pop');
	});
	$('.B20197_lp2').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20197_lp2_pop');
	});
	$('.B20197_lp3').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20197_lp3_pop');
	});
	$('.B20197_lp4').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20197_lp4_pop');
	});

	/**
	 * 레이어팝업
	 * NQ검사하기 : B20172
	 */
	$('.B20172_lp1').on('click',function(){
		layerPopOver(this,'.B20172_lp1_pop');
	});
	$('.B20172_lp3').on('click',function(){
		layerPopOver(this,'.B20172_lp3_pop');
	});

	/**
	 * 레이어팝업
	 * NQ검사하기 : B20180
	 */
	// $('.B20180_lp1').on('click',function(){
	// 	layerPopOver(this,'.B20180_lp1_pop');
	// });
	// $('.B20180_lp2').on('click',function(){
	// 	layerPopOver(this,'.B20180_lp2_pop');
	// });
	// $('.B20180_lp3').on('click',function(){
	// 	layerPopOver(this,'.B20180_lp3_pop');
	// });
	// $('.B20180_lp4').on('click',function(){
	// 	layerPopOver(this,'.B20180_lp4_pop');
	// });

	/**
	 * 레이어팝업
	 * 뉴트리라이트 보태니컬 프로세스 9 캠페인 : B20181
	 */
	$('.B20181_lp1').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20181_lp1_pop');
	});
	$('.B20181_lp2').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20181_lp2_pop');
	});
	$('.B20181_lp3').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20181_lp3_pop');
	});

	/**
	 * 레이어팝업
	 * 아티스트리 미디어 갤러리 : B20203
	 */
	$('.B20203_lp1').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20203_lp1_pop');
	});
	$('.B20203_lp2').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20203_lp2_pop');
	});
	$('.B20203_lp3').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20203_lp3_pop');
	});
	$('.B20203_lp4').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20203_lp4_pop');
	});
	$('.B20203_lp5').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20203_lp5_pop');
	});
	$('.B20203_lp6').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20203_lp6_pop');
	});
	$('.B20203_lp7').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20203_lp7_pop');
	});

	/**
	 * 레이어팝업
	 * 아티스트리 스튜디오 : B20210
	 */
	$('.B20210_lp1').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20210_lp1_pop');
	});

	/**
	 * 레이어팝업
	 * XS 에너지 미디어 갤러리 : B20302
	 */
	$('.B20302_lp1').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20302_lp1_pop');
	});
	$('.B20302_lp2').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20302_lp2_pop');
	});

	/**
	 * 레이어팝업
	 * XS 에너지 미디어 갤러리 : B20304
	 */
	$('.B20304_lp1').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20304_lp1_pop');
	});
	$('.B20304_lp2').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20304_lp2_pop');
	});
	$('.B20304_lp3').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20304_lp3_pop');
	});
	$('.B20304_lp4').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20304_lp4_pop');
	});
	$('.B20304_lp5').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20304_lp5_pop');
	});
	$('.B20304_lp6').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20304_lp6_pop');
	});
	$('.B20304_lp7').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20304_lp7_pop');
	});

	/**
	 * 레이어팝업
	 * XS 에너지 미디어 갤러리 : B20313
	 */
	$('.B20313_lp1').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20313_lp1_pop');
	});
	$('.B20313_lp2').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20313_lp2_pop');
	});
	$('.B20313_lp4').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20313_lp4_pop');
	});

	/**
	 * 레이어팝업
	 * XS 에너지 미디어 갤러리 : B20314
	 */
	$('.B20314_lp1').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20314_lp1_pop');
	});
	$('.B20314_lp2').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20314_lp2_pop');
	});
	$('.B20314_lp3').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20314_lp3_pop');
	});
	$('.B20314_lp4').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20314_lp4_pop');
	});
	$('.B20314_lp5').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20314_lp5_pop');
	});
	$('.B20314_lp6').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20314_lp6_pop');
	});
	$('.B20314_lp7').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20314_lp7_pop');
	});
	$('.B20314_lp8').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20314_lp8_pop');
	});

	/**
	 * 레이어팝업
	 * XS 에너지 미디어 갤러리 : B20315
	 */
	$('.B20315_lp1').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20315_lp1_pop');
	});
	$('.B20315_lp2').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20315_lp2_pop');
	});
	$('.B20315_lp3').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20315_lp3_pop');
	});
	$('.B20315_lp4').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20315_lp4_pop');
	});
	$('.B20315_lp5').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20315_lp5_pop');
	});
	$('.B20315_lp8').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20315_lp8_pop');
	});
	$('.B20315_lp9').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20315_lp9_pop');
	});
	$('.B20315_lp10').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20315_lp10_pop');
	});
	$('.B20315_lp11').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20315_lp11_pop');
	});
	$('.B20315_lp14').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20315_lp14_pop');
	});
	$('.B20315_lp15').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20315_lp15_pop');
	});
	$('.B20315_lp16').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20315_lp16_pop');
	});
	$('.B20315_lp17').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20315_lp17_pop');
	});
	$('.B20315_lp18').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20315_lp18_pop');
	});
	$('.B20315_lp19').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20315_lp19_pop');
	});
	$('.B20315_lp20').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20315_lp20_pop');
	});
	$('.B20315_lp21').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20315_lp21_pop');
	});
	$('.B20315_lp22').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20315_lp22_pop');
	});
	$('.B20315_lp23').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20315_lp23_pop');
	});
	$('.B20315_lp24').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20315_lp24_pop');
	});

	/**
	 * 레이어팝업
	 * XS 에너지 미디어 갤러리 : B20316
	 */
	$('.B20316_lp1').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20316_lp1_pop');
	});
	$('.B20316_lp2').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20316_lp2_pop');
	});
	$('.B20316_lp3').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20316_lp3_pop');
	});
	$('.B20316_lp4').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20316_lp4_pop');
	});
	$('.B20316_lp5').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20316_lp5_pop');
	});
	$('.B20316_lp6').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20316_lp6_pop');
	});
	$('.B20316_lp7').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20316_lp7_pop');
	});
	$('.B20316_lp8').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20316_lp8_pop');
	});
	$('.B20316_lp9').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20316_lp9_pop');
	});
	$('.B20316_lp10').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20316_lp10_pop');
	});
	$('.B20316_lp11').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20316_lp11_pop');
	});
	$('.B20316_lp12').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20316_lp12_pop');
	});
	$('.B20316_lp13').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20316_lp13_pop');
	});
	$('.B20316_lp14').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20316_lp14_pop');
	});
	$('.B20316_lp15').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20316_lp15_pop');
	});
	$('.B20316_lp16').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20316_lp16_pop');
	});
	$('.B20316_lp17').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20316_lp17_pop');
	});
	$('.B20316_lp18').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20316_lp18_pop');
	});
	$('.B20316_lp19').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20316_lp19_pop');
	});
	$('.B20316_lp20').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20316_lp20_pop');
	});
	$('.B20316_lp21').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20316_lp21_pop');
	});

	/**
	 * 레이어팝업
	 * XS 에너지 미디어 갤러리 : B20317
	 */
	$('.B20317_lp1').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20317_lp1_pop');
	});
	$('.B20317_lp2').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20317_lp2_pop');
	});
	$('.B20317_lp3').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20317_lp3_pop');
	});
	$('.B20317_lp4').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20317_lp4_pop');
	});
	$('.B20317_lp5').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20317_lp5_pop');
	});
	$('.B20317_lp6').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20317_lp6_pop');
	});
	$('.B20317_lp7').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20317_lp7_pop');
	});
	$('.B20317_lp8').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20317_lp8_pop');
	});
	$('.B20317_lp9').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20317_lp9_pop');
	});
	$('.B20317_lp10').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20317_lp10_pop');
	});
	$('.B20317_lp11').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20317_lp11_pop');
	});
	$('.B20317_lp12').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20317_lp12_pop');
	});
	$('.B20317_lp13').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20317_lp13_pop');
	});
	$('.B20317_lp14').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20317_lp14_pop');
	});
	$('.B20317_lp15').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20317_lp15_pop');
	});
	$('.B20317_lp16').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20317_lp16_pop');
	});
	$('.B20317_lp17').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20317_lp17_pop');
	});
	$('.B20317_lp18').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20317_lp18_pop');
	});
	$('.B20317_lp19').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20317_lp19_pop');
	});
	$('.B20317_lp20').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20317_lp20_pop');
	});
	$('.B20317_lp21').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20317_lp21_pop');
	});
	$('.B20317_lp22').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20317_lp22_pop');
	});
	$('.B20317_lp23').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20317_lp23_pop');
	});
	$('.B20317_lp24').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20317_lp24_pop');
	});
	$('.B20317_lp25').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20317_lp25_pop');
	});
	$('.B20317_lp26').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20317_lp26_pop');
	});
	$('.B20317_lp27').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20317_lp27_pop');
	});
	$('.B20317_lp28').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20317_lp28_pop');
	});
	$('.B20317_lp29').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20317_lp29_pop');
	});
	$('.B20317_lp30').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20317_lp30_pop');
	});
	$('.B20317_lp31').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20317_lp31_pop');
	});
	$('.B20317_lp32').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20317_lp32_pop');
	});
	$('.B20317_lp33').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20317_lp33_pop');
	});
	$('.B20317_lp34').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20317_lp34_pop');
	});
	$('.B20317_lp35').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20317_lp35_pop');
	});
	$('.B20317_lp36').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20317_lp36_pop');
	});

	/**
	 * 레이어팝업
	 * 이스프링 미디어 갤러리 : B20411
	 */
	$('.B20411_lp1').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20411_lp1_pop');
	});
	$('.B20411_lp2').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20411_lp2_pop');
	});
	$('.B20411_lp3').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20411_lp3_pop');
	});
	$('.B20411_lp4').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20411_lp4_pop');
	});
	$('.B20411_lp5').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20411_lp5_pop');
	});
	$('.B20411_lp6').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20411_lp6_pop');
	});
	$('.B20411_lp7').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20411_lp7_pop');
	});
	$('.B20411_lp8').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20411_lp8_pop');
	});
	$('.B20411_lp9').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20411_lp9_pop');
	});
	$('.B20411_lp10').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20411_lp10_pop');
	});
	$('.B20411_lp11').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20411_lp11_pop');
	});
	$('.B20411_lp12').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20411_lp12_pop');
	});
	$('.B20411_lp13').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20411_lp13_pop');
	});
	$('.B20411_lp14').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20411_lp14_pop');
	});
	$('.B20411_lp15').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20411_lp15_pop');
	});
	$('.B20411_lp16').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20411_lp16_pop');
	});
	$('.B20411_lp17').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20411_lp17_pop');
	});
	$('.B20411_lp18').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20411_lp18_pop');
	});
	$('.B20411_lp19').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20411_lp19_pop');
	});

	/**
	 * 레이어팝업
	 * 암웨이 퀸 미디어 갤러리 : B20502
	 */
	$('.B20502_lp1').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20502_lp1_pop');
	});
	$('.B20502_lp2').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20502_lp2_pop');
	});
	$('.B20502_lp3').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20502_lp3_pop');
	});
	$('.B20502_lp4').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20502_lp4_pop');
	});
	$('.B20502_lp5').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20502_lp5_pop');
	});
	$('.B20502_lp6').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20502_lp6_pop');
	});
	$('.B20502_lp7').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20502_lp7_pop');
	});
	$('.B20502_lp8').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20502_lp8_pop');
	});
	$('.B20502_lp9').click(function(event) {
		event.preventDefault();
		layerPopOver(this,'.B20502_lp9_pop');
	});
});

// 190214_losmap 테이블 가로 스크롤 표시
$(function() {
	var flickingName = '.bizTblWrap2'

	viewMoreTable(flickingName);
	$(window).resize(function() {
	  viewMoreTable(flickingName);
	});

	function viewMoreTable(element) {
		var $this           = $(element),
		    $fixedArea      = $this.find('.fixedArea'),
		    $flickingArea   = $this.find('.flickingArea'),
		    $table          = $flickingArea.find('table'),
		    $theadTh        = $flickingArea.find('thead th');

		var docW            = $(document).width(),
		    colW            = 90,
		    fTh             = $fixedArea.width() - 2,
		    colSum          = $theadTh.length,
		    tblW            = (colW * (colSum - 1)) + fTh,
		    defaultPosition = $('.losmap-pop-content').width(),
		    endPosition     = 0,
		    movePosition    = 0;

		$table.css('width', tblW);
		$theadTh.eq(0).css('width', fTh);
		$this.find('#btnCnt').detach();

		if( (docW - (fTh+2)) < tblW){

		    $this.append('<div id="btnCnt" class="leftArrw"></span>');
		    $this.find('#btnCnt').show();

		    $flickingArea.scroll(function(event) {
		        endPosition = Math.floor(event.currentTarget.scrollWidth / 10 );
		        var defaultPosition2 = Math.floor(defaultPosition / 10 )
		        movePosition = Math.floor(event.currentTarget.scrollLeft / 10 );

		        if ((endPosition - defaultPosition2) === movePosition) {
		            $this.find('#btnCnt').attr('class','').addClass('rightArrw');
		        } else if (!movePosition) {
		            $this.find('#btnCnt').attr('class','').addClass('leftArrw');
		        }  else {
		            $this.find('#btnCnt').attr('class','').addClass('centerArrw');
		        }
		    });

		    $(window).scroll(function(event) {
		        if(defaultPosition < $flickingArea.scrollWidth){
		            $this.find('#btnCnt').show();
		            var tbTop = $flickingArea.offset().top,
		                tbBtm = tbTop + $flickingArea.height();

		            var vwTop = $(window).scrollTop(),
		                vwBtm = vwTop + $(window).height();

		            var btnMin = Math.max(vwTop, tbTop),
		                btnMax = Math.min(vwBtm, tbBtm),
		                btnOffset = (btnMin + btnMax) * .5;

		            $btnCnt.css('top', (btnOffset) + 'px');
		        }
		    });
		}      
	}
});




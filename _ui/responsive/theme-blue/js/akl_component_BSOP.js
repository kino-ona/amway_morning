// S : [디파이 수정] 210607 BSOP js파일 추가
var AP = AP || {};
var AP = function () {
	// 카테영역	
	var allBox = $('.layer-area_container'),
		targetMenu = $('.target-menu'),
		depthArea = $('.menu'),
		depthMenuTail = $('.menu_tail'), // [디파이 수정] 210608 depthMenuTail 추가
		depth1Menu = $('.menu-link'),
		depth2Area = $('.depth-menu-area'),
		// 검색영역
		searchMenu = $('.btn_prd_search'),    
		// 필터영역
		filterMenu = $('.btn_prd_filter, .btn_filter-close'),          
		filterArea = $('.prd_search_filter_box .filter-box'),  
		// 정보영역  
		depth2Open = false; 		
        // searchStick = $('.prd_search_area');
	
	var menuHandler = function(){
		targetMenu.on('click', function(){              
			depthArea.toggle();
			if ( depth2Open === true ) {
                depthArea.addClass('layerMask') // [디파이 수정] 210608 추가
			}  else {
                depthArea.toggleClass('layerMask') // [디파이 수정] 210608 추가
			}              
		});   		
		depth1Menu.on('click', function(){
			var targetText = $(this).text();
			var num =  $(this).index('.menu-link'); // [디파이 수정] 210608 추가
			$('.target-txt').html(targetText); // [디파이 수정] 210608 추가
			allBox.removeClass('is-depth2-opened'); // [디파이 수정] 210608 추가
			 // S : [디파이 수정] 210608  영역 추가
			if(num == 0){
				// depth2Area.hide();
				depthArea.toggle(); 
				depthMenuTail.hide();
				$('.prd_search_area').show();
				status.depth2Open = false;
				return;
			}  else {
				$('.prd_search_area').hide();
				depthMenuTail.show();
			}
			// E : [디파이 수정] 210608  영역 추가
			depth1Menu.each(function(i){
				if (i == num){ 
					depth2Area.hide();
					depth2Area.eq(i-1).show();
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
				} 
			})
			depth2Open = true;
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
		    $('.layer-prd_search_top .new-search-cont').addClass('open');
			$('..new-search-cont .top-search .input-group .js-site-search-input').focus();
		});
	}	
	
	var init = function() {		
		menuHandler();
		menuSwipe();
		filterHandler();
		searchHandler();
	}
	init();

	var result = function(elem){
		if(!elem){ return }
		allBox.removeClass('is-search-opened, is-depth2-opened').addClass('is-search-result');
		// console.log(elem);
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
// E : [디파이 수정] 210607 BSOP js파일 추가
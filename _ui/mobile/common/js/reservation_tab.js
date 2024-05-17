$(function(){
	//탭 스크롤
	tabsTgg_Control();
});

/* 탭 스크롤 */
function tabsTgg_Control(){
	var _tabsToggles = $('.col-search-tab>ul');
	var _exceptObject = _tabsToggles.parent('.sizer-tabs-toggles');
	if (!_tabsToggles.length || _exceptObject.length){ return; }

	var _winWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	_tabsToggles.each(function(){
		var _UL = $(this);
		var _LI = _UL.find('li');

		//추가할 오브젝트 (확인용 변수)
		var scrollableDiv = '.scrollable-area.left , .scrollable-area.right';
		var _UL_wrapper = _UL.parent('.tabWrapper');
		var _Find_siblings = _UL_wrapper.siblings(scrollableDiv);

		//Type1 기본
		var find_OuterBorder = _UL.parents('.outer-border-bottom');
		if( find_OuterBorder.length ){
			find_OuterBorder.addClass('border-none'); //border-bottom 삭제

			if ( _Find_siblings.length ){ return; }
			else {
				_UL.wrap('<div class="tabWrapper"/>'); //ul wrapper 추가
				find_OuterBorder.prepend('<span class="scrollable-area left"/><span class="scrollable-area right"/>');
			}
		}

		//Type2 균등분할
		var find_searchTab = _UL.parents('.col-search-tab');
		if (find_searchTab.length){
			if ( _Find_siblings.length ){ return; }
			else {
				_UL.wrap('<div class="tabWrapper"/>'); //ul wrapper 추가
				find_searchTab.prepend('<span class="scrollable-area left"/><span class="scrollable-area right"/>');
			}
		}

		/* -- 너비 비교하기 -- */
		var outerWrapperWD = _UL.parents('.outer-border-bottom,.col-search-tab').width();
		var children_sum = _UL.outerWidth(true);

		child_each_sum = 0;
		_LI.each(function(index){
			var myWD = $(this).outerWidth(true);
			child_each_sum += myWD;
		});

		function $tabWidthCheck(){
			var _winWidth = $(window).width() - 20; //레이어 마진 20
			if( _winWidth < 749){
				_UL.removeClass('width-auto');
				if(_winWidth > children_sum ){ _UL.removeClass('scroll-tab width-auto'); }
				if(_winWidth < children_sum ){ _UL.addClass('scroll-tab'); }
			}
			else {
				_UL.removeClass('scroll-tab');
				if( child_each_sum < children_sum ){ _UL.removeClass('width-auto'); }
				if( _winWidth < children_sum || _winWidth < outerWrapperWD || children_sum > outerWrapperWD ){ _UL.addClass('width-auto');}
				if( _winWidth > children_sum ){ _UL.removeClass('width-auto'); }
			}
		}

		/* --- 스크롤 가능 표시 컨트롤 --- */
		var leftDiv = $(this).parent().siblings('.scrollable-area.left');
		var righttDiv = $(this).parent().siblings('.scrollable-area.right');
		var widthFix;
		var $scrollArea = {
				mob : function(){
					widthFix = $(window).width() - 50; //레이어 여백 20 + 탭  마이너스 여백 30
					$('.col-search-tab').css('width',widthFix);

					if( _UL.is('.scroll-tab')){
						leftDiv.hide();
						righttDiv.show();
						_UL.parent('.col-search-tab').addClass('scrolling'); //균등분할 탭 여백조정 class 추가
					}
					else {
						leftDiv.hide();
						righttDiv.hide();
						_UL.parent('.col-search-tab').removeClass('scrolling');
					}
				},
				pc : function(){
					leftDiv.hide();
					righttDiv.hide();
					$('.col-search-tab').css('width','');
				}
		}

		function $scrollableArea_show(){
			var _winWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			if(_winWidth < 769){ $scrollArea.mob(); }
			if(_winWidth > 768){ $scrollArea.pc(); }
		}

		$tabWidthCheck(); //너비 비교하기
		$scrollableArea_show(); //좌우 스크롤 영역 표시

		$(window).resize(function(){
			$tabWidthCheck();
			$scrollableArea_show();
		});

		//스크롤 상태 체크
		_UL.parent('.tabWrapper').scroll(function(event){
			var targetWrapperSize = $(this).width(); //A. wrapper
			var actualContentSize = event.currentTarget.scrollWidth; //B. 스크롤되는 컨텐츠 길이
			var scrolledPosition  = event.currentTarget.scrollLeft;  //C. 스크롤바 움직인 길이 (x좌표가 움직인 거리)

			//스크롤 가능 길이(D) : B - A
			var scrollable_width  = actualContentSize - targetWrapperSize;

			if (scrolledPosition < 30) {
				//스크롤 시작
				leftDiv.hide();
				righttDiv.show();
			}
			else if ( scrollable_width === scrolledPosition ){
				//스크롤 끝, 스크롤 가능 길이(D) === 움직인 길이(C)
				leftDiv.show();
				righttDiv.hide();
			}
			else {
				//움직이는 중, 스크롤 움직인 상태
				leftDiv.show();
				righttDiv.show();
			}
		});

		//로딩 시 활성화 탭 보이도록 scroll
		var activeNode = _LI.filter('.activeTab');
		var activeLeft = activeNode.position().left;
		var activeTabScroll = function(){ _UL.parents('.tabWrapper').scrollLeft(activeLeft-20); }

		function $activeSCROLL(){
			var _winWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			if(_winWidth < 769){
				activeTabScroll();

				setTimeout(function(){
					activeTabScroll();
				},300);

				$(window).resize(function(){
					activeTabScroll();
				});
			}
		}

		$activeSCROLL();
		$(window).resize(function(){
			$activeSCROLL();
		});
	});
}
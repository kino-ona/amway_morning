//오늘날짜
var now = new Date();
var os_today =
leadingZeros(now.getFullYear(), 4) +
leadingZeros(now.getMonth() + 1, 2) +
leadingZeros(now.getDate(), 2) +
leadingZeros(now.getHours(), 2) +
leadingZeros(now.getMinutes(), 2);

function leadingZeros(n, digits) {
	var zero = '';
	n = n.toString();
	if (n.length < digits) {
		for (i = 0; i < digits - n.length; i++)
		zero += '0';
	}
	return zero + n;
}

//레이어 열고 닫기
function os_openLayer(target){

	if( $('.' + target).hasClass('enable') ){ //타겟이 활성화면
		$('.' + target).hide(); //타겟 숨김
		$('.' + target).removeClass('enable'); //타겟 활성화 클래스 제거
	} else{ //아니면
		$('.' + target).show(); //타겟 보임
		$('.' + target).addClass('enable'); //타겟 활성화 클래스 생성
	}
}

//시작,종료일
function os_timeCtrl(sday,eday){
	if( os_today >= sday){
		console.log('true');
		$('.os_timeCtrlWrap .os_ready').hide();
		$('.os_timeCtrlWrap .os_sday').show();

		if(os_today >= eday){
			console.log('else');
			$('.os_timeCtrlWrap .os_sday').hide();
			$('.os_timeCtrlWrap .os_eday').show();
		}
	}
	console.log(os_today +'////' +sday+'///'+eday);
}

//
$(document).ready(function(){
	var el = $('.os_timeCtrlWrap') || null,
	sday = el.data('sday') || null,
	eday = el.data('eday') || 300012310000;
	if (el && sday) os_timeCtrl(sday,eday);

	//pc 달력 float 해제
	$('.os_monthCal li:nth-child(6n+1)').css('clear','left');
});

/*
*
*/
(function(){
	var os_util = new Object();

	os_util.popOpen = function(url, title, width, height, top, left) {
		var w = width || 660
		, h = height || 600
		, t = top || (screen.height - h) / 2
		, l = left || (screen.width - w) / 2;

		if (!url) return console.log('required url');
		if (!title) return console.log('required title');

		window.open(url, title, 'width=' + w + ', height=' + h + ', top=' + t + ', left=' + l + ', resizable=no, scrollbars=yes, toolbars=no, status=no, menu=no');
	}

	os_util.getParam = function(str) {
		var arr = str || location.search.substr(1).split('&')
		, result = new Object();

		for (var i = 0; i < arr.length; i++) {
			var tmp = arr[i].split('=');

			result[tmp[0]] = tmp[1];
		}

		return result;
	}
}());

/* mobile layer popup test */
function layerPopupOpenTest(e){
	console.log('test layer');
	if ($(document).find('#layerMask').length == 1) return false;
	var $this = e;
	var $target = $($($this).attr('href'));
	var target = $($this).attr('href');

	// $target.show();
	$target.attr('tabindex','0');

	var tabbables = $(target + ' :tabbable'),
	//첫번째 탭요소
	first = tabbables.filter(':first'),
	//마지막 탭요소
	last  = tabbables.filter(':last');

	//키 이벤트 등록
	$target.live('keydown',function(event){
		if(event.keyCode !== 9){ return; }
		if((event.target == last[0]) && !event.shiftKey){
			if((event.target.tagName=='INPUT') && (event.target.type=='text')){
				if (document.selection){ document.selection.empty();}
				else if (window.getSelection){ window.getSelection().collapseToStart();}
			}
			first.focus();//첫번째 탭 요소로 포커스 이동
			event.preventDefault();//상위 이벤트 핸들러로 전달되지 않도록 이벤트 해제
		} else if((event.target == first[0]) && event.shiftKey){
			last.focus();//마지막 탭 요소로 포커스 이동
			event.preventDefault();//상위 이벤트 핸들러로 전달되지 않도록 이벤트 해제
		}
	})

	// 암막
	var layerM =$('<div class="layerMask" id="layerMask" style="display:block"><img src="/_ui/mobile/images/common/bg_mask.png" alt=""></div>');
	$target.before(layerM);
	$target.show();

	var scrollT = $(document).scrollTop();
	var targetH = $target.outerHeight();
	var targetTop = Math.round($($this).offset().top);

	var $layerPop = $('div[id^="uiLayerPop_"]');
		var bodyW = $(document).width();
	var bodyH = $(document).height();
	var windowW = $(window).width();
	var windowH = $(window).height();

	if(targetH < windowH ){
		//레이어 팝업이 windowH보다 작을때는 세로의 중앙에 띄움
		var resultTop= Math.round(((windowH - targetH)/2)+scrollT);
		$target.css({ 'display':'block','top':resultTop});
	}else{
		//레이어 팝업이 windowH보다 클때는 위에서 15px띄운 위치에 뜸
		var resultTop= Math.round(scrollT+15);
		$target.css({ 'display':'block','top':resultTop});
	}

	// layerPop center align - Close button
	//$layerPop.find('.btnPopClose, .layerPopClose').bind('click',function(){closeLayerPopup($target);return false;});
	//return false;
	if($target.find('.btnPopClose').hasClass('orderNotice') == true){ // 개발팀 요청
		$target.find('.btnPopClose').bind('click',function(){
			$.order.closeOrderRestrictionPopup();
			closeLayerPopup($target);
			return false;
		});
	}else{
		$target.find('.btnPopClose').bind('click',function(){closeLayerPopup($target);return false;});
		return false;
	}
}

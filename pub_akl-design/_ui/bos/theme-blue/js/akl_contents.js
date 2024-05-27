$(function(){
/** ----- 브랜드 ----- */
	//브랜드 상단 SNS
	brandTopSNS();
	$(window).resize(function(){
		brandTopSNS();
	});

});

/* 브랜드 모바일 SNS 위치 */
function brandTopSNS(){
	var $brandHeading = $('.brand .top-title-wrapper');
	if(!$brandHeading.length){return;}
	
	var $brandSns = $('.brand .bod-view-sns');
	var titHeight = $brandHeading.outerHeight();
	var windowWidth = $(window).width();

	function titSpaceCal(){
		console.log('h1 높이: ' + titHeight);
		$brandSns.css('top',titHeight);
	}

	if(windowWidth < 769){
		setTimeout(function(){
			titSpaceCal();
		},300);
	}
	else if(windowWidth > 768){
		setTimeout(function(){
			$brandSns.css('top','0');
		},300);
	}
}
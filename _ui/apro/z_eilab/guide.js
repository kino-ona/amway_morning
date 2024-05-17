/* EiLAB Publishg Guide | version 5.3 | date 2020-01-06 since 2016.12.23 */

//////////////////////////////////////////////////////////////////////////////////////////////////
// 함수 실행
////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
	$('.example_box .source_code').copyCode();		
});

////////////////////////////////////////////////////////////////////////////////////////////////////
////// 함수 정의
////////////////////////////////////////////////////////////////////////////////////////////////////

/****************************************************************************
  소스보기 팝업
****************************************************************************/

/*----------------------------------------
 # popupSource		소스보기 팝업
 ----------------------------------------*/

$.fn.copyCode = function(){
	var $examples = $(this);
		
	// 초기설정
	$examples.parents('.ex_type').append('<div class="sourceWindow"><div class="sourceWindow_close">X</div><pre class="sourceView"></pre></div>');
	
	for ( var i = 0; i <$examples.length; i++ ){
		var getText = String($examples[i].innerHTML);
		$('.sourceWindow .sourceView')[i].append(getText)
	};
		
	$examples.each(function(){
		var $thisEx = $(this),
			$thisExSible = $thisEx.siblings('.ex_info_wrap'),
			$thisExBtn = $thisExSible.find('button.source'),
			$thisExWindowBtn = $thisEx.siblings('.sourceWindow').find('.sourceWindow_close');
			
		$thisExBtn.off('click').on('click', function(){
			$('body').append('<div class="sourceDim"></div>');
			$thisEx.parents('.ex_type').find('.sourceWindow').addClass('active')
		});	

		$thisExWindowBtn.off('click').on('click', function(){
			$('.sourceDim').remove();

			var $this = $(this);		
			$this.parents('.sourceWindow').removeClass('active');		
		});
	});
};	






	
	




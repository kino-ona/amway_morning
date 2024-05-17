/**
 * 이하 ECM 1.5 에서 추가한 코드
 */
jQuery(function($){
	
	//교육장 예약 아코디언 스텝
	bizEduPlace();
	
	//닫기버튼 있는 툴팁
	if ($('.tag.closeBtnType').length){
		var $tagLayer = $('.tag.closeBtnType');
	
		$tagLayer.each(function(){
			/* 0527 닫기기능 삭제
			var $layerCloseBtn = $(this).find('.btnCloseTip');
			$layerCloseBtn.click(function(){
				$(this).parents('.withCloseTip').hide();
				return false;
			});*/
		
			$(this).mouseover(function(){
				if($(this).find('.withCloseTip').is(':hidden')){
					$(this).find('.withCloseTip').show();
				}
			}).mouseleave(function(){
				if($(this).find('.withCloseTip').is(':visible')){
					$(this).find('.withCloseTip').hide();
				}
			}).click(function(e){
				e.preventDefault();
			})
		});
	}

	//시설예약 현황확인 목록-캘린더형 보기
	if($('.bizroomStateBox .viewWrapper').length){
		
		//목록형-캘린더형 보기형식 토글
		$('.bizroomStateBox .viewWrapper').hide();
		var switchBTN = $('.viewTypeSet').find('>a');
		var currentMenu = $('.viewTypeSet').find('>a.on').attr('href');
		$(currentMenu).show();
		
		$(switchBTN).click(function(e){
			e.preventDefault();
			var cliked = $(this).attr('href');
			
			$(this).addClass('on').siblings().removeClass('on');
			$(this).parents().find('.viewWrapper').hide();
			$(this).parents().find(cliked).show();
		});
	}
	
	//아카데미 상세보기-간략보기 토글
	if($('.toggleViewBox').length){
		
		$('.toggleViewBox .viewWrapper').hide();
		var switchBTN = $('.viewTypeSet').find('>a');
		var currentMenu = $('.viewTypeSet').find('>a.on').attr('href');
		$(currentMenu).show();
		
		$(switchBTN).click(function(e){
			e.preventDefault();
			var cliked = $(this).attr('href');
			
			$(this).addClass('on').siblings().removeClass('on');
			$(this).parents().find('.viewWrapper').hide();
			$(this).parents().find(cliked).show();
		});
	}

	//브랜드체험 프로그램 선택 탭
	if ($('.programWrap').length){
		
		//브랜드 메뉴 목록
		$('.programWrap .programList > a').click(function() {
			$(this).next('ul').toggle();
			return false;
		});
		 
		$('.programWrap .programList > ul > li').click(function(e) {
			e.preventDefault();
			
			var $this = $(this);
			var $prgGroup = $this.children('a');
			var $prgCont = $this.parent().siblings('.programCont');
			var prgGroupId = $prgGroup.attr('href').slice(1);
			
			$this.parent().hide().parent('.programList').children('a').text($this.text());
			$prgCont.hide();
			$('div[id='+prgGroupId+']').show();
		});
		
		var $groupTap = $('.programWrap .brselectArea > a');
		$groupTap.each(function(){		
			$(this).click(function(){
				if($groupTap.parents().find('a').hasClass('on')){
					$groupTap.parents().find('a').removeClass('on');
				}
				$(this).addClass('on');
				
				var groupId = $(this).attr('href').slice(1);
				$('.programListWrap').hide();			
				$('div[id='+groupId+']').show();			
				
				return false;
			});
		});
		
		var $programWrapList = $('.programListWrap > .programImg a');
		$programWrapList.each(function(){
			var $this = $(this);			
			$this.click(function(){
				if($this.siblings('a').hasClass('active')){
					$this.siblings('a').removeClass('active');
				}
				$this.addClass('active');
				
				var $brandConId = $this.attr('href').slice(1);
				$this.parents('.programListWrap').find('dl.prgSection').hide();		
				$('dl[id='+$brandConId+']').show();
				
				return false;
			});
		});
	}
	
	//브랜드체험 프로그램 토글
	if ($('.programList').length){
		var $acc_dt = $('.programList > dt > a');
		$acc_dt.click(function(){
			var $this = $(this);
			$this.parents('.programList').find('.active').removeClass('active');
			$this.parent().addClass('active');
			$this.parent().next('dd').addClass('active').attr('tabindex','0');
		});
	}
	
	//프로그램 선택 체크시 준비물 보이기
	if ($('.tblProgram').length){
		var $input = $('.tblProgram').find(':checkbox');
		
		$input.each(function() {
			$input.click(function(){
				if($(this).is(":checked")){	
					$(this).parents('tr').find('td .prepare').css('display','block');
					$(this).parents('tr').addClass('select');
				}else{ 
					$(this).parents('tr').find('td .prepare').css('display','none');
					$(this).parents('tr').removeClass('select');
				}
			});
		})
	}
	//(문화체험)프로그램 선택 체크시 준비물 보이기
	if ($('.programList').length){
		var $input = $('.programList dt').find(':checkbox');
		
		$input.each(function() {
			$input.click(function(){
				if($(this).is(":checked")){	
					$(this).parents('dt').find('.prepare').css('display','block');
				}else{ 
					$(this).parents('dt').find('.prepare').css('display','none');
				}
			});
		})
	}
	
	//sns공유 펼치고 닫기
	if ($('.snsZone .snsLink').length){
		
		$('.share').each(function(){
			$(this).click(function(e){
				e.preventDefault();
				var t = $(this), snsLink = $(this).parent().find('.snsLink');

				t.toggleClass('on');
				if(t.hasClass('on')){
					snsLink.css("overflow","visible").stop().animate({width:"161px"}, 100);
				} else {
					snsLink.css("overflow","hidden").stop().animate({width:"0"}, 0);
				}
			});
		});
	}
});

/* 교육장 예약 아코디언 스텝 */
function bizEduPlace(){
	if (!$('.brWrap').length) return;
	
	//스텝1
	$('#step1 .sectionWrap > section').hide();
	$('#step1 .sectionWrap > section').eq(0).show();
	//지역선택
	$('.brselectArea.local> a').each(function(){
		$(this).click(function(){
			$(this).parent().parent().next().slideDown();
		})
	});
	//룸선택
	$('.brselectArea.room a').each(function(){
		$(this).click(function(){
			$(this).parents('.brSelectWrap').next().slideDown(function(){
				touchsliderFn();
			});
		})
	});
	
	var stepButton = $('.btnWrapR > .btnBasicBS');
	var prevButton = $('.btnWrapR > .btnBasicGS');
	var currntButton = $('.brWrap > .modifyBtn');

	//다음 버튼 클릭 시
	$(stepButton).each(function(){
		$(this).click(function(){
			stepClose.call(this);
			stepOpen.call(this, 'next');
		});
	});
	//이전 버튼 클릭 시
	$(prevButton).each(function(){
		$(this).click(function(){
			stepClose.call(this);
			stepOpen.call(this, 'prev');
		});
	});
	//화살표 버튼 클릭 시
	$(currntButton).each(function(){
		$(this).click(function(){
			stepClose.call(this);
			stepOpen.call(this, 'currnt');
		});
	});
	
	//현재 스텝 닫기
	function stepClose(){
		var $brWrap = $(this).parents('.brWrap');
		var stepTit = $brWrap.find('.stepTit');
		var result = $brWrap.find('.result');
		
		//활성화 된 상태
		$brWrap.find('.sectionWrap').stop().slideUp(function(){
			$brWrap.find(stepTit).find('.close').show();
			$brWrap.find(stepTit).find('.open').hide();
			
			$brWrap.find('.modifyBtn').show();
			$brWrap.find('.req').show(); //결과값 보기
			$brWrap.removeClass('current').addClass('finish');
		});
	}
	
	//스텝 열기
	function stepOpen(param){
		if(param == 'next'){
			var $brWrap = $(this).parents('.brWrap').next();
		}else if(param == 'prev'){
			var $brWrap = $(this).parents('.brWrap').prev();
		}else if(param == 'currnt'){
			var $brWrap = $(this).parents('.brWrap');
		}
		var stepTit = $brWrap.find('.stepTit');
		
		$brWrap.find('.modifyBtn').hide();
		$brWrap.find('.result').hide();
		$brWrap.find('.sectionWrap').stop().slideDown(function(){
			$brWrap.find(stepTit).find('.close').hide();
			$brWrap.find(stepTit).find('.open').show();
			$brWrap.removeClass('finish').addClass('current');
		});
	}
	
}

//터치슬라이더
function touchsliderFn(){
	console.log('////')
	
	if($("#touchSlider").length){
		var touchSliderId = $("#touchSlider");
		var sliderLi= $(touchSliderId).find('li');
		var pagingTarget = touchSliderId.parent().find('.sliderPaging');
		var counterTarget = touchSliderId.parent().find('.sliderCount');
		var sliderLiNum = sliderLi.length;
	
		if (sliderLiNum > 1){
			if($('.touchSliderWrap .btnPrev, .touchSliderWrap .btnNext').length){
				$('.touchSliderWrap .btnPrev, .touchSliderWrap .btnNext').show();
			}
		}
	
		if($('.sliderCount').length){
			for(i = 1; i <= sliderLi.length; i++ ){
				var txt = '페이지';
				var addOpt = document.createElement('option');
				addOpt.value = i;
				addOpt.appendChild(document.createTextNode(i + txt));
				$("#countSel").append(addOpt);
	
			}
		}
	
		if($('.touchSliderWrap .btnStopPlay').length){
			var sliderLiNum = sliderLi.length;
			var resultL = ((sliderLiNum-1)*16+40)/2;
			$('.touchSliderWrap .btnStopPlay').css("margin-left",""+resultL+"px");
			$('.touchSliderWrap .btnStopPlay').click(function(e) {
				e.preventDefault();
				if($(this).hasClass('.play') == true){
					$(this).find('img').attr('src',$(this).find('img').attr("src").split("_play.gif").join("_stop.gif"));
					$(this).removeClass('.play');
				}else {
					$(this).find('img').attr('src',$(this).find('img').attr("src").split("_stop.gif").join("_play.gif"));
					$(this).addClass('.play');
				}
			});
		}
		
		$(touchSliderId).touchSlider({
			flexible : true,
			btn_prev : touchSliderId.parent().find(".btnPrev"),
			btn_next : touchSliderId.parent().find(".btnNext"),
			initComplete : function (e) {
				pagingTarget.html("");
				var num = 1;
				sliderLi.each(function (i, el) {
					var altTxt = $(this).find('img').attr('alt');
					if((i+1) % e._view == 0) {
						var pagingType = pagingTarget.attr('class');
						if(pagingType == 'sliderPaging colorG'){
							//alert('그린');
							pagingTarget.append('<a href="#none" class="btnPage"><img src="/_ui/desktop/images/academy/btn_slide_off.png" alt="' + altTxt + '"></a>');
						}else	if(pagingType == 'sliderPaging colorR'){
							//alert('레드');
							pagingTarget.append('<a href="#none" class="btnPage"><img src="/_ui/desktop/images/academy/btn_slide_off.png" alt="' + altTxt + '"></a>');
						}else {
							//alert('블루');
							pagingTarget.append('<a href="#none" class="btnPage"><img src="/_ui/desktop/images/academy/btn_slideb_off.png" alt="' + altTxt + '"></a>');
						}
					}
				});
				pagingTarget.find('.btnPage').bind("click", function (e) {
					var i = $(this).index();
					touchSliderId.get(0).go_page(i);
				});
			},
			counter : function (e) {
				pagingTarget.find('.btnPage').removeClass("on").eq(e.current-1).addClass("on");
				pagingTarget.find('.btnPage').each(function(){
					if($(this).hasClass('on') == true){
						$(this).find('img').attr('src',$(this).find('img').attr("src").split("_off.png").join("_on.png"));
					}else {
						$(this).find('img').attr('src',$(this).find('img').attr("src").split("_on.png").join("_off.png"));
					}
				});
				if (!$('.sliderCount').length) return;
	
				$(".currentP").html(e.current);
				$(".totalP").html(e.total);
				$("#countSel").val(e.current).attr("selected", "selected");
			}
		});
	
		// 슬라이드 목록 1개일때 touch & drag 비활성
		if (sliderLiNum == 1){
			$(touchSliderId)
				.unbind("touchmove", this.touchmove)
				.unbind("touchend", this.touchend)
				.unbind("dragstart", this.touchstart)
				.unbind("drag", this.touchmove)
				.unbind("dragend", this.touchend)
		}
	}
}

//A Pay 확산 결제수단
function apayPayment() {
	$('.payTaba').click(function() {
		var onTab = $(this).attr('data-tab');
		$('.payTaba').removeClass('on');
		$('.pay_cont').removeClass('on');
		$(this).addClass('on');
		$('.' + onTab).addClass('on')
	});

	$('.pay_cont.creditCard1 > .card-method > .payment-item-f.withLineB > .point-tit.withTooltip > #chk_p_02').on('click', function() {
		$(this).closest('.payment-item-f.withLineB').siblings('.cont_card_detail').toggle();
		$(this).closest('.payment-item-f.withLineB').siblings('.cont_card_detail').find('#paymentType02_01').prop('checked', true);
		$(this).closest('.payment-item-f.withLineB').siblings('.cont_card_detail').find('#paymentType02_01_cont').show();
		$(this).closest('.payment-item-f.withLineB').toggleClass('open');
	});
	$('.pay_cont.creditCard2 > .card-method > .payment-item-f.withLineB > .point-tit.withTooltip > #chk_p_03').on('click', function() {
		$(this).closest('.payment-item-f.withLineB').siblings('.cont_card_detail').toggle();
		$(this).closest('.payment-item-f.withLineB').siblings('.cont_card_detail').find('#paymentType03_01').prop('checked', true);
		$(this).closest('.payment-item-f.withLineB').siblings('.cont_card_detail').find('#paymentType03_01_cont').show();
		$(this).closest('.payment-item-f.withLineB').toggleClass('open');
	});

	$('.pay_cont.creditCard1 > .card-method > .payment-item-f.withLineB > .point-tit.withTooltip > .trans-accordion').on('click', function() {
		$(this).closest('.payment-item-f.withLineB').siblings('.cont_card_detail').toggle();
		$(this).closest('.payment-item-f.withLineB').siblings('.cont_card_detail').find('#paymentType02_01').prop('checked', true);
		$(this).closest('.payment-item-f.withLineB').siblings('.cont_card_detail').find('#paymentType02_01_cont').show();
		$(this).closest('.payment-item-f.withLineB').toggleClass('open');
	});
	$('.pay_cont.creditCard2 > .card-method > .payment-item-f.withLineB > .point-tit.withTooltip > .trans-accordion').on('click', function() {
		$(this).closest('.payment-item-f.withLineB').siblings('.cont_card_detail').toggle();
		$(this).closest('.payment-item-f.withLineB').siblings('.cont_card_detail').find('#paymentType03_01').prop('checked', true);
		$(this).closest('.payment-item-f.withLineB').siblings('.cont_card_detail').find('#paymentType03_01_cont').show();
		$(this).closest('.payment-item-f.withLineB').toggleClass('open');
	});

	$('#creditCardKind_partner1').change(function(){
		var result = $('#creditCardKind_partner1 option:selected').val();
		if(result == 'C02') {
			$('.pay_cont.creditCard1').find('.bonus_use_area').css('display', 'block');
			$('.pay_cont.creditCard1 > .row.card-method > .form_group_a > .payment-item-a:first-child').css('padding-bottom', '0');
		} else {
			$('.pay_cont.creditCard1').find('.bonus_use_area').css('display', 'none');
			$('.pay_cont.creditCard1 > .row.card-method > .form_group_a > .payment-item-a:first-child').css('padding-bottom', '6px');
		}
	});
	$('#creditCardKind_partner2').change(function(){
		var result = $('#creditCardKind_partner2 option:selected').val();
		if(result == 'C02') {
			$('.pay_cont.creditCard2').find('.bonus_use_area').css('display', 'block');
			$('.pay_cont.creditCard2 > .row.card-method > .form_group_a > .payment-item-a:first-child').css('padding-bottom', '0');
		} else {
			$('.pay_cont.creditCard2').find('.bonus_use_area').css('display', 'none');
			$('.pay_cont.creditCard2 > .row.card-method > .form_group_a > .payment-item-a:first-child').css('padding-bottom', '6px');
		}
	});

	function toolTips_open() {
		var _winWidth = $(window).width();
		var _btnToolTip = $('.toolTip-wrapper').find('.btn-tooltip');
		var _btnTooltipClose = $('.toolTip-wrapper').find('.btn-tooltip-close');
	
		_btnToolTip.each(function () {
			$(this).off('click').on('click', function (e) {
				e.preventDefault();
	
				//컨텐츠 노출
				var _tipContent = $(this).parent().find('.tooltip-content');
				if (_tipContent.is(':hidden')) {
					$(this).parent().addClass('open'); //화살표
					_tipContent.show();
				} else if (_tipContent.is(':visible')) {
					$(this).parent().removeClass('open'); //화살표
					_tipContent.hide();
				}
			});
		});
	
		//닫기 버튼
		_btnTooltipClose.off('click').on('click', function (e) {
			e.preventDefault();
	
			var tooltipWrapper = $(this).parents('.toolTip-wrapper');
			var tooltipContent = tooltipWrapper.find('.tooltip-content');
			tooltipWrapper.removeClass('open'); //화살표
			tooltipContent.hide();
		});
	
		//body 클릭 시 툴팁닫기
		$('.toolTip-wrapper').click(function (e) {
			e.stopPropagation();
		});
		$('html').click(function () {
			$('.toolTip-wrapper').removeClass('open');
			$('.tooltip-content').hide();
		});
	}
	toolTips_open();

	// S : 20220913 A Pay 확산 현금영수증 추가
	var radioTabHandler = function () {
		$('#cash_tax_request .tab-area input:radio').on('click', function () {
			var elem = $(this).attr('id');
			$(this).prop("checked", true).attr('checked', 'checked');
			$(this).parents('.pay_cont').find('.tab-cont-st2').hide();
			$(this).parents('.pay_cont').find('#' + elem + '_cont').show();

			if ($(this).parent().parent('.tab-area').hasClass('tab_control0')) {
				$(this).parents('.tab_control0').find('.tab-cont-st0').hide();
			} else {
				$(this).parents('.tab_control').find('.tab-cont-st2').hide();
			}
			$('#' + elem + '_cont').show();
		});
	}
	radioTabHandler();
	// E : 20220913 A Pay 확산 현금영수증 추가

	$('.cont_card_detail input:radio').on('click', function() {
		var elem = $(this).attr('id');
		$(this).prop("checked", true).attr('checked', 'checked');
		$(this).parents('.cont_card_detail').find('.tab-cont-st2').hide();
		$(this).parents('.cont_card_detail').find('#' + elem + '_cont').show();
	})

	$('.payTab4').on('click', function(){
		$('.tab-area-out_new, .pay_cont_tail').hide();

		$('.payTab1, .payTab3').on('click', function() {
			$('.tab-area-out_new, .pay_cont_tail').show();
		})
	})

	/* S : 20220916 A Pay 확산 공동사업자 관련 스크립트 추가 */
	$('.apay_partner_cont .tab-area-out_new input:radio').on('click', function () {
		var elem = $(this).attr('id');
		$(this).prop("checked", true).attr('checked', 'checked');
		$(this).addClass('on').parents().siblings().find('input').removeClass('on');
		$(this).parents('.apay_partner_cont').find('.tab-cont-st2').hide();

		$('.payTab_button_area a').removeClass('on');
		$('.apay_partner_cont .pay_cont_tail').hide();
		
		if($('#apay_partner1').hasClass('on')){
			$('.payTab_button_area a.payTab1').attr('data-tab','apayaccount1');
			$('.payTab_button_area a.payTab3').attr('data-tab','apaycreditcard1');
			$('.payTab_button_area a.payTab4').attr('data-tab','creditCard1');
		} else if($('#apay_partner2').hasClass('on')) {
			$('.payTab_button_area a.payTab1').attr('data-tab','apayaccount2');
			$('.payTab_button_area a.payTab3').attr('data-tab','apaycreditcard2');
			$('.payTab_button_area a.payTab4').attr('data-tab','creditCard2');
		}

		if ($(this).hasClass('on')) {
			$(this).parents('.apay_partner_cont').find('#' + elem + '_cont').show();
		}

		$('.payTab1, .payTab3').on('click', function() {
			$('.tab-area-out_new, .pay_cont_tail').show();

			$('.payTab4').on('click', function(){
				$('.tab-area-out_new, .pay_cont_tail').hide();
			})
		})
	});		
	/* E : 20220916 A Pay 확산 공동사업자 관련 스크립트 추가 */
}
apayPayment();
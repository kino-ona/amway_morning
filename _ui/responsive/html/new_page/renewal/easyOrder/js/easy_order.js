// 팝업 관련
var AMWAY = (function () {
    var callLayer = function () {
        var btnLayer = document.querySelectorAll('[data-layer]');
        for (var i = 0; i < btnLayer.length; i++) {
            btnLayer[i].addEventListener('click', function (e) {
                var targetId = this.dataset.layer;
                var targetLayer = document.querySelector('#' + targetId);
                targetLayer.classList.add('showing');
                console.log($(targetLayer));

                if ($(targetLayer).is('.layer-area, #cartLayer')) {
                    $('html, body').addClass('scroll-off');
                }

            });
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
                targetElem.classList.remove('showing');

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
                targetElem.classList.remove('showing');
                $('html, body').removeClass('scroll-off');
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
                targetElem.classList.remove('showing');
                $('html, body').removeClass('scroll-off');
            })
        }
    };

    return {
        callLayer: callLayer,
    }
})();

// 툴팁 열기
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

$(function(){
    // 라디오버튼 토글열기(현금영수증 신청 팝업에서 사용)
    $('.tab-area input:radio').on('click', function () {
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
})

// 하단 '암웨이소식' 토글
function quickLinksItem_MOB() {
    $(".quick-links-item").on('click', function () {
        if ($(this).hasClass("switcher")) {
            $(this).removeClass("switcher");
        } else {
            $(this).addClass("switcher");
            $(this).siblings().removeClass("switcher");
        }
    });
}

// 하단 '한국암웨이(주) 사업자정보 토글
function footerInfoCtrl() {
	if ($(".footer .footer-cont0 button").hasClass('closed')) {
		$('.footer .footer-cont0 button, .footer .footer-cont1 .txt-cont').removeClass('closed');
	} else {
		$('.footer .footer-cont0 button, .footer .footer-cont1 .txt-cont').addClass('closed');
	}
};

// 하단 Top 버튼
function onScroll_TOP() {
	var scrollDIV = '<div id="ScrollTopArea" class="scrollTopWrapper"><button type="button" class="toTop" style="display:none">TOP(위로이동)</button></div>';

	var $footer = $('#footer');
	var $topBox = $('#ScrollTopArea');

	function appendObject() {
		if ($topBox.length) {
			return;
		}

		$footer.append(scrollDIV);
		pageScrollTOP(); //새로고침 시, scrolltop !=0  버튼 노출
	}

	function pageScrollTOP() {
		var $scrollTop = $(window).scrollTop();
		var $scrollBox = $('.scrollTopWrapper .toTop');

		if ($scrollTop > 0) {
			$scrollBox.stop().fadeIn('fast');
		} else {
			$scrollBox.stop().fadeOut();
		}
	}

	//위로이동 버튼 append
	setTimeout(function () {
		appendObject();
	}, 600);

	//버튼 클릭 시
	$(document).on('click', '#ScrollTopArea > .toTop', function () {
		$('html,body').animate({
			scrollTop: 0
		}, 400);
	});

	//스크롤 시
	window.onscroll = function () {
		pageScrollTOP();
	};
}

// 20220914 약관
$(function() {
    $('.check-all').on('click', function() {
        if($('.check-all').is(':checked')) {
            $('.login-form-remember').prop('checked', true);
        } else {
            $('.login-form-remember').prop('checked', false);
        }
    });

    $('.toss_agree_box .agree_txt input[type=checkbox]').on('click', function(){
        if($('.toss_agree_box .agree_txt input[type=checkbox]:checked').length == $('.toss_agree_box .agree_txt input[type=checkbox]').length){
            $('.check-all').prop('checked', true);
        } else {
            $('.check-all').prop('checked', false);
        }
    });

    $('.toss_agree_box').find('a').on('click', function() {
        $('body').addClass('scroll-off');
    });
    $('.btn-modal_close').on('click', function() {
        $('body').removeClass('scroll-off');
    });
})

// 20220914 하단 플로팅 버튼
$(window).scroll(function() {
    var scrollTop = $(this).scrollTop();

    if(scrollTop >= ($(document).height() - $(window).height() - 55)){ /* 20221012 수정 */
        $('.footer_fixed').addClass('inherit');
    } else {
        $('.footer_fixed').removeClass('inherit');
    }
})

// 20220914 툴팁 size
function toolTips_conSize() {
	var _winWidth = $(window).width();
	var PortraiteSize = $(window).width();
	var LandscapeSize = $(window).height();
	if (LandscapeSize < PortraiteSize) {
		PortraiteSize = LandscapeSize;
	}

	var tooltipBox = $('.toolTip-wrapper');
	var tooltipBTN = tooltipBox.find('.btn-tooltip');

	function tipContWidth() {
		tooltipBox.each(function () {
			var contentWrapper = $(this).find('.tipCont-wrapper');
			if (!contentWrapper.length) {
				var $el = $(this).find('.tooltip-content');
				$el.wrap('<div class="tipCont-wrapper"\>');
			}
			// wrapper 추가 후
			$(this).addClass('type-mob-full');
			var tooltipBTN = $(this).find('.btn-tooltip');
			var tooltipWrapper = $(this).find('.tipCont-wrapper');
			var tooltipContent = tooltipWrapper.find('.tooltip-content');

			var tooltipSize = PortraiteSize;
			if (_winWidth < 361) {
				tooltipWrapper.css({
					'width': tooltipSize,
					'max-width': tooltipSize - 50
				});
			} else if (_winWidth < 769) {
				tooltipWrapper.css({
					'width': tooltipSize,
					'max-width': tooltipSize - 80
				});
			} else {
				tooltipWrapper.css({
					'width': tooltipSize,
					'max-width': tooltipSize - 50
				});
			}
		});

		//버튼 위치 체크 후, 컨텐츠 위치조정
		tooltipBTN.each(function () {
			var leftPosition = $(this).offset().left;
			var tipContent = $(this).parent().find('.tooltip-content');
			var tipContentWidth = tipContent.width();

			if (_winWidth > 768) {
				if (leftPosition < 100 && leftPosition < tipContentWidth / 2) {
					tipContent.addClass('left');
				}
			} else {
				tipContent.removeClass('left');
			}
		});
	}

	tipContWidth();
	$(window).resize(function () {
		tipContWidth();
	});
}

$(function(){
    toolTips_open();
    quickLinksItem_MOB();
    onScroll_TOP();

    // 20220914 추가
    toolTips_conSize();
	$(window).resize(function () {
		toolTips_conSize();
	});
})
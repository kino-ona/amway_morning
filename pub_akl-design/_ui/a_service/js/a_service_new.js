$(function () {
    // E : [디파이 수정2] 210901 A Pay 관리 관련 팝업
    // 레이어 오픈 함수 호출
    AMWAY.callLayer();

    $('.pop_a-pay').click(function (event) {
        event.preventDefault();
        layerPopOver(this, '.popup_a-pay_setting');
    });
    $('.pop_a-pay-add-delete').click(function (event) {
        event.preventDefault();
        layerPopOver(this, '.popup_a-pay-add-delete');
    });
    $('.payment-registered .lists .delete').click(function (event) {
        event.preventDefault();
        layerPopOver(this, '.alert01');
        $('.alert01').css('background', 'rgba(0,0,0,0.2)');
    });
    $('.payment-registered .lists .delete').click(function (event) {
        event.preventDefault();
        layerPopOver(this, '.popup_type_alert');
        $('.popup_type_alert').css('background', 'rgba(0,0,0,0.2)');
    });
    $('.btn-cancel').click(function () {
        $('.popup_type_alert').hide();
        $('.popup_type_alert.alert01').removeClass('active');
        $('.popup_type_alert.alert01').attr('style', 'background: transparent');
    });

    $('#loadLayer1').load('/_ui/a_service/include/cash_tax_request.html'); // 결제수단 변경(소비자) 팝업
    $('#loadLayer2').load('/_ui/a_service/include/address_change.html'); // 배송지 선택 팝업
    $('#loadLayer3').load('/_ui/a_service/include/address_modify.html'); //배송지 수정 팝업
    $('#loadLayer4').load('/_ui/a_service/include/business_license_layer.html'); //사업자등록증 관리 팝업
    $('#loadLayer5').load('/_ui/a_service/include/business_license_layer01.html'); //사업자등록증 상세보기 팝업
    $('#loadLayer6').load('/_ui/a_service/include/faq_customer.html'); //배송방법가이드
    $('#loadLayer7').load('/_ui/a_service/include/personal_information.html'); //개인정보 수집 및 이용에 대한 동의
    $('#loadLayer11').load('/_ui/a_service/include/banktransfer_account_write.html'); //자동이체 계좌 등록 팝업

    // S : 20220111 TOSS 팝업 추가
    $('#loadLayer12').load('/_ui/a_service/include/toss_info_agree.html'); //TOSS 개인정보 수집 이용 동의
    $('#loadLayer13').load('/_ui/a_service/include/toss_banking_agree.html'); //TOSS 전자금융거래 기본 약관
    $('#loadLayer14').load('/_ui/a_service/include/toss_third_agree.html'); //TOSS 개인정보 제3자 제공 동의

    // 20220215 개인정보수집이용동의-이벤트 참여 팝업 추가
    $('#loadLayer15').load('/_ui/a_service/include/personal_information_event.html'); //개인정보수집이용동의-이벤트 참여

    $('.toss_agree_box > .toss_agree_box_inner:nth-child(1)').find('a').on('click', function () {
        $('#loadLayer12').children().addClass('showing');
    });
    $('.toss_agree_box > .toss_agree_box_inner:nth-child(2)').find('a').on('click', function () {
        $('#loadLayer13').children().addClass('showing');
    });
    $('.toss_agree_box > .toss_agree_box_inner:nth-child(3)').find('a').on('click', function () {
        $('#loadLayer14').children().addClass('showing');
    });
    // 20220215 개인정보수집이용동의-이벤트 참여 팝업 추가
    $('.toss_agree_box > .toss_agree_box_inner:nth-child(4)').find('a').on('click', function () {
        $('#loadLayer15').children().addClass('showing');
    });
    $('.toss_agree_box').find('a').on('click', function () {
        $('body').addClass('scroll-off');
    });
    $('.btn-modal_close').on('click', function () {
        $('body').removeClass('scroll-off');
    })
    // E : 20220111 TOSS 팝업 추가

    // S : 20220111 TOSS 체크박스 전체체크
    $('.check-all').on('click', function () {
        if ($('.check-all').is(':checked')) {
            $('.login-form-remember').prop('checked', true);
        } else {
            $('.login-form-remember').prop('checked', false);
        }
    })

    $('.login-form-remember').on('click', function () {
        if ($('input[class=login-form-remember]:checked').length == $('.login-form-remember')
            .length) {
            $('.check-all').prop('checked', true);
        } else {
            $('.check-all').prop('checked', false);
        }
    })
    // E : 20220111 TOSS 체크박스 전체체크

    // S : [디파이 수정2] 210901 A Pay 관리 관련 팝업
    var swiper = new Swiper(".mySwiper", {
        cssWidthAndHeight: true,
        slidesPerView: 'auto',
        visibilityFullFit: true,
        autoResize: false,
        spaceBetween: 0,
        centeredSlides: true,
        // initialSlide: 0, // 초기 슬라이드 위치
        observer: true,
        observeParents: true,
        grabCursor: true,
        slideToClickedSlide: true, //20220218 슬라이드 클릭 시 이동
        keyboard: {
            enabled: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        }
    });
    // E : [디파이 수정2] 210901 A Pay 관리 관련 팝업

    /***
     * 2020.01.05 box_mobile-floating 클래스가 visible 이 아닌경우 footer padding bottom 0 으로 조정
     */
    if (!$('.box_mobile-floating').is(':visible')) {
        $('#footer').css('padding-bottom', 0)
    }

    // 2020-12-11
    payments();

    // 2020-12-11  테스트확인용	 (팝업확인용:삭제예정)	
    var link = document.location.href;

    if (link.indexOf("?loading") != -1) {
        $('.loading_order_new').show()
    }

    $('.accodion_aclickuser, .accodion_aclickaddr').hide();
    if (link.indexOf("?abc") != -1) {
        $('.tabs_block_wrap .tab-toggle:last-child').trigger('click');
    }
    if (link.indexOf("?aclick") != -1) {
        $('.accodion_aclickuser, .accodion_aclickaddr').show();
        $('.tabs_block_wrap, .tab-body').hide();
        $('.payTaba').hide();
        $('.payTab4').show();
        $('#target_coupon .form-group:eq(2), #target_coupon .form-group:eq(3)').hide();
    }
    if (link.indexOf("?p01") != -1) { //자동이체계좌등록
        setTimeout(function () {
            $('#paymentType01_01_cont button:contains("자동이체 계좌 등록 및 변경")').eq(0).trigger('click');
        }, 500)
    }
    if (link.indexOf("?p02") != -1) { //현금영수증 및 세금계산서 신청
        $('.pay_cont_tail .payment-item-a-info-btn a').get(0).click();
    }
    if (link.indexOf("?p03") != -1) { //배송지선택
        setTimeout(function () {
            $('#deliver01 .btn-delivery-guide a').get(0).click();
        }, 500)
    }
    if (link.indexOf("?p04") != -1) { //배송지등록
        setTimeout(function () {
            $('#address_change button:contains("배송지추가")').eq(0).trigger('click');
        }, 500)
    }
    if (link.indexOf("?p05") != -1) { //배송지수정
        setTimeout(function () {
            $('#address_change .shipping-address button:contains("수정")').eq(0).trigger('click');
            $('#address_modify .header-title').eq(0).hide();
            $('#address_modify .header-title').eq(1).show();
        }, 500)
    }
    if (link.indexOf("?p06") != -1) { //사업자등록증 관리
        setTimeout(function () {
            $('#cash_03_cont a').get(0).click();
        }, 500)
    }
    if (link.indexOf("?p07") != -1) { //사업자등록증 상세보기
        setTimeout(function () {
            $('#business-license-layer button:contains("상세보기")').eq(0).trigger('click');
        }, 500)
    }
    if (link.indexOf("?p08") != -1) { //카드사 혜택보기
        $('.creditCard a').get(0).click();
    }
    if (link.indexOf("?p09") != -1) { //개인정보 수집 이용 동의
        setTimeout(function () {
            $('#down20 a').get(0).click();
        }, 500)
    }
    if (link.indexOf("?p10") != -1) { //배송방법 가이드
        setTimeout(function () {
            $('.btn-delivery-guide a:contains("배송방법 가이드")').get(0).click();
        }, 500)
    }
    if (link.indexOf("?p11") != -1) { //ABC 안내
        setTimeout(function () {
            $('#target_abc a:contains("ABC안내")').get(0).click();
        }, 500)
    }

    $('[data-hide]').on('click', function (e) {
        var $button = $(e.target)
        var $target = $button.data('hide')

        $($target).hide()
    });

    // 토스트팝업 20211215
    $('.payment-basic').click(function () {
        $('.toastPopup.payment').css('display', 'block').delay(3000).fadeOut(600);
    });

    // apay 결제수단
    $('.payTab.v2 > #payment-other').on('click', function () {
        $('.payTab1, .payTab2, .payTab3, .payTab4, .payTab5').removeClass('on');
        $('.payTab.v2 > #payment-other').closest('.payTab.v2').find('.payTab_button_area').css('display',
            'block');
        $('.pay_cont').closest('#target_payment > .accodion_box_cont.apay-loose').find('.payTab_cont_area').css(
            'display', 'none');
        $('.pay_cont').closest('#target_payment > .accodion_box_cont.apay-loose').find('.pay_cont_tail').css(
            'display', 'none'); // 20220121 추가
        $('.pay_cont').closest('#target_payment > .accodion_box_cont.apay-loose').css('background-color', '#fff');
        $('.pay_cont').closest('#target_payment > .accodion_box_cont.payment-other').css('background-color',
            '#f4f4f4');
        $('.pay_cont').css('border-top', 'none');
    });

    $('.payTab1').on('click', function () {
        $('.payTab2, .payTab3, .payTab4, .payTab5').removeClass('on');
        $('.pay_cont').closest('#target_payment > .accodion_box_cont.apay-loose').css('background-color',
            '#f4f4f4');
        $('.pay_cont').closest('#target_payment > .accodion_box_cont.payment-other').css('background-color',
            '#fff');
        $('.pay_cont').closest('#target_payment > .accodion_box_cont.payment-other').find('.payTab_cont_area')
            .css('background-color', '#fff');
        $('.pay_cont').closest('#target_payment > .accodion_box_cont.apay-loose').find('.payTab_cont_area').css(
            'display', 'block');
        $('.pay_cont').closest('#target_payment > .accodion_box_cont.payment-other').find('.payTab_cont_area')
            .css('display', 'none'); // 20220120 추가
        $('.pay_cont').closest('#target_payment > .accodion_box_cont.apay-loose').find('.pay_cont_tail').css(
            'display', 'block'); // 20220121 추가
        $('.pay_cont').closest('#target_payment > .accodion_box_cont.payment-other').find('.pay_cont_tail').css(
            'display', 'none'); // 20220121 추가
        $('.pay_cont').closest('#target_payment > .accodion_box_cont.payment-other').find('.payTab_cont_area')
            .css('border-top', 'none');
        $('.payTab.v2 > #payment-other').closest('.payTab.v2').find('.payTab_button_area').css('display', 'none');
        $('.pay_cont').css('border-top', 'none');
        $('.payTab.v2 > #payment-other').prop('checked', false);
    });

    $('.payTab2').on('click', function () {
        $('.payTab1, .payTab3, .payTab4, .payTab5').removeClass('on');
        $('.pay_cont').closest('#target_payment > .accodion_box_cont.payment-other').find('.payTab_cont_area')
            .css('display', 'block'); // 20220120 추가
        $('.pay_cont').closest('#target_payment > .accodion_box_cont.apay-loose').find('.payTab_cont_area').css(
            'display', 'none'); // 20220120 추가
        $('.pay_cont').closest('#target_payment > .accodion_box_cont.apay-loose').find('.pay_cont_tail').css(
            'display', 'none'); // 20220121 추가
        $('.pay_cont').closest('#target_payment > .accodion_box_cont.payment-other').find('.pay_cont_tail').css(
            'display', 'block'); // 20220121 추가
        $('.pay_cont').closest('#target_payment > .accodion_box_cont.apay-loose').css('background-color', '#fff');
        $('.pay_cont').closest('#target_payment > .accodion_box_cont.payment-other').css('background-color',
            '#f4f4f4');
        $('.pay_cont').css('border-top', 'none');
        $('.pay_cont').closest('#target_payment > .accodion_box_cont.payment-other .payTab_cont_area').css(
            'border-top', '1px solid #d7d7d7')
    });

    $('.payTab3').on('click', function () {
        $('.payTab1, .payTab2, .payTab4, .payTab5').removeClass('on');
        $('.pay_cont').closest('#target_payment > .accodion_box_cont.apay-loose').css('background-color',
            '#f4f4f4');
        $('.pay_cont').closest('#target_payment > .accodion_box_cont.payment-other').css('background-color',
            '#fff');
        $('.pay_cont').closest('#target_payment > .accodion_box_cont.payment-other').find('.payTab_cont_area')
            .css('background-color', '#fff');
        $('.pay_cont').closest('#target_payment > .accodion_box_cont.payment-other').find('.payTab_cont_area')
            .css('display', 'none'); // 20220120 추가
        $('.pay_cont').closest('#target_payment > .accodion_box_cont.payment-other').find('.pay_cont_tail').css(
            'display', 'none'); // 20220121 추가
        $('.pay_cont').closest('#target_payment > .accodion_box_cont.apay-loose').find('.pay_cont_tail').css(
            'display', 'block'); // 20220927 수정
        $('.payTab.v2 > #payment-other').closest('.payTab.v2').find('.payTab_button_area').css('display', 'none');
        $('.pay_cont').closest('#target_payment > .accodion_box_cont.apay-loose').find('.payTab_cont_area').css(
            'display', 'block');
        $('.pay_cont').closest('#target_payment > .accodion_box_cont.payment-other').find('.payTab_cont_area')
            .css('border-top', 'none');
        $('.payTab.v2 > #payment-other').prop('checked', false);
    });

    $('.payTab4').on('click', function () {
        $('.payTab1, .payTab2, .payTab3, .payTab5').removeClass('on');
        $('.pay_cont').closest('#target_payment > .accodion_box_cont.payment-other').find('.payTab_cont_area')
            .css('display', 'block'); // 20220120 추가
        $('.pay_cont').closest('#target_payment > .accodion_box_cont.apay-loose').find('.payTab_cont_area').css(
            'display', 'none'); // 20220120 추가
        $('.pay_cont').closest('#target_payment > .accodion_box_cont.payment-other').find('.pay_cont_tail').css(
            'display', 'block'); // 20220927 수정
        $('.pay_cont').closest('#target_payment > .accodion_box_cont.apay-loose').find('.pay_cont_tail').css(
            'display', 'none'); // 20220121 추가
        $('.pay_cont').closest('#target_payment > .accodion_box_cont.apay-loose').css('background-color', '#fff');
        $('.pay_cont').closest('#target_payment > .accodion_box_cont.payment-other').css('background-color',
            '#f4f4f4');
        $('.pay_cont').closest('#target_payment > .accodion_box_cont.payment-other .payTab_cont_area').css(
            'border-top', '1px solid #d7d7d7')
    });

    $('.pay_cont.creditCard > .card-method > .payment-item-f.withLineB > .point-tit.withTooltip > #chk_p_02').on('click',
        function () {
            $(this).closest('.payment-item-f.withLineB').siblings('.cont_card_detail').toggle();
            $(this).closest('.payment-item-f.withLineB').siblings('.cont_card_detail').find('#paymentType02_01').prop(
                'checked', true);
        });

    $('#creditCardKind').change(function () {
        var result = $('#creditCardKind option:selected').val();
        if ($(window).width() > 769 && result == 'C02') {
            $('.bonus_use_area').css('display', 'inline-block');
            $('.pay_cont.creditCard > .row.card-method > .form_group_a > .payment-item-a').css('padding-bottom',
                '10px');
            $('.pay_cont.creditCard > .row.card-method > .form_group_a > .payment-item-a:nth-child(2)').css(
                'padding-bottom', '20px');
        } else if ($(window).width() < 768 && (result == 'C02')) {
            $('.bonus_use_area').css('display', 'inline-block');
            $('.pay_cont.creditCard > .row.card-method > .form_group_a > .payment-item-a').css('padding-bottom',
                '0');
            $('.pay_cont.creditCard > .row.card-method > .form_group_a > .payment-item-a:nth-child(2)').css(
                'padding-bottom', '20px');
        } else {
            $('.bonus_use_area').hide();
            $('.pay_cont.creditCard > .row.card-method > .form_group_a > .payment-item-a:nth-child(1)').css(
                'padding-bottom', '10px');
        };
    });

    // 클릭앤콜렉트 탭메뉴 클릭시 배송방법 숨김	
    $('.tab-toggle-wrap').find('.tab-toggle').on('click', function () {
        $(this).parents('.tabs_block_wrap').siblings('.accodion_box.accodion_aclickuser').css('display', 'block');
        $(this).parents('.tabs_block_wrap').siblings('.accodion_box.accodion_aclickaddr').css('display', 'block');
    });

    $('.tab-toggle-wrap.cac').find('.tab-toggle').on('click', function () {
        $(this).parents('.tabs_block_wrap').siblings('.accodion_box.accodion_aclickuser').css('display', 'none');
        $(this).parents('.tabs_block_wrap').siblings('.accodion_box.accodion_aclickaddr').css('display', 'none');
    });

    // 모바일 결제하기버튼 floating 변경
    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();
        var footerHeight = $('footer').height();

        if (scrollTop >= $(document).height() - $(window).height() - footerHeight - 10) {
            // 20220222 payment 클래스 추가
            $('.box_mobile-floating.payment').addClass('inherit');
        } else {
            // 20220222 payment 클래스 추가
            $('.box_mobile-floating.payment').removeClass('inherit');
        }
    })


    // 20220216 쿠폰 영역 input입력 시에만 x버튼 활성화,글씨색 변경
    $('.accodion_coupon').find('.form_input').on('change keyup paste', function () {
        $(this).addClass('on');
        var couponInput = $('.accodion_coupon').find('.form_input.on')
        var val = couponInput.val();

        if (val == '') {
            couponInput.parent('.form_input_area').removeClass('valid');
        } else {
            couponInput.parent('.form_input_area').addClass('valid');
        }
    })

    // 20220404 유상봉투 선택영역
    $('.pickup-bag-box').find('#chk_p_02').on('click', function () {
        if ($(this).is(':checked')) {
            $(this).prop('checked', true);
            $('.pickup-bag-box').addClass('open')
        } else {
            $(this).prop('checked', false);
            $('.pickup-bag-box').removeClass('open')
        }
    })

    toolTips_open();

    /* S : 20220927 A Pay 확산 공동사업자 관련 스크립트 추가 */
    if($('#apay_partner1').hasClass('on')){
        $('.payTab_button_area a.payTab1').attr('data-tab','apayaccount1');
        $('.payTab_button_area a.payTab3').attr('data-tab','apaycreditcard1');
    }

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
        } else if($('#apay_partner2').hasClass('on')) {
            $('.payTab_button_area a.payTab1').attr('data-tab','apayaccount2');
            $('.payTab_button_area a.payTab3').attr('data-tab','apaycreditcard2');
        }

        if ($(this).hasClass('on')) {
            $(this).parents('.apay_partner_cont').find('#' + elem + '_cont').show();
        }
    });		
    /* E : 20220927 A Pay 확산 공동사업자 관련 스크립트 추가 */
});

var payments = payments || {};
var payments = function () {
    var tabArea = $('.tabs_block_wrap'),
        tabMenu = tabArea.find('.tab-toggle');
    payMenu = $('#target_payment .payTaba');

    var tabHandler = function () {
        tabMenu.on('click', function (e) {
            e.preventDefault();
            $(this).parent().addClass('active');
            $(this).parent().siblings().removeClass('active');
            var tabID = $(this).attr('href'),
                tabContent = $(this).parents('.order-items-toggle').find('.tab-content');
            tabContent.addClass('collapse');
            tabContent2 = $(this).parents('.layer-area_container').find('.tab-content');
            tabContent2.addClass('collapse');
            $(tabID).removeClass('collapse');
        })
    }

    var payHandler = function () {
        payMenu.on('click', function (e) {
            e.preventDefault();
            $(this).addClass('on');
            $(this).siblings().removeClass('on');
            var tabContent = $(this).attr('data-tab');
            $('.pay_cont').hide();
            $('.pay_cont.target_' + tabContent).show();
        })
    }

    var radioTabHandler = function () {
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
    }

    var toggleHandler = function () {
        payMenu.on('click', function (e) {
            e.preventDefault();
            $(this).addClass('on');
            $(this).siblings().removeClass('on');
            var tabContent = $(this).attr('data-tab');
            $('.pay_cont').hide();
            $('.pay_cont.target_' + tabContent).show();
        })
    }

    var abcHandler = function () {
        $('.abc_step li span').each(function (i) {
            $(this).click(function (e) {
                e.preventDefault();
                $(this).parent().addClass('on');
                $(this).parent().siblings().removeClass('on');
                $('.step_detail_cont').hide();
                $('.step_detail_cont0' + (i + 1)).show();
            })

        })
    }

    /* S : input 데이터 입력 시, 다음 포커스 이동 */
    // var nextFocus = function(nfevent, thisObj) {
	// 	var e = nfevent || window.event;
	// 	var keyCode = e.keyCode ? e.keyCode : e.which;

	// 	if((keyCode >= 48 && keyCode <=57) || (keyCode >= 96 && keyCode <=105) || (keyCode == 229 || keyCode == 0)) {
	// 		var charLimit = thisObj.attr("maxlength");
	// 		if(thisObj.val().length == charLimit){
	// 			e.preventDefault();
	// 			var nextInput = thisObj.data("next");
	// 			if(nextInput.length > 0) {
	// 				$("#" + nextInput).focus();	
	// 			}
	// 		}
	// 	}
	// }
    /* E : input 데이터 입력 시, 다음 포커스 이동 */

    var init = function () {
        tabHandler();
        payHandler();
        toggleHandler();
        radioTabHandler();
        abcHandler();
        //nextFocus(); /* 20220824 추가 */
    }
    init();

}

/* 장바구니,주문결제 툴팁 */
function promotionTooltip() {
    if (!$('.tooltip-btn').length) {
        return;
    }

    $('.tooltip-btn').each(function () {
        var _this = $(this);

        //다른 툴팁 찾기
        var parentsRow = _this.parents('.product-list-item');
        var $parentsSiblings = parentsRow.siblings('.product-list-item').find('.promotion-tip-alert');
        //this
        var $promotionTip = _this.parents('.promotion').find('.promotion-tip-alert');
        var $tip_closeBtn = $promotionTip.find('.tip-close');

        _this.on('click', function () {
            //열린 툴팁 닫기
            $parentsSiblings.hide();

            if ($promotionTip.is(':hidden')) {
                $promotionTip.show();
            } else if ($promotionTip.is(':visible')) {
                $promotionTip.hide();
            }
        });

        $tip_closeBtn.on('click', function () {
            $promotionTip.hide();
        });
    });
}

/* 주문결제  : STEP 여백조정 */
function stepBox_Remargin() {
    var _winWidth = $(window).width();
    var _stepBox = $('.shipping-delivery').find('.checkout-steps');
    if (!_stepBox.length) {
        return;
    }

    if (_winWidth < 769) {
        _stepBox.css({
            'width': _winWidth,
            'margin-left': '-15px'
        });
    }
    if (_winWidth > 768) {
        _stepBox.attr('style', '');
    }
}

/* 주문결제 : floating box */
function orderSummaryFixed() {
    var cartSummary = $('.shipping-delivery .shipping-delivery-summary');
    var orderFinish = $('.cart-items-wrapper .confirm-box'); //주문완료 페이지

    if (!cartSummary.length || orderFinish.length) {
        return;
    }

    function fixedBox_order() {
        //target position : top
        var wScrollTop = $(window).scrollTop();
        var headerHeight = 139;
        var headerBtmSpace = $('.breadcrumb-section').outerHeight(true);
        var topAreaHeight = headerHeight + headerBtmSpace;

        //target position : right
        var _winWidth = $(window).width();
        var conWidth = $('.shipping-delivery .row').width(); //content width
        var positionRight = (_winWidth - conWidth) / 2;

        if ($('.shipping-delivery').is('.sopInstantPayment')) {
            positionRight = (_winWidth - conWidth - 30) / 2;
        }

        /* -- 중간 멈춤 위치 찾기 -- */
        //주문결제 div
        var targetWrapper = $('.shipping-delivery');
        var targetWrap_top = targetWrapper.offset().top;
        var targetWrap_btm = targetWrapper.position().top + targetWrapper.outerHeight(true); //bottom

        //주문회원정보 (floating div)
        var targetObj = $('.shipping-delivery-summary');
        var targetObj_H = targetObj.outerHeight(true);

        //재설정 위치값
        var compareTop = targetWrap_btm - targetObj_H; //1063
        var targetReTOP = compareTop - targetWrap_top + headerHeight;
        var $cartContent = targetObj.parent().find('.cart-items-wrapper');

        if (_winWidth > 768) {
            //기본높이 부여
            if ($cartContent.length && targetObj_H > 400) {
                $cartContent.css({
                    'min-height': targetObj_H
                });
            }
            if (wScrollTop > compareTop) {
                $('.shipping-delivery-summary').css({
                    'position': 'absolute',
                    'top': targetReTOP - 7, //bottom line 맞추는 보정값 7px
                    'right': '0'
                });
            } else if (wScrollTop > topAreaHeight) {
                $('.shipping-delivery-summary').css({
                    'position': 'fixed',
                    'top': headerHeight,
                    'right': positionRight
                });
            } else {
                targetObj.attr('style', '');
            }
        } else if (_winWidth < 769) {
            targetObj.attr('style', '');
        }
    }
    $(window).on('resize', function () {
        if ($(window).width() > 768) {
            $('html, body').scrollTop(0);
        }
        //fixedBox_order();  2019-11-07
    });
    $(window).scroll(function () {
        //fixedBox_order();  2019-11-07
    });
}

/* 주문,장바구니 (옵션,프로모션 박스 width 조정) */
function gwpGiftSelections() {
    if ($('.faxOrder-prdt-list').length) {
        return;
    } //온라인팩스주문에서 return;

    var _ItemOptions = $('.gwp-gift-selections');
    var _PromOptions = $('.view-bundle-contents');

    function ItemReSize() {
        _ItemOptions.each(function () {
            //상품옵션 parent에 class추가
            var _thisParent = $(this).parent('.product-item-element.list-item-info'); //상품명 div
            _thisParent.addClass('hasOptionBox');

            //상품옵션 div 가로사이즈
            var colWidth_list;
            var _this_Parents = $(this).parents('.shopping-cart-item-list .product-list-item'); //li

            var _winWidth = $(window).width();
            if (_winWidth < 769) {
                $(this).attr('style', '');
            } else if (_winWidth < 901) {
                colWidth_list = _this_Parents.width() * 0.53;
                $(this).css({
                    'width': colWidth_list
                });
            } else {
                colWidth_list = _this_Parents.width() * 0.45;
                $(this).css({
                    'width': colWidth_list
                });
            }
        });

        _PromOptions.each(function () {
            //상품옵션 parent에 class추가
            var _thisParent = $(this).parent('.product-item-element.list-item-info'); //상품명 div
            _thisParent.addClass('hasOptionBox');

            //상품옵션 div 가로사이즈
            var colWidth_list;
            var _this_Parents = $(this).parents('.shopping-cart-item-list .product-list-item'); //li

            var _winWidth = $(window).width();
            if (_winWidth < 769) {
                $(this).attr('style', '');
            } else if (_winWidth < 901) {
                colWidth_list = _this_Parents.width() * 0.7;
                $(this).css({
                    'width': colWidth_list
                });
            } else {
                colWidth_list = _this_Parents.width() * 0.6;
                $(this).css({
                    'width': colWidth_list
                });
            }
        });
    }

    ItemReSize();
    $(window).resize(function () {
        ItemReSize();
    });
}

/* 온라인 FAX 주문 - 툴팁 : size 조정 */
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
                    'width': '',
                    'max-width': 'none'
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

/* 온라인 FAX 주문 - 툴팁열기 */
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

/* 온라인 FAX 주문 - 안내글 토글 */
function toggleBox_Guide() {
    var guideboxToggle = $('.js-guidebox-toggle');
    if (!guideboxToggle.length) {
        return
    }

    guideboxToggle.each(function () {
        var _titBtn = $(this).find('a.title');
        var _hiddenBox = $(this).find('.tgg-hidden-area');

        if ($(this).is('.on')) {
            _hiddenBox.show();
        } else {
            _hiddenBox.hide();
        }

        _titBtn.on('click', function (e) {
            e.preventDefault();
            if (_hiddenBox.is(':hidden')) {
                $(this).parent().addClass('on');
                $(this).find('span').text('닫기');
                _hiddenBox.show();
            } else if (_hiddenBox.is(':visible')) {
                $(this).parent().removeClass('on');
                $(this).find('span').text('열기');
                _hiddenBox.hide();
            }
        });
    });
}
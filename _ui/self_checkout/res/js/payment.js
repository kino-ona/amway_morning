$(function() {

    /* 포인트 타입 선택 */
    $(".point-type > li").click(function() {
        const idx = $(this).index();
        $(".point-type > li, .point-box > ul").removeClass("on");
        $(this).addClass("on");
        $(".point-box > ul").eq(idx).addClass("on");
    })

    $(".payment-wr button[class*='pay']").click(function() {
        $(".payment-wr button[class*='pay']").removeClass("on");
        $(this).addClass("on");

        // 일시불 선택시 할부 선택 해제
        if($(this).hasClass("btn-pay-single") === true) {
            $("input[name='installment']").prop("checked", false);
        }
    })

    // 할부 선택시 일시불 선택 해제
    $("input[name='installment']").click(function() {
        const payIst = $(this).parents(".installment-wr").find(".btn-pay-ist");
        if(payIst.hasClass("on") === false) {
            $(".btn-pay-single").removeClass("on");
            payIst.addClass("on");
        }
    })

    const chkPopup = $("body").find(".simple-keyboard").length;
    if(chkPopup != 0) {
        initKeyboard('point'); // 키보드 초기화
    }
})

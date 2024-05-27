$(function() {

    /* 삭제 체크여부 */
    $(".modify-wr input[type='checkbox']").change(function() {
        let chk = $(this).prop("checked");

        if(chk == true) {
            $(this).parent().siblings().css("opacity", "0.1");
        }else {
            $(this).parent().siblings().css("opacity", "1");
        }
    })
})

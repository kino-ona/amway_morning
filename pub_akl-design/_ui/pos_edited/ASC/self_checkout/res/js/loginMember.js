$(function() {

    /* 이미지 애니메이션 */
    const imgs = $(".img-right > img").length;
    let i=0;
    setInterval(function() {
        if(i == imgs) {
            i=0;
        }
        $(".img-right > img").hide();
        $(".img-right > img").eq(i).show();
        i++;
    }, 2000);

    const chkPopup = $("body").find(".simple-keyboard").length;
    if(chkPopup != 0) {
        initKeyboard('default'); // 키보드 초기화
    }

})

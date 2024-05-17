function countDown(e) {
    const cnt = parseInt($(e).siblings("input[type='number']").val());
    if(cnt != 0) {
        $(e).siblings("input[type='number']").val(cnt-1);
    }
}
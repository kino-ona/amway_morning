$(() => {
    
    const Keyboard = window.SimpleKeyboard.default;
    let optionsNumber = {
            layoutName: "default",
            maxLength: 11,
            layout: {
            'default': [
                '1 2 3 4',
                '5 6 7 8',
                '9 0 {bksp} {rmv}',
                '{enter}'
            ],
        },
        onRender : () => {
            $(".hg-button-bksp").html("<img src='../res/image/icn_backspace.png'>"); // bksp 이미지 변경
            $(".hg-button-rmv").html("전체 삭제");
            $(".hg-button-enter > span").text("확인");
            $(".hg-button-enter").addClass("disabled");
        },
        onKeyPress: button => {
            if (button == '{rmv}') {
                myKeyboard.clearInput();
                $(".hg-button-enter").addClass("disabled");
            }
        },
        onChange: input => {
            const inputVal = addHyphen(input);
            $(".input-val").val(inputVal);
            if ($(".input-val").val() != "") {
                $(".hg-button-enter").removeClass("disabled");
            } else {
                $(".hg-button-enter").addClass("disabled");
            }
        },
    }

    let myKeyboard;
    myKeyboard = new Keyboard({...optionsNumber});
})
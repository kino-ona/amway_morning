function initKeyboard(type) {
    const Keyboard = window.SimpleKeyboard.default;

    // let optionsDefault = {
    //     layout: {
    //       'default': [
    //         '1 2 3 4 5 6 7 8 9 0',
    //         'Q W E R T Y U I O P',
    //         'A S D F G H J K L',
    //         'Z X C V B N M {bksp} {enter}',
    //       ],
    //     },
    //     onRender : () => {
    //         $(".hg-button-bksp").html("<img src='../assets/images/common/image/icn_backspace.png' style=width:73px>"); // bksp 이미지 변경
    //         $(".hg-button-enter > span").text("입력완료");
    //     },
    //     onChange: input => {
    //         $(".input-val").val(input);
    //     },
    //     onKeyPress: button => {
    //         if(button == '{enter}') {
    //             $("#popup-wr").fadeOut(300);
    //         }
    //     },
    // }

    let optionsPoint = {
        layout: {
          'default': [
            '1 2 3 4',
            '5 6 7 8',
            '9 0 {bksp} {enter}',
          ],
        },
        onRender : () => {
            $(".hg-button-bksp").html("<img src='../assets/images/common/icn_backspace.png' style=width:73px>"); // bksp 이미지 변경
            $(".hg-button-enter > span").text("전체삭제");
        },
        onChange: input => {
            $(".input-val").val(input);
        },
    }

    let myKeyboard;
    let inputVal;
    if(type == 'default') {
        myKeyboard = new Keyboard({...optionsDefault});
    }else if(type == 'certification') {
        myKeyboard = new Keyboard({...optionsPoint});
    }

    const subType = myKeyboard.keyboardDOM.previousElementSibling.classList;
    if(subType.contains('phone-number')) {
        myKeyboard.setOptions({
            maxLength: 8,
            onChange: input => {
                inputVal = addHyphen(input);
                $(".input-val").val(inputVal);
                if(input === '') {
                    $('.input-val').removeClass('active');
                    $('.pre-filled-text').removeClass('active2');
                } else {
                    $('.input-val').addClass('active');
                    $('.pre-filled-text').addClass('active2');
                }

                if(input.length === 8) {
                    $('.simple-certification-button').addClass('active2');
                } else {
                    $('.simple-certification-button').removeClass('active2');
                }
            },
            onKeyPress: button => {
                if(button == '{enter}') {
                    myKeyboard.clearInput();
                }
            },
        })
    } else if(subType.contains('pickup-counts')) {
        myKeyboard.setOptions({
            maxLength: 3,
            onChange: input => {
                $(".input-val").val(input);
                if(input === '') {
                    $('.input-val').removeClass('active');
                } else {
                    $('.input-val').addClass('active');
                }

                if(input > 0) {
                    $('.simple-certification-button').addClass('active2');
                } else {
                    $('.simple-certification-button').removeClass('active2');
                }

            },
            onKeyPress: button => {
                if(button == '{enter}') {
                    myKeyboard.clearInput();
                }
            },
        })
    
    } else if(subType.contains('order-numbers')) {
        myKeyboard.setOptions({
            maxLength: 12,
            onChange: input => {
                inputVal = addHyphen2(input);
                $(".input-val").val(inputVal);
                if(input === '') {
                    $('.input-val').removeClass('active');
                } else {
                    $('.input-val').addClass('active');
                }

                if(input > 0) {
                    $('.simple-certification-button').addClass('active2');
                } else {
                    $('.simple-certification-button').removeClass('active2');
                }

            },
            onKeyPress: button => {
                if(button == '{enter}') {
                    myKeyboard.clearInput();
                }
            },
        })
    
    }else {
        myKeyboard.setOptions({
            maxLength: 6,
            onChange: input => {
                $(".input-val").val(input);
                if(input === '') {
                    $('.input-val').removeClass('active');
                } else {
                    $('.input-val').addClass('active');
                }

                if(input.length === 6) {
                    $('.simple-certification-check').addClass('active2');
                } else {
                    $('.simple-certification-check').removeClass('active2');
                }
            },
            onKeyPress: button => {
                if(button == '{enter}') {
                    myKeyboard.clearInput();
                }
            },
        })
    }

}


function addHyphen(phone) {
    phone = phone.replace(/[^0-9]/g, '');
    let tmp = '';
    if( phone.length < 5){
      return phone;
    } else{
        tmp += phone.substr(0, 4);
        tmp += '-';
        tmp += phone.substr(4);
        return tmp;
    }
}

function addHyphen2(oderNumber) {
    oderNumber = oderNumber.replace(/[^0-9]/g, '');
    let tmp = '';
    if( oderNumber.length < 4){
      return oderNumber;
    } else{
        tmp += oderNumber.substr(0, 3);
        tmp += '-';
        tmp += oderNumber.substr(3);
        return tmp;
    }
}
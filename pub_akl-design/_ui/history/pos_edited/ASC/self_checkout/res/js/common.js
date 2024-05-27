$(function() {

    $("header").load("/_header.html");

    const hash = location.hash;
    if(hash == '#loading') {
        $("#loading-wr").show();
    }

    /* 팝업 */
    $(".btn-open-pop").click(function() {
        $(".blue-bg").hide();
        $("#popup-wr").show();
    })
    $(".btn-close").click(function() {
        $(this).parents("#popup-wr").hide();
        $(".blue-bg").show();
    })
    // 20220726 A-Pay 확산 추가 수정
    $(".btn-confirm").click(function() {
        $("#popup_card-info").addClass('active');
        $("#popup_card-info").css('display', 'block');
        $("#popup_card-info").css('z-index', '10000');
        $('#uiLayerMask').addClass('on');
    })
    $(".btn_layer-close").click(function() {
        $("#popup_card-info").removeClass('active');
        $("#popup_card-info").css('display', 'none');
        $("#popup_card-info").css('z-index', '9999');
        $('#uiLayerMask').removeClass('on');
    })
})

function initKeyboard(type) {
    const Keyboard = window.SimpleKeyboard.default;

    let optionsDefault = {
        layout: {
          'default': [
            '1 2 3 4 5 6 7 8 9 0',
            'Q W E R T Y U I O P',
            'A S D F G H J K L',
            'Z X C V B N M {bksp} {enter}',
          ],
        },
        onRender : () => {
            $(".hg-button-bksp").html("<img src='../res/image/icn_backspace.png'>"); // bksp 이미지 변경
            $(".hg-button-enter > span").text("입력완료");
        },
        onChange: input => {
            $(".input-val").val(input);
        },
        onKeyPress: button => {
            if(button == '{enter}') {
                $("#popup-wr").fadeOut(300);
            }
        },
    }

    let optionsPoint = {
        layout: {
          'default': [
            '1 2 3 4',
            '5 6 7 8',
            '9 0 {bksp} {enter}',
          ],
        },
        onRender : () => {
            $(".hg-button-bksp").html("<img src='../res/image/icn_backspace.png'>"); // bksp 이미지 변경
            $(".hg-button-enter > span").text("입력");
        },
        onChange: input => {
            $(".input-val").val(input);
        },
        onKeyPress: button => {
            if(button == '{enter}') {

            }
        },
    }

    let myKeyboard;
    let inputVal;
    if(type == 'default') {
        myKeyboard = new Keyboard({...optionsDefault});
    }else if(type == 'point') {
        myKeyboard = new Keyboard({...optionsPoint});
    }
    const subType = myKeyboard.keyboardDOM.previousElementSibling.classList;
    if(subType.contains('phone-number')) {
        myKeyboard.setOptions({
            maxLength: 13,
            onChange: input => {
                inputVal = addHyphen(input);
                $(".input-val").val(inputVal);
            },
        })
    }else if(subType.contains('use-point')) {
        myKeyboard.setOptions({
            onChange: input => {
                inputVal = priceToStr(input);
                $(".input-val").val(inputVal);
            },
        })
    }else if(subType.contains('cms-pw')) {
        myKeyboard.setOptions({
            maxLength: 6,
            onRender : () => {
                $(".hg-button-bksp").html("<img src='../res/image/icn_backspace.png'>"); // bksp 이미지 변경
                $(".hg-button-enter > span").text("확인");
            },
        })
    }else {
        myKeyboard.setOptions({
            maxLength: 10,
        })
    }

}



function countUp(e) {
    const cnt = parseInt($(e).siblings("input[type='number']").val());
    $(e).siblings("input[type='number']").val(cnt+1);
}
function countDown(e) {
    const cnt = parseInt($(e).siblings("input[type='number']").val());
    if(cnt != 0) {
        $(e).siblings("input[type='number']").val(cnt-1);
    }
}
function initCount(e) {
    $(e).siblings("li").find("input[type='number']").val(0);
}
function openPopup(type) {
    $("#popup-wr .popup-cont").empty();
    $("#popup-wr .popup-cont").load(`/Amway/popup/scan/${type}.html`);
}
function priceToStr(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function addHyphen(phone) {
    phone = phone.replace(/[^0-9]/g, '');
    let tmp = '';
    if( phone.length < 4){
      return phone;
    }else if(phone.length < 7){
      tmp += phone.substr(0, 3);
      tmp += '-';
      tmp += phone.substr(3);
      return tmp;
    }else if(phone.length < 11){
      tmp += phone.substr(0, 3);
      tmp += '-';
      tmp += phone.substr(3, 3);
      tmp += '-';
      tmp += phone.substr(6);
      return tmp;
    }else{
      tmp += phone.substr(0, 3);
      tmp += '-';
      tmp += phone.substr(3, 4);
      tmp += '-';
      tmp += phone.substr(7);
      return tmp;
    }
    return phone;
}

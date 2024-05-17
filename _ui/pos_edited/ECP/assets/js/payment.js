$(function () {
  if ($("body").find(".simple-keyboard").length != 0) {
    initKeyboard("certification"); // 키보드 초기화

    //인증 번호 타이머
    if($('.certification-numbers').length !== 0 ) {
      let timer2 = '3:00';
      let interval = setInterval(callback, 1000);
  
      function callback() {
        let timer = timer2.split(":");
        let minutes = parseInt(timer[0], 10);
        let seconds = parseInt(timer[1], 10);
  
        --seconds;
        minutes = seconds < 0 ? --minutes : minutes;
        if (minutes === 0 && seconds === 0) clearInterval(interval);
        seconds = seconds < 0 ? 59 : seconds;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        $(".count-number").html(minutes + ":" + seconds);
        timer2 = minutes + ":" + seconds;
      }
  
      $('.simple-certification-refresh').on('click' , () => {
        clearInterval(interval);
        timer2 = '3:00';
        interval = setInterval(callback, 1000);
      })
    }
  }

  //AMWY-ECP-E00.html 픽업 주문 건수
  if($('.number-button').length !== 0) {
    $('input').on('click' , (event) => {
      if(event.target.id === 'self') {
        location.href='AMWY-ECP-F00.html';
      } else {
        location.href='AMWY-ECP-G00.html';
      }
    })
  }

  if($("body").find(".simple-certification").length != 0) {
    //AMWY-ECP-D00.html 인증번호 확인
    // $('.simple-certification-check').on('click', event => {
    //   if(event.target.classList[2] === 'active2') {
    //     location.href='AMWY-ECP-E00.html';
    //   }
    // })
  }
});

window.addEventListener('load', function(){
  const numberSelctor = document.querySelector('.quantity-number');
  const minusSelectorClassList =  document.querySelector('.quantity .minus');
  const plusSelctor = document.querySelector('.quantity .plus');


  /* 초기 세팅 */
  if (Number(numberSelctor.innerText) < 2) {
    minusSelectorClassList.classList.add('no-active');
  }

  /* 교환 수량 선택 버튼 */
  plusSelctor.addEventListener('click', () => {
    let countData = Number(numberSelctor.innerText);

    if(countData > 0) {
      minusSelectorClassList.classList.remove('no-active');
    }
    if(countData > 9999) {
      return false;
    }
    
    numberSelctor.innerHTML = countData + 1;
  })

  minusSelectorClassList.addEventListener('click', () => {
    let countData = Number(numberSelctor.innerText);

    if(countData <= 2) {
      minusSelectorClassList.classList.add('no-active');
      if( !(countData === 1) ) {
        numberSelctor.innerHTML = countData - 1;
      }
      return false;

    }else {
      numberSelctor.innerHTML = countData - 1;
    }
  })

  /* 교환내역 보기 버튼 */
  this.document.querySelector('.more-button').addEventListener('click', (target) => {
    target.currentTarget.classList.toggle('active');
    target.currentTarget.parentElement.nextElementSibling.classList.toggle('active');
  })
});
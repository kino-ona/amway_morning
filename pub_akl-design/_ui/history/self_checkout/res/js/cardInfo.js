$(function() {
    /* 무이자 할부 정보 슬라이더 */
    const swiper = new Swiper('.swiper-container.info-cont', {
      // Optional parameters
      direction: 'vertical',
      // loop: true,
      speed : 500,
      slidesPerView: 4, //20220120 수정
      slidesPerGroup : 4, //20220120 수정
      watchOverflow:true, // 슬라이드 1개일때 네비게이션 숨김
      // loopFillGroupWithBlank : true,

      // Navigation arrows
      navigation: {
          nextEl: '.info-list .swiper-button-next',
          prevEl: '.info-list .swiper-button-prev',
      },
      pagination: {
          el: '.info-list .swiper-pagination',
          type: 'bullets',
      },
      on: {
          init: function () {
              setTimeout(function() {
                  const total = $(".info-list .swiper-pagination > span").length;
                  $(".info-list .swiper-count").append(`<span class='active-idx'>1</span>/<span class='total-idx'>${total}</span>`);
              }, 300);
          },
          slideChange: function () {
            const activeIndex = $(".info-list .swiper-pagination .swiper-pagination-bullet-active").index();
            $(".info-list .active-idx").text(activeIndex+1);
          },
      },
    });
})

$(function() {

    /* 스캔 목록 슬라이더 */
    const swiper = new Swiper('.swiper-container.scan-cont', {
      // Optional parameters
      direction: 'vertical',
      loop: true,
      speed : 500,
      slidesPerView: 5,
      slidesPerGroup : 5,
      watchOverflow:true, // 슬라이드 1개일때 네비게이션 숨김
      loopFillGroupWithBlank : true,

      // Navigation arrows
      navigation: {
        nextEl: '.scan-list .swiper-button-next',
        prevEl: '.scan-list .swiper-button-prev',
      },
      pagination: {
          el: '.scan-list .swiper-pagination',
          type: 'bullets',
        },

      on: {
          init: function () {
              setTimeout(function() {
                  $(".scan-list .swiper-slide").each(function() {
                      const target = parseInt($(this).attr("data-swiper-slide-index")) + 1;
                      if(target%5 == 0) {
                          $(this).css("border-bottom", 0);
                      }
                  })
                  const total = $(".scan-list .swiper-pagination > span").length;
                  $(".scan-list .swiper-count").append(`<span class='active-idx'>1</span>/<span class='total-idx'>${total}</span>`);

              }, 300);
          },
          slideChange: function () {
            const activeIndex = $(".scan-list .swiper-pagination .swiper-pagination-bullet-active").index();
            $(".scan-list .active-idx").text(activeIndex+1);
          },
      },
    });

    /* 봉투 선택 */
    $(".bag-list > li").click(function() {
        $(".bag-list > li").removeClass("on");
        $(this).addClass("on");
    })


    /* 쿠폰 슬라이더 */
    const swiper2 = new Swiper('.swiper-container.coupon-cont', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        speed : 500,
        slidesPerView: 2,
        slidesPerGroup : 2,
        spaceBetween : 20,
        watchOverflow:true, // 슬라이드 1개일때 네비게이션 숨김
        loopFillGroupWithBlank : true,
        pagination:false,
        // Navigation arrows
        navigation: {
          nextEl: '.coupon-slider .swiper-button-next',
          prevEl: '.coupon-slider .swiper-button-prev',
        },
    });

    /* 쿠폰 선택 */
    $(".coupon-list > li").click(function() {
        const chk = $(this).hasClass("on");
        if(chk === true) {
            $(this).removeClass("on");
            $(this).find("input[type='checkbox']").attr("checked", false);
            $(".coupon-list > li").css("opacity", "1");
        }else {
            $(".coupon-list > li").removeClass("on");
            $(".coupon-list > li").css("opacity", "0.1");
            $(".coupon-list > li").find("input[type='checkbox']").attr("checked", false);
            $(this).addClass("on");
            $(this).find("input[type='checkbox']").attr("checked", true);
        }
    })


    /* 구매수량 제한 슬라이더 */
    const swiper3 = new Swiper('.swiper-container.warn-cont', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        speed : 500,
        slidesPerView: 1,
        watchOverflow:true, // 슬라이드 1개일때 네비게이션 숨김
        pagination: {
            el: '.warn-slider .swiper-pagination',
            type: 'bullets',
          },
        // Navigation arrows
        navigation: {
          nextEl: '.warn-slider .swiper-button-next',
          prevEl: '.warn-slider .swiper-button-prev',
        },
        on: {
            init: function () {
                setTimeout(function() {
                    const total = $(".popup-warn .swiper-pagination > span").length;
                    $(".popup-warn .swiper-count").append(`<span class='active-idx'>1</span>/<span class='total-idx'>${total}</span>`);
                }, 300);
            },
            slideChange: function () {
              const activeIndex = $(".popup-warn .swiper-pagination .swiper-pagination-bullet-active").index();
              $(".popup-warn .active-idx").text(activeIndex+1);
            },
        },
    });

})

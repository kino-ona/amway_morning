$(function() {
    /* 스캔 목록 슬라이더 */
    if($('.scan-list .swiper-slide').length > 5) {
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
    }else {
      const swiper = new Swiper('.swiper-container.scan-cont', {
        // Optional parameters
        direction: 'vertical',
        loop: true,
        speed : 500,
        slidesPerView: 5,
        slidesPerGroup : 5,
        watchOverflow:true, // 슬라이드 1개일때 네비게이션 숨김
        loopFillGroupWithBlank : true,
  
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
                  console.log(total);
                  $(".scan-list .swiper-count").append(`<span class='active-idx'>1</span>/<span class='total-idx'>1</span>`);

              }, 300);

              $('.swiper-button-next').addClass('disabled');
              $('.swiper-button-prev').addClass('disabled');
          },
          slideChange: function () {
            const activeIndex = $(".scan-list .swiper-pagination .swiper-pagination-bullet-active").index();
            $(".scan-list .active-idx").text(activeIndex+1);
          },
        },
      });
    }
})

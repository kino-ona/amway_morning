$(document).ready(function(e){
    // SOP 상단 탭메뉴 클릭 시 동작
    $(".tab-toggle-wrap a").on("click", function(){
        $(".product-select-tab > a").parent().removeClass("active");
        $(".product-select-tab > a").parent().eq(0).addClass("active");
    })

    // '제품선택' 탭 내 컨텐츠에서 상단 메뉴명 탭 클릭 시, 배너 포커싱 이동
    $(".product-select-tab > a").on("click",function(e){
        e.preventDefault();
        $(".product-select-tab > a").parent().removeClass("active");
        $(this).parent().addClass("active");
        // $('html, body').animate({scrollTop : $(this.hash).offset().top - $('header').height()}, 1000);
        
        var sop_sel_tab = $(this).attr('href').split('#')[1];
        if (sop_sel_tab == 'nutrilite') {
            $('html, body').animate({
                scrollTop: $('.product-select-list-nutrilite').offset().top - $('header').height()
            }, 1000);
        } else if (sop_sel_tab == 'mylab') {
            $('html, body').animate({
                scrollTop: $('.product-select-list-mylab').offset().top - $('header').height()
            }, 1000);
        } else if (sop_sel_tab == 'artistry') {
            $('html, body').animate({
                scrollTop: $('.product-select-list-artistry').offset().top - $('header').height()
            }, 1000);
        /* 2024.03 마이 웰니스 분석권 주문 수정사항 반영 작업*/
        } else if (sop_sel_tab == 'mywellnessLab') {
            $('html, body').animate({
                scrollTop: $('.product-select-list-mywellness-lab').offset().top - $('header').height()
            }, 1000);
        }
    })

    // 'SOP안내' 페이지에서 '제품선택' 페이지 이동 후, sop 배너 포커싱 이동
    var sop_page_url = window.location.href;
    var sop_page_id = sop_page_url.substring(sop_page_url.lastIndexOf("#") + 1);
    var sop_hd_mgt = $('main').css('margin-top').replace(/[^0-9]/g, "");
    var sop_hd_pdt = $('main').css('padding-top').replace(/[^0-9]/g, "");

    if (window.innerWidth > 768) {
        if (sop_page_id == 'nutrilite') {
            $('html, body').animate({
                scrollTop: $('.product-select-list-nutrilite').offset().top - sop_hd_mgt
            }, 1000);
        } else if (sop_page_id == 'mylab') {
            $('html, body').animate({
                scrollTop: $('.product-select-list-mylab').offset().top - sop_hd_mgt
            }, 1000);
        } else if (sop_page_id == 'artistry') {
            $('html, body').animate({
                scrollTop: $('.product-select-list-artistry').offset().top - sop_hd_mgt
            }, 1000);
        /* 2024.03 마이 웰니스 분석권 주문 수정사항 반영 작업*/
        } else if (sop_page_id == 'mywellnessLab') {
            $('html, body').animate({
                scrollTop: $('.product-select-list-mywellness-lab').offset().top - sop_hd_mgt
            }, 1000);
        }
    } else {
        if (sop_page_id == 'nutrilite') {
            $('html, body').animate({
                scrollTop: $('.product-select-list-nutrilite').offset().top - sop_hd_mgt - sop_hd_pdt
            }, 1000);
        } else if (sop_page_id == 'mylab') {
            $('html, body').animate({
                scrollTop: $('.product-select-list-mylab').offset().top - sop_hd_mgt - sop_hd_pdt
            }, 1000);
        } else if (sop_page_id == 'artistry') {
            $('html, body').animate({
                scrollTop: $('.product-select-list-artistry').offset().top - sop_hd_mgt - sop_hd_pdt
            }, 1000);
        /* 2024.03 마이 웰니스 분석권 주문 수정사항 반영 작업*/
        } else if (sop_page_id == 'mywellnessLab') {
            $('html, body').animate({
                scrollTop: $('.product-select-list-mywellness-lab').offset().top - sop_hd_mgt - sop_hd_pdt
            }, 1000);
        }
    }
});
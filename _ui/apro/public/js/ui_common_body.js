/* version 0.5 | 2020-08-28 */

/*==========================================================
   기본
==========================================================*/
/*------------------------------------------------
   기본 - 로드
------------------------------------------------*/
/* load */
$(window).on('load', function(){
    new mainSize(); // 화면사이즈 정의
    domAfterLoad() // 비동기대응 로드  
});

function check(){
    // 환경변수
    var $thisTabPack = $('.tab_pack.type_scroll'); // 탭팩
        $thisTabGroup = $thisTabPack.children('.tab_btn_item'), // 탭버튼 그룹			
        $thisTabContsGroup = $thisTabGroup.siblings('.tab_conts_item'), // 탭컨텐츠 그룹
        $thisTabNaviBar = $thisTabGroup.children('.navi_bar'), // 탭내비게이션
        ArryThisTab = $thisTabGroup.children('.tab_btn');	// 탭버튼[배열]

    // 초기 옵셋위치값 할당
    if( $thisTabPack.hasClass('type_scroll') ){
        $thisTabContsGroup.children('.tab_conts').each(function(){
            var $thisConts = $(this);                
        //   $thisConts.data('offsetTop', $thisConts.offset().top );
            console.log( $thisConts.data('offsetTop') );
        });
    };  
}


/*==========================================================
   반응형
==========================================================*/
/*------------------------------------------------
   반응형 - 리사이즈
------------------------------------------------*/
/* resize */
$(window).on('resize', function(){

    resizeFunc();

    // 리사이즈 펑션
    function resizeFunc(){
        var breakPoint = 1024,
            nowDevice = $(window).outerWidth() >= breakPoint ? 'pc' : 'mobile',
            initDevice = $('body.apro').data('device');
             
        // 디바이스 체크
        if( initDevice == nowDevice ){
            responsiveResize(); // 디바이스 동일시 실행펑션
        }else{
            $('body.apro').data('device', nowDevice); // 디바이스 정보갱신
            responsiveResizeDevice();  // 디바이스 전환시 실행펑션
        };
    };
});


/*------------------------------------------------
   반응형 - 스크롤
------------------------------------------------*/
/* scroll */
$(window).on('scroll', function(){
    responsiveScroll(); // 스크롤펑션   
});
/* version 0.5 | 2020-08-28 */

/*==========================================================
   비동기펑션(돔생성 후 실행)
==========================================================*/
/* 비동기펑션 */
var domAfterLoad = function(){
    var NumWinScrollTop = $(window).scrollTop(); // 공통변수(스크롤위치)

    // 컴포넌트기능 영역
    $('.custom_list_pack').customListFunc();  // 커스텀리스트기능
    $('input[type="text"]').inputFunc();  // 인풋기능
    $('input[type="search"]').inputFunc();  // 검색기능
    $('input[type="password"]').inputPwFunc();  // 20200916 패스워드 비밀번호보기 기능추가
    $('.input_pack.type_datepicker input').datepickerFunc(); // 데이트피커기능
    $('.accordion_pack').accordionFunc();  // 아코디언기능
    $('.calendar_pack').calendarFunc();  // 캘린더기능
    $('.tab_pack').tabFunc()  // 탭기능
    $('.toggle_pack').toggleFunc();  // 토글기능

    // 헤더기능 영역
    $('.header_menu').totalMenuFunc();   // 전체메뉴기능
    $('.header_category').categoryFunc();  // 헤더카테고리기능   
    $('.search_form').searchBoxFunc(); // 검색박스기능
    
    // 콘텐츠기능 영역
    $('.type_util').utilFixedFunc( NumWinScrollTop ); 

    // PC화면기능 영역
    fixedContentsFunc(); // 화면고정 콘텐츠 정의
};



/*==========================================================
   반응형펑션
==========================================================*/
/*------------------------------------------------
    반응형펑션 - 리사이즈(디바이스 동일시 실행펑션)
------------------------------------------------*/
var responsiveResize = function(){    
    var NumWinScrollTop = $(window).scrollTop(); // 공통변수(스크롤위치)
    
    
    // 콘텐츠기능 영역
    $('.type_fixed').contentsFixedFunc( NumWinScrollTop );  // 고정탭 스크립트이벤트
    $('.type_util').utilFixedFunc( NumWinScrollTop ); 

    // 컴포넌트기능 영역
    $('.tab_pack').resizeTabFunc() // 탭 옵셋탑 재할당
};


/*------------------------------------------------
    반응형펑션 - 리사이즈(디바이스 전환시 실행펑션)
------------------------------------------------*/
var responsiveResizeDevice = function(){
    // 초기값
    new mainSize(); // 화면사이즈 정의

    var NumWinScrollTop = $(window).scrollTop(); // 공통변수(스크롤위치)

    // 콘텐츠기능 영역
    $('.type_fixed').contentsFixedFunc( NumWinScrollTop );  // 고정탭 스크립트이벤트
    $('.type_util').utilFixedFunc( NumWinScrollTop ); 
    
    // PC화면기능 영역
    fixedContentsFunc(); // 화면고정 콘텐츠 정의
    fixedContentsScrollFunc( NumWinScrollTop );  // 화면고정 콘텐츠 스크롤이벤트

    // 컴포넌트기능 영역
    $('.tab_pack').resizeTabFunc() // 탭 옵셋탑 재할당


    // 헤더기능 영역
    $('.header_menu').totalMenuFunc();   // 202011030 전체메뉴기능 이동
    totalMenuResizeFunc() // 20201103 디바이스 변경시 전체메뉴기능 스크립트추가
};


/*------------------------------------------------
    반응형펑션 - 스크롤
------------------------------------------------*/
var responsiveScroll = function(){
    // 공통변수
    var NumWinScrollTop = $(window).scrollTop();

    // 함수
    $('.type_fixed').contentsFixedFunc( NumWinScrollTop ); // 고정탭 스크립트이벤트
    $('.type_util').utilFixedFunc( NumWinScrollTop ); 
    $('.tab_pack').scrollTabFunc( NumWinScrollTop );
    fixedContentsScrollFunc( NumWinScrollTop );  // 화면고정 콘텐츠 스크롤이벤트
    headerBorderFunc( NumWinScrollTop );
};



/*==========================================================
    초기로드
==========================================================*/
/*------------------------------------------------
    초기로드 - 메인사이즈
------------------------------------------------*/
/* 초기로드 - 메인사이즈 */
var mainSize = function () {
    this.init();
};
mainSize.prototype = {
    init: function() {
        this.setVar();
        this.setSize();
      },   
    setVar: function() {        
        // 레아아웃 선택자
        this.apro = $('body.apro');
        this.header = $('.apro .layout .header');
        this.headerWrap = $('.apro .layout .header');
        this.container = $('.apro .layout .container');
        this.fixedBottom = $('.apro .layout .container .contents .fixed_bottom_area');
        this.containerBottom = $('.apro .layout .container_bottom');
        this.footer = $('.apro .layout .footer');
        this.footerWrap = $('.apro .layout .footer .footer_wrap');
        
        // 디바이스체크
        this.device = $(window).outerWidth() >= 1024 ? 'pc' : 'mobile';
        this.scrFixed = $(document).find('.common_dim').length > 0 || $(document).find('.category_dim').length > 0 ? true : false;

        // 레아아웃 사이즈
        this.headerH = this.headerWrap.outerHeight();
        this.containerBottomH = this.containerBottom.outerHeight();      
        this.fixedBottomH = this.device == 'mobile' ? this.fixedBottom.outerHeight() : 0;
        this.footerWrap.css({'padding-bottom': 0}); // 플로팅영역 패딩초기화
        this.footerH = typeof this.footer.outerHeight() == 'undefined' ? 0 : this.footer.outerHeight();
    },
    setSize: function() {
        this.apro.data({ 'device': this.device, 'scrTop': $(window).scrollTop(), 'scrFixed': this.scrFixed, 'winH': $(window).outerHeight(), 'winW': $(window).outerWidth() });
        this.footer.css({ 'margin-top': -this.footer.outerHeight() });
        this.footerWrap.css({ 'padding-bottom': this.fixedBottomH });
        this.container.css({ 'padding-top': this.headerH, 'padding-bottom': this.footerH + this.containerBottomH});	
        this.containerBottom.css({ 'bottom': this.footer.outerHeight() })
   },   
};



/*==========================================================
    공통사용펑션
==========================================================*/
/*------------------------------------------------
    메인화면 보더펑션 - 20201104
------------------------------------------------*/
/*  메인화면 보더펑션 */
function headerBorderFunc( NumWinScrollTop ){
    var apro = $('body.apro'),
        header = apro.find('.header'),
        searchFrom = apro.find('.search_form');

    var isMain = $(document).find('.main_area');

    if( isMain.length > 0 && !searchFrom.hasClass('active') ){
        if( NumWinScrollTop >= 30 ){
            header.addClass('type_border');
        }else if( NumWinScrollTop < 30 && NumWinScrollTop >= 0 ){
            header.removeClass('type_border');
        };
    };
};

/*------------------------------------------------
    공통사용펑션 - 바디영역스크롤(on/off)
------------------------------------------------*/
/*  공통사용펑션 - 바디영역스크롤ON */
function scrollFixedOnFunc(){
    var apro = $('body.apro'),
        layout = apro.find('.layout'),
        header = apro.find('.header'),
        pcFixed = apro.find('.pc_fixed'),
        totalMenu = apro.find('.total_menu'),
        scrTop = Math.max( $(window).scrollTop(), $('body').scrollTop() ),
        scrTarget;

    var scrollBarW = window.innerWidth - document.documentElement.clientWidth,
        deviceCheck = $('body.apro').data('device');

    $(window).scrollTop() > $('body').scrollTop() ? scrTarget = $(window) : scrTarget = $('body');
    if( !apro.data('scrFixed') ){
        apro.data({'scrFixed': true, 'scrPos': scrTop, 'scrTarget': scrTarget });

        // 모바일 스크롤넓이계산
        if( deviceCheck == 'mobile'){
            layout.css({ 'z-index': 10, 'position': 'fixed', 'top': -scrTop, 'left': 0, 'width': '100%'});

        // PC 스크롤넓이계산
        }else if( deviceCheck == 'pc'){
            layout.css({ 'z-index': 10, 'position': 'fixed', 'top': -scrTop, 'left': -scrollBarW/2, 'width': '100%', 'padding-right': '16px'});
            totalMenu.css({ 'left': -scrollBarW/2, 'width': 'calc(100% + '+scrollBarW/2+'px)' });
            header.css({ 'padding-right': scrollBarW/2, 'width': 'calc(100% + '+scrollBarW/2+'px)' });    
            pcFixed.css({'transform': 'translate('+ -scrollBarW/2 +'px, 0)'});
        };
    };    
};

/*  공통사용펑션 - 바디영역스크롤OFF */
function scrollFixedOffFunc(){

    var apro = $('body.apro'),
        layout = apro.find('.layout'),
        header = apro.find('.header'),
        pcFixed = apro.find('.pc_fixed'),
        totalMenu = apro.find('.total_menu'),
        commonDim = $(document).find('.common_dim');

    var scrollBarW = window.innerWidth - document.documentElement.clientWidth,
        deviceCheck = $('body.apro').data('device');

    if( commonDim.length > 1 ) return;
    if( apro.data('scrFixed') || totalMenu.hasClass('active') ){  
                
        // 모바일 스크롤넓이계산
        if( deviceCheck == 'mobile'){

        // 모바일 스크롤넓이계산
        }else if( deviceCheck == 'pc'){
            totalMenu.css({'left': 0 });
            header.attr('style', '');
        };
        
        layout.attr('style', ''); 
        pcFixed.css({'transform': 'none'}); // 20201103 초기화 옵션수정
        apro.data('scrTarget').scrollTop( apro.data('scrPos') );                        
        apro.removeData('scrPos');        
        apro.data('scrFixed', false);        
    };
};


/*------------------------------------------------
    공통사용펑션 - PC플로팅콘텐츠(초기값)
------------------------------------------------*/
/*  공통사용펑션 - PC플로팅콘텐츠(초기값) */
function fixedContentsFunc(){
    var $contents = $('.apro .layout .container .contents'),
        $containerBottom = $('.apro .layout .container .container_bottom');

        $contents.removeAttr('style') // 콘텐츠 높이값 초기화

    var contensH = $contents.outerHeight(),
        containerBottomH = $containerBottom.outerHeight();

    if( $contents.length == 0 ) return;

    // 데이터비동기 대응
    $contents.removeAttr('style');
    
    var device = $('body.apro').data('device'),
        initTop = $contents.offset().top;

    var fixedConts = $(document).find('.pc_fixed'),
        fixedContsLen = fixedConts.length,
        fixedContsH = 0;

    // PC 디바이스
    if( device  == 'pc' ){
        // 플로팅콘텐츠 위치값세팅
        for( var i = 0; i < fixedContsLen; i++ ){
            if( i > 0) initTop = initTop + fixedConts.eq(i - 1).outerHeight(true);
            fixedConts.eq(i).data({'initTop': initTop, 'nowTop': initTop });
            fixedConts.eq(i).css({'top': initTop});
        };

        // 플로팅콘텐츠 총사이즈
        for( var i = 0; i < fixedContsLen; i++ ){
            fixedContsH = fixedContsH + fixedConts.eq(i - 1).outerHeight(true);
        };
        
        // 기능추가(플로팅메뉴가 콘텐츠크기보다 클경우의 값) 
        containerBottomH > 0 ? containerBottomH = containerBottomH - 50 : containerBottomH = containerBottomH;

        if( contensH + containerBottomH < fixedContsH ) {
            $contents.css({'min-height': fixedContsH - containerBottomH });
        }

    // 모바일 디바이스
    }else if( device == 'mobile' ){

        // 플로팅콘텐츠 위치값세팅
        for( var i = 0; i < fixedContsLen; i++ ){
            fixedConts.eq(i).css({'top': 0});
        };
    };
};


/*------------------------------------------------
    공통사용펑션 - PC플로팅콘텐츠(스크롤)
------------------------------------------------*/
/*  공통사용펑션 - PC플로팅콘텐츠(스크롤) */
var smallScrValue = 0;
function fixedContentsScrollFunc( NumWinScrollTop ){
    if( $(document).find('.contents').length == 0 || $('body.apro').data('device') == 'mobile' ) return;
    
    // 스크롤방향 설정
    var scrDir,
        scrPrev = $('body.apro').data('scrTop');
        NumWinScrollTop > scrPrev ? scrDir = 'down' : scrDir = 'up';
        
    var $contents = $('.apro .layout .container .contents'),
        $containerBottom = $('.apro .layout .container .container_bottom');

    // 사이즈 & 위치
    var $winH = $(window).outerHeight(),
        initTop = $contents.offset().top;
    
    //  높이설정
    var fixedConts = $(document).find('.pc_fixed'),
        fixedContsLen = fixedConts.length,
        fixedContsH = 0;

    // 플로팅콘텐츠 총사이즈
    for( var i = 0; i < fixedContsLen; i++ ){
        fixedContsH = fixedContsH + fixedConts.eq(i - 1).outerHeight(true);
    };

    // 컨테이너바텀버튼영역 유무확인
    if( $containerBottom.outerHeight() > 0 ){        
        var $lastChild = $containerBottom.children(':last-child'),
            NumLastChildBottom = $lastChild.offset().top + parseInt($lastChild.css('padding-top')) + $lastChild.height(),
          
        NumContentsH = NumLastChildBottom - $contents.offset().top;
    }else{
        NumContentsH = $contents.outerHeight();
    }
    
    // 스크롤범위
    var scrGapValue,
        contsScope = initTop + NumContentsH,
        fixedContsScope = initTop + fixedContsH;

    var floatContsPB = 50;

    // 20200820 전체메뉴화면 픽스경우 스크롤 포지션 정의
    if( document.documentElement.scrollHeight === $winH ){
        NumWinScrollTop = scrPrev;
    };

    // 고정콘텐츠 > 브라우저사이즈
    if( fixedContsScope > $winH ){

        // 스크롤방향설정
        scrPrev < NumWinScrollTop ? scrDir = 'down' : scrDir = "up" ;

        // 공통사용변수
        var scrLimit = Math.abs( initTop + fixedContsH - $winH + floatContsPB );
            
        if( scrDir == "down"){ // 스크롤방향 down
                
            // 고정콘텐츠 최대값스크롤
            smallScrValue = Math.max( -scrLimit, smallScrValue - Math.abs( scrPrev -  NumWinScrollTop ) );
            
            // 고정콘텐츠 최대값스크롤
            contsScope <= fixedContsScope + NumWinScrollTop + smallScrValue ? scrGapValue = contsScope - (fixedContsScope + NumWinScrollTop + smallScrValue) : scrGapValue = 0;

        }else if( scrDir == "up"){ // 스크롤방향 up

            // 고정콘텐츠 최대값스크롤
            smallScrValue = Math.min( 0, smallScrValue + Math.abs( scrPrev -  NumWinScrollTop ) );
            
            // 고정콘텐츠 최대값스크롤
            contsScope <= fixedContsScope + NumWinScrollTop + smallScrValue ? scrGapValue = contsScope - (fixedContsScope + NumWinScrollTop + smallScrValue ) : scrGapValue = 0;
        };

    // 고정콘텐츠 <= 브라우저사이즈
    }else if( fixedContsH <= $winH ){

        // 오차계산값
        smallScrValue = 0;
        contsScope <= fixedContsScope + NumWinScrollTop ? scrGapValue = contsScope - (fixedContsScope + NumWinScrollTop) : scrGapValue = 0;        
    };

    // 플로팅콘텐츠 위치값할당 
    fixedConts.each(function(){
        var $this = $(this);
        $this.css({'top' : $this.data('initTop') + scrGapValue  + smallScrValue });
    });

    $('body.apro').data('scrTop', NumWinScrollTop ); // 현재스크롤값 저장
};


/*------------------------------------------------
    공통사용펑션 - 딤영역(ID, type)
------------------------------------------------*/
/*  공통사용펑션 - 딤영역 */
function dimFunc(target, state){
    var $dim = $(document.createElement('DIV')).addClass('common_dim'); 

    if( target.prev('.common_dim').length == 0 && state == "show" ){        
        target.before( $dim );
        target.prev('.common_dim').css({'z-index': target.css('z-index') - 1 });

    }else if( state == "hide" ){
        target.prev('.common_dim').remove();
    };

    // 20200821 전체메뉴 딤 클릭시 전체메뉴 닫는 프로세스추가
    if( target.hasClass('total_menu') ){
        target.prev('.common_dim').off('click').on('click', function(){

            var winW = $(window).outerWidth(),
                $deviceCheck = $(document).find('body.apro').data('device'),
                headerMenu =  $(document).find('.header_menu');

                headerMenu.removeClass('active');
                target.removeClass('active');
                target.stop().animate({'left': -winW * 0.8}, 450, function(){
                    target.css({'display': 'none'});
                    if( $deviceCheck == 'mobile' ) dimFunc( target, 'hide');
                });
                
                scrollFixedOffFunc(); // 바디스크롤 고정
        });
    };
};


/*------------------------------------------------
    공통사용펑션 - 로딩
------------------------------------------------*/
/* 공통사용펑션 - 로딩온 */
function loadingOn(){
    var loadDiv = $(document).find('.loading_pack');

    if( !loadDiv.hasClass('active') ) loadDiv.addClass('active');
    scrollFixedOnFunc() // 바디스크롤 고정
};

/* 공통사용펑션 - 로딩오프 */
function loadingOff(){
    var loadDiv = $(document).find('.loading_pack');

    if( loadDiv.hasClass('active') ) loadDiv.removeClass('active');    
    if( $(document).find('.common_dim').length == 0 ) scrollFixedOffFunc() // 20200826 바디스크롤 고정(팝업 + 로딩등장시 스크롤제어 )
};



/*------------------------------------------------
    공통사용펑션 - 전체메뉴(20201103)
------------------------------------------------*/
/* 공통사용펑션 - 전체메뉴 */
function totalMenuResizeFunc(){

    var $headerMenuState = $('.header_menu'),
        $totalMenuBtn = $headerMenuState.find('.btn_pack button'),
        $totalMenu = $totalMenuBtn.closest('.layout').find('.total_menu');

    var winW = $(window).outerWidth(),
        headerH = $(document).find('.header').outerHeight(),
        menuLeft = -winW * 0.8;

    var $deviceCheck = $('body.apro').data('device');

    //  초기값
    if( $deviceCheck == 'pc'){
        $totalMenu.css({'display': 'none', 'top': headerH, 'left': 0 })
        $totalMenu.find('.accordion_pack').addClass('active');
        $totalMenu.find('.accordion_conts').css({'display': 'block'});        
        dimFunc( $totalMenu, 'hide');
    }else if( $deviceCheck == 'mobile' ){
        $totalMenu.css({'display': 'none', 'top': 0, 'left': menuLeft, 'width': '80%' }) // 20201102 전체메뉴 스크립트수정
        dimFunc( $totalMenu, 'hide'); 
    };
    
    if( $(document).find('.layer_active').length == 0 ) scrollFixedOffFunc(); // 20201103 스크롤고정 스크립트 해제(팝업조건문 추가)
    fixedContentsFunc(); // 픽스드 콘텐츠 초기값정렬
    fixedContentsScrollFunc( $(window).scrollTop() ); // 픽스드 콘텐츠 스크롤정렬
    $headerMenuState.removeClass('active');
};



/*==========================================================
    프로토타입
==========================================================*/
/*------------------------------------------------
    프로토타입 - 전체메뉴
------------------------------------------------*/
$.fn.totalMenuFunc = function(){
   
    var winW = $(window).outerWidth(),
        headerH = $(document).find('.header').outerHeight(),
        $deviceCheck = $(document).find('body.apro').data('device');
    
    var $headerMenuState = $(this),
        $totalMenuBtn = $headerMenuState.find('.btn_pack button'),
        $totalMenu = $totalMenuBtn.closest('.layout').find('.total_menu'),
        $totalMenuClose = $totalMenu.find('.total_menu_close .btn_pack button');
        
    var menuLeft = -winW * 0.8;              

    // 초기값 세팅
    if( $deviceCheck == 'pc'){
        $totalMenu.css({'display': 'none', 'top': headerH, 'left': 0 })
        $totalMenu.find('.accordion_pack').addClass('active');
        $totalMenu.find('.accordion_conts').css({'display': 'block'});
        dimFunc( $totalMenu, 'hide');   

    }else if( $deviceCheck == 'mobile' ){                    
        $totalMenu.css({'display': 'none', 'top': 0, 'left': menuLeft })
    };    

    if( typeof $headerMenuState.data('event') == 'undefined' ){
        $headerMenuState.data('device', $deviceCheck );
        
        $totalMenuBtn.on('click', function(){
            var $thisBtn = $(this),
                $deviceCheck = $(document).find('body.apro').data('device');
            var menuLeft = -winW * 0.8; 

            // 전체메뉴 열기
            if( $thisBtn.hasClass('icon_menu') ){
                $headerMenuState.addClass('active');
                $totalMenu.addClass('active');

                // pc 디바이스
                if( $deviceCheck == 'pc' ){
                    $totalMenu.stop().slideDown(450);

                // mobile 디바이스
                }else if( $deviceCheck == 'mobile'){
                    dimFunc( $totalMenu, 'show');
                    $totalMenu.css({'display': 'block'});
                    $totalMenu.stop().animate({'left': 0}, 450);                                        
                };

                scrollFixedOnFunc(); // 바디스크롤 고정
        
            // 전체메뉴(PC) 닫기
            }else if( $thisBtn.hasClass('icon_menu_close') ){

                // $totalMenu.hide();
                $headerMenuState.removeClass('active');
                $totalMenu.removeClass('active');
                $totalMenu.stop().slideUp(450);

                scrollFixedOffFunc(); // 바디스크롤 고정
            };
        });    

        // 전체메뉴(모바일) 닫기
        $totalMenuClose.on('click', function(){

            var winW = $(window).outerWidth(),
                $deviceCheck = $(document).find('body.apro').data('device');

            $headerMenuState.removeClass('active');
            $totalMenu.removeClass('active');
            $totalMenu.stop().animate({'left': -winW * 0.8}, 450, function(){
                $totalMenu.css({'display': 'none'});
                if( $deviceCheck == 'mobile' ) dimFunc( $totalMenu, 'hide');
            });
        
            scrollFixedOffFunc(); // 바디스크롤 고정
        });

        // 이벤트 바인딩 상태추가
        $headerMenuState.data('event', 'binding');
    };

    // 전체메뉴닫기 메소드
    return $headerMenuState.each(function(){

        this.close = function(){                        
            var $headerMenuState = $(this),
                $totalMenuBtn = $headerMenuState.find('.btn_pack button'),
                $totalMenu = $totalMenuBtn.closest('.layout').find('.total_menu');

            var winW = $(window).outerWidth(),
                $deviceCheck = $(document).find('body.apro').data('device'),
                headerH = $(document).find('.header').outerHeight(),
                menuLeft = -winW * 0.8;

            //  초기값
            if( $deviceCheck == 'pc'){
                $headerMenuState.removeClass('active');
                $totalMenu.css({'display': 'none', 'top': headerH, 'left': 0 })
                $totalMenu.find('.accordion_pack').addClass('active');
                $totalMenu.find('.accordion_conts').css({'display': 'block'});        
                dimFunc( $totalMenu, 'hide');
            }else if( $deviceCheck == 'mobile' ){
                $headerMenuState.removeClass('active');
                $totalMenu.css({'display': 'block', 'top': 0, 'left': menuLeft })
                dimFunc( $totalMenu, 'hide'); 
            }; 
      
            scrollFixedOffFunc(); // 바디스크롤 고정
        };
    });    
};


/*------------------------------------------------
    프로토타입 - 카테고리
------------------------------------------------*/
$.fn.categoryFunc = function(){
    var $category = $(this);

    $category.each(function(){        
        var $thisCategory = $(this),
            $thisHeader = $thisCategory.closest('.header'),
            $thisLayer = $thisCategory.closest('.layout'),
            $thisCategoryArea = $thisLayer.find('.category_area');

        if( typeof $thisCategory.data('event') == 'undefined' ){

            $thisCategory.on('off').on('click', function(){			
                var $thisCategoryHead = $(this);

                if( !$thisCategoryHead.hasClass('active') ){
                    var $dim = $(document.createElement('DIV')).addClass('category_dim');

                    if( $(document).find('.category_dim').length == 0 ) $thisCategoryArea.before( $dim );
                    $thisCategoryHead.addClass('active');
                    $thisCategoryArea.stop().slideDown(400);
                    $thisHeader.removeClass('type_border');
                    
                    scrollFixedOnFunc(); // 스크롤고정 스크립트
                }else{
                    $thisCategoryHead.removeClass('active');
                    $thisCategoryArea.stop().slideUp(400, function(){
                        $('.category_dim').remove();
                        $thisHeader.addClass('type_border');                        
                    });				
                    
                    scrollFixedOffFunc(); // 스크롤고정 스크립트
                };
            });

            var $thisCategoryAreaCategoryItem = $thisCategoryArea.find('.category_item');

            $thisCategoryAreaCategoryItem.off('click').on('click', function(){
                var $thisCategoryItem = $(this),
                    $thisCategoryItemText = $thisCategoryItem.text();

                // 텍스트변경
                $thisCategory.text( $thisCategoryItemText );

                // 데이터변경
                $thisCategoryAreaCategoryItem.removeClass('active');
                $thisCategoryItem.addClass('active');

                // 닫기프로세스
                $thisCategory.removeClass('active');
                $thisCategoryArea.stop().slideUp(400, function(){
                    $('.category_dim').remove();
                    $thisHeader.addClass('type_border');
                });
                
                scrollFixedOffFunc(); // 스크롤고정 스크립트
            });

            // 이벤트 바인딩 상태추가
            $thisCategory.data('event', 'binding');
        };
    });	
};


/*------------------------------------------------
    프로토타입 - 서치박스(20201104 기능수정)
------------------------------------------------*/
$.fn.searchBoxFunc = function(){
    var $searchBox = $(this),
        $searchBoxClose = $searchBox.find('.search_cancel .btn_pack button'),
        $searchBoxOpen = $searchBox.find('.search_util .icon_search_open');

    var header = $('body.apro .header')

    if( typeof $searchBox.data('event') == 'undefined' ){

        // 서치박스 열기
        $searchBoxOpen.on('click', function(){
            header.addClass('type_border');
            $searchBox.addClass('active');

        });

        // 서치박스 닫기
        $searchBoxClose.on('click', function(){
            var isMain = $(document).find('.main_area'),
                NumWinScrollTop = $(window).scrollTop();

            if( isMain.length > 0 && NumWinScrollTop < 30 ){
                header.removeClass('type_border');
            };
            
            $searchBox.removeClass('active');
        });

        // 이벤트 바인딩 상태추가
        $searchBox.data('event', 'binding');
    };
};


/*------------------------------------------------
    프로토타입 - 스크롤리더
------------------------------------------------*/
$.fn.scrollRead = function(){
    var $scrollRead = $(this),
        NumScrLimit = 30;

    $scrollRead.each(function(){
        var $this = $(this);

        // 약관스크롤 없을시
        if( $this.innerHeight() == $this[0].scrollHeight ){
            var n = 0;
            while ( n < 1){                            
                $this = $this.parent();
                n = $this.find('.type_reading_btn').length;
            };
            $this.find('.btn_pack.type_reading_btn button').removeAttr('disabled');
        };

        // 약관스크롤 있을시(이벤트 바인딩)
        if( typeof $this.data('event') == 'undefined' ){
            $this.on('scroll', function(){
                var scrT = $this.scrollTop(),
                    scrArea = $this[0].scrollHeight - $this.outerHeight(),
                    $parent = $this;
                
                if( (scrArea - scrT) < NumScrLimit ){
                    if( typeof $this.data('active') == 'undefined' ){
                        var n = 0;

                        while ( n < 1){                            
                            $parent = $parent.parent();
                            n = $parent.find('.type_reading_btn').length;
                        };
                        
                        $parent.find('.btn_pack.type_reading_btn button').removeAttr('disabled');
                        $this.data('active', true);
                    };
                };
            });

            // 이벤트 바인딩 상태추가
            $this.data('event', 'define');
        };
    });
};


/*------------------------------------------------
    프로토타입 - 스크롤고정콘텐츠
------------------------------------------------*/
$.fn.contentsFixedFunc = function( NumWinScorllTop ){

    var $scrollFixed = $(this);
    if( $scrollFixed.length == 0 ) return;

    var NumHeaderH = $('.header').outerHeight(),
        $parentsW = $scrollFixed.parent().outerWidth(),
        $parentsL = $scrollFixed.parent().offset().left;

    $scrollFixed.each(function(){
        var $thisFixed = $(this),
            NumThisH = $thisFixed.outerHeight(),
            StrFakeDiv = '<div class="fake_div" style="dispaly: none; height:' + NumThisH + 'px"></div>',
            NumThisOffsetTop;
        
        // 현 콘텐츠의 상태체크
        if( $thisFixed.hasClass('active') ){
            NumThisOffsetTop = $thisFixed.prev('.fake_div').offset().top;
        }else{							
            NumThisOffsetTop = $thisFixed.offset().top;
            if( $thisFixed.prev('.fake_div').length == 0 ) $thisFixed.before( StrFakeDiv );
        };        
        
        $thisFixed.data('offset_top', NumThisOffsetTop );

        // 스크롤값 설정
        if( NumWinScorllTop > $thisFixed.data('offset_top') - NumHeaderH ){
            $thisFixed.prev('.fake_div').show();
            $thisFixed.css({'top': NumHeaderH, 'left': $parentsL, 'width': $parentsW }).addClass('active');
        }else{
            $thisFixed.prev('.fake_div').hide();
            $thisFixed.attr('style', "").removeClass('active');
        };
    });
};


/*------------------------------------------------
    프로토타입 - 스크롤고정버튼
------------------------------------------------*/
$.fn.utilFixedFunc = function( NumWinScorllTop ){
    var $scrollFixed = $(this);
    if( $scrollFixed.length == 0 ) return;

    var $winH = $(window).outerHeight(),
        NumContentsPb = $(document).find('.contents_wrap').css('padding-bottom'),
        $deviceCheck = $(document).find('body.apro').data('device');

    // 스크롤값 설정    
    $scrollFixed.each(function(){
        var $thisFixed = $(this),
            NumThisH = $thisFixed.outerHeight(),
            StrFakeDiv = '<div class="fake_util_div" style="dispaly: none; height:' + ( NumThisH - parseInt( NumContentsPb ) ) + 'px"></div>';

        // 초기값
        if( typeof $thisFixed.data('event') == 'undefined' ){
            if( $thisFixed.prev('.fake_util_div').length == 0 ) $thisFixed.before( StrFakeDiv );
            // 이벤트 바인딩 상태추가
            $thisFixed.data('event', 'binding');
        };            
        // PC디바이스
        if( $deviceCheck == 'pc' ){
            $thisFixed.prev('.fake_util_div').show();

            var NumThisOffsetTop = $thisFixed.prev('.fake_util_div').offset().top;
                $parentsL = $thisFixed.prev('.fake_util_div').parent().offset().left;

            $thisFixed.data('offset_top', NumThisOffsetTop );
            $thisFixed.css({ 'left': $parentsL }).addClass('active');

            if( NumWinScorllTop + $winH - NumThisH > NumThisOffsetTop ){
                $thisFixed.css({ 'bottom': (NumWinScorllTop + $winH) - (NumThisH + NumThisOffsetTop) }).addClass('active');
            }else{
                $thisFixed.css({'bottom': 0})
            };
        
        // MOBILE디바이스
        }else if( $deviceCheck == 'mobile' ){
            $thisFixed.prev('.fake_util_div').hide();
            $thisFixed.attr('style', '');        
        };
    });
};



/*==========================================================
   컴포넌트
==========================================================*/
/*------------------------------------------------
   컴포넌트 - 인풋
------------------------------------------------*/
$.fn.inputFunc = function(){
    var $inputs = $(this);

    $inputs.each(function(){        
        var $thisInput = $(this);
            $thisInputPack = $thisInput.closest('.input_pack'),
            NumThisInputClear = $thisInputPack.find('.input_clear').length,
            NumThisInputTime = $thisInputPack.find('.input_time').length,
            StrClearBtn = '<span class="input_clear">문구삭제</span>';

        if( typeof  $thisInput.data('event') == 'undefined' ){

            // init 클리어버튼 셋팅
            if( NumThisInputClear == 0 && NumThisInputTime == 0 && !$thisInput.attr('disabled') && !$thisInput.attr('readonly') && !$thisInputPack.hasClass('type_datepicker') ){
                $thisInputPack.append( StrClearBtn );
            };
           
            // 인풋이벤트 바인딩
            $thisInput.off('focus keydown keyup focusout');
            
            // 포커스
            $thisInput.on('focus', function(){
                var $thisInput = $(this);

                if( $thisInput.val().length != 0 ){
                    var $thisInputClear = $thisInput.siblings('.input_clear');

                    $thisInputClear.css({'display': 'block'});
                };
            });

            // 포커스아웃
            $thisInput.on('focusout', function(){
                var $thisInput = $(this);
                var $thisInputClear = $thisInput.siblings('.input_clear');

                setTimeout(function(){
                    $thisInputClear.css({'display': 'none'});                    
                }, 150)
            });

            // 키다운, 키업
            $thisInput.on('keydown keyup', function(){
                var $thisInput = $(this),
                    $thisInputClear = $thisInput.siblings('.input_clear');
                
                $thisInputClear.css({'display': 'block'});
            });

            // 이벤트 바인딩 상태추가
            $thisInput.data('event', 'binding');
        };
    });	

    // 문구삭제 이벤트 바인딩
    $(document).find('.input_pack .input_clear').off('click').on('click', function(){
        var $thisInputClear = $(this),
            $thisInput = $thisInputClear.siblings('input'),
            $thisInputPlaceholder = $thisInput.attr('placeholder');

        $thisInput.val('').attr('placeholder', $thisInputPlaceholder );
        $thisInput.focus(); 
        $thisInputClear.css({'display': 'none'}); // 클리어버튼 숨기기
    });
};

/*------------------------------------------------
   컴포넌트 - 인풋(비밀번호)
------------------------------------------------*/
$.fn.inputPwFunc = function(){
    var $pwInputs = $(this);

    $pwInputs.each(function(){
        var $thisPwInput = $(this),
            $thisInputPack = $thisPwInput.closest('.input_pack'),            
            NumThisInputReveal = $thisInputPack.find('.input_reveal').length,
            StrRevealBtn = '<span class="input_reveal">문구삭제</span>';

        if( typeof  $thisPwInput.data('event') == 'undefined' ){

            // init 리빌버튼 셋팅
            if( NumThisInputReveal == 0 && !$thisPwInput.attr('disabled') && !$thisPwInput.attr('readonly') ){
                $thisInputPack.append( StrRevealBtn );
            }

            // 이벤트초기화
            $thisPwInput.off('focus keydown keyup focusout');
                        
            // 포커스
            $thisPwInput.on('focus', function(){
                var $thisInput = $(this);
                
                if( $thisInput.val().length != 0 ){                    
                    var $thisInputReveal = $thisInput.siblings('.input_reveal');
                    $thisInputReveal.css({'display': 'block'});
                };
            });

            // 포커스아웃
            $thisPwInput.on('focusout', function(){
                var $thisInput = $(this),
                    $thisInputReveal = $thisInput.siblings('.input_reveal');
                
                if( $thisInput.val().length == 0 ){
                    $thisInputReveal.css({'display': 'none'});
                };
            });

            // 키다운, 키업
            $thisPwInput.on('keydown keyup', function(){
                var $thisInput = $(this),
                    $thisInputReveal = $thisInput.siblings('.input_reveal');
                
                $thisInputReveal.css({'display': 'block'});
            });
         
            // 이벤트 바인딩 상태추가
            $thisPwInput.data('event', 'binding');
        };

        // 비밀번호 표시 이벤트
        $(document).find('.input_pack .input_reveal').off('click').on('click', function(){
            var $thisInputReveal = $(this),
                $thisInput = $thisInputReveal.siblings('input');

            if( $thisInput.attr('type') === 'password' ){
                $thisInput.attr('type', 'text');
                $thisInputReveal.addClass('active');
            }else{
                $thisInput.attr('type', 'password');
                $thisInputReveal.removeClass('active');
            };
                        
        });
    });
};

/*------------------------------------------------
   컴포넌트 - 탭
------------------------------------------------*/
$.fn.tabFunc = function(){
    var $tabPacks = $(this);

    $tabPacks.each(function(){
        // 환경변수
        var $thisTabPack = $(this); // 탭팩
            $thisTabGroup = $thisTabPack.children('.tab_btn_item'), // 탭버튼 그룹			
            $thisTabContsGroup = $thisTabGroup.siblings('.tab_conts_item'), // 탭컨텐츠 그룹
            $thisTabNaviBar = $thisTabGroup.children('.navi_bar'), // 탭내비게이션
            ArryThisTab = $thisTabGroup.children('.tab_btn');	// 탭버튼[배열]

        // 초기 옵셋위치값 할당
        if( $thisTabPack.hasClass('type_scroll') ){
            $thisTabContsGroup.children('.tab_conts').each(function(){
                var $thisConts = $(this);                
                $thisConts.data('offsetTop', $thisConts.offset().top );
            });
        };        

        if( typeof $thisTabPack.data('event') == 'undefined' ){

            // 이벤트바인딩
            ArryThisTab.children('button').off('click').on('click', function(){
                var $thisTabBtn = $(this),
                    $thisTabPack = $thisTabBtn.closest('.tab_pack'),			
                    $thisTabBtnParent = $thisTabBtn.closest('.tab_btn'),
                    $thisTabGroup = $thisTabBtnParent.closest('.tab_btn_item'),
                    $thisNavi = $thisTabBtnParent.siblings('.navi_bar'),
                    $thisTabContsGroup = $thisTabGroup.siblings('.tab_conts_item'),
                    NumTabBtnIdx = $thisTabBtnParent.index();

                // 탭기능(스크롤탭)                
                if( !$thisTabPack.hasClass('type_scroll') ){
                    $thisTabBtnParent.siblings('.tab_btn').removeClass('active');
                    $thisTabBtnParent.addClass('active');
                };
                
                $thisTabContsGroup.children('.tab_conts').removeClass('active');
                $thisTabContsGroup.children('.tab_conts').eq(NumTabBtnIdx).addClass('active');

                // 스크롤 인터렉션
                // $thisTabGroup.stop(true).animate({
                //     'scrollLeft' : $thisTabGroup.scrollLeft() + ($thisTabBtn.position().left + $thisTabBtn.outerWidth()/2) - ($thisTabGroup.outerWidth()/2) 
                // }, 500 )
                
                // 내비게이션 인터렉션
                if( !$thisNavi.hasClass('active') ) $thisNavi.addClass('active');
                if( !$thisTabPack.hasClass('type_scroll') ) naviBar($thisNavi);
                // naviBar($thisNavi);
                
                // 스크롤탭유형
                var $thisTabPack = $thisTabBtn.closest('.tab_pack');
        
                if( $thisTabPack.hasClass('type_scroll') ){
                    var NumHeaderH = $('.header').outerHeight(),
                        NumTabBtnH = $thisTabGroup.outerHeight(),
                        NumTabOffsetTop = $thisTabContsGroup.children('.tab_conts').eq(NumTabBtnIdx).offset().top;

                    $('html, body').stop().animate({'scroll-top': NumTabOffsetTop - NumTabBtnH - NumHeaderH }, 700);
                };
            });

            // 리사이즈
            $(window).on('resize', function(){
                naviBar($thisTabNaviBar);    
            });

            // 이벤트 바인딩 상태추가
            $thisTabPack.data('event', 'binding');
        };

        // 20200827 사파리 인터프리터 딜레이
        // 내비게이션 init
        if( $thisTabNaviBar.length != 0 ){
            setTimeout(function(){ // 20201028 "setimeout()=>{}" 제거(ES6)
                naviBar($thisTabNaviBar);
                tabBtnScr($thisTabNaviBar);
            }, 10);
        };

        // 내비게이션 인터렉션 펑션
        function naviBar( thisNavi ){
            if( thisNavi.length != 0 ){
                var $thisNavi = thisNavi,
                    $thisTabGroup = $thisNavi.closest('.tab_btn_item'),
                    $thisActiveTab = $thisNavi.siblings('.tab_btn.active'),
                    $thisActiveTabBtn = $thisActiveTab.children('button');

                $thisNavi.css({
                    'opacity': 1,
                    'left': $thisTabGroup.scrollLeft() + $thisActiveTabBtn.position().left + ($thisActiveTabBtn.outerWidth()/2) - ($thisActiveTabBtn.width()/2),
                    'width': $thisActiveTabBtn.width()
                });
            };
        };

        // 스크롤 인터렉션
        function tabBtnScr( thisNavi ){
            var $thisTabBtn = thisNavi;
                $thisTabGroup = $thisTabBtn.parent();

            $thisTabGroup.stop(true).animate({
                'scrollLeft' : $thisTabGroup.scrollLeft() + ($thisTabBtn.position().left + $thisTabBtn.outerWidth()/2) - ($thisTabGroup.outerWidth()/2) 
            }, 500,  'linear' );
        };
    });
};

/*------------------------------------------------
   컴포넌트 - 탭 - 스크롤이벤트
------------------------------------------------*/
/* 탭 - 스크롤이벤트 */
$.fn.scrollTabFunc = function( NumWinScorllTop ){
    var $tabPacks = $(this);

    $tabPacks.each(function(){

        // 환경변수
        var $thisTabPack = $(this), // 탭팩
            $thisTabGroup = $thisTabPack.children('.tab_btn_item'), // 탭버튼 그룹		
            $thisTabContsGroup =  $thisTabPack.children('.tab_conts_item'), // 탭컨텐츠 그룹
            $thisTabContsGroupChildren =  $thisTabContsGroup.children('.tab_conts'), // 탭컨텐츠
            $thisTabContsGroupChildrenLen =$thisTabContsGroupChildren.length,
            $thisTabNaviBar = $thisTabGroup.children('.navi_bar'); // 탭내비게이션
        
        var NumHeaderH = $('.header').outerHeight(),
            NumTabBtnH = $thisTabGroup.outerHeight();

        var $startTabTop = $thisTabContsGroupChildren.eq(0).data('offsetTop')

        $thisTabNaviBar.addClass('active');

        // 20200820 스크롤 끝값변수(디바이스 콘텐츠 고려)
        var scrollEnd = document.documentElement.scrollHeight - document.documentElement.scrollTop == document.documentElement.clientHeight;
        

        // 현제위치상태체크
        for( var i = 0; i < $thisTabContsGroupChildrenLen; i++){

            var $nowTabTop = $thisTabContsGroupChildren.eq(i).data('offsetTop'),
                $nextTab = $thisTabContsGroupChildren.eq(i+1),
                $nextTabTop = $thisTabContsGroupChildren.eq(i+1).data('offsetTop');
            var $standard = NumWinScorllTop + NumHeaderH + NumTabBtnH + 1;
            

            // 스크롤이 끝나는 기점 $nextTab.length == 0;
            if( $startTabTop < $standard && $nextTab.length == 0 ){
                $thisTabGroup.children('.tab_btn').removeClass('active');
                $thisTabGroup.children().eq(i).addClass('active');
                tabBtnScr( $thisTabGroup.children().eq(i) )



                break;
            }else if( $nowTabTop < $standard && $standard <= $nextTabTop ){
                $thisTabGroup.children('.tab_btn').removeClass('active');

                if( scrollEnd ){
                    // console.log( scrollEnd )

                    $thisTabGroup.children().eq(i+1).addClass('active');
                    tabBtnScr( $thisTabGroup.children().eq(i+1) );
                }else{

                    // console.log( 'scrollNoEnd' );

                    $thisTabGroup.children().eq(i).addClass('active');
                    tabBtnScr( $thisTabGroup.children().eq(i) );
                };


                // console.log('option02')

                break
            };

        };
                
        naviBar($thisTabNaviBar);  // 내비바 초기선언
        

        // 내비게이션 인터렉션 펑션
        function naviBar( thisNavi ){
            if( thisNavi.length != 0 ){
                var $thisNavi = thisNavi,
                    $thisTabGroup = $thisNavi.closest('.tab_btn_item'),
                    $thisActiveTab = $thisNavi.siblings('.tab_btn.active'),
                    $thisActiveTabBtn = $thisActiveTab.children('button');

                $thisNavi.css({
                    'opacity': 1,
                    'left': $thisTabGroup.scrollLeft() + $thisActiveTabBtn.position().left + ($thisActiveTabBtn.outerWidth()/2) - ($thisActiveTabBtn.width()/2),
                    'width': $thisActiveTabBtn.width()
                });

            };
        };

        // 스크롤 인터렉션
        function tabBtnScr( thisNavi ){

            var $thisTabBtn = thisNavi;
                $thisTabGroup = $thisTabBtn.parent();

            $thisTabGroup.stop(true).animate({
                'scrollLeft' : $thisTabGroup.scrollLeft() + ($thisTabBtn.position().left + $thisTabBtn.outerWidth()/2) - ($thisTabGroup.outerWidth()/2) 
            }, 500,  'linear' );
        };
    });
};


/*------------------------------------------------
   컴포넌트 - 탭 - 리사이즈이벤트
------------------------------------------------*/
/* 탭 - 리사이즈이벤트 */
$.fn.resizeTabFunc = function(){
    var $tabPacks = $(this);

    $tabPacks.each(function(){
        // 환경변수
        var $thisTabPack = $(this); // 탭팩
            $thisTabContsGroup =  $thisTabPack.children('.tab_conts_item'); // 탭컨텐츠 그룹

        // 옵셋위치값 할당
        if( $thisTabPack.hasClass('type_scroll') ){
            $thisTabContsGroup.children('.tab_conts').each(function(){
                var $thisConts = $(this);

                $thisConts.data('offsetTop', $thisConts.offset().top );
            });
        };
    });
};


/*------------------------------------------------
   컴포넌트 - 토글
------------------------------------------------*/
$.fn.toggleFunc = function(){
    var $togglePacks = $(this);

    $togglePacks.each(function(){
        var $thisToggle = $(this),
            $thisToggleMenu = $thisToggle.find('.btn_pack button');

        if( typeof $thisToggle.data('event') == 'undefined' ){
            $thisToggleMenu.off('click').on('click', function(){	
                var $thisToggleBtn = $(this),
                    $thisToggleBtnParent = $thisToggleBtn.parent('.btn_pack'),
                    $thisToggle = $thisToggleBtnParent.closest('.toggle_pack');
                    
                // 필터토글
                if( $thisToggle.hasClass('type_filter') ){
                    var NumThisToggleLen = $thisToggle.find('.btn_pack').length;					

                    // 전체선택옵션
                    if( $thisToggleBtnParent.hasClass('all_option') ){
                        if( $thisToggleBtnParent.hasClass('active') ){
                            $thisToggleBtnParent.removeClass('active');
                            $thisToggleBtnParent.siblings('.btn_pack').removeClass('active');
                        }else{
                            $thisToggleBtnParent.addClass('active');
                            $thisToggleBtnParent.siblings('.btn_pack').addClass('active');
                        };
                    // 기본선택옵션
                    }else{
                        if( $thisToggleBtnParent.hasClass('active') ){
                            $thisToggleBtnParent.removeClass('active');
                        }else{
                            $thisToggleBtnParent.addClass('active');
                        };

                        var NumNowActive =  $thisToggle.find('.btn_pack.active').length -  $thisToggle.find('.btn_pack.all_option.active').length;	

                        // 필터옵션 상태체크
                        if( NumNowActive == NumThisToggleLen - 1 ){
                            $thisToggle.find('.btn_pack.all_option').addClass('active');
                        }else{
                            $thisToggle.find('.btn_pack.all_option').removeClass('active');
                        };
                    };

                // 멀티토글
                }else if( $thisToggle.hasClass('type_multi') ){	
                    $thisToggleBtnParent.addClass('active');
                    $thisToggleBtnParent.siblings('.btn_pack').removeClass('active');

                // 기본토글
                }else{		
                    if( $thisToggleBtnParent.index() == 0 ){
                        $thisToggle.removeClass('active');
                    }else{
                        $thisToggle.addClass('active');
                    };
                };
            });

            // 이벤트 바인딩 상태추가
            $thisToggle.data('event', 'binding');
        };
    });
};


/*------------------------------------------------
    컴포넌트 - 아코디언
------------------------------------------------*/
$.fn.accordionFunc = function(){
    var $accordionPacks = $(this);
    
    $accordionPacks.each(function(){        
        var $thisAccordion = $(this),
            $thisAccordionTitle = $thisAccordion.children('.accordion_list').children('.accordion_title'),
            $thisAccordionHandler = $thisAccordion.children('.accordion_list').children('.btn_pack').children('button'),
            $accordionContents = $thisAccordion.children('.accordion_conts');

        // 콘텐츠 노출/비노출 설정
        if( $thisAccordion.hasClass('active') ){
            $accordionContents.stop().slideDown(0);
        };

        if( typeof $thisAccordion.data('event') == 'undefined' ){


            if( $thisAccordion.parents().hasClass('total_menu_accordion') ){
                $thisAccordionTitle.off('click').on('click', function(){

                    // 20201028 PC디바이스의 경우 전체메뉴의 아코디언기능제거
                    var deviceCheck = $('body.apro').data('device');
                    if( deviceCheck == 'pc' ) return;

                    var $accordionHandler = $(this),
                        $accordionContents = $accordionHandler.closest('.accordion_list').siblings('.accordion_conts'),
                        $accordionHandlerParents = $accordionHandler.closest('.accordion_pack');
        
                    if( !$accordionHandlerParents.hasClass('active') && $accordionContents.children().length > 0 ){
                        $accordionHandlerParents.addClass('active');
                        $accordionContents.stop().slideDown(400, function(){

                            // 20201028 아코디언(확장/축소) 이벤트 완료 후 fixed콘텐츠 재정렬 fixed 콘텐츠 반응UI 기능추가
                            $('.type_util').utilFixedFunc( $(window).scrollTop() ); 
                            fixedContentsScrollFunc( $(window).scrollTop() );
                        });
                    }else{
                        $accordionHandlerParents.removeClass('active');
                        $accordionContents.stop().slideUp(400, function(){

                            // 20201028 아코디언(확장/축소) 이벤트 완료 후 fixed콘텐츠 재정렬 fixed 콘텐츠 반응UI 기능추가
                            $('.type_util').utilFixedFunc( $(window).scrollTop() ); 
                            fixedContentsScrollFunc( $(window).scrollTop() );
                        });
                    };
                });
            }
            $thisAccordionHandler.off('click').on('click', function(){
                var $accordionHandler = $(this),
                    $accordionContents = $accordionHandler.closest('.accordion_list').siblings('.accordion_conts'),
                    $accordionHandlerParents = $accordionHandler.closest('.accordion_pack');
    
                if( !$accordionHandlerParents.hasClass('active') && $accordionContents.children().length > 0 ){
                    $accordionHandlerParents.addClass('active');
                    $accordionContents.stop().slideDown(400, function(){

                        // 20201028 아코디언(확장/축소) 이벤트 완료 후 fixed콘텐츠 재정렬 fixed 콘텐츠 반응UI 기능추가
                        $('.type_util').utilFixedFunc( $(window).scrollTop() ); 
                        fixedContentsScrollFunc( $(window).scrollTop() );
                    });

                }else{
                    $accordionHandlerParents.removeClass('active');
                    $accordionContents.stop().slideUp(400, function(){

                        // 20201028 아코디언(확장/축소) 이벤트 완료 후 fixed콘텐츠 재정렬 fixed 콘텐츠 반응UI 기능추가
                        $('.type_util').utilFixedFunc( $(window).scrollTop() ); 
                        fixedContentsScrollFunc( $(window).scrollTop() );
                    });

                };
            });
            

            // 이벤트 바인딩 상태추가
            $thisAccordion.data('event', 'binding');
        };
    });
};


/*------------------------------------------------
    컴포넌트 - 커스텀리스트(뷸릿커스텀시)
------------------------------------------------*/
$.fn.customListFunc = function(){
    var $customList = $(this);
   
    $customList.each(function(){		
        var $this = $(this);
        var $thisBullet = $this.children('.custom_list_bullet');
        var $thisBulletW = $thisBullet.outerWidth();
        
        $this.css({'text-indent': -$thisBulletW, 'padding-left': $thisBulletW });
    });
};


/*------------------------------------------------
    컴포넌트 - 캘린더
------------------------------------------------*/
$.fn.calendarFunc = function(){
    var $calendar = $(this);

    $calendar.each(function(){
        var $thisCalendar = $(this),
            $thisCalendarTable = $thisCalendar.find('.calendar_table'),
            ArrCalendarTd = $thisCalendar.find('td');
      


        if( typeof $thisCalendar.data('event') == 'undefined' ){

            // 가로캘린더 초기값
            if( $thisCalendar.hasClass('type_horizon') ){
                var $today = $thisCalendar.find('td.type_selected'),
                    $todayLeft = $today.position().left;

                $thisCalendarTable.stop().animate({
                    'scrollLeft' : $thisCalendarTable.scrollLeft() + $today.position().left
                }, 400 );
            };

            // 읽기전용캘린더
            if( !$thisCalendar.hasClass('type_readonly') ){
                ArrCalendarTd.on('click', function(){
                    var $this = $(this);
        
                    // 클릭이벤트
                    if( !$this.hasClass('type_disabled') ){
                        $this.closest('tbody').find('td').removeClass('type_selected');
                        $this.addClass('type_selected');
        
                        // 가로모드 스크롤 이벤트
                        if( $thisCalendar.hasClass('type_horizon') ){
                            $thisCalendarTable.stop().animate({
                                'scrollLeft' : $thisCalendarTable.scrollLeft() + $this.position().left + ($this.outerWidth()/2) - ($thisCalendarTable.outerWidth()/2)
                            }, 400 );
                        };
                    };
                });
            };

            // 20200902 월선택캘린더
            if( $thisCalendar.hasClass('type_monthpicker') ){
                  
                var $thisDate = $thisCalendar.find('.calendar_date'),
                    $thisMonthPicker = $thisCalendar.find('.calendar_monthpicker'),
                    $thisMonth = $thisMonthPicker.find('.month');
                
                // 날짜선택
                $thisDate.off('click').on('click', function(){
                    if($thisMonthPicker.hasClass('active')){
                        $thisMonthPicker.removeClass('active');
                    }else{
                        $thisMonthPicker.addClass('active');
                    }
                });

                // 월선택
                $thisMonth.off('click').on('click', function(){
                    $thisMonthPicker.removeClass('active');
                })               

            };
        
            // 이벤트 바인딩 상태추가
            $thisCalendar.data('event', 'binding');
        };
    });
};


/*------------------------------------------------
    컴포넌트 - 데이트피커
------------------------------------------------*/
$.fn.datepickerFunc = function(){
    var inputDate = this
    inputDate.each(function(){
        var inputDate = $(this)
        var changeYearButtons = function(){
            setTimeout(function(){
                var widgetHeader = inputDate.datepicker("widget").find(".ui-datepicker-header");
                var prevYrBtn = $('<a class="prevYear" title="prevYear">Prev Year</a>');
                prevYrBtn.on("click", function(){
                    $.datepicker._adjustDate(inputDate, -1, 'Y');
                });
                var nextYrBtn = $('<a class="nextYear" title="nextYear">Next year</a>');
                nextYrBtn.on("click", function(){
                    $.datepicker._adjustDate(inputDate, +1, 'Y');
                });
                prevYrBtn.appendTo(widgetHeader);
                nextYrBtn.appendTo(widgetHeader);
            }, 1);
        };
        if( !inputDate.attr('readonly') && !inputDate.attr('disabled') ){
            inputDate.datepicker({
                showMonthAfterYear : true,
                dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
                monthNames:  [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12" ],
                dateFormat: "yy.mm.dd",
                isRTL: true,
                // ignoreReadonly: true,
                beforeShow: function(input){
                    changeYearButtons();
                    var input_offset= $(input).offset();
                    setTimeout(function(){
                        inputDate.addClass('focus');
                        inputDate.after('<span class="date_arrow"><span class="arrow"></span></span>');
                        inputDate.next('span.date_arrow').fadeIn('fast');
                        $('#ui-datepicker-div').css({'top':input_offset.top, 'bottom':''});
                    });
                },
                onClose: function(input){
                    inputDate.removeClass('focus');
                    inputDate.next('.date_arrow').fadeOut('fast');
                    inputDate.next('.date_arrow').remove();
                },
                onSelect: function(){
                    inputDate.closest('.input_pack').addClass('active');
                },				
                onChangeMonthYear: changeYearButtons
            }).attr('readonly', 'readonly');
        };
        inputDate.datepicker('setDate', new Date() );		
    });
};



/*==========================================================
    레이아웃 - 팝업
==========================================================*/
/*------------------------------------------------
    레이아웃 - 슬라이드팝업
------------------------------------------------*/
/* 슬라이드팝업 - 호출식(열기) */
var slidePopupShow = function(Id) {
    var $slidePopup = $('#' + Id);
    $slidePopup.slidePopupCustom(Id, 'show');
};

/* 슬라이드팝업 - 호출식(닫기) */
var slidePopupHide = function(Id) {
    var $slidePopup = $('#' + Id);
    $slidePopup.slidePopupCustom(Id, 'hide');
};

/* 슬라이드팝업 - 프로토타입 */
$.fn.slidePopupCustom = function(Id, state){
    var $slidePopup = $('#' + Id),
        $slidePopupState = state,
        $slidePopupH = $slidePopup.outerHeight(),        
        $slideContain = $slidePopup.find('.slidepopup_container'),
        $slideConts = $slidePopup.find('.slidepopup_contents');
        $slideFooter = $slidePopup.find('.slidepopup_footer');

    var device = $('body.apro').data('device');

    // 헤더유무정의
    if( $('.header').length != 0 ){
        var NumHeaderH = $('.header').outerHeight();
    }else{
        NumHeaderH = 50; // 20200827 헤더영역 기본값설정
    };

    var $winH = $(window).outerHeight();		
        NumMobileMaxH = $winH - NumHeaderH; // 해더사이즈 제거

    // 20201102 높이 640xp 이하 디바이스 케이스
    if( $(window).outerHeight() <= 640 ){
        NumMobileMaxH = $winH
        $slidePopup.addClass('type_no_title');
    }else{
        $slidePopup.removeClass('type_no_title');
    }

    var NumLimit = 100,
        NumPcMaxH = $winH - NumLimit;

    // 슬라이드 열기
    if( $slidePopupState == 'show' ){

        // 딤생성
        if( $slidePopup.prev('.common_dim').length == 0 ) dimFunc( $slidePopup, 'show');
        $slidePopup.show();
        $slidePopup.addClass('layer_active');

        var $thisHeader = $slidePopup.find('.slidepopup_header'),
            $thisFooter = $slidePopup.find('.slidepopup_footer');

        var NumThisHeaderH = $thisHeader.outerHeight(true),
            NumThisFooterH = $thisFooter.outerHeight(true);
        
        // pc 디바이스
        if( device == 'pc'){           

            // 헤더/푸터 공간정의
            $slideContain.css({'padding-top': NumThisHeaderH, 'padding-bottom': NumThisFooterH });
                
            // 풀슬라이드팝업
            if( $slidePopup.hasClass('type_maximum') ){
                
                popupContH = NumPcMaxH - ( NumThisHeaderH + NumThisFooterH );
                $slidePopup.css({'height': NumPcMaxH })
                $slideConts.css({'height': popupContH });

                var staticContent = $slidePopup.find('.type_static'),
                    flexibleContent = $slidePopup.find('.type_flexible');
                var staticContentH = 0;

                // 고정콘텐츠
                for( var i = 0 ; i< staticContent.length ; i++ ){
                    staticContentH = staticContentH + staticContent.eq(i).outerHeight();
                };
                // 스크롤콘텐츠
                for( var j = 0 ; j < flexibleContent.length; j++ ){
                    flexibleContent.eq(j).css({'height': ( popupContH - staticContentH ) / flexibleContent.length });
                };

            // 기본팝업
            }else{
                // 크기정의
                if( $slidePopupH > NumPcMaxH ){
                    popupContH = NumPcMaxH - ( NumThisHeaderH + NumThisFooterH );
                    $slidePopup.css({'height': NumPcMaxH })
                    $slideConts.css({'max-height': popupContH });
                }else{
                    $slideConts.css({'max-height': NumPcMaxH - ( NumThisHeaderH + NumThisFooterH )});
                };    
            };           

            // 위치값
            var xPosition = $slidePopup.outerWidth() / 2,
                yPosition = $slidePopup.outerHeight() / 2;
            
            $slidePopup.css({ 'margin-left': -(xPosition), 'margin-top': -(yPosition), 'min-height': NumThisHeaderH + NumThisFooterH });
            $('body.apro').data('winH', $winH);            

        // 모바일 디바이스
        }else{
            var popupContH = NumMobileMaxH - ( $slideConts.position().top  + NumThisFooterH );

            // 풀슬라이드팝업
            if( $slidePopup.hasClass('type_maximum') ){                           
                
                var staticContent = $slidePopup.find('.type_static'),
                    flexibleContent = $slidePopup.find('.type_flexible');
                var staticContentH = 0;

                // 고정콘텐츠
                for( var i = 0 ; i< staticContent.length ; i++ ){
                    staticContentH = staticContentH + staticContent.eq(i).outerHeight();
                };
                // 스크롤콘텐츠
                for( var j = 0 ; j < flexibleContent.length; j++ ){
                    flexibleContent.eq(j).css({'height': ( popupContH - staticContentH ) / flexibleContent.length });
                };

                // 속성값 정의
                $slidePopup.css({'bottom': -NumMobileMaxH, 'height': NumMobileMaxH });
                $slideConts.css({'height': popupContH })

            // 기본슬라이드팝업
            }else{
                $slidePopup.css({'bottom': -$slidePopupH });
                $slideConts.css({'max-height': popupContH });
            };
            
            $slidePopup.find('.slidepopup').addClass('active');
            $slidePopup.stop().animate({'bottom': 0 }, 300);
        };

        // 스크롤고정 스크립트
        scrollFixedOnFunc();	

    // 슬라이드 닫기
    }else if( $slidePopupState == 'hide' ){

        if( device == 'pc'){ // PC
            dimFunc( $slidePopup, 'hide');
            $slidePopup.find('.slidepopup').removeClass('active');
            $slidePopup.hide();
            
            // 속성값 삭제
            $slidePopup.removeAttr('style');
            $slideContain.removeAttr('style');
            $slideConts.removeAttr('style');

        }else{  // 모바일
            $slidePopup.animate({ 'bottom': -$slidePopupH }, 300, function() {
                // 딤삭제
                dimFunc( $slidePopup, 'hide');
                $slidePopup.find('.slidepopup').removeClass('active');
                $slidePopup.hide();	
                
                // 속성값 삭제
                $slidePopup.removeAttr('style');
                $slideContain.removeAttr('style');
                $slideConts.removeAttr('style');
            });
        };
      
        $slidePopup.removeClass('layer_active');

        // 스크롤고정 스크립트
        
        scrollFixedOffFunc();	
    };

    // 이벤트중첩 대응
    if( typeof $slidePopup.data('event') == 'undefined'){
        /* 리사이즈 */
        $(window).on('resize', function(){

            // 헤더유무정의
            if( $('.header').length != 0 ){
                var NumHeaderH = $('.header').outerHeight();
            }else{
                var NumHeaderH = 50; // 20200827 헤더영역 기본값설정
            };
            
            // 초기변수값
            var device = $('body.apro').data('device'),
                $slidePopups = $(document).find('.slidepopup_wrap.layer_active');

            var NumInitWinH = $('body.apro').data('winH'),
                NumInitWinW = $('body.apro').data('winW'),
                NumWinH = $(window).outerHeight(true),
                NumWinW = $(window).outerWidth(true),
                NumLimit = 100;
            
            $slidePopups.each(function(){  
                var $slidePopup = $(this),
                    $thisHeader = $slidePopup.find('.slidepopup_header'),
                    $thisFooter = $slidePopup.find('.slidepopup_footer'),
                    $thisContain = $slidePopup.find('.slidepopup_container'),
                    $thisScrollArea = $slidePopup.find('.slidepopup_contents');

                var NumThisHeaderH = $thisHeader.outerHeight(true),
                    NumThisFooterH = $thisFooter.outerHeight(true),
                    NumPcMaxH = NumWinH - NumLimit,
                    NumMobileMaxH = NumWinH - NumHeaderH;

                // 20201102 높이 640xp 이하 디바이스 케이스
                if( $(window).outerHeight() <= 640 ){
                    NumMobileMaxH = NumWinH
                    $slidePopup.addClass('type_no_title');
                }else{
                    $slidePopup.removeClass('type_no_title');
                }
                
                var totalH = $thisScrollArea[0].scrollHeight + NumThisHeaderH + NumThisFooterH,
                    popupContH = NumMobileMaxH - ( NumThisHeaderH + NumThisFooterH );
                
                // 풀슬라이드팝업변수
                var staticContent = $slidePopup.find('.type_static'),
                    flexibleContent = $slidePopup.find('.type_flexible');
                    
                // PC 디바이스
                if( device == 'pc' ){ 

                    // 풀슬라이드팝업
                    if( $slidePopup.hasClass('type_maximum') ){

                        $slidePopup.css({'height': 'auto'});
                        var staticContentH = 0;                       

                        // 고정콘텐츠
                        for( var i = 0 ; i< staticContent.length ; i++ ){
                            staticContentH = staticContentH + staticContent.eq(i).outerHeight();
                        };
                        // 스크롤콘텐츠
                        for( var j = 0 ; j < flexibleContent.length; j++ ){
                            flexibleContent.eq(j).css({'height': ( popupContH - staticContentH ) / flexibleContent.length });
                        };

                        // 속성값 정의
                        $slidePopup.css({'height': NumMobileMaxH });
                        $slideContain.css({'height': NumMobileMaxH });
                        $slideConts.css({'max-height': popupContH });                        

                    }else{
                        // 브라우저 사이즈 증가
                        if( NumWinH > NumInitWinH || NumWinW > NumInitWinW ){

                            if( NumPcMaxH < totalH ){
                                $slidePopup .css({ 'height': NumPcMaxH });
                                $thisScrollArea.css({'height': 'auto' });
                            }else{
                                $slidePopup .css({'height': totalH });
                                $thisScrollArea.css({'height': 'auto' });
                            };
                            
                            $thisScrollArea.css({'max-height': NumPcMaxH - (NumThisHeaderH + NumThisFooterH) });

                        // 브라우저 사이즈 감소
                        }else if( NumWinH < NumInitWinH || NumWinW < NumInitWinW ){

                            if( NumPcMaxH < totalH ){
                                $slidePopup .css({ 'height': NumPcMaxH });
                            };
                            
                            $thisScrollArea.css({'max-height': $slidePopup.outerHeight() - (NumThisHeaderH + NumThisFooterH) });
                        };
                    };                    

                    // 헤더/푸터 공간정의
                    $slideContain.css({'padding-top': NumThisHeaderH, 'padding-bottom': NumThisFooterH });

                    // 슬라이드 초기화
                    $slidePopup.css({'bottom': 'auto'});

                    // 위치값
                    var xPosition = $slidePopup.outerWidth() / 2,
                        yPosition = $slidePopup.outerHeight() / 2;
                    $slidePopup.css({ 'margin-left': -(xPosition), 'margin-top': -(yPosition) });
                    
                    // 위치값 할당
                    $('body.apro').data('winH', NumWinH);
                    $('body.apro').data('winW', NumWinW);  


                // 모바일 디바이스
                }else if( device == 'mobile' ){

                    // 공통변수 재선언
                    NumThisFooterH = $thisFooter.outerHeight(true);
                    popupContH = NumMobileMaxH - ( $slideConts.position().top  + NumThisFooterH );

                    // 레이어팝업 -> 슬라이드팝업 (초기화)
                    $slidePopup.css({ 'margin-left': 'auto', 'margin-right': 'auto', 'min-height': 'auto', 'height': 'auto', 'bottom': 0});
                    $thisContain.removeAttr('style');

                    // 풀슬라이드팝업
                    if( $slidePopup.hasClass('type_maximum') ){
                        
                        $slidePopup.css({'height': 'auto'});
                        $slideContain.removeAttr('style');
                        $slideConts.removeAttr('style');

                        var staticContentH = 0;                       

                        // 고정콘텐츠
                        for( var i = 0 ; i< staticContent.length ; i++ ){
                            staticContentH = staticContentH + staticContent.eq(i).outerHeight();
                        };
                        // 스크롤콘텐츠
                        for( var j = 0 ; j < flexibleContent.length; j++ ){
                            flexibleContent.eq(j).css({'height': ( popupContH - staticContentH ) / flexibleContent.length });
                        };

                        // 속성값 정의
                        $slidePopup.css({'height': NumMobileMaxH });
                        $slideContain.css({'height': popupContH });
                        $slideConts.css({'max-height': popupContH });

                    // 기본슬라이드팝업
                    }else{
                        $slideConts.css({'max-height': popupContH });
                    };
                };
            });
        });

        // 이벤트 중첩확인
        $slidePopup.data('event', 'define')
    };

    return this.each(function(){
        // 업데이트
        this.update = function(){

            var $slidePopup = $(this),            
                $slidePopupH = $slidePopup.outerHeight(),
                $thisHeader = $slidePopup.find('.slidepopup_header'),
                $thisContain = $slidePopup.find('.slidepopup_container'),
                $thisScrollArea = $slidePopup.find('.slidepopup_contents'),
                $thisFooter = $slidePopup.find('.slidepopup_footer');

            var NumThisHeaderH = $thisHeader.outerHeight(),
                NumThisFooterH = $thisFooter.outerHeight();

            var device = $('body.apro').data('device');

            var NumLimit = 100,
                NumPcMaxH = $winH - NumLimit,
                NumMobileMaxH = $winH - NumHeaderH;

            // 20201102 높이 640xp 이하 디바이스 케이스
            if( $(window).outerHeight() <= 640 ){
                NumMobileMaxH = $winH
                $slidePopup.addClass('type_no_title');
            }else{
                $slidePopup.removeClass('type_no_title');
            }

            // pc 디바이스
            if( device == 'pc'){
                
                // 풀슬라이드팝업
                if( $slidePopup.hasClass('type_maximum') ){
                
                // 기본슬라이드팝업
                }else{
                    // 크기정의
                    if( $slidePopupH > NumPcMaxH ){
                        popupContH = NumPcMaxH - (NumThisHeaderH + NumThisFooterH);
                        $slidePopup.css({'height': NumPcMaxH })
                        $thisScrollArea.css({'max-height': popupContH });
                    }else{
                        $thisScrollArea.css({'max-height': NumPcMaxH - ( NumThisHeaderH + NumThisFooterH )});
                    };

                    // 헤더/푸터 공간정의
                    $thisContain.css({'padding-top': NumThisHeaderH, 'padding-bottom': NumThisFooterH });

                    // 위치값
                    var xPosition = $slidePopup.outerWidth() / 2,
                        yPosition = $slidePopup.outerHeight() / 2;

                    $slidePopup.css({ 'margin-left': -(xPosition), 'margin-top': -(yPosition), 'min-height': NumThisHeaderH + NumThisFooterH });
                    $('body.apro').data('winH', $winH);
                };

            // 모바일 디바이스
            }else{
                // 풀슬라이드팝업
                if( $slidePopup.hasClass('type_maximum') ){
                // 기본슬라이드팝업
                }else{                   
                };
            };
        };
    });
};


/*------------------------------------------------
    레이아웃 - 레이어팝업
------------------------------------------------*/
/* 레이어팝업 - 호출식(얼럿열기) */
var alertShow = function(W, H, ID){ /* width, height, id */
    scrollFixedOnFunc(); // 스크롤고정 스크립트

    var _ID = $('#' + ID);
    _ID.popupCustom({ type: 'alert', id: ID, width: W, height: H });
};

/* 레이어팝업 - 호출식(얼럿닫기) */
var alertClose = function(action, ID){ /* action, id */
    
    scrollFixedOffFunc(); // 스크롤고정 스크립트

    var _ID = $('#' + ID);    
    if( action == 'hide') _ID.popupCustom({ type: 'alert', action: action, id: ID });
    if( action == 'hide_all') $(document).popupCustom({ type: 'alert', action: action });
};

/* 레이어팝업 - 호출식(팝업열기) */
var popupShow = function(W, H, ID){ /* width, height, id */
    scrollFixedOnFunc(); // 스크롤고정 스크립트

    var _ID = $('#' + ID);
    _ID.popupCustom({ type: 'popup', id: ID, width: W, height: H });
};

/* 레이어팝업 - 호출식(페이지팝업열기) */
var pagePopupShow = function(ID, popupcase){ /* id, case */
    scrollFixedOnFunc(); // 스크롤고정 스크립트

    var _ID = $('#' + ID);
    _ID.popupCustom({ type: 'pagepopup', id: ID });
};

/* 레이어팝업 - 호출식(팝업&페이지팝업닫기) */
var popupClose = function(action, ID){ /* action, id */
    
    scrollFixedOffFunc(); // 스크롤고정 스크립트

    var _ID = $('#' + ID);
    if( action == 'hide') _ID.popupCustom({ action: action, id: ID });
    if( action == 'hide_all') $(document).popupCustom({ action: action });
};

/* 레이어팝업 - 프로토타입 */
$.fn.popupCustom = function(options){
    /* 옵션 */
    var defaults = {
        type: 'popup',
        action: 'open',
        id: null,
        width: null,
        height: null,
        TBmargin: 100, /* 상,하단여백 */
        popupCase: null,
        device: $('body.apro').data('device')
    };

    /* define */
    var alert = {
        defaultZindex: 9000, /* 비활성 z-index */
        targetZindex: 10000, /* 활성 z-index */
        wrapClass: 'alert_wrap', /* 팝업 */
        layerClass: 'alert_layer', /* 자기자신 */
        headerClass: 'alert_header', /* 헤더 */
        containerClass: 'alert_container', /* 컨테이너 */
        scrollArea: 'alert_scroll', /* 스크롤 */
        scrollInner: 'alert_scrollinner', /* 스크롤 */
        footerClass: 'alert_footer', /* 푸터 */
    };

    /* define */
    var popup = {
        defaultZindex: 9000, /* 비활성 z-index */
        targetZindex: 10000, /* 활성 z-index */
        wrapClass: 'popup_wrap', /* 팝업 */
        layerClass: 'popup_layer', /* 자기자신 */
        headerClass: 'popup_header', /* 헤더 */
        containerClass: 'popup_container', /* 컨테이너 */
        scrollArea: 'popup_scroll', /* 스크롤 */
        scrollInner: 'popup_scrollinner', /* 스크롤 */
        footerClass: 'popup_footer', /* 푸터 */
    };

    /* define */
    var pagepopup = {
        defaultZindex: 9000, /* 비활성 z-index */
        targetZindex: 10000, /* 활성 z-index */
        wrapClass: 'pagepop_wrap', /* 팝업 */
        layerClass: 'pagepop_layer', /* 자기자신 */
        headerClass: 'pagepop_header', /* 헤더 */
        containerClass: 'pagepop_container', /* 컨테이너 */
        scrollArea: 'pagepop_scroll', /* 스크롤 */
        scrollInner: 'pagepopup_scrollinner', /* 스크롤 */
        footerClass: 'pagepop_footer', /* 푸터 */
    };

    var o = $.extend(defaults, options);
    if( o.type == 'popup' ) var o = $.extend(defaults, popup, options);
    if( o.type == 'alert' ) var o = $.extend(defaults, alert, options);
    if( o.type == 'pagepopup' ) var o = $.extend(defaults, pagepopup, options);

    /* common Define */
    var dimClass = 'layer_dim', /* 딤 클래스 */
        activeClass = 'layer_active', /* 활성화 클래스 */
        dataPopupall = 'data-popupall', /* 전체컨트롤용 속성 */
        dataOriginH = 'data-originHeight', /* 팝업원래높이 */
        btnHide = '[data-action="hide"]', /* 닫기버튼 */
        btnRemove = '[data-action="remove"]', /* 삭제버튼 */
        btnHideAll = '[data-action="hide_all"]', /* 닫기버튼 */
        btnRemoveAll = '[data-action="remove_all"]' /* 삭제버튼 */

    /* reDefine */
    var _this = $(this),
        _thisID = $('#' + o.id),
        wrapClass = _this.find('.' + o.wrapClass),
        allWrapClass = $(document).find('.' + o.wrapClass),
        layerClass = _this.find('.' + o.layerClass),
        headerClass = _this.find('.' + o.headerClass),
        containerClass = _this.find('.' + o.containerClass),
        scrollArea = _this.find('.' + o.scrollArea),
        scrollInner = _this.find('.' + o.scrollInner),
        footerClass = _this.find('.' + o.footerClass),
        btnHide = _this.find(btnHide),
        btnRemove = _this.find(btnRemove),
        btnHideAll = _this.find(btnHideAll),
        btnRemoveAll = _this.find(btnRemoveAll);

    var windowW = $(window).outerWidth(true),
        windowH = $(window).outerHeight(true),
        documentW = $(document).outerWidth(true),
        documentH = $(document).outerHeight(true);
        

    /* option */
    var bodyScrollCtrl = $('body'), // 베이스body 스크롤제어하기 위한 class
        scrollW = 17, // 스크롤가로크기(브라우져)
        dimOpacity = 0.5, // 딤투명도
        maxH = windowH - o.TBmargin; // (전체창 - 상하단여백) 실제팝업크기
       
    return this.each(function(){
                       
        /* 팝업오픈 */
        var init = function(){
            // 이미 활성화시 리턴
            if( layerClass.hasClass(activeClass) ) return;
            Show();
            Size();
            Position();
        };

        var Show = function(){ /* 노출 */ 
                                    
            layerClass.addClass(activeClass);
            _this.attr(dataPopupall,'all');
            popupAll = $('['+dataPopupall+']');

            _this.show();
            setTimeout(function(){ zindexCtrl(); })
                      
            if( o.type == 'pagepopup' && o.device == 'mobile' ){
            }else{
                setTimeout(function(){
                    if( _this.prev('.common_dim').length == 0 ){
                        dimFunc( $(document).find(_this), 'show');;
                    };
                });
            };            
        };

        var Size = function(){ /* 크기정의 */ 

            // 20201028 팝업 푸터없을시 대응안
            if( footerClass.children().length == 0 || footerClass.children().outerHeight() == 0 ){
                scrollInner.addClass('type_fit');
                footerClass.addClass('type_fit');
            }else{
                scrollInner.removeClass('type_fit');
                footerClass.removeClass('type_fit');
            };

            var	layerW = layerClass.outerWidth()
                headerH = headerClass.outerHeight(true),
                footerH = footerClass.outerHeight(true),
                scrollInnerH= scrollInner.outerHeight(true);

            popupLayerOriginH = headerH + footerH + scrollInnerH;

            layerClass.css({ 'width': o.width, 'height': o.height });
            containerClass.css({ 'padding-top' : headerH, 'padding-bottom' : footerH });
            
            if( o.type =='pagepopup' && o.device == 'mobile' ){
                footerClass.css({'margin-top': -footerH });
            }else{
                
                if( layerClass.outerHeight() > maxH ){ /* 팝업이 창크기보다 큰 경우 */
                    layerClass.css({ 'height': maxH });
                };
                
                scrollArea.css({ 'height': layerClass.outerHeight() - (headerH + footerH) }).scrollTop(0);

                // 풀페이지 반응형 대응
                if( o.width != null || o.height != null ){
                    if( (o.width).length > 0 ) layerClass.css({ 'max-width': parseInt( Number(o.width) ) });	
                    else layerClass.css({ 'max-width' : parseInt(layerW) })	
    
                    if( (o.height).length > 0 ) layerClass.css({ 'max-height': Number(o.height) });	
                    else layerClass.css({ 'max-height' : popupLayerOriginH })
                };
            };

        };


        var Position = function(){ /* 위치지정 */
            if( o.type =='pagepopup' && o.device == 'mobile' ){
                layerClass.scrollTop(0)
            }else if( o.type =='pagepopup' && o.device == 'pc' ){
                scrollArea.scrollTop(0);
                var xPosition = layerClass.outerWidth() / 2,
                    yPosition = layerClass.outerHeight() / 2;
                    
                layerClass.css({ 'margin-left': -(parseInt(xPosition)) });
            }else{
                scrollArea.scrollTop(0);
                var xPosition = layerClass.outerWidth() / 2,
                    yPosition = layerClass.outerHeight() / 2;
                    
                layerClass.css({ 'margin-left': -(parseInt(xPosition)), 'margin-top': -(parseInt(yPosition)) });
            };
        };

        var zindexCtrl = function(){
            activePopupLength = $(document).find('.' + activeClass).length;
            _this.css({ 'z-index': o.targetZindex + ( activePopupLength * 1000 ) });
        };

        init();	

        
        // 이벤트중첩 대응
        if( typeof _this.data('event') == 'undefined' ){
            /* 리사이즈 */
            $(window).on('resize', function(){

                // 초기변수값
                var device = $('body.apro').data('device');
                var NumWinH = $(window).outerHeight(true),
                    NumWinW = $(window).outerWidth(true),
                    NumLimit = 100;

                    if( NumWinH < 400 ) NumLimit = 0;

                // 일반팝업
                if( o.type != 'pagepopup' ){
                    layerClass.each(function(){

                        var $this = $(this),
                            maxH = NumWinH - NumLimit; 

                        // 팝업 활성화 유무체크
                        if( $this.hasClass('layer_active')){                           
                            if( o.type =='pagepopup' && device == 'pc' ){
                            }else{
                                if( NumWinH > windowH ){ /* 리사이즈하는 창이 기존보다 큰 경우 */ 
                                    // $this.css({ 'height': maxH, 'max-height': layerOriginH });
                                    $this.css({ 'height': maxH });
                                    if( maxH > $this.outerHeight()){ /* 팝업이 최대크기보다 작을 경우 */ 
                                        $this.css({ 'width': o.width });
                                    };
                                }else if( NumWinH < windowH ){ /* 리사이즈하는 창이 기존보다 작을 경우 */
                                    if( maxH < $this.outerHeight() ){ /* 팝업이 최대크기보다 큰 경우 */
                                        $this.css({ 'width': o.width, 'height': maxH });
                                    };
                                };
                                $this.find(scrollArea).css({ 'height': $this.outerHeight() - (headerClass.outerHeight(true) + footerClass.outerHeight(true)) });
    
                                var xPosition = $this.outerWidth() / 2,
                                    yPosition = $this.outerHeight() / 2;
    
                                $this.css({ 'margin-left': -(parseInt(xPosition)), 'margin-top': -(parseInt(yPosition)) });  // 20200826 백마진 정수화
                            };                                    
                        };
                    });
                };
                
                // 페이지팝업 - PC
                if( o.type =='pagepopup' && device == 'pc' ){

                    layerClass.each(function(){
                        var $this = $(this),
                            $thisHeader = $this.find('.pagepop_header'),
                            $thisContainer = $this.find('.pagepop_container'),
                            $thisScrollArea = $this.find('.pagepop_scroll'),
                            $thisScrollInner = $this.find('pagepopup_scrollinner'),
                            $thisFooter = $this.find('.pagepop_footer'),
                            $thisHeaderH = $thisHeader.outerHeight(),
                            $thisFooterH = $thisFooter.outerHeight();
                        
                        $this.removeAttr('style');

                        var NumPcMaxH = NumWinH - NumLimit;                        
                        $thisScrollArea.css({'max-height': NumPcMaxH - ( $thisHeaderH + $thisFooterH ) });
              
                        // 위치지정
                        var xPosition = $this.outerWidth() / 2,
                            yPosition = $this.outerHeight() / 2;
                        $this.css({ 'margin-left': -(xPosition) });
                        $thisContainer.css({'padding-top': $thisHeaderH, 'padding-bottom': $thisFooterH })

                        // 딤유무확인
                        if( $this.prev('.common_dim').length == 0 && $this.hasClass('layer_active') ){
                            dimFunc( $(document).find(_this), 'show');;
                        };
                    });

                // 페이지팝업 - 모바일
                }else if( o.type =='pagepopup' && device == 'mobile' ){
                    layerClass.each(function(){
                        var $this = $(this),
                            $thisContainer = $this.find('.pagepop_container'),
                            $thisScrollArea = $this.find('.pagepop_scroll'),                            
                            $thisFooter = $this.find('.pagepop_footer');
                            $thisHeaderH = $this.find('.pagepop_header').outerHeight(),
                            $thisFooterH = $this.find('.pagepop_footer').outerHeight();

                        // 레이어팝업초기화
                        $this.css({ 'margin': 0, 'height': '100%'});
                        $thisContainer.css({'padding-top': $thisHeaderH, 'padding-bottom': $thisFooterH })
                        $thisScrollArea.removeAttr('style');
                        $thisFooter.css({'margin-top':  -$thisFooterH });
                    });
                };
                setTimeout(function(){ windowH = $(window).outerHeight(true) },200) /* 리사이즈시 0.2초뒤에 기존창크기를 계산함 */
            });
            // 이벤트 바인딩 상태추가
            _this.data('event', 'define')
        };

        if( o.type =='pagepopup'){
            layerClass.on('scroll',function(){
                headerClass.css('left', -layerClass.scrollLeft() );
            });
        };

        // 20200720 업데이트 기능추가
        _this.data({'type': o.type, 'width':o.width, 'height':o.height });

        this.update = function(){

            // 디바이스체크
            var device = $('body.apro').data('device');

            // 변수재선언
            var $this = $(this);
                $thisLayer = $this.find('[class*="layer_active"]');
                $thisHeader = $this.find('[class*="_header"]');
                $thisContainer = $this.find('[class*="_container"]');
                $thisScroll = $this.find('[class*="_scroll"]');
                $thisScrollInner = $this.find('[class*="_scrollinner"]');
                $thisFooter = $this.find('[class*="_footer"]');

            // 스타일속성제거
            $thisLayer.removeAttr('style');
            $thisContainer.removeAttr('style');
            $thisScroll.removeAttr('style');
            $thisScrollInner.removeAttr('style');
            
            // 20201028 팝업 푸터없을시 대응안
            if( footerClass.children().length == 0 || footerClass.children().outerHeight() == 0 ){
                scrollInner.addClass('type_fit');
                footerClass.addClass('type_fit');
            }else{
                scrollInner.removeClass('type_fit');
                footerClass.removeClass('type_fit');
            };

            var	layerW = $thisLayer.outerWidth(),
                headerH = $thisHeader.outerHeight(true),
                footerH = $thisFooter.outerHeight(true),
                scrollInnerH = $thisScrollInner.outerHeight(true);

            popupLayerOriginH = headerH + footerH + scrollInnerH;

            // 사이즈 업데이트
            $thisLayer.css({ 'width': $this.data('width'), 'height': $this.data('height') });
            $thisContainer.css({ 'padding-top' : headerH, 'padding-bottom' : footerH });   

            // 페이지팝업 && 모바일
            if( $this.data('type') =='pagepopup' && device == 'mobile' ){
                $thisFooter.css({'margin-top': -footerH });
            
            // 페이지팝업 && PC
            }else if( $this.data('type') =='pagepopup' && device == 'pc' ){
                
                    $thisLayer.removeAttr('style');
                    var NumWinH = $(window).outerHeight(true),
                        NumLimit = 100;

                    var NumPcMaxH = NumWinH - NumLimit;                        
                        $thisScroll.css({'max-height': NumPcMaxH - ( headerH + footerH ) });
          
                    // 위치지정
                    var xPosition = $thisLayer.outerWidth() / 2,
                        yPosition = $thisLayer.outerHeight() / 2;

                    $thisLayer.css({ 'margin-left': -(parseInt(xPosition)) }); // 20200826 백마진 정수화
                    $thisContainer.css({'padding-top': headerH, 'padding-bottom': footerH })

                    // 딤유무확인
                    if( $this.prev('.common_dim').length == 0 && $this.hasClass('layer_active') ){
                        dimFunc( $(document).find(_this), 'show');;
                    };

            // 나머지팝업
            }else{
                if( $thisLayer.outerHeight() > maxH ){ /* 팝업이 창크기보다 큰 경우 */
                    $thisLayer.css({ 'height': maxH });
                };

                $thisScroll.css({ 'height': $thisLayer.outerHeight() - (headerH + footerH) }).scrollTop(0);

                if( ( $this.data('width')).length > 0 ) $thisLayer.css({ 'max-width': parseInt( Number( $this.data('width'))) });	
                else $thisLayer.css({ 'max-width' : parseInt( layerW ) });
                if( ( $this.data('height')).length > 0 ) $thisLayer.css({ 'max-height': Number( $this.data('height')) });	
                else $thisLayer.css({ 'max-height' : popupLayerOriginH });
            };

            // 포지션 업데이트
            if( $this.data('type') =='pagepopup'){
                $thisLayer.scrollTop(0)
            }else{
                $thisScroll.scrollTop(0);
                var xPosition = $thisLayer.outerWidth() / 2;
                var yPosition = $thisLayer.outerHeight() / 2;
                $thisLayer.css({ 'margin-left': -(xPosition), 'margin-top': -(yPosition) });
            };        
        };

        /* 숨기기,삭제(공통) */
        var popCloseCommon = function(closeType){
            // 팝업설정값리셋
            _this.find('.' + o.layerClass).removeAttr('style');
            _this.find('.' + o.scrollArea).removeAttr('style');
            _this.find('.' + o.containerClass).removeAttr('style');
            _this.find('.' + o.footerClass).removeAttr('style');


            if( closeType == 'hide' ) _this.find('.' + o.layerClass).removeClass(activeClass);
            else if( closeType == 'hide_all' ) $('.'+activeClass).removeClass(activeClass);

            activePopupLength = $(document).find('.' + activeClass).length;

            zindexCtrl();
            dimFunc( $(document).find(_this), 'hide');
            
        };

        /* 숨기기,삭제 */
        var popupCloseFunc = function(closeType){

            
            scrollFixedOffFunc(); // 스크롤고정 스크립트

            if( closeType == 'hide' ) _this.hide();
            if( closeType == 'hide_all' ) popupAll.hide();
            if( closeType == 'remove' ) _this.remove();
            if( closeType == 'remove_all' ) popupAll.remove();
            popCloseCommon(closeType);           
        };

        /* 숨기기,삭제(외부제어) */
        if( o.action == 'hide' || o.action == 'remove' || o.action == 'hide_all' || o.action == 'remove_all' ){
            popupCloseFunc(o.action);
        };

        /* 숨기기(내부제어) */
        btnHide.off('click').click(function(e){
            e.preventDefault;
            popupCloseFunc('hide');
        });

        /* 삭제(내부제어) */
        btnRemove.off('click').click(function(e){
            e.preventDefault;
            popupCloseFunc('remove');
        });

        /* 전체숨기기(내부제어) */
        btnHideAll.off('click').click(function(e){
            e.preventDefault;
            popupCloseFunc('hide_all');
        });

        /* 전체삭제(내부제어) */
        btnRemoveAll.off('click').click(function(e){
            e.preventDefault;
            popupCloseFunc('remove_all');
        });

        return false;
    });
};
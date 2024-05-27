// [디파이 수정]  210513 파일 생성
$(function() {
    /* 암웨이 툴팁 클릭시 토글 기능 및 선택된 토글버튼 이외의 나머지 버튼은 비활성화 */
    $('.amway-theme .toolTip-wrapper').click(function() {
        $('.amway-theme .toolTip-wrapper').not($(this)).removeClass('open');
        $('.amway-theme .toolTip-wrapper').not($(this)).find('.tooltip-content').hide();
        var thisTooltip = $(this);
        thisTooltip.on('open', function (e) {
            if (e.type === 'open') {
                thisTooltip.removeClass('open');
                thisTooltip.find('.tooltip-content').hide();
            } else {
                thisTooltip.addClass('open');
                thisTooltip.find('.tooltip-content').show();
            }
        })
    })

    // 커스텀 셀렉트박스 전체
    $('[data-accordion]').click(function() { // [디파이 수정] 210610 data 속성으로 변경
        var $this = $(this);
        $this.next().slideToggle();
        $this.parent().toggleClass('on');
    });
    $('[data-show-close]').click(function() {
        var $this = $(this);
        $('.accordion__abo-order').removeClass('on');
        if ($this.next().css("display") == "none") {
            $('.accordion__abo-order .select_list').hide();
            $this.parent().addClass('on');
            $this.next().show();
        } else if ($this.next().css("display") == "block") {
            $('.accordion__abo-order .select_list').hide();
            $this.parent().removeClass('on');
            $this.next().hide();
        }
    });
    // S : [디파이 수정] 210601 커스텀 셀렉트박스 추가
    $('.sop-freeitem .select_list-item').each(function() {
        var $this = $(this);
        var $selectItem = $this.parents('.order-select').find('.select_item-text');

        $this.on('click', function(){
            $selectItem.html($this.find('.sop-freeitem-label').text());
            $this.parent().slideUp();
            $this.parents('.order-select').removeClass('on');
        });
    });
    // E : [디파이 수정] 210601 커스텀 셀렉트박스 추가
    $('.accordion__abo-order .select_list .select_list-item').each(function() {
        var $this_ = $(this);
        var $optionTitle = $this_.parents('.accordion__abo-order').find('.order-select-item').find('.select_item-text');

        $this_.on('click', function(){
            $optionTitle.html($this_.text());
            $('.select_list-item').removeClass('active');
            $this_.addClass('active');
            $this_.parent().toggle();
            $this_.parents('.accordion__abo-order').removeClass('on');
        });
    });
    // S : [디파이 수정] 210610 스크립트 추가
    $(".order-select-info").on('click', function() {
        var $this = $(this);
        var $selectItem = $this.parents('.order-select').find('.select_item-text');
        $selectItem.html($this.find('.order-select-info-name').text());
        $this.slideUp();
        $this.parents('.order-select').removeClass('on');
    });
    // E : [디파이 수정] 210610 스크립트 추가
    $('#sopPdp_profiles-selector').on('change', function(e) {
        var _value = $('#sopPdp_profiles-selector option').eq(e.target.selectedIndex)[0].value;

        $('.orderSelectContent .order-select-infos').hide();
        $('.orderSelectContent .order-select-infos.' + _value).show();
    })
    // S : [디파이 수정] 210616 버튼 선택 방식 변경
    $('.sop-btn-wrap').each(function() {
        this_ = $(this);
        this_.find('.btn_default-d').first().addClass('on');
        this_.find('.btn_default-d').click(function(){
            $this = $(this);
            $this.siblings().removeClass('on');
            $this.addClass('on');
        });
    });
    // E : [디파이 수정] 210616 버튼 선택 방식 변경
});
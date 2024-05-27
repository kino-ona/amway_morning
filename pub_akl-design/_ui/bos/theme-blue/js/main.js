'use strict';

(function (app) {
    'use strict';

    var desktopStart = 768;
    var mobileEnd = 767;

    app.utils = {
        isDesktop: function isDesktop() {
            return window.innerWidth >= desktopStart;
        },
        isMobile: function isMobile() {
            return window.innerWidth <= mobileEnd;
        }
    };

    return app;
})(window.amwayApp = window.amwayApp || {});
//# sourceMappingURL=utils.js.map

'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * SCROLL TABS
 *
 *  JQuery Plugin to manage scrollable tabs. See the 'defaultOptions' data structure for available options for configuration. The plugin is configured jointly via
 *  these Javascript options and CSS classes to style how it is displayed. Some of the CSS is set here in the javascript so that users will have minimal
 *  configuration to make the tabs themselves work, and should only have to do configuration on how they want it styled. 
 *
 * Known Limitations:
 *  IE6 problems, it does not properly apply scrolling and therefore is always the 'full width.' Additionally, the multiple-class CSS styling does not work
 *  properly in IE6. We can work around this in the future by apply distinct class stylings that represent all the combinations. 
 *
 * Version:   2.0 
 * Author:    Josh Reed
 */
(function ($) {
  $.fn.scrollTabs = function (opts) {
    var initialize = function initialize(state) {
      var _$$css;

      opts = $.extend({}, $.fn.scrollTabs.defaultOptions, opts);

      if ($(this).prop('tagName').toLowerCase() === 'ul') {
        this.itemTag = 'li';
      } else {
        this.itemTag = 'span';
      }

      $(this).addClass('scroll_tabs_container');
      if ($(this).css('position') === null || $(this).css('position') === 'static') {
        $(this).css('position', 'relative');
      }

      $(this.itemTag, this).last().addClass('scroll_tab_last');
      $(this.itemTag, this).first().addClass('scroll_tab_first');

      $(this).html("<div class='scroll_tab_left_button'></div><div class='scroll_tab_inner'><span class='scroll_tab_left_finisher'>&nbsp;</span>" + $(this).html() + "<span class='scroll_tab_right_finisher'>&nbsp;</span></div><div class='scroll_tab_right_button'></div>");

      $(".scroll_tab_left_button", this).append($(opts.left_arrow_content_html));
      $(".scroll_tab_right_button", this).append($(opts.right_arrow_content_html));

      $('.scroll_tab_inner > span.scroll_tab_left_finisher', this).css({
        'display': 'none'
      });

      $('.scroll_tab_inner > span.scroll_tab_right_finisher', this).css({
        'display': 'none'
      });

      var _this = this;

      $('.scroll_tab_inner', this).css({
        'margin': '0px',
        'overflow': 'hidden',
        'white-space': 'nowrap',
        '-ms-text-overflow': 'clip',
        'text-overflow': 'clip',
        'font-size': '0px',
        'position': 'absolute',
        'top': '0px',
        'left': opts.left_arrow_size + 'px',
        'right': opts.right_arrow_size + 'px'
      });

      // If mousewheel function not present, don't utilize it
      if ($.isFunction($.fn.mousewheel)) {
        $('.scroll_tab_inner', this).mousewheel(function (event, delta) {
          // Only do mousewheel scrolling if scrolling is necessary
          if ($('.scroll_tab_right_button', _this).css('display') !== 'none') {
            this.scrollLeft -= delta * 30;
            state.scrollPos = this.scrollLeft;
            event.preventDefault();
          }
        });
      }

      // Set initial scroll position
      $('.scroll_tab_inner', _this).animate({ scrollLeft: state.scrollPos + 'px' }, 0);

      $('.scroll_tab_left_button', this).css({
        'position': 'absolute',
        'left': '0px',
        'top': '0px',
        'width': opts.left_arrow_size + 'px',
        'cursor': 'pointer'
      });

      $('.scroll_tab_right_button', this).css({
        'position': 'absolute',
        'right': '0px',
        'top': '0px',
        'width': opts.right_arrow_size + 'px',
        'cursor': 'pointer'
      });

      $('.scroll_tab_inner > ' + _this.itemTag, _this).css((_$$css = {
        'display': '-moz-inline-stack'
      }, _defineProperty(_$$css, 'display', 'inline-block'), _defineProperty(_$$css, 'zoom', 1), _defineProperty(_$$css, '*display', 'inline'), _defineProperty(_$$css, '_height', '40px'), _defineProperty(_$$css, '-webkit-user-select', 'none'), _defineProperty(_$$css, '-khtml-user-select', 'none'), _defineProperty(_$$css, '-moz-user-select', 'none'), _defineProperty(_$$css, '-ms-user-select', 'none'), _defineProperty(_$$css, '-o-user-select', 'none'), _defineProperty(_$$css, 'user-select', 'none'), _$$css));

      var size_checking = function size_checking() {
        var panel_width = $('.scroll_tab_inner', _this).outerWidth();

        if ($('.scroll_tab_inner', _this)[0].scrollWidth > panel_width) {
          $('.scroll_tab_right_button', _this).show();
          $('.scroll_tab_left_button', _this).show();
          $('.scroll_tab_inner', _this).css({ left: opts.left_arrow_size + 'px', right: opts.right_arrow_size + 'px' });
          $('.scroll_tab_left_finisher', _this).css('display', 'none');
          $('.scroll_tab_right_finisher', _this).css('display', 'none');

          if ($('.scroll_tab_inner', _this)[0].scrollWidth - panel_width == $('.scroll_tab_inner', _this).scrollLeft()) {
            $('.scroll_tab_right_button', _this).addClass('scroll_arrow_disabled').addClass('scroll_tab_right_button_disabled');
          } else {
            $('.scroll_tab_right_button', _this).removeClass('scroll_arrow_disabled').removeClass('scroll_tab_right_button_disabled');
          }
          if ($('.scroll_tab_inner', _this).scrollLeft() == 0) {
            $('.scroll_tab_left_button', _this).addClass('scroll_arrow_disabled').addClass('scroll_tab_left_button_disabled');
          } else {
            $('.scroll_tab_left_button', _this).removeClass('scroll_arrow_disabled').removeClass('scroll_tab_left_button_disabled');
          }
        } else {
          $('.scroll_tab_right_button', _this).hide();
          $('.scroll_tab_left_button', _this).hide();
          $('.scroll_tab_inner', _this).css({ left: '0px', right: '0px' });

          if ($('.scroll_tab_inner > ' + _this.itemTag + ':not(.scroll_tab_right_finisher):not(.scroll_tab_left_finisher):visible', _this).length > 0) {
            $('.scroll_tab_left_finisher', _this).css('display', 'inline-block');
            $('.scroll_tab_right_finisher', _this).css('display', 'inline-block');
          }
        }
      };

      size_checking();

      state.delay_timer = setInterval(function () {
        size_checking();
      }, 500);

      var press_and_hold_timeout;

      $('.scroll_tab_right_button', this).mousedown(function (e) {
        e.stopPropagation();
        var scrollRightFunc = function scrollRightFunc() {
          var left = $('.scroll_tab_inner', _this).scrollLeft();
          state.scrollPos = Math.min(left + opts.scroll_distance, $('.scroll_tab_inner', _this)[0].scrollWidth - $('.scroll_tab_inner', _this).outerWidth());
          $('.scroll_tab_inner', _this).animate({ scrollLeft: left + opts.scroll_distance + 'px' }, opts.scroll_duration);
        };
        scrollRightFunc();

        press_and_hold_timeout = setInterval(function () {
          scrollRightFunc();
        }, opts.scroll_duration);
      }).bind("mouseup mouseleave", function () {
        clearInterval(press_and_hold_timeout);
      }).mouseover(function () {
        $(this).addClass('scroll_arrow_over').addClass('scroll_tab_right_button_over');
      }).mouseout(function () {
        $(this).removeClass('scroll_arrow_over').removeClass('scroll_tab_right_button_over');
      });

      $('.scroll_tab_left_button', this).mousedown(function (e) {
        e.stopPropagation();
        var scrollLeftFunc = function scrollLeftFunc() {
          var left = $('.scroll_tab_inner', _this).scrollLeft();
          state.scrollPos = Math.max(left - opts.scroll_distance, 0);
          $('.scroll_tab_inner', _this).animate({ scrollLeft: left - opts.scroll_distance + 'px' }, opts.scroll_duration);
        };
        scrollLeftFunc();

        press_and_hold_timeout = setInterval(function () {
          scrollLeftFunc();
        }, opts.scroll_duration);
      }).bind("mouseup mouseleave", function () {
        clearInterval(press_and_hold_timeout);
      }).mouseover(function () {
        $(this).addClass('scroll_arrow_over').addClass('scroll_tab_left_button_over');
      }).mouseout(function () {
        $(this).removeClass('scroll_arrow_over').removeClass('scroll_tab_left_button_over');
      });

      $('.scroll_tab_inner > ' + this.itemTag + (this.itemTag !== 'span' ? ', .scroll_tab_inner > span' : ''), this).mouseover(function () {
        $(this).addClass('scroll_tab_over');
        if ($(this).hasClass('scroll_tab_left_finisher')) {
          $('.scroll_tab_inner > ' + _this.itemTag + '.scroll_tab_first', _this).addClass('scroll_tab_over').addClass('scroll_tab_first_over');
        }
        if ($(this).hasClass('scroll_tab_right_finisher')) {
          $('.scroll_tab_inner > ' + _this.itemTag + '.scroll_tab_last', _this).addClass('scroll_tab_over').addClass('scroll_tab_last_over');
        }
        if ($(this).hasClass('scroll_tab_first') || $('.scroll_tab_inner > ' + _this.itemTag + '.scroll_tab_last', _this).hasClass('scroll_tab_first')) {
          $('.scroll_tab_inner > span.scroll_tab_left_finisher', _this).addClass('scroll_tab_over').addClass('scroll_tab_left_finisher_over');
        }
        if ($(this).hasClass('scroll_tab_last') || $('.scroll_tab_inner > ' + _this.itemTag + '.scroll_tab_first', _this).hasClass('scroll_tab_last')) {
          $('.scroll_tab_inner > span.scroll_tab_right_finisher', _this).addClass('scroll_tab_over').addClass('scroll_tab_right_finisher_over');
        }
      }).mouseout(function () {
        $(this).removeClass('scroll_tab_over');
        if ($(this).hasClass('scroll_tab_left_finisher')) {
          $('.scroll_tab_inner > ' + _this.itemTag + '.scroll_tab_first', _this).removeClass('scroll_tab_over').removeClass('scroll_tab_first_over');
        }
        if ($(this).hasClass('scroll_tab_right_finisher')) {
          $('.scroll_tab_inner > ' + _this.itemTag + '.scroll_tab_last', _this).removeClass('scroll_tab_over').removeClass('scroll_tab_last_over');
        }
        if ($(this).hasClass('scroll_tab_first') || $('.scroll_tab_inner > ' + _this.itemTag + '.scroll_tab_last', _this).hasClass('scroll_tab_first')) {
          $('.scroll_tab_inner > span.scroll_tab_left_finisher', _this).removeClass('scroll_tab_over').removeClass('scroll_tab_left_finisher_over');
        }
        if ($(this).hasClass('scroll_tab_last') || $('.scroll_tab_inner > ' + _this.itemTag + '.scroll_tab_first', _this).hasClass('scroll_tab_last')) {
          $('.scroll_tab_inner > span.scroll_tab_right_finisher', _this).removeClass('scroll_tab_over').removeClass('scroll_tab_right_finisher_over');
        }
      }).click(function (e) {
        e.stopPropagation();
        $('.tab_selected', _this).removeClass('tab_selected scroll_tab_first_selected scroll_tab_last_selected scroll_tab_left_finisher_selected scroll_tab_right_finisher_selected');
        $(this).addClass('tab_selected');

        var context_obj = this;
        if ($(this).hasClass('scroll_tab_left_finisher')) {
          context_obj = $('.scroll_tab_inner > ' + _this.itemTag + '.scroll_tab_first', _this).addClass('tab_selected').addClass('scroll_tab_first_selected');
        }
        if ($(this).hasClass('scroll_tab_right_finisher')) {
          context_obj = $('.scroll_tab_inner > ' + _this.itemTag + '.scroll_tab_last', _this).addClass('tab_selected').addClass('scroll_tab_last_selected');
        }
        if ($(this).hasClass('scroll_tab_first') || $('.scroll_tab_inner > ' + _this.itemTag + '.scroll_tab_last', _this).hasClass('scroll_tab_first')) {
          $('.scroll_tab_inner > span.scroll_tab_left_finisher', _this).addClass('tab_selected').addClass('scroll_tab_left_finisher_selected');
        }
        if ($(this).hasClass('scroll_tab_last') || $('.scroll_tab_inner > ' + _this.itemTag + '.scroll_tab_first', _this).hasClass('scroll_tab_last')) {
          $('.scroll_tab_inner > span.scroll_tab_right_finisher', _this).addClass('tab_selected').addClass('scroll_tab_left_finisher_selected');
        }

        // "Slide" it into view if not fully visible.
        scroll_selected_into_view.call(_this, state);

        opts.click_callback.call(context_obj, e);
      });

      // Check to set the edges as selected if needed
      if ($('.scroll_tab_inner > ' + _this.itemTag + '.scroll_tab_first', _this).hasClass('tab_selected')) $('.scroll_tab_inner > ' + _this.itemTag + '.scroll_tab_left_finisher', _this).addClass('tab_selected').addClass('scroll_tab_left_finisher_selected');
      if ($('.scroll_tab_inner > ' + _this.itemTag + '.scroll_tab_last', _this).hasClass('tab_selected')) $('.scroll_tab_inner > ' + _this.itemTag + '.scroll_tab_right_finisher', _this).addClass('tab_selected').addClass('scroll_tab_right_finisher_selected');
    };

    var scroll_selected_into_view = function scroll_selected_into_view(state) {
      var _this = this;

      var selected_item = $('.tab_selected:not(.scroll_tab_right_finisher, .scroll_tab_left_finisher)', _this);

      var left = $('.scroll_tab_inner', _this).scrollLeft();
      var scroll_width = $('.scroll_tab_inner', _this).width();
      if (selected_item && typeof selected_item !== 'undefined' && selected_item.position() && typeof selected_item.position() !== 'undefined') {
        if (selected_item.position().left < 0) {
          state.scrollPos = Math.max(left + selected_item.position().left + 1, 0);
          $('.scroll_tab_inner', _this).animate({ scrollLeft: left + selected_item.position().left + 1 + 'px' }, opts.scroll_duration);
        } else if (selected_item.position().left + selected_item.outerWidth() > scroll_width) {
          state.scrollPos = Math.min(left + (selected_item.position().left + selected_item.outerWidth() - scroll_width), $('.scroll_tab_inner', _this)[0].scrollWidth - $('.scroll_tab_inner', _this).outerWidth());
          $('.scroll_tab_inner', _this).animate({ scrollLeft: left + (selected_item.position().left + selected_item.outerWidth() - scroll_width) + 'px' }, opts.scroll_duration);
        }
      }
    };

    var ret = [];

    this.each(function () {
      var backup = $(this).html();

      var state = {};
      state.scrollPos = 0;
      initialize.call(this, state);

      var context_obj = this;

      ret.push({
        domObject: context_obj,
        state: state,
        addTab: function addTab(html, position) {
          if (typeof position === 'undefined') {
            position = $('.scroll_tab_inner > ' + context_obj.itemTag, context_obj).length - (context_obj.itemTag === 'span' ? 2 : 0);
          }

          $('.scroll_tab_inner > ' + context_obj.itemTag + '.scroll_tab_last', context_obj).removeClass('scroll_tab_last');
          $('.scroll_tab_inner > ' + context_obj.itemTag + '.scroll_tab_first', context_obj).removeClass('scroll_tab_first');
          backup = "";
          var count = 0;
          $('.scroll_tab_inner > ' + context_obj.itemTag, context_obj).each(function () {
            if ($(this).hasClass('scroll_tab_left_finisher') || $(this).hasClass('scroll_tab_right_finisher')) return true;
            if (position == count) {
              backup += html;
            }
            backup += $(this).clone().wrap('<div>').parent().html();
            count++;
          });

          if (position >= count) backup += html;

          this.destroy();
          initialize.call(context_obj, state);
          this.refreshFirstLast();
        },
        removeTabs: function removeTabs(jquery_selector_str) {
          $('.scroll_tab_left_finisher', context_obj).remove();
          $('.scroll_tab_right_finisher', context_obj).remove();

          $(jquery_selector_str, context_obj).remove();

          $('.scroll_tab_inner > ' + context_obj.itemTag + '.scroll_tab_last', context_obj).removeClass('scroll_tab_last');
          $('.scroll_tab_inner > ' + context_obj.itemTag + '.scroll_tab_first', context_obj).removeClass('scroll_tab_first');

          this.refreshState();
        },
        destroy: function destroy() {
          clearInterval(state.delay_timer);
          $(context_obj).html(backup);
          $(context_obj).removeClass('scroll_tabs_container');
        },
        refreshState: function refreshState() {
          $('.scroll_tab_inner > ' + context_obj.itemTag + '.scroll_tab_last', context_obj).removeClass('scroll_tab_last');
          $('.scroll_tab_inner > ' + context_obj.itemTag + '.scroll_tab_first', context_obj).removeClass('scroll_tab_first');
          backup = $('.scroll_tab_inner', context_obj).html();
          this.destroy();
          initialize.call(context_obj, state);
          this.refreshFirstLast();
        },
        clearTabs: function clearTabs() {
          backup = "";
          this.destroy();
          initialize.call(context_obj, state);
          this.refreshFirstLast();
        },
        refreshFirstLast: function refreshFirstLast() {
          var old_last_item = $('.scroll_tab_inner > ' + context_obj.itemTag + '.scroll_tab_last', context_obj);
          var old_first_item = $('.scroll_tab_inner > ' + context_obj.itemTag + '.scroll_tab_first', context_obj);

          old_last_item.removeClass('scroll_tab_last');
          old_first_item.removeClass('scroll_tab_first');

          if (old_last_item.hasClass('tab_selected')) $('.scroll_tab_inner > span.scroll_tab_right_finisher', context_obj).removeClass('tab_selected scroll_tab_right_finisher_selected');
          if (old_first_item.hasClass('tab_selected')) $('.scroll_tab_inner > span.scroll_tab_left_finisher', context_obj).removeClass('tab_selected scroll_tab_left_finisher_selected');

          if ($('.scroll_tab_inner > ' + context_obj.itemTag + ':not(.scroll_tab_right_finisher):not(.scroll_tab_left_finisher):visible', context_obj).length > 0) {
            var new_last_item = $('.scroll_tab_inner > ' + context_obj.itemTag + ':not(.scroll_tab_right_finisher):visible', context_obj).last();
            var new_first_item = $('.scroll_tab_inner > ' + context_obj.itemTag + ':not(.scroll_tab_left_finisher):visible', context_obj).first();

            new_last_item.addClass('scroll_tab_last');
            new_first_item.addClass('scroll_tab_first');

            if (new_last_item.hasClass('tab_selected')) $('.scroll_tab_inner > span.scroll_tab_right_finisher', context_obj).addClass('tab_selected').addClass('scroll_tab_right_finisher_selected');
            if (new_first_item.hasClass('tab_selected')) $('.scroll_tab_inner > span.scroll_tab_left_finisher', context_obj).addClass('tab_selected').addClass('scroll_tab_right_finisher_selected');
          } else {
            $('.scroll_tab_inner > span.scroll_tab_right_finisher', context_obj).hide();
            $('.scroll_tab_inner > span.scroll_tab_left_finisher', context_obj).hide();
          }
        },
        hideTabs: function hideTabs(domObj) {
          $(domObj, context_obj).css('display', 'none');
          this.refreshFirstLast();
        },
        showTabs: function showTabs(domObj) {
          var _$$css2;

          $(domObj, context_obj).css((_$$css2 = {
            'display': '-moz-inline-stack'
          }, _defineProperty(_$$css2, 'display', 'inline-block'), _defineProperty(_$$css2, '*display', 'inline'), _$$css2));
          this.refreshFirstLast();
        },
        scrollSelectedIntoView: function scrollSelectedIntoView() {
          scroll_selected_into_view.call(context_obj, state);
        }
      });
    });

    if (this.length == 1) {
      return ret[0];
    } else {
      return ret;
    }
  };

  $.fn.scrollTabs.defaultOptions = {
    scroll_distance: 300,
    scroll_duration: 300,
    left_arrow_size: 26,
    right_arrow_size: 26,
    left_arrow_content_html: '',
    right_arrow_content_html: '',
    click_callback: function click_callback(e) {
      var val = $(this).attr('rel');
      if (val) {
        window.location.href = val;
      }
    }
  };
})(jQuery);
//# sourceMappingURL=jquery.scrolltabs.js.map

'use strict';

(function ($, app) {

    'use strict';

    var _app$utils = app.utils,
        isDesktop = _app$utils.isDesktop,
        isMobile = _app$utils.isMobile;


    var makeSticky = function makeSticky(options) {

        var $this = $(this);

        var _$$extend = $.extend({}, options),
            start = _$$extend.start,
            end = _$$extend.end;

        var windowScrolling = function windowScrolling() {
            var $window = $(window);

            // if($window.width > 767){
            var position = $window.scrollTop();

            if (position < start) {
                $this.css('position', 'static');
                $('.shipping-delivery__summary').css('position', '');
                $('.shipping-delivery__summary').css('bottom', '');
                $('.shipping-delivery__summary').css('right', '');
            } else if (position >= start && position <= end) {
                $this.css('position', 'fixed');
                $this.css('top', '0px');
                $this.css('width', '282px');
            } else if (position >= end) {

                $this.css('position', 'static');
                $('.shipping-delivery__summary').css('position', 'absolute');
                $('.shipping-delivery__summary').css('bottom', '20px');
                $('.shipping-delivery__summary').css('right', '0px');
            }
            // }
        };

        var registerScolling = function registerScolling() {

            if (isMobile()) {
                return;
            }

            $(window).scroll(function () {
                windowScrolling();
            });
        };

        registerScolling();
    };

    $.fn.extend({
        makeSticky: makeSticky
    });
})(jQuery, window.amwayApp);

$('.shipping-delivery__side').makeSticky({
    start: 274,
    end: 940,
    top: 0
});

$('.payment-forms__side').makeSticky({
    start: 274,
    end: 600,
    top: 0
});

$('.order-preview__side').makeSticky({
    start: 274,
    end: 590,
    top: 0
});

$('.order-confirm__side').makeSticky({
    start: 350,
    end: 679,
    top: 0
});
//# sourceMappingURL=makeStiky.js.map

'use strict';

(function () {
  'use strict';

  $(window).resize(handleToggling);

  function handleToggling() {
    if (window.innerWidth < 768) {
      $('.quick-links__container').removeClass('col-md-8');
      $('.quick-links-js-header').addClass('collapsed');
      $('.quick-links-js-header').attr('data-toggle', 'collapse');
      $("ul[id^='quick-links-collapse']").removeClass('in');
      $("ul[id^='quick-links-collapse']").addClass('padding-left-20');
    } else {
      $('.quick-links__container').addClass('col-md-8');
      $('.quick-links-js-header').removeAttr('data-toggle');
      $("ul[id^='quick-links-collapse']").addClass('in');
      $("ul[id^='quick-links-collapse']").removeClass('padding-left-20');
    }
  }

  handleToggling();
})();
//# sourceMappingURL=quickLinks.js.map

'use strict';

(function () {
    'use strict';

    var DURATION = 300;

    function toggleLoginState(e) {
        e.stopPropagation();
        e.preventDefault();

        $('.topbar__popover:not(.authentication-js)').fadeOut(DURATION);
        $('.topbar__account').hasClass('active') ? $('.accountdp').fadeToggle(DURATION) : $('.login-form').fadeToggle(DURATION);

        var $topbarArrow = $('.topbar__arrow');
        if ($topbarArrow.hasClass('glyphicon-menu-down')) {
            $topbarArrow.removeClass('glyphicon-menu-down');
            $topbarArrow.addClass('glyphicon-menu-up');
        } else {
            $topbarArrow.addClass('glyphicon-menu-down');
            $topbarArrow.removeClass('glyphicon-menu-up');
        }
    }

    function hidePopups(e) {

        var $target = $(e.target);
        var isPopover = $target.parents('.topbar__popover').length || $target.hasClass('topbar__popover');

        if (isPopover) {
            return;
        }

        $('.topbar__popover').hide();
    }

    function showMinicart(e) {
        e.stopPropagation();
        e.preventDefault();

        $('.topbar__popover:not(.minicart)').fadeOut(DURATION);

        $('.topbar__account').hasClass('active') ? $('.minicart').fadeToggle(DURATION) : '';
    }

    function registerEvents() {
        $('.topbar__user-info').on('click', toggleLoginState);
        $('.topbar__cart').on('click', showMinicart);
        $('body').on('click', hidePopups);
    }

    registerEvents();
})();
//# sourceMappingURL=topbar.js.map

'use strict';

(function (app) {
    'use strict';

    var _app$utils = app.utils,
        isDesktop = _app$utils.isDesktop,
        isMobile = _app$utils.isMobile;


    function showMenu(e) {

        if (!isDesktop()) {
            return;
        }

        e.preventDefault();

        var $target = $(e.target);
        var isNavItem = $target.hasClass('main-menu__js-link') || $target.parent('.main-menu__js-link').length;
        if (isNavItem) {
            e.stopPropagation();
        }

        var $arrow = $('.main-menu__link--primary .main-menu__arrow-down');
        if ($arrow.hasClass('glyphicon-menu-down')) {
            $arrow.removeClass('glyphicon-menu-down').addClass('glyphicon-menu-up');
        } else {
            $arrow.removeClass('glyphicon-menu-up').addClass('glyphicon-menu-down');
        }

        $(e.target).parent('.main-menu__item').children('.mega-nav').fadeToggle("slow");
    }

    function hideNavigation(e) {
        if (!isDesktop()) {
            return;
        }

        var $target = $(e.target);
        var isMegaNav = $target.parents('.mega-nav').length || $target.hasClass('mega-nav');
        if (isMegaNav) {
            return;
        }
        $('.mega-nav').hide();
    }

    function registerMobileTab(e) {
        var $this = $(this);

        if (isDesktop()) {
            return;
        }

        var $tabItem = $this.parent();

        if (!$tabItem.hasClass('active')) {
            e.preventDefault();
            $this.tab('show');
        } else {

            $tabItem.removeClass('active');
            $($this.attr('href')).removeClass('active');
        }

        $tabItem.siblings().fadeToggle('slow');
        $this.parents('.main-menu__item').siblings().fadeToggle('slow');
    }

    function toggleActiveClass() {
        var $firstNavTab = $('.mega-nav__tab-js').children().eq(0);
        var $firstDetailsTab = $('.mega-nav__details-js').children().eq(0);

        if (isDesktop()) {
            $firstNavTab.addClass('active');
            $firstDetailsTab.addClass('active');
        } else {
            $firstNavTab.removeClass('active');
            $firstDetailsTab.removeClass('active');
        }
    }

    function registerDesktopTab(e) {
        if (isMobile()) {
            return;
        }

        e.preventDefault();
        $(this).tab('show');
    }

    function registerMobileMenu(e) {
        var $this = $(this);
        $this.hasClass('active') ? $this.removeClass('active') : $this.addClass('active');
        $('.main-menu').fadeToggle('slow');
    }

    function registerSubmenu(e) {
        if (isDesktop()) {
            return;
        }

        e.preventDefault();
        var $this = $(this);
        $this.hasClass('active') ? $this.removeClass('active') : $this.addClass('active');

        var $parentId = $this.parents('.tab-pane').attr('id');
        $('.mega-nav__tab-link[href="#' + $parentId + '"]').fadeToggle('slow');
        $this.siblings().fadeToggle('slow');
    }

    function registerEvents() {
        $('.main-menu__primary-js').on('click', showMenu);
        $('body').on('click', hideNavigation);
        $('#mega-nav__tab-js a').on('click', registerMobileTab);
        $('#mega-nav__tab-js a').on('mouseover', registerDesktopTab);
        $('.mega-nav__level1-item').on('click', registerSubmenu);
        $('.topbar__mobile-menu').on('click', registerMobileMenu);

        $(window).resize(function () {
            toggleActiveClass();
        });
    }

    function init() {
        registerEvents();
        toggleActiveClass();
    }

    init();
})(window.amwayApp);
//# sourceMappingURL=navigation.js.map

'use strict';

(function () {
    'use strict';

    function closeLoginForm(e) {
        e.preventDefault();

        $('.topbar__popover').fadeOut("slow");
    }

    function registerEvents() {
        $('.topbar__popover__close').on('click', closeLoginForm);
    }

    function init() {
        registerEvents();
    }

    init();
})();
//# sourceMappingURL=loginForm.js.map

'use strict';

$(document).ready(function () {
    $('.carousel[data-type="multi"] .item').each(function () {
        var next = $(this).next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));

        for (var i = 0; i < 4; i++) {
            next = next.next();
            if (!next.length) {
                next = $(this).siblings(':first');
            }

            next.children(':first-child').clone().appendTo($(this));
        }
    });
});
//# sourceMappingURL=productCarousel.js.map

'use strict';

(function (app) {
    'use strict';

    var _app$utils = app.utils,
        isDesktop = _app$utils.isDesktop,
        isMobile = _app$utils.isMobile;


    function enablingTabScrolling() {

        $('#productListTab').slick({
            dots: false,
            infinite: false,
            speed: 300,
            slidesToShow: 5,
            slidesToScroll: 5,
            responsive: [{
                breakpoint: 767,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            }]
        });
        $('#productListHome1,#productListHome2').slick({
            dots: false,
            infinite: false,
            speed: 300,
            slidesToShow: 5,
            slidesToScroll: 5,
            responsive: [{
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }]
        });
        $('#category-roll').slick({
            dots: false,
            infinite: false,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 3,
            responsive: [{
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });

        $('#productSuggestListTabs').slick({
            dots: false,
            infinite: false,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 4,
            responsive: [{
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });

        $('#productLearningListTabs').slick({
            dots: false,
            infinite: false,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 3,
            responsive: [{
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });

        $('.product-detail-js').slick({
            dots: false,
            infinite: false,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 3,
            responsive: [{
                breakpoint: 9999,
                settings: 'unslick'
            }, {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });

        $('#recentlyViewedListTab').slick({
            dots: false,
            infinite: false,
            speed: 300,
            slidesToShow: 7,
            slidesToScroll: 7,
            responsive: [{
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }]
        });
    }

    function showImage() {}

    function registerEvents() {
        $('.product-description__imageslist li').on('click', showImage);
    }

    function init() {
        enablingTabScrolling();
    }

    init();
})(window.amwayApp);
//# sourceMappingURL=productDetail.js.map

'use strict';

(function () {
    'use strict';

    $('#sponsorshipTabList').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        }, {
            breakpoint: 767,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });
})();
//# sourceMappingURL=sponsorshipSlider.js.map

'use strict';

(function () {
    'use strict';

    $('.scrollbox-js').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [{
            breakpoint: 767,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
        ]
    });
})();
//# sourceMappingURL=scrollBox.js.map

'use strict';

(function () {

    'use strict';

    function login() {
        $('.topbar__user-icon').css('background-image', 'url(images/logged_in_user.jpg)');
        $('.topbar__account').addClass('active');
        $('.login-form').fadeToggle('slow');
    }

    function registerEvents() {
        $('.login-form__submit').on('click', login);
    }

    function init() {
        registerEvents();
    }

    init();
})();
//# sourceMappingURL=account.js.map

'use strict';

$(document).ready(function () {
    $("#top-image").mousemove(function (e) {
        var imageHeight = document.getElementById('top-image').height;
        var winHeight = $(window).height();
        var newvalueY = e.pageY * (imageHeight - winHeight) / winHeight;
        $('#top-image').css("top", "-" + newvalueY + "px");
    });
});
//# sourceMappingURL=superImage.js.map

'use strict';

(function () {
    'use strict';

    var SPEED = 'slow';

    function showSearchResults() {
        var $this = $(this);

        var $searchResult = $('.search-results');
        if ($this.val().length >= 3) {
            $searchResult.fadeIn(SPEED);
        } else {
            $searchResult.fadeOut(SPEED);
        }
    }

    function closeSearchResults() {
        var $searchResult = $('.search-results').fadeOut(SPEED);
        $('.main-menu__search-input').val('');
    }

    function registerEvents() {
        $('.main-menu__search-input').on('keyup', showSearchResults);
        $('.search-results__close').on('click', closeSearchResults);
    }

    function init() {
        registerEvents();
    }

    init();
})();
//# sourceMappingURL=searchResults.js.map

'use strict';

$(document).ready(function () {

    // Prevent dropdown to be closed when we click on an accordion link
    $('.dropdown-accordion').on('click', 'h5[data-toggle="collapse"]', function (event) {
        event.preventDefault();
        event.stopPropagation();
        $($(this).data('parent')).find('.panel-collapse.in').collapse('hide');
        $($(this).attr('href')).collapse('show');
    });

    $('.cart-detail__addto-options').on('click', function (event) {
        event.stopPropagation();
    });
});
//# sourceMappingURL=dropdownCollapse.js.map

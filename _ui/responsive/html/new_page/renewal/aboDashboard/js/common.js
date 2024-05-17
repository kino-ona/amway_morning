var AMWAY = (function () {
	var callLayer = function () {
		$('[data-layer]').each(function(i){
			$(this).off().on('click',layer_open)
		})
	};

	function layer_open(e) {
		var targetId = $(this).data('layer');
		var targetLayer = $('#' + targetId);

		if(targetLayer && !targetLayer.hasClass('showing')) {

			targetLayer.addClass( 'showing' );

			if (targetLayer.is('.layer-area, #cartLayer')) {
				$( 'html, body' ).addClass( 'scroll-off' );
			}

			// header back button, layer close event
			targetLayer.find('.pop_head .btn_close, .pop_head .btn_back, .btn_layer-close, .btn-modal_close').off().on('click',function(e) {

				if($('.showing').length == 1) {
					$( 'html, body' ).removeClass( 'scroll-off' );
				}

				targetLayer.removeClass( 'showing' );
			})
		}
	}

	function floatingCtrl() {
		$( '.renewal-fonts input[type="text"], .renewal-fonts input[type="tel"]' )
			.not('.renewal-fonts input[readonly], .box_spinor-mobile .form_input')
            .on( 'focus blur', function (e) {
			var mobileFloating = $('.box_mobile-floating');

			if (e.type === 'focus') {
				mobileFloating.addClass('hidden');
			} else if (e.type === 'blur') {
				mobileFloating.removeClass('hidden');
			}
		} );
	}

	window.addEventListener( 'DOMContentLoaded', function () {
		floatingCtrl();
	} );

	return {
		callLayer : callLayer,
	}

	/* sopSearchTopCheck(); */
})();
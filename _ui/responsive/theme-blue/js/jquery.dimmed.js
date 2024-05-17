/********************************************************************************************************************

        Loading Layer v1 with JQuery
        Create Date 2014. 5. 12.
        Developer : Parkheesung (parkheesung@outlook.com)
        Website : Parkheesung.com

********************************************************************************************************************/

function Dimmed(Checker, callback) {


    if (typeof (Checker) == "boolean") {
        var dh = $(document).outerHeight(true);
        var wh = $(window).outerHeight(true);
        var h = (dh > wh) ? dh : wh;

        var dw = $(document).outerWidth(true);
        var ww = $(window).outerWidth(true);
        var w = (dw > ww) ? dw : ww;

        var posX = (w / 2) - 34;
        var posY = (wh / 2) - 34;

        if (Checker) {
            if (document.getElementById("DimmedDivLayer") == null) {
                var loadingTag = "<div id=\"DimmedDivLayer\" class=\"LoadingDiv fullsize\" style=\"height:" + String(h) + "px; z-index:2147483640;\">";
                loadingTag += "<div class=\"LoadingForeground\" style=\"height:" + String(h) + "px;\">";
                loadingTag += "<div class=\"LoadingBox\" style=\"top:" + String(posY) + "px;left:" + String(posX) + "px;\">";
//                loadingTag += "<img src=\"" + LoadingImage + "\" alt=\"Loading...\" />";
                loadingTag += "</div>";
                loadingTag += "</div>";
                loadingTag += "<div class=\"LoadingBackground\" style=\"height:" + String(h) + "px\">";
                loadingTag += "</div>";
                loadingTag += "</div>";
                $("body").prepend(loadingTag);
                $("#DimmedDivLayer").fadeIn(350, function () {
                    if (callback != null) {
                        callback();
                    }
                });
            }
        } else {
            if (document.getElementById("DimmedDivLayer") != null) {
                $("#DimmedDivLayer").remove();
                if (callback != null) {
                    callback();
                }
            }
        }
    } else if (typeof (Checker) == "string" && document.getElementById(String(Checker)) != null) {
        var parentLayer = document.getElementById(String(Checker));
        if (document.getElementById("DimmedDivLayer_" + String(Checker)) == null) {
        	
        	 var off = $(parentLayer).offset();
             var posX = ($(parentLayer).width() / 2) - 34;
             var posY = ($(parentLayer).height() / 2) - 34;

            var loadingTag = "<div id=\"DimmedDivLayer_" + String(Checker) + "\" class=\"LoadingDiv\" style=\"width:" + String($(window).width()) + "px;height:" + String($(parentLayer).height()) + "px;top:" + String(off.top) + "px;left:" + String(off.left) + "px; z-index:900\">";
            loadingTag += "<div class=\"LoadingForeground\" style=\"height:" + String($(parentLayer).height()) + "px;\">";
            loadingTag += "<div class=\"LoadingBox\" style=\"top:" + String(posY) + "px;left:" + String(posX) + "px;\">";
//            loadingTag += "<img src=\"" + LoadingImage + "\" alt=\"Loading...\" />";
            loadingTag += "</div>";
            loadingTag += "</div>";
            loadingTag += "<div class=\"LoadingBackground\" style=\"width:" + String($(window).width()) + "px;height:" + String($(parentLayer).height()) + "px\">";
            loadingTag += "</div>";
            loadingTag += "</div>";
            $(parentLayer).prepend(loadingTag);
            $("#DimmedDivLayer_" + String(Checker)).fadeIn(350, function () {
                if (callback != null) {
                    callback();
                }
            });
        } else {
            $("#DimmedDivLayer_" + String(Checker)).remove();
            if (callback != null) {
                callback();
            }
        }
    }
};

$(window).resize(function () {
    if (document.getElementById("DimmedDivLayer") != null) {
        var dh = $(document).outerHeight(true);
        var wh = $(window).outerHeight(true);
        var h = (dh > wh) ? dh : wh;

        var dw = $(document).outerWidth(true);
        var ww = $(window).outerWidth(true);
        var w = (dw > ww) ? dw : ww;

        var posX = (w / 2) + 14;
        var posY = (h / 2) + 14;

        $("#DimmedDivLayer").css({
            height:String(h) + "px"
        });

        $("#DimmedDivLayer > .LoadingForeground").css({
            height: String(h) + "px"
        });

        $("#DimmedDivLayer > .LoadingForeground > .LoadingBox").css({
            top: String(posY) + "px",
            left: String(posX) + "px"
        });

        $("#DimmedDivLayer > .LoadingBackground").css({
            height: String(h) + "px"
        });
    }
});
$(document).ready(function() {
	try {
		Kakao.init("6726d3850baedc5ce05d245b98f0dcbd");
	} catch(e) {}
	// 모바일 가로/세로 resize
	$(window).on("orientationchange", function(event){
		setTimeout(function(){ abnkorea_resize(); }, 500);
	});
});

function sharing(url, title, sns, content) {
	var imgUrl = 'http://' + location.host + '/images/amwSig.jpg';
	
	utag.link({
	    event_name: "social_share",
	    social_type: sns //kakaotalk, Band, twitter, facebook, kakaostory, urlsharing, print 등
	})
	
	$("#metaTitle").attr("content", title);
	$("#metaContent").attr("content", content);
	$("#metaUrl").attr("content", url);
	$("#metaImage").attr("content", imgUrl);
	
	console.log(">>>> title = " + title);
	console.log(">>>> content = " + content);
	console.log(">>>> url = " + url);
	
	if(sns.toLowerCase() == "facebook") {

		var faceobj = window.open("about:blank", 'facebookpop','toolbar=0, menubar=no');
		faceobj.location.href = 'http://m.facebook.com/sharer.php?u=' + encodeURIComponent(url);
		
		return false;
		
	} else if(sns.toLowerCase() == "band") {
		
		var shareUrl = "http://band.us/plugin/share?body=" + encodeURIComponent(content) + "&route=" + encodeURIComponent(url);
		window.open(shareUrl, '', 'resizable=no,status=no,location=no,toolbar=no,menubar=no,fullscreen=no,scrollbars=no,dependent=no,widt=600,height=600'); 
		
		return false;
		
	} else if(sns.toLowerCase() == "kakaostory") {
		 Kakao.Story.open({
	        url: url,
	        text: content,
			urlInfo: {
				title: '암웨이',
				desc: '암웨이 예약',
				name: '암웨이 코리아',
				images: [imgUrl]
			}
	      });

	} else {
		
		// 카카오톡인경우 제목은 한국암웨이 내용을 기사제목으로 한다.
        Kakao.Link.sendDefault({
            objectType : 'feed',
            content : {
                title : title,
                description : content,
                imageUrl : imgUrl,
                imageWidth : 400,
                imageHeight : 250,
                link : {
                    mobileWebUrl : url
                }
            },
            buttons: [{
                title: "홈페이지로 가기",
                link: {
                    mobileWebUrl : url
                }
            }]
        });

	}
}
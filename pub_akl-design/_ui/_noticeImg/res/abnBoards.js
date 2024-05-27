var now = new Date();
var dday =
leadingZeros(now.getFullYear(), 4) +
leadingZeros(now.getMonth() + 1, 2) +
leadingZeros(now.getDate(), 2) +
leadingZeros(now.getHours(), 2) +
leadingZeros(now.getMinutes(), 2);

function leadingZeros(n, digits) {
	var zero = '';
	n = n.toString();
	if (n.length < digits) {
		for (i = 0; i < digits - n.length; i++)
		zero += '0';
	}
	return zero + n;
}

var UserAgent = navigator.userAgent;
var UserMatch1 = UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i);
var UserMatch2 = UserAgent.match(/LG|SAMSUNG|Samsung/);
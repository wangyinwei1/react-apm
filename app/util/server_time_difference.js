import http from '../fetch/http.js';
//获取服务器的时间差
function getSeverDateTime() {
	var data = http.get('system/systime').then(function(res){
		window.timeD_value = new Date() - new Date(res.systemTime);
	});

	return data
}
getSeverDateTime()

setInterval(function() {
	getSeverDateTime();
}, 300000);
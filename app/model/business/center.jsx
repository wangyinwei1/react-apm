import http from '../../services/http.js';

/*
    向服务端请求业务系统列表
*/			
export function requireApplicationsModel(){
    let result = null;
    http.get('apm/applications').then(function(res){
        console.log(res);
       result = res.applications;
    });
    console.log(result);
	return result
}
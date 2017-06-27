import http from '../../fetch/http.js';
import { performancesParam } from './center_param.jsx';
import performancesCompletion from './center_performancesCompletion.jsx';
import { applicationsAction, performancesAction, appMunesAction, serviceTimeDifferenceAction } from '../../states/actions/business/business_actions.jsx';
import CalculateAxis from './center_axis_length.jsx';

/*
    向服务端请求业务系统列表
    @return {Object} {id:[]} 性能数据，坐标轴数据 
*/
export function requireApplications() {
    return dispatch => {
        //业务中心的请求
        let applications = http.get('applications').then(function (applications) {
            //应用系统数据发起action
            dispatch(applicationsAction(applications));
            return applications;
        });
        applications.then(function (res) {
            let result = res.applications;
            //获取性能数据接口的参数
            let param = performancesParam(result);
           
            //请求多个应用的性能数据echart展现
            http.get('performances', param).then(function (response) {
                let performances = {},
                    xAxisData =[];
                _.forEach(result, function (app) {
                    performances[app.id] = performancesCompletion(response[app.id], param.startDate, param.endDate);
                    let startDate = APM_moment(performances[app.id][0].timestamp).format('HH:mm');
                    let endDate = APM_moment(performances[app.id][performances[app.id].length-1].timestamp).format('HH:mm');
                    xAxisData = new CalculateAxis().refresh(startDate, endDate);
                });
                //性能数据和坐标轴数据发起action
                dispatch(performancesAction({performances,xAxisData}));
            })
        });
    }
}
/*
    业务仪表盘向服务端请求业务系统列表
    @return {Object} {id:[]} 
*/
export function requireAppMunes() {
    return dispatch => {
         //业务中心的请求
        let applications = http.get('applications').then(function (applications) {
            //应用系统数据发起action
            dispatch(appMunesAction(applications));
        });
    }
}


/*
    获取服务器的时间差
    @return {Object} {id:[]} 
*/
export function serviceTimeDifference() {
    return dispatch => {
        var data = http.get('system/systime').then(function(res){
            let timeD_value = new Date() - new Date(res.systemTime);

            dispatch(serviceTimeDifferenceAction(timeD_value))
        });
    }
}

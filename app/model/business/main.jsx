import http from '../../fetch/http.js';
import { performancesParam } from './center_param.jsx';
import performancesCompletion from './center_performancesCompletion.jsx';
import { applicationsAction, performancesAction } from '../../states/actions/business/center_actions.jsx';
import CalculateAxis from './center_axis_length.jsx';
/*
    向服务端请求业务系统列表
    @return {Object} {performances:[],performancesAxis:[]} 性能数据，坐标轴数据 
*/
export function requireApplications() {
    return dispatch => {
        //业务中心的请求
        let applications = http.get('apm/applications').then(function (applications) {
            //应用系统数据发起action
            dispatch(applicationsAction(applications));

            return applications;
        });

        applications.then(function (res) {
            let result = res.applications;
            //获取性能数据接口的参数
            let param = performancesParam(result);
           
            //请求多个应用的性能数据echart展现
            http.get('apm/performances', param).then(function (response) {
                let performances =[],
                    xAxisData =[];
                _.forEach(result, function (app) {
                    performances = performancesCompletion(response[app.id], param.startDate, param.endDate);
                    let startDate = APM_moment(performances[0].timestamp).format('hh:mm');
                    let endDate = APM_moment(performances[performances.length-1].timestamp).format('hh:mm');
                    xAxisData = new CalculateAxis().refresh(startDate, endDate);
                });
                //性能数据和坐标轴数据发起action
                dispatch(performancesAction({performances,xAxisData}));
            })
           
        });
    
        
    }
}

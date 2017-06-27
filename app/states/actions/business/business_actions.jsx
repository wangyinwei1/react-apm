import { APPLICATIONS, INCREMENT_COUNTER, DECREMENT_COUNTER, PERFORMANCES, APPMUNES, SERVICEDIFFERENCE } from './action_type_name.jsx';

import http from '../../../fetch/http.js';

import { performancesParam } from '../../../model/business/center_param.jsx';
import performancesCompletion from '../../../model/business/center_performancesCompletion.jsx';

/**************************** 业务中心 **************************/
/*
    向服务端请求业务系统列表action
*/
export function applicationsAction(res) {
	return {
		type: APPLICATIONS,
		payload: { applicaitons: res.applications }
	}
}
/*
    向服务端请求业务系统列表的60分钟性能数据action
*/
export function performancesAction(res) {
	return {
		type: PERFORMANCES,
		payload: res
	}
}
/**************************** 业务时间轴 **************************/
/*
    向服务端请求业务系统列表action
*/
export function appMunesAction(res) {
	return {
		type: APPMUNES,
		payload: { applicaitonMunes: res.applications }
	}
}
/**************************** 获取服务器时间差 **************************/
export function serviceTimeDifferenceAction(time) {
	return {
		type: SERVICEDIFFERENCE,
		payload: { timeD_value: time }
	}
}

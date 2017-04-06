import { APPLICATIONS, INCREMENT_COUNTER, DECREMENT_COUNTER, PERFORMANCES } from './action_type_name.jsx';

import http from '../../../fetch/http.js';

import { performancesParam } from '../../../model/business/center_param.jsx';
import { Ctrl_business, data } from '../../../controllers';

import performancesCompletion from '../../../model/business/center_performancesCompletion.jsx';


/*
    向服务端请求业务系统列表action
*/
export function applicationsAction(res) {
	console.log(res);
	return {
		type: APPLICATIONS,
		payload: { applicaitons: res.applications }
	}
}
/*
    向服务端请求业务系统列表的60分钟性能数据action
*/
export function performancesAction(res) {
	console.log(res);
	return {
		type: PERFORMANCES,
		payload: res
	}
}


// /*
//     向服务端请求性能数据
// */
// export function increment() {
// 	return {
// 		type: INCREMENT_COUNTER,
// 		payload: Ctrl_business.histogramPerformance()
// 	}
// }

// console.log(Ctrl_business.histogramPerformance());
// export function decrement() {
// 	return {
// 		type: DECREMENT_COUNTER,
// 		payload: data.histogramPerformance()
// 	}
// }

// export function decrementAsync(delay = 100) {

// 	return dispatch => {
// 		setTimeout(() => {
// 			dispatch(decrement())
// 		}, delay)
// 	}
// }

// export function incrementAsync(delay = 100) {

// 	return dispatch => {
// 		setTimeout(() => {
// 			dispatch(increment())
// 		}, delay)
// 	}
// }
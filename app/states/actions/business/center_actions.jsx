export const ALL_APPLICATIONS = 'ALL_APPLICATIONS';
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';
import http from '../../../services/http.js';

import { requireApplicationsModel } from '../../../model/business/center.jsx';
import { Ctrl_business, data } from '../../../controllers';

export function applicationsAction(res){
	return {
		type: ALL_APPLICATIONS,
		payload: {applicaitons: res.applications}
	}
}
/*
    向服务端请求业务系统列表
*/	
export function requireApplications(){
	return dispatch => {

        http.get('apm/applications').then(function(res){
            dispatch(applicationsAction(res))
        });
			
	}
}
/*
    向服务端请求性能数据
*/	
export function increment(){
	return {
		type: INCREMENT_COUNTER,
		payload: Ctrl_business.histogramPerformance()
	}
}

export function decrement(){
	return {
		type: DECREMENT_COUNTER,
		payload: data.histogramPerformance()
	}
}

export function decrementAsync(delay = 100){

	return dispatch => {
		setTimeout(() => {
			dispatch(decrement())
		},delay)
	}
}

export function incrementAsync(delay = 100){

	return dispatch => {
		setTimeout(() => {
			dispatch(increment())
		},delay)
	}
}
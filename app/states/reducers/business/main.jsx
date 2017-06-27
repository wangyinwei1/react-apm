import { APPLICATIONS, INCREMENT_COUNTER, DECREMENT_COUNTER, PERFORMANCES, APPMUNES, SERVICEDIFFERENCE } from '../../actions/business/action_type_name.jsx';

/**************************** 业务中心 **************************/
export function center(state = {
		performances:[],
		applicaitonMunes:[],
		xAxisData:[]
	}, action){

	switch (action.type){
		case APPLICATIONS:
			return Object.assign({}, state, action.payload)
        case INCREMENT_COUNTER:
			return Object.assign({}, state, action.payload)
		case DECREMENT_COUNTER:
		    return Object.assign({}, state, action.payload)
		case PERFORMANCES:
		    return Object.assign({}, state, action.payload)
		default:
			return state
	}

}
/**************************** 业务时间轴 **************************/
export function detail(state = {
		applicaitonMunes:[],
		timeD_value:0
	}, action){

	switch (action.type){
		case APPMUNES:
			return Object.assign({}, state, action.payload)
		case SERVICEDIFFERENCE:
			return Object.assign({}, state, action.payload)
		default:
			return state
	}

}
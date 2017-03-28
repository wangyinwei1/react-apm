import { ALL_APPLICATIONS, INCREMENT_COUNTER, DECREMENT_COUNTER } from '../../actions/business/center_actions.jsx';

export default function conter(state = {
		data:[],
		xAxisData:[]}, action){

	switch (action.type){
		case ALL_APPLICATIONS:
            console.log(action.payload);
			return Object.assign({}, state, action.payload)
        case INCREMENT_COUNTER:
			return Object.assign({}, state, action.payload)
		case DECREMENT_COUNTER:
		    return Object.assign({}, state, action.payload)
		default:
			return state
	}

}
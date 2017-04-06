import { APPLICATIONS, INCREMENT_COUNTER, DECREMENT_COUNTER, PERFORMANCES } from '../../actions/business/action_type_name.jsx';

export default function conter(state = {
		performances:[],
		xAxisData:[]}, action){

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
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import center from './business/center.jsx'
//使用redux的combineReducers方法将所有reducer打包起来
const rootReducer = combineReducers({
  center,
  routing: routerReducer
})

export default rootReducer

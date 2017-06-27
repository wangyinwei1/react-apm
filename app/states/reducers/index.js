import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { center, detail } from './business/main.jsx'

//使用redux的combineReducers方法将所有reducer打包起来
const rootReducer = combineReducers({
  center,
  detail,
  routing: routerReducer
})

export default rootReducer

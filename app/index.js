
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createHashHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './states/store/appStore.jsx';
import subscriptions from './states/subscriptions/index.jsx';
import { Router, Route, IndexRoute, hashHistory , browserHistory, IndexRedirect, useRouterHistory} from 'react-router';
import './theme/ant_design.css';
import './theme/public.css';
console.log(3123);
//唯一的状态树
const store = configureStore();

//设置hash路由
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

//创建一个增强版的history来结合store同步导航事件
const history = syncHistoryWithStore(appHistory, store)


//订阅监听路由变化
subscriptions(store.dispatch,history);

var routers = require('./router').default.init();

let root = document.getElementById('layout-content');

render( 
	<Provider store={store}>
	 	<Router history={history}>
		  { routers }
		</Router>
	</Provider>, 
    root
);

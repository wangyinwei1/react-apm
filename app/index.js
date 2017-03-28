
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createHashHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './states/store/appStore.jsx';
import subscriptions from './states/subscriptions/index.jsx';
import { Router, Route, IndexRoute, hashHistory , browserHistory, IndexRedirect, useRouterHistory} from 'react-router';
import './theme/public.css';

//头部iconfont样式
import './theme/fonts.css';


import Facotry from './factory.js';
// 加载全局对象
Facotry.loadObjects();
// 加载全局函数
Facotry.loadFunctions();
// 加载装饰器
Facotry.loadDecorators();
// // 进行对象挂载
// Facotry.inject();

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
//组件对象集合
import { App } from './routers';

render( 
	<Provider store={store}>
	 	<Router history={history}>
		  { routers }
		</Router>
	</Provider>, 
    root
);

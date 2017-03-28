
import { createHashHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from '../states/store/appStore.jsx';
import { useRouterHistory} from 'react-router';


const History = {

	_history(){
		//唯一的状态树
		const store = configureStore();

		//设置hash路由
		const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

		//创建一个增强版的history来结合store同步导航事件
		const history = syncHistoryWithStore(appHistory, store)
		
		return history;
	},

}

export default History._history();
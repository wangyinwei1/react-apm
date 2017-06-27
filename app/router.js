import React from 'react';
import { Router, Route, IndexRoute, IndexRedirect } from 'react-router';

//组件对象集合
import { Business,Detail} from './containers';


//路由配置
function getRoutes() {
    const Routes = (
        <Route name="home" breadcrumbName="业务中心" path="/">
            <IndexRedirect to="business/center" />
            <Route path="business" >
                <IndexRedirect  to='center' />
                <Route  path="center" component={Business} />
                    <Route name="home" breadcrumbName=":id" path=":id" component={Detail} >
                    {/* <Route path="gauge" component={Business.lianxi} /> */}
                </Route>
            </Route>

        </Route>
    );
    return Routes;
}



export default {
    init() {
        return getRoutes();
    }
};
import React from 'react';
import { Router, Route, IndexRoute, IndexRedirect } from 'react-router';

//组件对象集合
import { Business,Detail} from './containers';


//路由配置
function getRoutes() {
    const Routes = (
        <Route path="/">
            <IndexRedirect to="business" />
            <Route path="business" >
                <IndexRedirect to='center' />
                <Route path="center" component={Business} />
                <Route path=":id" component={Detail} >
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
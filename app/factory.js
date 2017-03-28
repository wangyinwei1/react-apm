

export default class Factory {
    /**
     * 注入对象
     */
    // static inject() {
    //     window.App = {};
    //     const suffix = './';
    //     const beans = require('./beans');
    //     const load = (beans, constainer) => {
    //         for (let name in beans) {
    //             const bean = beans[name];
    //             if (typeof bean === 'object') {
    //                 constainer[name] = {};
    //                 load(bean, constainer[name]);
    //             } else if (typeof bean === 'string') {
    //                 const path = suffix + bean;
    //                 Log.info('加载', bean);
    //                 try {
    //                     constainer[name] = require(path).default;
    //                 } catch (err) {
    //                     constainer[name] = false;
    //                     Log.error(err);
    //                 }
    //             }
    //         }
    //     }
    //     load(beans, window.App);
    // }
    /**
     * 加载全局对象
     */
    static loadObjects() {
        window.APM = {};
        
    }
    /**
     * 加载全局方法
     */
    static loadFunctions() {
        // const Functions = require('./commons/Functions');
        // window.__classnames__ = Functions.classnames;
        // window.__parseUrl__ = Functions.pasreUrl;
        // window.message = message;
    }
    /**
     * 加载装饰器
     */
    static loadDecorators() {
        // window.autowired = require('./decorators/autowired').default;
        // window.mixin = require('./decorators/mixin').default;
    }
}

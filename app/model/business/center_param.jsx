import http from '../../fetch/http.js';

/*
    向服务端请求多个应用系统的性能数据的参数
    @param {array} applications 多个应用的数据数组
    @return system_ids {array} 多个应用id数组 [id,id,id]
    @return startDate {+date} 开始时间时间戳
    @return endDate {+date}  结束时间时间戳
*/
export function performancesParam(applications) {
    var appIds = _.map(applications, function (app) {
        return app.id;
    });

    if (appIds.length == 0) {
        throw '没有应用系统';
    }
    var startDate, endDate;

    endDate = new Date(new Date() - timeD_value);
    endDate.setMinutes(endDate.getMinutes() - 1);
    endDate.setSeconds(0);
    endDate.setMilliseconds(0);
    startDate = new Date(+endDate)
    startDate.setHours(startDate.getHours() - 1);

    var param = {
        system_ids: appIds.join(),
        startDate: +startDate,
        endDate: +endDate,
    }

    return param;
}
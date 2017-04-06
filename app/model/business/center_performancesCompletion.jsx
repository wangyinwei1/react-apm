/*
    自动智能补全性能数据以填充图标, 按每分钟一条数据
    @param {array} performances 性能数组
    @param {nunber} startDate 补全后的目标长度
    @param {date} endDate 结束时间
    @param {string} dateType 时间显示类型{1.今天，2.昨天，3.上周}
    @return {array} performancesCompletion [{timestamp:时间戳},{timestamp:时间戳}] 
*/
function performancesCompletion(performances, startDate, endDate, dateType) {
    startDate = new Date(+startDate),
        endDate = new Date(+endDate);
    if (!startDate && !endDate) {
        return;
    }

    performances = performances || [];

    startDate.setSeconds(0);
    startDate.setMilliseconds(0);
    endDate.setSeconds(0);
    endDate.setMilliseconds(0);

    var performancesMap = {};
    for (var i = performances.length - 1; i >= 0; i--) {
        performancesMap[performances[i].timestamp] = performances[i];
        if (dateType) {
            performances[i].timestampType = dateType;
        }
    }

    var timestamp = +startDate,
        newPerformances = [];

    for (; timestamp < +endDate; timestamp += 60000) {
        if (!performancesMap[timestamp]) {
            newPerformances.push({
                "timestamp": timestamp
            });
        } else {
            newPerformances.push(performancesMap[timestamp]);
        }
    }

    return newPerformances;
}

export default performancesCompletion;
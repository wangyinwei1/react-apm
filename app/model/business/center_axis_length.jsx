'use strict';
class CalculateAxis {

     constructor(name) {
        //间隔5分钟
        this.interval = 5;
        //模式 默认hour  回溯模式设置为month
        this.mode = 'hour'
    }

    refresh(startTime, endTime) {
        switch (this.mode) {
            case 'month':
                return this.refreshMonth(startTime, endTime);
            case 'hour':
            default:
                return this.refreshHour(startTime, endTime);
        }
    }

    refreshHour(startTime, endTime) {
        return this.getTimeData(startTime, endTime);;
    }

    //得到转化后分钟数的和的数组[160,165,170](间隔interval为1分钟)
    getTimeData(startTime, endTime) {
        let start = this.timeToMinute(startTime),
            end = this.timeToMinute(endTime),
            interval = this.interval,
            arr = [];

        //0点过度时候结束时间小于开始时间,修正
        (end < start) && (end += 24 * 60);
        
        for (var value = (Math.floor(start / interval) + 1) * interval; value <= end; value += interval) {
            arr.push(this.minuteToTime(value));
        }

        (start % interval == 0) && arr.unshift(this.minuteToTime(start));

        return arr;
    }
    //转化为分钟数
    timeToMinute(time) {
        return this.sumMinute.apply(this, time.split(':'));
    }

    //求和		
    sumMinute(h, m) {
        return parseInt(h, 10) * 60 + parseInt(m, 10);
    }

    minuteToTime (minute) {
        var remainder = minute % 60;
        return this.fillZero((minute - remainder) / 60 % 24) + ':' + this.fillZero(remainder);
    }
    
    fillZero (num) {
        return num < 10 ? ('0' + num) : num;
    }
}



export default CalculateAxis;
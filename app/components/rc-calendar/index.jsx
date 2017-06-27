'use strict'
import React, { Component, PropTypes } from 'react';

import CSSModules from 'react-css-modules';
import { immutableRenderDecorator } from "react-immutable-render-mixin";

import MonthCalendar from 'rc-calendar/lib/MonthCalendar';
import DatePicker from 'rc-calendar/lib/Picker';

import 'rc-calendar/assets/index.css';
import style from './index.less';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import enUS from 'rc-calendar/lib/locale/en_US';
//国际化配置

import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';

@immutableRenderDecorator //提高setState频繁触发的性能问题，减少渲染次数

/*
   下拉框组件
    @props {data} performances 应用总数的数组
    @props {currentId} string 当前应用id
    @props {changeMune} function 点击切换触发的事件函数
    @props {currentValue} string 当前应用name的值
*/
class MyselfMonthCalendar extends Component {
    constructor(props) {
        super(props)
        this._onStandaloneChange = this._onStandaloneChange.bind(this);
        this._switchToCurrentTime = this._switchToCurrentTime.bind(this)
        this.now = this.props.currentValue
    }
    state = {
        disabled: false,
        oldDate: this.props.currentValue
    }
    _onStandaloneSelect() {

    }
    //时间组件改变时间
    _onStandaloneChange(value) {
        const {selectedMonth} = this.props;
        this.state.oldDate.format('YYYY') == value.format('YYYY') && selectedMonth(value);
        this.setState({
            oldDate: value
        })
    }
    //切换到当前时间
    _switchToCurrentTime(){
        const {selectedMonth, defaultValue} = this.props;
        let currentTime = defaultValue;
        selectedMonth(currentTime)
         this.setState({
            oldDate: currentTime
        })
    }
    render() {
        const defaultCalendarValue = this.now.clone();

        const format = 'YYYY年MM月';
        return (
            <div className='rc_calendar_time_wrapper'>
                <MonthCalendar
                    locale={zhCN}
                    style={{ zIndex: 1000 }}
                    disabledDate={this._disabledDate}
                    onSelect={this._onStandaloneSelect}
                    onChange={this._onStandaloneChange}
                    defaultValue={defaultCalendarValue}
                    />
                    <div className="rc_calendar_current_time">
                        <button className="rc_calendar_current_btn" onClick={this._switchToCurrentTime}>当前时间</button>
                    </div>
            </div>
        )
    }
}

class Calendar extends Component {
    constructor(props) {
        super(props)
        this._selectedMonth = this._selectedMonth.bind(this);
        this.now = this.props.defaultValue.locale('zh-cn').utcOffset(8);//刚进入的时间
   
    }
    state = {
        disabled: false,
        value: this.props.defaultValue.locale('zh-cn').utcOffset(8)//刚进入的时间
    }
    componentWillReceiveProps(nextProps,nextState){
        this.state.value = this.props.defaultValue.locale('zh-cn').utcOffset(8)
	}
  
    _selectedMonth(value) {
        //模仿点击触发是否显示日历组件
        $('.rc_calendar_input').click();
        //更新input时间
        this.setState({
            value: value
        });
        //回调到时间轴里
        const {currentValueCallback} = this.props;
        currentValueCallback(value);
    }
    render() {
        
        const format = 'YYYY年MM月';
        const calendar = <div>
            <MyselfMonthCalendar selectedMonth={this._selectedMonth} currentValue={this.state.value} defaultValue={this.now} />
        </div>
        return (
            <div>
                <DatePicker
                    animation=""
                    calendar={calendar}
                    >
                    {
                        ({ value }) => {
                            return (<input
                                className='rc_calendar_input'
                                readOnly
                                disabled={this.state.disabled}
                                value={this.state.value.format(format)}
                                placeholder="请选择日期"
                                />);
                        }
                    }
                </DatePicker>
            </div>
        )
    }
}
Calendar.propType = {
    defaultValue: PropTypes.string
}
MyselfMonthCalendar.propType = {
    currentValue: PropTypes.string,
    selectedMonth: PropTypes.func
}

export default Calendar;
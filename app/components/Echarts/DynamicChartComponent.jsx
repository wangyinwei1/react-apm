import ReactEcharts from '../../util/echarts-for-react';
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
class DynamicChartComponent extends Component {
    timeTicket: null
    count: 51
    state = {
        option: this.getOption(),
        showLoading:true
    }
    constructor(props) {
        super(props)
        this._echartClick = this._echartClick.bind(this);//改成这样
        this._echartMouseover = this._echartMouseover.bind(this);
      
    }
    backgroundFilter(status, valueItem, isShadow) {
        switch (status) {
            case 1:
                valueItem.itemStyle = {
                    normal: {
                        color: isShadow ? 'rgba(235,228,28,0.15)' : 'rgba(235,228,28,1)'
                    }
                }
                break;
            case 2:
                valueItem.itemStyle = {
                    normal: {
                        color: isShadow ? 'rgba(255,94,63,0.15)' : 'rgba(255,94,63,1)'
                    }
                }
                break;
            case 0:
                valueItem.itemStyle = {
                    normal: {
                        color: isShadow ? 'rgba(138,237,119,0.15)' : 'rgba(138,237,119,1)'
                    }
                }
                break;
            default:
                break;
        }
        return valueItem;
    }
    _translateShadowColor(performance) {
        let status = performance.status;
        let color = this.backgroundFilter(status);
        let option = this.state.option;
    }

    fetchNewDate(performances) {

        let option = this.state.option;
        let shadowDate = [];
        let dataKey = 'system/throughput/total';
        let throughputTotal = [];
        let initialValue = 0;

        _.forEach(performances, (performance, i) => {
            let singleJson = {};
            let status = performance.status;
            let value = performance[dataKey];
            if (value > initialValue) {
                initialValue = value
            }
            //数据赋值
            singleJson['value'] = performance['system/throughput/total'];
            //数据颜色设置
            singleJson = this.backgroundFilter(status, singleJson, false)
            throughputTotal.push(singleJson);
        });

        const max = initialValue == 0 ? 6 : Math.ceil(initialValue / 6) * 6;

        _.forEach(performances, (performance, i) => {
            let shadowJson = {};
            let status = performance.status;
            shadowJson['value'] = max;
            shadowJson = this.backgroundFilter(status, shadowJson, true)
            shadowDate.push(shadowJson);
        });
        option.yAxis[0].max = max;
        option.series[0].data = shadowDate;
        option.series[1].data = throughputTotal;
    }
    componentDidMount() {
        const { EchartsData } = this.props;

        this.fetchNewDate(EchartsData);
    }
    componentWillReceiveProps(nextProps) {
        const { EchartsData } = nextProps;
        //设置是否显示加载中...
        if(EchartsData[0]){
            this.setState({
                showLoading:false
            })
        }
        this.fetchNewDate(EchartsData);
    }
    getOption() {
        const overviewOrCenterSwitch = true;
        const option = {
            grid: {
                left: 0,
                right: 0,
                bottom: 0,
                top: 0
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (params, ticket, callback) {
                    return params[1].seriesName + ': &nbsp;' + params[1].value;
                },
                textStyle: {
                    fontSize: 12,
                    fontFamily: '微软雅黑',
                    fontWeight: 'normal',
                    color: '#fff'
                },
                position: function (pos) {
                    return [pos[0]+5, 10];
                }
            },
            xAxis: [
                {
                    type: 'category',
                    data: []
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                }
            ],
            series: [
                { // For shadow
                    type: 'bar',
                    itemStyle: {
                        normal: { color: 'rgba(0,0,0,.15)' }
                    },
                    barCategoryGap: 1,
                    barGap: '-100%',
                    animation: false
                },
                {
                    type: 'bar',
                    data: [],
                    name: "吞吐量",
                    barCategoryGap: 1,
                    itemStyle: {
                        normal: {
                            color: '#8aed77'
                        }
                    }

                }
            ]
        };

        return option;
    }
    _echartClick(params, echart) {
        const { clickJump } = this.props;
        clickJump(params, echart);
    }
    _echartMouseover(params, echart){
         const { mouseoverJump } = this.props;
        mouseoverJump && mouseoverJump();
    }

    render() {
        let ctrl = this;
        let onEvents = {
            'click': ctrl._echartClick,
            'mouseover': ctrl._echartMouseover,
        };
        return (
            <div className='examples'>
                <div className='parent' ref='getWidth'>
                    <ReactEcharts ref='echarts_react'
                        option={this.state.option}
                        style={{ height: 52 }}
                        showLoading={this.state.showLoading}
                        onEvents={onEvents} />
                </div>
            </div>
        );
    }
};

DynamicChartComponent.contextTypes = {
    router: PropTypes.object.isRequired
  
}
DynamicChartComponent.propType = {
    EchartsData: PropTypes.array,

}


export default DynamicChartComponent;
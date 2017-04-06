import ReactEcharts from '../../util/echarts-for-react';
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
class DynamicChartComponent extends Component {
    timeTicket: null
    count: 51
    state = {
        option: this.getOption()
    }
    constructor(props) {
        super(props)
        this.onZrMousemove = this.onZrMousemove.bind(this)//改成这样
    }
    fetchNewDate(echartsData, xAxisData) {

        let axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');
        let option = this.state.option;
        let shadowDate = [];
        const max = 50;
        for (var i = 0; i <= 60; i++) {
            shadowDate.push(max);
        }

        // console.log(option.xAxis[0].data);
        option.series[0].data = shadowDate;
        option.series[1].data = echartsData;

        // this.setState({ option: option });
    }
    componentDidMount() {
        const { EchartsData, left, xAxisData } = this.props;

        this.fetchNewDate(EchartsData, xAxisData);
        // console.log(this.props.params.id);
        // if (this.timeTicket) {
        //     clearInterval(this.timeTicket);
        // }
        // this.timeTicket = setInterval(this.fetchNewDate, 1000);
    }
    componentWillReceiveProps(nextProps) {
        this.fetchNewDate(nextProps.EchartsData, nextProps.xAxisData);
        // let option = this.state.option;
        // option.series[0].data = nextProps.data;
        // option.xAxis[0].splitArea.show = true;
        // option.xAxis[0].splitLine.show = true;
        // console.log(nextProps);
        // this.setState({ option: option });
    }
    componentWillUnmount() {

        // if (this.timeTicket) {
        //     clearInterval(this.timeTicket);
        // }
    }
    getOption() {
        const overviewOrCenterSwitch = true;

        //         option = {
        //     color: ['#3398DB'],
        //     tooltip : {
        //         trigger: 'axis',
        //         axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        //             type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        //         }
        //     },
        //     grid: {
        //         left: '3%',
        //         right: '4%',
        //         bottom: '3%',
        //         containLabel: true
        //     },
        //     xAxis : [
        //         {
        //             type : 'category',
        //             data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        //             axisTick: {
        //                 alignWithLabel: true
        //             }
        //         }
        //     ],
        //     yAxis : [
        //         {
        //             type : 'value'
        //         }
        //     ],
        //     series : [
        //         {
        //             name:'直接访问',
        //             type:'bar',
        //             barWidth: '60%',
        //             data:[10, 52, 200, 334, 390, 330, 220]
        //         }
        //     ]
        // };
        const option = {
            grid: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 0
            },
            tooltip: {
                trigger: 'axis',
                formatter: "{c} &nbsp; " + (overviewOrCenterSwitch == "system" ? "吞吐量" : "交易量") + ": {b}",
                showDelay: 0,
                transitionDuration: 0,
                position: function (pos) {
                    return [pos[0], 10];
                }
            },
            xAxis: [
                {
                    type: 'category',
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#16375b',
                            width: 1,
                            type: 'solid',
                            shadowColor: '#579dc9',
                            shadowOffsetY: 5,
                            opacity: 1
                        },


                    },
                    axisLabel: {
                        show: false,
                        //标签的间隔决定了分割线的间隔
                        interval: 0,
                        textStyle: {
                            color: '#fff'
                        },
                        margin: 22,
                        formatter: function (value) {
                            if(value){
                                if(value.substring(value.indexOf(":")+1)%5 == 0){
                                    return value;
                                }
                               
                            };
                            
                        }
                    },
                    splitLine: {
                        show: true,
                        interval: function (i, data) {
                            if (i == 0) {
                                return false;
                            }
                            return true;
                        },
                        lineStyle: {
                            // 使用深浅的间隔色
                            color: "#16375b",
                            type: 'solid',
                            width: 0
                        }

                    },
                    axisTick: {
                        show: false,
                        alignWithLabel: true,
                        inside: true,
                        lineStyle: {
                            color: '#16375b',
                            width: 1,
                            type: 'solid',
                            shadowColor: '#579dc9',
                            shadowOffsetY: 10,
                            opacity: 1
                        },
                        formatter: function (value) {
                            return false;
                            
                        }
                    },

                    splitArea: {
                        show: false,

                        areaStyle: {
                            color: ['rgba(138,237,119,.2)']
                        }
                    },
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
                    name: overviewOrCenterSwitch == "system" ? "吞吐量" : "交易量",
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
    onZrMousemove(params, echart) {
  
        const { data, left } = this.props;
        // let marginLeft = params.event.clientX - left,
        //     chartsWidth = findDOMNode(this.refs.echarts_react).offsetWidth,
        //     rangeBind = chartsWidth/data.length;

        this.context.router.push({
            pathname: 'business/33',
            query: {
                id: params.event.clientX
            },
        })

        // let dataLength = this.getOption().series[0].data.length;
        // let totalNum = 744/dataLength;
        // let dataIndex = parseInt(params.offsetX/totalNum)

    }
    render() {
        var ctrl = this;
        let onEvents = {
            'click': ctrl.onZrMousemove
        };
        const { data } = this.props;
        return (
            <div className='examples'>
                <div className='parent' ref='getWidth'>
                    <ReactEcharts ref='echarts_react'
                        option={this.state.option}
                        style={{ height: 50 }}
                        onEvents={onEvents} />
                </div>
            </div>
        );
    }
};

DynamicChartComponent.contextTypes = {
    router: PropTypes.object.isRequired
}


export default DynamicChartComponent;
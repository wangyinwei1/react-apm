import ReactEcharts from '../../util/echarts-for-react';
// import { incrementAsync } from '../../states/actions/counter.jsx';
import { connect } from 'react-redux';
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
    fetchNewDate() {
        let axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');
        let option = this.state.option;
        let data0 = option.series[0].data;
        let data1 = option.series[1].data;
        data0.shift();
        data0.push(Math.round(Math.random() * 1000));
        data1.shift();
        data1.push((Math.random() * 10 + 5).toFixed(1) - 0);

        option.xAxis[0].data.shift();
        option.xAxis[0].data.push(axisData);
        option.xAxis[1].data.shift();
        option.xAxis[1].data.push(this.count++);
        this.setState({ option: option });
    }
    componentDidMount() {
        // console.log(this.props.params.id);
        const { dispatch } = this.props;
        dispatch(incrementAsync())
        // if (this.timeTicket) {
        //     clearInterval(this.timeTicket);
        // }
        // this.timeTicket = setInterval(this.fetchNewDate, 1000);
    }
    componentWillReceiveProps(nextProps) {
        let option = this.state.option;
        option.series[0].data = nextProps.data;
        option.xAxis[0].splitArea.show = true;
        option.xAxis[0].splitLine.show = true;
        this.setState({ option: option });
    }
    componentWillUnmount() {

        // if (this.timeTicket) {
        //     clearInterval(this.timeTicket);
        // }
    }
    getOption() {
        const overviewOrCenterSwitch = true;
        const option = {
            grid: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 0,
                borderWidth: 0
            },
            tooltip: {
                trigger: 'axis',
                formatter: "{b} &nbsp; " + (overviewOrCenterSwitch == "system" ? "吞吐量" : "交易量") + ": {c}",
                showDelay: 0,
                transitionDuration: 0,
                position: function (pos) {
                    return [pos[0], 10];
                }
            },
      
            
            xAxis: [
                {
                    axisLine: {
                        show: true
                    },
                    axisLabel: {
                        show: true,
                        //标签的间隔决定了分割线的间隔
                        interval: 0,
                        // textStyle: {
                        //     align: "left"
                        // }
                    },
                    axisTick: {
                        show: true,

                    },
                   
                    splitArea: {
                        show: false,
                        areaStyle: {
                            color: ['rgba(138,237,119,.2)']
                        }
                    },
                    data: [234, 234, 234, 22, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
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
                    }
                }
            ],
            series: [
                {
                    type: 'bar',
                    data: ['-'],
                    name: overviewOrCenterSwitch == "system" ? "吞吐量" : "交易量",
                    barCategoryGap: 2,
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
        let marginLeft = params.event.clientX - left,
            chartsWidth = findDOMNode(this.refs.echarts_react).offsetWidth,
            rangeBind = chartsWidth/data.length;
            console.log(data.length);
        console.log(rangeBind);

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
                        style={{ height: 52 }}
                        onEvents={onEvents} />
                </div>
            </div>
        );
    }
};

DynamicChartComponent.contextTypes = {
    router: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    console.log(state);
    return {...state.business }
}


export default connect(mapStateToProps)(DynamicChartComponent);
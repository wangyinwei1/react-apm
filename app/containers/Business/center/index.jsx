import React, { Component, PropTypes } from 'react';
import style from './index.less';
import { DynamicChartComponent } from '../../../components';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { requireApplications } from '../../../model/business/main.jsx';
//获取服务器时间差
import '../../../util/server_time_difference.js';
import Perf from 'react-addons-perf';
if (__DEV__) window.Perf = Perf;
//时间轴外框组件
@CSSModules(style)
class TimeAxis extends Component {
	state = {
		width: 0
	}
	constructor(props) {
		super(props)
		this._clickJump = this._clickJump.bind(this);//改成这
	}
	componentDidUpdate() {
		const {xAxisData } = this.props;
		let xAxisLineWidth = findDOMNode(this.refs.xAxisLine).getBoundingClientRect().width;
		let len = xAxisData.length;
		let interval = xAxisLineWidth / len;
		//tick定位
		$(findDOMNode(this.refs.xAxisLine)).find('div').each(function (i) {
			$(this).css('left', i * interval + interval / 2 + 'px')
		})
		//类目定位
		$(findDOMNode(this.refs.xAxisLabel)).find('span').each(function (i) {
			let width = $(this).width();
			$(this).css('left', i * interval + interval / 2 - width / 2 + 'px')
		})
	}
	_clickJump(params, echart) {
		const { performances, appId} = this.props;
		this.context.router.push({
			pathname: 'business/' + appId,
			query: {
				dataIndex: params.dataIndex,
				appId: appId
			},
		})
	}
	render() {
		const { performances, app, xAxisData } = this.props;
		return (
			<div styleName='timeAxis_item' ref='wrap'>
				<div className='clearfix'>
					<h3 styleName='item_title'>{app.name}</h3>
					<div styleName='btn_group'>
						<button styleName='btn_icon'>
							<i styleName=''></i>
						</button>
						<button styleName='btn_icon'>
							<i styleName=''></i>
						</button>
						<button styleName='btn_icon'>
							<i styleName=''></i>
						</button>
						<button styleName='btn_icon'>
							<i styleName=''></i>
						</button>
					</div>
				</div>
				<div styleName='histogram_wrappper'  >
					<DynamicChartComponent
						EchartsData={performances[app.id]}
						clickJump={this._clickJump} />

					<div styleName="x_axis_line" ref="xAxisLine" >
						{_.map(xAxisData, (data, i) => {
							return <div key={i} styleName="x_axis_tick"></div>
						})}
					</div>
					<div styleName="x_axis_label" ref="xAxisLabel" >
						{_.map(xAxisData, (data, i) => {
							return <span key={i} styleName="x_axis_text">{data}</span>
						})}
					</div>
				</div>

			</div>
		)
	}
}

@CSSModules(style)
class Center extends Component {
	state = {

	}
	//初始化渲染后触发
	componentDidMount() {
		const { dispatch } = this.props;

		if (this.timeTicket) {
			clearInterval(this.timeTicket);
		}
		//一分钟刷新下数据
		this.timeTicket = setInterval(function () {
			dispatch(requireApplications());
		}, 60000);
		//第一次调用接口
		dispatch(requireApplications());

	}
	render() {
		const { performances, applicaitons, xAxisData } = this.props;
		return (
			<div>
				<div styleName='titleBox'>
					<h1 styleName='title'>业务中心</h1>
					<h3 styleName='dateTitle'>
						<span>{APM_moment().format('YYYY年MM月DD日')}</span>
						<span>最近60分钟</span>
					</h3>
					<button styleName='add-button'>添加</button>
				</div>
				<div styleName='timeAxis_wrappper'>
					{_.map(applicaitons, (app, i) => {
						return (<TimeAxis key={app.id} appId={app.id} performances={performances} app={app} xAxisData={xAxisData} />);
					})}
				</div>
			</div>
		)
	}
}

TimeAxis.contextTypes = {
	router: PropTypes.object.isRequired,
	xAxisData: PropTypes.array,
	app: PropTypes.array,
	performances: PropTypes.object,
}


Center.propType = {
	router: PropTypes.object.isRequired,
	xAxisData: PropTypes.array,
	applicaitons: PropTypes.array,
	performances: PropTypes.object,
}

function mapStateToProps(state) {
	return {...state.center }
}
export default connect(mapStateToProps)(Center);
import React, { Component, PropTypes } from 'react';
import style from './index.less';
import { DynamicChartComponent, Histogram } from '../../../components';
import { is } from 'immutable';
import { findDOMNode } from 'react-dom';
import * as d3 from 'd3';
import Perf from 'react-addons-perf';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { incrementAsync } from '../../../states/actions/business/center_actions.jsx';
import { requireApplications } from '../../../model/business/main.jsx';


//获取服务器时间差
import '../../../util/server_time_difference.js';


if (__DEV__) window.Perf = Perf;
//时间轴外框组件
@CSSModules(style)
class TimeAxis extends Component {
	state = {
		width: 0
	}
	histogramClick(i) {
		this.context.router.push({
			pathname: 'business/33',
			query: {
				id: i
			},
		})
	}

	componentDidMount() {


	}
	componentDidUpdate() {
		const {xAxisData } = this.props;
		let xAxisLineWidth = findDOMNode(this.refs.xAxisLine).getBoundingClientRect().width;
		let len = xAxisData.length;
		let interval = xAxisLineWidth / len;
		$(findDOMNode(this.refs.xAxisLine)).find('div').each(function (i) {

			$(this).css('left', i * interval + interval / 2 + 'px')
		})


		$(findDOMNode(this.refs.xAxisLabel)).find('span').each(function (i) {
			let width = $(this).width();
			$(this).css('left', i * interval + interval / 2 - width / 2 + 'px')
		})
	}

	render() {
		const { performances, name, xAxisData } = this.props,
			ctrl = this;

		let onEvents = {
			'click': ctrl.histogramClick.bind(this)
		};
		return (
			<div styleName='timeAxisItem' ref='wrap'>
				<div className='clearfix'>
					<h3 styleName='itemTitle'>{name}</h3>
					<div styleName='btnGroup'>
						<button styleName='btnIcon'>
							<i styleName=''></i>
						</button>
						<button styleName='btnIcon'>
							<i styleName=''></i>
						</button>
						<button styleName='btnIcon'>
							<i styleName=''></i>
						</button>
						<button styleName='btnIcon'>
							<i styleName=''></i>
						</button>
					</div>
				</div>
				<div styleName='histogramWrap'  >
					<DynamicChartComponent
						left={this.state.width}
						EchartsData={performances} />

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
		dispatch(requireApplications());
	}
	render() {
		const { performances, applicaitons, xAxisData } = this.props;
		let items = [];
		for (let item of this.props.applicaitons || []) {
			items.push(<TimeAxis key={item.id} performances={performances} name={item.name} xAxisData={xAxisData} />);
		};
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
				<div styleName='timeAxisWrap'>
					{items}
				</div>

			</div>
		)
	}
}

TimeAxis.contextTypes = {
	router: PropTypes.object.isRequired
}


Center.propType = {
	data: React.PropTypes.arrayOf(React.PropTypes.number)
}

function mapStateToProps(state) {

	return {...state.center }
}
export default connect(mapStateToProps)(Center);
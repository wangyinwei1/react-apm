import React, { Component, PropTypes } from 'react';
import style from './index.less';
import RectGroup from './rectGroup.jsx';
import Coordinate from './coordinate.jsx';
import Tooltip from './tooltip.jsx';
import * as d3 from 'd3';
import { findDOMNode } from 'react-dom';
import onresize from './onresize.jsx';
import { mixin } from 'core-decorators';
import MouseEvent from './mouseEvent.jsx';
import History from '../../util/history.jsx';
import 	Magnifier from './magnifier.jsx';


//混合装饰器
@mixin(onresize, MouseEvent, History)
class Histogram extends Component {
	state = {
		width: 0,
		newData:[],
		rangeBind:0
	}
	renderrealRect(dom) {
		const {height, data, rangeBind } = this.props;
		let multiple = height / d3.max(data);
		dom.attr('y', (d, i) => {
			return height;
		})
			.attr('height', (d, i) => {
				return 0;
			})
			.transition()
			.duration(600)
			.ease(d3.easeQuadOut)
			.attr('y', (d, i) => {
				return height - data[i] * multiple;
			})
			.attr('height', (d, i) => {
				return data[i] * multiple;
			})
	}
	renderBgRect(dom) {
		const {height, data, rangeBind } = this.props;
		dom.attr('y', (d, i) => {
			return 0;
		})
			.attr('height', (d, i) => {
				return height;
			})
	}
	componentDidUpdate() {
		const realRect = d3.select(findDOMNode(this.refs.realRect)).selectAll('rect'),
			bgRect = d3.select(findDOMNode(this.refs.bgRect)).selectAll('rect');
		//分别为背景和真实数据矩形矩形添加事件
		this._mouseEvent(realRect);
		this._mouseEvent(bgRect, true);//用Boolean来判断是bg还是有数据的矩形
		if( !this.bOk ){
			//更新完y轴过渡动画
			this.renderrealRect(realRect);
			//更新完背景渲染
			this.renderBgRect(bgRect)
		}
		
	}
	componentWillReceiveProps(nextProps){
		let width = findDOMNode(this.refs.svgWrap).getBoundingClientRect().width;
		//获取state里的width重新渲染
		this.setState({
			width
		})

	}
	componentDidMount() {
		this._onresize();

	}
	render() {
		const { xAxisData, data, paddingLeft, height, pattern} = this.props;
		//单个矩形的宽度
		const width = paddingLeft ? this.state.width - paddingLeft * 2 : this.state.width,
			rangeBind = paddingLeft ? width /data.length : width / data.length;
			
		this.rangeBind = rangeBind;
		this.xAxisLength = xAxisData.length;
		this.length = data.length;
		return (
			<div className={style.itemPos} ref='svgWrap'>
				<svg ref="svg" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
					<RectGroup
						ref='bgRect'
						color='rgba(138,237,119,.2)'
						rangeBind={rangeBind}
						{...this.props} />
					<RectGroup
						rangeBind={rangeBind}
						ref='realRect'
						color='#8aed77'
						{...this.props} />
					<Coordinate {...this.props}
						ref='xAxis'
						width={width}
						rangeBind={rangeBind} />
				</svg>
				{
					pattern ?
						<Magnifier ref='tipMagnifier' data={[0,0,0,0,0]} height={40}/>
						: <Tooltip ref="tipBox"
							width={width}
							rangeBind={rangeBind}
							height={height}
							names={[{ name: '交易量' }]} />
				}

			</div>
		)
	}
}
Histogram.contextTypes  = {
	router: PropTypes.object.isRequired
}
Histogram.propType = {
	data:  PropTypes.instanceOf(IM.List).isRequired,
	date: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
}


export default Histogram;
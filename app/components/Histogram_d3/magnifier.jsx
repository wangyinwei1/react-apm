import React, { Component,PropTypes } from 'react';
import style from './index.less';
import RectGroup from './rectGroup.jsx';
import * as d3 from 'd3';
import { findDOMNode } from 'react-dom';

class Tooltip extends Component {
	renderrealRect(dom) {
		const {height, data, rangeBind } = this.props;
		let multiple = height / d3.max(data);
		if(!isNaN(multiple))
			multiple = 0;

		dom.transition()
			.duration(150)
			.ease(d3.easeQuadOut)
			.attr('y', (d, i) => {
				return height - data[i] * multiple;
			})
			.attr('height', (d, i) => {
				return data[i] * multiple;
			})
	}
	renderBgRect(dom) {
		const {height, rangeBind } = this.props;
		dom.attr('y', (d, i) => {
			return 0;
		})
		.attr('height', (d, i) => {
			return height;
		})
	}
	componentDidUpdate() {
		const bgRect = d3.select(findDOMNode(this.refs.bgRect1)).selectAll('rect'),
			realRect = d3.select(findDOMNode(this.refs.realRect1)).selectAll('rect');
		//分别为背景和真实数据矩形矩形添加事件

		//更新完背景渲染
		this.renderBgRect(bgRect)
		this.renderrealRect(realRect)
	}
	render() {
		const { data } = this.props;
		
		return (
			<div className={style.magnifierWrap} >
                <svg className={style.magnifierContainer}>
					<RectGroup
						className='realMagnifier'
						ref='realRect1'
						data={data}
						rangeBind={10}
						height={40}
						color='#8aed77'/>
					<RectGroup
						ref='bgRect1'
						data={data}
						color='rgba(138,237,119,.2)'
						rangeBind={10}
						height={40} />
                </svg>
			</div>
		)
	}
}

Tooltip.propType = {

}


export default Tooltip;
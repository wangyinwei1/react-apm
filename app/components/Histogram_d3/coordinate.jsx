import React, { Component, PropTypes } from 'react';
import style from './index.less';
import pureRender from "pure-render-decorator"

@pureRender//提高性能减少渲染次数
class Tick extends Component {
	render() {
		const { rangeBind, clientX, data, height } = this.props;
		return (
			<g >
				<path d={`M ${clientX} ${height + 10} V${height + 16}`}></path>
				<text x={`${clientX}`} y={`${height + 24}`} dy='.55em'>{data}</text>
			</g>
		)
	}
}

class Coordinate extends Component {
	render() {
		const { width, paddingLeft, paddingTop, xAxisData, rangeBind, height } = this.props;
		let interval = width / xAxisData.length;
		return (
			<g className={style.axis} transform={`translate(${paddingLeft ? paddingLeft : 0},${paddingTop ? paddingTop : 0})`}>
				<path d={`M 0 ${height + 10} H${width}`} ></path>
				{xAxisData.map((data, i) => {
					return <Tick key={i} rangeBind={rangeBind} height={height} data={data} clientX={interval * i + rangeBind / 2} />;
				})}
			</g>
		)
	}
}

Coordinate.propType = {
	xAxisData: PropTypes.instanceOf(IM.List).isRequired,
	data: PropTypes.instanceOf(IM.List).isRequired,
	paddingTop: PropTypes.number.isRequired,
	width: PropTypes.number.isRequired,
	paddingLeft: PropTypes.number.isRequired,
	clientX: PropTypes.number.isRequired
}


export default Coordinate;
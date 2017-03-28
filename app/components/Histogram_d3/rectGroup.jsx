import React, { Component, PropTypes } from 'react';
import style from './index.less';
import * as d3 from 'd3';
import { immutableRenderDecorator  } from "react-immutable-render-mixin";
 @immutableRenderDecorator //提高setState频繁触发的性能问题，减少渲染次数

class RectGroup extends Component {
    // componentDidUpdate() {
    // 	//添加描边
    // 	// this.props.dash ? this._rectDash() : '';
    // }
    // /*
    // 	矩形描边
    // */
    // _rectDash(color) {
    // 	const { data, width, height } = this.props;
    // 	let length = data.length;
    // 	this.allRect.attr('stroke', color ? color : '#143252')
    // 		.attr('stroke-width', function (d, i) {
    // 			if (i == length - 1) return 0;
    // 			return '1';
    // 		})
    // 		.attr('stroke-dasharray', `${height} ${(width / length - 1) * 2 + height}`)
    // 		.attr('stroke-dashoffset', `${-width / length + 1}`)
    // }
    state = {}

    render() {
        const { data, color, paddingLeft, paddingTop, height, rangeBind, range } = this.props;
        return (
            <g ref={`_${name}`} transform={`translate(${paddingLeft ? paddingLeft : 0},${paddingTop ? paddingTop : 0})`}>
                {data.map((data, i) => {
                    return <rect key={i}
                        x={rangeBind * i}
                        y={height}
                        width={Math.abs(rangeBind - (range == '0'?0:1))}
                        height={0}
                        style={{ fill: color }}></rect>

                })}
            </g >
        )
    }
}

RectGroup.propType = {
    data: PropTypes.instanceOf(IM.List).isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
}


export default RectGroup;
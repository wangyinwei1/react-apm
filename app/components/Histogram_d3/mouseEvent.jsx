
import * as d3 from 'd3';
import { findDOMNode } from 'react-dom';
import History from '../../util/history.jsx';

const MouseEvent = {
    //移入矩形的callback
    _overTooltip(d, i, boolean) {
        clearTimeout(this.times)
        this.bOk = true;

        const {data, paddingLeft, pattern} = this.props,
            padLeft = paddingLeft ? paddingLeft : 0,
            svgWidth = findDOMNode(this.refs.svgWrap).getBoundingClientRect().width;



        const tipBoxDom = pattern ? findDOMNode(this.refs.tipMagnifier) : findDOMNode(this.refs.tipBox),
            tooltipWidth = findDOMNode(tipBoxDom).getBoundingClientRect().width,
            width = paddingLeft ? svgWidth - padLeft * 2 : svgWidth;


        //宽度界限
        this.maxXpos = width - tooltipWidth;
        this.xPos = this.rangeBind * (i + 1) + padLeft;
        this.left = this.rangeBind * (i + 1) + padLeft;

        //获取DOM
        this.tipBox = d3.select(tipBoxDom);

        //显示tooltip
        this.tipBox.style('visibility', 'visible');

        pattern ? this._tipMagnifier(tooltipWidth, i, data) : this._tipBox(data, i, tooltipWidth);


    },
    _tipMagnifier(tooltipWidth, i, data) {
        this.tipBox.style('left', this.left - tooltipWidth / 2 + 'px');
        const dom = this.tipBox.select('svg').select('g').selectAll('rect');
        let newData = [data[i-2],data[i-1],data[i],data[i+1],data[i+2]];
        let multiple = 40 / d3.max(newData);

        dom.transition()
			.duration(180)
			.ease(d3.easeQuadOut).attr('y', (d, i) => {
        		return 40 -(newData[i]?newData[i]:0) * multiple;
        	})
        	.attr('height', (d, i) => {
        		return (newData[i]?newData[i]:0) * multiple;
        	})
        // this.setState({
        //     newData: [data[i - 2], data[i - 1], data[i], data[i + 1], data[i + 2]]
        // })
    },
    _tipBox(data, i, tooltipWidth) {
        this.tipBox.selectAll('p').html('交易量:' + data[i]);
        //x轴的位置只要大于最大x轴的位置
        //就让tooltip往左移动tooltip宽度+一个矩形的宽度
        if (this.xPos >= this.maxXpos) {
            this.tipBox.style('left', this.left - (tooltipWidth + this.rangeBind) + 'px')
        } else {
            this.tipBox.style('left', this.left + 'px')
        }
    },
    //移出矩形的callback
    _outTooltip(d, i, boolean) {
        this.bOk = false;
        this.times = setTimeout(() => {
            this.tipBox.style('visibility', 'hidden')
        }, 150)
    },
    _mouseEvent(dom, boolean) {
        dom.on('mouseover', (d, i) => {
            if (!boolean) {
                d3.select(dom['_groups'][0][i])
                    .style('fill', '#adf29f');
            }
            this._overTooltip(d, i, boolean)

        })
            .on('mouseout', (d, i) => {
                if (!boolean) {
                    d3.select(dom['_groups'][0][i])
                        .style('fill', '#8aed77');
                }
                this._outTooltip(d, i, boolean)

            })
            .on('click', (d, i) => {
                const { onEvents } = this.props;
                onEvents && onEvents['click'] && onEvents['click'](i);
            })
    }
}

export default MouseEvent;
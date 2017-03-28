import * as d3 from 'd3';
import { findDOMNode } from 'react-dom';
import elementResizeEvent from 'element-resize-event';

const OnResize = {
    _rectChange(dom) {
        const { range } = this.props;

        dom.selectAll('rect')
            .transition()
            .attr('x', (d, i) => { return this.rangeBind * i })
            .attr('width', () => { return this.rangeBind - (range == '0'?0:1)});
    },
	_LineChange() {
        const {paddingLeft} = this.props;
        this.xAxisDOM.select('path')
            .transition()
            .attr('d', (d, i) => { return `M 0 40 H${this.width - paddingLeft * 2}` });
    },
	_scaleSpacingChange() {
        const {paddingLeft, height} = this.props;
        let num = -1;
        this.xAxisDOM.selectAll('g').selectAll('path')
            .transition()
            .attr('d', (d, i) => { num += 1; return `M ${((this.width - paddingLeft * 2) / this.xAxisLength * num + this.rangeBind / 2)} ${height + 10} V${height + 16}` });
    },
	_textSpacingChange() {
        const {paddingLeft} = this.props;
        let num = -1;
        this.xAxisDOM.selectAll('g').selectAll('text')
            .transition()
            .attr('x', (d, i) => { num += 1; return (this.width - paddingLeft * 2) / this.xAxisLength * num + this.rangeBind / 2; })
    },
	_onresize() {
        //svg的宽度
        const {paddingLeft, data} = this.props,
            realRect = d3.select(findDOMNode(this.refs.realRect)),
            bgRect = d3.select(findDOMNode(this.refs.bgRect));


        this.xAxisDOM = d3.select(findDOMNode(this.refs.xAxis));

        elementResizeEvent(this.refs.svgWrap, () => {

            clearTimeout(this.time);
            //整个组件设置宽度
            this.width = findDOMNode(this.refs.svgWrap).getBoundingClientRect().width;
            //整个组件设置间距
            this.rangeBind = paddingLeft ? (this.width - paddingLeft * 2) / this.length : this.width / this.length;
            this.time = setTimeout(() => {
                this._rectChange(realRect);
                this._rectChange(bgRect);
                this._LineChange();
                this._scaleSpacingChange();
                this._textSpacingChange();
            }, 50);
        });

    }
}

export default OnResize;
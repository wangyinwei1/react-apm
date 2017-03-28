import * as d3 from 'd3';

const ScaleGroup = {
	 /*
	   X轴 序数比例尺

	   必须参数opt里
	   name 设置x轴比例的名称
	   input 设置输入的范围 length
	   ouput 设置输出的范围 array

	   使用：this.xRectScale()
	 */ 
	xAxisScale(opt){
		this[opt.name] = d3.scaleLinear()
		.domain(opt.input)
		.rangeRound(opt.output);
	},
	/*
	   Y轴 线性比例尺

	   必须参数opt里
	   name 设置y轴比例的名称
	   input 设置输入的范围 length
	   ouput 设置输出的范围 array

	   使用：this.xRectScale()
	 */ 
	yAxisScale(opt){
		this[opt.name] = d3.scaleLinear()
		.domain(opt.input)
		.range(opt.output);
	}
}

export default ScaleGroup;
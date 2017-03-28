import React, { Component, PropTypes } from 'react';
import style from './index.less';
import {  Dropdown } from '../../../components';
import { decrementAsync, incrementAsync } from '../../../states/actions/business/center_actions.jsx';
import {  Histogram } from '../../../components';
import { findDOMNode } from 'react-dom';
import Perf from 'react-addons-perf';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';

if (__DEV__) window.Perf = Perf;

@CSSModules(style)
class Detail extends Component {
	constructor(props){
		super(props)
		this._swichData =  this._swichData.bind(this)//改成这样
		this._appJump =  this._appJump.bind(this)
		this.index = (props.location.query) ? props.location.query.id : null;
	}
	state = {
		retrospectivePattern:false,
		range:1
	}

	//初始化渲染后触发
	componentDidMount() {
		
		const { dispatch } = this.props;

		dispatch(incrementAsync())

	}
	componentWillMount() {

	}

	//每次接受新的props触发
	componentWillReceiveProps(nextProps) {
		// if (nextProps.selectedReddit !== this.props.selectedReddit) {
		//   const { dispatch, selectedReddit } = nextProps
		//   dispatch(fetchPostsIfNeeded(selectedReddit))
		// }
	}
	_swichData(e){
		const { dispatch } = this.props;

		dispatch(decrementAsync())
		this.setState({
			retrospectivePattern:true,
			range:0
		})
	}
	_appJump(){
		this.context.router.push('business/22');
	}
	render() {
		const data = [{
					name:'网上银行',
					href:'business'
				},{
					name:'微信支付',
					href:'business'
				}];
		return (
			<div className='clearfix'>
				<div className='clearfix'>
					<div className='pull-left' styleName='appMenu'>
						<div className='pull-left'>
							<Dropdown data={data} onClick={this._appJump}/>
						</div>
						<div className='pull-left'>
							<p>{APM_moment().format('YYYY年MM月DD日')}</p>
							<p>最近60分钟</p>
						</div>
					</div>
					<div styleName='timeAxis'>
						<Histogram 
							height={30} 
							paddingLeft={6} 
							range={this.state.range}
							pattern={this.state.retrospectivePattern}
							xAxisData={this.props.xAxisData}
							data={this.props.data}
							/>
					</div>
				</div>
				<div>
					<Dropdown data={data} onClick={this._appJump}/>
					<button onClick={this._swichData}>点我</button>
				</div>
			</div>
		)
	}
}

Detail.contextTypes  = {
	router: PropTypes.object.isRequired
}

Detail.propType = {

}

function mapStateToProps(state) {
  return {...state.center}
}

export default connect(mapStateToProps)(Detail);
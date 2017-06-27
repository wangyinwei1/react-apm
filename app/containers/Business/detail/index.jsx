import React, { Component, PropTypes } from 'react';
import { Breadcrumb, Alert } from 'antd';

import { Dropdown, Calendar } from '../../../components';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { requireAppMunes, serviceTimeDifference } from '../../../model/business/main.jsx';
import style from './index.less';



import Perf from 'react-addons-perf';
if (__DEV__) window.Perf = Perf;
@CSSModules(style)
class Detail extends Component {
	constructor(props) {
		super(props)
		this._appJump = this._appJump.bind(this);
		this._getCurrentValue = this._getCurrentValue.bind(this);
	}
	state = {
		appId:'',
		defaultValue: APM_moment(new Date(new Date()-(this.props.timeD_value)))
	}

	//初始化渲染后触发
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(requireAppMunes());
		dispatch(serviceTimeDifference());
	}
	
	_appJump(item) {
		
		this.context.router.push({
			pathname: 'business/' + item.id,
			query: {
				appId: item.id
			}
		})
		this.setState({
			appId: item.id
		})
	}
	_getCurrentValue(value){

		this.setState({
			defaultValue: value['_d']
		});
	}
	render() {
		console.log(this.state.defaultValue.format('YYYY年MM月DD日'));
		const { routes, location, applicaitonMunes } = this.props;
		//当前菜单
		let currentOptions = _.filter(applicaitonMunes, (item, i) => {
			return item.id == location.query.appId
		});
		//其他菜单
		let otherMunes = _.filter(applicaitonMunes, (item, i) => {
			return item.id != location.query.appId
		});
		//减去服务器时间的当前时间
		let defaultValue = APM_moment(new Date(new Date()-(this.props.timeD_value)));
		
		//当前应用名称
		let currentValue = currentOptions[0] && currentOptions[0].name;
		return (
			<div className=''>
				<div className='clearfix '>
					<div className="breadcrumn_wrapper pull-left">
						<Breadcrumb
							routes={routes}
							params={{ id: currentValue }}
							separator=">" />
					</div>

					<div styleName='app_select_container'>
						<Dropdown
							data={otherMunes}
							changeMune={this._appJump}
							currentValue={currentValue}
							currentId={currentOptions[0] && currentOptions[0].id} />
					</div>
				</div>
				<div styleName="detail_wrapper" className='clearfix'>
					<div styleName='detail_title'>
						{currentValue}
					</div>
					<div className='pull-left'>
						<Calendar defaultValue={defaultValue} currentValueCallback={this._getCurrentValue} appId={this.state.appId} />
					</div>
				</div>
			</div>
		)
	}
}
Detail.contextTypes = {
	router: PropTypes.object.isRequired
}
Detail.propType = {
	applicaitonMunes: PropTypes.array,
	location: PropTypes.object
}

function mapStateToProps(state) {
	return {...state.detail }
}

export default connect(mapStateToProps)(Detail);

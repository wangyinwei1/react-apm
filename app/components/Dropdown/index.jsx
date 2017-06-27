import React, { Component, PropTypes } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import style from './index.less';
import CSSModules from 'react-css-modules';
import { immutableRenderDecorator } from "react-immutable-render-mixin";
@immutableRenderDecorator //提高setState频繁触发的性能问题，减少渲染次数
@CSSModules(style)

/*
   下拉框组件
    @props {data} performances 应用总数的数组
    @props {currentId} string 当前应用id
    @props {changeMune} function 点击切换触发的事件函数
    @props {currentValue} string 当前应用name的值
*/
class SelectMenu extends Component {
	constructor(props) {
		super(props)
		this._handleMenuClick = this._handleMenuClick.bind(this)//改成这样
	}
	state = {
		currentValue: '加载中...'
	}
	_handleMenuClick(e) {
		const { changeMune, data, currentId } = this.props;
		//当前这一项索引
		let index = e.key;
		//点击事件回调函数
		changeMune(data[index]);
		this.setState({
			currentValue: data[index].name
		});

	}
	componentWillReceiveProps(nextProps) {
		const { data, currentValue } = nextProps;
		//第一次进来根据props来设置当前名字
		this.setState({
			currentValue
		});
	}
	render() {
		const { data, currentId } = this.props;
		//菜单
		const menu = (
			<Menu onClick={this._handleMenuClick}>
				{_.map(data, (d, i) => {
					return <Menu.Item key={i}>
						<div>{d.name}</div>
					</Menu.Item>
				})}
			</Menu>
		);
		return (
			<Dropdown overlay={menu} trigger={['click']} >
				<a href="#" styleName='dropDown'>
					{this.state.currentValue} <Icon type="down" />
				</a>
			</Dropdown>
		)
	}
}
SelectMenu.propType = {
	data: PropTypes.instanceOf(IM.List).isRequired,
	currentId:PropTypes.string,
	changeMune:PropTypes.func,
	currentValue:PropTypes.string
}

export default SelectMenu;
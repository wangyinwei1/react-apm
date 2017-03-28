import React, { Component,PropTypes } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import style from './index.less';

import { immutableRenderDecorator  } from "react-immutable-render-mixin";
@immutableRenderDecorator //提高setState频繁触发的性能问题，减少渲染次数

class SelectMenu extends Component {
	constructor(props){
		super(props)
		this._handle =  this._handle.bind(this)//改成这样
	}
	_handle(){
		const { onClick } = this.props;
		onClick();
	}
	render() {
		const { data } = this.props;

		let MenuItem = [];
		data.map((d,i)=>{
			MenuItem.push(
				<Menu.Item key={i}>
					<div onClick={this._handle}>{d.name}</div>
				</Menu.Item>)
		});

		const menu = (
			<Menu>
				{MenuItem}
			</Menu>
		);
		
		return (
            <Dropdown overlay={menu} trigger={['click']} >
                <a href="#" className={`${style.dropDown} clearfix`}>
                    Click me <Icon type="down" />
                </a>
            </Dropdown>
		)
	}
}
SelectMenu.propType = {
	data: PropTypes.instanceOf(IM.List).isRequired,
}

export default SelectMenu;
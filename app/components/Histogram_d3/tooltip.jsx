import React, { Component,PropTypes } from 'react';
import style from './index.less';

class Tooltip extends Component {
	render() {
		const { names, data } = this.props;
		return (
			<div className={style.tooltip} >
				{
					names.map((value,i)=>{
						return <p key={i}></p>
					})
				}
			</div>
		)
	}
}

Tooltip.propType = {
	names: PropTypes.instanceOf(IM.List).isRequired
	// data: PropTypes.array.isRequired,
}


export default Tooltip;
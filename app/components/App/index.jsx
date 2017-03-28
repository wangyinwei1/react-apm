import React, { Component,PropTypes } from 'react';

class App extends Component {
	render() {
		const { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props;

		return (
			<p >

				
			</p>
		)
	}
}

App.propType = {
	increment: PropTypes.func.isRequired,
	incrementIfOdd: PropTypes.func.isRequired,
	incrementAsync:PropTypes.func.isRequired,
	decrement: PropTypes.number.isRequired,
	counter: PropTypes.number.isRequired
}

export default App;
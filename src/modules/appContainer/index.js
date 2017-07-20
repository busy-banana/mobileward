import React from 'react';

export default class AppContainer extends React.Component{
	constructor(props){
		super(props);
	}

	render() {
		const style = {width: '100%',height: '100%'};
		return (
			<div style={style}>
				{this.props.children}
			</div>
		)
	}
}
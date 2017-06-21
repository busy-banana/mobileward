import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import './style.css';

export default class Dialogs extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			open: true,
		};
		this.handleClose = this.handleClose.bind(this);
	}
	handleClose(){
    	this.setState({open: false});
  	};

	render(){
		const actions = [
	    	<FlatButton
	        	label="确定"
	        	primary={true}
	        	onTouchTap={this.handleClose}
	    	/>
	    ];
		return (
			<Dialog
				title="注册成功"
				actions={actions}
				modal={false}
				open={this.state.open}
				onRequestClose={this.handleClose}
        	>
        		注册成功
        	</Dialog>
		)
	}
}
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import './style.css';

export default class Dialogs extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		const actions = [
	    	<FlatButton
	        	label="确定"
	        	primary={true}
	        	onTouchTap={this.props.onTouchTap}
	    	/>
	    ];
		return (
			<Dialog
				title={this.props.message}
				actions={actions}
				modal={true}
				open={this.props.open}
				contentClassName="dialog-content"
				actionsContainerClassName="dialog-actionsContainer"
        	>
        	</Dialog>
		)
	}
}
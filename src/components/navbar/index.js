import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import './style.css';

export default class NavBar extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
				<AppBar
					title={<span className="navbar-title">{this.props.title}</span>}
					className="app-bar"
					iconElementLeft={
						<IconButton 
							className="navigation-btn"
							href={this.props.href}>
							<NavigationArrowBack className="navigation-arrow-back" />
						</IconButton>
					}
					iconElementRight={this.props.rightElement}
				/>
		)
	}
}
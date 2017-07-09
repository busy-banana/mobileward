import React from 'react';
import AppBar from 'material-ui/AppBar';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Person from 'material-ui/svg-icons/social/person';
import DashboardIcon from 'material-ui/svg-icons/action/dashboard';
import Message from 'material-ui/svg-icons/communication/message';
import './style.css';
export default class Dashboard extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		const style = {
			bottomNavigation: {
				position: 'fixed',
				bottom: '0',
				height: '170px',
				backgroundColor: '#fafafa',
			   	borderTop: '1px solid #e0e0e0',
			}
		}

		return (
			<div className="container">
				<AppBar
					title={<span className="navbar-title">个人中心</span>}
					className="app-bar"
					iconStyleLeft={{visibility:'hidden'}}
				/>
				<BottomNavigation selectedIndex={2} style={style.bottomNavigation}>
					<BottomNavigationItem
						className="bottom-navigation-item"
						label="设备列表"
						icon={<DashboardIcon/>}
						onTouchTap={() => {window.location = "#/equipmentList"}}
					/>
					<BottomNavigationItem
						className="bottom-navigation-item"
						label="消息"
						icon={<Message/>}
						onTouchTap={() => {window.location = "#/message"}}
					/>
					<BottomNavigationItem
						className="bottom-navigation-item"
						label="个人中心"
						icon={<Person/>}
						disabled={true}
					/>
		        </BottomNavigation>
			</div>
		)
	}
}
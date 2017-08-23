import React from 'react';
import AppBar from 'material-ui/AppBar';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Person from 'material-ui/svg-icons/social/person';
import DashboardIcon from 'material-ui/svg-icons/action/dashboard';
import Message from 'material-ui/svg-icons/communication/message';
import {List, ListItem} from 'material-ui/List';
import People from 'material-ui/svg-icons/social/people';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import AlarmAdd from 'material-ui/svg-icons/action/alarm-add';
import NotificationsActive from 'material-ui/svg-icons/social/notifications-active';
import Divider from 'material-ui/Divider';
import AppContainer from '../../appContainer';
import './style.css';

export default class Dashboard extends AppContainer{
	constructor(props){
		super(props);
	}

	render(){
		const style = {
			bottomNavigation: {
				position: 'fixed',
				bottom: '0',
				height: '10%',
				backgroundColor: '#fafafa',
			   	borderTop: '1px solid #e0e0e0',
			}
		}

		return (
			<div className="container">
				<AppBar
					title={<span className="center-navbar-title">消息</span>}
					className="app-bar"
					iconStyleLeft={{display:'none'}}
				/>

				<List style={{marginTop: '40px'}}>
					<ListItem
						className="message-list-item"
						primaryText="监护人/患者消息" 
						leftIcon={<People />}
						rightIcon={<Message />}
						href="#/physiologicalParams"
					/>
					<Divider />
					<ListItem 
						className="message-list-item"
						primaryText="医嘱消息" 
						leftIcon={<AccountCircle />} 
						rightIcon={<Message />}
					/>
					<Divider />
					<ListItem 
						className="message-list-item"
						primaryText="报警消息" 
						leftIcon={<AlarmAdd />} 
						rightIcon={<Message />}
					/>
					<Divider />
					<ListItem 
						className="message-list-item"
						primaryText="系统消息" 
						leftIcon={<NotificationsActive />} 
						rightIcon={<Message />}
					/>
					<Divider />
				</List>

				<BottomNavigation selectedIndex={1} style={style.bottomNavigation}>
					<BottomNavigationItem
						className="bottom-navigation-item"
						label="设备列表"
						icon={<DashboardIcon/>}
						onTouchTap={() => {this.go("#/equipmentList")}}
					/>
					<BottomNavigationItem
						className="bottom-navigation-item"
						label="消息"
						icon={<Message/>}
						disabled={true}
					/>
					<BottomNavigationItem
						className="bottom-navigation-item"
						label="个人中心"
						icon={<Person/>}
						onTouchTap={() => {this.go("#/home")}}
					/>
		        </BottomNavigation>
			</div>
		)
	}
}
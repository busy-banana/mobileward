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
			},
			listItemStyle: {
				height: '150px',
				fontSize: '40px',
				fontWeight: 'normal',
				lineHeight: '120px'
			}
		}

		return (
			<div className="container">
				<AppBar
					title={<span className="navbar-title">消息</span>}
					className="app-bar"
					iconStyleLeft={{visibility:'hidden'}}
				/>

				<List style={{marginTop: '100px'}}>
					<ListItem
						className="list-item"
						primaryText="监护人/患者消息" 
						leftIcon={<People />}
						rightIcon={<Message />}
						href="#/physiologicalParams"
						style={style.listItemStyle}
					/>
					<Divider />
					<ListItem 
						className="list-item"
						primaryText="医嘱消息" 
						leftIcon={<AccountCircle />} 
						rightIcon={<Message />}
						style={style.listItemStyle}
					/>
					<Divider />
					<ListItem 
						className="list-item"
						primaryText="报警消息" 
						leftIcon={<AlarmAdd />} 
						rightIcon={<Message />}
						style={style.listItemStyle}
					/>
					<Divider />
					<ListItem 
						className="list-item"
						primaryText="系统消息" 
						leftIcon={<NotificationsActive />} 
						rightIcon={<Message />}
						style={style.listItemStyle}
					/>
					<Divider />
				</List>

				<BottomNavigation selectedIndex={1} style={style.bottomNavigation}>
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
						disabled={true}
					/>
					<BottomNavigationItem
						className="bottom-navigation-item"
						label="个人中心"
						icon={<Person/>}
						onTouchTap={() => {window.location = "#/home"}}
					/>
		        </BottomNavigation>
			</div>
		)
	}
}
import React from 'react';
import AppBar from 'material-ui/AppBar';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Person from 'material-ui/svg-icons/social/person';
import DashboardIcon from 'material-ui/svg-icons/action/dashboard';
import Message from 'material-ui/svg-icons/communication/message';
import {List, ListItem} from 'material-ui/List';
import PhotoLibrary from 'material-ui/svg-icons/image/photo-library';
import History from 'material-ui/svg-icons/action/history';
import InfoOutline from 'material-ui/svg-icons/action/info-outline';
import Videocam from 'material-ui/svg-icons/av/videocam';
import People from 'material-ui/svg-icons/social/people';
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
					title={<span className="navbar-title">功能</span>}
					className="app-bar"
					iconStyleLeft={{visibility:'hidden'}}
				/>

				<List style={{marginTop: '100px'}}>
					<ListItem
						className="list-item"
						primaryText="生理参数" 
						leftIcon={<PhotoLibrary />}
						href="#/physiologicalParams"
						style={style.listItemStyle}
					/>
					<Divider />
					<ListItem 
						className="list-item"
						primaryText="历史回顾" 
						leftIcon={<History />} 
						style={style.listItemStyle}
					/>
					<Divider />
					<ListItem 
						className="list-item"
						primaryText="诊断信息" 
						leftIcon={<InfoOutline />} 
						style={style.listItemStyle}
					/>
					<Divider />
					<ListItem 
						className="list-item"
						primaryText="视频监控" 
						leftIcon={<Videocam />} 
						style={style.listItemStyle}
					/>
					<Divider />
					<ListItem 
						className="list-item"
						primaryText="人组信息" 
						leftIcon={<People />} 
						style={style.listItemStyle}
					/>
					<Divider />
				</List>

				<BottomNavigation selectedIndex={0} style={style.bottomNavigation}>
					<BottomNavigationItem
						className="bottom-navigation-item"
						label="功能"
						icon={<DashboardIcon/>}
						disabled={true}
					/>
					<BottomNavigationItem
						className="bottom-navigation-item"
						label="消息"
						icon={<Message/>}
						onTouchTap={() => {window.location = "#/message"}}
					/>
					<BottomNavigationItem
						className="bottom-navigation-item"
						label="我"
						icon={<Person/>}
						onTouchTap={() => {window.location = "#/home"}}
					/>
		        </BottomNavigation>
			</div>
		)
	}
}
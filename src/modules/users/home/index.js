import React from 'react';
import AppBar from 'material-ui/AppBar';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Person from 'material-ui/svg-icons/social/person';
import PersonOutline from 'material-ui/svg-icons/social/person-outline';
import DashboardIcon from 'material-ui/svg-icons/action/dashboard';
import Lock from 'material-ui/svg-icons/action/lock-outline';
import About from 'material-ui/svg-icons/action/info-outline';
import Logout from 'material-ui/svg-icons/action/input';
import Message from 'material-ui/svg-icons/communication/message';
import Img from '../../../../public/images/doctor.jpg';
import './style.css';

export default class Home extends React.Component{
	constructor(props){
		super(props);
		this.logout = this.logout.bind(this);
	}

	logout(){
		localStorage.clear();
		window.location = "#/login";
		//发请求改登录状态
	}

	render(){
		const imgDOM = (
				<div>
					<img className="home-portrait" src={Img}/>
					<p className="home-name">{localStorage.getItem('name')} </p>
					<p className="home-username">用户名：{localStorage.getItem('username') || '--'}</p>
				</div>				
		)

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
					title={<span className="navbar-title">个人中心</span>}
					className="app-bar"
					iconStyleLeft={{visibility:'hidden'}}
				/>

				{imgDOM}

				<List>
					<ListItem
						className="list-item"
						primaryText="个人信息" 
						leftIcon={<PersonOutline />}
						href="#/home/userInfo"
						style={style.listItemStyle}
					/>
					<Divider />
					<ListItem
						className="list-item"
						primaryText="修改密码" 
						leftIcon={<Lock />}
						href="#/home/changePWD"
						style={style.listItemStyle}
					/>
					<Divider />
					<ListItem
						className="list-item"
						primaryText="关于" 
						leftIcon={<About />}
						href="#/home/about"
						style={style.listItemStyle}
					/>
					<Divider />
					<ListItem 
						className="list-item"
						primaryText="退出登录" 
						leftIcon={<Logout />} 
						onTouchTap={this.logout}
						style={style.listItemStyle}
					/>
					<Divider />
				</List>

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